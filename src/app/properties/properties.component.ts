import {Component, EventEmitter, Output} from "@angular/core";
import {Property} from "./property-item/property.model";
import {p} from "@angular/core/src/render3";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
})
export class PropertiesComponent {
  @Output() propertyPicked = new EventEmitter<{property: Property}>();

  properties: Property[] = [
    new Property('some.property', 'some.value'),
    new Property('some.property2', 'some.value2'),
    new Property('some.property3', 'some.value3')
  ];

  constructor() {

  }

  onReloadClick() {
    // setTimeout(() => {
    //   this.logs.push(this.propertyName);
    //   this.propertyName = '';
    // }, 1000);
  }

  onInputChanged(event: {property: Property}) {
    console.log("new input " + event.property.key + " : " + event.property.value)
    // this.propertyName = (<HTMLInputElement>event.target).value;
  }

  onPropertyPicked(property: Property) {
    this.propertyPicked.emit({property: property})
    this.clearPropertiesHighlights()
    property.active = true;
  }

  private clearPropertiesHighlights() {
    for (let property of this.properties)
      property.active = false;
  }

}
