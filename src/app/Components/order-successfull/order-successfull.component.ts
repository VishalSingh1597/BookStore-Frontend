import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-order-successfull',
  templateUrl: './order-successfull.component.html',
  styleUrls: ['./order-successfull.component.scss']
})
export class OrderSuccessfullComponent implements OnInit {

  constructor(private home:HomeComponent,private router:Router) { }

  ngOnInit(): void {
  }

  ContinueShopping(){
    this.router.navigate(['/home']);
  }
}
