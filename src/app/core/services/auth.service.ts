import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  admin: any;
  cart: any;

  private User_SERVICE_BASE_URL = "/assets/templates";

  constructor(private readonly http: HttpClient, private router: Router,private toastr: ToastrService) { }

  // Authenticates the user.
  authenticateUser(data: any):Observable<User | undefined>
  {
    const url = `${this.User_SERVICE_BASE_URL}/users.json`;
    return this.http.get<User[]>(url).pipe(
      map((user: User[]) => user.find(x => data.email.toLowerCase() === x.email  && data.password === x.password))
    );
  }

  // Checks if the user is already logged in.
  loggedin() {
    const token = localStorage.getItem("isLoggedIn");
    return token != null ? true : false;
  }

  // Stores the user data in local storage.
  storeUserData(user:any) {
    localStorage.setItem("user", JSON.stringify(user.name));
    localStorage.setItem("isLoggedIn", JSON.stringify(user.id));
  }

  // Logs out the user.
  logout() {
    this.user = null;
    this.toastr.info("Logged Out Successfully.", "");
    localStorage.clear();
  }
  // Add Product details to cart.
  addToList(id:string,listName:string): boolean {
    var userId = localStorage.getItem("isLoggedIn"), savedData,item;
    if(!userId || id === ""){
      this.toastr.warning("Login to continue.", "Unauthorized")
       return false;
    }
    else{
     var userID = JSON.parse(userId) ;
     savedData = JSON.parse( localStorage.getItem(listName));
      item = {id:userID ,productId:id};
      if(!savedData){
        localStorage.setItem(listName,JSON.stringify([item]));
        this.toastr.success("Watchable Added Successfully.", "")
      }else if(!savedData.find( x => x.id == userID && x.productId == id)){
        savedData.push(item);
        localStorage.setItem(listName,JSON.stringify(savedData));
        this.toastr.success("Watchable Added Successfully.", "")
     }else{this.toastr.warning("Watchable Already Exists.", "")}     
         return true;
    }
      
  }
}