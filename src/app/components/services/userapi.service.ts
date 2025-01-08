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
    return this.http.post<any>(`${this.baseUrl}/User/CreateUser`, user);
  }
  getUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/User/GetUser`);
  }
  getRoles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/User/GetAllRoles`);
  }
  addRoleToUser(userRole: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/User/AddUserRoleMapping`, userRole);
  }
  getPermissionOfRoles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/User/GetAllPermissionsByRoleId`);
  }
  createEmployee(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Employee/AddUpdateEmployee`, user);
  }
}
