  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

// import { GlobalService } from './../GlobalService';
  import { EqualValidator } from './../../../Directives/validation.directive';
  import { GlobalService } from './../../../GlobalService';

  @Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
  })
  export class ViewUserComponent implements OnInit {

    loader:boolean = false;
    usersList: any;
    value = 1;
    isDataFound : boolean = false;
    display:boolean = false;
    resetPasswordForm:FormGroup;
    disableMultipleSave:boolean = false;
    validateFields:boolean = false;
    userId:any;
    indexValue:number=1;

    constructor(public global_service: GlobalService,public router: Router, public fb:FormBuilder,) {}

    ngOnInit() {
      this.getUserList(this.value);
      this.formInitialization();
    }

    formInitialization(){
        this.resetPasswordForm = this.fb.group({
          userId:['',[]],
          oldPassword:['',[Validators.required]],   
          newPassword:['',[Validators.required]],   
          confirmPassword:['',[Validators.required]],
          token:[this.global_service.userInfo.token,[]]
        })
      }

    getUserList(value) {

      this.loader = true;
      let obj = {page_number:value,token:this.global_service.userInfo.token}
      
      const url = this.global_service.basePath + 'admin/users/list';
      this.global_service.PostRequest(url,obj)

      .subscribe(res => {
          this.loader = false;
          if(res[0].json.json().object.result.count !== 0){
            this.usersList = res[0].json.json().object;
            this.isDataFound = true;
          }
          else{
            this.isDataFound = false;
          }
          
        }, err => {
          this.loader = false;
          this.global_service.consoleFun(err);
      })
    }
    
    deleteUserById(id){

      this.loader = true;
      let obj = {id:id,token:this.global_service.userInfo.token}
      
      const url = this.global_service.basePath + 'admin/skills/users/delete';

      this.global_service.PostRequest(url,obj)
      .subscribe(res => {
        this.loader = false;
        // this.global_service.consoleFun(res[0].json.json());
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

    gotoAddUser(){
      this.router.navigateByUrl("dashboard/add-user");
    }

    gotoEditUser(id){
      this.router.navigateByUrl("dashboard/edit-user/" + id);
    }

    resetPassword(id){
      this.display = true;
      this.userId = id;
    }

    resetPasswordOfUser(){
     this.global_service.consoleFun(this.resetPasswordForm.value);
     if(this.global_service.isFormValid(this.resetPasswordForm)){ 
       this.disableMultipleSave = true;
       const url = this.global_service.basePath + 'admin/users/reset/password';
           this.resetPasswordForm.value.oldPassword = window.btoa(this.resetPasswordForm.value.oldPassword); // for encrypt/decrypt password
           this.resetPasswordForm.value.newPassword = window.btoa(this.resetPasswordForm.value.newPassword); // for encrypt/decrypt password
           this.resetPasswordForm.value.confirmPassword = window.btoa(this.resetPasswordForm.value.confirmPassword); // for encrypt/decrypt password
           this.resetPasswordForm.value.userId = this.userId;
           this.global_service.PostRequest(url,this.resetPasswordForm.value)
            .subscribe(res => {
              if (res[0].json.json().error && res[0].json.json().error.object){
              // this.global_service.showNotifications('success', 'Done' ,res[0].json.json().error.object);
                 this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
                }  
                else {
                  // this.global_service.showNotifications('success', 'Done' ,"Added Successfully");
                this.global_service.showNotification('top','right',"Password Reset Successfully",2,'ti-check');
                this.router.navigateByUrl("dashboard/view-user");
                this.formInitialization();
              }
              this.disableMultipleSave = false;
              this.display = false;
              this.resetPasswordForm.reset();
              }, 
              err => {
              this.disableMultipleSave = false;
              // this.loader = false;
              // this.global_service.consoleFun(err);
              })
            }
      else{
        this.validateFields = true;
        this.resetPasswordForm.reset();
      }
    }

   closePopUp(){
     this.validateFields = false;
     this.display = false;
     this.formInitialization();
     this.resetPasswordForm.reset();
   } 
  }
