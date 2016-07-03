import { Component } from '@angular/core';
import { RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ProbeComponent } from './probe.component';
import { ProfileComponent } from './profile.component';

@Component({
    selector: 'app',
    templateUrl: './client/views/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
  {
    path: '/probe',
    name: 'Probe',
    component: ProbeComponent,
    useAsDefault: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileComponent
  }
])

export class AppComponent { }