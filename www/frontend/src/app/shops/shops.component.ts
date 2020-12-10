import { Component, OnInit } from '@angular/core';
import { ShopsService } from './shops.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  shops: any[];
  reviews: any[];
  ratings: any[];

  allOrders: any[];

  edit_mode: boolean = false;

  taste: number = 0;
  seating: number = 0;
  aesthetic: number = 0;
  study: number = 0;
  order: string = "";
  price: number = 0;
  comments: string = "";

  freeWifi: boolean = false;
  outdoorSeating: boolean = false;
  foodOptions: boolean = false;

  searchField: string = "";

  p: any;

  constructor(private shopsService: ShopsService) { }

  ngOnInit() {
    this.getAllShops();
    this.getAllReviews();
    this.getPopularOrders();
    // this.getAllRatings();
  }

  getAllShops() {
    this.shopsService.getAllShops().subscribe(
      data => {
        // console.log(data);
        this.shops = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllReviews() {
    this.shopsService.getAllReviews().subscribe(
      data => {
        this.reviews = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllRatings() {
    this.shopsService.getAllRatings().subscribe(
      data => {
        this.ratings = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  addReview(id){
    const review = {
      shop: id,
      taste: this.taste,
      seating: this.seating,
      aesthetic: this.aesthetic,
      study: this.study,
      order: this.order,
      price: this.price,
      comments: this.comments
    }

    this.shopsService.addNewReview(review).subscribe(
      data => {
        console.log("Review has been submitted sucessfully");
        console.log(data);
      },
      error => {
        console.log("Received an error.");
        console.log(error);
      }
    );

    var currRating;
    var newRating;
    this.shopsService.getShopData(id).subscribe(
      data => {
        currRating = data;
        if(currRating.numReviews == 0){
          newRating = {
            taste: this.taste,
            seating: this.seating,
            aesthetic: this.aesthetic,
            study: this.study,
            avgPrice: this.price,
            numReviews: 1,
            freeWifi: this.freeWifi,
            outdoorSeating: this.outdoorSeating,
            foodOptions: this.foodOptions
          }
        }
        else{
          newRating = {
            taste: (this.taste + (currRating.taste * currRating.numReviews)) / (currRating.numReviews + 1),
            seating: (this.seating + (currRating.seating * currRating.numReviews)) / (currRating.numReviews + 1),
            aesthetic: (this.aesthetic + (currRating.aesthetic * currRating.numReviews)) / (currRating.numReviews + 1),
            study: (this.study + (currRating.study * currRating.numReviews)) / (currRating.numReviews + 1),
            avgPrice: (this.price + (currRating.avgPrice * currRating.numReviews)) / (currRating.numReviews + 1),
            numReviews: currRating.numReviews + 1,
            freeWifi: this.freeWifi,
            outdoorSeating: this.outdoorSeating,
            foodOptions: this.foodOptions
          }
        }

        this.shopsService.updateShop(id, newRating).subscribe(
          data => {
            this.getAllShops();
          },
          error => {
            console.log("Received an error.");
            console.log(error);
          }
        );
      },
      error => {
        console.log("Received an error.");
        console.log(error);
      }
    );
  }

  edit(){
    this.edit_mode = !this.edit_mode;
  }

  getPopularOrders(){
    this.shopsService.getPopularOrders().subscribe(
      data => {
        this.allOrders = data;
      },
      error => {
        console.log("Received an error.");
        console.log(error);
      }
    );
  }

  getPopularOrder(shop_id){
    for (var i in this.allOrders) {
      if (this.allOrders[i]._id == shop_id){
        return this.allOrders[i].orders[0].order;
      }
    }
    return "no order";
  }

  // searchShops(){
  //   this.shopsService.searchShops(this.searchField).subscribe(
  //     data => {
  //       this.shops = data;
  //     },
  //     error => {
  //       console.log("Received an error.");
  //       console.log(error);
  //     }
  //   );
  // }

}
