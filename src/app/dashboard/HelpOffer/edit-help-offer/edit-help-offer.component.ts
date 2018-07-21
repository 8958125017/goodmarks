import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';
@Component({
  selector: 'app-edit-help-offer',
  templateUrl: './edit-help-offer.component.html',
  styleUrls: ['./edit-help-offer.component.css']
})
export class EditHelpOfferComponent implements OnInit {

  helpOfferId:any;
  helpOfferData:any;
  edithelpOfferForm:FormGroup;
  disableEdit:boolean = false;
  authorDataArray:any;
  helpRequestId:any;
  skillsData: any=[];
  customSkillArray:any=[];
  selectedSkill: Array<any> = [];
  date : any;
  loader :boolean =false;
  validateFields: boolean = false;
  needbydate:Date;
  minDate:Date;
  helpTypes:any[] = [ {id:1,help:'Physical Help'},
                      {id:2,help:'Virtual Help'}];
                     

  constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, 
    public router:Router, public fb:FormBuilder, public date_pipe:DatePipe ) {}

  ngOnInit() {
    
    this.activatedroute.params.subscribe((params: Params) => {
      this.helpOfferId = params['id'];
      // this.global_service.consoleFun(this.helpOfferId);
      this.getHelpOfferById(this.helpOfferId); 
      this.getAuthorName();
      this.getSkillsList();
      // this.formInitialization();
    });
  }

  formInitialization() {
    this.edithelpOfferForm = this.fb.group({
      author_id:[this.helpOfferData.author_id,[Validators.required]],
      desc:[this.helpOfferData.desc,[Validators.required]],
      skills:[this.selectedSkill,[Validators.required]],
      title:[this.helpOfferData.title,[Validators.required]],
      zip_code:[this.helpOfferData.zip_code,[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
      distance:[this.helpOfferData.distance,[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
      help_type:[this.helpOfferData.help_type,[Validators.required]],
      status:[this.helpOfferData.status,[Validators.required]],
      latitude:[this.helpOfferData.latitude,[]],
      longitude:[this.helpOfferData.longitude,[]],
      id:[this.helpOfferData.id,[]],
      token:[this.global_service.userInfo.token,[]]
    })

  }
  
  /* For transforming Date*/
    showDate(){
        this.date = this.date_pipe.transform(this.needbydate, 'yyyy-MM-dd');
    }

  /*Get Skill List*/
  getSkillsList() {
    this.loader = true;

    let obj = {token:this.global_service.userInfo.token}
    
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
      // this.global_service.consoleFun("cutom array",this.customSkillArray)

    }, 
    err => {
      this.loader = false;
      // this.global_service.consoleFun(err);
    })
  }

  /*Get User Data*/
  getAuthorName() {

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

  /*Get Help Offer Detail By ID*/
  getHelpOfferById(id) {

    let obj = {token:this.global_service.userInfo.token,id:id}
    
    const url = this.global_service.basePath + 'admin/help/offer/edit';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      // this.global_service.consoleFun(res[0].json.json());
      this.helpOfferData = res[0].json.json().object.result[0];
      // this.global_service.consoleFun(this.helpOfferData,"info");
      for (let index = 0; index < this.helpOfferData.skills.length; index++) {
        this.selectedSkill.push(this.helpOfferData.skills[index].gkarmskill_id);
      }
      this.needbydate = this.helpOfferData.date_completion;  
      this.formInitialization();
      this.disableEdit = true;
    }, 
    err => {
      // this.loader = false;
      // this.global_service.consoleFun(err);
    })
  }

  /*Update Help Offer By ID*/
  updateHelpOffer(id) {

    if(this.global_service.isFormValid(this.edithelpOfferForm)){
      const url = this.global_service.basePath + 'admin/help/offer/update';
        // this.edithelpOfferForm.controls.date_completion.setValue(this.date);
        this.global_service.PostRequest(url,this.edithelpOfferForm.value)
        .subscribe(res => {
          this.helpOfferData = res[0].json.json().object[0];
            if (res[0].json.json().error && res[0].json.json().error.object) {
             this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
            }
            else{
              this.formInitialization();
              this.global_service.showNotification('top','right',"Updated Successfully",2,'ti-check');
              this.router.navigateByUrl("dashboard/view-help-Offer");
            } 
          // this.global_service.consoleFun(this.helpOfferData + "reavhvh" + typeof(this.helpOfferData));
          this.formInitialization();
          this.disableEdit = true;
        }, 
        err => {
          // this.loader = false;
          // this.global_service.consoleFun(err);
        })
      }
      else{
        this.validateFields = true;
        this.global_service.scrollBar();
      }
  }

}
