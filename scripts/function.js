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
const Materials = require('Materials');
const Textures = require('Textures');
const TouchGestures = require('TouchGestures');
const Random = require('Random');

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

//function random item from cat thinking.
function catDream(){

	//Declare item array variable.
	const dreamItem = ["none", "chimxanh", "chimdo", "caxanh", "cado", "cavang"];

	//Declare item array from cat thinking.
	var arrItem = [];

	//Declare item random number.
	var item = Math.floor(Math.random()*6);

	//Check if item random number == 0 : +1.
	if(item == 0){
		item += 1;
	}

	Diagnostics.log(item);

	//Loop assigned item for array length.
	for (var i = 1, o = 6; i <= item; i++, o--) {
		//Check if o == 0 : +1.
		if(o == 0){
			o += 1;
		}

		//Variable random for dreamItem.
		randomNumber = Math.floor(Random.random()*o);

		//Check if random == 0 : +1.
		if(randomNumber == 0){
			randomNumber += 1;
		}

		//Assigned item for array.
		arrItem.push(dreamItem[randomNumber]);
		Diagnostics.log("In loop: " + randomNumber);

		//Remove item from total array if it's availiable in cat thinking.
		dreamItem.splice(randomNumber, 1);
		Diagnostics.log("Total: " + dreamItem);
		Diagnostics.log("Item " + i + ": " + arrItem);

	}
	Diagnostics.log(arrItem);
	return arrItem;
}

const itemPost = ["caxanh", "chimxanh"];
//function compare result from mouse to cat.
function compareResult(itemGet, itemPost){
	//Sort array switch to Json and compare.
	if(JSON.stringify(itemGet.sort()) == JSON.stringify(itemPost.sort())){
		Diagnostics.log("WIN");
	}else{
		Diagnostics.log("LOSE");
	}
}

compareResult(catDream(), itemPost);
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
