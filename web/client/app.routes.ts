import { provideRouter, RouterConfig }  from '@angular/router';
import { ProbeComponent } from './components/probe.component';
import { ProfileComponent } from './components/profile.component';
import { ProfileDetailComponent } from './components/profile.detail.component';

const routes: RouterConfig = [
  {
  path: '',
  redirectTo: '/probe',
  pathMatch: 'full'
  },
  {
    path: 'probe',
    component: ProbeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile/:id',
    component: ProfileDetailComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];