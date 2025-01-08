import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, map, catchError } from "rxjs";
import { LoggedInUser } from "../model/user";

@Injectable({
  providedIn: 'root'
})

export class UserApiService {
  private baseUrl: string = "http://localhost:5037/api";

  constructor(private http: HttpClient, private router: Router) {
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/createUser`, user);
  }

}
