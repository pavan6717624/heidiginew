import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  editAddress(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/Heidigi/editAddress',formData);
  }
  downloadImage(formData:FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/Heidigi/downloadImage',formData);
  }

  constructor(private http: HttpClient) { }
  getImages()
  {
    return this.http.get('https://takeoff-pavan.herokuapp.com/Heidigi/getImages');
  }

  getProfile()
  {
    return this.http.get('https://takeoff-pavan.herokuapp.com/Heidigi/getProfile');
  }
}
