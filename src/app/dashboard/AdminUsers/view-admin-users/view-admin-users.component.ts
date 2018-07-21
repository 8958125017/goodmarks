import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from './../../../GlobalService';


@Component({
  selector: 'app-view-admin-users',
  templateUrl: './view-admin-users.component.html',
  styleUrls: ['./view-admin-users.component.css']
})
export class ViewAdminUsersComponent implements OnInit {
  
  loader:boolean =false;
  adminUsersList: any;
  value = 1;
  isDataFound : boolean = false;
  username: any;
  indexValue: number = 1;

  constructor(public global_service: GlobalService,public router: Router) {}

  ngOnInit() {
    this.getAdminList(this.value);
  }

// Get Admin User List based on page number
  getAdminList(value) {
    this.loader = true;
    let obj = {page_number:value,token:this.global_service.userInfo.token}
    
    const url = this.global_service.basePath + 'admin/admin-users/list';
    
    this.global_service.PostRequest(url,obj).subscribe(res => {
      if(res[0].json.json().object.result.count === 0)
      {
        this.isDataFound = false;
      }
      else{
        this.isDataFound = true;
        this.adminUsersList = res[0].json.json().object;
      }
      this.loader = false;
    }, err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }

  // Delete Admin User
  deleteEditAdminUserById(id){

    this.loader = true;
    let obj = {id:id,token:this.global_service.userInfo.token}
    
    const url = this.global_service.basePath + 'admin/skills/users/delete';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      this.global_service.consoleFun(res[0].json.json());
      this.getAdminList(this.value);
    }, 
    err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }
  
  paginate(event){
    this.value = event.page + 1;
    if (event.page > 0) { 
      this.indexValue = 10 * event.page +1; 
    }
    else{
        this.indexValue = 1;
    }

    this.getAdminList(this.value);
  }

  gotoEditAdminUserById(id){
    this.router.navigateByUrl("dashboard/edit-admin-User/" + id);
  }

  gotoAddAdminUser(){
    this.router.navigateByUrl("dashboard/add-admin-User");
  }

}
