import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-picking-items',
  imports: [SelectModule, InputGroupModule, InputNumberModule, InputTextModule, FormsModule, InputGroupAddonModule],
  templateUrl: './picking-items.component.html',
  styleUrl: './picking-items.component.scss'
})
export class PickingItemsComponent {
  // Defined model signal with initail value undefined hoặc number
  text1 = model<string>();
  text2 = model<string>();
  number = model<number>();
  selectedCity = model<string>();
  cities = signal<any[]>([]);
}
