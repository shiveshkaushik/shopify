import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientService } from '../services/httpclient.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css'
})
export class UserRolesComponent implements OnInit {
  userData: any;
  users: any;
  superControl: boolean = false;
  editRoleForm: FormGroup;
  selectedUser: any;
  roles : any;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private httpService: HttpClientService,
    private formBuilder: FormBuilder
  ) {
    this.editRoleForm = this.formBuilder.group({
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('angulartoken');
    if (token) {
      this.httpService.GetRequest('/user-roles')
        .then((data: any) => {
          if (data) {
            console.log('Success', data);
            this.userData = data;
            this.users = data.admins;
            this.superControl = data.control;
            this.roles = data.roles;
          }
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  showEditModal(user: any) {
    this.selectedUser = user;
    this.editRoleForm.patchValue({ role: user.role });
  }

  onSubmit() {
    if (this.editRoleForm.valid) {
      const updatedUser = { ...this.selectedUser, role: this.editRoleForm.value.role };
      const dataPack = {email:updatedUser.email,role:updatedUser.role};
      this.httpService.PostRequest('/user-roles',dataPack);
      console.log('Updated User:', updatedUser);
      this.toastr.success('Role updated successfully!');
      this.selectedUser = null;
    }
  }

  cancelEdit() {
    this.selectedUser = null;
  }

  onDeleteUser(x : any){

  }
}
