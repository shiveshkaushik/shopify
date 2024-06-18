import { Component, OnDestroy } from '@angular/core';
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
  constructor(public router: Router, private toastr: ToastrService, private httpService: HttpClientService) { }

  ngOnInit(): void {
  }
}
