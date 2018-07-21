import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-edit-job-section',
  templateUrl: './edit-job-section.component.html',
  styleUrls: ['./edit-job-section.component.css']
})

export class EditJobSectionComponent implements OnInit {
  
  jobSectionId:any;
  // jobSectionData:any;
  editjobSectionForm:FormGroup;
  disableEdit:boolean = false;
  skillsData: any=[];
  customSkillArray:any=[];
  selectedSkill: string[] = [];
  date_completion : any;
  authorDataArray:any;
  loader:boolean =false;
  jobSectionData:any;
  need_by:any;
  val1:any;

  jobSectionForm:FormGroup;

  constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

  ngOnInit() {
    this.getAuthorName();
    this.activatedroute.params.subscribe((params: Params) => {
      this.jobSectionId = params['id'];
      this.global_service.consoleFun(this.jobSectionId);
      this.getJobSectionById(this.jobSectionId); 
    });
  }

  formInitialization(){
    this.editjobSectionForm = this.fb.group({
      author_id:['',[]],
      title:['',[]],
      difficulty:['',[]],
      skills:['',[]],
      distance:['',[]],
      date:['',[]],
      need_by:['',[]],
      help_type:['',[]],
      desc:['',[]],
      job_status:[,[]],
      id:['',[]],
      token:['',[]]
    })

  }

  /*Get Skill List*/
  getSkillsList() {

    this.loader = true;

    let obj = {token:this.global_service.userInfo.token};
    
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
      this.global_service.consoleFun("cutom array",this.customSkillArray)
    }, 
    err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }

  /*Get User List*/
  getAuthorName() {
    
    let obj = { token: this.global_service.userInfo.token }
    
    const url = this.global_service.basePath + 'admin/users/list/admin';

    this.global_service.PostRequest(url, obj)
    .subscribe(res => {
      this.authorDataArray = res[0].json.json().object;
      this.global_service.consoleFun("get user data", this.authorDataArray);
    }, 
    err => {
      this.global_service.consoleFun(err);
    })
  }
  
  /*Get Help Request detail By Id*/
  getJobSectionById(id){

    this.getSkillsList();

    let obj = {token:this.global_service.userInfo.token,id:id}
    
    const url = this.global_service.basePath + 'admin/job/edit';
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.global_service.consoleFun(res[0].json.json());
      this.jobSectionData = res[0].json.json().object.result[0];
      this.global_service.consoleFun(this.jobSectionData);
      this.val1 = this.jobSectionData.difficulty;
      this.need_by = new Date(this.jobSectionData.need_by);
      for (let index = 0; index < this.jobSectionData.gkarm_job_skills.length; index++) {
        this.selectedSkill.push(this.jobSectionData.gkarm_job_skills[index].gkarm_skill.id);
        this.global_service.consoleFun(this.selectedSkill);
      } 
      this.global_service.consoleFun(this.date_completion );
      this.formInitialization();
      this.disableEdit = true;
    }, err => {
      // this.loader = false;
      this.global_service.consoleFun(err);
    })
  }
  
  /*Update Help Request Detail By ID*/
  updatejobSection(id){
    const url = this.global_service.basePath + 'admin/skills/update';

    this.global_service.PostRequest(url,this.editjobSectionForm.value)
    .subscribe(res => {
      this.global_service.consoleFun(res[0].json.json());
        if (res[0].json.json().object.object) {
         this.global_service.showNotification('top','right',res[0].json.json().object.object,4,'ti-cross');
        }
        else{
          this.disableEdit = true;
          this.formInitialization();
          this.global_service.showNotification('top','right',"Updated Successfully",2,'ti-check');
          this.router.navigateByUrl("dashboard/view-job-section");
        } 
    }, err => {
      // this.loader = false;
      this.global_service.consoleFun(err);
    })
  }

}
