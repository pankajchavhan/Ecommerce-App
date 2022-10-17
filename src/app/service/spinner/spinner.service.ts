import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading$ = new Subject<boolean>();

  constructor() {}

  getIsLoadingValue():Observable<boolean>{
    return this.isLoading$.asObservable();
  }

  show() {
      this.isLoading$.next(true);
  }
  hide() {
      this.isLoading$.next(false);
  }
}
