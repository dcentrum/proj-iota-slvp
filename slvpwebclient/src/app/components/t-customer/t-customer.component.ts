import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-t-customer',
  templateUrl: './t-customer.component.html',
  styleUrls: ['./t-customer.component.css']
})
export class TCustomerComponent implements OnInit {
  public isSearched: boolean = false;
  public isRecords: boolean = false;
  public searchResults: any;
  public number:string;
  public EXAMPLE_DATA:any = [
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'100',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'appeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'300',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'600',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
   
  ];
  customerForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  
  ngOnInit() {
   
  }

  search(val) {
    if (this.customerForm.valid) {
      this.isSearched = true; 
      this.searchResults = this.EXAMPLE_DATA;
      this.isRecords = this.searchResults.length >0 ? true : false;
      console.log(val);
    }
    else {
      this.isSearched = true;
    }

  }

  createForm() {
    this.customerForm = this.fb.group({
      number: ['', Validators.required]
    });
  }
 
}
