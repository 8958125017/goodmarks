import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';

import { GlobalService } from './../../../GlobalService';

const URL = 'http://180.151.103.85:3015/api/admin/company/update';
declare var $:any;

@Component({
	selector: 'app-edit-company',
	templateUrl: './edit-company.component.html',
	styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

	editCompanyForm:FormGroup;
	disableEdit:boolean = false;
	loader:boolean = false;   
	imagePath = "blue_user.png";
	imageUrl = "assets/images/" + this.imagePath;  
	loading:boolean = false;
	companyListData:any;
	companyId:any;
	companyEditResponse:any;
	employeeEnable:boolean = false;
	validateFields:boolean = false;

	imageClickByUser: boolean =false;
	isEditCompanyClick : boolean = true;
	isEditEmployeeClick : boolean = false;
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
	saveClickedEmployee:boolean=false;
	authorsArray:any;
	authorsNewArray:any;
    authorIds:any;

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
		// this.global_service.consoleFun('Selected value is: ', value);
	}

	public removed(value:any):void {
		// this.global_service.consoleFun('Removed value is: ', value);
	}

	public typed(value:any):void {
		// this.global_service.consoleFun('New search input: ', value);
	}

	public refreshValue(value:any):void {
		this.value = value;
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

	constructor(public activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder) {}

	ngOnInit() {
		this.getAuthorName();
		this.employee = -1;
		this.activatedroute.params.subscribe((params: Params) => {
			this.companyId = params['id'];
			this.getCompanyListById(this.companyId); 
		});
		
	}

	formInitialization(){
		this.editCompanyForm = this.fb.group({
			companyName:[this.companyListData.companyName,[Validators.required]],
			phoneNumber:[this.companyListData.phoneNumber,[Validators.required]],
			companyAddress:[this.companyListData.companyAddress,[Validators.required]],
			basicInformation:[this.companyListData.basicInformation,[Validators.required]],
			accountType  :[this.companyListData.accountType,[Validators.required]],
			token:[this.global_service.userInfo.token,[]],
			image: ['',[]],
			new_image:['',[]],
      		old_image:[this.companyListData.image,[]],
      		id:[this.companyListData.id],
			authorId:[this.companyListData.authorId,[Validators.required]],
		});     
	}

    remove(array) {
      
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

	getEmployeesList(comapnyId) {
		this.employeeRole=[];
		let obj = { token: this.global_service.userInfo.token, companyId :comapnyId}
		const url = this.global_service.basePath + 'admin/company/list/employee';
		this.global_service.PostRequest(url, obj)
		.subscribe(res => {
			for(let i=0;i<res[0].json.json().object.length;i++){
			  this.employeeRole.push({
			  	title:res[0].json.json().object[i].title,
			  	id: res[0].json.json().object[i].employeeId,
			  	name:res[0].json.json().object[i].gkarm_user.first_name+" "+res[0].json.json().object[i].gkarm_user.last_name,
			  	userimage:res[0].json.json().object[i].gkarm_user.photo_url ? res[0].json.json().object[i].gkarm_user.photo_url : this.global_service.defaultUserImage,
			  	isGroupAdmin:res[0].json.json().object[i].isGroupAdmin,
			  	employeeId: res[0].json.json().object[i].employeeId
			  });
			}

		}, 
		err => {
			this.global_service.consoleFun(err);
		});
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
		// this.imagePath = event.target.files[0];
		// // this.imgSrc = this.imagePath;
		// let controlArray = < FormArray > this.addCompanyForm.controls['image'];
		this.readUrl(event);
		this.imageClickByUser = true;
		this.uploader.uploadAll();
	    this.uploader.onCompleteItem = (item, response, status, header) => {
	      this.editCompanyForm.controls['new_image'].setValue(JSON.parse(response).object.image);
	      this.global_service.consoleFun(item,response);
	    }
	}
	
	deleteEmployee(item) {
		for(let i=0;i<this.employeeRole.length;i++){
			if(this.employeeRole[i].id==item.id){
				this.employeeRole.splice(i,1);
			}
		}
		
	}
	// call for getting the employees list here:
	searchEmployees(id) {
	   
		let array : any;
		let obj = { token: this.global_service.userInfo.token }
		const url = this.global_service.basePath + 'admin/users/list/admin';
		this.global_service.PostRequest(url, obj)
		.subscribe(res => {
			array = res[0].json.json().object;
			let newArray: any = []; //create local array for dropdown manupulation in assignTo
				array.forEach((item) => {
				 newArray.push(Object.assign({}, item));
				});
				newArray.filter(function(item,index){
				if( item.id == id ){
				newArray.splice(index, 1);
				}
				});
				this.authorsNewArray = newArray;
			for (let i = 0; i < this.authorsNewArray.length; ++i) {
				this.items.push({id:this.authorsNewArray[i].id,text: this.authorsNewArray[i].first_name +" "+this.authorsNewArray[i].last_name});
			}
			// this.global_service.consoleFun("get user data", this.items);
		}, 
		err => {
			// this.global_service.consoleFun(err);
		});
	}
	
	/*Get Company Detail by ID*/  
	getCompanyListById(id){

		let obj = {token:this.global_service.userInfo.token,id:id}
		
		const url = this.global_service.basePath + 'admin/company/edit';
		this.global_service.PostRequest(url,obj)
		.subscribe(res => {
			// this.global_service.consoleFun(res[0].json.json());
			this.companyListData = res[0].json.json().object[0];
			if(this.companyListData){
				if (this.companyListData.image) {
				this.imageUrl = this.companyListData.image;
				}
				else{
					this.imageUrl = "assets/images/blue_user.png";
				}
				this.authorIds = this.companyListData.authorId;
				this.searchEmployees(this.authorIds);
			}
			else{
				// isDataFound : boolean = false;
			}
			this.formInitialization();
			this.disableEdit = true;

		}, 
		err => {
			// this.global_service.consoleFun(err);
		})

	}

	/*Update Company*/
	updateCompany(id){
		this.loader = true;
		 this.editCompanyForm.controls['old_image'].setValue(this.companyListData.image);

	    if(this.global_service.isFormValid(this.editCompanyForm)){ 
	      // this.saveClicked =true;
	     const url = this.global_service.basePath + 'admin/company/update'
	       this.global_service.PostRequest(url,this.editCompanyForm.value)
	       .subscribe(res => {
	         this.global_service.consoleFun(res[0].json.json());
	         this.formInitialization();
	         this.global_service.showNotification('top','right',"Company updated  Successfully",2,'ti-check');
		   	this.router.navigateByUrl("dashboard/view-company");
		   	this.loader = false;
	         this.disableEdit = true;
	       }, 
	       err => {
	         this.global_service.consoleFun(err);
	       })
	     }
	     else{
	       this.validateFields = true;
	       this.global_service.scrollBar();
	     }

		
		
	}

	/*Edit Employee*/

	/*clickAddCompany() {
		this.isEditCompanyClick = true;
		this.isEditEmployeeClick = false;
	}*/

	onTabChange(event) {
		// this.isAddEmployeeClick = true;
		// this.getSkillsList();
		this.clickEditEmployee();
		this.searchEmployees(this.authorIds);


	}

	clickEditEmployee() {
		// this.isAddCompanyClick = false;
		this.isEditEmployeeClick = true;
		this.getEmployeesList(this.companyId);
	}

	saveEmployeeTitle() {
		this.saveClickedEmployee = false;
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
		this.saveClickedEmployee=false;
		let isDup:boolean=false;
		this.employeeName=event.text;
		this.employeeId = event.id;
		this.global_service.consoleFun(this.employeeId);
        this.getUserImageById(event.id);

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
				
		}
	}

	editEmployeeSkillsById(item,indexNumber){
	 	this.display =true;
	 	this.saveClickedEmployee=false;
	    this.empRole = item.title;
		this.employeeId = item.id;
		this.employeeName =item.name;
		this.checkDuplicate=indexNumber;
	}

	// edit employee as an admin
	editEmployeeAdmin(item) {
		this.saveClickedEmployee = false;
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
	
	//for image fetching from this below:
	getUserImageById(id) {

		let obj = {token:this.global_service.userInfo.token,id:id}
		const url = this.global_service.basePath + 'admin/users/edit';
		this.global_service.PostRequest(url,obj)
		.subscribe(res => {
			// this.global_service.consoleFun(res[0].json.json());
			this.UsersList = res[0].json.json().object[0];
			if (this.UsersList.photo_url) {
				this.userImgSrc = this.UsersList.photo_url;
			}
			else{
				this.userImgSrc = this.global_service.defaultUserImage;
			}
		}, 
		err => {
			// this.global_service.consoleFun(err);
		})

	}

	editEmployees() {
		// hit api for data saving
		this.saveClickedEmployee=true;
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
			companyId:this.companyId,
		}
		this.loader =true;
		// this.global_service.consoleFun(object);
		const url = this.global_service.basePath + 'admin/company/add/employee';
		this.global_service.PostRequest(url, object)
		.subscribe(res => {
			if (res[0].json.json().error && res[0].json.json().error.object) {
	         this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
	        }
	        else{
	        this.loader =true;
			 this.global_service.showNotification('top','right','Employees Updated successfully.',2,'ti-check');
			 this.router.navigateByUrl("dashboard/view-company");
	        }	
		}, 
		err => {
			this.loader =true;
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
    
/*    closePopUp(){
     this.validateFields = false;
     this.display = false;
     this.formInitialization();
     this..reset();
   } 
*/
}
