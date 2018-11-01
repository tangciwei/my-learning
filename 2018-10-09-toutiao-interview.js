let timeInit = new Date().getTime();

function handleResize() {
    console.log('执行', new Date().getTime() - timeInit);
}

function throttle(fn, time) {
    let old = null;
    let first = true;
    let timer = null;
    return function (...arg) {
        let now = new Date().getTime();
        if (first) {
            old = now;
            first = false;
            return fn(...arg);
        }

        if (now - old >= time) {
            old = now;
            return fn(...arg);
        }
        else {
            // 推迟
            if (!timer) {
                timer = setTimeout(() => {
                    clearTimeout(timer);
                    old = new Date().getTime();
                    timer = null;
                    return fn(...arg);
                }, time - (now - old));
            }
        }
    };
}

var cb = throttle(handleResize, 100);

setTimeout(cb, 0);
setTimeout(cb, 10);
setTimeout(cb, 30);
setTimeout(cb, 110);
setTimeout(cb, 370);

// document.body.addEventListener('resize', cb, false);

// input: 1：0ms 2: 10ms 3: 30ms   4: 110ms 5: 370ms

// output: 1: 0ms 3: 100ms 4: 200ms 5: 370ms
