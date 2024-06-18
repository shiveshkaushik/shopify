import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';
import { HttpClientService } from '../services/httpclient.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { changePassword } from '../config/ApiConstants';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent implements OnInit{
  changePasswordForm !: FormGroup;
  submitted: boolean = false;
  formstatus: string = '';

  constructor(private fb: FormBuilder, private customValidator: CustomValidationService, private httpService: HttpClientService,private router:Router) { };
  
  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['',Validators.required],
      newpassword: ['', Validators.required, this.customValidator.passwordValidator()],
      newcfpassword: ['', Validators.required],
    }, {
      validator: this.customValidator.MatchPassword('newpassword', 'newcfpassword')
    })

    this.changePasswordForm.statusChanges.subscribe((status) => {
      this.formstatus = status;
    })
  }

  get myFormControl() {
    return this.changePasswordForm.controls;
  }

  onSubmit()
  {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      let formValue = this.changePasswordForm.value;
      this.httpService.PostRequest(changePassword, formValue)
        .then((data: any) => {
          if (data) {
            console.log("Success-->", data);
            this.changePasswordForm.reset();
            this.submitted = false; 
            this.router.navigate(['/dashboard']);
          }
        });
    }
    else {
      return false;
    }
  }
}
