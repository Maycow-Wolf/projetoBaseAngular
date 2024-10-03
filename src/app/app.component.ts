import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainModule } from './user/main-module/main.module';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aprendendo_angular';
}
