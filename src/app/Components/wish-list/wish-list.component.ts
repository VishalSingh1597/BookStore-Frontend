import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookServiceService } from 'src/app/Services/book-service.service';
import { DataSharingServiceService } from 'src/app/Services/data-sharing.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {


  constructor(private home:HomeComponent,private bookService:BookServiceService , 
    private statusdata: DataSharingServiceService,
    private snackBar:MatSnackBar) { }

  wishList:any = [];
  check =false;
  userdetails=JSON.parse(localStorage.getItem('userDetails')!);
  ngOnInit(): void {
    this.getBooks();
    if(this.userdetails!=null)
    {
      this.check=true;
    }
    this.statusdata.currentStatus.subscribe((status:boolean) => 
    {
      if(status)
      {
        this.statusdata.changeStatus(false);
        this.getBooks();
      }
    })
  }
  changePage()
  {
    this.home.page = 'allBooks';
  }
  
  getBooks()
  {
    this.bookService.GetWishList().subscribe(
      (result:any)=>{
        this.wishList = result.data;
        console.log(this.wishList);
        
    });
  }
  RemoveFromWishList(wishListId:any)
  {
    console.log(wishListId,"wishlistid");
    this.bookService.RemoveFromWishList(wishListId).subscribe(
      (result:any)=>{
        this.snackBar.open(`Removed From WishList`, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });
        this.statusdata.changeStatus(true);
    });
    
  }
}
