import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
productList:any;
searchkey:string ='';
filterCategory:any;
  constructor(private api:ApiService, private cartservice:CartService) { }

  ngOnInit(): void {
    //practice start
    //eg.1
    var a;
    function parent(){
      a= 6;
    function child(){
      let a = 5;
      console.log(a);
    }
    child();
    console.log(a);
  }
  parent();
  console.log(a);
  //eg.2
  let obj ={
    fname: "pankaj",
    lname: "chavhan"
  }
  obj.fname = "pravin";
  console.log(obj.fname);

 
  //eg3
 var x =21;
 var myname = function(){
  // console.log(x);

   console.log(x);
   var x =20;
 };
 console.log(x);
 myname();
 //op is undefined
//eg finding max and min number from array
const array = [1,25,4,3];
let value =Math.min(...array);
console.log(value); //output is 1

const array1 = [1,25,4,3];
let value1 =Math.max(...array1);
console.log(value1); //output is 25

var array2 = [1,25,4,3].map((value)=>

  Math.pow(value , 2));
  console.log(array2);
  //eg.

  a=15;
  console.log(a);
  
  
; //output is 25


   
 
  
  //output is pravin(we cant reassign value to obj variable using const but we can change value of objects)
  
  
    

    //practice end
    this.api.getProduct().subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category === "men's clothing" || a.category === "women's clothing"){
          a.category = "fashion"
        }
        Object.assign(a,{quantity:1, total:a.price})

      });
    })
    this.cartservice.search.subscribe((val:any)=>{
      this.searchkey = val;
    })
  }
  addtoCart(item){
    this.cartservice.addtoCart(item);
  }
  filter(category:any){
    this.filterCategory = this.productList.filter((a:any)=>{
      if(a.category == category || category == ''){
         return a;
      }
    })
  }

}
