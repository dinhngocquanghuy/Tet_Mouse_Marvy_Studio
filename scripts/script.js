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
  changeXLeft,changeXRight,changeY, startTime
} = require("./function.js");

const moveLeft = Patches.getBooleanValue('moveLeft');
const moveRight = Patches.getBooleanValue('moveRight');
const moveUp = Patches.getBooleanValue('moveUp');
var time = Scene.root.find("time");
var count = Scene.root.find("count");
var tapScreen = Patches.getBooleanValue("tapScreen");
var collideWithBone = Patches.getBooleanValue("collideWithBone");

// ------------------------- //

// Handle Tap Screen Start Game
var countNumber = 3;
Patches.setBooleanValue("isTap", true);
tapScreen.monitor().subscribe(function(){
  Patches.setBooleanValue("isTap", false);
  let t = Time.setInterval(function(){
    --countNumber;
    count.text = countNumber.toString();
    if(countNumber < 0) {
      count.text = "";
      Patches.setBooleanValue("startGame",true);
      Time.clearInterval(t);
    }
  },1000);

  Time.setTimeout(function(){
    // Handle Mouse Movement
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
  },3000);
});

// Handle Time Count Down
var timeNumber = 55;
var t = Time.setInterval(function(){
  if(countNumber < 0) {
    startTime(time,timeNumber);
    Time.clearInterval(t);
  }
},1);

// Handle Decrease Life When collideWithBone
var life_count = 3;
Patches.setScalarValue("life_count",life_count);
collideWithBone.monitor().subscribe(function(){
  life_count = life_count - 1;
  Patches.setScalarValue("life_count", life_count);
});
