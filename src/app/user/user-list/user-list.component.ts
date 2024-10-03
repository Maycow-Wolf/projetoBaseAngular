import { Component } from '@angular/core';
import { MainModule } from '../main-module/main.module';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MainModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

}
