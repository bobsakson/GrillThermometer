import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../models/profile';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app',
    templateUrl: './client/views/profileDetail.html',
    providers: [ProfileService]
})

export class ProfileDetailComponent implements OnInit {
    profile: Profile;

    constructor(private _profileService: ProfileService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.profile = new Profile();
       
        // this._profileService.getProfile(params['id']).then(x => 
        //     this.profile = x
        // );

        // TODO: need to destroy the subscription in OnDestroy eventually.
        //this.sub = this.route.params.subscribe(params => {
        this.route.params.subscribe(params => {
            let id = +params['id'];
            this._profileService.getProfile(id).then(x => 
                this.profile = x
            );
        });
    }
}