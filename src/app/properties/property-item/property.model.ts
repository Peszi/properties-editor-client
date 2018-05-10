import {b} from "@angular/core/src/render3";

export class Property {

  public key: string;
  public value: string;
  private active: boolean;
  private matched: boolean;

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

  clearHighlights() {
    this.active = false;
    this.matched = false;
  }

  isActive() : boolean {
    return this.active;
  }

  isMatched() : boolean {
    return this.matched;
  }

  getHighlightClass() : String {
    // console.log("------------");
    console.log("select " + this.isMatched() + " active " + this.isActive());
    if (this.active) {
      return 'table-primary';
    }
    if (this.matched) {
      return 'table-warning';
    }
    return '';
  }
}
