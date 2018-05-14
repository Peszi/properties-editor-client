import {k} from "@angular/core/src/render3";

export class Prop {

  public key: string;
  public value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}
