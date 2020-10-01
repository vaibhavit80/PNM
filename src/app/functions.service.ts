/**
 * PunnuMistri - E-commerce app starter Ionic 4( )
 *
 * Copyright © 2018-present PunnuMistri. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 *
 */


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController, AlertController, LoadingController } from '@ionic/angular';
import { DataService } from './data.service';
import { resolve } from 'q';


@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  isLoading = false;
  constructor(
    public dataService: DataService,
    public loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private nav: NavController, public alertController: AlertController) { }
    passwordReset(_email: string){
      // Send random pass on mail 
     }
  navigate(link, forward?) {
    if (forward) {
      this.nav.navigateForward('/' + link);
    } else {
      this.router.navigateByUrl('/' + link);
    }
  }

  array(i) {
    const l = [];
    for (let j = 0; j < i; j++) {
      l.push(1);
    }
    return l;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkout() {
    if (this.dataService.current_user.address.length === 0) {
      this.nav.navigateForward('/NewAddress/$1');
    } else {
      this.nav.navigateForward('/Checkout');
    }
  }
  async showloader(msgdata: string) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: msgdata
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  waitLoader(msgdata: string , waitTime: number) {
   this.loadingController.create({
      message: msgdata,
      duration: waitTime
    }).then(a => {
      a.present();
    });
  }

  async presentAlert(_header: any, _message: any) {
    const alert = await this.alertController.create({
      header: _header,
      message: _message,
      buttons: ['OK']
    });

    await alert.present();
  }
  // async presentToast(msgtype = 'dark', message) {
  //   const toast = await this.toastController.create({
  //     message,
  //     color: msgtype.toLowerCase() === 'error' ? 'danger' : (msgtype.toLowerCase() === 'warning' ? 'dark' :
  //                             (msgtype.toLowerCase() === 'info' ? 'dark' : 'dark')),
  //     showCloseButton: true,
  //     position: msgtype.toLowerCase() === 'error' ? 'top' : (msgtype.toLowerCase() === 'warning' ? 'top' :
  //     (msgtype.toLowerCase() === 'info' ? 'bottom' : 'bottom')),
  //     closeButtonText: 'close',
  //     duration: 4000
  //   });
  //   toast.present();
  // }
  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

  back() {
    // this.nav.goBack();
    this.nav.back();
  }

  date(date) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  update(product) {
    this.dataService.current_product = product;
  }

  removeConform(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Are you sure you want to remove this item',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              console.log('Confirm Cancel: blah');
              resolve('cancel');
            }
          }, {
            text: 'Okay',
            handler: (ok) => {
              console.log('Confirm Okay');
              resolve('ok');
            }
          }
        ]
      });

      alert.present();
    });
  }

  calculate(price, discount) {
    price = price - (price * discount / 100);
    return price.toFixed(2);
  }
}
