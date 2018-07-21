import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-add-positivity-request',
  templateUrl: './add-positivity-request.component.html',
  styleUrls: ['./add-positivity-request.component.css']
})
export class AddPositivityRequestComponent implements OnInit {

  addPositivityForm:FormGroup;
  disableEdit:boolean = false;
  AuthorData: any;
  loader: boolean = false;
  disableMultipleSave:boolean = false;
  validateForm:boolean = false;

  constructor(public global_service:GlobalService, public router:Router, public fb:FormBuilder) { }

  ngOnInit() {
    this.formInitialization();
    this.getAuthor();
  }

  formInitialization(){
    this.addPositivityForm = this.fb.group({
      author_id:['',[Validators.required]],
      desc:['',[Validators.required]],
      status:['',[Validators.required]],
      token:[this.global_service.userInfo.token,[]]
    })

  }

  /*Get User List*/
  getAuthor(){

    let obj = {token:this.global_service.userInfo.token}
    
    const url = this.global_service.basePath + 'admin/users/list/admin';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      // this.global_service.consoleFun(res[0].json.json());
      this.AuthorData = res[0].json.json().object;
      // this.formInitialization();
      // this.global_service.consoleFun(this.AuthorData)
    }, err => {
      this.loader = false;
      // this.global_service.consoleFun(err);
    })
  }

  /*Add Positivity*/
  addPositivityRequest(){

      if(this.addPositivityForm.valid){
        this.disableMultipleSave = true;
        const url = this.global_service.basePath + 'admin/positivity/add';
      
            this.global_service.PostRequest(url,this.addPositivityForm.value)
            .subscribe(res => {
              // this.global_service.consoleFun(res[0].json.json());
                if (res[0].json.json().object.object) {
                 this.global_service.showNotification('top','right',res[0].json.json().object.object,4,'ti-cross');
                }
                else{
                  this.formInitialization();
                  this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
                  this.router.navigateByUrl("dashboard/view-positivity-requests");
                  this.loader = false;
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



