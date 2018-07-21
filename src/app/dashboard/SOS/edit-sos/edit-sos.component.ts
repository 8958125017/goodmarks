import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';


@Component({
  selector: 'app-edit-sos',
  templateUrl: './edit-sos.component.html',
  styleUrls: ['./edit-sos.component.css']
})
export class EditSosComponent implements OnInit {

  sosId:any;
  SosData:any;
  editSosForm:FormGroup;
  disableEdit:boolean = false;
  authorDataArray: any;
  countryCode: any;
  countrycode:any;
  phoneNo: any;
  validateForm:boolean = false;
  disableMultipleSave:boolean = false;

  constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

  ngOnInit() {
    this.getAuthorName();
    this.getCountryCode();
    this.activatedroute.params.subscribe((params: Params) => {
      this.sosId = params['id'];
      this.global_service.consoleFun(this.sosId);
        this.getsosuestById(this.sosId); 
        // this.formInitialization();
    });
  }

  formInitialization(){
    this.editSosForm = this.fb.group({
      user_id:[this.SosData.user_id,[Validators.required]],
      name:[this.SosData.name,[Validators.required]],
      phn_no:[this.SosData.phn_no,[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
      country_code:[this.SosData.country_code,[Validators.required]],
      // status:[,[]],
      id:[this.SosData.id,[]],
      token:[this.global_service.userInfo.token,[]]
    })

  }
 
 /*Get User Data*/
  getAuthorName() {
   
    let obj = { token: this.global_service.userInfo.token }
  
    const url = this.global_service.basePath + 'admin/users/list/admin';

    this.global_service.PostRequest(url, obj)
      .subscribe(res => {
        this.authorDataArray = res[0].json.json().object;
        this.global_service.consoleFun("get user data", this.authorDataArray);
      }, 
      err => {
        
        this.global_service.consoleFun(err);
      })
  } 

/*Get positivity information By ID*/
  getsosuestById(id){

    let obj = {token:this.global_service.userInfo.token,id:id}
    
    const url = this.global_service.basePath + 'admin/sos/edit';

    this.global_service.PostRequest(url,obj)
      .subscribe(res => {
        this.global_service.consoleFun(res[0].json.json());
        this.SosData = res[0].json.json().object[0];
        // this.global_service.consoleFun(this.sosData + "reavhvh" + typeof(this.sosData));
        this.formInitialization();
        this.disableEdit = true;
      }, 
      err => {
        // this.loader = false;
        this.global_service.consoleFun(err);
      })
  }

  /*Get Country Code*/
   getCountryCode() {
  
    let obj = { token: this.global_service.userInfo.token }
  
    const url = './../assets/CountryCode/countrycode.json';

    this.global_service.GetRequest(url)
      .subscribe(res => {
        this.countryCode = res[0].json;
        this.global_service.consoleFun("Country Code", this.countryCode);
      }, 
      err => {
          this.global_service.consoleFun(err);
      })
  }

/*Update Positivity By ID*/
  updateSos(id){

    if(this.global_service.isFormValid(this.editSosForm)){
      this.disableMultipleSave = true;
      const url = this.global_service.basePath + 'admin/sos/update';
    
        this.global_service.PostRequest(url,this.editSosForm.value)
          .subscribe(res => {
            this.global_service.consoleFun(res[0].json.json());
            this.SosData = res[0].json.json().object[0];
            if (res[0].json.json().error && res[0].json.json().error.object) {
             this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
            }
            else{
              this.global_service.showNotification('top','right',"Updated Successfully",2,'ti-check');
              this.router.navigateByUrl("dashboard/view-sos");
              this.disableEdit = true;
              // this.formInitialization();
            } 
            this.disableMultipleSave = false;
          }, 
          err => {
            this.disableMultipleSave = false;
            this.global_service.consoleFun(err);
          })
        }
      else{
        this.validateForm = true;
this.global_service.scrollBar();
this.global_service.scrollBar();
      }  
    }

}
