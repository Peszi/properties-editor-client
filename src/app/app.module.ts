import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PropertiesComponent } from "./properties/properties.component";
import { PropertyEditorComponent } from "./properties/property-editor/property-editor.component";
import { PropertyItemComponent } from "./properties/property-item/property-item.component";
import { HeaderComponent } from './header/header.component';
import { TestComponent } from './properties/test/test.component';
import {PropertiesService} from "./properties/properties.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PropertiesComponent,
    PropertyEditorComponent,
    PropertyItemComponent,
    HeaderComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PropertiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
