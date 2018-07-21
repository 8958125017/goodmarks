  import { ModuleWithProviders } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';

  import { SidebarComponent } from './sidebar.component';
  import { DashboardComponent } from './../dashboard/dashboard.component';
  import { ViewUserComponent } from './../dashboard/UserList/view-user/view-user.component';
  import { ResetPasswordComponent } from './../dashboard/UserList/reset-password/reset-password.component';
  import { AddUserComponent } from './../dashboard/UserList/add-user/add-user.component';
  import { EditUserComponent } from './../dashboard/UserList/edit-user/edit-user.component';
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
  import { EditAdminUsersComponent } from './../dashboard/AdminUsers/edit-admin-users/edit-admin-users.component';
  import { AddAdminUsersComponent } from './../dashboard/AdminUsers/add-admin-users/add-admin-users.component';
  import { AddPositivityRequestComponent } from './../dashboard/Positivityrequest/add-positivity-request/add-positivity-request.component';
  import { EditPositivityRequestComponent } from './../dashboard/Positivityrequest/edit-positivity-request/edit-positivity-request.component';
  import { EditHelpOfferComponent } from './../dashboard/HelpOffer/edit-help-offer/edit-help-offer.component';
  import { AddHelpOfferComponent } from './../dashboard/HelpOffer/add-help-offer/add-help-offer.component';
  import { EditSkillUsersComponent } from './../dashboard/SkillUsers/edit-skill-users/edit-skill-users.component';
  import { AddSkillUsersComponent } from './../dashboard/SkillUsers/add-skill-users/add-skill-users.component';
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
  

  import { AuthGuard } from './../auth-guard.service';


  const routes: Routes = [

    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], children: 
    [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'view-user', component: ViewUserComponent, canActivate:[AuthGuard] },
    { path: 'add-user', component: AddUserComponent ,canActivate:[AuthGuard]},
    { path: 'reset-password/:id', component: ResetPasswordComponent ,canActivate:[AuthGuard]},
    { path: 'edit-user/:id', component:EditUserComponent, canActivate:[AuthGuard]},

    { path: 'view-positivity-messages', component: ViewPositiveMsgComponent,canActivate:[AuthGuard] },
    { path: 'add-positivity-messages', component: AddPositiveMsgComponent,canActivate:[AuthGuard] },
    { path: 'edit-positivity-messages/:id', component: EditPositiveMsgComponent,canActivate:[AuthGuard] },

    { path: 'view-help-requests', component: ViewHelpReqComponent,canActivate:[AuthGuard] },
    { path: 'edit-help-requests/:id', component: EditHelpReqComponent,canActivate:[AuthGuard] },
    { path: 'add-help-requests', component: AddHelpReqComponent,canActivate:[AuthGuard] },

    { path: 'add-skills', component: AddSkillListComponent,canActivate:[AuthGuard] },
    { path: 'edit-skills/:id', component: EditSkillListComponent,canActivate:[AuthGuard] },
    { path: 'view-skills', component: ViewSkillListComponent,canActivate:[AuthGuard] },

    { path: 'view-help-Offer', component: ViewHelpOfferComponent,canActivate:[AuthGuard] },
    { path: 'add-help-offer', component: AddHelpOfferComponent, canActivate: [AuthGuard] },
    { path: 'edit-help-offer/:id', component: EditHelpOfferComponent, canActivate:[AuthGuard]},

    { path: 'view-positivity-requests', component: ViewPositivityComponent,canActivate:[AuthGuard] },
    { path: 'add-positivity-requests' , component: AddPositivityRequestComponent, canActivate:[AuthGuard]},
    { path: 'edit-positivity-requests/:id' , component : EditPositivityRequestComponent, canActivate:[AuthGuard]},

    { path: 'view-skilled-User', component: ViewSkillUsersComponent,canActivate:[AuthGuard] },
    { path: 'add-skilled-User' , component: AddSkillUsersComponent, canActivate:[AuthGuard]},
    { path: 'edit-skilled-User/:id' , component : EditSkillUsersComponent, canActivate:[AuthGuard]},

    { path: 'view-admin-User', component: ViewAdminUsersComponent,canActivate:[AuthGuard] },
    { path: 'edit-admin-User/:id', component: EditAdminUsersComponent,canActivate:[AuthGuard] },
    { path: 'add-admin-User', component: AddAdminUsersComponent ,canActivate:[AuthGuard] },

    { path: 'view-job-section', component: ViewJobSectionComponent,canActivate:[AuthGuard] },
    { path: 'edit-job-section/:id', component: EditJobSectionComponent,canActivate:[AuthGuard] },
    { path: 'add-job-section', component: AddJobSectionComponent ,canActivate:[AuthGuard] },

    { path: 'view-sos', component: ViewSosComponent,canActivate:[AuthGuard] },
    { path: 'edit-sos/:id', component: EditSosComponent,canActivate:[AuthGuard] },
    { path: 'add-sos', component: AddSosComponent ,canActivate:[AuthGuard] },

    { path: 'view-company', component: ViewCompanyComponent,canActivate:[AuthGuard] },
    { path: 'edit-company/:id', component: EditCompanyComponent,canActivate:[AuthGuard] },
    { path: 'add-company', component: AddCompanyComponent ,canActivate:[AuthGuard] },

    // { path: '404', component: childComponent},
    { path: '**', component: childComponent},

    ]},
  ];

  export const routing: ModuleWithProviders = RouterModule.forChild(routes);
