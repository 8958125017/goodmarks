import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-add-help-offer',
  templateUrl: './add-help-offer.component.html',
  styleUrls: ['./add-help-offer.component.css']
})
export class AddHelpOfferComponent implements OnInit {

  addHelpOfferForm:FormGroup;
  disableEdit:boolean = false;
  loader:boolean=false;
  authorDataArray:any=[];
  skillsData: any=[];
  customSkillArray:any=[];
  validateFields: boolean = false;
  disableMultipleSave: boolean = false;
  needbydate:Date;
  date :any;
  minDate:Date;

  constructor(public _activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder, public date_pipe:DatePipe ) { }

  ngOnInit() {
    this.getAuthorName();
    this.getSkillsList();
    this.formInitialization();
    /*let today = new Date();
    let month = today.getMonth();
        let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);*/
  }

  formInitialization() {
    this.addHelpOfferForm = this.fb.group({
      author_id:['',[Validators.required]],
      desc:['',[Validators.required]],
      skills:[[],[Validators.required]],
      title:['',[Validators.required]],
      zip_code:['',[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
      distance:['',[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
      help_type:['',[Validators.required]],
      status:['',[Validators.required]],
      latitude:['',[]],
      longitude:['',[]],
      token:[this.global_service.userInfo.token,[]],
    })
  }

   /* For transforming Date*/
    showDate(){
      debugger
        this.date = this.date_pipe.transform(this.needbydate, 'yyyy-MM-dd');
    }


  /*Get Skill List*/
  getSkillsList() {
   
    let obj = {token:this.global_service.userInfo.token}
    
    const url = this.global_service.basePath + 'admin/skill/list';
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      // this.global_service.consoleFun(res[0].json.json());
      this.skillsData = res[0].json.json().object.skills;
      for(let i=0 ; i < this.skillsData.length; i++)
      {
        this.customSkillArray.push({label:this.skillsData[i].name,value:this.skillsData[i].id});
      }
      // this.global_service.consoleFun("cutom array",this.customSkillArray)

    }, 
    err => {
      this.loader = false;
      // this.global_service.consoleFun(err);
    })
  }

  /*Get User Data*/
  getAuthorName(){

    let obj = { token: this.global_service.userInfo.token };

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

  
  addHelpOffer(){
    if (this.global_service.isFormValid(this.addHelpOfferForm)) { 
      this.disableMultipleSave = true;  
      const url = this.global_service.basePath + 'admin/help/offer/add';

      this.global_service.PostRequest(url,this.addHelpOfferForm.value)
      .subscribe(res => {
      if (res[0].json.json().error && res[0].json.json().error.object) {
         this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
        }
        else{
          this.formInitialization();
          this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
          this.router.navigateByUrl("dashboard/view-help-Offer");
        }
        this.disableMultipleSave = false;
      }  , 
    err => {
        this.disableMultipleSave = false;
    })
    }
    else {
      this.validateFields = true;
      this.global_service.scrollBar();
    }
  }

}
