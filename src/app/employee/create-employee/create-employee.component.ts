import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, NgForm, Validators, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { CustomValidator } from 'src/app/shared_model/custom.validator';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('createEmployeeform') public createEmpForm: NgForm;
  previewPhoto = false;
  createPageTitle: string;
  employeeForm: FormGroup;
  data: Array<object>;
  disabled = true;
  phone = false;
  employee;

  valiationmessage = {
    'fullName': {
      'required': 'Full Name is required..',
      'minlength': 'Full Name must be greater than 2 character..',
      'maxlength': 'Full Name must be less than 10 character..'
    },
    'email': {
      'required': 'Email is required..',
      'emailDomain': 'email domain should be abc@rohitguptarg.com'
    },
    'mobilePhone': {
      'required': 'phone is required..',
    },
    'password': {
      'required': 'Password is required..',
    },
    'confirmPassword': {
      'required': 'Confirm Password is required..',
    },
    'passwordgroup': {
      'passwordMismatch': 'Password and Confirm Password do not match..',
    },
  };

  formErrors = {
    'fullName': '',
    'email': '',
    'mobilePhone': '',
    'password': '',
    'confirmPassword': '',
    'passwordgroup': ''
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.empService.getEmployees().subscribe(
      (res) => {
        this.employee = res;
      }
    );
    this.employeeForm = this.fb.group({
      id: null,
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPrefrences: ['email'],
      email: ['', [Validators.required, CustomValidator.emailDomain('rohitguptarg.com')]],
      mobilePhone: [{ value: '', disabled: this.disabled }],
      // create skill form group
      skills: this.fb.array([
        this.addSkillFormGroup()
      ]),
      passwordgroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      }, { validator: CustomValidator.matchPassword }),
      imagePath: ['']
    });

    this.employeeForm.valueChanges.subscribe(
      (data: any) => {
        this.logValidationErrors(this.employeeForm);
      }
    );
    this.employeeForm.get('contactPrefrences').valueChanges.subscribe(
      (data: string) => {
        this.OnContcatPrefrences(data);
      }
    );

    this.route.paramMap.subscribe(
      (param) => {
        const empId = +param.get('id');
        if (empId) {
          this.getemployee(empId);
          this.createPageTitle = 'Edit Employee';
        } else {
          this.createPageTitle = 'Create Employee';
          this.employee = {
            id: null,
            fullName: '',
            contactPrefrences: '',
            email: '',
            passwordgroup: '',
            mobilePhone: null,
            imagePath: '',
            skills: []
          };
        }
      }
    );
  }

  getemployee(id: number) {
    this.empService.getEmployeesId(id).subscribe(
      (employee: any) => {
        this.editEmployee(employee);
        this.employee = employee;
      }
    );
  }
  editEmployee(employee) {
    this.employeeForm.patchValue({
      id: employee.id,
      fullName: employee.fullName,
      contactPrefrences: employee.contactPrefrences,
      email: employee.email,
      mobilePhone: employee.mobilePhone,
      imagePath: employee.imagePath,
      passwordgroup: employee.passwordgroup
    });
    this.employeeForm.setControl('skills', this.setExistingskill(employee.skills));
  }

  setExistingskill(skillset): FormArray {
    const formarray = new FormArray([]);
    skillset.forEach(skill => {
      formarray.push(this.fb.group({
        skillName: [skill.skillName],
        experienceInYears: [skill.experienceInYears],
        proficiency: [skill.proficiency]
      }));
    });
    return formarray;
  }

  priviewPhoto() {
    this.previewPhoto = !this.previewPhoto;
  }

  OnContcatPrefrences(selectedValue: string) {
    const phone = this.employeeForm.get('mobilePhone');
    const email = this.employeeForm.get('email');
    if (selectedValue === 'mobilePhone') {
      phone.setValidators(Validators.required);
      phone.markAsDirty();
      email.disable();
      phone.enable();

    } else if (selectedValue === 'email') {
      phone.clearValidators();
      email.enable();
      email.markAsDirty();
      phone.disable();

    }
    phone.updateValueAndValidity();
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', [Validators.required]],
      experienceInYears: ['', [Validators.required]],
      proficiency: ['', [Validators.required]]
    });
  }

  addSkill() {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());

  }

  skilldelete(skillgroupindex: number) {
    const skillformaray = (<FormArray>this.employeeForm.get('skills'));
    skillformaray.removeAt(skillgroupindex);
    skillformaray.markAsDirty();
    skillformaray.markAsTouched();
  }

  onSubmit() {
    const data = this.employeeForm.value;
    const id = this.employeeForm.get('id').value;
    if (id) {
      this.empService.updateEmployee(data, +id).subscribe(
        (res: any) => {
          this.router.navigate(['/list']);
          this.employeeForm.reset();
        }
      );
    } else {
      this.empService.createEmployee('employess/list', data).subscribe(
        (res: any) => {
          this.router.navigate(['/list']);
          this.employeeForm.reset();
        }
      );
    }
  }

  get imagepath() { return this.employeeForm.get('imagePath'); }

  logValidationErrors(group: FormGroup): void {
    // console.log(Object.keys(group.controls));
    Object.keys(group.controls).forEach((key: string) => {
      const keyControl = group.get(key); // all formcontrols, formgroup
      // Here key is fullname,id
      this.formErrors[key] = '';
      if (keyControl && !keyControl.valid && (keyControl.touched || keyControl.dirty || keyControl.value !== '')) {
        const messages = this.valiationmessage[key];
        for (const errorKey in keyControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }
      if (keyControl instanceof FormGroup) {
        this.logValidationErrors(keyControl);
      }

      // if (keyControl instanceof FormArray) {
      //   for (const control of keyControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control);
      //     }
      //   }
      // }
    });
  }

}
