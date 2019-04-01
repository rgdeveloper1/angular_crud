import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from '../shared_model/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() employees;
  @Output() user_id = new EventEmitter<number>();

  // tslint:disable-next-line:whitespace
  @Output() notify = new EventEmitter<string>();

  constructor() {}
  ngOnInit() { }

  onDelete(id: number) {
    this.user_id.emit(id);
  }

  clickName() {
    this.notify.emit(this.employees);
  }
  getNameandGender(): string {
    return this.employees.fullName + '' + this.employees.email;
  }

}
