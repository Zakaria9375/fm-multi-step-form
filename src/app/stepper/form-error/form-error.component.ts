import { Component, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ErrorHandlingService} from "../../common/services/error-handling/error-handling.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css',
  animations: [
    trigger('slide-in', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-5px)'
        }),
        animate(300)
      ])
    ])
  ]
})
export class FormErrorComponent {
  @Input() control: FormControl<any> | undefined = undefined;
  @Input() errId: string = ''
  constructor(private errorHandlingService: ErrorHandlingService) {
  }

  get errorMessages(): {id: string, message: string}[] {
    return this.errorHandlingService.getErrorMessage(this.control, this.errId);
  }
}
