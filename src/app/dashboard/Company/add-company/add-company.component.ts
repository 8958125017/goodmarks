import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';

import { GlobalService } from './../../../GlobalService';

const URL = 'http://180.151.103.85:3015/api/admin/company/add';

declare var $:any;

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})

export class AddCompanyComponent implements OnInit {

	addCompanyForm:FormGroup;
	imageUrl:any = [];
	loader:boolean = false;   
	imagePath = "blue_user.png";
    url = "assets/images/" + this.imagePath;
    reader:any;
    target:EventTarget;
    imageThumNail: any ="assets/images/blue_user.png";
    employeeEnable:boolean = true;
    companyAddResponse:any;

    imageClickByUser: boolean =false;
    isAddCompanyClick : boolean = true;
    isAddEmployeeClick : boolean = false;
    items:Array<any>=[];
    employee:any;
    display: boolean = false;
    employeeName: any ='';
    employeesSkillList:any[]=[];
    employeeRole : any[] =[];
    empRole: any;
    UsersList:any;
    userImgSrc:any;
    employeeId:number;
    employeeIdandName:any;
    checkDuplicate:any;
    authorsArray:any;


	  private _disabledV:string = '0';
	  private disabled:boolean = false;
	 
	  private get disabledV():string {
	    return this._disabledV;
	  }
	 
	  private set disabledV(value:string) {
	    this._disabledV = value;
	    this.disabled = this._disabledV === '1';
	  }
	 
	  public selected(value:any):void {
	    this.global_service.consoleFun('Selected value is: ', value);
	  }
	 
	  public removed(value:any):void {
	    this.global_service.consoleFun('Removed value is: ', value);
	  }
	 
	  public typed(value:any):void {
	    this.global_service.consoleFun('New search input: ', value);
	  }
	 
	  public refreshValue(value:any):void {
	    this.value = value;
	  }


    public uploader:FileUploader = new FileUploader({url: URL});
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

	constructor(public global_service:GlobalService, public router:Router, public fb:FormBuilder) {
	
	}

	ngOnInit() {
		this.searchEmployees();
		this.formInitialization();
		this.employee = -1;
		this.getAuthorName();
	}

	formInitialization(){
		this.addCompanyForm = this.fb.group({
			companyName:['',[Validators.required]],
			phoneNumber:['',[Validators.required,Validators.pattern(this.global_service.numberOnly)]],
			companyAddress:['',[Validators.required]],
			basicInformation:['',[Validators.required]],
			accountType  :['',[Validators.required]],
			token:[this.global_service.userInfo.token,[]],
			image: ['',[]],
			authorId:['',[Validators.required]],
		});     
	}
    
	 /*Get User Data*/
  getAuthorName() {

    let obj = { token: this.global_service.userInfo.token };
    const url = this.global_service.basePath + 'admin/users/list/admin';

    this.global_service.PostRequest(url, obj)
    .subscribe(res => {
      this.authorsArray = res[0].json.json().object;
    }, 
    err => {
    })
  }

 	//for image fetching from this below:
    getUserImageById(id) {

	    let obj = {token:this.global_service.userInfo.token,id:id}
	    const url = this.global_service.basePath + 'admin/users/edit';
	    this.global_service.PostRequest(url,obj)
	    .subscribe(res => {
	      this.global_service.consoleFun(res[0].json.json());
	      this.UsersList = res[0].json.json().object[0];
	      if (this.UsersList.photo_url) {
	        this.userImgSrc = this.UsersList.photo_url;
	      }
	      else{
	        this.userImgSrc = this.global_service.defaultUserImage;
	      }
	    }, 
	    err => {
	      this.global_service.consoleFun(err);
	    })

  	}
	
	/*Get Skill List*/
    getSkillsList() {

	    this.loader = true;

	    let obj = {token:this.global_service.userInfo.token}
	    
	    const url = this.global_service.basePath + 'admin/skill/list';
	    this.global_service.PostRequest(url,obj)
	    .subscribe(res => {
	      this.loader = false;
	      this.global_service.consoleFun(res[0].json.json());
	      let localArray = res[0].json.json().object.skills;
	      for(let i=0 ; i < localArray.length; i++)
	      {
	        this.employeesSkillList.push({label:localArray[i].name,value:localArray[i].id});
	      }
	    }, 
	    err => {
	      this.loader = false;
	      this.global_service.consoleFun(err);
	    })
  	}

	/*Add Company*/
	addCompany(){
	    if (this.global_service.isFormValid(this.addCompanyForm)){ 
	    	if (!this.uploader.queue.length) { 
			    const url = this.global_service.basePath + 'admin/company/add';

			    return new Promise((resolve, reject) => {
			      const formData: any = new FormData();
			      const xhr = new XMLHttpRequest();

			      formData.append('token', this.global_service.userInfo.token);
			      formData.append('companyName', this.addCompanyForm.controls['companyName'].value,);
			      formData.append('phoneNumber', this.addCompanyForm.controls['phoneNumber'].value,);
			      formData.append('companyAddress', this.addCompanyForm.controls['companyAddress'].value,);
			      formData.append('basicInformation', this.addCompanyForm.controls['basicInformation'].value,);
			      formData.append('accountType', this.addCompanyForm.controls['accountType'].value,);
			      formData.append('authorId', this.addCompanyForm.controls['authorId'].value,);
			      xhr.onreadystatechange = () => {
			        if (xhr.readyState === 4) {
			          this.global_service.consoleFun('status is 4');
			          if (xhr.status === 200 || xhr.status === 201) {
			          	this.companyAddResponse = JSON.parse(xhr.response).object;
				        if (JSON.parse(xhr.response).error && JSON.parse(xhr.response).error.object){
			        	 this.global_service.showNotification('top','right',JSON.parse(xhr.response).error.object,4,'ti-cross');
			        	}	
			        	else {
			        	 this.companyAddResponse = JSON.parse(xhr.response).object;	
				         this.global_service.consoleFun(this.companyAddResponse, 'IF xhr status is 200');
				         this.formInitialization();
				         this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
				         this.employeeEnable = false;
				         this.isAddEmployeeClick =true;
				         this.url=this.global_service.defaultUserImage;
			             // this.router.navigateByUrl("dashboard/view-company");
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
				companyName:this.addCompanyForm.controls['companyName'].value,
				phoneNumber:this.addCompanyForm.controls['phoneNumber'].value,
				companyAddress:this.addCompanyForm.controls['companyAddress'].value,
				basicInformation:this.addCompanyForm.controls['basicInformation'].value,
				accountType  :this.addCompanyForm.controls['accountType'].value,
				token: this.global_service.userInfo.token,
				authorId : this.addCompanyForm.controls['authorId'].value,
	   			};
	   		}
			this.uploader.uploadAll();
			this.uploader.onCompleteItem = (item, response, status, header) => {
					this.global_service.consoleFun(response);
					if (JSON.parse(response).error && JSON.parse(response).error.object){
		        	 this.global_service.showNotification('top','right',JSON.parse(response).error.object,4,'ti-cross');
		        	}	
		        	else {
		        	 this.companyAddResponse = JSON.parse(response).object;		
					 this.global_service.showNotification('top','right',"Added Successfully",2,'ti-check');
		             this.employeeEnable = false;
				     this.isAddEmployeeClick =true;
				     this.url=this.global_service.defaultUserImage;
		             // this.router.navigateByUrl("dashboard/view-company");
					}
					this.loader = false;
					this.formInitialization();
					this.employeeEnable = false;
				}
			}
		}	
    	else{
    	 this.loader = true;
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
	      this.url = imagesrc.target.result;
	    }

	    reader.readAsDataURL(event.target.files[0]);
	  }
	}

  	changeImage(event){ 
      // this.imagePath = event.target.files[0];
      // // this.imgSrc = this.imagePath;
      // let controlArray = < FormArray > this.addCompanyForm.controls['image'];
      this.readUrl(event);
      this.imageClickByUser = true;
    }

    /*ADD EMPLOYEE*/
	clickAddCompany() {
		this.isAddCompanyClick = true;
		this.isAddEmployeeClick = false;
	}

	onTabChange(event) {
       // this.isAddEmployeeClick = true;
       this.getSkillsList();
       this.clickAddEmployee();

    }

	clickAddEmployee() {
		// this.isAddCompanyClick = false;
		this.isAddEmployeeClick = true;
		this.searchEmployees();
	}

	saveEmployeeTitle() {

		if(this.empRole)
		{
			if(this.employeeRole.length > 0){
				if(this.checkDuplicate) {
					this.employeeRole[this.checkDuplicate-1].title=this.empRole;
					this.display=false;
					this.checkDuplicate='';
				}
				else{
					this.employeeRole.push({id:this.employeeId, name: this.employeeName , title:this.empRole, 
					userimage:this.userImgSrc, isGroupAdmin:1});
					this.display = false;
					this.employeeName='';
					this.empRole='';
					this.userImgSrc='';
					this.employeeId = 0;
				}
		    }
		    else{
				this.employeeRole.push({id:this.employeeId, name: this.employeeName , title:this.empRole, 
				userimage:this.userImgSrc, isGroupAdmin:1});
				this.display = false;
				this.employeeName='';
				this.empRole='';
				this.userImgSrc='';
				this.employeeId = 0;
		    } 
		}
	    else
		{		
		  this.global_service.showNotification('top','right','Please Add Title',4,'ti-cross');
		}
		
	}


	editEmployeeSkills(event) {

		let isDup:boolean=false;
		this.employeeName=event.text;
		this.employeeId = event.id;
       
		if(this.employeeRole.length > 0){
			this.employeeRole.filter(function(item,index){
				if(item.id==event.id){
					// this.global_service.consoleFun('Already Added');
					isDup = true;
				}
			});
		}
		if(isDup){
			this.global_service.showNotification('top','right','Already Added',4,'ti-cross');
			this.display = false;
		}
		else{
			this.display = true;
			// this.getSkillsList();
			this.getUserImageById(event.id);	
		}
	}

	editEmployeeSkillsById(item,indexNumber){
	 	this.display =true;
	    this.empRole = item.title;
		this.employeeId = item.id;
		this.employeeName =item.name;
		this.checkDuplicate=indexNumber;
	}

	// edit employee as an admin
	editEmployeeAdmin(item) {
		let empIndex:any;
		this.employeeRole.filter(function(data,index){
			if(data.id==item.id){
				empIndex=index;
			}
		});
		let toggle = this.employeeRole[empIndex].isGroupAdmin;
		if(toggle === 1){
			this.employeeRole[empIndex].isGroupAdmin= 2;
		}
		else{
			this.employeeRole[empIndex].isGroupAdmin= 1;
		}
	}


	addEmployeeSkills(event) {

		let isDup:boolean=false;
		this.employeeName=event.text;
		this.employeeId=event.id;
		if(this.employeeRole.length > 0){
			this.employeeRole.filter(function(item,index){
				if(item.id==event.id){
				  // this.global_service.consoleFun('Already Added');
				  isDup = true;
				}
		    });
		}
		if(isDup){
		   this.global_service.showNotification('top','right','Already Added',4,'ti-cross');
		   this.display = false;
		}
		else{
			this.display = true;
	        this.getSkillsList();
			this.getUserImageById(event.id);	
		}
	}


	deleteEmployee(item) {
		for(let i=0;i<this.employeeRole.length;i++){
			if(this.employeeRole[i].id==item.id){
				this.employeeRole.splice(i,1);
			}
		}
		
	}

	addEmployeeAdmin(item) {
	  // add employee as an admin
	  let empIndex:any;
	  this.employeeRole.filter(function(data,index){
	   if(data.id==item.id){
	    empIndex=index;
	   }
	  });
	  let toggle = this.employeeRole[empIndex].isGroupAdmin;
	  if(toggle === 1){
	   this.employeeRole[empIndex].isGroupAdmin=2;
	  }
	  else{
	   this.employeeRole[empIndex].isGroupAdmin=1;
	  }
    }

	addEmployees() {
		// hit api for data saving
		let localArray=[];
		this.employeeRole.filter(function(item,index){
			localArray.push({
				employeeId:item.id,
				isGroupAdmin:item.isGroupAdmin,
				title:item.title
			});
		});
		let object={
			employees: localArray,
			token: this.global_service.userInfo.token,
			companyId:this.companyAddResponse.id,
		}
		const url = this.global_service.basePath + 'admin/company/add/employee';
	    this.global_service.PostRequest(url,object)
	    .subscribe(res => {
	    	if(res[0].json.json().object){
	    		this.global_service.showNotification('top','right',"Employees Added Successfully",2,'ti-check');
	    		this.router.navigateByUrl("dashboard/view-company");
	    	}
	    }, 
	    err => {
	      this.loader = false;
	      this.global_service.consoleFun(err);
	    })

	}

	searchEmployees() { 
		// call for getting the employees list here:
		let array : any;
		let obj = { token: this.global_service.userInfo.token }
	    const url = this.global_service.basePath + 'admin/users/list/admin';
		    this.global_service.PostRequest(url, obj)
		    .subscribe(res => {
		      array = res[0].json.json().object;
		      for (let i = 0; i < array.length; ++i) {
		      	this.items.push({id:array[i].id,text: array[i].first_name +" "+array[i].last_name});
		      }
		    }, 
		    err => {
		      this.global_service.consoleFun(err);
		});
	}

	value(){
		$("#name").on('input', function () {
	    var val = this.value;
	    if($('#employee option').filter(function(){
	        return this.value === val;        
	    }).length) {
	        //send ajax request
	        alert(this.value);
	    }
		});

	}

}
