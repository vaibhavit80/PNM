
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
    let email = localStorage.getItem('user');
    dataService.updateLocation(email);
    this.data = dataService.getCategories();
    const d = this.activatedRoute.snapshot.paramMap.get('id');
    if (d) {
      this.segment = this.data[parseInt(d, 10)].Id;
    } else {
      this.segment = this.data[0].Id;
    }
    this.searchTerm = this.dataService.searchParams.searchterm;
    this.products = dataService.getProductsList(this.data[0].Id);
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(true, 'end');
  }
 
  seg(event) {
    this.segment = event.detail.value;
    this.products = this.dataService.getProductsList(parseInt(this.segment));
  }

  drag() {
    let distanceToScroll = 0;
    for (let index in this.data) {
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
    this.products = this.dataService.getProductsList(this.data[this.index].Id);
    this.drag();
  }

  side_open() {
    this.menuCtrl.toggle('end');
  }

  update(i) {
    this.slides.slideTo(i).then((res) => console.log('responseSlideTo', res));
  }
}
