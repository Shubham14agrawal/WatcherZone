import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {ProductService} from 'src/app/core/services/product.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  constructor(private router: Router, private _productService : ProductService, private toastr: ToastrService) { }

  ngOnInit() {
   
  }

  // Validate and submit the login form.
  submitProductDataForm(Name: HTMLInputElement,Title: HTMLInputElement,Description: HTMLInputElement, IMDB_rating: HTMLInputElement,Language: HTMLInputElement,Genre: HTMLInputElement,Image: HTMLInputElement ): void {

   var productData= {
    "id": "1",
    "name": Name.value,
    "image":  Image.value,
    "Language": Language.value,
    "genre": Genre.value,
    "imdbRating": IMDB_rating.value,
    "description":Description.value,
    "title":Title.value

  };
  this._productService.storeProductData(productData);
this.toastr.success("Watchable added successfully.", "")
this.router.navigateByUrl('/home');
    
  
  }

}
