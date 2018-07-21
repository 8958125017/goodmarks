import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

// import { GlobalService } from './../GlobalService';
import { EqualValidator } from './../../../Directives/validation.directive';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loader:boolean = false;
  addResetForm:FormGroup;	
  UserRole:number = 1;
  employeeListArray: Array < any > = [];
  pumpListArray: Array < any > = [];
  display:boolean = true;

  constructor(public _fb:FormBuilder) { }

  ngOnInit() {
   /* if(this.global_service.user_type==1)
  	{
      this.getEmployeeList();
    }
    if (this.global_service.user_type==2) {
      this.getPumpList();
    }*/
  	this.formInitilization();
  }

  formInitilization(){
    this.addResetForm = this._fb.group({
      oldPassword:['',[Validators.required]],   
  	  newPassword:['',[Validators.required]],   
      ConfirmPassword:['',[Validators.required]]
    })
  }

 /*For Admin*/

 /* getEmployeeList() {
    this.loader = true;
    // const url = this.global_service.base_path + 'api/wnt/User/ViewAllUser';
    const url = this.global_service.base_path + 'api/wnt/pump/ViewEmployeeByPumpId/' + this.global_service.user_info.PumpID;
    this.global_service.GetRequest(url).subscribe(res => {
      this.loader = false;
      if(res[0].status !== 204)
        {
          this.employeeListArray = res[0].json.data.Data;
        }
      else
        this.employeeListArray = [];
      },
      err => {
      this.loader = false;
      console.log(err);
    })
  }
*/
  /* for SuperADmin*/

   /*getPumpList(){
    this.loader = true;
    const url = this.global_service.base_path + 'api/wnt/Pump/ViewAllPump';

    this.global_service.GetRequest(url)
      .subscribe(res => {
        this.loader = false;
        console.log(res,'Pump list');
        if(res[0].status !== 204)
           this.pumpListArray = res[0].json.data;
        else
          this.pumpListArray = [];
      },
      err => {
        this.loader = false;
        console.log(err);
      })
  }
*//*
  ResetPassword(){
    // this.loader = true;
    console.log(this.addResetForm.value)
  	let url = this.global_service.base_path +  "api/wnt/User/ResetUserPassword";
    
  	this.global_service.PostRequest(url, this.addResetForm.value)
      .subscribe(res=>{
        this.loader = false;
        this.addResetForm.reset();
        this.formInitilization();
        // this.global_service.popToast('success', 'Done' ,'Password Updated Sucessfully !');
  		  console.log(res);
      },
      err => {
      	this.addResetForm.reset();
        this.formInitilization();
        // this.global_service.popToast('error', 'Please Wait !' , err.json().message || 'something went wrong, please try again lates !');
        this.loader = false;
        console.log(err);
      });
  }*/

}
