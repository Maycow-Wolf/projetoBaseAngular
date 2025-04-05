import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainModule } from './user/main-module/main.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None, //Isso permitirá que o CSS seja aplicado globalmente sem precisar do ::ng-deep
})

export class AppComponent {
}
