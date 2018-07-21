import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-add-help-req',
  templateUrl: './add-help-req.component.html',
  styleUrls: ['./add-help-req.component.css']
})
export class AddHelpReqComponent implements OnInit {

  addhelpRequestForm:FormGroup;
  skillsData: any=[];
  customSkillArray:any=[];
  selectedSkill: Array<any> = [];
  date_completion : any;
  authorDataArray:any;
  loader:boolean =false;
  helpRequestData:any;
  validateFields: boolean = false;
  disableMultipleSave: boolean = false;
  needbydate:any = '';
  date :any;
  minDate:Date;
  currentYear:any;
  lastYear:any;
  helpTypes:any[] = [ {id:1,help:'Physical Help'},
                      {id:2,help:'Virtual Help'}];


  constructor(public global_service:GlobalService, public router:Router, public fb:FormBuilder, public date_pipe: DatePipe ) { }

  ngOnInit() {
    // this.getPositivityRequestById(this.positivityreqId); 
    this.formInitialization();
    this.getSkillsList();
    this.getAuthorName();
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    this.lastYear ='0';
    this.currentYear=year.toString();
  }

  formInitialization(){
    this.addhelpRequestForm = this.fb.group({
      author_id:['',[Validators.required]],
      title:['',[Validators.required]],
      difficulty:['',[Validators.required]],
      skills:[[],[Validators.required]],
      distance:['',[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
      zip_code:['',[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
      desc:['',[Validators.required]],
      help_type:['',[Validators.required]],
      date_completion:['',[]],
      status:['',[Validators.required]],
      latitude:['',[]],
      longitude:['',[]],
      token:[this.global_service.userInfo.token,[]],
    })

  }

   /* For transforming Date*/
    showDate(){
        this.date = this.date_pipe.transform(this.needbydate, 'yyyy-MM-dd');
    }

  /*Get Skill List*/
  getSkillsList() {
    let obj = {token:this.global_service.userInfo.token};
    
    const url = this.global_service.basePath + 'admin/skill/list';
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.skillsData = res[0].json.json().object.skills;
      for(let i=0 ; i < this.skillsData.length; i++)
      {
        this.customSkillArray.push({label:this.skillsData[i].name,value:this.skillsData[i].id});
      }
    }, 
    err => {
    })
  }

  /*Get User List*/
  getAuthorName() {

    let obj = { token: this.global_service.userInfo.token }

    const url = this.global_service.basePath + 'admin/users/list/admin';
    this.global_service.PostRequest(url, obj)
    .subscribe(res => {
      this.authorDataArray = res[0].json.json().object;
    }, 
    err => {
    })
  }

  addHelpRequest(){
   
     if(this.global_service.isFormValid(this.addhelpRequestForm) && this.date){
      this.disableMultipleSave = true; 
      let obj = {token:this.global_service.userInfo.token,value:this.addhelpRequestForm.value}
      this.addhelpRequestForm.controls.date_completion.setValue(this.date);
        
        const url = this.global_service.basePath + 'admin/help/request/add';
        this.global_service.PostRequest(url,this.addhelpRequestForm.value)
        .subscribe(res => {
            if (res[0].json.json().error && res[0].json.json().error.object) {
             this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
            }
            else{
              this.formInitialization();
              this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
              this.router.navigateByUrl("dashboard/view-help-requests");
            }
            this.disableMultipleSave = false;
        }, err => {
          this.disableMultipleSave = false;
        })
    }
    else{
      this.validateFields = true;
      this.global_service.scrollBar();
    }
  }

}