import Firebase from 'firebase';
import _ from 'lodash';


const FRAME_TYPES_TO_IDS = {
    'MouseMove': 1,
    'MouseButtons': 2,
    'Viewport': 3
};


class Flusher {
    constructor() {
        this.ref = new Firebase('https://heatmap-server.firebaseio.com/frames');
    }

    flush(frames) {
        _.each(frames, (frame) => {
            this.ref.push(this.serialize(frame));
        });
    }

    serialize(frame) {
        let s = {
            i: FRAME_TYPES_TO_IDS[frame.type],
            t: frame.time,
            s: frame.sessionId
        };

        if(frame.type === 'MouseMove') {
            s.x = frame.state.x;
            s.y = frame.state.y;
        }

        if(frame.type === 'MouseButtons') {
            s.b = frame.state;
        }

        if(frame.type === 'Viewport') {
            s.w = frame.state.w;
            s.h = frame.state.h;
        }

        return s;
    }
}

export default new Flusher();
