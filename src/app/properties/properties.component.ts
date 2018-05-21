import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Property} from "./property-item/property.model";
import {Subject} from "rxjs/Subject";
import {PropertiesService} from "./properties.service";
import {Router} from "@angular/router";
import {p} from "@angular/core/src/render3";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
})
export class PropertiesComponent implements OnInit {
  isValueChanged: boolean = false;
  propertySubject:Subject<Property> = new Subject();

  constructor(private propertiesService: PropertiesService, private router: Router) {}

  ngOnInit(): void {
    if (!this.propertiesService.hasPropertiesList()) {
      this.router.navigate(['/']);
    }
  }

  // Editor Event

  onInputKeyChanged(propertyInput: Property) {
    this.highlightMatches(propertyInput);
    this.checkPropertyKey(propertyInput);
  }

  onInputValueChanged(propertyInput: Property) {
   this.checkPropertyKey(propertyInput);
  }

  // Property Events

  onPropertyApproved(property: Property) {
    this.propertiesService.modifyProperty(property);
  }

  onPropertyPicked(property: Property) {
    this.propertySubject.next(property);
    this.onInputKeyChanged(property);
    this.onInputValueChanged(property);
  }

  onPropertyDelete(property: Property) {
    this.propertiesService.deleteProperty(property);
  }

  // Getters

  getPropertiesList() : Property[] {
    return this.propertiesService.getPropertiesList();
  }

  getAuditLogsList() : String[] {
    return this.propertiesService.getAuditLogsList();
  }

  hasAuditLogs() {
    return (this.propertiesService.getAuditLogsList().length > 0);
  }

  // Utility

  private checkPropertyKey(property: Property) {
    this.isValueChanged = this.propertiesService.hasPropertyChanged(property);
  }

  private highlightMatches(propertyInput: Property) {
    for (let property of this.propertiesService.getPropertiesList()) {
      property.clearHighlights();
      if (propertyInput.key.length > 0 && property.key.indexOf(propertyInput.key) == 0) {
        if (propertyInput.key == property.key) {
          property.active = true;
        } else {
          property.matched = true;
        }
      }
    }
  }
}
