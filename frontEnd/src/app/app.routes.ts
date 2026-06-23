import { Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { TableComopnent } from './features/table/table.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashBoard', component: DashboardComponent },
      { path: 'table', component: TableComopnent },
    ],
  },
];
