import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/Services/book-service.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {

  constructor(
    private home:HomeComponent,
    private bookService:BookServiceService,
    private router:Router,
  ) { }
  CartList:any = [];
  order:any=[];

  ngOnInit(): void {
    this.getBooks();
  }

  changePage()
  {
    this.home.page = 'allBooks';
  }
  getBooks()
  {
    this.bookService.GetOrderItem().subscribe(
      (result:any)=>{
        console.log(result.data);
        this.order=result.data;
    });
  }
}
