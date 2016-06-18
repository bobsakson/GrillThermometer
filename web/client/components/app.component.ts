import { Component } from '@angular/core';
import { RouteConfig, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { ProbeComponent } from './probe.component';

@Component({
    selector: 'app',
    templateUrl: './client/views/app.html'
})

@RouteConfig([
  {
    path: '/probe',
    name: 'Probe',
    component: ProbeComponent
  }
])

export class AppComponent { }