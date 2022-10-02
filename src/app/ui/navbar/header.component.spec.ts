import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CartService } from 'src/app/service/cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { RoutePaths } from 'src/app/enums/rout-path';
import {of} from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProducts: any = [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
  ];

  beforeEach(() => {
    cartServiceSpy = jasmine.createSpyObj('CartService', [
      'getProducts',
      'removeCartItems',
      'removeAllcart',
      'gettotalPrice',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    cartServiceSpy.getProducts.and.returnValue(of(mockProducts));
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call getProducts', () => {
      //Arrange

      //Act
      component.ngOnInit();
      //Assert
      expect(cartServiceSpy.getProducts).toHaveBeenCalled;
    });
  });

  describe('#navigateToCart', () => {
    it('should navigate to cart page when click cart button', () => {
      //Arrange

      //Act
      component.navigateToCart();
      //Assert
      expect(routerSpy.navigate).toHaveBeenCalledWith([RoutePaths.CART]);
    });
  });
});
