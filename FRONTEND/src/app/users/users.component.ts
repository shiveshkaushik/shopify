import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientService } from '../services/httpclient.service';
import { NgFor,NgIf } from '@angular/common';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor,NgIf,UserEditComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  userData:any;
  users:any;
  superControl : boolean = false;
  constructor(public router: Router, private toastr: ToastrService, private httpService: HttpClientService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('angulartoken');
    if (token) {
      this.httpService.GetRequest('/users')
        .then((data: any) => {
          if (data) {
            console.log('Success', data);
            this.userData = data;
            this.users = data.admins;
            this.superControl = data.control;
          }
        });
    }
    else {
      return;
    }

  }
  selectedUser: any;
  showEditModal(user: any) {
    this.selectedUser = user;
  }
}
