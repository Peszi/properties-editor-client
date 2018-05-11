import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Prop} from "./prop.model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {Config} from "protractor";
import {Property} from "./property-item/property.model";

@Injectable()
export class PropertiesService {

  properties :Property[] = [];

  constructor(private httpClient: HttpClient) {}

  getPropertiesResponse(): Observable<HttpResponse<Property[]>> {
    return this.httpClient.get<Property[]>('http://localhost:8080/api/properties', { observe: 'response', responseType: 'json' });
  }

  getPropertiesList() {
    return this.properties;
  }

  getProperties() {
    // return this.getPropertiesResponse()
    //   .pipe(map((recipes) => {
    //   console.log(recipes);
    //   for (let recipe of recipes) {
    //     if (!recipe['ingredients']) {
    //       recipe['ingredients'] = [];
    //     }
    //   }
    //   return recipes;
    // }))
    //   .subscribe(resp => {
    //     this.properties = resp.body;
    //     console.log(this.properties);
    // });
      // .pipe(map(
      //   (props) => {
      //     console.log(props);
      //     // for (let recipe of props) {
      //     //   if (!recipe['ingredients']) {
      //     //     recipe['ingredients'] = [];
      //     //   }
      //     // }
      //     // return recipes;
      //   }
      // ));
      // .subscribe(
      //   (prop: Prop[]) => {
      //     //
      //   }
      // );
  }
}
