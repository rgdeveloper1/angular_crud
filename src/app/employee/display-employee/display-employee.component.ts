import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit {
  selectedEmployeeID: number;
  @Input() employees;
  @Input() index;
  @Output() user_id = new EventEmitter<number>();



  // tslint:disable-next-line:whitespace
  @Output() notify = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.selectedEmployeeID = +this.route.snapshot.paramMap.get('id');
  }

  onDelete(id: number) {
    this.user_id.emit(id);
  }

  clickName() {
    this.notify.emit(this.employees);
  }
  getNameandGender(): string {
    return this.employees.fullName + '' + this.employees.email;
  }
  edit_button(id: number) {
    this.router.navigate(['/employees/edit', id]);
  }
}
