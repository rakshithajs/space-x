import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions;

  constructor(private http: HttpClient) { }

  get(path: string, params: any= '') {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params
    };
    return this.http.get(path, this.httpOptions).pipe(map(
      (res) => res
    ));
  }
}
