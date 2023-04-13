class CloudSync {
    base;
    ws;

    constructor(_base, _ws) {
        this.base = _base;
        this.ws = new WebSocket(_ws);
        this.ws.onmessage = this.onMessage.bind(this);
    }

    onMessage(event) {
        let data = JSON.parse(event.data);
        if (data.type === "sync") {
            this.base.sync(data.data);
        }
    }

    send(data) {
        this.ws.send(JSON.stringify(data));
    }

    sync(data) {
        this.send({
            type: "sync",
            data: data
        });
    }

    close() {
        this.ws.close();
    }

}