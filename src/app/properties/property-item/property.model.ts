import {b} from "@angular/core/src/render3";

export class Property {

  public key: string;
  public value: string;
  active = false;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  isActive() {
    return this.active;
  }
}
