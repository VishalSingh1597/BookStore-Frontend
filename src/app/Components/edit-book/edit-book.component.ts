import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookServiceService } from 'src/app/Services/book-service.service';
import { DataSharingServiceService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditBookComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
  private bookService:BookServiceService, public snackBar:MatSnackBar,private statusdata: DataSharingServiceService) { }
  EditBookForm !: FormGroup
  imageSrc=this.data.image;

  ngOnInit(): void {
    console.log(this.data);
    
  }
  Close()
  {
    this.dialogRef.close();
  }
  Save()
  {
    this.data.image=this.imageSrc;
    this.bookService.UpdateBook(this.data)
    .subscribe((result:any)=>{
      this.snackBar.open(`${result.message}`, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
        this.statusdata.changeStatus(true);
      this.dialogRef.close();
    },error => {  
      this.snackBar.open(`${error.error.message}`, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    })
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

}