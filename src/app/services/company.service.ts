import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { environment } from 'src/enviroments/environment';

const url = environment.host;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

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
    return this.http.get<Company[]>(`${url}/companies`);
  }

  createCompany(data: any) {
    return this.http.post(`${url}/companies`, data);
  }

  updateCompany(data: any, id) {
    return this.http.patch(`${url}/companies/${id}`, data);
  }

  deleteCompany(id) {
    return this.http.delete(`${url}/companies/${id}`);
  }

  changeData(id) {
    return this.http.patch(`${url}/companies/desactivate/${id}`, {});
  }

  downloadfileCompany(name) {
    return this.http.get(`${url}/companies/download/${name}`, { responseType: 'blob' });
  }
}
