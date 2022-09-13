import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EsculaeJsProductsModel, FakestoreProductsModel } from '../interface/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private productsResponsefakeStoreApi$: Observable<FakestoreProductsModel[]>;
  private productsResponseescuelajsApi$: Observable<EsculaeJsProductsModel[]>;

  constructor(private http: HttpClient) {}

  getFakestoreProducts(): Observable<FakestoreProductsModel[]> {
    if (!this.productsResponsefakeStoreApi$) {
      this.productsResponsefakeStoreApi$ = this.http.get<FakestoreProductsModel[]>(environment.productsFakestoreApi).pipe(
        shareReplay(1)
        );
    }
    return this.productsResponsefakeStoreApi$;
  }

  getProductsescuelajs(): Observable<EsculaeJsProductsModel[]> {
   if(!this.productsResponseescuelajsApi$){
    this.productsResponseescuelajsApi$ = this.http.get<EsculaeJsProductsModel[]>(environment.productsescuelajsApi).pipe(
      map((products:EsculaeJsProductsModel[]) => {
        const productList = [];
        products.forEach((product) => {
          productList.push({
            id: product?.id,
            title: product?.title,
            price: product?.price,
            description: product?.description,
            image: product?.images[0],
            category: product?.category?.name,
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
