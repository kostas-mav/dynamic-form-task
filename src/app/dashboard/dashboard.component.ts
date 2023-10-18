import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,SidebarComponent,FormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

}
