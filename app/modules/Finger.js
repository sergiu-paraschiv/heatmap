import Promise from 'bluebird';
import Fingerprint2 from 'fingerprintjs2';


class Finger {
    constructor() {
        this.fingerprint = new Fingerprint2();
    }

    get() {
        return new Promise((resolve) => this.fingerprint.get(resolve));
    }
}

export default new Finger();
