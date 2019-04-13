import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeLIstResolverService implements Resolve<any> {
    constructor(private empService: EmployeeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.empService.getEmployees();
    }
}
