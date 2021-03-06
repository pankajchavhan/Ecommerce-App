import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartItemList:any = [];
productList = new BehaviorSubject<any>([]);
search = new BehaviorSubject<any>("");
//productList = new Subject<any>();
  constructor() { }
  getProducts(){
   // localStorage.setItem('cart',JSON.stringify(this.productList))
   return this.productList.asObservable();

   
  }
  setProduct(product:any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product:any){
    this.cartItemList.push(product);
    console.log(this.cartItemList.length);
    localStorage.setItem('cart',this.cartItemList.length)
    localStorage.setItem('addtoCart',JSON.stringify(this.cartItemList))
    //localStorage.setItem('getTotal',JSON.stringify(this.gettotalPrice()))
    this.productList.next(this.cartItemList);
    this.gettotalPrice();
   // console.log(product);
    
    
  }
  gettotalPrice():number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    
    return grandTotal;
  }
  removeCartItems(product:any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id === a.id){
      this.cartItemList.splice(index,1);
      //localStorage.removeItem('addtoCart')
      } 
    }
    )
    this.productList.next(this.cartItemList);
  }
  removeAllcart(){
    this.cartItemList = [];
    //localStorage.clear();
    this.productList.next(this.cartItemList);
  }
}
