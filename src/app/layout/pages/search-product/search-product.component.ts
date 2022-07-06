import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { Product, ProductService } from 'src/app/core/public_api';
import {AuthService} from 'src/app/core/services/auth.service';
import {ProductService} from 'src/app/core/services/product.service';
import {Product} from 'src/app/core/public_api';
import { map } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  products: Product[] = [];
  filterProduct : Product[] = [];

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private _productService:ProductService,private _authService : AuthService, public translate: TranslateService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.products = JSON.parse(JSON.stringify(data.productList));
      this.filterProduct = data.productList;
    });

    this._productService.data.subscribe(response => {
      
      this.searchProduct(response)} ) // you will receive the data from sender component here.
    
  }

  // Navigate to product detail page.
  viewProduct(productCode: string) {
    this.router.navigateByUrl('/home/search/' + productCode);
  }

  // Search the product.
  searchProduct(filterBy: string) {
    filterBy = filterBy.toLowerCase();
    this.products = JSON.parse(JSON.stringify(this.filterProduct));

    if(filterBy === "")
    {
     return
    }

    this.products =  this.products.filter((product: Product) =>{
       return product.name.toLowerCase().includes(filterBy)
    });
  }

  // Add products to cart.
  addFav(id : any)
  {
    this._authService.addToList(id,"favItems");
  }
  addWatchlater(id : any)
  {
    this._authService.addToList(id,"watchLaterItems");
  }
  addWatched(id : any)
  {
    this._authService.addToList(id,"watchedItems");
  }

}
