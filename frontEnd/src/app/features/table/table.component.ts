import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../services/item.service';

@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    ButtonModule,
    RatingModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})

export class TableComopnent implements OnInit{

  private readonly itemsService = inject(ItemsService);
  public products: any[] = [];

  searchValue: string | undefined;

  constructor() {}

  ngOnInit(): void {
    this.itemsService.getAllItems().subscribe({
      next: (data) => {
        this.products = data.data
      },
      error: (err) => {
        console.log('Error when fetch Items list!', err);
      }
    })
  }

  clear(table: any) {
    table.clear();
    this.searchValue = '';
  }
}
