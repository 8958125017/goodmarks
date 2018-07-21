import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-view-positive-msg',
  templateUrl: './view-positive-msg.component.html',
  styleUrls: ['./view-positive-msg.component.css']
})

export class ViewPositiveMsgComponent implements OnInit {

  loader:boolean =false;
  messageListData: any;
  value = 1;
  isDataFound : boolean = false;
  indexValue:number=1;
  constructor(public global_service: GlobalService,public router: Router) {}

  ngOnInit() {
    this.getMessageList(this.value);
  }

// Get Message List
  getMessageList(value) {
    this.loader = true;
    let obj = {page_number:value,token:this.global_service.userInfo.token}
    const url = this.global_service.basePath + 'admin/positivity/message/list';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      if(res[0].json.json().object.result.count !== 0){
        this.messageListData = res[0].json.json().object;
        this.isDataFound = true;
      }
      else{
        this.isDataFound = false;
      }
    }, 
    err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }
  
  deletePositivityMsgById(id){

    this.loader = true;
    let obj = {id:id,token:this.global_service.userInfo.token}
    const url = this.global_service.basePath + 'admin/skills/users/delete';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      this.global_service.showNotification('top','right',"Deleted Successfully",2,'ti-check');
      this.getMessageList(this.value);
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
        this.indexValue=1;
    }
    this.getMessageList(this.value);
  }

  gotoAddMessage(){
  	this.router.navigateByUrl("dashboard/add-positivity-messages");
  }

  gotoEditMessagebyID(id){
    this.router.navigateByUrl("dashboard/edit-positivity-messages/" + id);
  }
  
}
