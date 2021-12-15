import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {
count = false;
  constructor() { }

  ngOnInit(): void {
    let countvalue$ = new Promise((resolve, reject)=>{
      if(this.count){
        resolve("Promise is resolved")
        } else {
          reject("Promise is rejected")
        } 
      });
    console.log(countvalue$);
    countvalue$.then(()=>{
      console.log("1st value");  //when promise is resolved then .then method will be called
    })
    .then(()=>{
     console.log("2nd Value");
    })
    .then(()=>{
      console.log("3rd value");
    })
    .catch(()=>{
      console.log("error using catch");  // when promise is rejected then . catch method is will be called
      
    })
    
    
    
  }

}
