import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  
  loader:boolean =false;
  companyListData: any;
  value = 1;
  isDataFound : boolean = false;
  display : boolean =false;
  deleteConfirmId:any;
  indexValue:number=1;

  constructor(public global_service: GlobalService,public router: Router, public confirmationService:ConfirmationService) {}

  ngOnInit() {
    this.getCompanyList(this.value);
  }



 // Get Skill List
  getCompanyList(value) {

    this.loader = true;
    let obj = { page_number:value,token:this.global_service.userInfo.token };   
    const url = this.global_service.basePath + 'admin/company/list';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      if(res[0].json.json().object.result.length > 0){
        this.isDataFound = true;
        this.companyListData = res[0].json.json().object;
          for (let i = 0; i < this.companyListData.result.length; ++i) {
            switch (this.companyListData.result[i].accountType) {
              case 0:
                  this.companyListData.result[i].accountType = "Business Use"
                  break;
              case 1:
                  this.companyListData.result[i].accountType = "Personal Use"
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
  
  // Delete Skills by Id
  deleteCompany(id) {

    this.loader = true;
    let obj = {id:id,token:this.global_service.userInfo.token}
    const url = this.global_service.basePath + 'admin/company/delete';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      if (res[0].json.json().error && res[0].json.json().error.object) { 
        this.global_service.showNotification('top','right',res[0].json.json().error.object,2,'ti-cross');
      } else {
        this.loader = false;
        this.global_service.showNotification('top','right',"Deleted Successfully",2,'ti-cross');
        this.getCompanyList(this.value);
        // code...
      }
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

    this.getCompanyList(this.value);
  }

  gotoAddCompany(){
  	this.router.navigateByUrl("dashboard/add-company");
  }
  
  gotoEditCompany(id){
    this.router.navigateByUrl("dashboard/edit-company/" + id);
  }

  deleteCompanyById() {
    this.deleteCompany(this.deleteConfirmId);
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
        //         this.deleteCompany(id);
        //     },
        //     reject: () => {
        //     }

        // });
    }
}
