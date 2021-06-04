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

var buyIn = setupForm.buy_in;
var gamePurse = setupForm.game_purse;
var playStyle = setupForm.querySelector("input[name='play_style']:checked");

var submitBtn = setupForm.elements.submit;


/* Event Listeners */
window.addEventListener("load", function() {

    

    //setupForm.buy_in.value = 55.00;
    playerCount.onchange = update;
    chipCount.onchange = update;
    chipValue.onchange = update;
    playStyle.onchange = update;
    // calculate Player Buy-in
    if (chipCount > 0)
        buyIn = buyInCalc;

    if (playStyle === "hand_limit")
        document.forms.setup.han_count.hidden = false;
    
});

function update() {
    //chipCount = parseInt(chipCount.value);
    console.log(parseInt(chipCount.value));
    console.log(parseFloat(chipValue.value));
    console.log(parseInt(playerCount.value));
    var cash = parseFloat(chipCount.value) * parseFloat(chipValue.value)
    var prize = cash * playerCount.value;
    //console.log(cash.toLocaleString('en-US', {style: "currency", currency: "USD"}));
    buyIn.value = cash.toFixed(2);
    gamePurse.value = prize.toFixed(2);
    console.log(setupForm.querySelector("input[name='play_style']:checked").value);
}


function buyInCalc () {
    return chipCount * chipValue;
}

function submitBtn () {
    
}

/* Session Storage Functions to Get and Set Data */
