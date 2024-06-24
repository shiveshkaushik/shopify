import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { My404Component } from './my404/my404.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { authloginGuard } from './authlogin.guard';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { UsersComponent } from './users/users.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { ProductsComponent } from './products/products.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { MulselectComponent } from './mulselect/mulselect.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { AddUserComponent } from './add-role/add-role.component';
import { PagePermissionsComponent } from './page-permissions/page-permissions.component';
import { EditPermissionComponent } from './page-permission/edit-permission/edit-permission.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent,
        canActivate:[authloginGuard]
    },
    {
        path:'register',
        component:RegisterComponent,
        canActivate:[authloginGuard]
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard]
    },
    {
        path:'changepassword',
        component:ChangepasswordComponent,
        canActivate:[authGuard]
    },
    {
        path:'users',
        component:UsersComponent,
        canActivate:[authGuard]
    },
    {
        path:'purchases',
        component:PurchasesComponent,
        canActivate:[authGuard]
    },
    {
        path:'products',
        component:ProductsComponent,
        canActivate:[authGuard]

    },
    {
        path:'reviews',
        component:ReviewsComponent,
        canActivate:[authGuard]
    },
    {
        path:'settings',
        component:SettingsComponent,
        canActivate:[authGuard]
    },
    {
        path:'admin-info',
        component:AdminInfoComponent,
        canActivate:[authGuard]
    },
    {
        path:'mulselect',
        component:MulselectComponent
    },
    {
        path:'user-roles',
        component:UserRolesComponent,
        canActivate:[authGuard]
    },
    {
        path:'add-role',
        component:AddUserComponent,
        canActivate:[authGuard]
    },
    {
        path:'page-permission',
        component:PagePermissionsComponent,
        canActivate:[authGuard]
    },
    {
        path:'page-permission/edit-permission',
        component:EditPermissionComponent,
        canActivate:[authGuard]
    },
    {
        path:"**",
        component:My404Component,
        canActivate:[authGuard]
    }
];
