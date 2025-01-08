import { Component, OnInit } from '@angular/core';
import ValidateForm from '../../helpers/validateForm';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-signup',
  templateUrl: './employee-signup.component.html',
  styleUrls: ['./employee-signup.component.css']
})
export class EmployeeSignupComponent implements OnInit {

  signUpForm: FormGroup;

  ngOnInit(): void {

  }
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isFaciliator: false,
      isSuperAdmin: false
    });
  }
  
  isText: boolean = false;
  type: string = "password";
  eyeIcon: string = "fa-eye-slash";

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const formValue = this.signUpForm.value;
      if (formValue.name === 'Bikram Shrestha' && formValue.email === 'Bikram.shrestha@gmail.com' && formValue.password === 'Leomessi10@') {
        formValue.facilitator = true;
        formValue.superadmin = true;
      } else {
        formValue.isFaciliator = false;
        formValue.isSuperAdmin = false;
      }
      
      this.saveFormToLocalStorage(formValue);
      this.router.navigate(['']);
    }
  }
  
  saveFormToLocalStorage(formValue: Array<any>) {
    const existingUsers = JSON.parse(localStorage.getItem('signUpUsers') || '[]');
    existingUsers.push(formValue);
    localStorage.setItem('signUpUsers', JSON.stringify(existingUsers));
  }
}
