import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee.component';



@Injectable()
export class CreateEmployeCanDeactivateGuardService implements CanDeactivate<CreateEmployeeComponent> {
    constructor() {}
    canDeactivate(component: CreateEmployeeComponent) {
        if (component.createEmpForm.dirty) {
            return confirm('Are you sure want to discardd this page');
        }

        return true;
    }
}
