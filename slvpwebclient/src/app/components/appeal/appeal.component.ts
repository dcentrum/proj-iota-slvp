import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-appeal',
  templateUrl: './appeal.component.html',
  styleUrls: ['./appeal.component.css']
})
export class AppealComponent implements OnInit {
 @ViewChild('commentDetails') details :ElementRef;
 public data={
   msg:''
 }
  constructor() { }

  ngOnInit() {
  }

}
