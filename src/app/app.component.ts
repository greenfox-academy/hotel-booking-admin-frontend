import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { appRouting } from './app.routing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./assets/app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hotel Booking Admin';
  isItLogin = true;

  endpointChecker = () => {
      if (location.href.slice(-5) === 'login') {
          this.isItLogin = true;
          console.log(this.isItLogin)
      } else {
          this.isItLogin = false;
          console.log(this.isItLogin)
      }
      return this.isItLogin;
  }

  setIsItLogin = () => {
      this.isItLogin = true
      console.log(this.isItLogin)
  }

  ngOnInit() {
      this.endpointChecker();
  }
}
