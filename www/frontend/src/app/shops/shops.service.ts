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
export class ShopsService {
  private SHOPS_URL = environment.BACKEND_URL + "/shops"
  private REVIEWS_URL = environment.BACKEND_URL + "/reviews"
  private RATINGS_URL = environment.BACKEND_URL + "/reviews/ratings"

  constructor(private http: HttpClient) { }

  getAllShops(): Observable<any[]> {
    return this.http.get<any[]>(this.SHOPS_URL);
  }

  getAllReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.REVIEWS_URL);
  }

  getAllRatings(): Observable<any> {
    return this.http.get<any[]>(this.RATINGS_URL);
  }

  addNewReview(review: any): Observable<any> {
    return this.http.post(this.REVIEWS_URL, review, httpOptions);
  }

  getShopData(id: string): Observable<any> {
    return this.http.get(this.SHOPS_URL + "/ratings/" + id);
  }

  updateShop(id: string, rating: any): Observable<any> {
    return this.http.put(this.SHOPS_URL + "/"+ id, rating, httpOptions);
  }

  getPopularOrders(): Observable<any> {
    return this.http.get(this.REVIEWS_URL + "/orders/");
  }

  // searchShops(searchTerms: string): Observable<any> {
  //   return this.http.get<searchTerms>(this.SHOPS_URL + "/search/");
  // }

}
