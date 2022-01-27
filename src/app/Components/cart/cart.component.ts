import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
product:any = [];
grandTotal: number = 0;
  constructor(private cartservice:CartService) { }

  ngOnInit(): void {
    this.cartservice.getProducts().subscribe(res=>{
      if(localStorage.getItem('addtoCart').length > 0){
        this.product = JSON.parse(localStorage.getItem('addtoCart'))
      }else{
        this.product = res;
      }
    
      this.grandTotal = this.cartservice.gettotalPrice()
    })
  }
  removeItem(item:any){
    this.cartservice.removeCartItems(item);
  }
  emptyCart(){
    this.cartservice.removeAllcart();
    localStorage.clear()
  }

}
