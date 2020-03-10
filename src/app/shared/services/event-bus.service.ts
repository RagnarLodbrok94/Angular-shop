import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable( { providedIn: 'root' } )

export class EventBusService {
  products: Product[] = [];
  private subjectCart$ = new BehaviorSubject<Product[]>( null );
  private subjectEdit$ = new BehaviorSubject<Product>( null );

  emitProductEdit( product: Product ): void {
    this.subjectEdit$.next( product )
  }

  emitProductCart( product: Product ): void {
    this.products.push( product );
    this.subjectCart$.next( this.products );
  }

  emitId( id: string ) {
    this.products.forEach( ( product, index ) => {
      if ( product.id === id ) this.products.splice( index, 1 )
    } )
    this.subjectCart$.next( this.products );
  }

  getProductCart(): Observable<Product[]> {
    return this.subjectCart$.asObservable()
  }

  getProductEgit(): Observable<Product> {
    return this.subjectEdit$.asObservable()
  }
}