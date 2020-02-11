import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URL_PROGRAM_AREAS, URL_CORE_AREAS, URL_TERMS, URL_INQUIRY_AREAS } from '../constants';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  // data
  terms: any[]; // array of {TERM_CODE: "201902", TERM_DESC: "Spring 2020"}
  programs: any[]; // array of {"AREA_CODE":"ALS1","AREA_DESC":"African American Studies"}
  coreAreas: any[]; // array of {CORE_AREA: "Challenges of Modernity"}
  inquiryAreas: any[]; //

  // search form variables
  // keyword: string;
  // termSelected: string;
  programsSelected = [];
  daysSelected = [];
  timesSelected = [];
  levelsSelected = [];
  creditsSelected = [];
  // isOpenCourseOnly: boolean;

  //
  panelOpenState = false;

  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    // initialize terms
    this.getTerms().subscribe(
      res => {
        this.terms = res;
      }
    );

    // initialize department / program
    this.getPrograms().subscribe(
      res => {
        this.programs = res;
        console.log(this.programs);
      }
    );

    // initialize core area
    this.getCoreAreas().subscribe(
      res => {
        this.coreAreas = res;
        console.log(this.coreAreas);
      }
    );

    // initialize area of inquiry
    this.getInquiryAreas().subscribe(
      res => {
        this.inquiryAreas = res;
        console.log(this.inquiryAreas);
      }
    );

  }

  getTerms(): Observable<any> {
    return this.httpClient.get(URL_TERMS);
  }

  getPrograms(): Observable<any> {
    return this.httpClient.get(URL_PROGRAM_AREAS);
  }

  getInquiryAreas(): Observable<any> {
    return this.httpClient.get(URL_INQUIRY_AREAS);
  }

  getCoreAreas(): Observable<any> {
    return this.httpClient.get(URL_CORE_AREAS);
  }

  onSubmit(data: any) {
    console.log(data);
    console.log(this.programsSelected);
    console.log(this.daysSelected);
    console.log(this.timesSelected);
    console.log(this.levelsSelected);
    console.log(this.creditsSelected);
  }

  // checked box updates
  updateCheckedPrograms(program: any, event: any) {
    // checkbox checked
    if (event.checked) {
      this.programsSelected.push(program.AREA_CODE);
    } else { // checkbox unchecked: delete the item
      this.programsSelected = this.programsSelected.filter(programCode => programCode !== program.AREA_CODE);
    }
  }

  updateCheckedDays(day: string, event: any) {
    // checkbox checked
    if (event.checked) {
      this.daysSelected.push(day);
    } else { // checkbox unchecked: delete the item
      this.daysSelected = this.daysSelected.filter(e => e !== day);
    }
  }

  updateCheckedTimes(time: string, event: any) {
    if (event.checked) {
      this.timesSelected.push(time);
    } else { // checkbox unchecked: delete the item
      this.timesSelected = this.timesSelected.filter(e => e !== time);
    }
  }

  updateCheckedLevels(level: string, event: any) {
    if (event.checked) {
      this.levelsSelected.push(level);
    } else { // checkbox unchecked: delete the item
      this.levelsSelected = this.levelsSelected.filter(e => e !== level);
    }
  }

  updateCheckedCredits(credit: string, event: any) {
    if (event.checked) {
      this.creditsSelected.push(credit);
    } else { // checkbox unchecked: delete the item
      this.creditsSelected = this.creditsSelected.filter(e => e !== credit);
    }
  }
}
