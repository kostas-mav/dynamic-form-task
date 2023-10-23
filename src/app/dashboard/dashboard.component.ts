import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormComponent],
  template: `
    <app-sidebar></app-sidebar>
    <app-form></app-form>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
        height: 100vh;
      }
    `,
  ],
})
export class DashboardComponent {}
