import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { GroceryService } from '../../grocery.service';
import { groceryAction } from '../actions/grocery.action';
import { Grocery } from '../../../models/grocery.model';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  private groceryService = inject(GroceryService);

  loadGroceries$ = createEffect(() => {
    return this.actions$.pipe(  // this.actions$ returns an observable here
      ofType(groceryAction.loadGroceries),  // we can also give multiple values in here
      // use any flatening operator here , like switchMap, exhaustMap, any other
      exhaustMap(() =>
        this.groceryService.fetchAllGroceries().pipe(
            map((groceries: any) => // Type the groceries as an array of Grocery
            groceryAction.loadGroceriesSuccess({ payload: groceries })
          ),
          catchError(() => of(groceryAction.loadGroceriesFailure())) // Handle error with the failure action
        )
      )
    );
    
    
  });
}
