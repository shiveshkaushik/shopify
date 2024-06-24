import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../services/httpclient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-info',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './admin-info.component.html',
  styleUrl: './admin-info.component.css'
})
export class AdminInfoComponent implements OnInit {
  isFormVisible = false;
  adminInfoName: String = '';
  adminInfoEmail: String = '';
  adminInfoRole: String = '';
  adminInfoImage: String = '';
  adminImageFlag : String = '';
  adminInfoForm!: FormGroup;
  submitted: boolean = false;
  file: any;

  constructor(private fb: FormBuilder, private httpService: HttpClientService, private toastr: ToastrService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('angulartoken');
    if (token) {
      this.httpService.GetRequest('/admin-info').then((data: any) => {
        if (data) {
          this.adminInfoName = data.name;
          this.adminInfoEmail = data.email;
          this.adminInfoRole = data.role;
          this.adminInfoImage = data.imageUrl;
          this.adminImageFlag = data.flag;
          console.log(this.adminInfoImage);
        }
      });
    }
  }

  showForm() {
    this.isFormVisible = true;
    this.adminInfoForm = this.fb.group({
      userImage: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.adminInfoForm.valid) {
      if (!this.file) {
        console.error('No file selected!');
        this.toastr.warning('Please select a file to upload');
        return;
      }

      const formData: FormData = new FormData();
      formData.append('userImage', this.file, this.file.name);
      console.log('Form data:', formData);
      this.httpService.PostRequest('/admin-info', formData).then((data) => {
        console.log('Success--->', data);
        this.toastr.success('Form submitted successfully');
        this.adminInfoForm.reset();
        this.submitted = false;
        this.isFormVisible = false;
      }).catch((error) => {
        console.error('Error--->', error);
        this.toastr.error('Form submission failed');
      });
    } else {
      this.toastr.warning('Please fill all required fields');
      return false;
    }
  }
}
