"use strict"

/* 
Description:
 - setup.js captures the values from the setup form of setup.html
 - the values are stored using sessionStorage for setting and getting during the game

Author: Jamey Kirk
Date: 05.20.2021
*/


/* Global Variables */
var setupForm = document.forms.setup;
var playerCount = setupForm.player_count;
var chipCount = setupForm.player_chip_count;
var chipValue = setupForm.chip_value;

var buyIn = setupForm.buy_in.value;
var playStyle = setupForm.querySelector("input[name='play_style']:checked").value;

var submitBtn = setupForm.elements.submit;


/* Event Listeners */
window.addEventListener("load", function() {

    

    //setupForm.buy_in.value = 55.00;
    chipCount.onchange = update;
    playerCount.onchange = update;
    chipValue.onchange = update;
    // calculate Player Buy-in
    if (chipCount > 0)
        buyIn = buyInCalc;

    if (playStyle === "hand_limit")
        document.forms.setup.han_count.hidden = false;

    console.log(playerCount);
    console.log(chipCount);
    console.log(playerCount);
    console.log(buyIn);
    console.log(playStyle);

    
});

function update() {
    chipCount = parseInt(chipCount.value)
    console.log(typeof(chipCount));
    chipValue = parseFloat(chipValue.value);
    console.log(typeof(chipValue));
    playerCount = parseInt(playerCount.value)
    console.log(typeof(playerCount));
}


function buyInCalc () {
    return chipCount * chipValue;
}

function submitBtn () {
    
}

/* Session Storage Functions to Get and Set Data */
