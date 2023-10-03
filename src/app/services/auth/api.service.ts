import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { environment } from 'src/enviroments/environment';
import { BehaviorSubject, Observable, from, of, switchMap, tap } from 'rxjs';
import { Company } from 'src/app/models/company';
import { Role } from 'src/app/models/role';


const ACCESS_TOKEN_KEY = 'my-access-token';
const REFRESH_TOKEN_KEY = 'my-refresh-token';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  profileUser: User;;

  currentAccessToken = null;
  url = environment.host;

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    private http: HttpClient,
    private router : Router
  ) {
    this.loadToken();
  }

  async loadToken() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      this.currentAccessToken = token;
      await this.getDataProfile(token);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.url}/users/login`, data).pipe(
      switchMap(async (data: any) => {
        this.currentAccessToken = data.token;
        await this.getDataProfile(data.token);
        localStorage.setItem(ACCESS_TOKEN_KEY, this.currentAccessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, this.currentAccessToken);
        return from(Promise.all([data]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  getNewAccessToken() {
    const refreshToken = from(localStorage.getItem(REFRESH_TOKEN_KEY ));
    return refreshToken.pipe(
      switchMap(token => {
        if (token && token) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            })
          }
          return this.http.get(`${this.url}/auth/refresh`, httpOptions);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }

  logout() {
    this.profileUser = new User();
    this.currentAccessToken = null;
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }
  
  storeAccessToken(accessToken) {
    this.currentAccessToken = accessToken;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    return from(localStorage.getItem(ACCESS_TOKEN_KEY));
  }

  async getDataProfile(token: string) {
    if (typeof (token) === 'string') {
      this.profileUser = new User();
      this.profileUser.company = new Company();
      this.profileUser.roles = [];
      this.profileUser.permissions = [];

      var decodedToken = await JSON.parse(window.atob(token.split('.')[1]));
      this.profileUser.id = decodedToken.user.userId;
      this.profileUser.name = decodedToken.user.username;
      this.profileUser.dni = decodedToken.user.dni;
      this.profileUser.city = decodedToken.user.city;
      this.profileUser.address = decodedToken.user.address;      
      this.profileUser.company.id = decodedToken.company.companyId;
      this.profileUser.company.billingEmail = decodedToken.company.billingEmail;
      this.profileUser.company.nit = decodedToken.company.nit;
      this.profileUser.roles = decodedToken.roles;
      this.profileUser.permissions = decodedToken.permissions;      
      return true;
    } else {
      return false;
    }
  }
}
