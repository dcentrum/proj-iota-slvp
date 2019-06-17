import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-t-customer',
  templateUrl: './t-customer.component.html',
  styleUrls: ['./t-customer.component.css']
})
export class TCustomerComponent implements OnInit {
  private isRecords:boolean;
  constructor() { }
  
  ngOnInit() {
   
  }

  search(val){
  console.log("values is ",val)
  this.isRecords=true;
  }

}
