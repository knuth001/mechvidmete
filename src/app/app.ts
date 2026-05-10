import { Component, signal } from '@angular/core';
import { TodoComponent } from './todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mechvidmete');
}
