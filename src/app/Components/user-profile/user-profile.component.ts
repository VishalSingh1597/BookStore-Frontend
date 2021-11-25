import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingServiceService } from 'src/app/Services/data-sharing.service';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDisable = true;
  addressDisable = true;
  userdetails:any;
  index:any;
  addressdetails:any;
  uniqueAddress:any;
  updateAddress:any=[];
  data:any = [];
  userData:any = [];
  OpenAddressForm=false;
  openAddressDetail=false;
  

  constructor(
    private userService: UserServiceService,
    private home: HomeComponent,
    private snackBar: MatSnackBar,
    private statusdata: DataSharingServiceService
  ) { }

  ngOnInit(): void {
    var user=JSON.parse(localStorage.getItem('userDetails')!);
    this.userdetails=user;
    this.userData=this.userdetails;
    console.log(this.userData);
    this.getAddress();
    this.statusdata.currentStatus.subscribe((status:boolean) => 
    {
      if(status)
      {
        this.statusdata.changeStatus(false);
        this.getAddress();
      }
    })
  }

  getAddress()
  {
    this.userService.GetUserAddress(this.userdetails.customerId)
    .subscribe((result:any)=>{
      console.log(result);
      this.data=result.data;
    });
  }
  changePage()
  {
    this.home.page = 'allBooks';
  }

  EditUser()
  {
    console.log(this.userData,"helo");
    var update=this.userData
    this.userService.EditUserDetails(this.userData, this.userdetails.customerId)
    .subscribe((result:any)=>{
      console.log(result);
      console.log(this.userData,"USer");
      localStorage.setItem('userDetails',JSON.stringify(update));
      this.snackBar.open(`${result.message}`, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
      this.statusdata.changeStatus(true);
    },error => {  
      this.snackBar.open(`${error.error.message}`, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    })
  }
  
  EditAddress(){
    this.userService.EditAddress(this.uniqueAddress, this.uniqueAddress.addressId,this.userdetails.customerId)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
      this.statusdata.changeStatus(true);

    },error => {  
      this.snackBar.open(`${error.error.message}`, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    })
  }
  showAddressDetails(address:any,i:any)
  {
    this.index=i;
    this.uniqueAddress=address;
    this.openAddressDetail=!this.openAddressDetail
  }

  Cancel(){
    this.data = this.addressdetails;
    this.openAddressDetail=!this.openAddressDetail;
    this.statusdata.changeStatus(true);
  }
  Close(){
    this.OpenAddressForm=false;
    this.statusdata.changeStatus(true);
  }


  AddAddress(){
    console.log(this.updateAddress);
    this.userService.addAddress(this.updateAddress,this.userdetails.customerId)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
      this.statusdata.changeStatus(true);

    },error => {  
      this.snackBar.open(`${error.error.message}`, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    })
  }
}