import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit() {}

  irUsuario( id: string ) {
    // Si no indicamos id, no hacemos nada
    if ( !id ) {
      return;
    }
    // Pero si indicamos usuario, navegamos al detalle de ese usuario
    this.router.navigate([ '/usuario', id ]);
  }
}
