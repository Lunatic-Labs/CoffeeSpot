import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string = "";
  public password: string = "";

  constructor(private router: Router) { }

  ngOnInit() {
    // Already logged in
    if(localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  login(){
    alert("Logged in!");
    console.log(this.email);
    console.log(this.password);
    // This should be done in backend or firebase
    // and password should be encrypted
    if(this.email == "cjsantee2000@gmail.com" && this.password == "1234"){
      localStorage.setItem("user", this.email);
      this.router.navigate(['/'])
    }
  }

}
