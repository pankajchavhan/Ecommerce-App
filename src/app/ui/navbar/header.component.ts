import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RoutePaths} from 'src/app/enums/rout-path';
import {FakestoreProductsModel} from 'src/app/interface/products.model';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  totalItem: number;
  searchTerm: string = '';

  constructor(private cartservice: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartservice.getProducts().subscribe((res: FakestoreProductsModel[]) => {
      this.totalItem = res.length;
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartservice.search.next(this.searchTerm);
  }

  navigateToCart() {
    this.router.navigate([RoutePaths.CART]);
  }
}
