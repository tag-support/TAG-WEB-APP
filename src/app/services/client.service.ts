import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { environment } from 'src/enviroments/environment';

const url = environment.host;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

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
    return this.http.get<Client[]>(`${url}/clients`);
  }

  createClient(data: any) {
    return this.http.post(`${url}/clients`, data);
  }

  updateClient(data: any, id) {
    return this.http.patch(`${url}/clients/update/${id}`, data);
  }

  deleteClient(id) {
    return this.http.delete(`${url}/clients/${id}`);
  }
}
