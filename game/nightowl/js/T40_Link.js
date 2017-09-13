function Loader(basePath, mediator) {
    Object.defineProperties(this, {
        basePath: { value: basePath, writable: false },
        mediator: { value: mediator, writable: false }
    });
    this.load();
}

Loader.prototype.load = function() {
    new IWG.GameManager(this.basePath, this.mediator);
}

if("gameIntegrationFramework" in window) {
    gameIntegrationFramework.start(Loader);
}