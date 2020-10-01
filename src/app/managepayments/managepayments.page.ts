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
import { DataService } from '../data.service';
import { FunctionsService } from '../functions.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-managepayments',
  templateUrl: './managepayments.page.html',
  styleUrls: ['./managepayments.page.scss'],
})
export class ManagepaymentsPage implements OnInit {

  constructor(public dataService: DataService, public fun: FunctionsService, private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }

}