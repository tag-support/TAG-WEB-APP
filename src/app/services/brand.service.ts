import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';

const url = environment.host;


@Injectable({
  providedIn: 'root'
})
export class BrandService {

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
    return this.http.get<any[]>(`${url}/brands`);
  }

  createBrand(data: any) {
    return this.http.post(`${url}/brands`, data);
  }

  createBrands(data: any) {
    return this.http.post(`${url}/brands/multiple`, data);
  }

  updateBrand(data: any, id) {
    return this.http.patch(`${url}/brands/${id}`, data);
  }

  deleteBrand(id) {
    return this.http.delete(`${url}/brands/${id}`);
  }
}
