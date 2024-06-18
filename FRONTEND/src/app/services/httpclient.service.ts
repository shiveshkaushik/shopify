import { Injectable } from '@angular/core';
import { baseUrl } from "../config/ApiConstants";
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(public toastr: ToastrService,private router:Router) { }

  private getToken(): string | null {
    return localStorage.getItem('angulartoken');
  }

  private getAuthHeaders() {
    const token = this.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  PostRequest = async (endPoint: any, formValue: any) => {
    const url = `${baseUrl}${endPoint}`;
    try {
      const response = await axios.post<any>(url, formValue, this.getAuthHeaders());
      this.toastr.success('Success');
      return response.data;
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response.data || error.message;
      this.toastr.error(errorMessage, 'Error!');
    }
  }

  GetRequest = async (endPoint: any) => {
    const url = `${baseUrl}${endPoint}`;
    try {
      const response = await axios.get(url, this.getAuthHeaders());
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 403 && error.response.data.message === 'Token invalid or expired') {
        localStorage.removeItem('angulartoken');
        this.toastr.error('Token Expired. Login Again');
        this.router.navigate(['/login']);
      } else {
        const errorMessage = error.response.data || error.message;
        this.toastr.error(errorMessage, 'Error!');
      }
    }
}

LogoutRequest = async (endPoint: string, userEmail: string) => {
  const url = `${baseUrl}${endPoint}`;
  try {
    const response = await axios.post(url, { email: userEmail });
    this.toastr.success('Logout Successful');
    this.router.navigate(['/login']);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message;
    console.error(errorMessage);
    this.toastr.error(errorMessage, 'Error!');
  }
}


}
