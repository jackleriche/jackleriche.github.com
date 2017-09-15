var loaderObj = null;
var Loader = (function () {
    function Loader(obj) {
        loaderObj = obj;
        initGame();
    }
    return Loader;
})();


function initGame()  {
    new IWG.GameManager(loaderObj);
}