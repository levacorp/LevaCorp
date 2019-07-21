import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RaspberryService {
  private url: string;
  constructor(private http: HttpClient, url) {
    this.url = url;
   }


}
