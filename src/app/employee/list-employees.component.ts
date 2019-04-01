import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from '../shared_model/employee.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  employee;
  formdata;
  showName = false;

  constructor(private empService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    console.log(this.formdata);
    this.empService.getEmployees().subscribe(
      (res: any) => {
        this.employee = res;
      }
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.empService.deleteEmployee(+id).subscribe(
        (res) => {
          this.router.navigate(['/list']);
          this.ngOnInit();
        }
      );
    }
  }

  displayUserData(eventData) {
    this.formdata = eventData;
    this.showName = !this.showName;

  }

  onClickUserPanel(id: number) {
    this.router.navigate(['/employees', id]);
  }
}
