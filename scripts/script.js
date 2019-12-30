/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Time = require('Time');
const Patches = require('Patches');

// ------------------------- //

var X = 0;
var Y = -250;
const moveLeft = Patches.getBooleanValue('moveLeft');
const moveRight = Patches.getBooleanValue('moveRight');
const moveUp = Patches.getBooleanValue('moveUp');

// ------------------------- //

Patches.setScalarValue('posX', X);
Patches.setScalarValue('posY', Y);

// ------------------------- //

function changeXRight() {
    const posXChange = Time.setInterval(function () {
        X = X + 5;
        Patches.setScalarValue('posX', X);
    }, 200);
    moveUp.monitor().subscribe(function () {
        if(moveUp.pinLastValue()){
            Time.clearInterval(posXChange);
        }
    });
    moveLeft.monitor().subscribe(function () {
        if(moveLeft.pinLastValue()){
            Time.clearInterval(posXChange);
        }
    });
}
function changeXLeft() {
    const posXChange = Time.setInterval(function () {
        X = X - 5;
        Patches.setScalarValue('posX', X);
    }, 200);
    moveUp.monitor().subscribe(function () {
        if(moveUp.pinLastValue()){
            Time.clearInterval(posXChange);
        }
    });
    moveRight.monitor().subscribe(function () {
        if(moveRight.pinLastValue()){
            Time.clearInterval(posXChange);
        }
    });
}
function changeY() {
    const posYChange = Time.setInterval(function () {
        Y = Y + 5;
        Patches.setScalarValue('posY', Y);
    }, 200);

    moveRight.monitor().subscribe(function () {
        if(moveRight.pinLastValue()){
            Time.clearInterval(posYChange);
        }
    });
    moveLeft.monitor().subscribe(function () {
        if(moveLeft.pinLastValue()){
            Time.clearInterval(posYChange);
        }
    });
}

// ------------------------- //


moveUp.monitor().subscribe(function () {
    if(moveUp.pinLastValue()){
        changeY();
    }

});
moveRight.monitor().subscribe(function () {
    if(moveRight.pinLastValue()){
        changeXRight();
    }
});
moveLeft.monitor().subscribe(function () {
    if(moveLeft.pinLastValue()){
        changeXLeft();
    }
});
