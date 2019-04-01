import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Employee } from './shared_model/employee.model';


@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:3000';


    getEmployees() {
        return this.http.get<Employee>(this.baseUrl + '/employees').pipe(
            catchError(this.handleError)
        );
    }

    getEmployeesId(id: number) {
        return this.http.get(`${this.baseUrl}/employees/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    createEmployee(path, data) {
        return this.http.post<any>(this.baseUrl + '/employees', data);
    }

    updateEmployee(data: any, id: number) {
        return this.http.put<any>(`${this.baseUrl}/employees/${id}`, data)
            .pipe(
                catchError(this.handleError)
            );
    }
    deleteEmployee(id: number) {
        return this.http.delete(`${this.baseUrl}/employees/${id}`).pipe(
            catchError(this.handleError)
        );
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }

        // return an observable with a user-facing error message

        return throwError('Something bad happened. Please try again later.');
    }

}
