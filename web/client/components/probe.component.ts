import { Component } from '@angular/core';
import { ProbeService } from '../services/probe.service';

@Component({
    selector: 'app',
    templateUrl: './client/views/probe.html',
    providers: [ProbeService]
})

export class ProbeComponent { 
    currentTemperature: number;

    constructor(private _probeService: ProbeService) {}

    startPollingProbe() {
        this._probeService.currentTemperature$.subscribe((currentTemp) => {
            this.currentTemperature = currentTemp;
        });
        this._probeService.startPollingProbe();
    }

    stopPollingProbe() {
       this._probeService.stopPollingProbe(); 
    }
}