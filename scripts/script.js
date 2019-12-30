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
const {
  changeXLeft,changeXRight,changeY
} = require("./function.js");

const moveLeft = Patches.getBooleanValue('moveLeft');
const moveRight = Patches.getBooleanValue('moveRight');
const moveUp = Patches.getBooleanValue('moveUp');

// ------------------------- //



moveUp.monitor().subscribe(function () {
    if(moveUp.pinLastValue()){
        changeY(moveLeft,moveRight);
    }

});
moveRight.monitor().subscribe(function () {
    if(moveRight.pinLastValue()){
        changeXRight(moveUp,moveLeft);
    }
});
moveLeft.monitor().subscribe(function () {
    if(moveLeft.pinLastValue()){
        changeXLeft(moveUp,moveRight);
    }
});
