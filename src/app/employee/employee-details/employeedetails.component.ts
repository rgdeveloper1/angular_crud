import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';


@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.scss']
})
export class EmployeedetailsComponent implements OnInit {
  employee: any;
  private _id: number;
  constructor(private route: ActivatedRoute,
    private empservice: EmployeeService,
    private router: Router) { }

  ngOnInit() {
    // this._id = +this.route.snapshot.paramMap.get('id');

    this.route.paramMap.subscribe(
      (params: any) => {
        this._id = +params.get('id');
        this.employee = this.empservice.getEmployeesId(this._id).subscribe(
          (res: any) => {
            this.employee = res;
          }
        );
      }
    );
  }
  viewNextEmployee() {
    if (this._id < 3) {
      this._id = this._id + 1;
    } else {
      this._id = 1;
    }
    this.router.navigate(['/employees', this._id]);
  }

}



