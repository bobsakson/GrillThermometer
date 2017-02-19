import { Routes }  from '@angular/router';
import { ProbeComponent } from './components/probe.component';
import { ProfileComponent } from './components/profile.component';
import { ProfileDetailComponent } from './components/profile.detail.component';

export const APPLICATION_ROUTES: Routes = [
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