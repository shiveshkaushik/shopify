import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../services/httpclient.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddUserComponent implements OnInit {
  registrationForm: FormGroup;
  submitted: boolean = false;
  formstatus: string = '';
  rolesData: string[] = [];

  constructor(private fb: FormBuilder, private httpService: HttpClientService, public router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      permissions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('angulartoken');
    if (token) {
      this.httpService.GetRequest('/add-role').then((data: any) => {
        if (data) {
          this.rolesData = data.page;
          this.loadPagePermissions();
          console.log(this.rolesData);
        }
      });
    }

    this.registrationForm.statusChanges.subscribe((status) => {
      this.formstatus = status;
    });
  }

  get permissions(): FormArray {
    return this.registrationForm.get('permissions') as FormArray;
  }

  loadPagePermissions(): void {
    this.rolesData.forEach(page => {
      this.permissions.push(this.fb.group({
        page: [page],
        list: [false],
        add: [false],
        edit: [false],
        view:[false]
      }));
    });
  }

  get myFormControl() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      let formValue = this.registrationForm.value;
      console.log(formValue);
      this.httpService.PostRequest('/add-role', formValue)
        .then((data: any) => {
          if (data) {
            console.log("Success-->", data);
            this.registrationForm.reset();
            this.submitted = false;
          }
        });
    } else {
      return false;
    }
  }
}