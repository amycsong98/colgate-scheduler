import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  termJsonUrl = 'assets/JSON/terms.json';
  terms: string[];

  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    // initialize terms
    this.getTerms().subscribe(
      res => {
        this.terms = res['terms'];
      }
    );
  }

  getTerms(): Observable<any> {
    return this.httpClient.get(this.termJsonUrl);
  }


}
