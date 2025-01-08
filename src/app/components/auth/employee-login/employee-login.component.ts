import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css'],
  standalone: false,
})
export class EmployeeLoginComponent implements OnInit {
  loginForm : FormGroup;
  userInfo: any;
  signUpEmail: any;
  signUpPassword: any;

  @Output() authChange = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  isText: boolean = false;
  type: string = "password";
  eyeIcon: string = "fa-eye-slash";

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['dashboard']);
      }
  })    
  }
}