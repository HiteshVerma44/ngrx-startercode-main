import { createReducer, on } from '@ngrx/store';
import { Bucket } from '../../../models/bucket.model';
import { addToBucket, removeFromBucket } from '../actions/bucket.action';

const initialState: Bucket[] = [];

export const bucketReducer = createReducer(
  initialState,
  on(addToBucket, (state, actions) => {
    const bucketItem = state.find((item) => item.id === actions.payload.id);

    if (bucketItem) {
      return state.map((item) => {
        return item.id == actions.payload.id
          ? { ...item, quantity: item.quantity + actions.payload.quantity }
          : item;
      });
    } else {
      return [...state, actions.payload]; // this return item is the new state of the Bucket
    }
  }),

  on(removeFromBucket, (state, action) => {
    const existingItem = state.find((item) => item.id === action.payload.id);

    if (existingItem && existingItem.quantity > 1) {
      return state.map((item) => {
        return item.id == action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      });
    } else {
      return state.filter((item) => item.id !== action.payload.id);
    }
  })
);
