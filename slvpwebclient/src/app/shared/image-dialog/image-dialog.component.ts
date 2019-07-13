import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { DataService} from '../../core/data.service';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {
  imageSource:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dataservice:DataService,
  public dialogRef: MatDialogRef<ImageDialogComponent>) { }
  //http://localhost:8080/ipfs/QmPCXMZRUrU1tdrwfMKj9b8GSkRA4zPtwLAEjPgxTMVJaq
  //http://localhost:8080/ipfs/QmW22MatfM9x4PqHoDmemdfka3dsKEd8Qs9De1JBMKwUMA
  //http://localhost:8080/ipfs/QmXvdcUqJU3gja7p4eCkZsKtv757ei1LzS9B5NsAmabvCA
  //entire foldr QmemVFxKvEASDYfQN4mbcxqk3hi4iEZfw31W6psUXDeREd
  ngOnInit() {
    this.imageSource="http://localhost:4000/api/ipfs/getimage?ipfshash="+this.data;
    console.log("mydata",this.data);
  }
 /*  getImage(){
    console.log("mydata2",this.data);
    this.dataservice.get_Image(this.data)
} */
  
closeDialog(){
  this.dialogRef.close();
}
}
