/**
 * PunnuMistri - E-commerce app starter Ionic 4( )
 *
 * Copyright © 2018-present PunnuMistri. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { DataService, Cat_Company, Company, Category, vehicle_type } from '../data.service';
import { HomePage } from '../home/home.page';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  vehicles:Array<vehicle_type> = [];
  recent = [];
  vehno = 6;
  searchterm = '';
  constructor(private menuCtrl: MenuController, public fun: FunctionsService, public dataService: DataService, private nav: NavController) {
    this.vehicles = dataService.getvehicle_type();
    this.recent = dataService.recent;
  }

  ngOnInit() {
  }
  getColor(veh_type){
    this.vehno = veh_type.Id;
    this.dataService.searchParams.vehicle_type = veh_type.Name;

  }
  onSearch(){
    this.dataService.searchParams.searchterm = this.searchterm;
    this.fun.navigate('home', false);
  }
  ionViewDidEnter(){
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(false, 'end');
  }
  open(data){
    this.fun.update(data);
    this.nav.navigateForward('/productdetail');
  }
}
