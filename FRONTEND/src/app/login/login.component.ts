import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { login } from '../config/ApiConstants';
import { HttpClientService } from '../services/httpclient.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  myloginForm !: FormGroup;
  submitted: boolean = false;
  formstatus: string = '';
  token: any;

  constructor(private fb: FormBuilder, private httpService: HttpClientService, private router: Router, private toastr: ToastrService) { };
  ngOnInit() {
    this.token = localStorage.getItem('angulartoken');
    this.myloginForm = this.fb.group({
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['Admin123*', Validators.required]
    })

    this.myloginForm.statusChanges.subscribe((status) => {
      this.formstatus = status;
    })

  }

  get myFormControl() {
    return this.myloginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.myloginForm.valid) {
      let formValue = this.myloginForm.value;
      this.httpService.PostRequest(login, formValue)
        .then((data: any) => {
          if (data) {
            console.log('Success', data);
            localStorage.setItem('angulartoken', data.token);
            localStorage.setItem('useremail', data.email);
            localStorage.setItem('perms', JSON.stringify(data.permissions));
            this.myloginForm.reset();
            this.submitted = false;
            this.router.navigate(['/dashboard']);
          }
        })
    }
    else {
      return false;
    }
  }


}