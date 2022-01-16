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

    6/11
 New Direction:
     - Thinking I need to consolidate all functions and global variables into an object literal
     - This may make it easier to manage player chip counts and table pot
     - May be best to have null values in the object and set property values in the "load" function

Author: Jamey Kirk
Date: 05.20.2021
*/

/* Global variables */
let potTable = document.getElementById("pot_table");
let pot = null;
let gameStr = "<table><thead><tr><th>Hand</th><th>Pot</th><th>Cash</th></tr></thead><tbody>";
let playersTable = document.getElementById("player_table");
let tableStr = "<table><thead><tr><th>Player</th><th>Chips</th><th>Cash</th></tr></thead><tbody>";
let playerArr = []; 
let setDealer = 0;
let setPlayer = 0;
let handsPlayed = 0;

/* Objects and Constructors */

// holds game data from setup
const setupData = {
    playerCount: parseInt(sessionStorage.getItem("playerCount")),
    chipCount: parseInt(sessionStorage.getItem("chipCount")),
    chipValue: parseFloat(parseFloat(sessionStorage.getItem("chipValue")).toFixed(2)),
    buyIn: parseFloat(parseFloat(sessionStorage.getItem("buyIn")).toFixed(2)),
    purse: parseFloat(parseFloat(sessionStorage.getItem("purse")).toFixed(2)),
    playStyle: sessionStorage.getItem("playStyle"),
    handLimit: parseInt(sessionStorage.getItem("handCount"))
}

/* 
setupData.handLimit = 0;
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
    // console.log(playerArr[0]);
    // console.log(pot);
    
});

/* Functions */

// sets player table with initial chip/cash counts
function addPlayers() {
    for (let i = 0; i < setupData.playerCount; i++) {
        playerArr[i] = setupData.chipCount;
    }
}

// maintains dealer order, and chip and cash counts 
function setTable() {
    for (let i = 0; i < setupData.playerCount; i++) {
        tableStr += "<tr><td>Player " + (i + 1) + "</td><td>" + playerArr[i] + "</td><td>" 
        + (playerArr[i] * setupData.chipValue).toLocaleString('en-US', {style: "currency", currency: "USD"}) + "</td></tr>";
        playersTable.innerHTML = tableStr;
    }
    // add .chip_count to each player's column
    labelTable();
    // check endgame conditions
    endGame();
    // determine deal order and set hand count
    player();

    result();
}

// sets class/id/etc... for table elements
function labelTable() {
    let setChipClass = playersTable.querySelector("table tbody");
    for (let i = 0; i < setupData.playerCount; i++) {
        setChipClass.childNodes[i].childNodes[1].classList.add("chip_count");
    }
}

// dealer order begins with first player and is used to determine the number of hands played
function player() {
    setPlayer++;
    setDealer = handsPlayed % setupData.playerCount;
    // for now, skips players with 0 chips; will change it to offer them one buyback
    let noChipsPlayer = true;
    if (document.getElementsByClassName("chip_count")[setDealer % setupData.playerCount].textContent === "0") {
        while(noChipsPlayer) {
            setDealer++;
            if (document.getElementsByClassName("chip_count")[setDealer % setupData.playerCount].textContent !== "0") {
                noChipsPlayer = false;
            }
        }
    }
    noChipsPlayer = true;
    if (document.getElementsByClassName("chip_count")[setPlayer % setupData.playerCount].textContent === "0") {
        while(noChipsPlayer) {
            setPlayer++;
            if (document.getElementsByClassName("chip_count")[setPlayer % setupData.playerCount].textContent !== "0") {
                noChipsPlayer = false;
            }
        }
    }
    // after confirming player still has chips, assign dealer, player, or self deal labels
    if (setPlayer % setupData.playerCount === setDealer) {
        playersTable.querySelectorAll("tbody tr")[setDealer].firstElementChild.textContent = "Self Deal";
        playersTable.querySelectorAll("tbody tr")[setDealer].className = "self_deal";
        // could use a function here to trigger after player makes bet
        setPlayer++;
        if (setupData.playStyle === "hand_limit") {
            handsPlayed--;
        }
        else {
            handsPlayed++;
        }
        
    }
    else {
        playersTable.querySelectorAll("tbody tr")[setDealer].firstElementChild.textContent = "Dealer";
        playersTable.querySelectorAll("tbody tr")[setDealer].className = "dealer";
        playersTable.querySelectorAll("tbody tr")[setPlayer % setupData.playerCount].className = "player";
    }
}

// determine if end game state is reached
function endGame() {
    // determine if only one player has chips
    if (setupData.playStyle === "one_winner") {
        let outPlayers = document.getElementsByClassName("chip_count");
        let countOut = setupData.playerCount;
        for (let i = 0; i < setupData.playerCount; i++) {
            if (parseInt(outPlayers[i].textContent) < 1) {
                countOut--;
            }
        }
        if (countOut === 1) {
            window.location = "endgame.html"
        }
    }
    else if (setupData.playStyle === "hand_limit" && setupData.handLimit === 0) {
        window.location = "endgame.html"
    }
    // if only one player remains then "winner takes all" applies
    else if (setupData.playStyle === "hand_limit" || setupData.playStyle === "consensus") {
        let outPlayers = document.getElementsByClassName("chip_count");
        let countOut= setupData.playerCount;
        for (let i = 0; i < setupData.playerCount; i++) {
            if (parseInt(outPlayers[i].textContent) < 1) {
                countOut--;
            }
        }
        if (countOut === 1) {
            window.location = "endgame.html"
        }
    }
    else {
        
    }
}

// maintains current pot and hand counts
function setPot() {
    // update balancePot to maintain antes and bets
    balancePot();
    // fill pot table
    let trackHands = setupData.playStyle === "hand_limit" ? setupData.handLimit:handsPlayed + 1;
    gameStr += "<tr><td>Hand " + trackHands + "</td><td>" + pot + "</td><td>" 
    + (pot * setupData.chipValue).toLocaleString('en-US', {style: "currency", currency: "USD"}) + "</td></tr></tbody>";
    potTable.innerHTML = gameStr;
    potTable.firstElementChild.classList.add("gameTables");
}

/* Note: 
- without buyback-in function players may be forced out of the game by the auto ante
- for now this is a winner take-all strategy
- eventually this should be modified to allow buybacks when forced out by ante
*/

// adds initial ante, processes current player's bet, and re-ups pot if it hits 0 or when handCount increases
function balancePot() {
    // initial ante
    if (pot === null) {
        reUpPot();
    }
    // get player's bet
    // will need event listener for "deal" button
    if (pot > 0) {
        pot -= setBet();
    }
    if (pot === 0) {
        reUpPot();
    }
}

// adds each player's ante to the pot unless they don't have chips
function reUpPot() {
    for (let i = 0; i < setupData.playerCount; i++) {
        if (playerArr[i] > 0) {
            playerArr[i] -= 1;
            pot++;
        }
    }
}

// after endgame is sorted, add parameter to accpet bet values when bet buttons are hit
function setBet() {
    let bet = Math.floor(Math.random() * pot + 1);
    if (bet > pot) {
        bet = 1;
    }
    console.log(bet);
    return bet;
}

function result() {
    let winOrLose = Math.random() < 0.5;
    if(winOrLose)
    playerArr[playersTable.querySelector(".player").rowIndex - 1] + setBet();
    console.log(winOrLose);
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

let player1 = new PlayerObj(1, setupData.chipCount, setupData.buyIn);

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
    for (let i = 0; i < setupData.playerCount; i++) {
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

console.log(setupData.playerCount);
// sessionStorage.setItem("playerCount", parseInt(sessionStorage.getItem("playerCount")) + 2);
console.log(setupData.chipCount);
console.log(setupData.chipValue);
console.log(typeof(setupData.chipValue));
console.log(setupData.buyIn.toLocaleString('en-US', {style: "currency", currency: "USD"}));
console.log(setupData.purse);
console.log(setupData.playStyle);
console.log(setupData.handLimit);