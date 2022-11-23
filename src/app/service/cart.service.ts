import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import {FakestoreProductsModel} from '../interface/products.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  cartItemList: FakestoreProductsModel[] = [];
  productList$ = new BehaviorSubject<FakestoreProductsModel[]>([]);
  search = new BehaviorSubject<any>('');

  constructor() {}

  getProducts() {
    return this.productList$.asObservable();
  }

  setProduct(product: FakestoreProductsModel[]) {
    this.cartItemList.push(...product);
    this.productList$.next(product);
  }

  addtoCart(product: FakestoreProductsModel) {
    this.cartItemList.push(product);
    this.productList$.next(this.cartItemList);
    this.gettotalPrice();
  }

  gettotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((item: FakestoreProductsModel) => {
      grandTotal += item.total;
    });
    return grandTotal;
  }

  removeCartItems(product: FakestoreProductsModel) {
    this.cartItemList.map((item: FakestoreProductsModel, index: any) => {
      if (product.id === item.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList$.next(this.cartItemList);
  }

  removeAllcart() {
    this.cartItemList = [];
    this.productList$.next(this.cartItemList);
  }
}
