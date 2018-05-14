import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PropertiesComponent } from "./properties/properties.component";
import { PropertyEditorComponent } from "./properties/property-editor/property-editor.component";
import { PropertyItemComponent } from "./properties/property-item/property-item.component";
import { HeaderComponent } from './header/header.component';
import {PropertiesService} from "./properties/properties.service";
import {HttpClientModule} from "@angular/common/http";
import {DropdownDirective} from "./dropdown.directive";
import {RouterModule, Routes} from "@angular/router";
import { UploadComponent } from './upload/upload.component';

const appRoutes: Routes = [
  { path: '', component: UploadComponent },
  { path: 'edit', component: PropertiesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PropertiesComponent,
    PropertyEditorComponent,
    PropertyItemComponent,
    HeaderComponent,
    UploadComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PropertiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
