import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth';
import {Router} from '@angular/router';
import {NAVIGATE} from '../../core/app.config';
import {HttpError} from '../../core/http/http-error.interface';
import {ThemeService} from '../../core/theme/theme.service';
import {Observable} from 'rxjs';
import {checkPassword} from './password.validator';

@Component({
  selector: 'course-pf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;
  isDarkTheme: Observable<boolean>;
  isResetActivated: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private themeService: ThemeService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAuthorized) {
      this.router.navigate([NAVIGATE.COURSE]);
    }

    this.isDarkTheme = this.themeService.isDarkTheme;
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, {
        validators: [Validators.required, Validators.email],
      }],
      password: [null, {
        validators: [Validators.required, Validators.minLength(8)]
      }]
    });
  }

  submit(): void {
    this.errorMsg = null;
    if (this.isResetActivated) {
      this.authService.changePassword(this.password.value).subscribe(() => {
          this.router.navigate([NAVIGATE.COURSE]);
        }, (err: HttpError) => this.handleError(err)
      );
      return;
    }

    this.authService.loginUser(this.loginForm.value).subscribe(() => {
      if (!this.authService.userData.isReset) {
        this.addResetPassword();
        return;
      }
      this.router.navigate([NAVIGATE.COURSE]);
    }, (err: HttpError) => this.handleError(err));
  }

  addResetPassword(): void {
    this.isResetActivated = true;
    this.loginForm.removeControl('email');
    this.loginForm.reset();
    this.loginForm.addControl('confirmPassword', new FormControl('', { validators: [
        Validators.required,
        Validators.minLength(8),
      ]}));
    this.loginForm.setValidators([checkPassword]);
    this.loginForm.markAsTouched();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Введите Ваш электронный адрес';
    }

    return this.email.hasError('email') ? 'Неверный электронный адрес' : '';
  }

  handleError(error: HttpError): void {
    switch (error.status) {
      case 403: {
        this.errorMsg = 'Неверный логин или пароль';
        break;
      }
      case 400: {
        this.errorMsg = 'Заполните обязательные поля';
        break;
      }
      default: {
        this.errorMsg = error.message;
      }
    }
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get confirmPassword(): AbstractControl {
    return this.loginForm.get('confirmPassword');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

}
