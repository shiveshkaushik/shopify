import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientService } from '../services/httpclient.service';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgMultiSelectDropDownModule,NgIf],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnChanges {
  @Input() user: any;
  @Output() cancelEdit = new EventEmitter<void>();
  dropdownList: any[] = [
    { item_id: 1, item_text: 'Dashboard' },
    { item_id: 2, item_text: 'Products' },
    { item_id: 3, item_text: 'Reports' },
    { item_id: 4, item_text: 'Purchase' },
    { item_id: 5, item_text: 'RolePermission' },
    { item_id: 6, item_text: 'UserRoles' }
  ];
  dropdownSettings: any;
  form!: FormGroup;
  selectedItems: any[] = [];

  constructor(private formBuilder: FormBuilder, private httpService: HttpClientService) {}

  ngOnInit() {
    this.initializeDropdownSettings();
  }

  ngOnChanges(changes: any) {
    if (changes['user'] && this.user) {
      this.initializeForm();
    }
  }

  initializeDropdownSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  initializeForm() {
    this.selectedItems = this.dropdownList.filter(item => this.user.roleAccess.includes(item.item_text));

    this.form = this.formBuilder.group({
      role: [this.selectedItems.map(item => item.item_text), [Validators.required]]
    });
  }

  handleButtonClick() {
    console.log('Reactive form value', this.form.value);
    this.httpService.PostRequest('/role-edit', {formdata: this.form.value,roleName: this.user.name})
      .then((data: any) => {
        if (data) {
          console.log("Success-->", data);
          this.form.reset();
          this.cancelEdit.emit();
        }
      });
  }

  cancel() {
    this.cancelEdit.emit();
  }

  onRoleSelect($event: any) {
    console.log('$event is', $event);
  }
}
