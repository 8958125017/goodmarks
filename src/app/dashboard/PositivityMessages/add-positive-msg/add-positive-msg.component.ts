import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-add-positive-msg',
  templateUrl: './add-positive-msg.component.html',
  styleUrls: ['./add-positive-msg.component.css']
})
export class AddPositiveMsgComponent implements OnInit {

  positivityreqId:any;
  positivityMsgData:any;
  addPositivityMessageForm:FormGroup;
  authorDataArray: any;
  positivityDataArray: any;
  validateForm:boolean = false;
  loader:false;
  disableMultipleSave:boolean = false;
  positivity :any;

  constructor(public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

  ngOnInit() {
    this.getAuthorName();
    this.getRequestPositivity();
    this.formInitialization();
    this.positivity = -1;
  }

  formInitialization(){
    this.addPositivityMessageForm = this.fb.group({
      request_positivity_id:['',[Validators.required]],
      author_id:['',[Validators.required]],
      desc:['',[Validators.required]],
      status:['',[Validators.required]],
      token:[this.global_service.userInfo.token,[]]
    })

  }

  getAuthorName() {

    let obj = { token: this.global_service.userInfo.token }
    const url = this.global_service.basePath + 'admin/users/list/admin';

    this.global_service.PostRequest(url, obj).subscribe(res => {
      this.authorDataArray = res[0].json.json().object;
    }, 
    err => {
      // this.global_service.consoleFun(err);
    })

  } 

  getRequestPositivity() {

    let obj = { token: this.global_service.userInfo.token }
    const url = this.global_service.basePath + 'admin/positivity/list/admin';

    this.global_service.PostRequest(url, obj).subscribe(res => {
      this.positivityDataArray = res[0].json.json().object;
    }, 
    err => {
      // this.global_service.consoleFun(err);
    })

  } 

  addPositivityMessage(){
    
    const url = this.global_service.basePath + 'admin/positivity/message/add';

    if (this.addPositivityMessageForm.valid) { 
      this.disableMultipleSave = true;
      this.global_service.PostRequest(url,this.addPositivityMessageForm.value)
      .subscribe(res => {
        this.positivityMsgData = res[0].json.json().object[0];
          if (res[0].json.json().error && res[0].json.json().error.object) {
           this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
          }
          else{
            this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
            this.router.navigateByUrl("dashboard/view-positivity-messages");
          } 
          this.formInitialization();
          this.disableMultipleSave = false;
      }, 
      err => {
        this.disableMultipleSave = false;
        // this.global_service.consoleFun(err);
      })
    } 
    else {
     this.validateForm = true;
     this.global_service.scrollBar();
    }
  }

}
