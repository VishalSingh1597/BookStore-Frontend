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
}