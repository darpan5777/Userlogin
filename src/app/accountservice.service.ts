import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AccountserviceService {

  
  constructor(private http:HttpClient) { }

  getAll() {
      return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }
}