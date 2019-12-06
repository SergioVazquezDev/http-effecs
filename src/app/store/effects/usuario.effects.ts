import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as usuarioActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        public usuariosService: UsuarioService
    ) {}

    @Effect()
    cargarUsuario$ = this.actions$
    .pipe(ofType( usuarioActions.CARGAR_USUARIO ),
        switchMap(action => { // podriamos tiparlo tambien > (action: usuarioActions.CargarUsuario)[así nos saldría action.id]
                const id = action['id']; // si no lo tipamos, en la accion vendrá el id en [id]
                return this.usuariosService.getUserById(id) // lanzaremos el metodo del servicio de buscar por id
                    .pipe(
                        map( user => new usuarioActions.CargarUsuarioSuccess(user)), // Accion OK
                        catchError( error => of(new usuarioActions.CargarUsuarioFail(error))) // Accion Error
                    );
            })
        );
}
