import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {StepperComponent} from "./stepper/stepper.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HeaderComponent, StepperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  submitted: boolean = false;
  toggleMsg(e: string){
    this.submitted = true
    console.log(e)
  }
}
