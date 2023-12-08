import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WebService} from "../web.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient, private webService: WebService) { }

  submitNewAsset(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.webService.submitNewAsset(formData, headers)
  }

  getImages(): Observable<any> {
    return this.webService.getImages()
  }

  getImageURL(filePath: string): string {
    return this.webService.getImageURL(filePath)
  }
}
