import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Subscription } from 'rxjs/Subscription';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { ProbeProfile } from '../models/probeProfile';

@Component({
    selector: 'app',
    templateUrl: './client/views/profile.detail.html',
    providers: [ProfileService]
})

export class ProfileDetailComponent implements OnInit, OnDestroy {
    profile: Profile;
    sub: Subscription;
    showAddProbe: boolean;
    newProbe: ProbeProfile;

    constructor(private profileService: ProfileService, private route: ActivatedRoute) {}

    addProbe() {
        this.newProbe.isDeleted = false;
        this.showAddProbe = true;
    }
    
    saveProbe() {
        this.profile.probes.push(this.newProbe);
        this.newProbe = new ProbeProfile();
        this.showAddProbe = false;
    }

    cancelAddProbe() {
        this.newProbe = new ProbeProfile();
        this.showAddProbe = false;
    }

    deleteProbe(id) {
        this.profile.probes.find(probe => probe.id === id).isDeleted = true;
    }

    onSubmit() {
        this.profileService.saveProfile(this.profile).then(response => console.log(response));
    }

    ngOnInit() {
        this.profile = new Profile();
        this.profile.probes = new Array<ProbeProfile>();
        this.newProbe = new ProbeProfile();

        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];

            if(id !== 0) {
                this.profileService.getProfile(id).then(profile => this.profile = profile);
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}