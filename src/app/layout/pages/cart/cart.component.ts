import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/core/services/product.service';
import {TranslateService} from '@ngx-translate/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartdisplay = [];
  public cuser;
  public totalPrice = 0;
  public subtotal = 0;
  public tax = 0;
  public total;
  public shipping;
  public cart = [];
  public checkoutcart = [];
  public loggedInUser;
  public type;

  constructor(private route: ActivatedRoute,private _productService : ProductService, private router: Router,public translate: TranslateService, public _auth_service: AuthService) {
    translate.currentLang = localStorage.getItem("preferedLanguage")? localStorage.getItem("preferedLanguage"):'en';
    translate.setDefaultLang(translate.currentLang);
   }

  ngOnInit(): void {
  
    this.route.data.subscribe(data => {
      this.type=data.type;
  });
  this.loadData();
  }

  // Loads the cart data.
  loadData() {
    this.cuser = JSON.parse(localStorage.getItem(this.type));
    this.loggedInUser = JSON.parse(localStorage.getItem("isLoggedIn"));

    if(!this.cuser)
    return ;

     this._productService.getProducts().subscribe(data => {
      
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j  <this.cuser.length; j++ ) {
         if (this.cuser[j].productId == data[i].id && this.loggedInUser == this.cuser[j].id ){
          
          this.cartdisplay.push(data[i]);
         }
        }
      }

    });
  }

  // Removes the products from the cart.
  deletedata(id) {
    this.cartdisplay = [];
    this.cuser =  this.cuser.filter (function(x){return x.productId != id;});
    localStorage.setItem(this.type, JSON.stringify(this.cuser));

    this.loadData();
  }

}
