import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TableService {
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
    profession: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      firstName: '',
      lastName: '',
      age: '',
      profession: '',
    });
  }

  constructor(private http: HttpClient) {}

  getData(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.url);
  }

  populateForm(person) {
    this.form.setValue(person);
  }
}
