import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
totalItem:number ;
searchTerm:string='';
  constructor(private cartservice:CartService) { }

  ngOnInit(): void {
    this.cartservice.getProducts().subscribe((res:any)=>{
     // window.localStorage.setItem('cart' , (res.length));
     if(localStorage.getItem('cart')){
      this.totalItem = JSON.parse( window.localStorage.getItem('cart'));
     }else{
       this.totalItem = res.length
     }
      
      
    });
  }
  // cartState(){
  //  this.totalItem = JSON.parse( localStorage.getItem('cart'))
  // }
  search(event:any){
    this.searchTerm =(event.target as HTMLInputElement).value;
    this.cartservice.search.next(this.searchTerm);
  }
}
