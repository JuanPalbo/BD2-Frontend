import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalendarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'BD2-Frontend';
}
