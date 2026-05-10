import { createAction, props } from '@ngrx/store';
import { Todo } from './todo.model';

export const addTodo = createAction('[Todo] Add', props<{ todo: Todo }>());
export const removeTodo = createAction('[Todo] Remove', props<{ id: string }>());
export const updateTodo = createAction('[Todo] Update', props<{ todo: Todo }>());
