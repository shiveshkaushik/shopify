import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientService } from '../services/httpclient.service';
import { NgFor, NgIf } from '@angular/common';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgIf, UserEditComponent,RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  userData: any;
  users: any;
  superControl: boolean = false;
  selectedUser: any;

  constructor(public router: Router, private toastr: ToastrService, private httpService: HttpClientService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('angulartoken');
    if (token) {
      this.httpService.GetRequest('/role-permissions')
        .then((data: any) => {
          if (data) {
            console.log('Success', data);
            this.userData = data;
            this.users = data.permissions;
            this.superControl = data.control;
          }
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  showEditModal(user: any) {
    this.selectedUser = user;
  }

  cancelEdit() {
    this.selectedUser = null;
  }

  onDeleteUser(user: any) {
  }
}
