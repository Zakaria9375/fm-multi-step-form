import {Component, Input} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from "@angular/forms";
import {ErrorHandlingService} from "../../common/services/error-handling/error-handling.service";
import {CurrencyPipe, NgClass} from "@angular/common";
import {FormErrorComponent} from "../form-error/form-error.component";
import {PlanComponent} from "./plan/plan.component";

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    FormErrorComponent,
    NgClass,
    PlanComponent,
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css',
})
export class Step2Component {
  @Input() step2!: FormGroup;
  constructor(private errorHandlingService: ErrorHandlingService) {}
  get plan(): FormControl {
    return this.step2.get('plan') as FormControl;
  }
  get isYearly(): FormControl {
    return this.step2.get('isYearly') as FormControl;
  }
  getAriaDescribedBy(field: string): string {
    const control = this.step2.get(field) as FormControl;
    return this.errorHandlingService.getAriaDescribedBy(control, field);
  }
}

