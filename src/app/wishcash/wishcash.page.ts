/**
 * PunnuMistri - E-commerce app starter Ionic 4( )
 *
 * Copyright © 2018-present PunnuMistri. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { DataService } from '../data.service';
import { IonSlides, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-wishcash',
  templateUrl: './wishcash.page.html',
  styleUrls: ['./wishcash.page.scss'],
})
export class WishcashPage implements OnInit {

  @ViewChild('Slides') slides: IonSlides;

  index = 0;
  segment = '';
  public slideOpts : any[];
  data = [{ title: 'Info' },
  { title: 'History' }];

  constructor(public fun: FunctionsService, public dataService: DataService, private menuCtrl: MenuController) {
    this.segment = this.data[0].title;
    this.menuCtrl.enable(false, 'end');
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(true, 'start');
  }

  async change() {
    await this.slides.getActiveIndex().then(data => this.index = data);
    this.segment = this.data[this.index].title;
  }

  update(i) {
    this.slides.slideTo(i);
  }

  seg(event) {
    this.segment = event.detail.value;
  }

}
