/**
 * PunnuMistri - E-commerce app starter Ionic 4( )
 *
 * Copyright © 2018-present PunnuMistri. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit, Input } from '@angular/core';
import { Product,  DataService } from '../data.service';
import { FunctionsService } from '../functions.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
  inputs: ['recieved_data']
})
export class ProductlistPage implements OnInit {

  @Input() recieved_data: Array<Product>;

  constructor(public fun: FunctionsService,    public dataService: DataService, private nav: NavController) {

  }

  ngOnInit() {
    debugger;
    console.log(this.recieved_data);
  }

  open(data){
    this.fun.update(data);
    //this.dataService.current_product = data;
    this.dataService.addtorecent(data);
    this.nav.navigateForward('/productdetail');
  }

}
