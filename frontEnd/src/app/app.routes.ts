import { Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComopnent } from './features/table/table.component';
import { PickingItemsComponent } from './features/picking-items-process/picking-items/picking-items.component';
import { AddNewItemsComponent } from './features/add-items/add-new-items/add-new-items.component';
import { AiAssistantComponent } from './features/ai-assistant-Gemini-SDK/components/ai-assistant/ai-assistant.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashBoard', component: DashboardComponent },
      { path: 'inventory', component: TableComopnent },
      { path: 'picking', component: PickingItemsComponent },
      { path: 'addItems', component: AddNewItemsComponent },
      { path: 'AIsupport', component: AiAssistantComponent },
    ],
  },
];
