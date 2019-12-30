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
const Scene = require('Scene');
const Patches = require('Patches');
const Time = require('Time');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

var X = 0;
var Y = -250;
Patches.setScalarValue('posX', X);
Patches.setScalarValue('posY', Y);
// ------------------------- //

export function changeXRight(moveUp,moveLeft) {
    const posXChange = Time.setInterval(function () {
        X = X + 5;
        Patches.setScalarValue('posX', X);
    }, 50);
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
export function changeXLeft(moveUp,moveRight) {
    const posXChange = Time.setInterval(function () {
        X = X - 5;
        Patches.setScalarValue('posX', X);
    }, 50);
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
export function changeY(moveLeft,moveRight) {
    const posYChange = Time.setInterval(function () {
        Y = Y + 5;
        Patches.setScalarValue('posY', Y);
    }, 50);

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

export function startTime(time, timeNumber) {
    Patches.setBooleanValue("timeUp",false);
    let tm = Time.setInterval(function(){
      timeNumber--;
      time.text = timeNumber.toString();
      if(timeNumber < 0) {
        Time.clearInterval(tm);
        Patches.setBooleanValue("timeUp",true);
      }
    },1000);
}
// ------------------------- //

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

// To access scene objects
// const directionalLight = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

// To log messages to the console
// Diagnostics.log('Console message logged from the script.');
