import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  loggedIn: boolean = false;

  ngOnInit() {
    if(!localStorage.getItem('user')){
      this.router.navigate(['/login']);
    }
    else{
      this.loggedIn = true;
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    this.loggedIn = false;
  }

}
