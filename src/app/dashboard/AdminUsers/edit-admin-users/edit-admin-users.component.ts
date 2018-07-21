import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-edit-admin-users',
  templateUrl: './edit-admin-users.component.html',
  styleUrls: ['./edit-admin-users.component.css']
})

export class EditAdminUsersComponent implements OnInit {

  adminId:any;
  adminUserData:any;
  editadminUsersForm:FormGroup;
  disableEdit:boolean = false;
  authorDataArray: any;
  loader : boolean = false;
  saveClicked:boolean =false;
  
  constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((params: Params) => {
      this.adminId = params['id'];
      this.getAdminUserById(this.adminId); 
      // this.formInitialization();
    });
  }

  formInitialization(){
    this.editadminUsersForm = this.fb.group({
      // author_id:['',[]],
      first_name:[this.adminUserData.first_name,[]],
      last_name:[this.adminUserData.last_name,[]],
      email:[this.adminUserData.email,[Validators.required]],
      username:[this.adminUserData.username,[Validators.required]],
      is_active:[parseInt(this.adminUserData.is_active),[Validators.required]],
      id:[this.adminUserData.id,[Validators.required]],
      token:[this.global_service.userInfo.token,[]]
    })

  }

  /*Get Admin User by Id*/
  getAdminUserById(id){

    let obj = {token:this.global_service.userInfo.token,id:id}  
    const url = this.global_service.basePath + 'admin/admin-users/edit';
    this.loader = true;
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      this.adminUserData = res[0].json.json().object[0];
      if (res[0].json.json().error && res[0].json.json().error.object) {
        this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
      }
      else{
        this.formInitialization();
        this.disableEdit = true;
      }
    }, 
    err => {
      this.global_service.consoleFun(err);
    })
  }

  /*Update Admin User By Id*/
  updateAdminUser(){
    if(this.global_service.isFormValid(this.editadminUsersForm)) {
      this.saveClicked=true;
      const url = this.global_service.basePath + 'admin/admin-users/update';
  
      this.global_service.PostRequest(url,this.editadminUsersForm.value)
      .subscribe(res => {
        this.global_service.consoleFun(res[0].json.json());
        if (res[0].json.json().object.object) {
           this.global_service.showNotification('top','right',res[0].json.json().object.object,4,'ti-cross');
          }
          else{
            if (this.global_service.userInfo.id == this.adminId) { 
               this.global_service.userInfo.username = this.editadminUsersForm.controls.username.value;
               // localStorage.setItem('userInfo',this.global_service.userInfo[0]);
            } 
            this.disableEdit = true;
            this.global_service.showNotification('top','right',"Updated Successfully",2,'ti-check');
            this.router.navigateByUrl("dashboard/view-admin-User");
            this.editadminUsersForm.reset();
          }
      }, 
      err => {
        // this.loader = false;
        this.global_service.consoleFun(err);
      })
    } 
    else {
      this.loader = true;
      this.global_service.scrollBar();
    }
   } 

}
