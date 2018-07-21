import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; 
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterModule, ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';

import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { PaginatorModule, CalendarModule, ListboxModule, TabViewModule, AccordionModule, MenuItem, MultiSelectModule, SliderModule, DialogModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { NavbarModule } from './../shared/navbar/navbar.module';
import { EqualValidator } from './../Directives/validation.directive';

import { SidebarComponent } from './sidebar.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { ViewUserComponent } from './../dashboard/UserList/view-user/view-user.component';
import { ResetPasswordComponent } from './../dashboard/UserList/reset-password/reset-password.component';
import { AddUserComponent } from './../dashboard/UserList/add-user/add-user.component';
import { ViewPositiveMsgComponent } from './../dashboard/PositivityMessages/view-positive-msg/view-positive-msg.component';
import { AddPositiveMsgComponent } from './../dashboard/PositivityMessages/add-positive-msg/add-positive-msg.component';
import { EditPositiveMsgComponent } from './../dashboard/PositivityMessages/edit-positive-msg/edit-positive-msg.component';
import { EditSkillListComponent } from './../dashboard/skillList/edit-skill-list/edit-skill-list.component';
import { AddSkillListComponent } from './../dashboard/skillList/add-skill-list/add-skill-list.component';
import { ViewSkillListComponent } from './../dashboard/skillList/view-skill-list/view-skill-list.component';
import { EditHelpReqComponent } from './../dashboard/HelpReq/edit-help-req/edit-help-req.component';
import { AddHelpReqComponent } from './../dashboard/HelpReq/add-help-req/add-help-req.component';
import { ViewHelpReqComponent } from './../dashboard/HelpReq/view-help-req/view-help-req.component';
import { ViewHelpOfferComponent } from './../dashboard/helpOffer/view-help-offer/view-help-offer.component';
import { ViewSkillUsersComponent } from './../dashboard/skillUsers/view-skill-users/view-skill-users.component';
import { ViewPositivityComponent } from './../dashboard/Positivityrequest/view-positivity-request/view-positivity.component';
import { ViewAdminUsersComponent } from './../dashboard/AdminUsers/view-admin-users/view-admin-users.component';
import { AddAdminUsersComponent } from './../dashboard/AdminUsers/add-admin-users/add-admin-users.component';
import { EditAdminUsersComponent } from './../dashboard/AdminUsers/edit-admin-users/edit-admin-users.component';
import { EditHelpOfferComponent } from './../dashboard/HelpOffer/edit-help-offer/edit-help-offer.component';
import { AddHelpOfferComponent } from './../dashboard/HelpOffer/add-help-offer/add-help-offer.component';
import { AddPositivityRequestComponent } from './../dashboard/Positivityrequest/add-positivity-request/add-positivity-request.component';
import { EditPositivityRequestComponent } from './../dashboard/Positivityrequest/edit-positivity-request/edit-positivity-request.component';
import { EditSkillUsersComponent } from './../dashboard/SkillUsers/edit-skill-users/edit-skill-users.component';
import { AddSkillUsersComponent } from './../dashboard/SkillUsers/add-skill-users/add-skill-users.component';
import { EditUserComponent } from './../dashboard/UserList/edit-user/edit-user.component';
import { EditJobSectionComponent } from './../dashboard/JobSection/edit-job-section/edit-job-section.component';
import { ViewJobSectionComponent } from './../dashboard/JobSection/view-job-section/view-job-section.component';
import { AddJobSectionComponent } from './../dashboard/JobSection/add-job-section/add-job-section.component';
import { AddSosComponent } from './../dashboard/SOS/add-sos/add-sos.component';
import { ViewSosComponent } from './../dashboard/SOS/view-sos/view-sos.component';
import { EditSosComponent } from './../dashboard/SOS/edit-sos/edit-sos.component';
import { ViewCompanyComponent } from './../dashboard/Company/view-company/view-company.component';
import { AddCompanyComponent } from './../dashboard/Company/add-company/add-company.component';
import { EditCompanyComponent } from './../dashboard/Company/edit-company/edit-company.component';
import { childComponent } from './../dashboard/error404/error404.component';


import { routing } from './sidebar.routing';
import { AuthGuard } from './../auth-guard.service';
import { FilterPipe } from './../Pipes/pipe';
import { SelectModule } from 'ng2-select';


@NgModule({
    imports: [ 
        RouterModule, 
        CommonModule, 
        routing,
        HttpModule,
        NavbarModule,
        NoopAnimationsModule,
        MultiSelectModule, 
        TabViewModule,
        FormsModule,
        ReactiveFormsModule,
        PaginatorModule, 
        CalendarModule,
        AccordionModule, 
        ListboxModule,
        SliderModule,
        FileUploadModule,
        DialogModule,
        ConfirmDialogModule,
        SelectModule,
        ToasterModule,
        ],

    providers: [AuthGuard, { provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe, ToasterService, ConfirmationService],
    
    declarations: [ 
        FilterPipe,
        EqualValidator,
        SidebarComponent,
        DashboardComponent,
        ViewUserComponent,
        ResetPasswordComponent,
        AddUserComponent,
        ViewPositiveMsgComponent,
        AddPositiveMsgComponent,
        EditPositiveMsgComponent,
        EditSkillListComponent,
        AddSkillListComponent,
        ViewSkillListComponent,
        EditHelpReqComponent,
        AddHelpReqComponent,
        ViewHelpReqComponent,
        ViewHelpOfferComponent,
        ViewSkillUsersComponent,
        ViewPositivityComponent,
        ViewAdminUsersComponent,
        AddAdminUsersComponent,
        EditAdminUsersComponent,
        EditHelpOfferComponent,
        AddHelpOfferComponent,
        AddPositivityRequestComponent,
        EditPositivityRequestComponent,
        EditSkillUsersComponent,
        AddSkillUsersComponent,
        EditUserComponent,
        EditJobSectionComponent,
        ViewJobSectionComponent,
        AddJobSectionComponent,
        AddSosComponent,
        ViewSosComponent,
        EditSosComponent,
        ViewCompanyComponent,
        AddCompanyComponent,
        EditCompanyComponent,
        childComponent,
     ],

    exports: [ SidebarComponent ]
})

export class SidebarModule {}
