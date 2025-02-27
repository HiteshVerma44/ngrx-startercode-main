import { createReducer, on } from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';
import { groceryAction } from '../actions/grocery.action';

// array of object with inital states

// const initialState: Grocery[] = [
//   { id: 1, name: 'Milk', type: 'fruit' },
//   { id: 2, name: 'Banana', type: 'fruit' },
//   { id: 3, name: 'lays chips', type: 'snacks' },
//   { id: 4, name: 'mad angle', type: 'snacks' },
// ];

const initialState: Grocery[] = [];

export const groceryReducer = createReducer(
  initialState,
  on(groceryAction.loadGroceriesSuccess, (state, action) => {
    return action.payload;
  }),
  on(groceryAction.loadGroceriesFailure, (state, action) => {
    return [];
  }),
);
