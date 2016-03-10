import Mouse from 'mouse-event';


class MouseButtons {
    track(options) {
        window.addEventListener('mousedown', (event) => {
            options.onEvent({
                buttons: Mouse.buttons(event)
            });
        });

        window.addEventListener('mouseup', (event) => {
            options.onEvent({
                buttons: Mouse.buttons(event)
            });
        });
    }
}

export default new MouseButtons();
