import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { GlobalService } from './../../../GlobalService';
import { DatePipe } from '@angular/common';

const URL = 'http://180.151.103.85:3015/api/admin/user/add';

declare var $:any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  positivityreqId:any;
  positivityReqData:any;
  addUserForm:FormGroup;
  disableEdit:boolean = false;
  loader:boolean = false;
  imageUrl:string='';
  imageClickByUser: boolean =false;
  disableMultipleSave:boolean = false;
  validateFields:boolean = false;
  userAddResponse:any;
  countryCode: any[]=[];
  countrycode:any;
  gratituePrivacy:any;
  date :any;
  minDate:Date;
  maxDate:Date;
  needbydate:Date;
  currentYear:string;
  lastYear:string;

  notificationArray: Array<any> = [
             // {key:"Allow Notification",value:"allow_notification",checked:0},
             // {key:"Allow like notification",value:"allow_like_notification",checked:0},
             // {key:"New Message",value:"new_message",checked:0},
             // {key:"New Connection",value:"new_connection",checked:0},
             // {key:"Friend Joined",value:"friend_joined",checked:0},
             // {key:"Message Due Date",value:"message_due_date",checked:0},
             // {key:"Reminder End Project",value:"reminder_end_project",checked:0},
             // {key:"Filter following",value:"filter_following",checked:0},
             // {key:"Filter follower",value:"filter_follower",checked:0},
             // {key:"Enable Push Notifications",value:"enable_push_notifications",checked:0},
             // {key:"Notification Message",value:"notification_message",checked:0},
             {key:"Status",value:"status",checked:0},
                                   ];
  birthdate:any;
 daysArray: Array<any> = [
  {key :1, value:1},
  {key :2, value:2},
  {key :3, value:3},
  {key :4, value:4},
  {key :5, value:5},
  {key :6, value:6},
  {key :7, value:7},
  {key :8, value:8},
  {key :9, value:9},
  {key :10, value:10},
  {key :12, value:12},
  {key :13, value:13},
  {key :14, value:14},
  {key :15, value:15},
  {key :16, value:16},
  {key :17, value:17},
  {key :18, value:18},
  {key :19, value:19},
  {key :20, value:22},
  {key :21, value:21},
  {key :22, value:22},
  {key :23, value:23},
  {key :24, value:24},
  {key :25, value:25},
  {key :26, value:26},
  {key :27, value:27},
  {key :28, value:28},
  {key :29, value:29},
  {key :30, value:30},
  {key :31, value:31}
];
  constructor(public global_service:GlobalService, public router:Router, public fb:FormBuilder,public date_pipe:DatePipe ) {
     
 }

  ngOnInit() {
   this.formInitialization();
   this.imageUrl=this.global_service.defaultUserImage;
   this.gratituePrivacy =-1;
   this.countrycode = -1;
   this.getCountryCode();

   this.maxDate = new Date();
   let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
   let nextMonth = (month === 11) ? 0 : month + 1;
   let nextYear = (nextMonth === 0) ? year + 1 : year;
  this.maxDate.setMonth(month);
  this.maxDate.setFullYear(year);
  this.lastYear ='0';
  this.currentYear=year.toString();
  }

  formInitialization(){
    this.addUserForm = this.fb.group({
      author_id:['',[]],
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      password:['',[Validators.required]],
      // textValid:['',[Validators.required]],
      phone_number:['',[Validators.required, Validators.pattern(this.global_service.numberOnly)]],
      photo_url:['',[]],
      email:['',[Validators.required]],
      birthdate:['',[Validators.required]],
      college:['',[]],
      code:['',[Validators.pattern(this.global_service.numberOnly)]],
      question:['',[]],
      // message_counter:['',[]],
      // notification_counter:['',[]],
      uid:['',[]],
      facebook_id:['',[]],
      time_zone:['',[]],
      latitude:['',[Validators.pattern(this.global_service.numberOnly)]],
      longitude:['',[Validators.pattern(this.global_service.numberOnly)]],
      difficulty:['',[]],
      number:['',[]],
      interval:['',[]],
      zip:['',[Validators.required, Validators.pattern(this.global_service.numberOnly)]],
      authorization_id:['',[]],
      gratitude_privacy:['',[]],
      device:['',[]],
      distance:['',[Validators.pattern(this.global_service.numberOnly)]],
      desc:['',[Validators.required]],
      status:['',[]],
      id:['',[]],
      enable_push_notifications:[0,[]],
      notification_message:[0,[]],
      allow_like_notification:[0,[]],
      allow_notification:[0,[]],
      new_message:[0,[]],
      new_connection:[0,[]],
      friend_joined:[0,[]],
      message_due_date:[0,[]],
      // desc:[0,[]],
      reminder_end_project:[,[]],
      filter_follower:[0,[]],
      filter_following:[0,[]],
      token:[this.global_service.userInfo.token,[]]
    })

  }
  
   showDate(){
        this.date = this.date_pipe.transform(this.needbydate, 'yyyy-MM-dd');
    }

    // Get Country Code
  getCountryCode() {
  
    let obj = { token: this.global_service.userInfo.token }
    const url = 'assets/CountryCode/countrycode.json';
    // const url ="http://country.io/phone.json";

    this.global_service.GetRequest(url)
      .subscribe(res => {
        this.countryCode = res[0].json;
        // for(let i=0;i<res[0].json.length;i++){
        //   debugger;
        //  this.countryCode.push({code:res[0].json[i]});
        // }
        // this.userId = this.countryCode.code;
        this.global_service.consoleFun("Country Code", this.countryCode);
      }, 
      err => {
          this.global_service.consoleFun(err);
      })
  }

  public uploader:FileUploader = new FileUploader({url:URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
   
    ngAfterViewInit() {
        this.uploader.queue = [];
        this.uploader.onAfterAddingFile = (item => {
         item.withCredentials = false;
      });
        
    }

    setFormData(formData){
      formData.append('token', this.global_service.userInfo.token);
      formData.append('first_name', this.addUserForm.controls['first_name'].value,);
      formData.append('last_name', this.addUserForm.controls['last_name'].value,);
      formData.append('desc', this.addUserForm.controls['desc'].value,);
      formData.append('email', this.addUserForm.controls['email'].value,);
      formData.append('birthdate', this.date_pipe.transform(this.needbydate, 'yyyy-MM-dd'),);
      formData.append('phone_number',this.addUserForm.controls['phone_number'].value,);
      formData.append('question', this.addUserForm.controls['question'].value,);
      formData.append('college', this.addUserForm.controls['college'].value,);
      formData.append('password', window.btoa(this.addUserForm.controls['password'].value),);
      // formData.append('message_counter', this.addUserForm.controls['message_counter'].value,);
      // formData.append('notification_counter', this.addUserForm.controls['notification_counter'].value,);
      formData.append('distance', this.addUserForm.controls['distance'].value,);
      formData.append('latitude', this.addUserForm.controls['latitude'].value,);
      formData.append('longitude', this.addUserForm.controls['longitude'].value,);
      formData.append('difficulty', this.addUserForm.controls['difficulty'].value,);
      formData.append('gratitude_privacy', this.addUserForm.controls['gratitude_privacy'].value,);
      formData.append('number', this.addUserForm.controls['number'].value,);
      formData.append('interval', this.addUserForm.controls['interval'].value,);
      formData.append('zip', this.addUserForm.controls['zip'].value,);
      formData.append('status', this.addUserForm.controls['status'].value ? 1:0 ,);
      formData.append('image', '',);
    }

    addUser(){
      if (this.global_service.isFormValid(this.addUserForm)){
      this.global_service.consoleFun(this.addUserForm);

        if (!this.uploader.queue.length) { 
          const url = this.global_service.basePath + 'admin/user/add';

          return new Promise((resolve, reject) => {
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();

            this.setFormData(formData); //for setting the controls value

            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                this.global_service.consoleFun('status is 4');
                if (xhr.status === 200 || xhr.status === 201) {
                  this.userAddResponse = JSON.parse(xhr.response).object;
                if (JSON.parse(xhr.response).error && JSON.parse(xhr.response).error.object){
                 this.global_service.showNotification('top','right',JSON.parse(xhr.response).error.object,4,'ti-cross');
                }  
                else {
                 this.userAddResponse = JSON.parse(xhr.response).object;  
                 this.global_service.consoleFun(this.userAddResponse, 'IF xhr status is 200');
                 this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
                 this.router.navigateByUrl("dashboard/view-User");
                 this.formInitialization();
            }
                  resolve(xhr.response);
                  // this.router.navigateByUrl("dashboard/view-company");
                } else if (xhr.status !== 200 && xhr.status !== 201) {
                  this.global_service.consoleFun(xhr.response, 'else if xhr');
                  reject(xhr.response);
                }
              }
          }
          xhr.open('POST', url, true);
          xhr.send(formData);
          });
      }
      else {
      this.uploader.onBeforeUploadItem = (item: FileItem) => {
        item.withCredentials = false;

        this.uploader.options.additionalParameter = {
          first_name: this.addUserForm.controls['first_name'].value,
          last_name: this.addUserForm.controls['last_name'].value,
          desc:this.addUserForm.controls['desc'].value,
          email:this.addUserForm.controls['email'].value,
          birthdate: this.addUserForm.controls['birthdate'].value,
          phone_number: this.addUserForm.controls['phone_number'].value,
          question: this.addUserForm.controls['question'].value,
          college: this.addUserForm.controls['college'].value,
          // code: this.addUserForm.controls['code'].value,
          // image:this.addUserForm.controls['photo_url'].setValue(this.imageUrl),
          // message_counter: this.addUserForm.controls['message_counter'].value,
          password: window.btoa(this.addUserForm.controls['password'].value),
          distance: this.addUserForm.controls['distance'].value,
          latitude: this.addUserForm.controls['latitude'].value,
          longitude: this.addUserForm.controls['longitude'].value,
          difficulty: this.addUserForm.controls['difficulty'].value,
          gratitude_privacy: this.addUserForm.controls['gratitude_privacy'].value,
          number: this.addUserForm.controls['number'].value,
          interval: this.addUserForm.controls['interval'].value,
          zip: this.addUserForm.controls['zip'].value,
          token: this.global_service.userInfo.token
        };

         }
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item, response, status, header) => {
          this.global_service.consoleFun(response);
          if (JSON.parse(response).error && JSON.parse(response).error.object){
               this.global_service.showNotification('top','right',JSON.parse(response).error.object,4,'ti-cross');
              }  
              else {
                this.userAddResponse = JSON.parse(response).object;    
                this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
                this.router.navigateByUrl("dashboard/view-user");
                this.formInitialization();
          }
          this.loader = false;
        }
      }
    }  
    else{
       this.validateFields = true;
       this.global_service.scrollBar();
       // document.body.scrollTo(0,0);
       // $(window).scrollTop($(document).height());
       // window.scrollTo(0,0);
      }
    }

  // addUser() {
  //     if(this.addUserForm.valid) {
  //       this.loader = true;
  //       this.saveClicked =true;
  //        const url = this.global_service.basePath + 'admin/admin-users/add';
  //         this.global_service.PostRequest(url,this.addUserForm.value)
  //           .subscribe(res => {
  //             this.global_service.consoleFun(res[0].json.json());
  //             if (res[0].json.json().error && res[0].json.json().error.object) {
  //              this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross'); 
  //             }
  //             else{
  //               this.formInitialization();
  //               this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
  //               this.router.navigateByUrl("dashboard/view-User");
  //               this.loader = false;
  //             }
  //             window.scrollTo(0,0);
  //           }, 
  //           err => {
  //             this.global_service.consoleFun(err);
  //           },
  //           () =>{
  //           })
  //     }
  //     else {
  //       this.loader =true;
  //     }
  //  }

  addSkilledUser(){
   
    this.addUserForm.controls.allow_like_notification.setValue(1);
    this.global_service.consoleFun(this.addUserForm.value);

    // const url = this.global_service.basePath + 'admin/skills/users/add';

    // this.global_service.PostRequest(url,this.addUserForm.value)
    //   .subscribe(res => {
    //     this.global_service.consoleFun(res[0].json.json());
      // if (res[0].json.json().object.object) {
      //    this.global_service.showNotification('top','right',res[0].json.json().object.object,4,'ti-cross');
      //   }
      //   else{
      //     this.formInitialization();
      //     this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
      //     this.router.navigateByUrl("dashboard/view-skilled-User");
      //   } 
      
    //     this.formInitialization();
    //     // this.disableEdit = true;
    //     this.router.navigateByUrl("dashboard/view-User");
    //   }, 
    //   err => {
    //     // this.loader = false;
    //     this.global_service.consoleFun(err);
    //   })
  }

editImage(){
    $("#imageUrl").click();
  }


  readUrl(event) :any{
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (imagesrc:any) => {
        this.imageUrl = imagesrc.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

changeImage(event){ 
    this.readUrl(event);
    this.imageClickByUser = true;
  }

  clickCheckBox(){
       $('input[type=checkbox]').on("change",function(){
         // if (this.checked) {
         //  this.value = 1;
         // }
         // else{
         //   this.value = 0;
         // }
      this.value = (Number(this.checked));
    });
  }

}
