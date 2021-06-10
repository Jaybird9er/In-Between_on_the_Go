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
var pot = 0;
var gameStr = "<table><thead><tr><th>Hand</th><th>Pot</th><th>Cash</th></tr></thead><tbody>";
var playersTable = document.getElementById("player_table");
var tableStr = "<table><thead><tr><th>Player</th><th>Chips</th><th>Cash</th></tr></thead><tbody>";
var playerArr = []; 
var setDealer = 0;
var setPlayer = 0;
var handsPlayed = 0;

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

/* 
gameData.handLimit = 0;
 - used this to check that the "limit hands" endgame condition works
 - need to add a function to track this and count up for each hand
 - will make it possible to call buttons for consenus games to continue/end games
 */

/* Main Program */
window.addEventListener("load", function() {
    // establish initial chip counts
    addPlayers();
    // playerArr[0] -= 23;
    // playerArr[1] -= 23;
    // playerArr[2] -= 23;
    // playerArr[3] -= 23;
    // playerArr[4] -= 23;
    // playerArr[5] -= 23;
    // playerArr[6] -= 23;
    // playerArr[7] -= 23;
    // playerArr[8] -= 23;
    
    // create and manage pot table
    setPot();
    // create and manage player table
    setTable();
    
});

/* Functions */

// sets player table with initial chip/cash counts
function addPlayers() {
    for (var i = 0; i < gameData.playerCount; i++) {
        playerArr[i] = gameData.chipCount;
    }
}

// maintains dealer order, and chip and cash counts 
function setTable() {
    for (var i = 0; i < gameData.playerCount; i++) {
        if (i === gameData.playerCount - 1) {
            tableStr += "<tr><td>Player " + (i + 1) + "</td><td>" + playerArr[i] + "</td><td>" 
            + (playerArr[i] * gameData.chipValue).toLocaleString('en-US', {style: "currency", currency: "USD"}) + "</td></tr></tbody>";
        }
        else{
            tableStr += "<tr><td>Player " + (i + 1) + "</td><td>" + playerArr[i] + "</td><td>" 
            + (playerArr[i] * gameData.chipValue).toLocaleString('en-US', {style: "currency", currency: "USD"}) + "</td></tr>";
        }
        playersTable.innerHTML = tableStr;
    }
    // add .chip_count to each player's column
    labelTable();
    // check endgame conditions
    endGame();
    // determine deal order and set hand count
    player();
}

// sets class/id/etc... for table elements
function labelTable() {
    var setChipClass = playersTable.querySelector("table tbody");
    for (var i = 0; i < gameData.playerCount; i++) {
        setChipClass.childNodes[i].childNodes[1].classList.add("chip_count");
    }
}

// dealer order begins with first player and is used to determine the number of hands played
function player() {
    setPlayer++;
    setDealer = handsPlayed % gameData.playerCount;
    // for now, skips players with 0 chips; will change it to offer them one buyback
    var noChipsPlayer = true;
    if (document.getElementsByClassName("chip_count")[setDealer % gameData.playerCount].textContent === "0") {
        while(noChipsPlayer) {
            setDealer++;
            if (document.getElementsByClassName("chip_count")[setDealer % gameData.playerCount].textContent !== "0") {
                noChipsPlayer = false;
            }
        }
    }
    noChipsPlayer = true;
    if (document.getElementsByClassName("chip_count")[setPlayer % gameData.playerCount].textContent === "0") {
        while(noChipsPlayer) {
            setPlayer++;
            if (document.getElementsByClassName("chip_count")[setPlayer % gameData.playerCount].textContent !== "0") {
                noChipsPlayer = false;
            }
        }
    }
    // after confirming player can still has chips, set players as dealer, player, or self deal 
    if (setPlayer % gameData.playerCount === setDealer) {
        playersTable.querySelectorAll("tbody tr")[setDealer].firstElementChild.textContent = "Self Deal";
        playersTable.querySelectorAll("tbody tr")[setDealer].className = "self_deal";
        // could use a function here to trigger after player makes bet
        setPlayer++;
        if (gameData.playStyle === "hand_limit") {
            handsPlayed--;
        }
        else {
            handsPlayed++;
        }
        
    }
    else {
        playersTable.querySelectorAll("tbody tr")[setDealer].firstElementChild.textContent = "Dealer";
        playersTable.querySelectorAll("tbody tr")[setDealer].className = "dealer";
        playersTable.querySelectorAll("tbody tr")[setPlayer % gameData.playerCount].className = "player";
    }
}

// determine if end game state is reached
function endGame() {
    // determine if only one player has chips
    if (gameData.playStyle === "one_winner") {
        var outPlayers = document.getElementsByClassName("chip_count");
        var countOut= gameData.playerCount;
        for (var i = 0; i < gameData.playerCount; i++) {
            if (parseInt(outPlayers[i].textContent) < 1) {
                countOut--;
            }
        }
        if (countOut === 1) {
            window.location = "endgame.html"
        }
    }
    else if (gameData.playStyle === "hand_limit" && gameData.handLimit === 0) {
        window.location = "endgame.html"
    }
    // if only one player remains then "winner takes all" applies
    else if (gameData.playStyle === "hand_limit" || gameData.playStyle === "consensus") {
        var outPlayers = document.getElementsByClassName("chip_count");
        var countOut= gameData.playerCount;
        for (var i = 0; i < gameData.playerCount; i++) {
            if (parseInt(outPlayers[i].textContent) < 1) {
                countOut--;
            }
        }
        if (countOut === 1) {
            window.location = "endgame.html"
        }
    }
}

// maintains current pot and hand counts
function setPot() {
    // automatically adds players' ante to pot
    ante();
    // fill pot table
    var trackHands = gameData.playStyle === "hand_limit" ? gameData.handLimit:handsPlayed + 1;
    gameStr += "<tr><td>Hand " + trackHands + "</td><td>" + pot + "</td><td>" 
    + (pot * gameData.chipValue).toLocaleString('en-US', {style: "currency", currency: "USD"}) + "</td></tr></tbody>";
    potTable.innerHTML = gameStr;
    potTable.firstElementChild.classList.add("gameTables");
}

/* Note: 
- without buyback-in function players may be forced out of the game by the auto ante
- for now this is a winner take-all strategy
- eventually this should be modified to allow buybacks when forced out by ante
*/
// adds each player's ante to the pot unless they don't have chips
function ante() {
    var setPot = 0;
    if (pot === 0) {
        for (var i = 0; i < gameData.playerCount; i++) {
            if (playerArr[i] > 0) {
                playerArr[i] -= 1;
                pot++;
            }
        }
        setPot = pot;
    }
    else if (pot > 0) {
        pot -= 8;
        setPot = pot;
    }
    return setPot;

    /* 
    New Direction:
     - Thinking I need to consolidate all functions and global variables into an object literal
     - This may make it easier to manage player chip counts and table pot
     - May be best to have null values in the object and set property values in the "load" function
     */
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