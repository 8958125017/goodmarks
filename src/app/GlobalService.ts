import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Route, Router } from "@angular/router";
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ConfirmationService } from 'primeng/primeng';
import { ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';

// import { User } from './Models/employee';

// declare var jQuery: any;
declare var $: any;
declare var toastr: any;
declare var FB: any;

@Injectable()
export class GlobalService {
    public msgs: any[] = [];

    userInfo: any;
    userType:any;
    public basePath: string;
    public refresh_token: string;
    public basePathLoader: string;
    public basePathSmallLoader: string;
    public headers: Headers;
    public requestoptions: RequestOptions;
    public res: Response;
    public imageGreenTick:string;
    public imageRedTick:string;
    public defaultUserImage:string;
    public imageUpload:string;
    public namePattern: string;
    public emailPattern: string;
    public nameOnly: string;
    public passwordPattern: string;
    public numberOnly: string;

    public loggedInObs: Rx.Subject<any> = new Rx.Subject<any>();
    public loggedInVar: boolean = false;

    public disableMultipleSave:boolean = false;

    adminStatus:any[] = [ {id:1,status:'Active'},
                        {id:2,status:'Inactive'}]

    constructor(public http: Http, public router: Router, public toasterService:ToasterService, public confirmationService: ConfirmationService) {
        this.extarsOnLoad();
    }

    /*Check form valid or not by passing form objecrt to it*/
    isFormValid(formName){
        if(formName.valid) return true;
        else return false;
    }
    /*End section*/

    showNotification(from, align, message,color,icon){
        
        var type = ['','info','success','warning','danger'];

        // var color = Math.floor((Math.random() * 4) + 1);
        // $('.notifyjs-wrappe').empty();  
        $.notify({
            icon: icon,
            message: message,
        },{
            autoHide: true,
            autoHideDelay: 1000,
            // hide animation
            hideAnimation: 'slideUp',
            // hide animation duration
            hideDuration: 200,
            type: type[color],
            timer: 2000,
            placement: {
                from: from,
                align: align
            }
        });
    }
    
    showNotifications(type?, title?: string, body?: string) {
        // this.toasterService.pop('success', 'Args Title', 'Args Body');
        this.toasterService.pop(type, title, body);
    }

    upload(fileToUpload: any) {
        let input = new FormData();
        input.append("file", fileToUpload);

        return this.http.post("/api/uploadFile", input);
    }


    public extarsOnLoad() {
        this.namePattern = '[a-zA-ZÀ-ÿ0-9._^%$#!@&*][a-zA-ZÀ-ÿ0-9._^%$#!@&* )]{1,300}';
        this.nameOnly = '[a-zA-zÀ-ÿ0-9@ ][a-zA-zÀ-ÿ0-9@ ]{1,300}$';
        this.emailPattern = '[a-zA-zÀ-ÿ_.0-9]+@[a-zA-ZÀ-ÿ]+[.][a-zA-ZÀ-ÿ.]+';
        this.numberOnly = '[0-9.+]{1,200}';
        this.passwordPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){5,200}";
        this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
        
        // this.basePath = "http://180.151.103.85:3013/api/"; /*For Parmanent purpose*/
        this.basePath = "http://180.151.103.85:3015/api/";

        this.imageUpload='http://180.151.103.85:3015/api/admin/upload/image';
        this.basePathLoader = "assets/images/Loading_icon.gif";
        this.basePathSmallLoader = "assets/images/small-loader.gif";
        this.imageGreenTick = "assets/images/Green-Tick-PNG-Picture.png";
        this.imageRedTick = "assets/images/cancel.jpg";
        this.defaultUserImage ="assets/images/blue_user.png";
        /*Required for Global Level in whole app*/
        this.userType = this.userInfo.UserRole;

        this.loggedInObs.subscribe(res => {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
            this.userType = this.userInfo.UserRole;
        })
    }

    public getRequsetOptions(url: string): RequestOptions {
        let headers;
        if (localStorage.getItem('token')) {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("token",this.userInfo.token);
        }
        else {
            this.consoleFun('Unautorized Request !');
        }
        let requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers
        });

        return requestoptions;
    }

    public PostRequestUnautorized(url: string, data: any): any {
        // let url2 = this.customUrlParser(url);

        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: JSON.stringify(data)
        });

        return this.http.request(new Request(requestoptions))
        .map((res: Response) => {
            return [{ status: res.status, json: res.json() }]
        })
        .catch((error: any) => {
            return Observable.throw(error);
        });
    }

    public PostRequest(url: string, data: any, flag?: any): any {
        // let url2 = this.customUrlParser(url);

        let headers;
        headers = new Headers();
        headers.append("Content-Type", "application/json");
        // headers.append("token",this.userInfo.token);

        this.requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: JSON.stringify(data)
        })

        return this.http.request(new Request(this.requestoptions))
        .map((res: Response) => {
            
            if(res.status==200){
               return [{ status: res.status, json: res }]    
            }
        })
        .catch((error: any) => {
            // this.consoleFun(error.text() ? error.text() : error);
            if(error.status == 401){
                localStorage.clear();
                // this.showNotification('top','right',"error.err.object",4,'ti-cross');
                this.showNotification('top','right',error.json().err.object,4,'ti-cross');
                this.router.navigateByUrl('/login');
            }
            return Observable.throw(error);
        });
    }

    public GetRequest(url: string): any {
        // let url2 = this.customUrlParser(url);

        return this.http.request(new Request(this.getRequsetOptions(url)))
        .map((res: Response) => {
            let jsonObj: any;
            if (res.status === 204) {
                jsonObj = null;
            }
            else {
                jsonObj = res.json()
            }
            return [{ status: res.status, json: jsonObj }]
        })
        .catch(error => {
            if (error.status == 0)
                this.consoleFun('error here', error);
            return Observable.throw(error);
        });
    }

    customUrlParser(url){
        let url2: string;
        if (url.includes("?"))
            { url2 = url + '&format=json'; }
        else
            { url2 = url + '?format=json' }

        return url2;
    }

    // Console Function
    consoleFun(a?, b?, c?, d?, f?, g?): void {
        // console.log(a, b, c, d, f, g);
    }

    clearMessage(){
        //this.toasterService.clear();
    }

    public logout(){
        const url = this.basePath + "admin/logout" ;
        let obj = {token:this.userInfo.token};
        this.PostRequest(url,obj).subscribe(res => {
            this.consoleFun(res[0].json.json());
            localStorage.clear();
            this.router.navigateByUrl('/login');
        }, err => {
            this.consoleFun(err);
        })
    }

    deleteConfirm() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            }
        });
    }
    /*Close PopUp*/
    closePopUp(value,display){
        value.reset();
        display = false;
    }

    /*Scroll to top*/
    scrollBar(){
    $("html, .main-panel").animate({ scrollTop: 0 },'fast');
    }

}