import { TestBed } from '@angular/core/testing';
import {Router} from '@angular/router';

import { GlobalErrorHandlerInterceptor } from './global-error-handler.interceptor';

describe('GlobalErrorHandlerInterceptor', () => {
  const routerSpy = jasmine.createSpyObj('Router',['navigate']);
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlobalErrorHandlerInterceptor,
      { provide: Router, useValue: routerSpy}
      ]
  }));

  it('should be created', () => {
    const interceptor: GlobalErrorHandlerInterceptor = TestBed.inject(GlobalErrorHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
