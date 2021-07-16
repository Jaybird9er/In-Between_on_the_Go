/* Global Variables */
var potTable = document.getElementById("pot_table");
var pot = null;
var gameStr = "<table><thead><tr><th>Hand</th><th>Pot</th><th>Cash</th></tr></thead><tbody>";
var playersTable = document.getElementById("player_table");
var tableStr = "<table><thead><tr><th>Player</th><th>Chips</th><th>Cash</th></tr></thead><tbody>";
var playerArr = []; 
var setDealer = 0;
var setPlayer = 0;
var handsPlayed = 0;

/* Objects and Constructors */

// holds game data from setup
var setupData = {
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
    
    // create and manage player table
    setTable();
    
    var gameOver = false
    while(!gameOver) {
        labelTable()
        
    }
    // create and manage pot table
    setPot();
        
});

/* Functions */

// sets player table with initial chip/cash counts
function addPlayers() {
    for (var i = 0; i < setupData.playerCount; i++) {
        playerArr[i] = setupData.chipCount;
    }
}

// maintains dealer order, and chip and cash counts 
function setTable() {
    for (var i = 0; i < setupData.playerCount; i++) {
        tableStr += "<tr><td>Player " + (i + 1) + "</td><td>" + playerArr[i] + "</td><td>" 
        + (playerArr[i] * setupData.chipValue).toLocaleString('en-US', {style: "currency", currency: "USD"}) + "</td></tr>";
        playersTable.innerHTML = tableStr;
    }
    // check endgame conditions
    endGame();
    // determine deal order and set hand count
    player();

    result();
}