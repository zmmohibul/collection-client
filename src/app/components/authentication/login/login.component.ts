import { Component, OnInit, signal } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    RouterLink,
    ApiErrorsComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  model: LoginModel = { username: '', password: '' };
  loading = false;

  constructor(
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
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
}
