import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core'
import {CookieService} from 'ngx-cookie-service';
import {catchError, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "./services/AuthService";

@Injectable()
export class WebService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private authService: AuthService) {}

  private productID: any;

  private IUPS = "https://create-img.azurewebsites.net:443/api/CREATE-IMG/triggers/When_a_HTTP_request_is_received/invoke?api-version=2022-05-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=_QuKtUiHotgMIlGXva39kQt2Cm3TlNOtjZS4UrCIK5k";
  private RAI = "https://create-img.azurewebsites.net/api/GET-IMG/triggers/When_a_HTTP_request_is_received/invoke?api-version=2022-05-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=TKd8g8NgNZmYPcAct5-5HXqwj6qwBgXYYVmNfaqMHgk";
  private BLOB_ACCOUNT = "https://louiebrowncom682.blob.core.windows.net";

  submitNewAsset(formData: FormData, headers: HttpHeaders): Observable<any> {
    return this.http.post(this.IUPS, formData, { headers: headers });
  }

  getImages(): Observable<any> {
    return this.http.get(this.RAI);
  }

  getImageURL(filePath: string): string {
    return this.BLOB_ACCOUNT + filePath;
  }

  getReviews(id:any){
    return this.http.get(
      'http://localhost:5000/api/v1.0/products/' +
      id + '/reviews')
  }

  login(data: any, options: any) {
    return this.http.post<any>('http://localhost:5000/api/v1.0/login', data, options).pipe(
      catchError((error: any) => {
        console.error('Error occurred:', error);
        let errorMessage = 'Login failed. Please check your credentials.'; // Default error message
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message; // Use the error message from the API response if available
        }
        return throwError(errorMessage); // Pass the error message down the observable chain
      }),
      tap((response: any) => {
        console.log('Response received:', response); // Log the full response for debugging
        if (response && response.token) {
          console.log('Token:', response.token); // Log the token if available
          this.authService.setAuthToken(response.token)
          // Assuming you have a function to save the token
          // Save the token here
          this.router.navigate(['/']); // Manually navigate to the home page
        } else {
          console.log('Invalid response');

        }
      })
    );
  }

  logout(){
    this.authService.logout()
    return this.http.get('http://localhost:5000/api/v1.0/logout');
  }


  postReview(review: any){
    let postData = new FormData();
    postData.append("username", review.username);
    postData.append("comment", review.comment);
    postData.append("stars", review.stars);
    // Todo: Add date posted field to reviews
    // let today = new Date();
    // let todayDate = today.getFullYear() + "-" +
    //   today.getMonth() + "-" +
    //   today.getDate();
    // postData.append("date", todayDate);

    return this.http.post('http://localhost:5000/api/v1.0/products/' +
      this.productID + '/reviews', postData);
  }
  }

