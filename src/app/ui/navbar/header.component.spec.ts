import { ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {CartService} from 'src/app/service/cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(()=>{
    cartServiceSpy = jasmine.createSpyObj('CartService',[
      'getProducts','removeCartItems','removeAllcart','gettotalPrice'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientTestingModule,
      ],
      providers:[
        { provide: Router, useValue: routerSpy },
        { provide: cartServiceSpy, useValue: CartService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
