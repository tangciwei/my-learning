self.onmessage = function (e) {
    const port = e.ports[0];
    port.postMessage('this is from worker1');
};
