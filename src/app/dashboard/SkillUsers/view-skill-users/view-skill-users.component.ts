  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { ConfirmationService } from 'primeng/primeng';

  import { GlobalService } from './../../../GlobalService';

  @Component({
    selector: 'app-view-skill-users',
    templateUrl: './view-skill-users.component.html',
    styleUrls: ['./view-skill-users.component.css']
  })
  export class ViewSkillUsersComponent implements OnInit {

    loader:boolean =false;
    skillUserListData: any;
    value = 1;
    isDataFound : boolean = false;
    display : boolean =false;
    deleteConfirmId:any;
    indexValue:number=1;

    constructor(public global_service: GlobalService,public router: Router, public confirmationService: ConfirmationService) {}

    ngOnInit() {
      this.getSkillUsersList(this.value);
    }

    /*Show Skilled User List*/
    getSkillUsersList(value) {
      this.loader = true;
      let obj = {page_number:value,token:this.global_service.userInfo.token}  
      const url = this.global_service.basePath + 'admin/skills/users/list';

      this.global_service.PostRequest(url,obj)
      .subscribe(res => {
        this.loader = false;
        if (res[0].json.json().status_code == 401) { 
          this.router.navigateByUrl('/login');
        }
        else{
          if(res[0].json.json().object.result.count !== 0){
            this.isDataFound = true;
            this.skillUserListData = res[0].json.json().object;
          }
          else{
            this.isDataFound = false;
          }
        }
      }, err => {
        this.loader = false;
        this.global_service.consoleFun(err);
      })
    }

    /*Delete Skilled User By ID*/
    deleteSkillsUser(id){
      
      this.loader = true;
      let obj = {id:id,token:this.global_service.userInfo.token}
      const url = this.global_service.basePath + 'admin/skills/users/delete';

      this.global_service.PostRequest(url,obj)
      .subscribe(res => {
        this.loader = false;
        this.global_service.showNotification('top','right',"Deleted Successfully",2,'ti-check');
        this.getSkillUsersList(this.value);
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
      this.getSkillUsersList(this.value);
    }


    gotoEditSkillUser(id){
      this.router.navigateByUrl("dashboard/edit-skilled-User/" + id);
    }

    gotoAddSkillUser(){
      this.router.navigateByUrl("dashboard/add-skilled-User");
    }
    
  deleteSkillsUserById() {
    this.deleteSkillsUser(this.deleteConfirmId);
    this.display = false;
  }

    deleteConfirm(id) {
    this.display = true;
    this.deleteConfirmId = id;
        // this.confirmationService.confirm({
        //     message: 'Do you want to delete this record?',
        //     header: 'Delete Confirmation',
        //     icon: 'fa fa-trash',
        //     accept: () => {
        //         this.deleteSkillsUser(id);
        //     },
        //     reject: () => {
                
        //     }
        // });
    }
  }
