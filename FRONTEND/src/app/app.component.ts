import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { LinkTrackerService } from './services/link-tracker.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,ReactiveFormsModule,NavbarComponent,MatSidenavModule,MatToolbarModule,MatMenuModule,MatIconModule,MatDividerModule,MatListModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Team';
  showNavbar: boolean = false;

  constructor(private linkTrackerService: LinkTrackerService) {}

  ngOnInit(): void {
    this.linkTrackerService.getVisitedLinks().subscribe(link => {
      if (link.includes('/login')  || link.includes('/register')) {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
    });
  }

}
