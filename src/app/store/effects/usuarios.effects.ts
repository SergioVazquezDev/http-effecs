import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as usuariosActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

// Los effectos no son más que un servicio de Angular. Su objetivo principal es escuchar acciones que se lanzan en el store

@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions, // $ indica que es un observable
        public usuariosService: UsuarioService // importamos el servicio que hará la peticion http
    ) {}

    // El efecto llama al servicio y dependiendo de la resuesta, llamará a la accion de Success o Fail
    @Effect() // Añadimos el decorador effects
    cargarUsuarios$ = this.actions$
        .pipe(ofType( usuariosActions.CARGAR_USUARIOS ), // estoy pendiente de este tipo de Accion en particular
            switchMap( () => { // el switchMap recibe un observable, lo cancela y regresa otro observable
                // cuando se dispere esta accion, haremos lo que esté aqui dentro
                return this.usuariosService.getUsers()  // Hacemos una peticion http que obtendrá los usuarios
                    .pipe(
                        // en este punto, si todo salio bien, tendremos los usuarios (usamos map)
                        // lanzamos esta Accion si el effecto devuelve un ok
                        map( users => new usuariosActions.CargarUsuariosSuccess(users) ),
                        // controlamos el posible error con catchError de Rxjs
                        // lanzamos esta Accion si el effecto devuelve un error.
                        // Of ya que retornamos un observable y como payload pasamos el error
                        catchError( error => of(new usuariosActions.CargarUsuariosFail(error)))
                    );
            })
        );
}
