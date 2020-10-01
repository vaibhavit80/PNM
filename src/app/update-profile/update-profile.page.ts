import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { MenuController, ModalController } from '@ionic/angular';
import { DataService, User, UserDO } from '../data.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  user: UserDO

  constructor(public fun:FunctionsService, private menuCtrl: MenuController, private modalController: ModalController, private data: DataService) { 
   this.user = new UserDO();
  }

  ngOnInit() {
    this.user.fname = this.data.current_user.fname ;
    this.user.lname = this.data.current_user.lname ;
    this.user.mobile = this.data.current_user.mobile ;
    this.user.email = this.data.current_user.email ;
    this.user.id = this.data.current_user.id ;

  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  signup(){
    if(this.user.fname != '' && this.user.lname != '' && this.user.mobile && this.user.email != '' && this.user.password != '' && this.fun.validateEmail(this.user.email)){
      this.fun.showloader("Signing User...");
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
        this.fun.presentToast('Profile updated successfully', true, 'bottom', 2100);
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

}
