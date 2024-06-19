import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientService } from '../services/httpclient.service';

@Component({
  selector: 'app-page-permissions',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './page-permissions.component.html',
  styleUrls: ['./page-permissions.component.css']
})
export class PagePermissionsComponent {
  permissionsForm !: FormGroup

  constructor(private fb: FormBuilder, private http: HttpClientService) {
  }

  onSubmit(): void {
  }
}
