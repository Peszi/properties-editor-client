import { Component, OnInit } from '@angular/core';
import {PropertiesService} from "../properties/properties.service";

const DEFAULT_NAME: string = 'Choose file..';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public isUploading: boolean;
  public fileName: string;
  private progressValue;

  fileModel : any;

  constructor(private propertiesService : PropertiesService) { }

  ngOnInit() {
    this.init();
    setInterval(() => {
      if (this.isUploading) {
        this.progressValue++;
        if (this.progressValue >= 100) {
          this.init();
        }
      }
    },100);
  }

  init() {
    this.fileName = DEFAULT_NAME;
    this.progressValue = 0;
    this.isUploading = false;
  }

  onFileChange(event: any) {
    const fileInput = (<HTMLInputElement>event.target);
    if (fileInput.files.length > 0) {
      this.fileName = fileInput.files[0].name;
      this.propertiesService.uploadPropertiesFile(fileInput.files[0]);
    }
  }

  onUploadFile() {
    this.isUploading = true;
  }

  hasFile() : boolean {
    return (this.fileName != DEFAULT_NAME);
  }

  getProgress() : string {
    return this.progressValue + '%';
  }


}
