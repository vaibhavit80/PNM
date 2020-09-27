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
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { Order, OrderProduct, DataService } from '../data.service';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-orderinfo',
  templateUrl: './orderinfo.page.html',
  styleUrls: ['./orderinfo.page.scss'],
})
export class OrderinfoPage implements OnInit {

  order: Order;
order_product: Array<OrderProduct>;
  constructor(private modalController: ModalController, private dataService: DataService, private params: NavParams,private nav: NavController, private fun: FunctionsService) {
    this.order = params.get('value');
    this.order_product = this.dataService.getOrderProducts(this.order.id);
  }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }
  open(data){
    this.fun.update(data);
    this.dataService.recent.push(data);
    this.dataService.current_Product = data;
    this.nav.navigateForward('/productdetail');
  }
}
