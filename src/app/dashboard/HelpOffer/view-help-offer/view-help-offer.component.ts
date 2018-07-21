import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-view-help-offer',
  templateUrl: './view-help-offer.component.html',
  styleUrls: ['./view-help-offer.component.css']
})
export class ViewHelpOfferComponent implements OnInit {

  loader:boolean =false;
  helpOffersList: any;
  value = 1;
  isDataFound : boolean =false;
  indexValue :number =1;
  constructor(public global_service: GlobalService,public router: Router) {}

  ngOnInit() {
    this.getHelpOfferList(this.value);
  }

  getHelpOfferList(value) {
    this.loader = true;

    let obj = {page_number:value,token:this.global_service.userInfo.token};
    
    const url = this.global_service.basePath + 'admin/help/offer/list';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      
      if (res[0].status !== 401) { 
        if(res[0].json.json().object.result.count !== 0){
          this.isDataFound = true;
          this.helpOffersList = res[0].json.json().object;
        }
        else{
          this.isDataFound = false;
        }
        
      } else {
        this.global_service.logout();
      }
    }, err => {
      this.loader = false;
      if (err[0].json().status_code !== 401) {
        this.global_service.logout();
      }
      this.global_service.consoleFun(err);
    })
  }
  
 /* deleteHelpOfferById(id){

    this.loader = true;
    let obj = {id:id,token:this.global_service.userInfo.token}
    const url = this.global_service.basePath + 'admin/skills/users/delete';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      this.global_service.consoleFun(res[0].json.json());
      this.getHelpOfferList(this.value);
    }, 
    err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }*/
  
  paginate(event){
    this.value = event.page + 1;
    if (event.page > 0) { 
      this.indexValue = 10 * event.page +1; 
    }
    else{
        this.indexValue=1;
    }
    this.getHelpOfferList(this.value);
  }

  gotoEditHelpOfferByID(id){
    this.router.navigateByUrl("/dashboard/edit-help-offer/" + id)
  }

  gotoAddHelpOffer(){
    this.router.navigateByUrl("/dashboard/add-help-offer");
  }

}
