import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';

@Component({
  selector: 'app-add-sos',
  templateUrl: './add-sos.component.html',
  styleUrls: ['./add-sos.component.css']
})
export class AddSosComponent implements OnInit {

  addSosForm:FormGroup;
  authorDataArray: any;
  loader: boolean = false;
  countryCode: any;
  countrycode:any;
  phoneNo: any;
  userId : any;
  validateForm:boolean = false;
  disableMultipleSave:boolean = false;

  constructor(public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

  ngOnInit() {
    this.formInitialization();
    this.getAuthorName();
    this.getCountryCode();
    // this.countrycode = -1;
  }

  formInitialization(){
    this.addSosForm = this.fb.group({
      country_code:['',Validators.required],
      userId:['',[Validators.required]],
      name:['',[Validators.required]],
      phn_no:['',[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
      token:[this.global_service.userInfo.token,[]]
    })

  }

   /*Get User List*/
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

  // Get Country Code
  getCountryCode() {
  
    let obj = { token: this.global_service.userInfo.token }
    const url = 'assets/CountryCode/countrycode.json';

    this.global_service.GetRequest(url)
      .subscribe(res => {
        this.countryCode = res[0].json;
        // this.userId = this.countryCode.code;
        this.global_service.consoleFun("Country Code", this.countryCode);
      }, 
      err => {
          this.global_service.consoleFun(err);
      })
  }

  

/*Add Positivity*/
   addSos(){
 
      const url = this.global_service.basePath + 'admin/sos/add';
      if (this.addSosForm.valid) { 
        this.disableMultipleSave = true;
        // this.addSosForm.controls.phn_no.setValue(this.countrycode + this.phoneNo);
        this.global_service.consoleFun(this.countrycode + this.phoneNo);

          this.global_service.PostRequest(url,this.addSosForm.value)
          .subscribe(res => {
          if (res[0].json.json().error && res[0].json.json().error.object) {
           this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
          }
          else{
            this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
            this.router.navigateByUrl("dashboard/view-sos");
           }
           this.countrycode = -1;
           this.formInitialization();
           this.disableMultipleSave = false;
          }, 
          err => {
            // this.loader = false;
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
