import { Component, OnInit } from '@angular/core';
import { ProbeService } from '../services/probe.service';
import { Reading } from '../models/Reading';

@Component({
    selector: 'app',
    templateUrl: './client/views/probe.html',
    providers: [ProbeService]
})

export class ProbeComponent implements OnInit { 
    currentTemperature: Array<Reading>;

    constructor(private _probeService: ProbeService) {}

    startPollingProbe() {
        this._probeService.currentTemperature$.subscribe((currentTemp) => {
            this.currentTemperature.find(x => x.channel === currentTemp.channel).currentTemperature = currentTemp.currentTemperature;
        });
        this._probeService.startPollingProbe();
    }

    stopPollingProbe() {
       this._probeService.stopPollingProbe(); 
    }

    ngOnInit() {
        this.currentTemperature = new Array<Reading>();
        this.currentTemperature.push({ 'channel' : 0, 'currentTemperature': 0 });
        this.currentTemperature.push({ 'channel' : 1, 'currentTemperature': 0 });
    }
}