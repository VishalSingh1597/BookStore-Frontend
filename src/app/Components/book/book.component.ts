import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/Services/book-service.service';
import { DataSharingServiceService } from 'src/app/Services/data-sharing.service';
import { GetBooksComponent } from '../get-books/get-books.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() bid:any;
  @Input() cartItems:any;
  starRating = 0; 
  bookId:any;
  CustomerFeedbackList:any;
  feedback:any;
  book:any;
  bookPresent:any;
  //checkBook:boolean;
  userdetails=JSON.parse(localStorage.getItem('userDetails')!);
  constructor(private home:HomeComponent,private snackBar:MatSnackBar,private getBook:GetBooksComponent,private bookService:BookServiceService,private router:Router,
    private statusdata: DataSharingServiceService) { }
  changePage()
  {
    this.home.page = 'allBooks';
  }
  CheckBookInCart()
  {
    console.log("check");
    this.bookPresent =  this.cartItems.find((x:any) => x.bookID == this.bid.bookId);
    if(this.bookPresent !=null)
    {
      
    }
    
  }
  Rating=3;
  reviews:any=[]
  
  outColor="#E8E8E8";
  defaultColor = "#FFF";
  ngOnInit(): void 
  {
    console.log(this.bid,"bookId in books");
    this.book = this.bid;
    this.GetFeedBack();
    console.log(this.cartItems,"cartItems");
    this.CheckBookInCart();
    this.statusdata.currentStatus.subscribe((status:boolean) => 
    {
      if(status)
      {
        this.statusdata.changeStatus(false);
        this.GetFeedBack();
        this.CheckBookInCart();
        this.getBooks();
      }
    })
  }
  
  getBooks()
  {
    this.bookService.GetBookDetails(this.bid).subscribe(
      (result:any)=>
      {
        this.book = result.data;
        console.log(this.book);
    });
  }
  AddToWishList(book:any)
  {
    if(this.userdetails == null)
    {
      this.snackBar.open(`You need to login First`, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
      this.router.navigate(['/login']);
    }
    else
    {
      console.log(book,this.userdetails.customerId,"bc");
      this.bookService.AddToWishList(book,this.userdetails.customerId).subscribe(
        (result:any)=>{
          this.snackBar.open(`${result.message}`, '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });
      });
    }
  }
AddToCart(book:any)
{
  
  if(this.userdetails == null)
  {
    this.snackBar.open(`You need to login First`, '', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
    this.router.navigate(['/login']);
  }
  else
  {
    console.log(book,this.userdetails.customerId,"bc");
    
    this.bookService.AddToCart(book,this.userdetails.customerId).subscribe(
      (result:any)=>{
        this.snackBar.open(`${result.message}`, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });
        this.statusdata.changeStatus(true);
    });
  }
  
}

  GetFeedBack()
  {
    this.bookService.GetCustomerFeedBack(this.book.bookId).subscribe((result:any)=>{
      console.log(result.data,"getCustomer");
      //console.log();
      
      this.reviews = result.data;
      console.log(this.reviews);
      this.getBook.reviewLength = this.reviews.length;
    });
    
  }
  AddCustomerFeedBack()
  {
    console.log("Feedback",this.feedback);
    console.log("rating",this.starRating);
    let param=
    {
      feedback:this.feedback,
      rating:this.starRating,
      userId:this.userdetails.customerId,
      bookId:this.book.bookId
    }
    this.bookService.AddCustomerFeedBack(param).subscribe((result:any)=>{
      console.log(result.data,"getCustomer");
      //console.log();
      
      this.reviews = result.data;
      console.log(this.reviews);
      this.statusdata.changeStatus(true);
       this.feedback="";
       this.starRating=0;
    });

  }

}
