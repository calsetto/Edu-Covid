import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  apiUrl = "https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest";

  constructor(private http: HttpClient) { }

  getJson(){

    return this.http.get<User[]>(this.apiUrl)
    
  }
}
