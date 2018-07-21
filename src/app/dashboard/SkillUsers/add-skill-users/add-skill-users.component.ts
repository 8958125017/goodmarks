import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-add-skill-users',
  templateUrl: './add-skill-users.component.html',
  styleUrls: ['./add-skill-users.component.css']
})
export class AddSkillUsersComponent implements OnInit {

  editskillId:any;
  addSkillUserForm:FormGroup;
  loader:boolean = false;
  skillsData: any;
  authorDataArray: any;
  client_id:any;
  validateForm:boolean = false;
  disableMultipleSave:boolean = false;

  constructor(public _activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

  ngOnInit() {
    this.getSkillsList();
    this.getAuthorName();
    this.formInitialization();
  }

  formInitialization(){
    this.addSkillUserForm = this.fb.group({
      skill_id:['',[Validators.required]],
      client_id:['',[Validators.required]],
      token:[this.global_service.userInfo.token,[]]
    })

  }

 // get Skill List
  getSkillsList() {

    const url = this.global_service.basePath + 'admin/skill/list';
    // this.loader = true;
    let obj = {token:this.global_service.userInfo.token}

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      this.skillsData = res[0].json.json().object.skills;
    },
    err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }

// Get Author Name
  getAuthorName(){

    const url = this.global_service.basePath + 'admin/users/list/admin';
    let obj = { token: this.global_service.userInfo.token }

    this.global_service.PostRequest(url, obj)
    .subscribe(res => {
      this.authorDataArray = res[0].json.json().object;
    }, 
    err => {
      this.global_service.consoleFun(err);
    },
    () => {
    })
  }

// Add skilled User
  addSkilledUser(){

    const url = this.global_service.basePath + 'admin/skills/users/add';
    if (this.addSkillUserForm.valid) { 
      this.disableMultipleSave = true;
      this.global_service.PostRequest(url,this.addSkillUserForm.value)
      .subscribe(res => {
          if (res[0].json.json().error && res[0].json.json().error.object){
           this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
          }
          else{
            this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
            this.router.navigateByUrl("dashboard/view-skilled-User");
          } 
          this.formInitialization();
          this.disableMultipleSave = false;
      }, 
      err => {
        this.disableMultipleSave = false;
        this.global_service.consoleFun(err);
      })
    } 
    else {
      this.validateForm = true;
      this.global_service.scrollBar();
    }
  }
}
