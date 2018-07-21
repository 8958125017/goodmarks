import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-view-job-section',
  templateUrl: './view-job-section.component.html',
  styleUrls: ['./view-job-section.component.css']
})

export class ViewJobSectionComponent implements OnInit {

  loader:boolean =false;
  jobListData: any;
  value = 1;
  difficulty: any;
  isDataFound : boolean = false;
  indexValue:number=1;
  constructor(public global_service: GlobalService,public router: Router) {}

  ngOnInit() {
    this.getUserList(this.value);
  }

  // Get Job section
  getUserList(value) {
    this.loader = true;
    let obj = {page_number:value,token:this.global_service.userInfo.token}

    const url = this.global_service.basePath + 'admin/job/list';
    
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      if(res[0].json.json().object.result.count !== 0){
        this.isDataFound = true;
        this.jobListData = res[0].json.json().object;
        for (let i = 0; i < this.jobListData.result.length; ++i) {
        switch (this.jobListData.result[i].difficulty) {
          case 0:
              this.jobListData.result[i].difficultyLevel = "Very Easy"
              break;
          case 1:
              this.jobListData.result[i].difficultyLevel = "Easy"
              break;
          case 2:
              this.jobListData.result[i].difficultyLevel = "Average"
              break;
          case 3:
              this.jobListData.result[i].difficultyLevel = "Hard"
              break;
          case 4:
              this.jobListData.result[i].difficultyLevel = "Very Hard"
              break;
          default:
              this.jobListData.result[i].difficultyLevel = "";
          break;
        }
        }
      }
      else{
        this.isDataFound = false;
      }
    }, 
    err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }

  //For deleting Job Section User
  deleteUserById(id){

    this.loader = true;
    let obj = {id:id,token:this.global_service.userInfo.token}

    const url = this.global_service.basePath + 'admin/skills/users/delete';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      this.global_service.consoleFun(res[0].json.json());
      this.getUserList(this.value);
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
    this.getUserList(this.value);
  }

  gotoAddJobSection(){
    this.router.navigateByUrl("dashboard/add-job-section");
  }

  gotoEditJob(id){
    this.router.navigateByUrl("dashboard/edit-job-section/" + id);
  }
  
}

