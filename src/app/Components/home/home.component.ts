import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/Services/book-service.service';
import { DataSharingServiceService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  open=false;
  hide=true;
  page = 'allBooks';
  bookName:any;
  bid:any;
  isBadgeHidden=true;
  cartlength:any;
  CartList: any;

  userdetails=JSON.parse(localStorage.getItem('userDetails')!);
  constructor(private router:Router,private statusdata: DataSharingServiceService,private bookService:BookServiceService) { }
  ngOnInit(): void {
    console.log("ngOnint called");
    
     this.getBooks();
     this.statusdata.currentStatus.subscribe((status:boolean) => 
      {
        if(status)
        {
          this.statusdata.changeStatus(false);
          this.getBooks();
        }
      })
  }
show(){
  this.open=!this.open;
}
Logout()
{
  localStorage.removeItem('userDetails');
  localStorage.removeItem('token');
  this.router.navigate(['/home']);
  this.userdetails = null;
  this.isBadgeHidden = true;
  this.CartList = null;
}
Search()
{
  console.log(this.bookName,"home");
  if(this.bookName=="")
  {
    
      this.statusdata.changeStatus(true);
   
  }
  else{
    this.statusdata.changeSearchStatus(true);
  }
  
}
getBooks()
  {
    this.bookService.GetBooks().subscribe(
      (result:any)=>{
        this.CartList = result.data;
        this.cartlength=this.CartList.length;
        if(this.cartlength >=1)
        {
            this.isBadgeHidden=false;
            console.log("cart length:"+this.cartlength)
        }
    });
  }
}
