import { createReducer, on } from '@ngrx/store';
import { Todo } from './todo.model';
import { addTodo, removeTodo, updateTodo } from './todo.actions';

export const initialTodoState: Todo[] = [];

export const todoReducer = createReducer(
  initialTodoState,
  on(addTodo, (state, { todo }) => [...state, todo]),
  on(removeTodo, (state, { id }) => state.filter((item) => item.id !== id)),
  on(updateTodo, (state, { todo }) =>
    state.map((item) => (item.id === todo.id ? { ...item, ...todo } : item))
  )
);
