import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientService } from '../services/httpclient.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mulselect',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgMultiSelectDropDownModule],
  templateUrl: './mulselect.component.html',
  styleUrls: ['./mulselect.component.css']
})
export class MulselectComponent implements OnInit {
  dropdownList: any[] = [
    { item_id: 1, item_text: 'Apple', group: 'F' },
    { item_id: 2, item_text: 'Orange', group: 'F' },
    { item_id: 3, item_text: 'Potatoes', group: 'V' },
    { item_id: 4, item_text: 'Cabbage', group: 'V' },
    { item_id: 5, item_text: 'Cauliflower', group: 'V' }
  ];
  dropdownSettings: any;
  form!: FormGroup;
  containToken : boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClientService, private router: Router,public toastr: ToastrService) { }

  ngOnInit() {
    const token = localStorage.getItem('angulartoken');
    if (token) {
      this.containToken = true;
      this.form = this.formBuilder.group({
        grocery: [[{ item_id: 3, item_text: 'Potatoes', group: 'V' }], [Validators.required]]
      });
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All'
      };
    } else {
      this.toastr.error('Login expired');
      this.router.navigate(['/login']);
    }
    }

  handleButtonClick() {
    console.log('reactive form value', this.form.value);
  }

  onItemSelect($event: any) {
    console.log('$event is', $event);
  }

  getData()
  {
    this.router.navigate(['/names'])
  }
}