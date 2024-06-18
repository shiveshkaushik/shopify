import { Component} from '@angular/core';
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
  perms: string[] = [];
  flag : boolean = false;
  showDashboard : boolean = false;
  showProduct : boolean = false;
  showPurchase : boolean = false;
  showReport : boolean = false;
  showRolePermission : boolean = false;
  showUserRoles : boolean = false;

  constructor(public router: Router, private toastr: ToastrService, private httpService: HttpClientService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('angulartoken');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.httpService.GetRequest('/navbar-permission').then((data: any) => {
        if (data) {
          console.log('Success', data);
          this.perms = data.access || [];
          this.flag = data.control;
          console.log(this.flag);
          this.showDashboard = this.perms.includes('Dashboard');
          this.showProduct = this.perms.includes('Products');
          this.showPurchase = this.perms.includes('Purchase');
          this.showReport = this.perms.includes('Reports');
          this.showRolePermission = this.perms.includes('RolePermission');
          this.showUserRoles = this.perms.includes('UserRoles');
        }
      });
    }
  }
}
