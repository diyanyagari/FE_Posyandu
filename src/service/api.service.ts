import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private totalRequests = 0;
  constructor(private http: HttpClient, public loaderService: LoaderService) { }

  get(url: string): Observable<any> {
    this.totalRequests++
    this.loaderService.show()
    return this.http.get<any>(url)
      .pipe(
        tap((res: any) => { }),
        finalize(() => this.decreaseRequests())
      );
  }

  add(url: string, data: any): Observable<any> {
    this.totalRequests++
    this.loaderService.show()
    return this.http.post<any>(url, data).pipe(
      tap((_res: any) => console.log('Tambah data /w' + JSON.stringify(data))),
      finalize(() => this.decreaseRequests())
    );
  }

  update(url: string, data: any): Observable<any> {
    this.totalRequests++
    this.loaderService.show()
    const urlUpdate = url
    return this.http.post(urlUpdate, data).pipe(
      tap(_res => console.log('Update Data')),
      finalize(() => this.decreaseRequests())
    );
  }

  upload(url: string, file: any): Observable<any> {
    this.totalRequests++
    this.loaderService.show()
    return this.http.post<any>(url, file).pipe(
      tap((_res: any) => console.log('Upload Data /w' + JSON.stringify(file))),
      finalize(() => this.decreaseRequests())
    );
  }

  delete(url: string): Observable<any> {
    this.totalRequests++
    this.loaderService.show()
    return this.http.delete<any>(url).pipe(
      tap(_res => console.log('Delete data')),
      finalize(() => this.decreaseRequests())
    );
  }

  deleteV2(url: string, data: any): Observable<any> {
    this.totalRequests++
    this.loaderService.show()
    return this.http.post<any>(url, data).pipe(
      tap(_res => console.log('Delete data')),
      finalize(() => this.decreaseRequests())
    );
  }

  private decreaseRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.loaderService.hide()
    }
  }
}
