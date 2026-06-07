import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import productsData from '../../../public/Test Data/products_List.json';

@Component({
  selector: 'app-table',
  imports: [TableModule, ButtonModule, RatingModule, TagModule, IconFieldModule, InputIconModule, InputTextModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  public products: any[] = productsData;

  searchValue: string | undefined;

  constructor() {}

  clear(table: any) {
      table.clear();
      this.searchValue = ''
  }
}
