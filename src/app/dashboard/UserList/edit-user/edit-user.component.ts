import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../../../GlobalService';
import { FileUploader } from 'ng2-file-upload';
import { DatePipe } from '@angular/common';

declare var $:any;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  UserListId:any;
  UserListData:any;
  editUserForm:FormGroup;
  disableEdit:boolean = false;
  imgSrc:any;
  loader:boolean = false;
  needbydate:any;
  image: boolean = true;
  saveClicked:boolean =false;
  imageClickByUser: boolean =false;
  disableMultipleSave:boolean = false;
  validateFields:boolean = false;
  maxDate:Date;
  date:any;
  currentYear:string;
  lastYear:string;
  new_user_image:any ;
  countryCode: any[]=[];
  countrycode:any;
  currentSeletedDate:string;
  changedDateCompletion:boolean=false;
  notificationArray: Array<any> = [
          // {key:"Allow Notification",value:"allow_notification",checked:false},
          // {key:"Allow like notification",value:"allow_like_notification",checked:false},
          // {key:"New Message",value:"new_message",checked:false},
          // {key:"New Connection",value:"new_connection",checked:false},
          // {key:"Friend Joined",value:"friend_joined",checked:false},
          // {key:"Message Due Date",value:"message_due_date",checked:false},
          // {key:"Reminder End Project",value:"reminder_end_project",checked:false},
          // {key:"Filter following",value:"filter_following",checked:false},
          // {key:"Filter follower",value:"filter_follower",checked:false},
          // {key:"Enable Push Notifications",value:"enable_push_notifications",checked:false},
          // {key:"Notification Message",value:"notification_message",checked:false},
          {key:"Status",value:"status",checked:false},
  ];

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
  constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, 
    public router:Router, public fb:FormBuilder, public date_pipe:DatePipe) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((params: Params) => {
      this.UserListId = params['id'];
      this.getUserListById(this.UserListId); 
      this.getCountryCode();
    });

   this.maxDate = new Date();
   let today = new Date();
   let month = today.getMonth();
   let year = today.getFullYear();
   this.lastYear ='0';
   this.currentYear=year.toString();
   let nextMonth = (month === 11) ? 0 : month + 1;
   let nextYear = (nextMonth === 0) ? year + 1 : year;
  this.maxDate.setMonth(month);
  this.maxDate.setFullYear(year);

  }

  public uploader:FileUploader = new FileUploader({url: this.global_service.imageUpload});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
   
    ngAfterViewInit() {
        this.uploader.onAfterAddingFile = (item => {
         item.withCredentials = false;
      });
    }



  formInitialization(){
    this.editUserForm = this.fb.group({
      // author_id:['',[]],
      first_name:[this.UserListData.first_name,[Validators.required]],
      last_name:[this.UserListData.last_name,[Validators.required]],
      new_image:['',[]],
      old_image:[this.UserListData.photo_url,[]],
      phone_number:[this.UserListData.phone_number,[Validators.required]],
      // photo_url:['',[]],
      email:[this.UserListData.email,[Validators.required]],
      birthdate:['',[]],
      college:[this.UserListData.college,[]],
      // textValid:['',[Validators.required]],
      // password:[this.UserListData.password,[]],
      // code:[this.UserListData.code,[]],
      question:[this.UserListData.question,[]],
      latitude:[this.UserListData.latitude,[]],
      longitude:[this.UserListData.longitude,[]],
      difficulty:[this.UserListData.difficulty,[]],
      number:[this.UserListData.number,[]],
      interval:[this.UserListData.interval,[]],
      zip:[this.UserListData._zip,[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
      // authorization_id:['',[]],
      gratitude_privacy:[this.UserListData.gratitude_privacy,[]],
      // device:[this.UserListData.device_type,[]],
      distance:[this.UserListData.distance,[Validators.required]],
      desc:[this.UserListData.description,[Validators.required]],
      status:[this.UserListData.status,[]],
      id:[this.UserListData.id,[]],
      token:[this.global_service.userInfo.token,[]]
    })

  }

  // formInitialization(){
  //   this.editUserForm = this.fb.group({
  //     author_id:[this.UserListData.author_id,[]],
  //     first_name:[this.UserListData.first_name,[Validators.required]],
  //     last_name:[this.UserListData.last_name,[Validators.required]],
  //     new_image:['',[]],
  //     old_image:['',[]],
  //     phone_number:[this.UserListData.phone_number,[]],
  //     photo_url:[this.UserListData.photo_url,[]],
  //     email:[this.UserListData.email,[Validators.required]],
  //     birthdate:['',[]],
  //     college:[this.UserListData.college,[]],
  //     // password:[this.UserListData.password,[]],
  //     // code:[this.UserListData.code,[]],
  //     question:[this.UserListData.question,[]],
  //     // message_counter:['',[]],
  //     // notification_counter:['',[]],
  //     uid:[this.UserListData.uid,[]],
  //     facebook_id:[this.UserListData.facebook_id,[]],
  //     time_zone:[this.UserListData.time_zone,[]],
  //     latitude:[this.UserListData.latitude,[]],
  //     longitude:[this.UserListData.longitude,[]],
  //     difficulty:[this.UserListData.difficulty,[]],
  //     number:[this.UserListData.number,[]],
  //     interval:[this.UserListData.interval,[]],
  //     _zip:[this.UserListData._zip,[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
  //     authorization_id:[this.UserListData.authorization_id,[]],
  //     gratitude_privacy:[this.UserListData.gratitude_privacy,[]],
  //     device:[this.UserListData.device_type,[]],
  //     distance:[this.UserListData.distance,[Validators.required]],
  //     desc:[this.UserListData.description,[Validators.required]],
  //     status:[this.UserListData.status,[]],
  //     id:[this.UserListData.id,[]],
  //     enable_push_notifications:['',[]],
  //     notification_message:['',[]],
  //     allow_like_notification:['',[]],
  //     allow_notification:['',[]],
  //     new_message:['',[]],
  //     new_connection:['',[]],
  //     friend_joined:['',[]],
  //     message_due_date:['',[]],
  //     // desc:['',[]],
  //     reminder_end_project:[,[]],
  //     filter_follower:['',[]],
  //     filter_following:['',[]],
  //     token:[this.global_service.userInfo.token,[]]
  //   })

  // }
  
  showDate(){
    // this.currentSeletedDate = this.date_pipe.transform(this.birthdate, 'yyyy-MM-dd');
    this.date = this.date_pipe.transform(this.needbydate, 'yyyy-MM-dd');
    this.changedDateCompletion=true;
  }

    getCountryCode() {
  
    let obj = { token: this.global_service.userInfo.token }
    const url = 'assets/CountryCode/countrycode.json';

    this.global_service.GetRequest(url)
      .subscribe(res => {
        this.countryCode = res[0].json;
      }, 
      err => {
          console.log(err);
      })
  }

  getUserListById(id){

    let obj = {token:this.global_service.userInfo.token,id:id}
    
    const url = this.global_service.basePath + 'admin/users/edit';
    this.global_service.PostRequest(url,obj)
    .subscribe(res => {
      this.global_service.consoleFun(res[0].json.json());
      this.UserListData = res[0].json.json().object[0];
      for(let i = 0; i < this.notificationArray.length ; i++){
        let abc = this.notificationArray[i].value;
        if(this.UserListData[abc]){
          this.notificationArray[i].checked = true;
        }
        else
          this.notificationArray[i].checked = false;
      }

      this.global_service.consoleFun(this.notificationArray,"info");
      
      this.needbydate = new Date(this.UserListData.birthdate);
      if (this.UserListData.photo_url) {
        this.imgSrc = this.UserListData.photo_url;
      }
      else{
        this.imgSrc = this.global_service.defaultUserImage;
      }
      this.disableEdit = true;
      this.formInitialization();
    }, 
    err => {
      this.global_service.consoleFun(err);
    })

  }
  
  

  updateUser(id){

    // if(!this.imageClickByUser){
    //   this.editUserForm.controls['old_image'].setValue(this.UserListData.old_image);
    // }
    this.editUserForm.controls['old_image'].setValue(this.UserListData.photo_url);
    let currentSelectedDate = this.changedDateCompletion ? this.date : (this.date_pipe.transform(this.needbydate, 'yyyy-MM-dd'));
    this.editUserForm.controls['birthdate'].setValue(this.needbydate);

    if(this.global_service.isFormValid(this.editUserForm)){ 
      this.disableMultipleSave = true;
      
     const url = this.global_service.basePath + 'admin/user/update';
       this.global_service.PostRequest(url,this.editUserForm.value)
       .subscribe(res => {
          if (res[0].json.json().error && res[0].json.json().error.object) {
           this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
          }
          else{
           this.disableMultipleSave = false;
           this.global_service.showNotification('top','right',"Updated Successfully",2,'ti-check');
           this.router.navigateByUrl("dashboard/view-user");
           this.formInitialization();
           this.disableEdit = true;
          }
       }, 
       err => {
         this.disableMultipleSave = false;
         this.global_service.consoleFun(err);
       })
     }
     else{
       this.validateFields = true;
       this.global_service.scrollBar();
     }
  }

  editImage(){
    $("#imageUrl").click();
  }

  readUrl(event) :any{
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (imagesrc:any) => {
        this.imgSrc = imagesrc.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  handleInputChange(e) {
    this.readUrl(event);
    this.imageClickByUser = true;

    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item, response, status, header) => {
      // this.imageUrl.push(JSON.parse(response).object.image);
      this.new_user_image = JSON.parse(response).object.image;
      this.editUserForm.controls.new_image.setValue(this.new_user_image);
      this.global_service.consoleFun(item,response);
    }
  }
    
}
