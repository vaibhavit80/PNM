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
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';
userData: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private fun: FunctionsService,
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private googlePlus: GooglePlus,
    public fb: Facebook,
    private data: DataService) {
  }
  googleSignIn() {
    this.googlePlus.login({})
      .then(result => alert(JSON.stringify(result)))
      .catch(err => alert(JSON.stringify(err)));
  }
  FacebookSignIn() {
    // Login with permissions
    this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
    .then( (res: FacebookLoginResponse) => {

        // The connection was successful
        if(res.status == "connected") {

            // Get user ID and Token
            var fb_id = res.authResponse.userID;
            var fb_token = res.authResponse.accessToken;

            // Get user infos from the API
            this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {

                // Get the connected user details
                var gender    = user.gender;
                var birthday  = user.birthday;
                var name      = user.name;
                var email     = user.email;

                console.log("Gender : " + gender);
                console.log("Birthday : " + birthday);
                console.log("Name : " + name);
                console.log("Email : " + email);

                // => Open user session and redirect to the next page

            });

        } 
        // An error occurred while loging-in
        else {

            console.log("An error occurred...");

        }

    })
    .catch((e) => {
        console.log('Error logging into Facebook', e);
    });
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
