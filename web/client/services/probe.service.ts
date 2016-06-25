import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { Reading } from '../models/Reading';
declare var io: any;

@Injectable()
export class ProbeService implements OnInit {
    currentTemperature$: Observable<Reading>;
    private _currentTemperatureObserver: Observer<Reading>;
    private _temperatureReadings: Array<Reading>;

    socket: any;
    
    constructor() {
        this._temperatureReadings = new Array<Reading>();
        this.currentTemperature$ = new Observable<Reading>(observer =>  this._currentTemperatureObserver = observer).share();
    }

    startPollingProbe() {
       this.socket = io('http://localhost:4000');
       this.socket.on('temperatureReading', (reading) => this.temperatureReading(reading));
       this.socket.emit('startPollingProbe');
    }

    stopPollingProbe() {
        this.socket.emit('stopPollingProbe');
    }

    temperatureReading(reading: any) {
        console.log('Received a reading', reading.currentTemperature);
        this._temperatureReadings.push(reading);
        this._currentTemperatureObserver.next(reading);
    }

    ngOnInit() {
        // this.socket = io('http://localhost:4000');
        
        // this.socket.on('temperatureReading', this.temperatureRading);
    }
}