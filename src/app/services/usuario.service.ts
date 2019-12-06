import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // url de la api de pruebas (sin la / final)
  private url = 'https://reqres.in/api';

  constructor( private http: HttpClient ) { }


  // metodo para obtener los usuarios mediante una peticion get a una api externa
  getUsers() {
    return this.http.get(`${ this.url }/users?per_page=6`)
          .pipe(
            // Unicamente me interesa el array de usuarios ['data']
            map( resp => resp['data'])
          );

      // SI ESTA PETICION FALLA,
      // PODRIAMOS MANEJAR ESE ERROR DESDE AQUI, PERO COMO TENEMOS EFECTOS QUE LLAMAN A ESTE SERVICIO,
      // ES MEJOR CONTROLAR DICHO ERROR DESDE EL EFECTO
  }

  // metodo para obtener el usuario por su id mediante una peticion get a una api externa
  getUserById( id: string ) {
    return this.http.get(`${ this.url }/users/${ id }`)
          .pipe(
            map( resp => resp['data'])
          );
  }

}
