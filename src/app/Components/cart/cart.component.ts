import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RoutePaths} from 'src/app/enums/rout-path';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  product: any = [];
  grandTotal: number = 0;

  constructor(
    private cartservice: CartService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.cartservice.getProducts().subscribe((res) => {
      this.product = res;
      this.grandTotal = this.cartservice.gettotalPrice();
    });
  }

  removeItem(item: any) {
    this.cartservice.removeCartItems(item);
  }

  emptyCart() {
    this.cartservice.removeAllcart();
  }

  naigateToProducts(){
   this.router.navigate([RoutePaths.PRODUCTS]);
  }
}
