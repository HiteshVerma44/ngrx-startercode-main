# Angular 17 Notes

## Setup & Installation
- **Update Angular CLI:** 
  ```bash
  npm install --global @angular/cli@next
  npm i --global @angular/cli@latest
  ```
- **Check Angular Version:** 
  ```bash
  ng v
  ```
- **Create a New Project:** 
  ```bash
  ng new angular-basics
  ```
- **Serve the Application:** 
  ```bash
  ng serve --open
  ```

## Components

### Standalone Components
- Standalone components can directly import other standalone components
- No need for NgModule declarations

### Component Selectors
- **Type Selector:** `selector: 'app-root'`
- **Attribute Selector:** `selector: '[app-root]'`
- **Class Selector:** `selector: '.app-root'`
- **Combined Selectors:** Can use type and attribute selectors together

### View Encapsulation
1. **ViewEncapsulation.Emulated (Default)**
   - CSS applies only to the component
   - Angular generates unique HTML attributes for component instances
   - Supports `:host` and `:host-context` pseudo-selectors

2. **ViewEncapsulation.ShadowDOM**
   - Uses browser's native Shadow DOM
   - Component styles isolated from global styles

3. **ViewEncapsulation.None**
   - Styles applied globally to the entire application

## Component Communication

### @Input Decorator
- Passes data from parent to child components
- **Basic Usage:**
  ```typescript
  @Input() count: number = 0;
  ```
- **Advanced Options:**
  ```typescript
  @Input({ 
    required: true, 
    transform: changeValue, 
    alias: 'dummyNameCounter' 
  })
  count: number = 0;
  
  function changeValue(value: number) {
    return value * 10;
  }
  ```
- **Built-in Transforms:**
  ```typescript
  @Input({ transform: booleanAttribute })
  showCounter: boolean = false;
  ```
- **Getters and Setters:**
  ```typescript
  private _title: string = '';
  
  @Input()
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value.trim().toUpperCase();
  }
  ```

### @Output Decorator
- Sends data from child to parent using EventEmitter
- **Basic Usage:**
  ```typescript
  @Output() dataEvent = new EventEmitter<string>();
  
  // Child component method
  sendData() {
    this.dataEvent.emit('data from child component');
  }
  
  // Parent component template
  <div (dataEvent)="receiveData($event)">Receive button</div>
  
  // Parent component method
  receiveData(data: string) {
    console.log(data);
  }
  ```
- **Using Alias:**
  ```typescript
  @Output('childDataEmitter') dataEmitter = new EventEmitter();
  ```
  Or in component decorator:
  ```typescript
  @Component({
    outputs: ['dataEvent: childEvent']
  })
  ```

## Content Projection

### ng-content
- Special placeholder for content projection
- **Basic Usage:**
  ```html
  <!-- Parent template -->
  <app-card>
    <p>This is the card content</p>
  </app-card>
  
  <!-- Card component template -->
  <p>Card Works! <ng-content></ng-content></p>
  ```

### Multiple Content Placeholders
- Use CSS selectors to target specific content
  ```html
  <!-- Card component template -->
  <div class="card">
    <ng-content select="[title]"></ng-content>
    <ng-content select="[body]"></ng-content>
  </div>
  
  <!-- Parent template -->
  <app-card>
    <p title>This is the title</p>
    <p body>This is the body</p>
  </app-card>
  ```

## CSS and Styling

### Host Selectors
```css
:host {
  display: block;
  background-color: red;
  color: blue;
}

:host-context(.hi-leela) {
  display: block;
  background-color: red;
  color: blue;
}
```

### Style Inheritance
```css
/* Not recommended - affects outside elements */
::ng-deep .child-element {
  color: yellow;
}

/* Better approach - scoped to host component */
:host ::ng-deep .child-element {
  color: yellow;
}
```
