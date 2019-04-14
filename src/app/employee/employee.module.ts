import { NgModule } from '@angular/core';


import { ListEmployeesComponent } from './list-employee/list-employees.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';


import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeedetailsComponent } from './employee-details/employeedetails.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent,
    DisplayEmployeeComponent,
    EmployeedetailsComponent,
    DashboardComponent
  ],
  imports: [
    EmployeeRoutingModule,
    SharedModule
  ],
  exports: [
    CreateEmployeeComponent,
    DisplayEmployeeComponent,
    ListEmployeesComponent
  ]
})
export class EmployeeModule { }
