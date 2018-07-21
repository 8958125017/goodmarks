import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-add-admin-users',
  templateUrl: './add-admin-users.component.html',
  styleUrls: ['./add-admin-users.component.css']
})

export class AddAdminUsersComponent implements OnInit {
 
  adminUserData:any;
  addadminUsersForm:FormGroup;
  authorDataArray: any;
  loader: boolean =false;
  saveClicked:boolean =false;

  constructor(public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { 
  }

  ngOnInit() {
    this.formInitialization();
  }

  formInitialization(){
    this.addadminUsersForm = this.fb.group({
      first_name:[,[]],
      last_name:[,[]],
      email:[,[Validators.required]],
      password:[,[Validators.required]],
      username:[,[Validators.required]],
      is_active:[,[Validators.required]],
      token:[this.global_service.userInfo.token,[]]
    })

  }

  addAdminUser() {
      if(this.addadminUsersForm.valid) {
        this.saveClicked=true;
         const url = this.global_service.basePath + 'admin/admin-users/add';
          this.global_service.PostRequest(url,this.addadminUsersForm.value)
            .subscribe(res => {
              this.global_service.consoleFun(res[0].json.json());
              if (res[0].json.json().error && res[0].json.json().error.object) {
               this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross'); 
              }
              else{
                this.formInitialization();
                this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
                this.router.navigateByUrl("dashboard/view-admin-User");
                this.loader = false;
              }
              window.scrollTo(0,0);
            }, 
            err => {
              this.global_service.consoleFun(err);
            },
            () =>{
            })
      }
      else {
        this.loader =true;
        this.global_service.scrollBar();
      }
   }

}
