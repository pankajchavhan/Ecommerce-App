import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getIsLoadingValue', () => {
    it('it should return true if isLoading$ subject emits true value', () => {
      //Arrange
      service.isLoading$.next(true);
      //Act
      service.getIsLoadingValue();
      //expect
      service.getIsLoadingValue().subscribe((result) => {
        expect(result).toBe(true);
      });
    });

    it('it should return false if isLoading$ subject emits false value', () => {
      //Arrange
      service.isLoading$.next(false);
      //Act
      service.getIsLoadingValue();
      //expect
      service.getIsLoadingValue().subscribe((result) => {
        expect(result).toBe(false);
      });
    });
  });

  describe('#show', () => {
    it('it should set isLoading$ to true when click on show', () => {
      //Arrange

      //Act
      service.show();
      //expect
      expect(service.isLoading$).toBeTrue;
    });
  });

  describe('#hide', () => {
    it('it should set isLoading$ to false when click on hide', () => {
      //Arrange

      //Act
      service.hide();
      //expect
      expect(service.isLoading$).toBeFalse;
    });
  });
});
