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
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.page.html',
  styleUrls: ['./passwordreset.page.scss'],
})
export class PasswordresetPage implements OnInit {

  email = "";

  constructor(private fun: FunctionsService, private menuCtrl: MenuController) { 
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  reset(){
    if(this.fun.validateEmail(this.email)){
      this.fun.passwordReset(this.email);
      this.fun.presentToast('Temporary password has been sent on your mail', false, 'bottom', 2100);
    }
    else{
      this.fun.presentToast('Wrong Input!', true, 'bottom', 2100);
    }
  }

}
