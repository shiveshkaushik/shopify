import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../services/httpclient.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any | null = null;
  editingProduct: any | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  totalItems:number=0;
  perms : any;
  edit : boolean = false
  add : boolean = false
  delete: boolean = false
  view : boolean = false
  actions :boolean = false

  constructor(private router: Router,private httpService: HttpClientService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('angulartoken')
    if(token){
      this.httpService.GetRequest('/products').then((data:any)=>{
        if(data){
          this.products = data.products
          this.perms = data.perms
          this.edit = this.perms.edit
          this.view = this.perms.view
          this.add = this.perms.add
          this.delete = this.perms.delete
          if(this.view || this.edit || this.delete){
            this.actions = true
          }
          this.totalPages = Math.ceil(this.products.length / this.itemsPerPage)
          this.totalItems = this.products.length
        }
      })
    }
  }

  handleClick() {
    this.router.navigate(['/products/add']);
  }

  viewProduct(product: any) {
    this.selectedProduct = product;
  }

  editProduct(product: any) {
    this.editingProduct = { ...product };
  }

  saveEditedProduct() {
    const index = this.products.findIndex(p => p.id === this.editingProduct.id);
    if (index !== -1) {
      this.products[index] = { ...this.editingProduct };
      console.log(this.products[index])
      this.httpService.PostRequest('/products/edit',this.products[index]).then((data:any)=>{
        if(data){
          console.log(data)
        }
      })

    }
    this.closeEditModal();
  }

  deleteProduct(product: any) {
    console.log('Deleting product:', product);
    this.products = this.products.filter(p => p.id !== product.id);
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  closeModal() {
    this.selectedProduct = null;
  }

  closeEditModal() {
    this.editingProduct = null;
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }
}