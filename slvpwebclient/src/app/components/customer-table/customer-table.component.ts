import { AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CustomerTableDataSource } from './customer-table-datasource';
import { DataService} from '../../core/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { ImageDialogComponent } from '../../shared/image-dialog/image-dialog.component';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CustomerTableDataSource;
constructor(private dataService:DataService,private dialog: MatDialog){}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['img', 'date', 'location','description','appeal','fine','pay'];
  
  imgDialogRef: MatDialogRef<ImageDialogComponent>;
  configOptions:MatDialogConfig;


  ngOnInit() {

        this.dataService.get_customers().subscribe(res =>{
      console.log("myresp",res);
      //this.dataSource = res;
      this.dataSource = new CustomerTableDataSource(res,this.paginator, this.sort);
    })  
    
 
  }

/*   ngAfterViewInit(){
    this.dataService.get_customers().subscribe(res =>{
      console.log("myresp",res);
      //this.dataSource = res;
      this.dataSource = new CustomerTableDataSource(res,this.paginator, this.sort);
    }) 
  } */

  openImage(id){
    console.log("yes")
    this.configOptions={
      autoFocus:true,
      height:'450px',
      width:'450px',
      data:id
    }
    this.imgDialogRef = this.dialog.open(ImageDialogComponent,this.configOptions);
  }
}
