import { Component, OnInit, signal } from '@angular/core';
import { InputComponent } from '../../../shared/input/input.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RegisterModel } from '../../../models/auth-models/registerModel';
import { NgClass, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ErrorService } from '../../../services/error.service';
import { ApiErrorsComponent } from '../../../shared/api-errors/api-errors.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    NgForOf,
    NgIf,
    TitleCasePipe,
    ApiErrorsComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  model: RegisterModel = {
    username: '',
    password: '',
  };
  loading = false;

  constructor(
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value
        ? null
        : { passwordMismatch: true };
    };
  }

  submitForm(event: SubmitEvent) {
    event.preventDefault();
    if (this.registerForm.invalid) {
      return;
    }

    this.model = { ...this.registerForm.value };
    this.authenticationService.register(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl(this.authenticationService.previousPage);
      },
    });
  }

  protected readonly Object = Object;
}
