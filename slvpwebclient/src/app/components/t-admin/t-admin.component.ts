import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService} from '../../core/data.service';
import * as _moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-t-admin',
  templateUrl: './t-admin.component.html',
  styleUrls: ['./t-admin.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class TAdminComponent implements OnInit {
  public isSearched: boolean = false;
  public isRecords: boolean = false;
  public searchResults: any;
  public date: any;
  public mockData: any = [
    {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'appeal',fine:'200',pay:'GPay'},
    {img:'aa', date:'12/12/12', location:'HYD',description:'not wearing helmet',appeal:'apepeal',fine:'200',pay:'GPay'}
  ]


  adminForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService:DataService) {
    this.createForm();
  }
  ngOnInit() {

  }
  createForm() {
    this.adminForm = this.fb.group({
      date: ['', Validators.required]
    });
  }

  search() {
    if (this.adminForm.valid) {
      this.isSearched = true; 
     // this.searchResults = this.mockData;
      //this.isRecords = this.searchResults.length >0 ? true : false;
      console.log("data is:", this.date.format('DD/MM/YYYY'));

      this.dataService.get_challans('1234').subscribe(res=>{
        this.searchResults = res;
        this.isRecords = this.searchResults.length >0 ? true : false;
      })
    }
    else {
      this.isSearched = true;
    }

  }
}
