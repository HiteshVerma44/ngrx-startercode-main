import { Component, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '../../../models/grocery.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  addToBucket,
  removeFromBucket,
} from '../../store/actions/bucket.action';
import {
  selectGroceries,
  selectGroceryByType,
} from '../../store/selectors/grocery.selectors';

@Component({
  selector: 'app-grocery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css',
})
export class GroceryComponent {
  groceries$?: Observable<Grocery[]>;
  filteredGroceries$?: Observable<Grocery[]>;
 
  // here we must mention the type of data in the store , so as this suggest us the type of store

  constructor(private store: Store<{ groceries: Grocery[] }>) {
    // to consume the data, we first need to pass/inject store in the constructor and then , select the store, whose data we pass to pass

    // this.groceries$ = store.select('groceries'); // whatever you select here is observable, select() method return the observerable

    this.groceries$ = store.select(selectGroceries);
    // this.groceries$ = store.select(selectGroceryByType);
  }

  onTypeChange(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;

    if (selectedType) {
      return (this.filteredGroceries$ = this.store.select(
        selectGroceryByType(selectedType)
      ));
    } else {
      return (this.filteredGroceries$ = undefined);
    }
  }

  increment(item: Grocery) {
    const payload = {
      id: item.id,
      name: item.name,
      quantity: 1,
    };
    // this.store.dispatch({ type: 'Update', payload: payload });

    // this.store.dispatch(addToBucket({ id: payload.id, name: payload.name }));

    this.store.dispatch(
      addToBucket({
        // payload: payload,
        payload,
      })
    );
  }

  decrement(item: Grocery) {
    const payload = {
      id: item.id,
      // name: item.name,
      // quantity: 1,
    };

    this.store.dispatch(
      removeFromBucket({
        payload,
      })
    );
  }
}
