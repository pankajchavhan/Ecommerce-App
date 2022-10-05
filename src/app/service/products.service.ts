import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EsculaeJsProductsModel, FakestoreProductsModel } from '../interface/products.model';
 //Razor pay Integration
function _window() : any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private productsResponsefakeStoreApi$: Observable<FakestoreProductsModel[]>;
  private productsResponseescuelajsApi$: Observable<EsculaeJsProductsModel[]>;

  constructor(private http: HttpClient) {}

  get nativeWindow() : any {
    return _window();
 }

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
            images: product.images
          });
        });
        return productList;
      }),
      shareReplay(1)
    );
   }
   return this.productsResponseescuelajsApi$;
  }

  getSingleProductbyId(id:number){
    return this.http.get<any>(`${environment.productsescuelajsApi}/${id}`).pipe(
      map((product)=>{
        const singleProduct = {
          id: product?.id,
          title: product?.title,
          price: product?.price,
          description: product?.description,
          image: product?.images[0],
          category: product?.category?.name,
          images: product.images
        };

        return singleProduct;
      }));
  }

  deleteProductById(id:number){
   return this.http.delete<any>(`${environment.productsescuelajsApi}/${id}`);
  }

  addNewProduct(requestPayload){
    return this.http.post<any>(environment.productsescuelajsApi,requestPayload);
  }

  updateProductById(id:number,requestPayload){
  return this.http.put<any>(`${environment.productsescuelajsApi}/ ${id}`,requestPayload);
  }
}
