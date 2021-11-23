import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {

  constructor() { }
  private statusSource = new BehaviorSubject(false); // set default status
  currentStatus = this.statusSource.asObservable();

  private searchStatus = new BehaviorSubject(false);
  currentSearchStatus = this.searchStatus.asObservable();

  changeStatus(status: boolean) {
    this.statusSource.next(status)
  }

  changeSearchStatus(status: boolean) {
    this.searchStatus.next(status)
  }
}
