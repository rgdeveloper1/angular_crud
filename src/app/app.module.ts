import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery';
import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateEmployeCanDeactivateGuardService } from './employee/create-employe-can-deactivate-guard.service';
import { EmployeeFilterPipe } from './employee/employee-filter.pipe';
import { EmployeeLIstResolverService } from './employee/employee-list-resolver.service';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employee/list-employees.component';
import { DisplayEmployeeComponent } from './employee/display-employee/display-employee.component';
import { EmployeedetailsComponent } from './employee/employee-details/employeedetails.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {
    path: 'list', component: ListEmployeesComponent,
    resolve: { employeeList: EmployeeLIstResolverService}
  },
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
    EmployeedetailsComponent,
    EmployeeFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService, CreateEmployeCanDeactivateGuardService, EmployeeLIstResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
