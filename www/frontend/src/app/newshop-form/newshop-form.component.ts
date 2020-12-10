import { Component, OnInit } from '@angular/core';
import { NewshopFormService } from './newshop-form.service';

@Component({
  selector: 'app-newshop-form',
  templateUrl: './newshop-form.component.html',
  styleUrls: ['./newshop-form.component.css']
})
export class NewshopFormComponent implements OnInit {

  name: string = "";
  location: string = "";
  add1: string = "";
  add2: string = "";
  city: string = "";
  state: string = "";
  zip: number = 0;
  freeWifi: boolean = false;
  outdoorSeating: boolean = false;
  foodOptions: boolean = false;

  alert: boolean = false;

  constructor(private newshopFormService: NewshopFormService) { }

  ngOnInit() {
  }

  showAlert(){
    this.alert = true;
  }
  removeAlert(){
    this.alert = false;
  }

  addShop(){
    const shop = {
      name: this.name,
      location: this.location,
      add1: this.add1,
      add2: this.add2,
      city: this.city,
      state: this.state,
      zip: this.zip,
      freeWifi: this.freeWifi,
      outdoorSeating: this.outdoorSeating,
      foodOptions: this.foodOptions,
      taste: 0,
      seating: 0,
      aesthetic: 0,
      study: 0
    }
    console.log(shop);
    this.newshopFormService.addNewShop(shop).subscribe(
      data => {
        console.log("Shop has been submitted sucessfully");
        console.log(data);
        this.showAlert();
      },
      error => {
        console.log("Received an error.");
        console.log(error);
      }
    )
  }


}
