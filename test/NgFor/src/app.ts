//our root app component
import {
  Component,
  View,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES
} from 'angular2/angular2'
@Component({
  selector: 'my-app'
})
@View({
  template: `
    <div>
      <p>This example maintains a list of randomly generated letters and numbers.
      They can be added, removed, or reordered. Each item also displays a generation
      counter, which updates when the list changes in any way, allowing Angular's
      updates to the DOM to be visualized.</p>
      <ul>
        <li *ng-for="#el of list; #idx = index" [style.font-weight]="el.generation == generation && generation > 0 ? 'bold' : 'normal'">
          i{{idx}}, g:{{el.generation}} - {{el.letter}}{{el.number}}
          <input [(ng-model)]="el.value">
          <button *ng-if="idx > 0" (click)="move(idx, 1)">Up</button>
          <button *ng-if="idx < list.length - 1" (click)="move(idx, -1)">Down</button>
          <button (click)="remove(idx)">Remove</button>
        </li>
      </ul>
      <button (click)="addItem(true)">Add Item in Random Position</button>
    </div>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class App {
  generation = 0;
  list: Object[] = [];
  
  constructor() {
    for (var i = 0; i < 5; i++) {
      this.addItem(false);
    }
  }
  
  addItem(updateGeneration: boolean) {
    if (updateGeneration) {
      this.generation++;
    }
    this.list.splice(this._randomIndex(), 0, {
      'letter': this._randomLetter(),
      'number': this._randomNumber(),
      'generation': this.generation,
      'value': ''
    });
  }
  
  move(idx: number, step: number) {
    this.generation++;
    var tmp = this.list[idx];
    tmp.generation = this.generation;
    this.list[idx] = this.list[idx - step];
    this.list[idx - step] = tmp;
    this.list[idx].generation = this.generation;
  }
  
  remove(idx: number) {
    this.generation++;
    this.list.splice(idx, 1);
  }
  
  _randomIndex(): number {
    return Math.floor(Math.random() * this.list.length);
  }
  
  _randomLetter(): string {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'][this._randomNumber()];
  }
  
  _randomNumber(): number {
    return Math.floor(Math.random() * 10);
  }
}
