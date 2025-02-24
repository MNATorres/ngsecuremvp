import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public get(path: string, options?: any): Observable<any> {
    return this.httpClient.get(path, options);
  }

  public put(path: string, body: object = {}, options?: any): Observable<any> {
    return this.httpClient.put(path, body, options);
  }

  public post(path: string, body: object = {}, options?: any): Observable<any> {
    return this.httpClient.post(path, body, options);
  }

  public delete(path: string, options?: any): Observable<any> {
    return this.httpClient.delete(path, options);
  }
}
