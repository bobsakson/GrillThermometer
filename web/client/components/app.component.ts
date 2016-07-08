import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ProbeComponent } from './probe.component';
import { ProfileComponent } from './profile.component';

@Component({
    selector: 'app',
    templateUrl: './client/views/app.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent { 
    constructor(private router: Router) {}

    isActiveRoute(route) {
        return route === this.router.url;
    }
}