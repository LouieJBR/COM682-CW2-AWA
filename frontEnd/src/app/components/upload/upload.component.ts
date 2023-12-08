import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  // URLs for API endpoints
  IUPS = "https://create-img.azurewebsites.net:443/api/CREATE-IMG/triggers/When_a_HTTP_request_is_received/invoke?api-version=2022-05-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=_QuKtUiHotgMIlGXva39kQt2Cm3TlNOtjZS4UrCIK5k";
  selectedFile: File | undefined;
  fileName: string = '';
  userID: string = '';
  userName: string = '';

  constructor(private http: HttpClient) {}

  submitNewAsset() {
    console.log()
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const body = new HttpParams()
      .set('FileName', this.fileName)
      .set('userID', this.userID)
      .set('userName', this.userName);

    this.http.post(this.IUPS, body.toString(), {headers}).subscribe((data) => {
      console.log(data)
      window.location.href = '/'
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.selectedFile) {
      // Handle case where no file is selected
      return;
    }

    const formData = new FormData();
    formData.append('FileName', this.fileName);
    formData.append('userID', this.userID);
    formData.append('userName', this.userName);
    formData.append('File', this.selectedFile);
    // console.log('fileName:', this.fileName);
    // console.log('userID:', this.userID);
    // console.log('userName:', this.userName);

    this.submitNewAsset();

    // Reset form fields and selected file after submission
    this.fileName = '';
    this.userID = '';
    this.userName = '';
    this.selectedFile = undefined;
  }
}
