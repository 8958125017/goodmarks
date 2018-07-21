import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {rootComponent} from './dashboard/error404/error404.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    { 
      path: 'dashboard', 
      loadChildren: 'app/sidebar/sidebar.module#SidebarModule' , 
    },

    { path: '404', 
     component: rootComponent
    },

    { path: '**', 
    redirectTo: '/' + '404'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules });
