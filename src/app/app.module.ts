import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as $ from 'jquery';
import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DisplayEmployeeComponent } from './employee/display-employee.component';
import {  CreateEmployeCanDeactivateGuardService } from './employee/create-employe-can-deactivate-guard.service';
import { EmployeedetailsComponent } from './employee/employeedetails.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListEmployeesComponent },
  { path: 'create', component: CreateEmployeeComponent, canDeactivate: [CreateEmployeCanDeactivateGuardService] },
  { path: 'employees/edit/:id', component: CreateEmployeeComponent },
  { path: 'employees/:id', component: EmployeedetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    ListEmployeesComponent,
    DisplayEmployeeComponent,
    EmployeedetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService, CreateEmployeCanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
