import {b} from "@angular/core/src/render3";

export class Property {

  public key: string;
  public value: string;
  private active: boolean = false;
  private matched: boolean = false;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
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
