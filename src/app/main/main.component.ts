import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, SideBarComponent, TableComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
