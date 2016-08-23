import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/common';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Subscription } from 'rxjs/Subscription';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { ProbeProfile } from '../models/probeProfile';

@Component({
    selector: 'app',
    templateUrl: './client/views/profile.detail.html',
    providers: [ProfileService],
    directives: [ROUTER_DIRECTIVES]
})

export class ProfileDetailComponent implements OnInit, OnDestroy {
    profile: Profile;
    sub: Subscription;
    showAddProbe: boolean;
    newProbe: ProbeProfile;
    selectedProbe: ProbeProfile;
    probes: Array<ProbeProfile>;

    constructor(private profileService: ProfileService, private route: ActivatedRoute) {}

    addProbe() {
        this.newProbe.isDeleted = false;
        this.showAddProbe = true;
    }
    
    saveProbe() {
        //this.profile.probes.push(this.newProbe);
        this.profile.ProbeProfiles.push(this.newProbe);
        this.newProbe = new ProbeProfile();
        this.showAddProbe = false;
    }

    cancelAddProbe() {
        this.newProbe = new ProbeProfile();
        this.showAddProbe = false;
    }

    deleteProbe(id) {
        // this.profile.probes.find(probe => probe.id === id).isDeleted = true;
        this.profile.ProbeProfiles.find(probe => probe.id === id).isDeleted = true;
    }

    selectProbe(id) {
        this.selectedProbe = this.profile.ProbeProfiles.find(p => p.id === +id);
    }

    onSubmit() {
        this.profileService.saveProfile(this.profile).then(response => console.log(response));
    }

    ngOnInit() {
        this.profile = new Profile();
        this.profile.probes = new Array<ProbeProfile>();
        this.profile.ProbeProfiles = new Array<ProbeProfile>();
        this.newProbe = new ProbeProfile();
        this.selectedProbe = new ProbeProfile();
        this.probes = new Array<ProbeProfile>();

        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];

            if(id !== 0) {
                this.profileService.getProfile(id).then(profile => {
                    this.profile = profile;
                    this.selectedProbe = profile.ProbeProfiles.find(p => p.isDeleted === false);
                });
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}