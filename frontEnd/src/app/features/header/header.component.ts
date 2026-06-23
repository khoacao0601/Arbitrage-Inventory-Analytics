import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Products',
        icon: 'pi pi-box',
        items: [
          { label: 'Analytics', icon: 'pi pi-chart-line' },
          { label: 'Inventory', icon: 'pi pi-list' }
        ]
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope'
      }
    ];
  }
}
