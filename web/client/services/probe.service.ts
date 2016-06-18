import { Injectable, OnInit } from '@angular/core';
declare var io: any;

@Injectable()
export class ProbeService implements OnInit {
    socket: any;
    
    startPollingProbe() {
       this.socket.emit('startPollingProbe');
    }

    stopPollingProbe() {
        this.socket.emit('stopPollingProbe');
    }

    temperatureRading() {
        console.log('Received a reading');
    }

    ngOnInit() {
        this.socket = io('http://localhost:4000');
        this.socket.on('temperatureReading', this.temperatureRading);
    }
}