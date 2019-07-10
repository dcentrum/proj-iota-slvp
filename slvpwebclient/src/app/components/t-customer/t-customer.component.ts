import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-t-customer',
  templateUrl: './t-customer.component.html',
  styleUrls: ['./t-customer.component.css']
})
export class TCustomerComponent implements OnInit {
  private isRecords:boolean;
  public searchResults:any;
  public EXAMPLE_DATA:any = [
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
   
  ];
  constructor() { }
  
  ngOnInit() {
   
  }

  search(val){
  console.log("values is ",val)
  this.isRecords=true;
  this.searchResults = this.EXAMPLE_DATA;
  }
 
}
