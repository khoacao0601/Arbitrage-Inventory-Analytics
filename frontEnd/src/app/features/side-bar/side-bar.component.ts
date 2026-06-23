import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  imports: [MenuModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SideBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        routerLink: ['/dashBoard']
      },
      {
        label: 'Inventory',
        icon: 'pi pi-box',
        routerLink: ['/table']
      },
      {
        label: 'Picking Items',
        icon: 'pi pi-cart-plus',
      },
      {
        label: 'Import items',
        icon: 'pi pi-plus-circle',
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
    ];
  }
}
