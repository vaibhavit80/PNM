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
import { Product } from '../data.service';
import { FunctionsService } from '../functions.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-innerhome',
  templateUrl: './innerhome.component.html',
  styleUrls: ['./innerhome.component.scss'],
  inputs: ['recieved_data']
})
export class InnerhomeComponent implements OnInit {

  @Input() recieved_data: Array<Product>;

  constructor(public fun: FunctionsService, private nav: NavController) {
  }

  ngOnInit() {
  }

  open(data){
    this.fun.update(data);
    this.nav.navigateForward('/productdetail');
  }

}
