import { Component } from '@angular/core';
import { ProfileService } from './client/services/profile.service';

@Component({
    selector: 'app',
    templateUrl: './client/views/profile.html',
    providers: [ProfileService]
})

export class ProfileComponent {
    
}