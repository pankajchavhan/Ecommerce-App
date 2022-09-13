import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { CartService } from 'src/app/service/cart.service';
import { EsculaeJsProductsModel, FakestoreProductsModel } from 'src/app/interface/products.model';
import { productCategory } from 'src/app/constants/products-category';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productList: FakestoreProductsModel[];
  searchkey: string = '';
  filterCategory: FakestoreProductsModel[];

  constructor(
    private productsService: ProductsService,
    private cartservice: CartService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.cartservice.search.subscribe((val: any) => {
      this.searchkey = val;
    });
  }

  getAllProducts(): void {
    forkJoin([
      this.productsService.getFakestoreProducts(),
      this.productsService.getProductsescuelajs()
    ]).pipe(
      map(([fakestoreProductApiResponse, escuelajsProductsApiResponse]:[FakestoreProductsModel[], EsculaeJsProductsModel[]])=>{ 
        const combineProducts = [fakestoreProductApiResponse,escuelajsProductsApiResponse];
        const mergeProducts = [].concat.apply([], combineProducts);
        return mergeProducts;
      }
    )).subscribe((productsRes:FakestoreProductsModel[]) =>{
      this.productList = productsRes;
      this.filterCategory = productsRes;
      this.productList.forEach((product: FakestoreProductsModel) => {
        if (
          product.category === productCategory.MENS_CLOTHING ||
          product.category === productCategory.WOMENS_CLOTHING
        ) {
          product.category = productCategory.FASHION;
        }
        if (product.category === 'Electronics') {
          product.category = productCategory.ELECTRONICS;
        }
        if (product.category === productCategory.CLOTHES) {
          product.category = productCategory.FASHION;
        }
        Object.assign(product, { quantity: 1, total: product.price });
      });
    })
  }

  addtoCart(item: FakestoreProductsModel) {
    this.cartservice.addtoCart(item);
  }

  filterByCategory(category: string) {
    this.filterCategory = this.productList.filter((product: FakestoreProductsModel) => {
      if (product.category == category || category == '') {
        return product;
      }
    });
  }
}
