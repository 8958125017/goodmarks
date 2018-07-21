import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';
@Component({
  selector: 'app-edit-skill-list',
  templateUrl: './edit-skill-list.component.html',
  styleUrls: ['./edit-skill-list.component.css']
})
export class EditSkillListComponent implements OnInit {

  skillreqId:any;
  skillsListData:any;
  editSkillsForm:FormGroup;
  disableEdit:boolean = false;
  validateForm:boolean = false;
  disableMultipleSave:boolean = false;

  constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((params: Params) => {
      this.skillreqId = params['id'];
      this.getSkillListById(this.skillreqId); 
    });
  }

  formInitialization(){
    this.editSkillsForm = this.fb.group({
      desc:[this.skillsListData.desc,[Validators.required]],
      category:[this.skillsListData.category,[Validators.required]],
      id:[this.skillsListData.id,[]],
      token:[this.global_service.userInfo.token,[]]
    })

  }
  
  /*Get Skill by Id*/
  getSkillListById(id){
    // this.skillsListData=Array;
    let obj = {token:this.global_service.userInfo.token,id:id}
    
    const url = this.global_service.basePath + 'admin/skills/edit';
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.skillsListData = res[0].json.json().object[0];
      this.formInitialization();
      this.disableEdit = true;
    }, 
    err => {
      // this.loader = false;
      // this.global_service.consoleFun(err);
    })
  }

  /*Update Skill by Id*/
  updateSkillListData(id){

    if(this.global_service.isFormValid(this.editSkillsForm)){
      this.disableMultipleSave = true;
      const url = this.global_service.basePath + 'admin/skills/update';
    
        this.global_service.PostRequest(url,this.editSkillsForm.value)
        .subscribe(res => {
          this.skillsListData = res[0].json.json().object[0];
            if (res[0].json.json().error && res[0].json.json().error.object) {
             this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
            }
            else{
              this.global_service.showNotification('top','right',"Updated Successfully",2,'ti-check');
              this.router.navigateByUrl("dashboard/view-skills");
            }
            this.disableEdit = true;
            this.formInitialization(); 
            this.disableMultipleSave = false;
        }, 
        err => {
          this.disableMultipleSave = false;
          // this.loader = false;
          // this.global_service.consoleFun(err);
        })
      }
    else{
      this.validateForm = true;
      this.global_service.scrollBar();
    }  
  }
  
}
