"use strict"

/* 
Description:
 - setup.js captures the values from the setup form of setup.html
 - the values are stored using sessionStorage for setting and getting during the game

Author: Jamey Kirk
Date: 05.20.2021
*/


/* Global Variables */
var playerCount = document.forms.setup.player_count.value;
var chipCount = document.forms.setup.chip_count.value;
var chipValue = document.forms.setup.chip_value.value;
chipValue = parseFloat(chipValue);
var buyIn = document.forms.setup.buy_in.value;
var playStyle = document.querySelector("form[name='setup'] input[name='play_style']:checked").value;

var submitBtn = document.forms.setup.elements.submit;


/* Event Listeners */
window.addEventListener("load", function() {

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

function buyInCalc () {
    return chipCount * chipValue;
}

function submitBtn () {
    
}

/* Session Storage Functions to Get and Set Data */
