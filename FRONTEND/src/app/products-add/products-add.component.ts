import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../services/httpclient.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products-add.component.html',
  styleUrl: './products-add.component.css'
})
export class ProductsAddComponent implements OnInit {
  productForm!: FormGroup;
  categories: string[] = ["Men's clothing", "Women's clothing", "Jewelry", "Electronics"];
  selectedFile: File | null = null;

  constructor(private router:Router,private httpService:HttpClientService,private fb:FormBuilder){
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    })
  }

  ngOnInit(): void {
      const token = localStorage.getItem('angulartoken')
      if(token){
        this.httpService.GetRequest('/products/add').then((data:any)=>{
          if(data){
            console.log(data)
          }
        })
      }
      else{
        this.router.navigate(['/login'])        
      }
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit(): void {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('productName', this.productForm.get('productName')?.value);
      formData.append('category', this.productForm.get('category')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('image', this.selectedFile, this.selectedFile.name);
      console.log('Form submitted', formData);
      }
    }

}
