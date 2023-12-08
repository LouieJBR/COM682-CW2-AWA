// import {Component} from '@angular/core';
// import {HttpHeaders} from '@angular/common/http';
// import {WebService} from "../../web.service";
// import {AuthService} from "../../services/AuthService";
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   constructor() {
//     document.getElementById("login_btn").addEventListener("click", () => this.check());
//     document.getElementById("createAcc_btn").addEventListener("click", () => this.newUserCreate());
//   }
//
//   check() {
//     const usernameToCheck = document.getElementById("login_uname");
//     const passwordToCheck = document.getElementById("login_psw");
//
//     const value = localStorage.getItem(usernameToCheck.value);
//     if (value !== null) {
//       const parsedUserObj = JSON.parse(value);
//
//       if ((usernameToCheck.value === parsedUserObj.uname) && (passwordToCheck.value === parsedUserObj.password)){
//         localStorage.setItem("Active User", parsedUserObj.uname);
//
//         window.location = "/";
//       } else {
//         alert("Username or Password is incorrect. Please try again.");
//       }
//     } else {
//       alert("Please enter a username.");
//     }
//   }
//
//   newUserCreate() {
//     window.location = "/signup";
//   }
//
//   logout(){
//     localStorage.removeItem("Active User");
//   }
// }
//   // username: string = '';
//   // password: string = '';
//   // errorMessage: string = '';
//   //
//   // constructor(private webService: WebService, private authService: AuthService) {}
//   //
//   //
//   // onLogin() {
//   //   const auth = btoa(`${this.username}:${this.password}`);
//   //   const headers = new HttpHeaders({
//   //     'Authorization': `Basic ${auth}`,
//   //     'Content-Type': 'application/json' // Assuming the content type is JSON
//   //   });
//   //
//   //
//   //   const options = {headers};
//   //
//   //   const data = {username: this.username, password: this.password};
//   //
//   //   if (this.webService.login(data, options).subscribe()){
//   //     const user =  this.username
//   //     this.authService.setLoggedIn(user)
//   //   }
//   // }
// }
