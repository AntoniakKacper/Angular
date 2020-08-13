import { Component, OnInit, Inject } from '@angular/core';
import { TableService } from '../../services/table.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    private tableService: TableService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person[]
  ) {}

  personForm = this.tableService.form;

  ngOnInit(): void {}

  getData() {
    this.tableService.getData().subscribe((persons) => {
      this.data = persons;

      this.dialogRef.close(this.data);
    });
  }

  onSubmit() {
    this.tableService
      .updatePerson(this.personForm.value)
      .subscribe((isUpdated) => {
        if (isUpdated) {
          this.getData();
        }
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}
