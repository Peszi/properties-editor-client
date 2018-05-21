import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Property} from "../property-item/property.model";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-property-editor',
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.css'],
})
export class PropertyEditorComponent implements OnInit {
  @Input() isValueChanged: boolean;
  @Input() propertySubject:Subject<Property>;
  @Output() propertyKeyInputChanged = new EventEmitter<Property>();
  @Output() propertyValueInputChanged = new EventEmitter<Property>();
  @Output() propertyApproved = new EventEmitter<Property>();

  propertyKey: string;
  propertyValue: string;

  constructor() { }

  ngOnInit() {
    this.propertySubject.subscribe(property => {
      this.propertyKey = property.key;
      this.propertyValue = property.value;
    });
  }

  onKeyUp(event: any) {
    if (event.key === 'Enter') {
      this.propertyApproved.emit(new Property(this.propertyKey, this.propertyValue));
    }
  }

  onClear() {
    this.propertyKey = '';
    this.propertyValue = '';
    this.onInputKeyChanged(this.propertyKey);
    this.onInputValueChanged(this.propertyValue);
  }

  onInputKeyChanged(value) {
    this.propertyKeyInputChanged.emit(new Property(value, this.propertyValue));
  }

  onInputValueChanged(value) {
    this.propertyValueInputChanged.emit(new Property(this.propertyKey, value));
  }

  getInputValueClass() {
    if (this.isValueChanged) {
      return 'is-invalid';
    }
    return 'ng-valid';
  }
}
