import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Property} from "./property.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {b} from "@angular/core/src/render3";

@Component({
  selector: '[app-property-item]',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css'],
  animations: [
    trigger('itemState', [
      state('normal', style( {
        'background-color': 'transparent',
        'opacity': '1.0',
        transform: 'translateX(0)'
        })),
      state('active', style( {
        'background-color': '#b8daff',
        'opacity': '1.0',
        transform: 'translateX(0)'
        })),
      state('matched', style( {
        'background-color': '#ffeeba',
        'opacity': '1.0',
        transform: 'translateX(0)'
      })),
      state('appear', style( {
        'background-color': '#b8ffda',
        'opacity': '0.0',
        transform: 'translateX(-500px)'
      })),
      state('disappear', style( {
        'opacity': '0.0',
        transform: 'translateX(-500px)'
      })),
      transition('* => active', animate(250)),
      transition('* => matched', animate(500)),
      transition('appear => normal', animate(400)),
      transition('* => normal', animate(300)),
      transition('* => disappear', animate(400)),
    ]),
  ]
})
export class PropertyItemComponent {
  @Input('app-property-item') property: Property;
  @Output() deleteEvent: EventEmitter<Property> = new EventEmitter<Property>();

  private toDelete: boolean;

  constructor() {}

  onPropertyDelete() {
    this.toDelete = true;
    setTimeout(() => {
      this.deleteEvent.emit(this.property);
    }, 400);
  }

  isActive() : boolean {
    return this.property.active && !this.property.matched;
  }

  getItemState() : String {
    if (this.toDelete)
      return 'disappear';
    if (this.property.active && this.property.matched)
      return 'appear';
    if (this.property.active)
      return 'active';
    if (this.property.matched)
      return 'matched';
    return 'normal';
  }
}
