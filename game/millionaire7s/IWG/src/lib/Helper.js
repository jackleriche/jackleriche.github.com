(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot = window.com.camelot,
        iwg = camelot.iwg,
        lib = iwg.lib,
        R = lib.R,
        SS = lib.flassets.MasterSS,
        Splash = lib.Splash,
        core = camelot.core,

        Helper = function () {
            if (typeof Helper.instance === "object") {
                return Helper.instance;
            }
            //singleton
            var _instance = this;

            var _promptRevealing = 0;

            this.getPromptRevealing = function () {
                return _promptRevealing;
            }

            this.setPromptRevealing = function (prv) {
                _promptRevealing = prv;
            }

            Helper.instance = this;
        }

        /*/
    	methods to change cursor type
    /*/
    Helper.cursorPointer = function () {
        document.body.style.cursor = 'pointer';
    };
    Helper.cursorDefault = function () {
        document.body.style.cursor = 'default';
    };

    /*/
        Method to move object index to top
    /*/
    Helper.moveToTop = function (t) {
        t.parent.setChildIndex(t, t.parent.getNumChildren() - 1);
    }

    /*/
    	methods to help shuffle
    /*/
    Helper.shuffle = function (o) { //v1.0
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    /*/
		method to make images
	/*/
    Helper.makeBitmapImage = function (name, pos, alpha, doReg) {

        var BitmapImage = new createjs.Sprite(SS.ss);
        BitmapImage.gotoAndStop(name);
        BitmapImage.x = pos.x;
        BitmapImage.y = pos.y;

        var w = null,
            h = null;
        if (BitmapImage.getBounds()) {
            w = BitmapImage.getBounds().width;
            h = BitmapImage.getBounds().height;
        }

        if (doReg) {
            BitmapImage.regX = w / 2;
            BitmapImage.regY = h / 2;
        }


        if (alpha < 1) {
            BitmapImage.alpha = alpha;
        }
        return BitmapImage;
    }

    /*/
		restart prompts
	/*/
    var isPrompting = false;
    var prompt = null;
    var isRevealing = 0;
    Helper.stopPrompt = function () {

        isPrompting = false;
        if (R.prompts.length > 0) {
            for (var prompt in R.prompts) {
                // remove prompts
                var parent = R.prompts[prompt].parent;
                parent.removeChild(R.prompts[prompt]);
            }
            R.prompts = [];
        }

        for (var r in R.REMINDERS) {
            R.REMINDERS[r].seek(0);
            R.REMINDERS[r].stop();
        }
        R.REMINDERS = [];
        for (var game in R.GAMES) {
            R.GAMES[game].stopReminder();
        }
    }

    var i = 0;
    Helper.showPrompt = function (screen) {

        if (isPrompting === false) {
            isPrompting = true;
            prompt = setTimeout(function () {

                if (R.GAMES[2].getIsFinished() != true || R.GAMES[3].getIsFinished() != true) {

                    // make new prompt arrow
                    var promptRight = Helper.makeBitmapImage('arrow_right', {
                        x: 900,
                        y: 160
                    }, 0);
                    R.LEFTGAMEWINDOW.addChild(promptRight);

                    var leftAnimation = TweenMax.to(promptRight, 1, {
                        alpha: 1,
                        yoyo: true,
                        repeat: -1
                    });

                    R.prompts.push(promptRight);
                    R.promptAnimation.push(leftAnimation)
                }

                if (R.GAMES[0].getIsFinished() != true || R.GAMES[1].getIsFinished() != true) {
                    // make new prompt arrow
                    var promptLeft = Helper.makeBitmapImage('arrow_left', {
                        x: 10,
                        y: 160
                    }, 0);
                    R.RIGHTGAMEWINDOW.addChild(promptLeft);

                    var rightAnimation = TweenMax.to(promptLeft, 1, {
                        alpha: 1,
                        yoyo: true,
                        repeat: -1
                    });

                    R.prompts.push(promptLeft);
                    R.promptAnimation.push(rightAnimation)

                }

                for (var game in R.GAMES) {
                    if (R.GAMES[game].getIsFinished() === false) {
                        R.GAMES[game].startReminder();
                    };
                }

            }, 4000);
        }

    }



    /*/
		method to make shimmer
	/*/
    Helper.makeShimmer = function (iconString, coords, shinner) {

        var shimmerContainer = new createjs.Container(),
            startX = coords.x,
            startY = coords.y,
            shinerStartX = shinner.startX,
            shinerEndX = shinner.endX,
            shinerY = shinner.y,
            scale = shinner.scale,
            shimmer = Helper.makeBitmapImage("shimmer", {
                x: shinerStartX,
                y: shinerY
            }, 1),
            iconMask = new createjs.Shape();


        iconMask.x = startX;
        iconMask.y = startY;
        iconMask.graphics.p(iconString).cp().ef();

        shimmer.scaleX = shimmer.scaleY = scale;

        shimmerContainer.addChild(shimmer);
        shimmer.mask = iconMask;
        shimmerContainer.addChild(iconMask);

        R.shimmerAnimation.to(shimmer, 0.5, {
            x: shinerEndX
        }, 0);

        return shimmerContainer;
    }

    /*/
		method to make sparkle
	/*/
    Helper.makeSparkle = function (sparkle) {

        var sparkleContainer = new createjs.Container(),
            sparkleX = sparkle.x,
            sparkleY = sparkle.y,
            scale = sparkle.scale,
            alpha = sparkle.alpha,
            rotation = sparkle.rotation,
            delay = sparkle.delay,
            timeScale = sparkle.timeScale,
            sparkle = Helper.makeBitmapImage("sparkle", {
                x: sparkleX,
                y: sparkleY
            }, 1, true);

        sparkle.scaleX = sparkle.scaleY = 0;
        sparkle.alpha = 0;
        sparkleContainer.addChild(sparkle);

        R.sparkleAnimation.to(sparkle, 0.5, {
            delay: delay,
            alpha: alpha,
            rotation: rotation,
            scaleX: scale,
            scaleY: scale,
            timeScale: timeScale
        }, 0);

        return sparkleContainer;
    }

    /*/
		reveal
	/*/
    Helper.reveal = function (reverse, tar, d) {

        if (!d) {
            d = 0;
        }

        var parent = tar.parent;

        if (reverse) {

            tar.scaleY = tar.scaleX = 0;

            var clone = tar.clone();
            clone.scaleX = clone.scaleY = 0;
            clone.y = tar.y - 20;
            if (parent != null) {
                clone.y = parent.y + 90;
                clone.x = parent.x + 120;

            }
            clone.alpha = 0;

            TweenLite.to(tar, 0.3, {
                delay: d,
                scaleY: 1,
                scaleX: 1
            });
            TweenLite.to(clone, 0.3, {
                delay: d,
                alpha: 0.8,
                scaleY: 1.2,
                scaleX: 1.2,
                y: clone.y + 20
            });
            TweenLite.to(clone, 0.3, {
                delay: d + 0.15,
                alpha: 0
            });

            R.STAGE.addChild(clone);

        } else {

        }
    }

    /*/
		move container coords
	/*/
    Helper.moveCoOrd = function (container, axis, newCoOrd) {

        if (axis === "x") {
            container.x = newCoOrd;
        }
        if (axis === "y") {
            container.y = newCoOrd;
        }
    }

    /*/
		Contains
	/*/
    Helper.contains = function (that, it) {
        return that.indexOf(it) !== -1;
    };

    /*/
		Convert Prize Amount
	/*/
    Helper.checkObject = function (value, ref) {
        if (ref.hasOwnProperty(value)) {
            var icon = ref[value];
            return icon;
        } else {
            core.IWG.ame('error', {
                mes: ['error 11']
            });
        }
    }

    /*/
		Helper check array
	/*/
    Helper.checkArray = function (value, ref) {

        return ref.indexOf(value) > -1;
    }
    /*/
		Remove index from array
	/*/
    Helper.removeIndex = function (array, index) {

        var ar = array;

        if (index > -1) {
            ar.splice(index, 1);
        }

        return ar;

    }

    /*/
		Random from interval Int
	/*/
    Helper.randomFromInterval = function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    /*/
        Random from interval
    /*/
    Helper.randomFromIntervalRaw = function (min, max) {
        return Math.random() * (max - min) + min;
    }

    /*
    Fix 1Mil Prize name
    */
    Helper.fixPrizeValue = function (value) {
        if (value == 1000000) {
            return "1mil";
        } else {
            return value;
        }

    }


    //namespace path
    iwg._class("iwg.lib.Helper", Helper);
}(window));