import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import { FormGroup, FormControl } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}

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

  getData(): Observable<Person[]> {
    return this.http.get<Person[]>('/person/getPersons');
  }

  updatePerson(person: Person): Observable<any> {
    return this.http.post<Person>('/person/updatePerson', person, httpOptions);
  }

  populateForm(person) {
    this.form.setValue(person);
  }
}
