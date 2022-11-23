import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerServiceSpy: jasmine.SpyObj<SpinnerService>;

  beforeEach(() => {
    spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', [
      'getIsLoadingValue',
    ]);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      providers: [{ provide: SpinnerService, useValue: spinnerServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnit', () => {
    it('should call getIsLoadingValue when component is loaded', () => {
      //Arrange

      //Act
      component.ngOnInit();
      //Assert
      expect(spinnerServiceSpy.getIsLoadingValue).toHaveBeenCalled;
    });
  });
});
