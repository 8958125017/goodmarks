import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-view-positivity',
  templateUrl: './view-positivity.component.html',
  styleUrls: ['./view-positivity.component.css']
})
export class ViewPositivityComponent implements OnInit {

  loader:boolean =false;
  positivityListData: any;
  value = 1;
  isDataFound : boolean = false;
  indexValue:number=1;
  constructor(public global_service: GlobalService,public router: Router) {}

  ngOnInit() {
    this.getPositivityList(this.value);
  }

  getPositivityList(value) {
    this.loader = true;
    let obj = {page_number:value,token:this.global_service.userInfo.token}
    
    const url = this.global_service.basePath + 'admin/positivity/list';
    this.global_service.PostRequest(url,obj).subscribe(res => {
      this.loader = false;
      this.global_service.consoleFun(res[0].json.json());
      if (res[0].json.json().status_code == 401) { 
        this.router.navigateByUrl('/login');
      } else {
      if(res[0].json.json().object.result.count !== 0){
        this.positivityListData = res[0].json.json().object;
        this.isDataFound = true;
      }
      else{
        this.isDataFound = false;
      }
      }
    }, 
    err => {
      this.loader = false;
      this.global_service.consoleFun(err);
    })
  }
  
  /*Delete Positivity By ID*/
  deletePositivityById(id){

    this.loader = true;
    let obj = {id:id,token:this.global_service.userInfo.token}
    
    const url = this.global_service.basePath + 'admin/skills/users/delete';

    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.loader = false;
      this.global_service.consoleFun(res[0].json.json());
      this.getPositivityList(this.value);
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
    this.getPositivityList(this.value);
  }

  gotoAddPositivityReq(){
    this.router.navigateByUrl('/dashboard/add-positivity-requests');
  }

  EditPositivityRequest(value){
    this.router.navigateByUrl('/dashboard/edit-positivity-requests/' + value);
  }

}
