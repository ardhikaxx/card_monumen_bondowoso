import gsap from 'https://cdn.skypack.dev/gsap@3.12.0';

const UPDATE_MOUSE = ({ x, y }) => {
    gsap.set(document.documentElement, {
        '--x': gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
        '--y': gsap.utils.mapRange(0, window.innerHeight, -1, 1, y)
    });
};

const UPDATE_TOUCH = ({ touches }) => {
    const { clientX: x, clientY: y } = touches[0];
    gsap.set(document.documentElement, {
        '--x': gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
        '--y': gsap.utils.mapRange(0, window.innerHeight, -1, 1, y)
    });
};

window.addEventListener('mousemove', UPDATE_MOUSE);
window.addEventListener('touchmove', UPDATE_TOUCH);

const handleOrientation = ({ beta, gamma }) => {
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    gsap.set(document.documentElement, {
        '--x': gsap.utils.clamp(-1, 1, isLandscape ? gsap.utils.mapRange(-45, 45, -1, 1, beta) : gsap.utils.mapRange(-45, 45, -1, 1, gamma)),
        '--y': gsap.utils.clamp(-1, 1, isLandscape ? gsap.utils.mapRange(20, 70, 1, -1, Math.abs(gamma)) : gsap.utils.mapRange(20, 70, 1, -1, beta))
    });
};

const START = () => {
    var _DeviceOrientationEve;
    if ((_DeviceOrientationEve =
        DeviceOrientationEvent) !== null && _DeviceOrientationEve !== void 0 && _DeviceOrientationEve.requestPermission) {
        Promise.all([
            DeviceOrientationEvent.requestPermission()]).
            then(results => {
                if (results.every(result => result === "granted")) {
                    window.addEventListener("deviceorientation", handleOrientation);
                }
            });
    } else {
        window.addEventListener("deviceorientation", handleOrientation);
    }
};

document.body.addEventListener('click', START, { once: true });