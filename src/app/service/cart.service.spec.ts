import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  const mockProductsApiResponse: any = [
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
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getProducts', () => {
    it('should return productlist ', () => {
      //Arrange
      service.productList$.next(mockProductsApiResponse);
      //Act
      service.getProducts().subscribe((result) => {
        //Act
        expect(result).toBe(mockProductsApiResponse);
      });
    });
  });

  describe('#setProduct', () => {
    it('should call setProduct with productList and emit productlist in productList$ Subject', () => {
      //Arrange

      //Act
      service.setProduct(mockProductsApiResponse);

      service.productList$.subscribe((result) => {
        //Assert
        expect(result).toBe(mockProductsApiResponse);
      });

      expect(service.cartItemList.length).toBe(1);
    });
  });

  describe('#addtoCart', () => {
    it('should call addtoCart with productList and emit productlist in productList$ Subject', () => {
      //Arrange

      //Act
      service.addtoCart(mockProductsApiResponse);

      service.productList$.subscribe((result) => {
        //Assert
        expect(result).toEqual([mockProductsApiResponse]);
      });

      expect(service.cartItemList.length).toBe(1);
      expect(service.gettotalPrice).toHaveBeenCalled;
    });
  });

  describe('#removeCartItems', () => {
    it('should remove items from cart when click on delete button/icon', () => {
      //Arrange
      service.cartItemList = [mockProductsApiResponse];
      //Act
      service.removeCartItems(mockProductsApiResponse);
      //Assert
      expect(service.cartItemList.length).toBe(0);
    });
  });

  describe('#removeAllcart', () => {
    it('should remove All items from cart when click on empty cart button', () => {
      //Arrange
      service.cartItemList = [mockProductsApiResponse];
      //Act
      service.removeAllcart();
      //Assert
      expect(service.cartItemList.length).toBe(0);
    });
  });
});
