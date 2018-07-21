import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';
@Component({
  selector: 'app-edit-positive-msg',
  templateUrl: './edit-positive-msg.component.html',
  styleUrls: ['./edit-positive-msg.component.css']
})
export class EditPositiveMsgComponent implements OnInit {

  positivityreqId:any;
  positivityMsgData:any;
  editPositivityMessageForm:FormGroup;
  disableEdit:boolean = false;
  authorDataArray: any;
  positivitylist: any[] = [];
  disableMultipleSave:boolean = false;
  validateForm:boolean = false;

  constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

  ngOnInit() {
    this.getAuthorName();
    this.getRequestPositivity();
    this.activatedroute.params.subscribe((params: Params) => {
      this.positivityreqId = params['id'];
      this.getPositivityRequestById(this.positivityreqId); 
      // this.formInitialization();
    });
  }

  formInitialization(){
    this.editPositivityMessageForm = this.fb.group({
      request_positivity_id:[this.positivityMsgData.request_positivity_id,[Validators.required]],
      author_id:[this.positivityMsgData.author_id,[Validators.required]],
      desc:[this.positivityMsgData.desc,[Validators.required]],
      status:[this.positivityMsgData.status,[Validators.required]],
      id:[this.positivityMsgData.id,[]],
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
      // res[0].json.json().object.filter(function(item,index){
      //   if(item.desc){
      //    this.positivitylist.push(item); 
      //   }
      // });
      this.positivitylist = res[0].json.json().object;
    }, 
    err => {   
      // this.global_service.consoleFun(err);
    })
    
  } 

  getPositivityRequestById(id){
  
    let obj = {token:this.global_service.userInfo.token,id:id}
    
    const url = this.global_service.basePath + 'admin/positivity/message/edit';
    this.global_service.PostRequest(url,obj).subscribe(res => {
      this.positivityMsgData = res[0].json.json().object[0];
      this.formInitialization();
      this.disableEdit = true;
    }, 
    err => {
      // this.loader = false;
      // this.global_service.consoleFun(err);
    })
  }

  updatePositivityMessage(id){
    if (this.global_service.isFormValid(this.editPositivityMessageForm)) { 
    this.disableMultipleSave = true;
    const url = this.global_service.basePath + 'admin/positivity/message/update';

    this.global_service.PostRequest(url,this.editPositivityMessageForm.value)
    .subscribe(res => {
      this.positivityMsgData = res[0].json.json().object[0];
        if ( res[0].json.json().error && res[0].json.json().error.object) {
         this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
        }
        else{
          this.global_service.showNotification('top','right',"Updated Successfully",2,'ti-check');
          this.router.navigateByUrl("dashboard/view-positivity-messages");
        } 
        this.disableEdit = true;
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
