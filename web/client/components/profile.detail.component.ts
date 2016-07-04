import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Subscription } from 'rxjs/Subscription';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

@Component({
    selector: 'app',
    templateUrl: './client/views/profile.detail.html',
    providers: [ProfileService]
})

export class ProfileDetailComponent implements OnInit, OnDestroy {
    profile: Profile;
    sub: Subscription;

    constructor(private profileService: ProfileService, private route: ActivatedRoute) {}

    onSubmit() {
        
    }

    ngOnInit() {
        this.profile = new Profile();

        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.profileService.getProfile(id).then(profile => this.profile = profile);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}