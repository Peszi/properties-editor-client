import {b} from "@angular/core/src/render3";
import {Prop} from "../prop.model";

export class Property extends Prop {

  private active: boolean = false;
  private matched: boolean = false;

  constructor(key: string, value: string) {
    super(key, value);
    this.active = false;
    this.matched = false;
  }

  setActive() {
    this.active = true;
  }

  setMatched() {
    this.matched = true;
  }

  isActive() : boolean {
    return this.active;
  }

  clearHighlights() {
    this.active = false;
    this.matched = false;
  }

  getHighlightClass() : String {
    if (this.active)
      return 'table-primary';
    if (this.matched)
      return 'table-warning';
    return '';
  }
}
