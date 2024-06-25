import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientService } from '../services/httpclient.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-permissions',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,NgIf,RouterModule,FormsModule],
  templateUrl: './page-permissions.component.html',
  styleUrls: ['./page-permissions.component.css']
})
export class PagePermissionsComponent implements OnInit{
  permissionData : any;
  addPerm : boolean = false;
  editPerm : boolean = false;
  superControl : boolean = false;


  constructor(private fb: FormBuilder, private httpService: HttpClientService,public router:Router) {
  }
  ngOnInit(): void {
    const token = localStorage.getItem('angulartoken');
    if (token) 
      {
      this.httpService.GetRequest('/page-permission').then((data:any)=>{
        if(data){
          this.permissionData = data.data;
          this.superControl = data.scontrol;
          if(!this.superControl)
            {
              this.addPerm = data.add.status;
              this.editPerm = data.edit.status;
            }
        }
          
      })

    } else {
      this.router.navigate(['/login']);
    }
    
  }

  handleClick(){
    this.router.navigate(['/page-permission/edit-permission'])
  }


  onSubmit(): void {
    this.permissionData.forEach((role:any) => {
      if (role.editMode) {
        console.log('Saving changes for role:', role.role);
        console.log('Permissions:', role.permission);
        role.editMode = false;
        this.httpService.PostRequest('/page-permission',{name:role.role,data:role.permission}).then((data:any)=>{
          if(data){
            console.log(data);
          }
        })
      }
    });
  }

  toggleEdit(role: any,event:Event) {
    event.preventDefault();
    role.editMode = !role.editMode;
  }

  deleteRole(role:any){
    this.httpService.PostRequest('/page-permission/delete',{role:role}).then((data:any)=>{
      if(data){
        console.log(data);
      }
    })
  }
}
