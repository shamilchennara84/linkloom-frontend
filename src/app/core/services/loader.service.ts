import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loadingSubject = new BehaviorSubject<boolean>(false);
  public loadingAction$ = this._loadingSubject.asObservable();

  showLoader() {
    console.log('show loader called');
    this._loadingSubject.next(true);
  }

  hideLoader() {
    this._loadingSubject.next(false);
  }
}
