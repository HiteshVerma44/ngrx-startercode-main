import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';

// export const initGroceries = createAction(
//     '[Grocery] Load Groceries'
// )

// export const completedGrocieries = createAction(
//     '[Grocery] Load Groceries success'
// )

export const groceryAction = createActionGroup({
  source: 'Grocery API', // here we mention the api request , from where the request has originated,

  events: {
    'Load groceries': emptyProps(),
    'Load groceries Success ': props<{ payload: Grocery[] }>(),
    'Load groceries failure': emptyProps(),
  },
});


