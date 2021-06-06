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
//var handCount = setupForm.elements.hand_count;
var submitBtn = setupForm.submit;


/* Event Listeners */
window.addEventListener("load", function() {

    // updates game settings on page
    playerCount.onchange = update;
    chipCount.onchange = update;
    chipValue.onchange = update;
    playStyle.onchange = update;

    // adds form data to sessionStorage
    submitBtn.addEventListener("click", function() {
        sessionStorage.setItem("playerCount", playerCount.value);
        sessionStorage.setItem("chipCount", chipCount.value);
        sessionStorage.setItem("chipValue", chipValue.value);
        sessionStorage.setItem("buyIn", chipCount.value * chipValue.value);
        sessionStorage.setItem("purse", chipCount.value * chipValue.value * playerCount.value);
        sessionStorage.setItem("playStyle", playStyle.value);
        sessionStorage.setItem("handCount", setupForm.elements.hand_count.value);
    });
});

// displays game settings to user
function update() {
    console.log(chipCount.value);
    console.log(chipValue.value);
    console.log(playerCount.value);
    var playerStakes = chipCount.value * chipValue.value
    var purse = playerStakes * playerCount.value;
    /*
    - may come back to this once CSS design is settled
    console.log(playerStakes.toLocaleString('en-US', {style: "currency", currency: "USD"})); 
    */
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
// function getData() {
//     var gameData = {
//         gdPlayerCount: playerCount.value,
//         gdChipCount: chipCount.value,
//         gdBuyIn: chipCount.value * chipValue.value,
//         gdPurse: chipCount.value * chipValue.value * playerCount.value
//     };
// } 
    
/* 
 - Probably best to use a constructor for the player objects and an object 
 literal for the game data.  
 - Or, use an object literal for the game data that then is carried over to 
 the game page where the constructor instantiates the players.
 - Will likely need another object to track chips/cash and another to track 
 hands per deal. 
*/