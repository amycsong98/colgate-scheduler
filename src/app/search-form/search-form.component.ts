import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiUrl } from '../api-url';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  // array of {TERM_CODE: "201902", TERM_DESC: "Spring 2020"}
  terms: string[];

  constructor(
    private httpClient: HttpClient,
    private apiUrl: ApiUrl,
  ) { }

  ngOnInit() {
    // initialize terms
    this.getTerms().subscribe(
      res => {
        this.terms = res;
      }
    );
  }

  getTerms(): Observable<any> {
    return this.httpClient.get(this.apiUrl.termsUrl);
  }
}
