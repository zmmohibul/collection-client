import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { InputComponent } from '../../../shared/input/input.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginModel } from '../../../models/auth-models/loginModel';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { ApiErrorsComponent } from '../../../shared/api-errors/api-errors.component';
import { LoadingButtonComponent } from '../../../shared/loading-button/loading-button.component';
import { ErrorService } from '../../../services/error.service';
import { LoadingService } from '../../../services/loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    RouterLink,
    ApiErrorsComponent,
    LoadingButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  model: LoginModel = { username: '', password: '' };

  constructor(
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    public loadingService: LoadingService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(event: SubmitEvent) {
    event.preventDefault();
    if (this.loginForm.invalid) {
      return;
    }

    this.model = { ...this.loginForm.value };
    this.authenticationService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl(this.authenticationService.previousPage);
      },
    });
  }

  ngOnDestroy(): void {
    this.loadingService.loading.set(false);
    this.errorService.errors.set({});
  }
}
