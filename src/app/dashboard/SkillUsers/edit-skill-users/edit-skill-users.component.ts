import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-edit-skill-users',
  templateUrl: './edit-skill-users.component.html',
  styleUrls: ['./edit-skill-users.component.css']
})
export class EditSkillUsersComponent implements OnInit {

  editskillId:any;
  positivityReqData:any;
  editSkillUserForm:FormGroup;
  disableEdit:boolean = false;
  loader:boolean = false;
  skillsData: any;
  customSkillArray: any = [];
  authorDataArray: any;
  selectedSkill: any;
  skillUserData : any;
  client_id:any;
  validateForm:boolean = false;
  disableMultipleSave:boolean = false;

  constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

  ngOnInit() { 
    this.activatedroute.params.subscribe((params: Params) => {
      this.editskillId = params['id'];
      this.global_service.consoleFun(this.editskillId);
      this.getSkillsList();
      this.getAuthorName();    
    });
  }

  formInitialization(){
    this.editSkillUserForm = this.fb.group({
      skill_id:[parseInt(this.skillUserData.skill_id),[]],
      client_id:[parseInt(this.skillUserData.id),[]],
      // status:[this.skillUserData.status,[]],
      id:[this.skillUserData.skill_user_id,[]],
      token:[this.global_service.userInfo.token,[]]
    })

  }

  /*Get Skill list*/
  getSkillsList() {

    this.loader = true;

    let obj = {token:this.global_service.userInfo.token}

    const url = this.global_service.basePath + 'admin/skill/list';
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      this.global_service.consoleFun(res[0].json.json());
      this.skillsData = res[0].json.json().object.skills;

      for(let i=0 ; i < this.skillsData.length; i++)
      {
        this.customSkillArray.push({label:this.skillsData[i].name,value:this.skillsData[i].id});
      }

    }, 
    err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }

  /*Get User List*/
  getAuthorName(){

    let obj = { token: this.global_service.userInfo.token }

    const url = this.global_service.basePath + 'admin/users/list/admin';
    this.global_service.PostRequest(url, obj)
    .subscribe(res => {
      this.authorDataArray = res[0].json.json().object;
      // this.global_service.consoleFun("get user data", this.authorDataArray);
    }, 
    err => {
      this.global_service.consoleFun(err);
    },
    () => {
      this.getSkillUserById(this.editskillId); 
    })

  }

  /*Get Skilled User data by id*/
  getSkillUserById(id){

    let obj = {token:this.global_service.userInfo.token,id:id}

    const url = this.global_service.basePath + 'admin/skills/users/edit';
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.global_service.consoleFun(res[0].json.json());
      this.skillUserData = res[0].json.json().object[0];
      this.global_service.consoleFun(this.skillUserData,"info");
      this.selectedSkill = this.skillUserData.skill_id;
      this.formInitialization();
      this.disableEdit = true;
    }, 
    err => {
      // this.loader = false;
      this.global_service.consoleFun(err);
    })
  }

  /*Update Skilled User by Data*/
  updateSkilledUser(){

      if(this.global_service.isFormValid(this.editSkillUserForm)){
        this.disableMultipleSave = true;
        const url = this.global_service.basePath + 'admin/skills/users/update';
    
        this.global_service.PostRequest(url,this.editSkillUserForm.value)
        .subscribe(res => {
          this.global_service.consoleFun(res[0].json.json());
            if (res[0].json.json().error && res[0].json.json().error.object ) {
             this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
            }
            else{
              this.disableEdit = true;
              this.formInitialization();
              this.global_service.showNotification('top','right',"Updated Successfully",2,'ti-check');
              this.router.navigateByUrl("dashboard/view-skilled-User");
            } 
          this.disableMultipleSave = false;  
        }, 
        err => {
          this.disableMultipleSave = false;
          this.global_service.consoleFun(err);
        })
      }
     else{
       this.validateForm = true;
        this.global_service.scrollBar();
     } 
  }
  
}
