import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { ReplaySubject } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { takeUntil, finalize } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  products: Product[] = [];
  productNew: Product = null;
  keyword: string = '';

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private productsService: HttpService
  ) { }

  ngOnInit() {
    this.productsService.getProducts()
      .pipe( takeUntil( this.destroy ) )
      .subscribe( products => {
        this.products = products;
      } )
  }

  openDialog(): void {
    let dialogRef = this.dialog.open( ProductNewComponent, {
      width: '400px'
    });
    
    dialogRef.componentInstance.onSubmit
      .pipe( takeUntil( this.destroy ) )
      .subscribe( product => {
        this.productsService.create( product )
          .pipe(
            takeUntil( this.destroy ),
            finalize( () => {
              this.snackBar.open( 'New product successfully created', null, {
                duration: 2000,
                panelClass: [ 'mat-toolbar', 'mat-primary' ]
              })
            })
          )
          .subscribe( ( product ) => this.products.push( product ) );
      });

    // dialogRef.afterClosed().subscribe(() => {
      
    // });
  }

  removeProduct( id: string ) {
    this.productsService.remove( id )
      .pipe( takeUntil( this.destroy ) )
      .subscribe( () => {
        this.products = this.products.filter( product => product.id !== id )
      } )
  }

  editProduct() {
    this.dialog.open( ProductUpdateComponent, {
      width: '400px'
    });
  }

  ngOnDestroy() {
    this.destroy.next( null );
    this.destroy.complete();
  }
}
