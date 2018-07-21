import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalService } from './../GlobalService';

import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {
    
    authorDataArray:any;

    constructor(public _activatedroute:ActivatedRoute, public global_service:GlobalService, public router:Router, public fb:FormBuilder ) { }

    getAuthorName():any {
        
        
          let obj = { token: this.global_service.userInfo.token }
        
          const url = this.global_service.basePath + 'admin/users/list/admin';
          this.global_service.PostRequest(url, obj).subscribe(res => {
           
        
            this.authorDataArray = res[0].json.json().object;
            this.global_service.consoleFun("get user data", this.authorDataArray);
            return this.authorDataArray;
        
          }, err => {
            
            this.global_service.consoleFun(err);
            return 1;
          })
        
        }
}