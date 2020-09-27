/**
 * PunnuMistri - E-commerce app starter Ionic 4( )
 *
 * Copyright © 2018-present PunnuMistri. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../data.service';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  inputs: ['product', 'bool']
})
export class ReviewComponent implements OnInit {

  @Input() product: Product;
  @Input() bool: boolean;

  constructor(private fun: FunctionsService) { }

  ngOnInit() {
  }

}
