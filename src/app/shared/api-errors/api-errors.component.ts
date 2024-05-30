import { Component } from '@angular/core';
import { NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-api-errors',
  standalone: true,
  imports: [NgForOf, TitleCasePipe, NgIf],
  templateUrl: './api-errors.component.html',
  styleUrl: './api-errors.component.scss',
})
export class ApiErrorsComponent {
  protected readonly Object = Object;
  errors = this.errorService.errors;

  constructor(private errorService: ErrorService) {}
}
