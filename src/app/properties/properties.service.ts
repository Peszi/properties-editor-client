import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Prop} from "./prop.model";
import {map} from "rxjs/operators";
import {Property} from "./property-item/property.model";

@Injectable()
export class PropertiesService {

  properties: Property[] = [];

  constructor(private httpClient: HttpClient) {}

  uploadPropertiesFile(file: File) {
    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    let headers = new HttpHeaders({
      'Content-Type':  'multipart/form-data',
    })
    this.httpClient.post('http://localhost:8080/api/properties/upload', { headers: headers, responseType: 'json' })
      .subscribe(
        next => { console.log(next); },
          error => { console.log(error); },
        () => { console.log('complete'); }
      )
  }

  downloadProperties() {
    this.httpClient.get<Prop[]>('http://localhost:8080/api/properties', { observe: 'body', responseType: 'json' })
      .pipe(map((props) => {
        let properties = [];
        for (let prop of props)
          properties.push(new Property(prop.key, prop.value));
        return properties;
      }))
      .subscribe((properties) => {
        this.properties = properties;
      });
  }

  getPropertiesList() : Property[] {
    return this.properties;
  }



  // downloadProperties() {
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
  // }
}
