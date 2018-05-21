import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Prop} from "./prop.model";
import {map} from "rxjs/operators";
import {Property} from "./property-item/property.model";
import {Subject} from "rxjs/Subject";

const NO_FILE_TEXT: string = 'no file';

@Injectable()
export class PropertiesService {

  private fileName: String = '';

  private propertiesList: Property[] = [];
  private auditLogsList: string[] = [];

  constructor(private httpClient: HttpClient) {}

  // Manage Property File

  uploadPropertiesFile(files: FileList) {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i], files[i].name);
    }
    const subject = new Subject<number>();
    this.httpClient.post('http://localhost:8080/api/properties/upload', formData, { observe: 'events', responseType: 'json', reportProgress: true })
      .subscribe(
        (event: HttpEvent<any>) => { this.getEventMessage(event, subject) },
        (error) => { subject.error(error); },
      () => {
          this.fileName = files[0].name;
          subject.complete();
          this.auditLogsList = [];
        }
      );
    return subject;
  }

  onPropertiesDiscard() {
    this.fileName = '';
  }

  // Get Properties

  getProperties() {
    this.httpClient.get<Prop[]>('http://localhost:8080/api/properties', { observe: 'body', responseType: 'json' })
      .pipe(
        map((props) => {return this.toPropertiesList(props); }
        ))
      .subscribe(
        (properties) => {this.propertiesList = properties; }
        );
  }

  getAuditLogs() {
    this.httpClient.get<string[]>('http://localhost:8080/api/properties/audit', { observe: 'body', responseType: 'json' })
      .subscribe(
        (logs) => { this.auditLogsList = logs; }
      );
  }


  // Modify Properties

  modifyProperty(property: Property) {
    if (this.hasProperty(property))
      return;
    let params = new HttpParams().set('key', property.key).append('value', property.value)
    this.httpClient.post<Prop[]>('http://localhost:8080/api/properties',  null, { params: params, observe: 'body', responseType: 'json' })
      .pipe(map((props) => {
        return this.toPropertiesList(props);
      }))
      .subscribe(
        (properties) => { this.propertiesList = properties; },
        (error) => { console.log(error); },
      () => { this.getAuditLogs(); }
      );
  }

  deleteProperty(property: Property) {
    let params = new HttpParams().set('key', property.key).append('value', property.value)
    this.httpClient.delete<Prop[]>('http://localhost:8080/api/properties',  { params: params, observe: 'body', responseType: 'json' })
      .pipe(map((props) => {
        return this.toPropertiesList(props);
      }))
      .subscribe(
        (properties) => { this.propertiesList = properties; },
        (error) => { console.log(error); },
      () => { this.getAuditLogs(); }
      );
  }

  // Getters

  getPropertiesList() : Property[] {
    return this.propertiesList;
  }

  getAuditLogsList() : String[] {
    return this.auditLogsList;
  }

  hasPropertiesList() {
    return (this.fileName != '');
  }

  getPropertiesFileName() {
    if (this.hasPropertiesList()) {
      return this.fileName;
    }
    return NO_FILE_TEXT;
  }

  private toPropertiesList(props: Prop[]) : Property[] {
    let properties = [];
    for (let prop of props) {
      let property = new Property(prop.key, prop.value);
      properties.push(property);
      if (!this.hasProperty(property)) {
        property.setAppearing();
        setTimeout(() => {
          property.clearHighlights();
        }, 10);
      }
    }
    return properties;
  }

  private hasProperty(newProperty: Property) {
    for (let property of this.propertiesList) {
      if (newProperty.key === property.key
        && newProperty.value === property.value) {
        return true;
      }
    }
    return false;
  }

  hasPropertyChanged(newProperty: Property) {
    for (let property of this.propertiesList) {
      if (newProperty.key === property.key && newProperty.value != property.value) {
        return true;
      }
    }
    return false;
  }

  private getEventMessage(event: HttpEvent<any>, subject: Subject<number>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const progress = Math.round(100 * event.loaded / event.total);
        subject.next(progress);
        break;
      case HttpEventType.Response:
        this.propertiesList = this.toPropertiesList(event.body);
        break;
      default:
    }
  }

}
