import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {environment} from 'src/environments/environment';

import { ProductsService } from './products.service';

xdescribe('ApiService', () => {
  let service: ProductsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'delete',
      'put',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getFakestoreProducts', () => {
    it('should call http.get with correct apiUrl', () => {
      //Arrange

      //Act
      service.getFakestoreProducts();
      //Assert
      expect(httpClientSpy.get).toHaveBeenCalledWith(environment.productsFakestoreApi);
    });
  });

  describe('#getProductsescuelajs', () => {
    it('should call http.get with correct apiUrl', () => {
      //Arrange

      //Act
      service.getProductsescuelajs();
      //Assert
      expect(httpClientSpy.get).toHaveBeenCalledWith(environment.productsescuelajsApi);
    });
  });
});
