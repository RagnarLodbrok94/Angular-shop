import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { EventBusService } from '../shared/services/event-bus.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  quantity: number = 0;

  constructor(
    private router: Router,
    public auth: AuthService,
    private productService: EventBusService
  ) { }

  ngOnInit() {
    this.productService.getProductCart().subscribe( response => {
      if( response !== null ) this.quantity = response.length
    } )
    
  }

  logout( event: Event ) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate( [ '/auth', 'login' ] );
  }
}
