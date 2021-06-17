
import { Component, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { DataService, HomeTab,  CategoryTabs, Category, Product } from '../data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('Slides') slides: IonSlides;

  segment = '';
  products: Array<Product> = [];
  index = 0;
  data: Array<Category> = [];
  slideOpts = {
    effect: 'flip',
    zoom: false
  };
searchTerm = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private menuCtrl: MenuController,
    public fun: FunctionsService,
    public dataService: DataService) {
    const email = localStorage.getItem('user');
    dataService.updateLocation(email);
     dataService.getCategories().subscribe(data1 => {
      // tslint:disable-next-line: no-debugger
      if (data1.Error === true) {

        this.data = [];
        return;
      }
      this.data = data1;
      const d = this.activatedRoute.snapshot.paramMap.get('id');
      if (d) {
        this.segment = this.data[parseInt(d, 10)].Id;
      } else {
        this.segment = this.data[0].Id;
      }
      this.searchTerm = this.dataService.searchParams.searchterm;
      dataService.getProductsList(this.data[0].Id).subscribe(prod => {
        // tslint:disable-next-line: no-debugger
        if (prod.Error === true) {

          this.products = [];
          return;
        }
        this.products = prod;
      },
      error => {
        this.products = [];
      //  this.fun.presentToast('Unable to Track location!', true, 'bottom', 2100);
      });

     // this.fun.presentToast('Live location updated', true, 'bottom', 2100);
    },
    error => {
      this.data = [];
    //  this.fun.presentToast('Unable to Track location!', true, 'bottom', 2100);
    });

  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(true, 'end');
  }

  seg(event) {
    this.segment = event.detail.value;

    // tslint:disable-next-line: radix
    this.dataService.getProductsList(parseInt(this.segment)).subscribe(prod => {
      // tslint:disable-next-line: no-debugger
      if (prod.Error === true) {

        this.products = [];
        return;
      }
      this.products = prod;
    },
    error => {
      this.products = [];
    //  this.fun.presentToast('Unable to Track location!', true, 'bottom', 2100);
    });
  }

  drag() {
    let distanceToScroll = 0;
    for (const index in this.data) {
      // tslint:disable-next-line: radix
      if (parseInt(index) < this.index) {
        distanceToScroll = distanceToScroll + document.getElementById('seg_' + index).offsetWidth + 24;
      }
    }
    document.getElementById('dag').scrollLeft = distanceToScroll;
  }

  preventDefault(e) {
    e.preventDefault();
  }

  async change() {
    await this.slides.getActiveIndex().then(data => this.index = data);
    this.segment = this.data[this.index].Id;
    this.dataService.getProductsList(this.data[this.index].Id).subscribe(prod => {
      // tslint:disable-next-line: no-debugger
      if (prod.Error === true) {

        this.products = [];
        return;
      }
      this.products = prod;
    },
    error => {
      this.products = [];
    //  this.fun.presentToast('Unable to Track location!', true, 'bottom', 2100);
    });
    this.drag();
  }

  side_open() {
    this.menuCtrl.toggle('end');
  }

  update(i) {
    this.slides.slideTo(i).then((res) => console.log('responseSlideTo', res));
  }
}
