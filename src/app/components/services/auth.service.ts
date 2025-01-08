// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../model/token-api.model';
import { LoggedInUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:5037/api";
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(loginObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Authentication/Authenticate`, loginObj)
    .pipe(map((user) => {
      this.setAndReturnUser(user);
      return user;
    }),
      catchError((err) => {
        throw (err || 'Error: Invalid username and password');
      })
    );
  }

  setAndReturnUser(user: any){
    let loggedInUser = new LoggedInUser();
    loggedInUser.authdata = user.data.authdata;
    loggedInUser.identifier = user.data.identifier;
    loggedInUser.uniqueName = user.data.uniqueName;
    loggedInUser.permissions = user.data.permissions;
    loggedInUser.userType = user.data.userType;
    sessionStorage.setItem('EMSUserDetails', JSON.stringify(loggedInUser));
}   

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  signOut() {
      localStorage.clear();
      // localStorage.removeItem('token');
      this.router.navigate(['login']);
  }


}
