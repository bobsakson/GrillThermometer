import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
declare var io: any;

@Injectable()
export class ProbeService implements OnInit {
    currentTemperature$: Observable<number>;
    private _currentTemperatureObserver: Observer<number>;
    private _temperatureReadings: Array<number>;

    socket: any;
    
    constructor() {
        this._temperatureReadings = new Array<number>();
        this.currentTemperature$ = new Observable<number>(observer =>  this._currentTemperatureObserver = observer).share();
    }

    startPollingProbe() {
       this.socket = io('http://localhost:4000');
       this.socket.on('temperatureReading', (currenttemp) => this.temperatureReading(currenttemp));
       this.socket.emit('startPollingProbe');
    }

    stopPollingProbe() {
        this.socket.emit('stopPollingProbe');
    }

    temperatureReading(currentTemp: number) {
        console.log('Received a reading', currentTemp);
        this._temperatureReadings.push(currentTemp);
        this._currentTemperatureObserver.next(currentTemp);
    }

    ngOnInit() {
        // this.socket = io('http://localhost:4000');
        
        // this.socket.on('temperatureReading', this.temperatureRading);
    }
}