import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cat, CatApiObject } from '../_model/cat.model';
import { catchError, expand, map, Observable, repeatWhen, retry, takeWhile, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private readonly userFetchErrorMessage = "Unable to fetch cats data, try later again";
  private readonly invalidObjectMessage = "Invalid cat API object structure";

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  public fetchCat(): Observable<Cat> {
    return this.http.get<CatApiObject>(environment.catsApiUrl)
      .pipe(retry(1),
        map((object: CatApiObject) => {
          if (typeof object.data !== 'undefined' && object.data.length === 0) {
            throw new Error(this.invalidObjectMessage);
          }
          return new Cat(object.data[0]);
        }),
        catchError(error => {
          this.toastr.error(this.userFetchErrorMessage);
          return throwError(() => new Error(error));
        })
      );;
  }
}
