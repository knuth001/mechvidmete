import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from './store/todo.model';
import { addTodo, removeTodo, updateTodo } from './store/todo.actions';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  readonly todos$: Observable<Todo[]>;
  readonly newText = signal('');
  readonly editingId = signal<string | null>(null);
  readonly editText = signal('');

  constructor(private readonly store: Store<{ todos: Todo[] }>) {
    this.todos$ = this.store.select('todos');
  }

  addTodo(): void {
    const text = this.newText().trim();
    if (!text) {
      return;
    }

    const todo: Todo = {
      id: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}`,
      text,
      completed: false,
    };

    this.store.dispatch(addTodo({ todo }));
    this.newText.set('');
  }

  removeTodo(id: string): void {
    this.store.dispatch(removeTodo({ id }));
    if (this.editingId() === id) {
      this.cancelEdit();
    }
  }

  startEdit(todo: Todo): void {
    this.editingId.set(todo.id);
    this.editText.set(todo.text);
  }

  saveEdit(todo: Todo): void {
    const text = this.editText().trim();
    if (!text) {
      return;
    }

    this.store.dispatch(updateTodo({ todo: { ...todo, text } }));
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editText.set('');
  }

  toggleCompleted(todo: Todo): void {
    this.store.dispatch(updateTodo({ todo: { ...todo, completed: !todo.completed } }));
  }
}
