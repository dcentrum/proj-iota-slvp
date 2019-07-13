import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  Input
} from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { CustomerTableDataSource } from "./customer-table-datasource";
import { DataService } from "../../core/data.service";
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ImageDialogComponent } from "../../shared/image-dialog/image-dialog.component";
import { AppealComponent } from "../appeal/appeal.component";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-customer-table",
  templateUrl: "./customer-table.component.html",
  styleUrls: ["./customer-table.component.css"]
})
export class CustomerTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input("data") data;

  dataSource: CustomerTableDataSource;
  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    "img",
    "date",
    "location",
    "description",
    "appeal",
    "fine",
    "pay"
  ];

  imgDialogRef: MatDialogRef<ImageDialogComponent>;
  configOptions: MatDialogConfig;
  ngOnInit() {
    console.log("------>", this.data);
    this.dataSource = new CustomerTableDataSource(
      this.data,
      this.paginator,
      this.sort
    );
    console.log("datasourcec------>", this.dataSource);
  }

  ngAfterViewInit() {
    this.dataSource = new CustomerTableDataSource(
      this.data,
      this.paginator,
      this.sort
    );
  }
  appealStatus(row) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "400px",
      position: { top: "5%" },
      data: { component: AppealComponent }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.dataService.appeal(row.challanNum, result.msg).subscribe(resp => {
          if (resp) {
            this._snackBar.open("successfully appealed", "", {
              duration: 2000,
              verticalPosition :'top'
            });
          } else {
            this._snackBar.open("issue with appealing", "", {
              duration: 2000
            });
          }
        });
      } 
    });
  }
  openImage(id) {
    console.log("yes");
    this.configOptions = {
      autoFocus: true,
      height: "450px",
      width: "450px",
      data: id
    };
    this.imgDialogRef = this.dialog.open(
      ImageDialogComponent,
      this.configOptions
    );
  }
}
