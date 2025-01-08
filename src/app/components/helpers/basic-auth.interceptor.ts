import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json'
            }
        });

        let sessData = JSON.parse(sessionStorage.getItem('EMSUserDetails') || '{}');
        const isLoggedIn = sessData && sessData.authdata;
        if (isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${sessData.authdata}`
                }
            });
        }

        return next.handle(request);
    }
}