import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://660426162393662c31d0bed1.mockapi.io/api/v1/Users';
  
    constructor(private http: HttpClient) { }
  
    getUsers(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }

    createUser(user: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, user);
    }
}
