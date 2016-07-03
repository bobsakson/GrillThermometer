import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ProbeComponent } from './probe.component';
import { ProfileComponent } from './profile.component';

@Component({
    selector: 'app',
    templateUrl: './client/views/app.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent { }