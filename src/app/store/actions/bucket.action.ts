import { createAction, props } from '@ngrx/store';
import { Bucket } from '../../../models/bucket.model';

export const addToBucket = createAction(
  '[Bucket] Add', // here we have defined the type , that this action is related to Bucket state and here we are going to add the items

  // props<{id: number, name: string }>() // to send this as a payload, here we are passing data indivisually, instead we can pass the total payload also , as below

  props<{ payload: Bucket }>()
);

export const removeFromBucket = createAction(
  '[Bucket] Remove',
  props<{ payload: Partial<Bucket> }>()
);
