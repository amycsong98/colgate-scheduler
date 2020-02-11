import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataPassService {

  private dataSource = new BehaviorSubject({});
  currentData = this.dataSource.asObservable();

  constructor() { }

  sendData(data: any) {
    this.dataSource.next(data);
  }
}
