import Cookie from 'js-cookie';
import _ from 'lodash';

import Finger from './Finger';
import Time from './Time';
import MouseMove from './trackers/MouseMove';
import MouseButtons from './trackers/MouseButtons';
import Viewport from './trackers/Viewport';
import Flusher from './Flusher';


const FRAME_BUFFER_FLUSH_INTERVAL = 1000;


class Tracker {
    constructor() {
        this.sessionId = null;
        this.frames = [];
    }

    init() {
        return this.initSession();
    }

    start() {
        this.initTrackers();
        this.initFlusher();
    }

    initSession() {
        return new Promise((resolve) => {
            const sessionId = Cookie.get('sessionId');

            if(!sessionId) {
                Finger.get().then((id) => {
                    Cookie.set('sessionId', id);
                    this.sessionId = id;
                    resolve();
                });
            }
            else {
                this.sessionId = sessionId;
                resolve();
            }
        });
    }

    initTrackers() {
        MouseMove.track({
            onEvent: (event) => {
                this.saveFrame({
                    type: 'MouseMove',
                    state: event
                });
            }
        });

        MouseButtons.track({
            onEvent: (event) => {
                this.saveFrame({
                    type: 'MouseButtons',
                    state: event.buttons
                });
            }
        });

        Viewport.track({
            onEvent: (event) => {
                this.saveFrame({
                    type: 'Viewport',
                    state: event
                });
            }
        });
    }

    initFlusher() {
        this.flusherInterval = setInterval(this.flushFrames.bind(this), FRAME_BUFFER_FLUSH_INTERVAL);
    }

    saveFrame(frameData) {
        let newFrame = _.clone(frameData);
        newFrame.time = Time.get();
        newFrame.sessionId = this.sessionId;
        this.frames.push(newFrame);
    }

    flushFrames() {
        const frames = this.frames;
        this.frames = [];

        if(frames.length > 0) {
            Flusher.flush(frames);
        }
    }
}

export default new Tracker();
