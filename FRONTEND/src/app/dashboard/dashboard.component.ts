import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientService } from '../services/httpclient.service';
import { dashboard } from '../config/ApiConstants';
import { NgFor } from '@angular/common';
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  visibleLogs = [];
  showMore = false;

  dashboardData: any[] | undefined; 
  userEmail: any;
  userName: string = 'Username';
  initialItemsToShow = 5;
  showAll = false;
  constructor(public router: Router, private toastr: ToastrService, private httpService: HttpClientService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('angulartoken');
    if (token) {
      this.httpService.GetRequest(dashboard)
        .then((data: any) => {
          if (data) {
            console.log('Success', data);
            this.dashboardData = data.logs;
            this.dashboardData?.reverse();
            this.userName = data.name;
          }
        });
    }
    else {
      return;
    }


  }

  convertDate(timestampMilliseconds: any) {
    const date = new Date(timestampMilliseconds);
    const formattedDate = `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())}`;
    const formattedTime = `${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}:${this.padZero(date.getSeconds())}`;
    return { date: formattedDate, time: formattedTime }
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

}
