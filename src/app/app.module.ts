import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeService } from './employee.service';
import { EmployeeFilterPipe } from './shared/employee-filter.pipe';
import { EmployeeLIstResolverService } from './shared/employee-list-resolver.service';
import { CreateEmployeCanDeactivateGuardService } from './shared/create-employe-can-deactivate-guard.service';


import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './employee/home/home.component';
import { PageNotFoundComponent } from './employee/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeFilterPipe,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [EmployeeService, EmployeeLIstResolverService, CreateEmployeCanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
