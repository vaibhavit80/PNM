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
import { MenuController, ModalController } from '@ionic/angular';
import { InfomodalPage } from '../infomodal/infomodal.page';
import { DataService, User, UserDO } from '../data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

 user: UserDO

  constructor(public fun:FunctionsService, private menuCtrl: MenuController, private modalController: ModalController, private data: DataService) { 
 this.user = new UserDO();
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  signup(){
    if(this.user.fname != '' && this.user.lname != '' && this.user.mobile && this.user.email != '' && this.user.password != '' && this.fun.validateEmail(this.user.email)){
      this.fun.showloader("Signing User...");
      this.user.did = this.data.DeviceId;
      this.user.aid = this.data.UUIDs;
      localStorage.setItem('user', this.user.email);
      this.data.signup(this.user).subscribe(data => {
        // tslint:disable-next-line: no-debugger
        if(data.Error === true)
        {
          localStorage.setItem('user', 'NA');
          localStorage.setItem('IsLogin', "false");
          this.fun.dismissLoader();
          this.fun.presentToast('Something went wrong!', true, 'bottom', 2100);
          return;
        }
        localStorage.setItem('IsLogin', "true");
        this.fun.dismissLoader();
        this.fun.navigate('home', false);
      },
      error => {
        localStorage.setItem('user', 'NA');
        localStorage.setItem('IsLogin', "false");
        this.fun.dismissLoader();
        this.fun.presentToast('Invalid Request!', true, 'bottom', 2100);
      });
    }
    else {
      this.fun.presentToast('Wrong Input', true, 'bottom', 2100);
    }
  }

  async open_modal(b){
    let modal;
    if(b){
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.data.terms_of_use, title: 'Terms of Use' }
      });
    }
    else{
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.data.privacy_policy, title: 'Privacy Policy' }
      });
    }
    return await modal.present();
  }

}
