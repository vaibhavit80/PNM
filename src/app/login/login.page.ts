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
import { AuthData, DataService, UserDO } from '../data.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private secureKey: string;
  private secureIV: string;
  private authData: AuthData;
  email = '';
  password = '';
userData: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public fun: FunctionsService,
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private googlePlus: GooglePlus,
    public fb: Facebook,
    private data: DataService) {
      let tData = localStorage.getItem('IsLogin');
        if (tData && tData === "true"){
          this.fun.navigate('home', false);
        }
  }
  googleSignIn() {
    this.googlePlus.login({})
    .then(res => {
      console.log(res);
      let user: UserDO = new UserDO();
      user.aid = this.data.UUIDs();
      user.did = this.data.DeviceId();
      user.fname = res.givenName;
      // this.displayName = res.displayName;
      // this.familyName = res.familyName;
      // this.givenName = res.givenName;
      // this.userId = res.userId;
      // this.imageUrl = res.imageUrl;
      user.email = res.email;
      this.saveUser(user);
    })
    .catch(err => {
      localStorage.setItem('user', 'NA');
      localStorage.setItem('IsLogin', "false");
      this.fun.presentToast('Error logging into Google', true, 'bottom', 2100);
    });
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
            this.fb.api("/me?fields=name,gender,birthday,email", []).then((res) => {

                // Get the connected user details
                // var gender    = user.gender;
                // var birthday  = user.birthday;
                // var name      = user.name;
                // var email     = user.email;
                let user: UserDO = new UserDO();
                user.aid = this.data.UUIDs();
                user.did = this.data.DeviceId();
                user.fname = res.name;
                user.email = res.email;
                this.saveUser(user);

      })
      .catch(err => {
        localStorage.setItem('user', 'NA');
        localStorage.setItem('IsLogin', "false");
      });

        } 
        // An error occurred while loging-in
        else {
          localStorage.setItem('user', 'NA');
          localStorage.setItem('IsLogin', "false");
            this.fun.presentToast('An error occurred...', true, 'bottom', 2100);
        }

    }).catch(err => {
      localStorage.setItem('user', 'NA');
      localStorage.setItem('IsLogin', "false");
      this.fun.presentToast('Error logging into Facebook', true, 'bottom', 2100);
    });
  }
  ngOnInit() {
    let tData = localStorage.getItem('IsLogin');
        if (tData && tData === "true"){
          this.fun.navigate('home', false);
        }
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
    this.splashScreen.hide();
  }
saveUser(user: UserDO){
  localStorage.setItem('user', user.email);
  this.data.signup(user).subscribe(data => {
    // tslint:disable-next-line: no-debugger
    if(data.Error === true)
    {
      localStorage.setItem('user', 'NA');
      localStorage.setItem('IsLogin', "false");
      this.fun.dismissLoader();
      this.fun.presentToast('Something went wrong!', true, 'bottom', 2100);
      return;
    }
    this.data.setCurrentUserDetail(data);
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
  signin() {
    this.platform.ready().then(() => {
      this.fun.showloader("Verifying User...");
      if (this.platform.is('cordova')) {
        if (this.fun.validateEmail(this.email)) {
             this.data.login(this.email , this.password).subscribe(data => {
             // tslint:disable-next-line: no-debugger
             if(data !== "logged In")
             { localStorage.setItem('IsLogin', "false");
               this.fun.presentToast('Something went wrong!', true, 'bottom', 2100);
              this.fun.dismissLoader();
               return;
             }
             this.fun.dismissLoader();
             localStorage.setItem('IsLogin', "false");
             this.fun.navigate('home', false);
           },
           error => {
            localStorage.setItem('IsLogin', "false");
             this.fun.dismissLoader();
             this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
           });
          
        } else {
          this.fun.dismissLoader();
          this.fun.presentToast('Wrong Input!', true, 'bottom', 2100);
        }
       } else {
         this.fun.dismissLoader();
         this.fun.navigate('home', false);
         this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
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
