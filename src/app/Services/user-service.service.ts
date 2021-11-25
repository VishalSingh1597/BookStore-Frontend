import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from './http-service.service';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService:HttpServiceService) { }
  header = {
    headers:{ Authorization:"Bearer " + localStorage.getItem('token')}
  };
  Register(data:any)
  {
    console.log(data);
    const params = {
      FullName: data.FullName,
      EmailId: data.EmailId,
      Password: data.Password,
      PhoneNo: data.PhoneNo
    }
    console.log(params);
    return this.httpService.post(`${environment.baseUrl}/api/Users/register`,params);
  }
  Login(data:any)
  {
    const params = {
      EmailId: data.EmailId,
      Password: data.Password,
    }
    console.log(params);
    return this.httpService.post(`${environment.baseUrl}/api/Users/login`,params);
  }
  CheckEmailExists(data:any)
  {
    return this.httpService.get(`${environment.baseUrl}/api/checkEmailExists`,null,null,this.header);
  }
  ForgotPassword(data:any){
    const email = data.email;
    console.log(email);
    return this.httpService.post(`${environment.baseUrl}/api/Users/forgetPassword?email=${email}`);
  }
  ResetPassword(data: any,formData:any){
    const params = {
     UserId: JSON.parse(data!).CustomerId,
     NewPassword: formData.password
    }
    console.log(params);
    return this.httpService.put(`${environment.baseUrl}/api/User/resetpassword`,params);
  }
  GetUserAddress(userId:any){
    return this.httpService.get(`${environment.baseUrl}/api/Address/getUserAddress?userId=${userId}`);
  }
  EditAddress(data:any, addressId: any,userId:any){
    const params = {
      AddressId: addressId,
      Address: data.address,
      City:data.city,
      State:data.state,
      Type:data.type,
      UserId:userId
    }
    console.log(params,"get address");
    return this.httpService.post(`${environment.baseUrl}/api/Address/EditAddress`,params);
  }
  EditUserDetails(data:any, userId:any){
    const params = {
      customerId:userId,
      FullName:data.FullName,
      EmailId:data.EmailId,
      PhoneNo:data.PhoneNo,
      Password:data.Password
    }
    return this.httpService.post(`${environment.baseUrl}/api/User/EditUserDetails`,params);
  }
  addAddress(data:any, userId:any){
    const params = {
      Address: data.address,
      City:data.city,
      State:data.state,
      Type:data.type,
      UserId:userId
    }
    return this.httpService.post(`${environment.baseUrl}/api/Address/AddUserAddress`,params);
  }
}