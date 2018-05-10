import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Property} from "../property-item/property.model";

@Component({
  selector: 'app-property-editor',
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.css']
})
export class PropertyEditorComponent implements OnInit {
  @Output() propertyInputChanged = new EventEmitter<{property: Property}>();

  propertyKey: string;
  propertyValue: string;

  constructor() { }

  ngOnInit() {
  }

  onPropertyTyped() {
    this.propertyInputChanged.emit({property: new Property(this.propertyKey, this.propertyValue)});
  }

}
