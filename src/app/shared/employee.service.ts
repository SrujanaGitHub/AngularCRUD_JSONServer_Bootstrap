import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
      postEmployee(data:any){
        return this.http.post<any>("http://localhost:3000/posts",data)
        .pipe(map((res:any)=>{return res;}))
      }

      getEmployee(){
        return this.http.get<any>("http://localhost:3000/posts")
        .pipe(map((res:any)=>{return res;}))
      }

      putEmployee(data:any,empId:any){
        return this.http.put<any>("http://localhost:3000/posts/"+empId,data)
        .pipe(map((res:any)=>{return res;}))
      }

      deleteEmployee(empId:any){
        return this.http.delete<any>("http://localhost:3000/posts/"+empId)
        .pipe(map((res:any)=>{return res;}))
      }
}
