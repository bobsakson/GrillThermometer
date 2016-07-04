import { Component, OnInit } from '@angular/core';
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

    constructor(private profileService: ProfileService) {}

    ngOnInit() {
        this.profiles = new Array<Profile>();
        
        this.profileService.getProfiles().then(profiles => this.profiles = profiles);
    }
}