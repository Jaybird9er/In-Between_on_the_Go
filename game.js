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

// holds initial game data
var gameData = {
    playerCount: parseInt(sessionStorage.getItem("playerCount")),
    chipCount: parseInt(sessionStorage.getItem("chipCount")),
    buyIn: parseFloat(parseFloat(sessionStorage.getItem("buyIn")).toFixed(2)),
    purse: parseFloat(parseFloat(sessionStorage.getItem("purse")).toFixed(2)),
    playStyle: sessionStorage.getItem("playStyle"),
    handLimit: parseInt(sessionStorage.getItem("handCount")),
}

console.log(gameData.playerCount + 5);
// sessionStorage.setItem("playerCount", parseInt(sessionStorage.getItem("playerCount")) + 2);
console.log(gameData.chipCount);
console.log(gameData.buyIn);
console.log(gameData.purse);
console.log(gameData.playStyle);
console.log(gameData.handLimit);