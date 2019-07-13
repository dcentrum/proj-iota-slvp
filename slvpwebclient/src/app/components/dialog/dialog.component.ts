import { Component, OnInit,Inject ,ViewChild,ElementRef,ViewContainerRef,ComponentRef,ComponentFactoryResolver} from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from "@angular/material";
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public submitted:boolean =false;
  @ViewChild('target',{read:ViewContainerRef}) vcRef:ViewContainerRef;
  componentRef:ComponentRef<any>;

  constructor(
    public dialogRef:MatDialogRef<DialogComponent>,
    private resolver:ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.vcRef.createComponent(factory);
  }
  
  onNoClick():void{
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close(this.componentRef.instance.data);
  }
}
