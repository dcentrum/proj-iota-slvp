import { AfterViewInit, Component, ViewChild,OnInit,Input} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AdminTableDataSource } from './admin-table-datasource';
import { DataService } from "../../core/data.service";
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ImageDialogComponent } from "../../shared/image-dialog/image-dialog.component";
import { AppealComponent } from "../appeal/appeal.component";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input('data') data;
  dataSource: AdminTableDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['img','number', 'date', 'location', 'description', 'appeal', 'actions'];
  imgDialogRef: MatDialogRef<ImageDialogComponent>;
  configOptions: MatDialogConfig;
  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.dataSource = new AdminTableDataSource(this.data,this.paginator, this.sort);
  }

  accept(row){
    ///api/challan/:challannum/appeal/comment
    this.dataService.appealAction(row.challanNum,'Not relevant to you','true' ).subscribe(resp => {
      if (resp) {
        row.isAppealAccepted=true;
        this._snackBar.open("Successfully reviewd and accepted", "", {
          duration: 2000,
          verticalPosition :'top'
        });
      } else {
        this._snackBar.open("issue with appealing action", "", {
          duration: 2000,
          verticalPosition :'top'
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
