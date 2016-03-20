/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global;
            var Path = (function () {
                function Path() {
                    if (Path._instance) {
                        throw new Error("Error: Instantiation failed: Use SpriteSheets.getInstance() instead of new.");
                    }
                    Path._instance = this;
                }
                Path.getInstance = function () {
                    return Path._instance;
                };
                Path._instance = new Path();
                Path.PATHS_A = [
                    [1, 4, 8, 11, 15, 18, 22, 25, 41],
                    [1, 4, 8, 12, 15, 19, 22, 25, 41],
                    [1, 4, 8, 11, 15, 19, 22, 25, 41],
                    [1, 5, 8, 12, 15, 18, 22, 25, 41],
                    [1, 5, 9, 12, 15, 18, 22, 25, 41],
                    [1, 5, 9, 12, 15, 19, 22, 25, 41],
                    [1, 5, 8, 11, 15, 18, 22, 25, 41],
                    [1, 4, 8, 12, 15, 19, 22, 26, 42],
                    [1, 4, 8, 11, 15, 18, 22, 25, 42],
                    [1, 4, 8, 11, 15, 18, 22, 26, 42],
                    [1, 4, 8, 11, 15, 19, 22, 26, 42],
                    [1, 4, 8, 11, 15, 19, 22, 25, 42],
                    [1, 4, 8, 11, 15, 19, 23, 26, 42],
                    [1, 5, 8, 11, 15, 18, 22, 25, 42],
                    [1, 5, 8, 12, 15, 19, 22, 26, 42],
                    [1, 5, 9, 12, 15, 18, 22, 26, 42],
                    [1, 5, 8, 11, 15, 19, 22, 26, 42],
                    [1, 4, 8, 12, 15, 19, 22, 26, 43],
                    [1, 4, 8, 11, 15, 19, 23, 26, 43],
                    [1, 4, 8, 12, 15, 18, 22, 26, 43],
                    [1, 4, 8, 11, 15, 19, 22, 26, 43],
                    [1, 5, 8, 12, 15, 19, 23, 26, 43],
                    [1, 5, 8, 11, 15, 18, 22, 26, 43],
                    [1, 5, 9, 12, 15, 19, 23, 26, 43],
                    [1, 5, 9, 12, 15, 19, 22, 26, 43],
                    [1, 4, 8, 12, 15, 19, 23, 28, 44],
                    [1, 4, 8, 11, 15, 19, 23, 28, 44],
                    [1, 5, 8, 11, 15, 19, 23, 28, 44],
                    [1, 5, 8, 12, 15, 19, 23, 28, 44],
                    [1, 5, 9, 12, 15, 19, 23, 28, 44],
                    [1, 5, 9, 13, 17, 20, 23, 28, 44],
                    [1, 5, 9, 13, 17, 21, 24, 28, 44],
                    [1, 5, 9, 13, 17, 20, 24, 28, 44],
                    [1, 4, 8, 12, 15, 19, 23, 28, 45],
                    [1, 4, 8, 11, 15, 19, 23, 28, 45],
                    [1, 5, 8, 12, 15, 19, 23, 28, 45],
                    [1, 5, 8, 11, 15, 19, 23, 28, 45],
                    [1, 5, 9, 13, 17, 20, 23, 28, 45],
                    [1, 5, 9, 13, 17, 20, 24, 28, 45],
                    [1, 5, 9, 13, 17, 21, 24, 28, 45],
                    [1, 5, 9, 13, 17, 21, 24, 29, 45],
                    [1, 5, 9, 13, 17, 21, 24, 29, 46],
                    [1, 5, 9, 13, 17, 20, 24, 29, 46],
                    [1, 4, 8, 12, 16, 19, 22, 25, 41],
                    [1, 5, 9, 13, 16, 19, 22, 25, 41],
                    [1, 5, 9, 12, 16, 19, 22, 25, 41],
                    [1, 4, 8, 12, 16, 19, 22, 25, 42],
                    [1, 5, 9, 12, 16, 19, 22, 26, 42],
                    [1, 5, 9, 13, 16, 19, 22, 25, 42],
                    [1, 4, 8, 12, 16, 20, 23, 26, 43],
                    [1, 5, 9, 12, 16, 19, 23, 26, 43],
                    [1, 5, 8, 12, 16, 20, 23, 26, 43],
                    [1, 5, 9, 13, 16, 20, 23, 28, 44],
                    [1, 5, 8, 12, 16, 20, 24, 28, 44],
                    [1, 4, 8, 12, 16, 19, 23, 28, 44],
                    [1, 4, 8, 12, 16, 20, 24, 28, 45],
                    [1, 5, 9, 12, 16, 19, 23, 28, 45],
                    [1, 5, 9, 13, 16, 20, 24, 28, 45],
                    [1, 4, 8, 12, 16, 20, 24, 29, 46],
                    [1, 5, 9, 13, 16, 20, 24, 29, 46],
                    [1, 5, 9, 12, 16, 20, 24, 29, 46]
                ];
                Path.PATHS_B = [
                    [2, 5, 8, 11, 15, 18, 22, 25, 41],
                    [2, 5, 8, 11, 15, 19, 22, 25, 41],
                    [2, 5, 8, 12, 15, 18, 22, 25, 41],
                    [2, 5, 8, 12, 15, 19, 22, 25, 41],
                    [2, 5, 9, 12, 15, 18, 22, 25, 41],
                    [2, 5, 9, 12, 15, 19, 22, 25, 41],
                    [2, 6, 9, 12, 15, 18, 22, 25, 41],
                    [2, 6, 9, 12, 15, 19, 22, 25, 41],
                    [2, 5, 8, 11, 15, 18, 22, 25, 42],
                    [2, 5, 8, 11, 15, 19, 22, 26, 42],
                    [2, 5, 8, 12, 15, 19, 22, 26, 42],
                    [2, 5, 8, 12, 15, 18, 22, 26, 42],
                    [2, 6, 10, 13, 17, 20, 23, 26, 42],
                    [2, 5, 8, 11, 15, 19, 23, 26, 43],
                    [2, 5, 8, 11, 15, 19, 22, 26, 43],
                    [2, 5, 8, 11, 15, 18, 22, 26, 43],
                    [2, 5, 8, 11, 15, 19, 23, 26, 43],
                    [2, 5, 9, 12, 15, 19, 23, 26, 43],
                    [2, 5, 9, 12, 15, 18, 22, 26, 43],
                    [2, 5, 9, 13, 17, 20, 23, 26, 43],
                    [2, 6, 9, 13, 17, 20, 23, 26, 43],
                    [2, 6, 10, 13, 17, 20, 23, 26, 43],
                    [2, 6, 10, 14, 17, 20, 23, 26, 43],
                    [2, 5, 8, 11, 15, 19, 23, 28, 44],
                    [2, 5, 9, 12, 15, 19, 23, 28, 44],
                    [2, 5, 8, 12, 15, 19, 23, 28, 44],
                    [2, 6, 10, 14, 17, 20, 24, 28, 44],
                    [2, 6, 9, 13, 17, 21, 24, 28, 44],
                    [2, 6, 10, 13, 17, 20, 24, 28, 44],
                    [2, 6, 10, 14, 17, 20, 23, 28, 44],
                    [2, 6, 10, 14, 17, 21, 24, 28, 44],
                    [2, 6, 10, 14, 17, 20, 24, 28, 45],
                    [2, 5, 8, 11, 15, 19, 23, 28, 45],
                    [2, 5, 9, 12, 15, 19, 23, 28, 45],
                    [2, 6, 9, 13, 17, 20, 24, 28, 45],
                    [2, 6, 10, 14, 17, 20, 24, 29, 45],
                    [2, 5, 8, 12, 15, 19, 23, 28, 45],
                    [2, 6, 10, 14, 17, 21, 24, 29, 46],
                    [2, 6, 9, 13, 17, 21, 24, 29, 46],
                    [2, 6, 10, 13, 17, 21, 24, 29, 46],
                    [2, 6, 10, 14, 17, 21, 24, 29, 46],
                    [2, 5, 9, 13, 17, 21, 24, 29, 46],
                    [2, 5, 9, 13, 17, 20, 24, 29, 46],
                    [2, 6, 9, 13, 16, 19, 22, 25, 41],
                    [2, 5, 9, 12, 16, 19, 22, 25, 41],
                    [2, 6, 10, 13, 16, 19, 22, 25, 41],
                    [2, 5, 9, 12, 16, 19, 22, 26, 42],
                    [2, 6, 10, 13, 16, 19, 22, 25, 42],
                    [2, 5, 9, 12, 16, 19, 23, 26, 43],
                    [2, 6, 9, 13, 16, 20, 23, 26, 43],
                    [2, 6, 9, 13, 16, 19, 22, 26, 43],
                    [2, 6, 9, 12, 16, 20, 23, 28, 44],
                    [2, 5, 8, 12, 16, 19, 23, 28, 44],
                    [2, 6, 10, 13, 16, 19, 23, 28, 44],
                    [2, 5, 8, 12, 16, 20, 24, 28, 45],
                    [2, 5, 9, 13, 16, 19, 23, 28, 45],
                    [2, 6, 10, 13, 16, 20, 24, 28, 45],
                    [2, 5, 8, 12, 16, 20, 24, 29, 46],
                    [2, 5, 9, 13, 16, 20, 24, 29, 46],
                    [2, 6, 10, 13, 16, 20, 24, 29, 46]
                ];
                Path.PATHS_C = [
                    [3, 6, 9, 12, 15, 18, 22, 25, 41],
                    [3, 6, 9, 12, 15, 19, 22, 25, 41],
                    [3, 6, 9, 12, 15, 18, 22, 25, 42],
                    [3, 6, 9, 12, 15, 18, 22, 26, 42],
                    [3, 6, 9, 12, 15, 19, 22, 25, 42],
                    [3, 6, 9, 12, 15, 19, 22, 26, 42],
                    [3, 6, 9, 12, 15, 18, 22, 26, 43],
                    [3, 6, 9, 12, 15, 19, 22, 26, 43],
                    [3, 6, 9, 12, 15, 19, 23, 26, 43],
                    [3, 6, 9, 13, 17, 20, 23, 26, 43],
                    [3, 6, 10, 13, 17, 20, 23, 26, 43],
                    [3, 7, 10, 13, 17, 20, 23, 26, 43],
                    [3, 7, 10, 14, 17, 20, 23, 26, 43],
                    [3, 7, 10, 14, 17, 21, 24, 28, 44],
                    [3, 7, 10, 13, 17, 20, 23, 28, 44],
                    [3, 7, 10, 13, 17, 20, 24, 28, 44],
                    [3, 6, 9, 12, 15, 19, 23, 28, 44],
                    [3, 6, 9, 13, 17, 20, 23, 28, 44],
                    [3, 6, 9, 13, 17, 20, 24, 28, 44],
                    [3, 7, 10, 14, 17, 20, 24, 28, 44],
                    [3, 7, 10, 14, 17, 21, 24, 28, 45],
                    [3, 7, 10, 14, 17, 21, 24, 29, 45],
                    [3, 7, 10, 13, 17, 21, 24, 29, 45],
                    [3, 7, 10, 13, 17, 20, 24, 28, 45],
                    [3, 7, 10, 14, 17, 20, 24, 28, 45],
                    [3, 6, 9, 13, 17, 20, 24, 28, 45],
                    [3, 6, 10, 14, 17, 21, 24, 28, 45],
                    [3, 6, 9, 13, 17, 20, 24, 28, 45],
                    [3, 6, 9, 12, 15, 19, 23, 28, 45],
                    [3, 6, 10, 13, 17, 20, 24, 28, 45],
                    [3, 7, 10, 14, 17, 21, 24, 29, 46],
                    [3, 7, 10, 14, 17, 20, 24, 29, 46],
                    [3, 7, 10, 13, 17, 20, 24, 29, 46],
                    [3, 7, 10, 13, 17, 21, 24, 29, 46],
                    [3, 6, 10, 14, 17, 21, 24, 29, 46],
                    [3, 6, 10, 14, 17, 20, 24, 29, 46],
                    [3, 6, 10, 13, 17, 20, 24, 29, 46],
                    [3, 6, 10, 13, 17, 21, 24, 29, 46],
                    [3, 6, 9, 13, 17, 21, 24, 29, 46],
                    [3, 6, 9, 13, 17, 20, 24, 29, 46],
                    [3, 6, 10, 13, 16, 19, 22, 25, 41],
                    [3, 7, 10, 13, 16, 19, 22, 25, 41],
                    [3, 6, 9, 13, 16, 19, 22, 25, 41],
                    [3, 7, 10, 13, 16, 19, 22, 25, 42],
                    [3, 6, 9, 13, 16, 19, 22, 26, 42],
                    [3, 7, 10, 13, 16, 19, 23, 26, 43],
                    [3, 6, 9, 13, 16, 19, 22, 26, 43],
                    [3, 6, 9, 12, 16, 20, 23, 26, 43],
                    [3, 6, 9, 12, 16, 20, 23, 28, 44],
                    [3, 7, 10, 13, 16, 19, 23, 28, 44],
                    [3, 6, 9, 13, 16, 20, 23, 28, 44],
                    [3, 7, 10, 13, 16, 20, 24, 29, 45],
                    [3, 6, 9, 12, 16, 20, 24, 28, 45],
                    [3, 6, 9, 13, 16, 20, 24, 28, 45],
                    [3, 6, 9, 12, 16, 20, 24, 29, 46],
                    [3, 6, 10, 13, 16, 20, 24, 29, 46],
                    [3, 7, 10, 13, 16, 20, 24, 29, 46]
                ];
                Path.PATH_A_MINIGAMES = [43, 60];
                Path.PATH_B_MINIGAMES = [43, 59];
                Path.PATH_C_MINIGAMES = [40, 56];
                Path.PATH_A_NORMAL = [0, 42];
                Path.PATH_B_NORMAL = [0, 42];
                Path.PATH_C_NORMAL = [0, 39];
                return Path;
            })();
            iwg.Path = Path;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Path.js.map