import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsComponent } from './products.component';
import {CartService} from 'src/app/service/cart.service';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {ProductsService} from 'src/app/service/products.service';
import {FlterPipe} from 'src/app/shared/flter.pipe';

xdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(()=>{
    cartServiceSpy = jasmine.createSpyObj('CartService',[
      'getProducts','removeCartItems','removeAllcart','gettotalPrice'
    ]);
    
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientTestingModule,
      ],
      providers:[
        { provide: cartServiceSpy, useValue: CartService},
        { provide: productsServiceSpy, useValue: ProductsService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
