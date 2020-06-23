import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class CentralesService {

  token:any;
  env = environment;

  headers = new HttpHeaders ({
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*' 
  })

  headerVi;
  optionsVi; 
  options = { headers: this.headers }


  constructor(private http: HttpClient) { }

  authenticate(contacto){

    const bodyT = {
      Username: this.env.username,
      Password: this.env.password
    }

    const body = new HttpParams({fromObject:bodyT}) 

    return this.http.post(`${this.env.urlAp}`, body, this.options)
    .subscribe((resp:any) => {
           this.token = resp.Token

           this.headerVi = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token,
           }

           this.optionsVi = { headers: this.headerVi }      
                      
      })
  }

  response( contacto:any ){
      contacto = JSON.stringify(contacto);
      return this.http.post(`${this.env.urlVp}`, contacto, this.optionsVi);
  }

}
