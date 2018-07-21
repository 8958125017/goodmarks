  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators} from '@angular/forms';
  import { Router } from  '@angular/router';

  import { GlobalService } from '../GlobalService';

  declare var $:any;

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loader: boolean= false;
    is_login_email: boolean;
    public user;
    sub: any;
    subscription:boolean=true;
    display:boolean = false;
    forgotPasswordForm: FormGroup;
    disableMultipleSave:boolean = false;
    validateFields:boolean = false;

    constructor(public fb: FormBuilder, public global_service: GlobalService, public router: Router ) {
      localStorage.clear();
     }

    ngOnInit() {
     this.formInitialization();
    }

    formInitialization(){
     this.loginForm = this. fb.group({
      email: ['',[Validators.required]],
      password: ['', [Validators.required]]
     }),
      this.forgotPasswordForm = this.fb.group({
          email:['',[]]
        })
    }

    login(){

     this.loader = true;
      
      const url = this.global_service.basePath + 'admin/login';
      this.loginForm.value.password = window.btoa(this.loginForm.value.password); // for encrypt/decrypt password
      this.global_service.PostRequestUnautorized(url , this.loginForm.value)
        .subscribe(res => {
          this.loader = false;
          this.global_service.consoleFun(res[0].json.object, res);
          this.loginForm.reset();

          /*Save Logged in user Data in the Localstorage for later use*/
          if(res[0].json.object){
            localStorage.setItem('userInfo', JSON.stringify(res[0].json.object))
           /* localStorage.setItem('token', res[0].json.access_token)*/
          }

          if (res[0].json.status_code == 200){ 
             this.global_service.showNotification('top','right','Login Successfully',2,'ti-check');
          }
          else {
             this.global_service.showNotification('top','right',res[0].json.error.object,4,'ti-cross');   
          }

          /*for Global setting of user role*/
          this.global_service.loggedInVar = true;
          this.global_service.loggedInObs.next(this.global_service.loggedInVar);
          
          /*Redirect on the View-User*/
          this.router.navigateByUrl('/dashboard/view-user');

        },
        err => {
          this.loader = false;
          this.global_service.consoleFun(err, err.json().msg);
     
          this.loginForm.reset();
        })
    }

    gotoForgotPassword(){
      this.display = true;
    }

    forgotPasswordOfUser(){
     if(this.global_service.isFormValid(this.forgotPasswordForm)){ 
       this.disableMultipleSave = true;
       const url = this.global_service.basePath + 'admin/forget/password';
           this.global_service.PostRequest(url,this.forgotPasswordForm.value)
            .subscribe(res => {
              if (res[0].json.json().error && res[0].json.json().error.object){
              // this.global_service.showNotifications('success', 'Done' ,res[0].json.json().error.object);
                 this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
                }  
                else {
                  // this.global_service.showNotifications('success', 'Done' ,"Added Successfully");
                this.global_service.showNotification('top','right',"Email Sent Successfully",2,'ti-check');
                this.router.navigateByUrl("dashboard/view-user");
                this.formInitialization();
              }
              this.disableMultipleSave = false;
              this.display = false;
              this.forgotPasswordForm.reset();
              }, 
              err => {
              this.disableMultipleSave = false;
              // this.loader = false;
              // this.global_service.consoleFun(err);
              })
            }
      else{
        this.validateFields = true;
      }
    }

    closePopUp(){
     this.validateFields = false;
     this.display = false;
     this.formInitialization();
     this.forgotPasswordForm.reset();
   } 

  }