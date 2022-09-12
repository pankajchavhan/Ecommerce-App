import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Products } from '../interface/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsResponsefakeStoreApi$: Observable<Products>;
  private productsResponseescuelajsApi$: Observable<any>;
  constructor(private http: HttpClient) {}

  getFakestoreProducts(): Observable<Products> {
    if (!this.productsResponsefakeStoreApi$) {
      this.productsResponsefakeStoreApi$ = this.http.get<Products>(environment.productsFakestoreApi).pipe(
        shareReplay(1)
        );
    }
    return this.productsResponsefakeStoreApi$;
  }

  getProductsescuelajs(): Observable<Products> {
   if(!this.productsResponseescuelajsApi$){
    this.productsResponseescuelajsApi$ = this.http.get<Products>(environment.productsescuelajsApi).pipe(
      map((products:any) => {
        const productList = [];
        products.forEach((product) => {
          productList.push({
            id: product?.id,
            title: product?.title,
            price: product?.price,
            description: product?.description,
            image: product?.images[0],
            category: product?.category?.name,
            images: product?.images
          });
        });
        return productList;
      }),
      shareReplay(1)
    );
   }
   return this.productsResponseescuelajsApi$;
  }
}
