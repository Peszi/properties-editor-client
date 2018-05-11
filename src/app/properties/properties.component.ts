import {Component, EventEmitter, Output} from "@angular/core";
import {Property} from "./property-item/property.model";
import {Subject} from "rxjs/Subject";
import {PropertiesService} from "./properties.service";
import {debug} from "util";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
})
export class PropertiesComponent {
  propertySubject:Subject<Property> = new Subject();

  properties: Property[] = [
    new Property('spring.datasource.url', 'jdbc:h2:file:~/test;'),
    new Property('spring.datasource.username', 'sa'),
    new Property('spring.datasource.password', ''),
    new Property('logging.path', 'logs'),
    new Property('logging.config', 'classpath:logback-spring.xml')
  ];

  constructor(private propertiesService: PropertiesService) {

  }

  onReloadClick() {
    // setTimeout(() => {
    //   this.logs.push(this.propertyName);
    //   this.propertyName = '';
    // }, 1000);
  }

  onInputChanged(propertyInput: Property) {
    // for (let property of this.getProperties()) {
    //   property.clearHighlights();
    //   if (propertyInput.key.length > 0 && property.key.indexOf(propertyInput.key) == 0) {
    //     if (propertyInput.key == property.key) {
    //       property.setActive();
    //     } else {
    //       property.setMatched();
    //     }
    //   }
    // }
  }

  onPropertyPicked(property: Property) {
    this.propertySubject.next(property);
    this.onInputChanged(property);
  }

  private clearPropertiesHighlights() {
    // for (let property of this.getProperties())
    //   property.clearHighlights();
  }

  getProperties() {
    this.propertiesService.getPropertiesResponse().subscribe(resp => {
        this.properties = resp.body;
        console.log(this.properties);
    });
    debugger;
  }

  getPropertiesList() {
    this.propertiesService.getPropertiesList();
  }

}
