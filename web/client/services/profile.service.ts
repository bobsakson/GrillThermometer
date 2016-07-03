import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Profile } from '../models/profile';
import { ProbeProfile } from '../models/probeProfile';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    getProfiles(): Promise<Profile[]> {
        console.log('Hit the profile HTTP');
        return this.http.get('http://localhost:4000/profile1')
               .toPromise()
               .then((response) => 
                response.json()
                )
               .catch((err) => console.log(err));
    }

    getProfiles2(): Promise<string> {
        console.log('Hit the profile HTTP');
        return this.http.get('http://localhost:4000/profile1')
               .toPromise()
               .then((response) => 
                response.json()[0].name
                )
               .catch((err) => console.log(err));
    }

    getProfile(id): Promise<Profile> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);

        return this.http.get('http://localhost:4000/profile1/', { search: params })
               .toPromise()
               .then((response) => 
                response.json()
                )
               .catch((err) => console.log(err));
    }

    saveProfile(profile: Profile) {

    }

    deleteProfile(id) {

    }
}