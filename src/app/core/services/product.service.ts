import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  // Gets the list of products.
  public getProducts(): Observable<Product[]|undefined> {
    return of(JSON.parse(localStorage.getItem("productList")));
  }

  // Gets the product details.
  public getProduct(productId: string): Observable<Product | undefined> {
  return this.getProducts()
  .pipe(
    map((products: Product[]) => products.find(p => p.id == productId))
  );
}

private dataSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
  data: Observable<string> = this.dataSource.asObservable();

// Emits the search text.

public searchProduct(searchText: string) {
  this.dataSource.next(searchText);
}
storeProductData(product:any) {

  var savedData,productData = product ;
     savedData = JSON.parse( localStorage.getItem("productList"));
      if(!savedData){
        localStorage.setItem("productList",JSON.stringify([productData]));
        localStorage.setItem("maxProductID",'1');
      }else {
        var maxID=parseInt(localStorage.getItem("maxProductID"))+1;
        localStorage.setItem("maxProductID",maxID.toString());
        productData.id=maxID
        savedData.push(productData);
        localStorage.setItem("productList",JSON.stringify(savedData));
        
     }
}
}