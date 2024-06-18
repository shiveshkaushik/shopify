import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../services/httpclient.service';
import { registration } from "../config/ApiConstants";
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddUserComponent implements OnInit {
  registrationForm !: FormGroup;
  submitted: boolean = false;
  formstatus: string = '';


  constructor(private fb: FormBuilder, private customValidator: CustomValidationService, private httpService: HttpClientService,public router:Router) { };

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
    })

    this.registrationForm.statusChanges.subscribe((status) => {
      this.formstatus = status;
    })


  }

  get myFormControl() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      let formValue = this.registrationForm.value;
      this.httpService.PostRequest('/add-role', formValue)
        .then((data: any) => {
          if (data) {
            console.log("Success-->", data);
            this.registrationForm.reset();
            this.submitted = false; 
          }
        });
    }
    else {
      return false;
    }
  }
}
