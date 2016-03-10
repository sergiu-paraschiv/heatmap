const REFRESH_INTERVAL = 100;


class Viewport {
    track(options) {
        this.options = options;
        this.onResize();
        window.addEventListener('resize',  _.throttle(this.onResize.bind(this), REFRESH_INTERVAL));
    }

    onResize() {
        this.options.onEvent(this.getSize());
    }

    getSize() {
        return {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        };
    }
}

export default new Viewport();
