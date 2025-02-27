import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';

// export const selectGroceries = (state: { groceries: Grocery[] }) =>
//   state.groceries;

export const selectGroceries = createFeatureSelector<Grocery[]>('groceries');

export const selectGroceryByType = (type: string) =>
  createSelector(
    selectGroceries,
    // here in the state we will get whatever the selectGroceries selector is returning to us

    (state) => {
      // console.log('select by type called');
      return state.filter((item) => item.type === type);
    }
  );
