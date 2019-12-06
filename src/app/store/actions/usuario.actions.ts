import { Action } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

export const CARGAR_USUARIO = '[Usuario] Cargar usuario';
export const CARGAR_USUARIO_FAIL = '[Usuario] Cargar usuario FAIL';
export const CARGAR_USUARIO_SUCCESS = '[Usuario] Cargar usuario SUCCESS';

export class CargarUsuario implements Action {
    readonly type = CARGAR_USUARIO;
    constructor( public id: string ) { } // el argumento sería el id usuario que quiero cargar
}

export class CargarUsuarioFail implements Action {
    readonly type = CARGAR_USUARIO_FAIL;
    constructor( public payload: any ) {} // Este payload será el error, se deja en any xq puede ser el codigo, la descripcion, etc
}

export class CargarUsuarioSuccess implements Action {
    readonly type = CARGAR_USUARIO_SUCCESS;
    constructor(public usuario: Usuario) { } // el argumento sería el usuario que cargó
}

export type usuarioAcciones  = CargarUsuario |
                               CargarUsuarioFail |
                               CargarUsuarioSuccess;
