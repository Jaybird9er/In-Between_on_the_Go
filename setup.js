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

    // updates game settings
    playerCount.onchange = update;
    chipCount.onchange = update;
    chipValue.onchange = update;
    playStyle.onchange = update;

    // setGame function creates creates object from form data
        
});

// displays game settings to user
function update() {
    console.log(parseInt(chipCount.value));
    console.log(parseFloat(chipValue.value));
    console.log(parseInt(playerCount.value));
    var playerStakes = parseFloat(chipCount.value) * parseFloat(chipValue.value)
    var purse = playerStakes * playerCount.value;
    //console.log(playerStakes.toLocaleString('en-US', {style: "currency", currency: "USD"}));
    buyIn.value = playerStakes.toFixed(2);
    gamePurse.value = purse.toFixed(2);
    if (playStyle.value === "hand_limit") {
        setupForm.hand_count.hidden = false;
        setupForm.hand_count.required = true;
        document.getElementById("handL_description").hidden = false;
        document.getElementById("consensus_description").hidden = true;
        document.getElementById("oneW_description").hidden = true;
    }
    else if (playStyle.value === "consensus") {
        setupForm.hand_count.hidden = true;
        setupForm.hand_count.required = false;
        setupForm.elements.hand_count.value = "";
        document.getElementById("handL_description").hidden = true;
        document.getElementById("consensus_description").hidden = false;
        document.getElementById("oneW_description").hidden = true;
    }
    else if (playStyle.value === "one_winner") {
        setupForm.hand_count.hidden = true;
        setupForm.hand_count.required = false;
        setupForm.elements.hand_count.value = "";
        document.getElementById("handL_description").hidden = true;
        document.getElementById("consensus_description").hidden = true;
        document.getElementById("oneW_description").hidden = false;
    }
    console.log(playStyle.value);
}


/* game form data object */
