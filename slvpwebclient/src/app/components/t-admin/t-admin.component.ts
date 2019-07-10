import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-t-admin',
  templateUrl: './t-admin.component.html',
  styleUrls: ['./t-admin.component.css']
})
export class TAdminComponent implements OnInit {
 public records:any
 public mockData:any=[{img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
 {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'},
 {img:'aa', date:'12/12/12', location:'HYD',description:'signal jump',appeal:'apepeal',fine:'200',pay:'GPay'}]
  constructor() { }

  ngOnInit() {
    this.records=this.mockData;
  }

}
