import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-edit-help-req',
  templateUrl: './edit-help-req.component.html',
  styleUrls: ['./edit-help-req.component.css']
})

export class EditHelpReqComponent implements OnInit {

  helpreqId:any;
  helpReqData:any;
  edithelpRequestForm:FormGroup;
  disableEdit:boolean = false;
  skillsData: any=[];
  customSkillArray:any=[];
  selectedSkill: Array<any> = [];
  // date_completion : any;
  authorDataArray:any;
  loader:boolean =false;
  validateFields: boolean = false;
  disableMultipleSave:boolean = false;
  needbydate:Date;
  date :any;
  minDate:Date;
  currentYear:any;
  lastYear:any;
  changedDateCompletion:boolean=false;
  helpTypes:any[] = [ {id:1,help:'Physical Help'},
                      {id:2,help:'Virtual Help'}];

  constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder, public date_pipe:DatePipe ) { }

  ngOnInit() {
    this.getAuthorName();
    this.activatedroute.params.subscribe((params: Params) => {
      this.helpreqId = params['id'];
      // this.global_service.consoleFun(this.helpreqId);
      this.getHelpReqById(this.helpreqId); 
    });
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    this.lastYear ='0';
    this.currentYear=year.toString();
  }

  formInitialization(){
    this.edithelpRequestForm = this.fb.group({
      author_id:[this.helpReqData.author_id,[Validators.required]],
      title:[this.helpReqData.title,[Validators.required]],
      difficulty:[this.helpReqData.difficulty,[Validators.required]],
      skills:[this.selectedSkill,[Validators.required]],
      distance:[this.helpReqData.distance,[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
      zip_code:[this.helpReqData.zip_code,[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
      desc:[this.helpReqData.desc,[Validators.required]],
      help_type:[this.helpReqData.help_type,[Validators.required]],
      latitude:[this.helpReqData.latitude,[]],
      longitude:[this.helpReqData.longitude,[]],
      date_completion:[new Date(this.helpReqData.date_completion),[]],
      status:[this.helpReqData.status,[]],
      id:[this.helpReqData.id,[]],
      token:[this.global_service.userInfo.token,[]]
    })

  }
  

   /* For transforming Date*/
    showDate(){
        this.date = this.date_pipe.transform(this.needbydate, 'yyyy-MM-dd');
        this.changedDateCompletion=true;
    }

  /*Get Skill List*/
  getSkillsList() {

    this.loader = true;

    let obj = {token:this.global_service.userInfo.token};
    
    const url = this.global_service.basePath + 'admin/skill/list';
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      // this.global_service.consoleFun(res[0].json.json());   
      this.skillsData = res[0].json.json().object.skills;
      for(let i=0 ; i < this.skillsData.length; i++)
      {
        this.customSkillArray.push({label:this.skillsData[i].name,value:this.skillsData[i].id});
      }
    }, 
    err => {
      this.loader = false;
      // this.global_service.consoleFun(err);
    })
  }

  /*Get User List*/
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
  
  /*Get Help Request detail By Id*/
  getHelpReqById(id){

    this.getSkillsList();

    let obj = {token:this.global_service.userInfo.token,id:id}
    
    const url = this.global_service.basePath + 'admin/help/requests/edit';
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.helpReqData = res[0].json.json().object.result[0];
      this.needbydate = new Date(this.helpReqData.date_completion);
      for (let index = 0; index < this.helpReqData.skills.length; index++) {
        this.selectedSkill.push(this.helpReqData.skills[index].gkarmskill_id);
      } 
      
      this.formInitialization();
      this.disableEdit = true;
    }, err => {
      // this.loader = false;
    })
  }
  
  /*Update Help Request Detail By ID*/
  updateHelpRequest(id){

    if (this.global_service.isFormValid(this.edithelpRequestForm)) { 
       this.disableMultipleSave = true;
       const url = this.global_service.basePath + 'admin/help/request/update';
       this.edithelpRequestForm.value.date_completion = this.changedDateCompletion ? this.date : this.date_pipe.transform(this.needbydate, 'yyyy-MM-dd');
       // this.edithelpRequestForm.controls.date_completion.setValue(this.date);
        this.global_service.PostRequest(url,this.edithelpRequestForm.value)
        .subscribe(res => {
            if (res[0].json.json().error && res[0].json.json().error.object) {
             this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
            }
            else{
              this.disableEdit = true;
              this.formInitialization();
              this.global_service.showNotification('top','right',"Updated Successfully",2,'ti-check');
              this.router.navigateByUrl("dashboard/view-help-requests");
            }
            this.disableMultipleSave = false;
        }, err => {
            this.disableMultipleSave = false;
        })
    } 
    else {
      this.validateFields = true;
      this.global_service.scrollBar();
    }
  }

}
