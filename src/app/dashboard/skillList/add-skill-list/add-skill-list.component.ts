import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-add-skill-list',
  templateUrl: './add-skill-list.component.html',
  styleUrls: ['./add-skill-list.component.css']
})
export class AddSkillListComponent implements OnInit {

  positivityreqId:any;
  positivityReqData:any;
  addSkillsForm:FormGroup;
  disableEdit:boolean = false;
  loader : boolean = false;
  validateForm:boolean = false;
  disableMultipleSave:boolean = false;

  constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((params: Params) => {
      this.positivityreqId = params['id'];
      this.global_service.consoleFun(this.positivityreqId);
      // this.getPositivityRequestById(this.positivityreqId); 
      this.formInitialization();
    });
  }

  formInitialization(){
    this.addSkillsForm = this.fb.group({
      category:['',[Validators.required]],
      desc:['',[Validators.required]],
      id:['',[]],
      token:[this.global_service.userInfo.token,[]]
    })

  }

// For adding skills
  addSkillListData(){

    const url = this.global_service.basePath + 'admin/skills/add';
    if (this.global_service.isFormValid(this.addSkillsForm)) { 
      this.disableMultipleSave = true;
      this.global_service.PostRequest(url,this.addSkillsForm.value)
      .subscribe(res => {
          if (res[0].json.json().error && res[0].json.json().error.object) {
           this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
          }
          else{
            this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
            this.router.navigateByUrl("dashboard/view-skills");
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
