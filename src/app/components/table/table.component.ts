import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../../models/Person';
import { TableService } from '../../services/table.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'profession'];
  activeColumn: string;

  data: Person[];
  persons: Person[] = [];

  _filter: any;
  status: boolean = false;
  sorted: boolean = false;

  dataSource = new MatTableDataSource<Person>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private tableService: TableService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.displayData();
  }

  displayData() {
    this.tableService.getData().subscribe((result) => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.persons = result;
      this.dataSource.data = result as Person[];
    });

    this.filterOverwrite();
  }

  filterOverwrite() {
    this.dataSource.filterPredicate = (data: Person, filters: string) => {
      const parsedFilters = JSON.parse(filters);

      return Object.keys(parsedFilters)
        .map((column) => data[column].includes(parsedFilters[column]))
        .reduce((acc: boolean, curr: boolean) => (acc = curr) && acc, true);
    };
  }

  onEdit(row) {
    this.tableService.populateForm(row);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = this.dataSource.data;

    let editDialog = this.dialog.open(DialogComponent, dialogConfig);
    editDialog.afterClosed().subscribe((persons) => {
      if (persons) {
        this.dataSource.data = persons;
      }
    });
  }

  applyFilter(filterValue: string, column) {
    this._filter = {
      ...this._filter,
      [column]: filterValue,
    };

    if (column === 'firstName') {
      if (!filterValue) delete this._filter[column];

      this.dataSource.filter = JSON.stringify(this._filter);
    }
    if (column === 'lastName') {
      if (!filterValue) delete this._filter[column];
      this.dataSource.filter = JSON.stringify(this._filter);
    }
    if (column === 'age') {
      if (!filterValue) delete this._filter[column];
      this.dataSource.filter = JSON.stringify(this._filter);
    }
    if (column === 'profession') {
      if (!filterValue) delete this._filter[column];
      this.dataSource.filter = JSON.stringify(this._filter);
    } else {
      console.log('brak wynikow');
    }
  }

  onSortEvent(event) {
    this.activeColumn = event.active;
  }
}
