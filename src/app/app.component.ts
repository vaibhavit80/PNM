/**
 * PunnuMistri - E-commerce app starter Ionic 4( )
 *
 * Copyright © 2018-present PunnuMistri. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService, Company, vehicle_type } from './data.service';
import { FunctionsService } from './functions.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  side_open = true;
  side_open1 = true;
totalcart = 0; 
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Products', url: '/search', modal: true, icon: 'search' },
    { title: 'Orders', url: '/orders', icon: 'notifications' },
    { title: 'Shopping Cart', url: '/cart', icon: 'cart' }
  ];
  public appPages1 = [
    { title: 'Settings', url: '/settings', icon: 'cog' },
    { title: 'Help', url: '/faqs', icon: 'help-circle' }
  ];

  companies : Array<Company> = [];
  vehicles: Array<vehicle_type> = [];
  menu(b){
    if(b){
      this.side_open = false;
      this.side_open1 = true;
    }
    else {
      this.side_open = false;
      this.side_open1 = false;
    }
  }

  back(){
    this.side_open = true;
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public dataService: DataService,
    public fun: FunctionsService
  ) {
    this.initializeApp();
    this.companies =this.dataService.getAllCompanies();
    this.vehicles =this.dataService.getvehicle_type();
   this.totalcart = this.dataService.getTotalCartbyUser(this.dataService.current_user.id);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }
}
