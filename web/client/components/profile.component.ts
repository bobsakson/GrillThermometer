import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app',
    templateUrl: './client/views/profile.html',
    providers: [ProfileService]
})

export class ProfileComponent implements OnInit {
    profiles: Array<Profile>;

    constructor(private profileService: ProfileService, private router: Router) {}

    ngOnInit() {
        this.profiles = new Array<Profile>();
        
        this.profileService.getProfiles().then(profiles => this.profiles = profiles);
    }

    addProfile() {
        this.router.navigate(['/profile', 0]);
    }
}