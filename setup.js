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
var playerCount = setupForm.elements.player_count;
var chipCount = setupForm.elements.player_chip_count;
var chipValue = setupForm.elements.chip_value;

var buyIn = setupForm.elements.buy_in;
var gamePurse = setupForm.elements.game_purse;
var playStyle = setupForm.elements.play_style;

var submitBtn = setupForm.submit;


/* Event Listeners */
window.addEventListener("load", function() {

    playerCount.onchange = update;
    chipCount.onchange = update;
    chipValue.onchange = update;
    playStyle.onchange = update;
    // calculate Player Buy-in
    if (chipCount > 0)
        buyIn = buyInCalc;
        
});

function update() {
    console.log(parseInt(chipCount.value));
    console.log(parseFloat(chipValue.value));
    console.log(parseInt(playerCount.value));
    var cash = parseFloat(chipCount.value) * parseFloat(chipValue.value)
    var prize = cash * playerCount.value;
    //console.log(cash.toLocaleString('en-US', {style: "currency", currency: "USD"}));
    buyIn.value = cash.toFixed(2);
    gamePurse.value = prize.toFixed(2);
    // var hands = setupForm.querySelector("input[name='play_style']:checked");
    /* This doesn't seem to be working quite right */
    if (playStyle.value === "hand_limit") {
        setupForm.hand_count.hidden = false;
    }
    else if (playStyle.value === "one_winner" || playStyle.value === "consensus") {
        setupForm.hand_count.hidden = true;
        setupForm.hand_count.value = "";

    }
    console.log(playStyle.value);
}


/* Session Storage Functions to Get and Set Data */
