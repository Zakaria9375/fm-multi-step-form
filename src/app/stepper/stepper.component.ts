import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {StepperHandlingService} from "../common/services/stepper/stepper-handling.service";
import {AsyncPipe, NgClass, NgSwitch, NgSwitchCase} from "@angular/common";
import {Step1Component} from "./step1/step1.component";
import {Step2Component} from "./step2/step2.component";
import {Step3Component} from "./step3/step3.component";
import {Step4Component} from "./step4/step4.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    NgClass,
    NgSwitch,
    NgSwitchCase,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  animations: [
    trigger('fade',[
      state(
        'in',
        style({
          opacity: 1,
        }),
      ),
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(250),
      ]),
    ]),
  ]
})
export class StepperComponent implements OnInit, OnDestroy {
  @Output() submitted :EventEmitter<string> = new EventEmitter();
  form: FormGroup;
  private subscription!: Subscription;
  currentStep: number = 0;

  constructor(
    private stepperService: StepperHandlingService,
  ) {
    this.form = this.stepperService.form;
  }
  get personalInfo(): FormGroup {
    return this.form.get('personalInfo') as FormGroup;
  }
  get planSelection(): FormGroup {
    return this.form.get('planSelection') as FormGroup;
  }
  get addOns(): FormGroup {
    return this.form.get('addOns') as FormGroup
  }
  get isYearly(): boolean {
    return this.planSelection.get('isYearly')?.value as boolean
  }
  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.submitted.emit('form has been submitted')
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }

  nextStep(): void {
    this.stepperService.nextStep();
  }

  prevStep(): void {
    this.stepperService.prevStep();
  }
  ngOnInit() {
    this.subscription = this.stepperService.currentStep$.subscribe(
      (value) => (this.currentStep = value),
    );
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
