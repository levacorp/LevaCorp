import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }

  /*Obtiene el json de todos los elementos*/
  getElementos() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  /*Obtiene el json de todas las habitaciones*/
  getHabitaciones() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
<<<<<<< HEAD
  /*Obtiene el json de todos los edificios*/
  getEdificios() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

=======
  getEdificios() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
  
>>>>>>> 0a67cdafce514c5fe4fb130127806fe12a88014d
}
