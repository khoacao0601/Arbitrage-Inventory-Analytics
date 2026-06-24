import { Component, model, signal, effect, inject, OnInit, viewChild} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';

import { ItemsService } from '../../services/item.service';

@Component({
  selector: 'app-add-new-items',
  imports: [
    SelectModule, 
    InputGroupModule, 
    InputNumberModule, 
    InputTextModule, 
    FormsModule, 
    InputGroupAddonModule, 
    ButtonModule,
    Dialog,
    DialogModule,
    MessageModule
  ],
  templateUrl: './add-new-items.component.html',
  styleUrl: './add-new-items.component.scss'
})
export class AddNewItemsComponent implements OnInit {

  private readonly itemsService = inject(ItemsService);
  itemForm = viewChild<NgForm>('itemForm');
  visible: boolean = false;

  code = model<string>();
  name = model<string>();
  description = model<string>();
  price = model<number>();
  selectedCategory = model<string>();
  category = signal<any[]>([]);
  quantity = model<number>();
  inventory_status = model<string>();
  rating = model<number>();
  rates = signal<any[]>([]);

  apiWarningMessage: string = "";

  constructor() {
    effect(() => {
      const qty = this.quantity();
      if (qty == 0 ) {
        this.inventory_status.set('Quantity cannot be 0');
      } else if (qty && qty > 0 && qty < 10) {
        this.inventory_status.set('LOWSTOCK');
      } else if (qty && qty > 10) {
        this.inventory_status.set('INSTOCK');
      }
    });
  }

  ngOnInit() {
    const categoryOptions = [
      { name: 'Accessories', value: 'Accessories' },
      { name: 'Automotive', value: 'Automotive' },
      { name: 'Beauty', value: 'Beauty' },
      { name: 'Clothing', value: 'Clothing' },
      { name: 'Electronics', value: 'Electronics' },
      { name: 'Fitness', value: 'Fitness' },
      { name: 'Home & Kitchen', value: 'Home & Kitchen' },
      { name: 'Toys', value: 'Toys' }
    ];

    const rates = [
      { name: 1, value: 1},
      { name: 2, value: 2},
      { name: 3, value: 3},
      { name: 4, value: 4},
      { name: 5, value: 5},
    ]

    // send Signal Dropdown by .set()
    this.category.set(categoryOptions);
    this.rates.set(rates)
  }

  submit() {
    this.visible = !this.visible;
    const body = {
      code: this.code(),
      name: this.name(),
      description: this.description(),
      price: this.price(),
      category: this.selectedCategory(),
      inventory_status: this.inventory_status(),
      quantity: this.quantity(),
      rating: this.rating()
    }

    this.itemsService.addAnItem(body).subscribe({
      next: (response) => {
        this.apiWarningMessage = response.message;
      },
      error: (err) => {
        this.apiWarningMessage = "Error when add Item! " + err.error.message;
      }
    })
  }

  closedModal() {
    this.visible = !this.visible;
    this.itemForm()?.resetForm();
    this.code.set('');
    this.name.set('');
    this.description.set('');
    this.selectedCategory.set('');
    this.inventory_status.set('');

    this.price.set(undefined);
    this.quantity.set(undefined);
    this.rating.set(undefined);

    this.apiWarningMessage = '';
  }

}
