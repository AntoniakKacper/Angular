import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../../models/Person';
import { TableService } from '../../services/table.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
    profession: new FormControl(''),
  });

  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'profession'];
  activeColumn: string;

  data: Person[];
  persons: Person[] = [];

  status: boolean = false;
  sorted: boolean = false;

  dataSource = new MatTableDataSource<Person>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private tableService: TableService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.displayData();
    this.filter();
    this.dataSource.filterPredicate = this.createFilter();
  }

  displayData() {
    this.tableService.getData().subscribe((result) => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.data = result as Person[];
    });
  }

  filter() {
    this.form.valueChanges.subscribe((value) => {
      this.dataSource.filter = JSON.stringify(value);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);

      return (
        data.firstName.toLowerCase().indexOf(searchTerms.firstName) !== -1 &&
        data.lastName.toString().toLowerCase().indexOf(searchTerms.lastName) !==
          -1 &&
        data.age.toString().indexOf(searchTerms.age) !== -1 &&
        data.profession.toLowerCase().indexOf(searchTerms.profession) !== -1
      );
    };
    return filterFunction;
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

  onSortEvent(event) {
    this.activeColumn = event.active;
  }
}
