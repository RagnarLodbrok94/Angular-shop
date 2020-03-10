import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { EventBusService } from 'src/app/shared/services/event-bus.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})

export class ProductListItemComponent {
  products: Product[];
  
  @Input() product: Product;
  @Output() onClick: EventEmitter<string> = new EventEmitter();
  @Output() onEdit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public auth: AuthService,
    private productService: EventBusService
  ) {}

  addCart( product: Product ) {
    this.productService.emitProductCart( product ); 
  }

  edit( product: Product ) {
    this.productService.emitProductEdit( product );
    this.onEdit.emit( true ); 
  }

  remove( id: string ) {
    this.onClick.emit( id );
  }
}
