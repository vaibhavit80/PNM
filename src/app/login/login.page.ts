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
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { InfomodalPage } from '../infomodal/infomodal.page';
import { DataService } from '../data.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private fun: FunctionsService,
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private data: DataService) {
  }

  ngOnInit() {
    //  this.storage.get('authData').then(tData => {
    //     if (tData){
    //     this.fun.navigate('home', false);
    //     }
    // });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
    this.splashScreen.hide();
  }

  signin() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        if (this.fun.validateEmail(this.email)) {
          if(this.email === 'admin@gmail.com' && this.password === '1234')
            {
              //this.storage.set('authData', true);
                this.fun.navigate('home', false);
            }
            else{this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100); return;}
          // this.data.login(this.email , this.password).subscribe(data => {
          //   // tslint:disable-next-line: no-debugger
          //   if(data.Error === true)
          //   {
          //     this.fun.presentToast('Something went wrong!', true, 'bottom', 2100);
          //     return;
          //   }
          //   this.storage.set('authData', true);
          //   this.fun.navigate('home', false);
          // },
          // error => {
          //   this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
          // });
          
        } else {
          this.fun.presentToast('Wrong Input!', true, 'bottom', 2100);
        }
      } else {
        this.fun.navigate('home', false);
       // this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
      }
    });

  }

  async open_modal(b) {
    let modal;
    if (b) {
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.data.terms_of_use, title: 'Terms of Use' }
      });
    } else {
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.data.privacy_policy, title: 'Privacy Policy' }
      });
    }
    return await modal.present();
  }

}
