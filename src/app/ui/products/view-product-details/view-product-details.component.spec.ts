import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {CartService} from 'src/app/service/cart.service';
import {ProductsService} from 'src/app/service/products.service';

import { ViewProductDetailsComponent } from './view-product-details.component';

xdescribe('ViewProductDetailsComponent', () => {
  let component: ViewProductDetailsComponent;
  let fixture: ComponentFixture<ViewProductDetailsComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let cartserviceSpy: jasmine.SpyObj<CartService>;
  
  beforeEach(() => {
   productsServiceSpy = jasmine.createSpyObj('ProductsService',['getSingleProductbyId','deleteProductById']);
   cartserviceSpy =jasmine.createSpyObj('CartService',['addtoCart']);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductDetailsComponent ],
      providers: [
        { provide:ProductsService, useValue: productsServiceSpy},
        { provide:CartService, useValue: cartserviceSpy},
        { provide:ActivatedRoute, useValue: ActivatedRoute}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
