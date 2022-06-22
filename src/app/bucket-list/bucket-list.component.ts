import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';
import { UserService } from '../user-service.';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit {


  user: any;
  submitted = false;

  constructor(private userService: UserService, public auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.user;
    debugger
  }


}
