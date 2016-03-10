import Tracker from './modules/Tracker';
import Player from './modules/Player';


window.Heatmap = (options) => {
    if(options.player) {
        Player.init().then(() => {
            Player.getFrames(options.sessionId).then((frames) => {
                Player.draw(options.element, frames);
            });
        });
    }
    else {
        Tracker.init().then(() => {
            Tracker.start();
        });
    }
};
