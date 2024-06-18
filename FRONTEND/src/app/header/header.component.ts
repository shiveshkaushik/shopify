import { Component } from '@angular/core';
import { HttpClientService } from '../services/httpclient.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showNavbar : boolean = true;
  userEmail:any;
  constructor(private toastr:ToastrService,private httpService:HttpClientService){
  }

  logout() {
    localStorage.removeItem('angulartoken');
    const userEmail = localStorage.getItem('useremail');
    if (userEmail) {
      this.userEmail = (userEmail);
      localStorage.removeItem('useremail');
      this.httpService.LogoutRequest('/logout', this.userEmail).then((data: any) => {
        if (data) {
          console.log('Success', data);
        } else {
          console.log('Some error');
        }
      });
    } else {
      console.log('User email not found in local storage');
    }
  }
}
