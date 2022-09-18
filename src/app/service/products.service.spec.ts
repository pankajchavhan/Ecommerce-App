import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';

describe('ApiService', () => {
  let service: ProductsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient',['post','get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy},
      ],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
