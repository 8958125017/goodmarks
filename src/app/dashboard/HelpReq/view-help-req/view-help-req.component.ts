import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-view-help-req',
  templateUrl: './view-help-req.component.html',
  styleUrls: ['./view-help-req.component.css']
})
export class ViewHelpReqComponent implements OnInit {

  loader:boolean =false;
  requestsList: any;
  value = 1;
  isDataFound :boolean = false;
  indexValue : number =1;
  constructor(public global_service: GlobalService,public router: Router) {}

  ngOnInit() {
    this.getRequestList(this.value);
  }

  getRequestList(value) {
    this.loader = true;
    let obj = {page_number:value,token:this.global_service.userInfo.token}  
    const url = this.global_service.basePath + 'admin/help/requests/list';
    
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      
      if (res[0].json.json().status_code == 401) { 
        this.router.navigateByUrl('/login');
      }
      else {
        if(res[0].json.json().object.result.count !== 0){
          this.isDataFound = true;
          this.requestsList = res[0].json.json().object;
        }
        else{
          this.isDataFound = false;
        }
      }
    }, 
    err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }

/*  deleteHelpRequestById(id){

    this.loader = true;
    let obj = {id:id,token:this.global_service.userInfo.token}
    const url = this.global_service.basePath + 'admin/skills/users/delete';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      this.global_service.consoleFun(res[0].json.json());
      this.getRequestList(this.value);
    }, 
    err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }*/
  
  paginate(event){
    this.value = event.page + 1;
    if (event.page > 0) { 
      this.indexValue = 10 * event.page +1; 
    }
    else{
        this.indexValue=1;
    }
    this.getRequestList(this.value);
  }

  gotoAddHelpRequest (){
  	this.router.navigateByUrl("dashboard/add-help-requests");
  }

  gotoEditHelpRequestByID(id){
    this.router.navigateByUrl("dashboard/edit-help-requests/" + id);
  }
}
