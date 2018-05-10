import {Component, EventEmitter, Output} from "@angular/core";
import {Property} from "./property-item/property.model";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
})
export class PropertiesComponent {
  propertySubject:Subject<Property> = new Subject();

  properties: Property[] = [
    new Property('spring.h2.console.enabled', 'true'),
    new Property('spring.jpa.show-sql', 'true'),
    new Property('spring.jpa.hibernate.ddl-auto', 'create-drop'),
    new Property('spring.datasource.platform', 'h2'),
    new Property('spring.datasource.driverClassName', 'org.h2.Driver'),
    new Property('spring.datasource.url', 'jdbc:h2:file:~/test;'),
    new Property('spring.datasource.username', 'sa'),
    new Property('spring.datasource.password', ''),
    new Property('logging.path', 'logs'),
    new Property('logging.config', 'classpath:logback-spring.xml')
  ];

  constructor() {

  }

  onReloadClick() {
    // setTimeout(() => {
    //   this.logs.push(this.propertyName);
    //   this.propertyName = '';
    // }, 1000);
  }

  onInputChanged(propertyInput: Property) {
    for (let property of this.properties) {
      property.clearHighlights();
      if (property.key.indexOf(propertyInput.key) == 0) {
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

  private clearPropertiesHighlights() {
    for (let property of this.properties)
      property.clearHighlights();
  }

}
