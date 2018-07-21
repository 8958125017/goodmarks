import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { GlobalService } from './../GlobalService';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    other_related_path:any[];
}

export const ROUTES: RouteInfo[] = [

    { path: 'view-admin-User', title: 'Admin User',  icon: 'fa fa-user-circle-o', class: '' ,other_related_path:['add-admin-User','edit-admin-User','view-admin-User']},
    { path: 'view-user', title: 'User Lists',  icon: 'ti-user', class: 'active' ,other_related_path:['add-user','edit-user','view-user']},
    { path: 'view-help-Offer', title: 'Help Offers-Serves ',  icon: 'ti-cup', class: '' ,other_related_path:['add-help-offer','edit-help-offer', 'view-help-Offer']},
    { path: 'view-help-requests', title: 'Help Requests',  icon: 'fa fa-handshake-o', class: '' ,other_related_path:['add-help-requests','edit-help-requests','view-help-requests']},
    { path: 'view-positivity-messages', title: 'Positivity Messages',  icon: 'fa fa-envelope', class: '' ,other_related_path:['add-positivity-messages','edit-positivity-messages','view-positivity-messages']},
    { path: 'view-positivity-requests', title: 'Positivity Requests',  icon: 'ti-panel', class: '' ,other_related_path:['add-positivity-requests','edit-positivity-requests','view-positivity-requests']},
    { path: 'view-skills', title: 'Skills List',  icon: 'ti-cup', class: '' ,other_related_path:['add-skills','edit-skills', 'view-skills']},
    { path: 'view-skilled-User', title: 'Skill-User Connection',  icon: 'ti-user', class: '' ,other_related_path:['add-skilled-User','edit-skilled-User','view-skilled-User']},
    { path: 'view-job-section', title: 'Job Section',  icon: 'fa fa-list', class: '' ,other_related_path:['add-job-section','edit-job-section', 'view-job-section']},
    { path: 'view-sos', title: 'SOS', icon: 'ti-mobile', class: '',other_related_path:['add-sos','edit-sos','view-sos']},
    { path: 'view-company', title: 'Company', icon: 'fa fa-building', class: '',other_related_path:['add-company','edit-company','view-company']}
   
   ];

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[]=[];
    loader:boolean = false;
    addState:string='';

    constructor(public router:Router, public global_service:GlobalService){
    }

    ngAfterViewInit() {

       let urlPath=window.location.href;
        console.log(urlPath.split('dashboard')[1].replace('/','').startsWith('view'));
        let curState = urlPath.split('dashboard')[1].replace('/','');
    }

    ngOnInit() {
        let currentState = '';
        this.setActiveClassNavbar(this.router.url);
        
        this.router.events.subscribe((url:any) => {
            this.setActiveClassNavbar(url.url);
        });
    }

    setActiveClassNavbar(url) {
        if(url){
            for(let i = 0 ; i < ROUTES.length ; i++) {
                if(url.includes(ROUTES[i].other_related_path[0]) || url.includes(ROUTES[i].other_related_path[1]) || url.includes(ROUTES[i].other_related_path[2])){
                  ROUTES[i].class = "active";
                }
                else{
                  ROUTES[i].class="";
                }
            }
        }
        else{
            this.router.navigateByUrl('/dashboard/404');
        }
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }    

    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

    logout(){

        this.loader = true;

        const url = this.global_service.basePath + "admin/logout";
        
         let obj = {token:this.global_service.userInfo.token};
         this.global_service.PostRequest(url,obj)
         .subscribe(res => {
          this.loader = false;
          this.global_service.consoleFun(res[0].json.json());
          localStorage.clear();
          this.router.navigateByUrl('/login');
        }, err => {
        this.loader = false;
        this.global_service.consoleFun(err);
    })
  }

}
