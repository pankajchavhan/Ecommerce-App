import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  EsculaeJsProductsModel,
  FakestoreProductsModel,
} from '../interface/products.model';
//Razor pay Integration
function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsResponsefakeStoreApi$: Observable<FakestoreProductsModel[]>;
  productsResponseescuelajsApi$: Observable<EsculaeJsProductsModel[]>;

  constructor(private http: HttpClient) {}

  get nativeWindow(): any {
    return _window();
  }

  getFakestoreProducts(): Observable<FakestoreProductsModel[]> {
    if (!this.productsResponsefakeStoreApi$) {
      this.productsResponsefakeStoreApi$ = this.http
        .get<FakestoreProductsModel[]>(environment.productsFakestoreApi)
        .pipe(shareReplay(1));
    }
    return this.productsResponsefakeStoreApi$;
  }

  getProductsescuelajs(): Observable<EsculaeJsProductsModel[]> {
    if (!this.productsResponseescuelajsApi$) {
      this.productsResponseescuelajsApi$ = this.http
        .get<EsculaeJsProductsModel[]>(environment.productsescuelajsApi)
        .pipe(
          map((products: EsculaeJsProductsModel[]) => {
            const productList = [];
            products.forEach((product) => {
              productList.push({
                id: product?.id,
                title: product?.title,
                price: product?.price,
                description: product?.description,
                image: product?.images[0],
                category: product?.category?.name,
                images: product.images,
              });
            });
            return productList;
          }),
          shareReplay(1)
        );
    }
    return this.productsResponseescuelajsApi$;
  }

  getSingleProductbyId(id: number): Observable<EsculaeJsProductsModel> {
    return this.http
      .get<EsculaeJsProductsModel>(`${environment.productsescuelajsApi}/${id}`)
      .pipe(
        map((product: any) => {
          const singleProduct = {
            id: product?.id,
            title: product?.title,
            price: product?.price,
            description: product?.description,
            image: product?.images[0],
            category: product?.category?.name,
            images: product?.images,
          };

          return singleProduct;
        })
      );
  }

  deleteProductById(id: number): Observable<EsculaeJsProductsModel> {
    return this.http.delete<EsculaeJsProductsModel>(
      `${environment.productsescuelajsApi}/${id}`
    );
  }

  addNewProduct(requestPayload): Observable<EsculaeJsProductsModel> {
    return this.http.post<EsculaeJsProductsModel>(
      environment.productsescuelajsApi,
      requestPayload
    );
  }

  updateProductById(
    id: number,
    requestPayload
  ): Observable<EsculaeJsProductsModel> {
    return this.http.put<EsculaeJsProductsModel>(
      `${environment.productsescuelajsApi}/ ${id}`,
      requestPayload
    );
  }
}
