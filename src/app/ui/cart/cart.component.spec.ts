import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {RoutePaths} from 'src/app/enums/rout-path';
import {FakestoreProductsModel} from 'src/app/interface/products.model';
import { CartService } from 'src/app/service/cart.service';
import { CartComponent } from './cart.component';

describe('CartsComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProducts:any = [
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
      declarations: [CartComponent],
      imports: [
        RouterTestingModule,
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
    fixture = TestBed.createComponent(CartComponent);
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

    it('should save product api response in products variable', () => {
      //Arrange
      
      //Act
      component.ngOnInit();
      //Assert
      expect(component.product).toEqual(mockProducts);
    });

    it('should call gettotalPrice ', () => {
      //Arrange
    
      //Act
      component.ngOnInit();
      //Assert
      expect(cartServiceSpy.gettotalPrice).toHaveBeenCalled;
    });
  });

  describe('#removeItem', () => {
    it('should remove items when click on delete button', () => {
      //Arrange
      const mockItem:FakestoreProductsModel = mockProducts[0];
      //Act
      component.removeItem(mockItem);
      //Assert
      expect(cartServiceSpy.removeCartItems).toHaveBeenCalled;
    });
  });

  describe('#emptyCart', () => {
    it('should remove all items from cart when click on emptycart', () => {
      //Arrange

      //Act
      component.emptyCart();
      //Assert
      expect(cartServiceSpy.removeAllcart).toHaveBeenCalled;
    });
  });

  describe('#naigateToProducts', () => {
    it('should navigate to products page when click on shop more', () => {
      //Arrange

      //Act
      component.naigateToProducts();
      //Assert
      expect(routerSpy.navigate).toHaveBeenCalledWith([RoutePaths.PRODUCTS]);
    });
  });
});
