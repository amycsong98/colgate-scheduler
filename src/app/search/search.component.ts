import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from '../course.service';
import { DataPassService } from '../data-pass.service';

import { URL_PREFIX, ACTION_SEARCH } from '../constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.css',
    '../colgate-scheduler.css'
  ]
})
export class SearchComponent implements OnInit {
  programs: any[]; // array of {"AREA_CODE":"ALS1","AREA_DESC":"African American Studies"}
  coreAreas: any[]; // array of {CORE_AREA: "Challenges of Modernity"}
  inquiryAreas: any[]; //

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
  ) { }

  ngOnInit() {
    // initialize department / program
    this.courseService.getPrograms().subscribe(
      res => {
        this.programs = res;
        console.log(this.programs);
      }
    );

    // initialize core area
    this.courseService.getCoreAreas().subscribe(
      res => {
        this.coreAreas = res;
        console.log(this.coreAreas);
      }
    );

    // initialize area of inquiry
    this.courseService.getInquiryAreas().subscribe(
      res => {
        this.inquiryAreas = res;
        console.log(this.inquiryAreas);
      }
    );
  }

  search() {
    this.dialog.open(DialogSearchComponent, {
      data: {
        programs: this.programs,
        coreAreas: this.coreAreas,
        inquiryAreas: this.inquiryAreas
      }
    });
  }
}

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search.dialog.html',
})
export class DialogSearchComponent implements AfterViewInit {
  // search form variables
  keyword: string;
  termSelected: string;
  programsSelected = [];
  daysSelected = [];
  timesSelected = [];
  levelsSelected = [];
  creditsSelected = [];
  isOpenCourseOnly: boolean;

  // for the bug: https://stackoverflow.com/questions/53518380/angular-7-material-expansion-panel-flicker
  disableAnimation = true;

  constructor(
    public dialogRef: MatDialogRef<DialogSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataPassService: DataPassService,
    private courseService: CourseService
  ) {
  }

  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => this.disableAnimation = false);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(data: any) {
    console.log(data);
    console.log(this.programsSelected);
    console.log(this.daysSelected);
    console.log(this.timesSelected);
    console.log(this.levelsSelected);
    console.log(this.creditsSelected);

    const searchUrl = this.formSearchUrl(data);
    this.dataPassService.sendData({ action: ACTION_SEARCH, data: searchUrl });
  }

  formSearchUrl(data: any) {
    if (this.keyword) {
      this.keyword = this.keyword.replace(/ /g, '+');
    }

    let keywordCode = 'keyword=';
    keywordCode += this.keyword ? this.keyword : '';

    let termCode = '&termCode=';
    termCode += this.courseService.getCurrentTerm();

    let programCode = '';
    for (const program of this.programsSelected) {
      programCode += '&program[]=' + program;
    }

    let coreCode = '&coreArea=';
    coreCode += data['core_area'] ? data['core_area'] : '';

    let inquiryCode = '&inquiryArea=';
    inquiryCode += data['inquiryArea'] ? data.inquiryAreas : '';

    let dayCode = '';
    for (const day of this.daysSelected) {
      dayCode += '&meetDays[]=' + day;
    }

    let timeCode;
    for (const time of this.timesSelected) {
      timeCode = time === 'Morning' ? '&meetTimeMorning=Y' : '&meetTimeMorning=false';
      timeCode += time === 'Afternoon' ? '&meetTimeAfternoon=Y' : '&meetTimeAfternoon=';
      timeCode += time === 'Evening' ? '&meetTimeEvening=Y' : '&meetTimeEvening=';
    }

    if (this.timesSelected.length == 0) {
      timeCode = '&meetTimeMorning=false&meetTimeAfternoon=&meetTimeEvening=';
    }

    const openOnlyCode = this.isOpenCourseOnly ? '&openCoursesOnly=Y' : '&openCoursesOnly=';

    const url = URL_PREFIX + keywordCode + termCode + programCode + coreCode + inquiryCode + dayCode + timeCode + openOnlyCode;
    return url;
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
