import Mouse from 'mouse-event';
import _ from 'lodash';


const REFRESH_INTERVAL = 100;


class MouseMove {
    track(options) {
        this.options = options;
        window.addEventListener('mousemove', _.throttle(this.onMove.bind(this), REFRESH_INTERVAL));
    }

    onMove(event) {
        this.options.onEvent({
            x: Mouse.x(event),
            y: Mouse.y(event)
        });
    }
}

export default new MouseMove();
