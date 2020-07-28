import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private headers=new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  public getCategories(){
    return this.http.get('https://frontend-hiring.appspot.com/all_categories',{headers:this.headers,params:{secret:'HelloMars'}});
  }
}
