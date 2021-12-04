import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Flipcart';
 

  ngOnInit(): void { console.log("ngoninit call")} //for checking which call 1st
  constructor() {console.log("constructor call") }
}
