import { Component } from '@angular/core';
import { MainModule } from '../main-module/main.module';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MainModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

}
