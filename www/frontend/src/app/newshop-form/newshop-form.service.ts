import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NewshopFormService {
  private BACKEND_URL = environment.BACKEND_URL + "/shops"
  constructor(private http: HttpClient) { }

  addNewShop(shop: any): Observable<any> {
    return this.http.post(this.BACKEND_URL, shop, httpOptions);
  }
}
