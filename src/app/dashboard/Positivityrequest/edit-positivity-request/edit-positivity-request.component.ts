import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-edit-positivity-request',
  templateUrl: './edit-positivity-request.component.html',
  styleUrls: ['./edit-positivity-request.component.css']
})
export class EditPositivityRequestComponent implements OnInit {
  
  positivityreqId:any;
  positivityReqData:any;
  editPositivityReqForm:FormGroup;
  disableEdit:boolean = false;
  authorDataArray: any;
  validateForm:boolean = false;
  disableMultipleSave:boolean = false;

  constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

  ngOnInit() {
    this.getAuthorName();
    this.activatedroute.params.subscribe((params: Params) => {
      this.positivityreqId = params['id'];
      // this.global_service.consoleFun(this.positivityreqId);
        this.getPositivityRequestById(this.positivityreqId); 
        // this.formInitialization();
    });
  }

  formInitialization(){
    this.editPositivityReqForm = this.fb.group({
      author_id:[this.positivityReqData.author_id,[Validators.required]],
      desc:[this.positivityReqData.desc,[Validators.required]],
      status:[this.positivityReqData.status,[Validators.required]],
      id:[this.positivityReqData.id,[]],
      token:[this.global_service.userInfo.token,[]]
    })

  }
 
 /*Get User Data*/
  getAuthorName() {
   
    let obj = { token: this.global_service.userInfo.token }
  
    const url = this.global_service.basePath + 'admin/users/list/admin';

    this.global_service.PostRequest(url, obj)
      .subscribe(res => {
        this.authorDataArray = res[0].json.json().object;
        // this.global_service.consoleFun("get user data", this.authorDataArray);
      }, 
      err => {
        
        // this.global_service.consoleFun(err);
      })
  } 

/*Get positivity information By ID*/
  getPositivityRequestById(id){

    let obj = {token:this.global_service.userInfo.token,id:id}
    
    const url = this.global_service.basePath + 'admin/positivity/edit';

    this.global_service.PostRequest(url,obj)
      .subscribe(res => {
        // this.global_service.consoleFun(res[0].json.json());
        this.positivityReqData = res[0].json.json().object[0];
        this.global_service.consoleFun(this.positivityReqData + "reavhvh" + typeof(this.positivityReqData));
        this.formInitialization();
        this.disableEdit = true;
      }, 
      err => {
        // this.loader = false;
        // this.global_service.consoleFun(err);
      })
  }
/*Update Positivity By ID*/
  updatePositivityRequest(id){

      if(this.global_service.isFormValid(this.editPositivityReqForm)){
        this.disableMultipleSave = true;
        const url = this.global_service.basePath + 'admin/positivity/update';

        this.global_service.PostRequest(url,this.editPositivityReqForm.value)
          .subscribe(res => {
            // this.global_service.consoleFun(res[0].json.json());
            this.positivityReqData = res[0].json.json().object[0];
              if (res[0].json.json().object.object) {
             this.global_service.showNotification('top','right',res[0].json.json().object.object,4,'ti-cross');
            }
            else{
              this.disableEdit = true;
              this.formInitialization();
              this.global_service.showNotification('top','right',"Updated Successfully",2,'ti-check');
              this.router.navigateByUrl("dashboard/view-positivity-requests");
            } 
            this.disableMultipleSave = false;
        }, 
        err => {
            this.disableMultipleSave = false;
          // this.global_service.consoleFun(err);
        })
      }
      else{
        this.validateForm = true;
        this.global_service.scrollBar();
      }
    }
  
}
