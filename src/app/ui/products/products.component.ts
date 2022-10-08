import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { CartService } from 'src/app/service/cart.service';
import {
  EsculaeJsProductsModel,
  FakestoreProductsModel,
} from 'src/app/interface/products.model';
import { productCategory } from 'src/app/constants/products-category';
import { forkJoin } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SpinnerService} from 'src/app/service/spinner/spinner.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productList: FakestoreProductsModel[];
  searchkey: string = '';
  filterCategory: FakestoreProductsModel[];
  productsForm: FormGroup;
  Addbutton: boolean;
  UpdateButton: boolean;

  constructor(
    private productsService: ProductsService,
    private cartservice: CartService,
    private formbuilder: FormBuilder,
    private spinerService: SpinnerService
  ) {}
  //Razor pay Integration
  options = {
    key: 'rzp_test_S9KadtsNcHR2St', // Enter the Key ID generated from the Dashboard
    amount: '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'E-commerce',
    description: 'Test Transaction',
    image: 'https://example.com/your_logo',
    order_id: '', //order_KHJOffRytSr4aV
    callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#F05159',
    },
  };

  ngOnInit(): void {
    this.buildForm();
    this.getAllProducts();
    this.cartservice.search.subscribe((val: any) => {
      this.searchkey = val;
    });
  }

  buildForm(): void {
    this.productsForm = this.formbuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  AddProduct(): void {
    this.productsForm.reset();
    this.Addbutton = true;
    this.UpdateButton = false;
  }

  addNewProduct(products) {
    const product = {
      title: products.title,
      price: products.price,
      description: products.description,
      categoryId: products.categoryId,
      images: [products.image],
    };
    this.productsService.addNewProduct(product).subscribe((res) => {
       console.log(res)
    });
  }

  getAllProducts(): void {
    this.spinerService.show();
    forkJoin([
      this.productsService.getFakestoreProducts(),
      this.productsService.getProductsescuelajs(),
    ])
      .pipe(
        map(
          ([fakestoreProductApiResponse, escuelajsProductsApiResponse]: [
            FakestoreProductsModel[],
            EsculaeJsProductsModel[]
          ]) => {
            const combineProducts = [
              fakestoreProductApiResponse,
              escuelajsProductsApiResponse,
            ];
            const mergeProducts = [].concat.apply([], combineProducts);
            return mergeProducts;
          }
        ),
        finalize(()=>{
          this.spinerService.hide();
        })
      )
      .subscribe((productsRes: FakestoreProductsModel[]) => {
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
      });
  }

  addtoCart(item: FakestoreProductsModel) {
    this.cartservice.addtoCart(item);
  }

  filterByCategory(category: string) {
    this.filterCategory = this.productList.filter(
      (product: FakestoreProductsModel) => {
        if (product.category == category || category == '') {
          return product;
        }
      }
    );
  }
  
  //Razor pay Integration
  pay(price) {
    let Price = price;
    const convertedprice = JSON.stringify(Price * 100);
    console.log(convertedprice);
    this.options.amount = JSON.stringify(parseInt(convertedprice));
    this.options.prefill.contact = '8087877932';
    this.options.prefill.email = 'pankajchavhan5@gmail.com';
    this.options.prefill.name = 'Pankaj Chavhan';
    let rzp1 = new this.productsService.nativeWindow.Razorpay(this.options);
    rzp1.open();
  }
}
