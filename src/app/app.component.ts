import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  userForm: FormGroup;
  userDetails: Array<object>;
  alphabetpattern = '^[a-zA-Z ]*$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3,4}$';
  numberPattern = '^[0-9]*$';

  editMode = false;
  editIndex = null;

  ngOnInit() {
    this.userDetails = [];
    this.user_form_prepare();
  }
  user_form_prepare() {
    this.userForm = this.fb.group({
      editIndex: [null],
      emp_id: [null, [Validators.required, Validators.pattern(this.numberPattern)]],
      emp_fname: [null, [Validators.required, Validators.pattern(this.alphabetpattern)]],
      emp_lname: [null, [Validators.required, Validators.pattern(this.alphabetpattern)]],
      emp_mail: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      emp_phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.numberPattern)]],
      emp_depart: [null, [Validators.required, Validators.pattern(this.alphabetpattern)]],
    });
  }

  onAdd() {
    this.userDetails.push(this.userForm.value);
    this.userForm.reset();
  }
  onEditMode(user: any, index: any) {
    this.editMode = true;
    this.editIndex = index;
    this.userForm.setValue({
      editIndex: index,
      emp_id: user.emp_id,
      emp_fname: user.emp_fname,
      emp_lname: user.emp_lname,
      emp_mail: user.emp_mail,
      emp_phone: user.emp_phone,
      emp_depart: user.emp_depart,
    });
  }

  onUpdate() {
    const index = this.editIndex;
    this.userDetails[index] = this.userForm.value;
    this.editMode = !this.editMode;
    this.userForm.reset();
  }
  onDelete(index: number) {
    if (confirm('Do You Want to Delete this user?')) {
      this.userDetails.splice(index, 1);
    }
  }
  get emp_id() { return this.userForm.get('emp_id'); }
  get emp_fname() { return this.userForm.get('emp_fname'); }
  get emp_lname() { return this.userForm.get('emp_lname'); }
  get emp_mail() { return this.userForm.get('emp_mail'); }
  get emp_phone() { return this.userForm.get('emp_phone'); }
  get emp_depart() { return this.userForm.get('emp_depart'); }
}
