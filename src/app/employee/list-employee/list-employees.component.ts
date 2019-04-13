import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {

  formdata;
  showName = false;
  employee;
  filteredEmployees: any;
  private search_term: string;
  get searchterm(): string {
    return this.search_term;
  }
  set searchterm(value: string) {
    this.search_term = value;
    this.filteredEmployees = this.filteredEmployee(value);
  }
  filteredEmployee(searchterm: string) {
    return this.filteredEmployees.filter(empl =>
      empl.fullName.toLowerCase().indexOf(searchterm.toLowerCase()) !== -1);
  }
  constructor(private empService: EmployeeService, private router: Router, private route: ActivatedRoute) {
    this.filteredEmployees = this.route.snapshot.data['employeeList'];
  }

  ngOnInit() {
    this.empService.getEmployees().subscribe(
      (res: any) => {
        this.filteredEmployees = res;
      }
    );
  }
  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.empService.deleteEmployee(+id).subscribe(
        (res) => {
          this.router.navigate(['/employees']);
          this.ngOnInit();
        }
      );
    }
  }

  displayUserData(eventData) {
    this.formdata = eventData;
    this.showName = !this.showName;
  }

  onClickUserPanel(id: number) {
    this.router.navigate(['/employees', id], {
      queryParams: { 'name': this.filteredEmployees[0].fullName, 'email': 'rgdeveloper1@gmail.com' }
    });
  }
}
