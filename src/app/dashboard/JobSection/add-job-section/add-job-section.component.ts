import { Component, OnInit, } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

import { GlobalService } from './../../../GlobalService';



@Component({
	selector: 'app-add-job-section',
	templateUrl: './add-job-section.component.html',
	styleUrls: ['./add-job-section.component.css'],
})

export class AddJobSectionComponent implements OnInit {

	addjobSectionForm:FormGroup;
	disableSaveButton:boolean = false;
	skillsData: any=[];
	customSkillArray:any=[];
	selectedSkill: string[] = [];
	authorDataArray:any;
	loader:boolean =false;
	jobSectionData:any;
	needbydate:Date;
	author:any;
	val1:any;
	imageUrl:any = [];
	jobSectionForm:FormGroup;
	assignedDataArray:any;
	date :any;
	minDate:Date;
	authorsName:any;
	authorsNameAssignTo:any;
	AssignTo:any;
	validateFields: boolean = false;
    disableMultipleSave: boolean = false;
    currentYear:any;
	lastYear:any;

	constructor(public global_service:GlobalService, public router:Router, public fb:FormBuilder, public date_pipe:DatePipe ) {}

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


	ngOnInit() {
        this.getAuthorName();
		this.getSkillsList();
		this.formInitialization();
		this.author = "";
		this.AssignTo = "";
		let today = new Date();
		let month = today.getMonth();
        let year = today.getFullYear();
		let prevMonth = (month === 0) ? 11 : month;
        this.minDate = new Date();
		this.minDate.setMonth(prevMonth);
		this.currentYear=year.toString();
		this.lastYear = this.currentYear;
	}

   
 	addMultipleImage(){
 		// this.global_service.consoleFun(this.uploader.getNotUploadedItems().length, this.uploader.getNotUploadedItems());
 		this.uploader.uploadAll();
 		this.uploader.onCompleteItem = (item, response, status, header) => {
			this.imageUrl.push(JSON.parse(response).object.image);
		}
 	}

	formInitialization(){
		this.addjobSectionForm = this.fb.group({
			author_id:['',[Validators.required]],
			title:['',[Validators.required]],
			difficulty:['',[Validators.required]],
			skills:['',[Validators.required]],
			assigned_to :['',[Validators.required]],
			need_by:['',[]],
			help_type:['',[Validators.required]],
			desc:['',[Validators.required]],
			token:[this.global_service.userInfo.token,[]],
			images: ['',[]],
		});     
	}

	/*Kunvar singh- For changing the dropdown values accoording to author selection*/
	 onChange(selectedItemName) {
	     this.remove(this.authorDataArray,selectedItemName);
	 }

   remove(array, element) {
      let newArray: any = []; //create local array for dropdown manupulation in assignTo
      array.forEach((item) => {
         newArray.push(Object.assign({}, item));
       });
     newArray.filter(function(item,index){
	   if(item.id==element){
	    newArray.splice(index, 1);
	   }
	  });
	  this.authorsNameAssignTo = newArray;
    }

	/*Get Skill List*/
	getSkillsList() {

		// this.loader = true;

		let obj = {token:this.global_service.userInfo.token};

		const url = this.global_service.basePath + 'admin/skill/list';

		this.global_service.PostRequest(url,obj)
		.subscribe(res => {
			// this.loader = false;
			this.global_service.consoleFun(res[0].json.json());   
			this.skillsData = res[0].json.json().object.skills;
			for(let i=0 ; i < this.skillsData.length; i++)
			{
				this.customSkillArray.push({label:this.skillsData[i].name,value:this.skillsData[i].id});
			}
		}, 
		err => {
			this.loader = false;
			this.global_service.consoleFun(err);
		})
	}

	/*Get User List*/
	getAuthorName() {

		let obj = { token: this.global_service.userInfo.token }

		const url = this.global_service.basePath + 'admin/users/list/admin';

		this.global_service.PostRequest(url, obj)
		.subscribe(res => {
			this.authorDataArray = res[0].json.json().object;
            this.authorsName = this.authorDataArray;
		}, 
		err => {
			this.global_service.consoleFun(err);
		})
	}

    /* For transforming Date*/
    showDate(){
        this.date = this.date_pipe.transform(this.needbydate, 'yyyy-MM-dd');
    }

	/*Add Jobsection*/
	addjobSection(id){

		if(this.global_service.isFormValid(this.addjobSectionForm) && (this.imageUrl.length > 0) && this.date) { 
			this.disableMultipleSave = true;
			const url = this.global_service.basePath + 'admin/job/add';
			this.addjobSectionForm.controls.need_by.setValue(this.date);
			this.addjobSectionForm.controls['images'].setValue(this.imageUrl);
			this.global_service.PostRequest(url,this.addjobSectionForm.value)
			.subscribe(res => {
				if (res[0].json.json().error && res[0].json.json().error.object){
					// this.global_service.showNotifications('success', 'Done' ,res[0].json.json().error.object);
	        	 this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
	        	}	
	        	else {
	        		// this.global_service.showNotifications('success', 'Done' ,"Added Successfully");
				 this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
	             this.router.navigateByUrl("dashboard/view-job-section");
				 this.formInitialization();
				}
				this.loader = false;
				this.disableMultipleSave = false;
			}, 
			err => {
				this.disableMultipleSave = false;
				// this.loader = false;
				// this.global_service.consoleFun(err);
			})
		} 
		else {
			this.validateFields = true;
			this.global_service.scrollBar();
		}
	}
}



