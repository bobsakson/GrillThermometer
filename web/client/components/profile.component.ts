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
    mytest: string;

    constructor(private _profileService: ProfileService) {}

    ngOnInit() {
        this.profiles = new Array<Profile>();
        // var profile = new Profile();
        // profile.id = 1;
        // profile.name = 'Pork Ribs';
        // profile.description = 'Baby back ribs';
        // this.profiles.push(profile);
        
        this._profileService.getProfiles().then(x => 
            this.profiles = x
            //this.mytest = x
        );
    }
}