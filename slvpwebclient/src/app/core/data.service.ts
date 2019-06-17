import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl:string = "http://localhost:3000";
  ipfsBaseUrl:string = "http://localhost:8080/ipfs/";
 // QmPCXMZRUrU1tdrwfMKj9b8GSkRA4zPtwLAEjPgxTMVJaq

  constructor(private httpClient : HttpClient) { }

  get_customers(){
    return this.httpClient.get(this.baseUrl + '/data');
}

 get_Image(image_hash){
  return this.httpClient.get(this.ipfsBaseUrl + image_hash);
}

logout(){

}
isLoggedIn(name, pwd): any {
  const data = {
    email: name,
    password: pwd
  };
  if (name === 'pavan')
  return true;
  else
  return false;
  //return this.httpClient.post(this.baseUrl + '/data', data);
  
}
}
