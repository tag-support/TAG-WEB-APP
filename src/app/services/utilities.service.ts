import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  async addFormData(data, objeto) {
    for (var key in objeto) {
      if (key !== 'term') {
        data.append(key, objeto[key]);
      }
    }    
    return data;
  }

  
}
