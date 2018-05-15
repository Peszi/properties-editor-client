import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertiesService} from "../properties/properties.service";
import {Subscription} from "rxjs/Subscription";

const NO_FILE_TEXT: string = 'no file';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private propertiesService: PropertiesService) {
    // this.fileSubscription = this.propertiesService.fileSubject.subscribe(
    //   (fileName) => { this.fileName = fileName; }
    //   );
  }

  ngOnInit() {}

  ngOnDestroy() {
    // this.fileSubscription.unsubscribe()
  }

  onDiscard() {
    this.propertiesService.onPropertiesDiscard();
  }

  hasFile() : boolean {
    return this.propertiesService.hasPropertiesList();
  }

  getFileName() {
    return '<' + this.propertiesService.getPropertiesFileName() + '>';
  }

}
