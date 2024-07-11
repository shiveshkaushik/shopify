import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClientService } from '../services/httpclient.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userName: string = 'Username';
  isSidebarOpen = true;
  flag: boolean = false;
  showDashboard: boolean = false;
  showProduct: boolean = false;
  showPurchase: boolean = false;
  showReport: boolean = false;
  showRolePermission: boolean = false;
  showUserRoles: boolean = false;
  permissions: any[] = [];
  constructor(public router: Router, private toastr: ToastrService, private httpService: HttpClientService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('angulartoken');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      let perms = localStorage.getItem('perms');
      if(perms){
        this.permissions = JSON.parse(perms);
      }
      console.log("perms-->", this.permissions)
    };
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      if (this.isSidebarOpen) {
        sidebar.classList.remove('sidebar-hidden');
        sidebar.classList.add('sidebar-responsive');
      } else {
        sidebar.classList.add('sidebar-hidden');
        sidebar.classList.remove('sidebar-responsive');
      }
    }
  }
}
