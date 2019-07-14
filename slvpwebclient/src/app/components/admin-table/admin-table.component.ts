import { AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AdminTableDataSource } from './admin-table-datasource';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AdminTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new AdminTableDataSource(this.paginator, this.sort);
  }
}
