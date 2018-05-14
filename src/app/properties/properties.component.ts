import {Component, EventEmitter, Output} from "@angular/core";
import {Property} from "./property-item/property.model";
import {Subject} from "rxjs/Subject";
import {PropertiesService} from "./properties.service";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
})
export class PropertiesComponent {
  propertySubject:Subject<Property> = new Subject();

  constructor(private propertiesService: PropertiesService) {}

  onInputChanged(propertyInput: Property) {
    for (let property of this.propertiesService.getPropertiesList()) {
      property.clearHighlights();
      if (propertyInput.key.length > 0 && property.key.indexOf(propertyInput.key) == 0) {
        if (propertyInput.key == property.key) {
          property.setActive();
        } else {
          property.setMatched();
        }
      }
    }
  }

  onPropertyPicked(property: Property) {
    this.propertySubject.next(property);
    this.onInputChanged(property);
  }

  downloadProperties() {
    this.propertiesService.downloadProperties();
  }

  getPropertiesList() : Property[] {
    return this.propertiesService.getPropertiesList();
  }


  private clearPropertiesHighlights() {
    for (let property of this.propertiesService.getPropertiesList())
      property.clearHighlights();
  }

}
