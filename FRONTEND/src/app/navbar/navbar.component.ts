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
          let perms = localStorage.getItem('perms');
          if(perms){
          this.showDashboard = perms.includes('Dashboard');
          this.showProduct = perms.includes('Products');
          this.showPurchase = perms.includes('Purchase');
          this.showReport = perms.includes('Reports');
          this.showRolePermission = perms.includes('RolePermission');
          this.showUserRoles = perms.includes('UserRoles');
          }
        };
    }
  }
