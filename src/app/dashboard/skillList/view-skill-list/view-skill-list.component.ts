import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-view-skill-list',
  templateUrl: './view-skill-list.component.html',
  styleUrls: ['./view-skill-list.component.css']
})
export class ViewSkillListComponent implements OnInit {
 
  loader:boolean =false;
  skillListData: any;
  value = 1;
  isDataFound : boolean = false;
  display : boolean =false;
  deleteConfirmId:any;
  indexValue:number=1;

  constructor(public global_service: GlobalService,public router: Router, public confirmationService:ConfirmationService) {}

  ngOnInit() {
    this.getskillList(this.value);
  }

 // Get Skill List
  getskillList(value) {
    this.loader = true;
    let obj = { page_number:value,token:this.global_service.userInfo.token };   
    const url = this.global_service.basePath + 'admin/skills/list';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      if(res[0].json.json().object.result.count !== 0){
        this.isDataFound = true;
        this.skillListData = res[0].json.json().object;
      }
      else{
        this.isDataFound = false;
      }
    }, err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }
  
  // Delete Skills by Id
  deleteSkills(id) {

    this.loader = true;
    let obj = {id:id,token:this.global_service.userInfo.token}
    const url = this.global_service.basePath + 'admin/skills/delete';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      if (res[0].json.json().error && res[0].json.json().error.object) { 
        this.global_service.showNotification('top','right',res[0].json.json().error.object,2,'ti-cross');
        // this.global_service.showNotifications('success', 'Done' ,res[0].json.json().error.object);
        // code...
      } else {
        this.global_service.showNotification('top','right',"Deleted Successfully",2,'ti-cross');
        // this.global_service.showNotifications('success', 'Done' ,"Deleted Successfully");
      }
      this.getskillList(this.value);
    }, 
    err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }
  
  
  paginate(event){
    this.value = event.page + 1;
    if (event.page > 0) { 
      this.indexValue = 10 * event.page +1; 
    }
    else{
        this.indexValue=1;
    }
    this.getskillList(this.value);
  }

  gotoAddSkills(){
  	this.router.navigateByUrl("dashboard/add-skills");
  }
  
  gotoEditSkills(id){
    this.router.navigateByUrl("dashboard/edit-skills/" + id);
  }

  deleteSkillsById() {
    this.deleteSkills(this.deleteConfirmId);
    this.display = false;
  }


  deleteConfirm(id) {
    this.deleteConfirmId=id;
    this.display=true;
        // this.confirmationService.confirm({
        //     message: 'Do you want to delete this record?',
        //     header: 'Delete Confirmation',
        //     icon: 'fa fa-trash',
        //     accept: () => {
        //         this.deleteSkills(id);
        //     },
        //     reject: () => {
                
        //     }
        // });
    }


}
