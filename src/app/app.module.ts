import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterModule, ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';

import { PaginatorModule, CalendarModule, ListboxModule, MultiSelectModule, TabViewModule, AccordionModule, MenuItem, SliderModule, DialogModule, ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';

import { LoginComponent } from './login/login.component';
import { GlobalService } from './GlobalService';
import { CommonService } from './Services/CommonService';
import { AuthGuard } from './auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { rootComponent } from './dashboard/error404/error404.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    rootComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule, 
    CommonModule,
    HttpModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ListboxModule,
    MultiSelectModule,
    AccordionModule,
    TabViewModule,
    SliderModule,
    FileUploadModule,
    DialogModule,
    ConfirmDialogModule,
    ToasterModule,
  ],
  
  providers: [GlobalService, CommonService, AuthGuard, { provide: LocationStrategy, 
              useClass: HashLocationStrategy }, DatePipe],
  bootstrap: [AppComponent],
})

export class AppModule { }

