import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {addOns} from "../../common/model/addOns";
import {AddOn} from "../../common/model/addOn.interface";

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css',
})
export class Step3Component {
  @Input() step3!: FormGroup;
  @Input() isYearly!: boolean;
  addOns = addOns
  constructor() {}

  get onlineService(): FormControl {
    return this.step3.get('onlineService') as FormControl;
  }
  get largerStorage(): FormControl {
    return this.step3.get('largerStorage') as FormControl;
  }
  get customizableProfile(): FormControl {
    return this.step3.get('customizableProfile') as FormControl;
  }
  toggleCheckbox(id: string ) {
    const checkbox = document.getElementById(id) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event('change'));
    }
  }
  getPrice(addOn: AddOn): string{
    return !this.isYearly ? `+${addOn.priceMonthly}/mo` : `+${addOn.priceYearly}/yr`
  }
}
