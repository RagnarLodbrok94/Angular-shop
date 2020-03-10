import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, FbCreateResponse } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable( { providedIn: 'root' } )

export class HttpService {
  constructor( private http: HttpClient ) {} 

  create( product: Product ): Observable<Product> {
    return this.http.post<Product>( `${ environment.fbDbUrl }/products.json`, product )
      .pipe( map( ( response: FbCreateResponse ) => {
        return {
          ...product,
          id: response.name,
          date: new Date( product.date )
        }
      } ) );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get( `${ environment.fbDbUrl }/products.json` )
      .pipe(
        map( ( response: { [ key: string ]: any } ) => {
          return Object
            .keys( response )
            .map( key => ( {
              ...response[ key ],
              id: key,
              date: new Date( response[ key ].date )
            } ) )
        } ) 
      );
  }

  remove( id: string ): Observable<void> {
    return this.http.delete<void>( `${ environment.fbDbUrl }/products/${ id }.json` )
  }
}