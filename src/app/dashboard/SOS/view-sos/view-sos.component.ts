import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-view-sos',
  templateUrl: './view-sos.component.html',
  styleUrls: ['./view-sos.component.css']
})
export class ViewSosComponent implements OnInit {

  
    loader:boolean =false;
    sosListData: any;
    value = 1;
    isDataFound : boolean = false;
    display : boolean =false;
    deleteConfirmId:any;
    indexValue:number=1;

    constructor(public global_service: GlobalService,public router: Router, public confirmationService:ConfirmationService) {}

    ngOnInit() {
      this.getSOSList(this.value);
    }
  
     // Get SOS List
    getSOSList(value) {
      this.loader = true;
      let obj = {page_number:value,token:this.global_service.userInfo.token}
      const url = this.global_service.basePath + 'admin/sos/list';

      this.global_service.PostRequest(url,obj)

      .subscribe(res => {
          this.loader = false;
          if(res[0].json.json().object.result.count !== 0){
            this.isDataFound = true;
            this.sosListData = res[0].json.json().object;
          }
          else{
            this.isDataFound = false;
          }
        }, err => {
          this.loader = false;
          this.global_service.consoleFun(err);
      })
    }
    
    /*Delete SoS Contact*/
    deleteSosById(id){

      this.loader = true;
      let obj = {id:id,token:this.global_service.userInfo.token}
      const url = this.global_service.basePath + 'admin/sos/delete';

      this.global_service.PostRequest(url,obj)
      .subscribe(res => {
        this.loader = false;
        this.global_service.showNotification('top','right',"Deleted Successfully",2,'ti-check');
        this.getSOSList(this.value);
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
      this.getSOSList(this.value);
    }

    gotoAddsos(){
    	this.router.navigateByUrl("dashboard/add-sos");
    }

    gotoEditSos(id){
      this.router.navigateByUrl("dashboard/edit-sos/" + id);
    }

  deleteSosDataById() {
    this.deleteSosById(this.deleteConfirmId);
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
        //         this.deleteSosById(id);
        //     },
        //     reject: () => {
                
        //     }
        // });
    }
}
