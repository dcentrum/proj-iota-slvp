import { AfterViewInit, Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CustomerTableDataSource } from './customer-table-datasource';
import { DataService } from '../../core/data.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ImageDialogComponent } from '../../shared/image-dialog/image-dialog.component';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input('data') data;

  dataSource: CustomerTableDataSource;
  constructor(private dataService: DataService, private dialog: MatDialog) { }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['img', 'date', 'location', 'description', 'appeal', 'fine', 'pay'];

  imgDialogRef: MatDialogRef<ImageDialogComponent>;
  configOptions: MatDialogConfig;
  ngOnInit() {
    console.log("------>",this.data)
    this.dataSource = new CustomerTableDataSource(this.data, this.paginator, this.sort);
    console.log("datasourcec------>",this.dataSource)
  }

    ngAfterViewInit(){
      
        this.dataSource = new CustomerTableDataSource(this.data,this.paginator, this.sort);
    
    }

  openImage(id) {
    console.log("yes")
    this.configOptions = {
      autoFocus: true,
      height: '450px',
      width: '450px',
      data: id
    }
    this.imgDialogRef = this.dialog.open(ImageDialogComponent, this.configOptions);
  }
}
