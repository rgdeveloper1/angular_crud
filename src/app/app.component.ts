import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee } from 'employee';
import { Skill } from './skill';
// declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder, private empService: EmployeeService) { }
  list: [];
  userForm: FormGroup;
  userDetails: Array<object>;
  alphabetpattern = '^[a-zA-Z ]*$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3,4}$';
  numberPattern = '^[0-9]*$';
  employeeform: FormGroup;
  editMode = false;
  editIndex = null;
  empIndex = null;


  validateMessage = {
    'fullname': {
      'required': 'Full Name Required',
      'minlength': 'minlength is 5 character'
    },
    'phone': {
      'required': 'phone is Required',
    },
    'skillName': {
      'required': 'Skill Name Required',
    },
    'skillYears': {
      'required': 'Skill Years Required',
    },
  };
  formErrors = {
    'fullname': '',
    'phone': '',
    'skillName': '',
    'skillYears': '',
  };
  ngOnInit() {
    this.fetchData();
    this.userDetails = [];
    this.user_form_prepare();
    this.employeeform = this.fb.group({
      empIndex: [null],
      fullname: [null, [Validators.required, Validators.minLength(5)]],
      phone: [null, [Validators.required]],
      skill: this.fb.array([
        this.addSkillformGroup()
      ])
    });

    this.employeeform.valueChanges.subscribe((data) => {
      this.loginValidationError(this.employeeform);
    });
  }
  ngAfterViewInit() {
    // $(document).ready(function () {
    //   $('input[type=number]').on('focus', function () {
    //     $(this).on('keydown', function (event) {
    //       if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 189) {
    //         event.preventDefault();
    //       }
    //     });
    //   });
    // });
  }

  number(e: { which: any; preventDefault: () => void; }) {
    const keyValue = e.which;
    if (keyValue === 38 || keyValue === 40 || keyValue === 189) {
      e.preventDefault();
    }
  }
  user_form_prepare() {
    this.userForm = this.fb.group({
      editIndex: [null],
      emp_id: [null, [Validators.required, Validators.pattern(this.numberPattern)]],
      emp_fname: [null, [Validators.required, Validators.pattern(this.alphabetpattern)]],
      emp_lname: [null, [Validators.required, Validators.pattern(this.alphabetpattern)]],
      emp_mail: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      emp_phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.numberPattern)]],
      emp_depart: [null, [Validators.required, Validators.pattern(this.alphabetpattern)]],

      skill: this.fb.group({
        skillName: [null, [Validators.required]],
        experience: [null, [Validators.required]],
        proficiency: [null, [Validators.required]],
      }),
    });
  }

  addSkillformGroup(): FormGroup {
    return this.fb.group({
      skillName: [null, [Validators.required]],
      skillYears: [null, [Validators.required]],
    });
  }
  loginValidationError(group: FormGroup = this.employeeform): void {
    // tslint:disable-next-line:no-shadowed-variable
    Object.keys(group.controls).forEach((Key: string) => {
      const abstractControl = group.get(Key);
      this.formErrors[Key] = '';

      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const message = this.validateMessage[Key];
        for (const errorkey in abstractControl.errors) {
          if (errorkey) {
            this.formErrors[Key] += message[errorkey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.loginValidationError(abstractControl);
      }

      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.loginValidationError(control);
          }
        }
      }
    });
  }
  addSkillButton(): void {
    (<FormArray>this.employeeform.get('skill')).push(this.addSkillformGroup());
  }
  onDataadd(): void {
    // this.loginValidationError(this.employeeform);
    // console.log(this.formErrors);

    const formArray = this.fb.array([
      new FormControl('RG', Validators.required),
      new FormControl('Rahul', Validators.required),
      new FormControl('Rachit', Validators.required)
    ]);

    console.log(formArray.at(0).value);
  }
  deleteSkill(index: number) {
    (<FormArray>this.employeeform.get('skill')).removeAt(index);
  }
  onAdd() {
    this.userDetails.push(this.userForm.value);
    this.userForm.reset();
  }
  onEditMode(user: any, index: any) {
    this.editMode = true;
    this.editIndex = index;
    this.userForm.setValue({
      editIndex: index,
      emp_id: user.emp_id,
      emp_fname: user.emp_fname,
      emp_lname: user.emp_lname,
      emp_mail: user.emp_mail,
      emp_phone: user.emp_phone,
      emp_depart: user.emp_depart,
    });
  }

  onUpdate() {
    const index = this.editIndex;
    this.userDetails[index] = this.userForm.value;
    this.editMode = !this.editMode;
    this.userForm.reset();
  }
  onDelete(index: number) {
    if (confirm('Do You Want to Delete this user?')) {
      this.userDetails.splice(index, 1);
    }
  }
  editEmp(user: any, index: any) {
    this.empIndex = index;
    this.employeeform.patchValue({
      empIndex: index,
      fullname: user.fullName,
      phone: user.phone
    });
  }
  fetchData() {
    this.empService.getEmployees().subscribe(
      (res: any) => {
        const d = this.list = res;
        // console.log(d);
      }, (err) => {
        console.warn('error', err);
      },
      () => {
        // console.log('requerst completed');
      }
    );
  }

  get emp_id() { return this.userForm.get('emp_id'); }
  get emp_fname() { return this.userForm.get('emp_fname'); }
  get emp_lname() { return this.userForm.get('emp_lname'); }
  get emp_mail() { return this.userForm.get('emp_mail'); }
  get emp_phone() { return this.userForm.get('emp_phone'); }
  get emp_depart() { return this.userForm.get('emp_depart'); }
}
