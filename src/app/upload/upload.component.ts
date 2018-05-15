import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PropertiesService} from "../properties/properties.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

const DEFAULT_NAME: string = 'Choose file..';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public isUploading: boolean;
  public fileName: string = DEFAULT_NAME;
  private progressValue;

  // private subscription: Subscription;

  @ViewChild('fileInput') fileInput : ElementRef;

  constructor(private propertiesService : PropertiesService, private router: Router) {}

  ngOnInit() {}

  onFileChange(event: any) {
    const fileInput = (<HTMLInputElement>event.target);
    if (fileInput.files.length > 0) {
      this.fileName = fileInput.files[0].name;
    }
  }

  onUploadFile() {
    if (this.hasFile() && !this.isUploading) {
      this.isUploading = true;
      this.propertiesService.uploadPropertiesFile(this.fileInput.nativeElement.files).subscribe(
        (progress) => this.progressValue = progress,
        (error) => console.error(error),
        () => { this.onUploadComplete(); }
      );
    } else {
      console.log('hasFile ' + this.hasFile() + " notUploading " + !this.isUploading);
    }
  }

  private onUploadComplete() {
    this.isUploading = false;
    if (this.hasFile()) {
      this.router.navigate(['/edit']);
    }
  }

  hasFile() : boolean {
    return (this.fileName != DEFAULT_NAME);
  }

  getProgress() : string {
    return this.progressValue + '%';
  }

}
