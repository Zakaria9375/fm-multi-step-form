import {Component, computed, OnDestroy, OnInit} from '@angular/core';
import {StepperHandlingService} from "../common/services/stepper/stepper-handling.service";
import {NgClass} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  steps = [
    {
      id: 1,
      nr: 'step 1',
      title: 'your info',
    },
    {
      id: 2,
      nr: 'step 2',
      title: 'select plan',
    },
    {
      id: 3,
      nr: 'step 3',
      title: 'add-ons',
    },
    {
      id: 4,
      nr: 'step 4',
      title: 'summary',
    },
  ];
  selectedStep: number = 0;
  private  subscription!: Subscription;
  constructor(private stepperService: StepperHandlingService) {}
  goToStep(id: number): void {
    this.stepperService.goToStep(id);
  }
  ngOnInit() {
    this.subscription = this.stepperService.currentStep$.subscribe(
      (value) => this.selectedStep = value
    );
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  isSelected(id: number){
    return id === this.selectedStep
  }
}

