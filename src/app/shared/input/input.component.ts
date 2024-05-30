import { Component, Input, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() inputType = 'text';
  @Input() name = '';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  get requiredError(): boolean {
    return (
      this.control.errors?.['required'] &&
      (this.control?.dirty || this.control?.touched) &&
      !this.control.errors?.['passwordMismatch']
    );
  }

  get passwordMismatchError(): boolean {
    return (
      this.control.errors?.['passwordMismatch'] &&
      (this.control?.dirty || this.control?.touched) &&
      !this.control.errors?.['required']
    );
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }
}
