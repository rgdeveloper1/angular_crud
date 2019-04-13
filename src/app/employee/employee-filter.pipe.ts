import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'employeeFilter'
})
export class  EmployeeFilterPipe implements PipeTransform {
    transform(employees: any, serach_term: string) {
        if (!employees || ! serach_term) {
            return employees;
        }
        return employees.filter(empl =>
            empl.fullName.toLowerCase().indexOf(serach_term.toLowerCase()) !== -1);
    }
}
