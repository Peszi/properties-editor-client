import {b} from "@angular/core/src/render3";
import {Prop} from "../prop.model";
import {OnChanges, SimpleChanges} from "@angular/core";

export class Property extends Prop {

  active: boolean;
  matched: boolean;

  constructor(key: string, value: string) {
    super(key, value);
    this.clearHighlights();
  }

  setAppearing() {
    this.active = true;
    this.matched = true;
  }

  clearHighlights() {
    this.active = false;
    this.matched = false;
  }
}
