import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  imports: [MenuModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SideBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar'
      },
      {
        label: 'Inventory Matrix',
        icon: 'pi pi-box',
        styleClass: 'active-menuitem'
      },
      {
        label: 'Deal Analyzer',
        icon: 'pi pi-table'
      },
      {
        label: 'Settings & Automations',
        icon: 'pi pi-cog'
      }
    ];
  }
}
