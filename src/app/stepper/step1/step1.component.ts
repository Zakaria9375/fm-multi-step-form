import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import {ErrorHandlingService} from "../../common/services/error-handling/error-handling.service";
import {FormErrorComponent} from "../form-error/form-error.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent, NgIf],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css',
})
export class Step1Component {
  @Input() step1!: FormGroup;
  constructor(private errorHandlingService: ErrorHandlingService) {}
  get name(): FormControl {
    return this.step1.get('name') as FormControl;
  }
  get email(): FormControl {
    return this.step1.get('email') as FormControl;
  }
  get phone() {
    return this.step1.get('phone') as FormControl;
  }
  getAriaDescribedBy(field: string): string {
    const control = this.step1.get(field) as FormControl;
    return this.errorHandlingService.getAriaDescribedBy(control, field);
  }
}
