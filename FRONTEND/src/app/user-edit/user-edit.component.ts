import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientService } from '../services/httpclient.service';


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule,NgMultiSelectDropDownModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit{
  @Input() user: any;
  dropdownList: any[] = [
    { item_id: 1, item_text: 'Product' },
    { item_id: 2, item_text: 'Users' },
    { item_id: 3, item_text: 'Purchase' },
    { item_id: 4, item_text: 'Reports' }
  ];
  dropdownSettings: any;
  form!: FormGroup;
  actions : String[] = [];
  myselectedItems : string[] = [];

  constructor(private formBuilder: FormBuilder,private httpService : HttpClientService) { }

  ngOnInit() {
    this.actions = this.user.roleAccess;
    for(let x of this.dropdownList){
      let res = this.actions.includes(x.item_text);
      if(res)
        {
          this.myselectedItems.push(x.item_text);
        }
    }
    this.form = this.formBuilder.group({
      role: [this.myselectedItems, [Validators.required]]
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };

  }

  handleButtonClick() {
    console.log('reactive form value', this.form.value);
    let formValue = this.form.value;
      this.httpService.PostRequest('/user-edit', {formdata :this.form.value,userEmail : this.user.email})
        .then((data: any) => {
          if (data) {
            console.log("Success-->", data);
            this.form.reset();
          }
  })
}

  onRoleSelect($event: any) {
    console.log('$event is', $event);
  }

}
