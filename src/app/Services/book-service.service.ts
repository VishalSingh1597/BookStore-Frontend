import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private httpService:HttpServiceService , private router:Router) { }
  userdetails=JSON.parse(localStorage.getItem('userDetails')!);
  //uid = this.userdetails.userId;
  header = {
    headers:{ Authorization:"Bearer " + JSON.parse(localStorage.getItem('token')!)}
  };
  GetBooks()
  {
    
    return this.httpService.post(`${environment.baseUrl}/api/Book/GetAllBooks`,null,true,this.header);
  }
}