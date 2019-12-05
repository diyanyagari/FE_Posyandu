import { Inject, forwardRef, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, throwError, asapScheduler } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

import { HttpClientModule , HttpParams} from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  login(username, password): Observable<any> {
    let url = environment.BASE_URL;
    return this.http.post(url + 'login', { username: username, password: password });
  }

  register(email, username, password, nama_lengkap, alamat, id_posyandu): Observable<any> {
    let url = environment.BASE_URL;
    return this.http.post(url + 'register', { email: email, username: username, password: password, nama_lengkap: nama_lengkap, alamat: alamat, id_posyandu: id_posyandu });
  }

  // register(email, username, password, nama_lengkap, alamat, id_posyandu): Observable<any> {

  //   let params = {
  //       email: email,
  //       username: username,
  //       password: password,
  //       nama_lengkap: nama_lengkap,
  //       alamat: alamat,
  //       id_posyandu: id_posyandu
  //     }

  //   let headers = new Headers({
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  //   });
  //   let options = { headers: headers };
  //   let url = environment.BASE_URL;
  //   return this.http.post(url + 'register', params, options);
  // }

  logout() {
    // localStorage.removeItem('user.data');
    // this.router.navigate(['/']);
  }
}
