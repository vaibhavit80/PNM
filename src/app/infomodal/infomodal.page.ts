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
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-infomodal',
  templateUrl: './infomodal.page.html',
  styleUrls: ['./infomodal.page.scss'],
})
export class InfomodalPage implements OnInit {

  title = '';
  value = '';

  constructor(private modalController: ModalController, private params: NavParams) {
    this.title = params.get('title');
    this.value = params.get('value');
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
