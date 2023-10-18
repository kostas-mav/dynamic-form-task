import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from 'src/app/shared/components/list-item/list-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {}
