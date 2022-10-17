import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EsculaeJsProductsModel} from 'src/app/interface/products.model';
import {CartService} from 'src/app/service/cart.service';
import {ProductsService} from 'src/app/service/products.service';
import {SpinnerService} from 'src/app/service/spinner/spinner.service';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css']
})
export class ViewProductDetailsComponent implements OnInit {

productDetails: EsculaeJsProductsModel;
isAdminRole:boolean = false; //will make it dynamic once login functionality is implemented

  constructor(
    private productsService:ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartservice: CartService,
    private spinerService: SpinnerService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((product:EsculaeJsProductsModel) => {
      this.getSingleProduct(product.id);
    });
  }

  getSingleProduct(id: number) {
    this.spinerService.show();
    this.productsService.getSingleProductbyId(id).subscribe((product:EsculaeJsProductsModel) => {
      this.spinerService.hide();
      this.productDetails = product;
      Object.assign(product, { quantity: 1, total: product.price });
    });
  }

  deleteProduct(item) {
    this.spinerService.show();
    this.productsService.deleteProductById(item.id).subscribe((res) => {
      this.spinerService.hide();
      alert('Product Deleted Successfully');
      this.productsService.getProductsescuelajs();//refresh api response to remove deleted item & update view
    });
  }

  addtoCart(item) {
    this.cartservice.addtoCart(item);
  }

}
