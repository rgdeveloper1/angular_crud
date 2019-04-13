import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeLIstResolverService } from '../shared/employee-list-resolver.service';
import { CreateEmployeCanDeactivateGuardService } from '../shared/create-employe-can-deactivate-guard.service';

import { ListEmployeesComponent } from './list-employee/list-employees.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeedetailsComponent } from './employee-details/employeedetails.component';

const appRoutes: Routes = [
  {
    path: '', component: ListEmployeesComponent,
    resolve: { employeeList: EmployeeLIstResolverService}
  },
  { path: 'create', component: CreateEmployeeComponent, canDeactivate: [CreateEmployeCanDeactivateGuardService] },
  { path: 'edit/:id', component: CreateEmployeeComponent },
  { path: ':id', component: EmployeedetailsComponent },
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  exports : [
    RouterModule
  ]
})
export class EmployeeRoutingModule { }
