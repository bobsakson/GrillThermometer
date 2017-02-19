import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProbeComponent } from './probe.component';
import { ProfileComponent } from './profile.component';

@Component({
    selector: 'app',
    templateUrl: './client/views/app.html'
})

export class AppComponent { 
    constructor(private router: Router) {}

    isActiveRoute(route) {
        return route === this.router.url;
    }
}