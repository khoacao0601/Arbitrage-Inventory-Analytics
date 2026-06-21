import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { TableComponent } from './table/table.component';

export const routes: Routes = [
  {
    path: '', 
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashBoard', component: DashboardComponent },
      { path: 'table', component: TableComponent }
    ]
  }
];

