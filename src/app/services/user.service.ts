import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Client } from '../models/client';

const url = environment.host;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
      'Access-Control-Allow-Methods': 'Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH'
    })
  }

  headersFile = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  })

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get<User[]>(`${url}/users?limit=50&offset=0`);
  }

  getListClient() {
    return this.http.get<Client[]>(`${url}/clients`);
  }

  createUser(data: any) {
    return this.http.post(`${url}/users`, data);
  }

  createAdmin(data: any) {
    return this.http.post(`${url}/admin`, data);
  }

  editAdmin(id, data: any) {
    return this.http.patch(`${url}/admin/${id}`, data);
  }
  
  updateCompany(data: any, id) {
    return this.http.patch(`${url}/users/${id}`, data);
  }

  deleteUser(id) {
    return this.http.delete(`${url}/users/${id}`);
  }

  //Roles

  getListRol(){
    return this.http.get<Role[]>(`${url}/roles`);
  }

  getAdmin(id){
    return this.http.get<any>(`${url}/admin/${id}`);
  }
}
