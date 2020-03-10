import { Component, OnInit, ViewChild } from '@angular/core';
import { EventBusService } from 'src/app/shared/services/event-bus.service';
import { Product } from 'src/app/shared/models/product.model';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = [ 'image', 'name', 'price', 'control'];
  @ViewChild( MatTable, { static: false } ) table: MatTable<any>;

  constructor(
    private productService: EventBusService
  ) {}

  ngOnInit() {
    this.productService.getProductCart().subscribe( response => {
      if( response ) this.products = response 
    } );
  }

  getTotalPrice() {
    if ( this.products !== null ) {
      return this.products
        .map( product => Number( product.price ) )
        .reduce( ( acc, value ) => acc + value, 0 );
    }
  }

  remove( id: string ) {
    this.productService.emitId( id );
    this.table.renderRows();
  }
}
