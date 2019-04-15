import { AbstractControl } from '@angular/forms';


export class CustomValidator {
  static emailDomain(domainName: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email: string = control.value;
      const domainEmail = email ? email.substring(email.lastIndexOf('@') + 1) : '';
      if (email === '' || domainEmail.toLowerCase() === domainName.toLowerCase()) {
        return null;
      } else {
        return { 'emailDomain': true };
      }
    };
  }

  static matchPassword(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (password.value === confirmPassword.value || (confirmPassword.pristine && confirmPassword.value === '')) {
      return null;
    } else {
      return { 'passwordMismatch': true };
    }
  }
}
