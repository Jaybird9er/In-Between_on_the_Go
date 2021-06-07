"use strict"

/* 
Description:
 - stores form data in object to instatiate player objects and game settings object 
 - game settings object determines the end of game play

Notes/Plans:
 - may need object for handling each round of the game
 - may need object to track standings 
 - may need object to track players' hands
 - may need object to track players' chip count

To Do:
1. collect form data; validate with console.log
2. create game object
3. create player consturctor

Author: Jamey Kirk
Date: 05.20.2021
*/

/* Global Variables */
var potTable = document.getElementById("pot_table");
var gameStr = "<table><thead><tr><th>Hand</th><th>Pot</th><th>Cash</th></tr></thead><tbody>";
var playersTable = document.getElementById("player_table");
var tableStr = "<table><thead><tr><th>Player</th><th>Chips</th><th>Cash</th></tr></thead><tbody>";
var playerArr = []; 

/* Objects and Constructors */

// holds game data from setup
var gameData = {
    playerCount: parseInt(sessionStorage.getItem("playerCount")),
    chipCount: parseInt(sessionStorage.getItem("chipCount")),
    chipValue: parseFloat(parseFloat(sessionStorage.getItem("chipValue")).toFixed(2)),
    buyIn: parseFloat(parseFloat(sessionStorage.getItem("buyIn")).toFixed(2)),
    purse: parseFloat(parseFloat(sessionStorage.getItem("purse")).toFixed(2)),
    playStyle: sessionStorage.getItem("playStyle"),
    handLimit: parseInt(sessionStorage.getItem("handCount"))
}

/* Main Program */
window.addEventListener("load", function() {
    // create and update table
    addPlayers();
    playerArr[1][0] -= 4;
    setPot();
    setTable();
    labelTable();
    // check endgame conditions
    endGame();
    
});

/* Functions */

// sets player table with initial chip/cash counts
function addPlayers() {
    for (var i = 0; i < gameData.playerCount; i++) {
        playerArr[i] = [gameData.chipCount];
    }
}

// maintains current pot and hand counts
function setPot() {
    gameStr += "<tr><td>Hand " + gameData.handLimit + "</td><td>" + 0 + "</td><td>" 
    + (playerArr[0][0] * gameData.chipValue).toLocaleString('en-US', {style: "currency", currency: "USD"}) + "</td></tr></tbody>";
    potTable.innerHTML = gameStr;
    potTable.firstElementChild.classList.add("gameTables");
}

// maintains dealer order, and chip and cash counts 
function setTable() {
    for (var i = 0; i < gameData.playerCount; i++) {
        if (i === gameData.playerCount - 1) {
            tableStr += "<tr><td>Player " + (i + 1) + "</td><td>" + playerArr[i][0] + "</td><td>" 
            + (playerArr[i][0] * gameData.chipValue).toLocaleString('en-US', {style: "currency", currency: "USD"}) + "</td></tr></tbody>";
        }
        else{
            tableStr += "<tr><td>Player " + (i + 1) + "</td><td>" + playerArr[i][0] + "</td><td>" 
            + (playerArr[i][0] * gameData.chipValue).toLocaleString('en-US', {style: "currency", currency: "USD"}) + "</td></tr>";
        }
        playersTable.innerHTML = tableStr;
    }
}

// sets classes/id/etc... for table elements
function labelTable() {
    var setChipClass = playersTable.querySelector("table tbody");
    for (var i = 0; i < gameData.playerCount; i++) {
        setChipClass.childNodes[i].childNodes[1].classList.add("chip_count");
    }
}

// determine if end game state is reached
function endGame() {
    if (gameData.playStyle === "one_winner") {
        var inPlayers = gameData.playerCount;
        for (var i = 0; i < gameData.playerCount; i++) {
            if
        }
        console.log(playersTable);
    }
}

/* 
-- May not need player objects. Thinking arrays will work better.

// player constructor
function PlayerObj(chips, cash) {
    // properties for setting initial positions
    this.chips = chips;
    this.cash = cash;
}
// setter and getter methods
// - chips
PlayerObj.prototype.setChips = function(result) {
    this.chips += result;
}
PlayerObj.prototype.getChips = function() {
    return this.chips;
}
// - cash (after buy-in)
PlayerObj.prototype.setCash = function(cValue) {
    this.cash = parseFloat((cValue * this.chips)).toFixed(2);
}
PlayerObj.prototype.getCash = function() {
    return this.cash;
}

var player1 = new PlayerObj(1, gameData.chipCount, gameData.buyIn);

console.log(player1.chips);
console.log(player1.cash);
player1.setChips(-4);
console.log(player1.chips);
player1.setCash(sessionStorage.chipValue);
console.log(parseFloat(player1.cash));
*/

/* 
creates player objects

function addPlayers() {
    for (var i = 0; i < gameData.playerCount; i++) {
        window["player" + i] = new PlayerObj(sessionStorage.chipCount, sessionStorage.buyIn);
    }
    console.log(player2);
} */
/* 
Notes:
 - need to create one function that runs unless conditions are met
    - WTA: all but one player has chips (all others have lost all their chips)
    - consensus: end game button is picked (not deal button)
    - limit: the hand limit is reached
 - if not, hands are automatically dealt with low and high card, and player bets


 - may be best to build out the deck, deal, shuffle, bet constructors first to begin making progress
*/

console.log(gameData.playerCount);
// sessionStorage.setItem("playerCount", parseInt(sessionStorage.getItem("playerCount")) + 2);
console.log(gameData.chipCount);
console.log(gameData.chipValue);
console.log(typeof(gameData.chipValue));
console.log(gameData.buyIn.toLocaleString('en-US', {style: "currency", currency: "USD"}));
console.log(gameData.purse);
console.log(gameData.playStyle);
console.log(gameData.handLimit);