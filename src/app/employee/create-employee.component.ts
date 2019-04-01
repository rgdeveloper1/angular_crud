import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('createEmployeeform')  public createEmpForm: NgForm;
  datepickerconfig: Partial<BsDatepickerConfig>;
  previewPhoto = false;
  createPageTitle: string;
  employeeForm: FormGroup;
  data: Array<object>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeService,
    private fb: FormBuilder) {

    this.datepickerconfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
    });
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      id: [''],
      fullName: [''],
      email: [''],
      imagePath: ['']
    });
    this.empService.getEmployees().subscribe(
      (res) => {
      }
    );


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.createPageTitle = 'Edit Employee';
      this.empService.getEmployeesId(+id).subscribe(
        (res: any) => {
          this.employeeForm.patchValue({
            id: res.id,
            fullName: res.fullName,
            email: res.email,
            imagePath : res.imagePath
          });
          this.data = res;
        }
      );
    } else {
      this.createPageTitle = 'Create Employee';
    }
  }
  priviewPhoto() {
    this.previewPhoto = !this.previewPhoto;
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

}
