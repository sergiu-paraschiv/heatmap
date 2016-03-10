if(!Date.now) {
    Date.now = () => {
        return new Date().getTime();
    };
}


class Time {
    get() {
        return Date.now();
    }
}

export default new Time();
