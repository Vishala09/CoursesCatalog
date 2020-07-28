import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private headers=new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  public getCourses(){
    return this.http.get('https://frontend-hiring.appspot.com/all_courses',{headers:this.headers,params:{secret:'HelloMars'}});
  }
}
