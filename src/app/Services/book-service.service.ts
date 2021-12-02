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
  uid = parseInt(localStorage.getItem("userId")!)
  // header = {
  //   headers:{ Authorization:"Bearer " + JSON.parse(localStorage.getItem('token')!)}
  // };
  header = {
    headers:{ Authorization:"Bearer " + localStorage.getItem('token')}
  };
  GetBooks()
  {
    
    return this.httpService.post(`${environment.baseUrl}/api/Book/GetAllBooks`,null,true,this.header);
  }
  GetWishList()
  {
    return this.httpService.get(`${environment.baseUrl}/api/WishList/getwishlist?userId=5`,null,true,this.header);
  }
  GetCartItem()
  {
   
    return this.httpService.get(`${environment.baseUrl}/api/Cart/GetCartItem?userId=5`,null,true,this.header);
  }
  GetBookDetails(id:any)
  {
    return this.httpService.get(`${environment.baseUrl}/api/Book/GetBookDetail?bookId=${id}`,true,this.header);
  }
  AddToWishList(book:any,uid:any)
  {
    const params ={
      BookId:book.bookId,
      UserId:5
    }
  console.log("params",params);
  
    return this.httpService.post(`${environment.baseUrl}/api/WishList/AddToWishList`,params,true,this.header);
  }
  AddToCart(book:any,uid:any)
  {
    const params={
      BookID:book.bookId,
      UserId:5,
      BookOrderCount:1,

    }
    console.log("wishlist:"+params);
    return this.httpService.post(`${environment.baseUrl}/api/Cart/AddToCart`,params,true,this.header);
  }
  RemoveFromWishList(wishListId:any)
  {
    console.log(wishListId,"remove from wishlist");
    
    return this.httpService.delete(`${environment.baseUrl}/api/WishList/RemoveFromWishList?wishListId=${wishListId}`,null,true,this.header);
  }
  RemoveCartItem(cartId:any)
  {
    return this.httpService.delete(`${environment.baseUrl}/api/Cart/RemoveFromCart?cartId=${cartId}`,null,true,this.header);
  }
  UpdateOrderCount(type:any,id:any)
  {
    const params={
      CartID:id,
      type:type
    }
    console.log(params);
    
    return this.httpService.put(`${environment.baseUrl}/api/Cart/UpadetOrderCount`,params,true,this.header);
  }
  PlaceOrder(CartList:any)
  {
    return this.httpService.post(`${environment.baseUrl}/api/Order/PlaceOrders`,CartList,true,this.header);
  }
  GetCustomerFeedBack(bookId:any)
  {
    return this.httpService.post(`${environment.baseUrl}/api/Book/GetFeedback?bookid=${bookId}`);
  }
  AddCustomerFeedBack(param:any)
  {
    return this.httpService.post(`${environment.baseUrl}/api/Book/AddCustomerFeedBack`,param,true,this.header);
  }
  GetOrderItem(){
    return this.httpService.get(`${environment.baseUrl}/api/Order/getorderlist?userId=${this.userdetails==null?null:this.userdetails.customerId}`);
  }
  UpdateBook(data:any){
    const params = {
      BookId: Number(data.bookId),
      BookName: data.bookName,
      AuthorName: data.authorName,
      Price: Number(data.price),
      BookDescription: data.bookDescription,
      BookCount: Number(data.bookCount),
      OriginalPrice: Number(data.originalPrice),
      Image:data.image,
      Rating: Number(data.rating)
    }
    return this.httpService.put(`${environment.baseUrl}/api/Book/UpdateBook`,params,true,this.header);
  }

  addBook(data:any,image:any)
  {
    const params={
      BookName : data.Title,
      BookDescription : data.Description,
      AuthorName : data.Author,
      Price : Number(data.Price),
      BookCount : Number(data.BookCount),
      OriginalPrice : Number(data.OriginalPrice),
      Rating:3,
      Image:image
    }
    console.log(params);
    return this.httpService.post(`${environment.baseUrl}/api/Book/AddBook`,params,true,this.header);
  }

  addImage(file:any)
  {
    return this.httpService.put(`${environment.baseUrl}/api/Book/AddImage`,file,true,this.header);
  }
}