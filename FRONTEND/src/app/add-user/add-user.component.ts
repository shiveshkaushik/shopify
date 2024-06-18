import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../services/httpclient.service';
import { registration } from "../config/ApiConstants";
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  registrationForm !: FormGroup;
  submitted: boolean = false;
  formstatus: string = '';


  constructor(private fb: FormBuilder, private customValidator: CustomValidationService, private httpService: HttpClientService) { };

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required, this.customValidator.passwordValidator()],
      cfpassword: ['', Validators.required],
    }, {
      validator: this.customValidator.MatchPassword('password', 'cfpassword')
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
      this.httpService.PostRequest(registration, formValue)
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
