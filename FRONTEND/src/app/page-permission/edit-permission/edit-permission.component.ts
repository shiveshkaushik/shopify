import { Component,OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { HttpClientService } from '../../services/httpclient.service';
import { Router } from '@angular/router';
import { FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-permission',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule],
  templateUrl: './edit-permission.component.html',
  styleUrl: './edit-permission.component.css'
})
export class EditPermissionComponent implements OnInit {

  editPermData : any;
  selectedRole: FormControl = new FormControl(''); 
  roles: any;
  tempData :any;
  constructor(private httpService:HttpClientService,private router:Router){}
  ngOnInit(): void {
    let token = localStorage.getItem('angulartoken');
    if(token){
      this.httpService.GetRequest('/page-permission/edit-permission').then((data:any)=>{
        if(data){
          this.editPermData = data.data;
          console.log(this.editPermData)
        }
      })
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  onRoleChange(): void {
    console.log('Selected Role:', this.selectedRole.value);
    const selectedRoleData = this.editPermData.find((role:any) => role.role === this.selectedRole.value);
    if (selectedRoleData) {
      this.tempData = selectedRoleData.permission;
      console.log(this.tempData);
    } else {
      this.tempData = [];
    }
  }

  
}
