import { Component } from '@angular/core';
import { RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ProbeComponent } from './probe.component';

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
  }
])

export class AppComponent { }