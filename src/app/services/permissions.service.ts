import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { Permissions } from '../models/permissions';

const url = environment.host;

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

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
    return this.http.get<Permissions[]>(`${url}/permissions`);
  }

  createCompany(data: any) {
    return this.http.post(`${url}/permissions`, data);
  }

  updateCompany(data: any, id) {
    return this.http.patch(`${url}/permissions/${id}`, data);
  }

  deleteCompany(id) {
    return this.http.delete(`${url}/permissions/${id}`);
  }
}
