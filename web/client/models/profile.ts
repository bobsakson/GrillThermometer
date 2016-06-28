import { ProbeProfile } from './probeProfile';

export class Profile {
    id: number;
    name: string;
    description: string;
    probes: Array<ProbeProfile>;
}