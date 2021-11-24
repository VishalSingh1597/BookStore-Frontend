import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookServiceService } from 'src/app/Services/book-service.service';
import { DataSharingServiceService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  AddBookForm !:FormGroup
  constructor(public dialogRef: MatDialogRef<AddBookComponent>,private bookService:BookServiceService,private statusdata: DataSharingServiceService) { }
  data:any;
  imageSrc:string | undefined;
  ngOnInit(): void {
    this.AddBookForm = new FormGroup({
      Title: new FormControl(),
      Description:new FormControl(),
      Author:new FormControl(),
      Price:new FormControl(),
      OriginalPrice:new FormControl(),
      BookCount:new FormControl()
    });
  }
  Close()
  {
    this.dialogRef.close();
  }
  
  onFileChanged(event: any)
  {
    var files: File=event.target.files.item(0);
      console.log(event.target.files.item(0));
      const form = new FormData();
      form.append('image',files,files.name);
      console.log(form);
      console.log(this.imageSrc,"src");
      
      this.bookService.addImage(form).subscribe((result:any)=>{
        this.imageSrc=result.data;
        this.statusdata.changeStatus(true);
        console.log(result);
      });
  }
  AddBook()
  {
    console.log(this.AddBookForm.value);
    this.bookService.addBook(this.AddBookForm.value,this.imageSrc).subscribe(
      (result:any)=>
      {
        this.AddBookForm.reset();
        this.imageSrc="";
        this.dialogRef.close();
        this.statusdata.changeStatus(true);
      });
  }
}