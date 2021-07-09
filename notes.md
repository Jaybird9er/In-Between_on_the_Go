Current Game Order:
addPlayers()
setPot()
    +--balancePot()
        +--reUpPot()
setTable()
labelTable()
endGame()
player()
result()
    +--setBet()

New Game Order:
addPlayers() -> creates array for all players; assigns each player's initial chip count
setTable() -> sets up both tables: 'current hand' and 'players'
(while loop)
    lableTable() -> lables current player/dealer/self deal
    player() -> current player places bet
    endGame() -> use while loop to check endGame condition; returns true/false 
(end loop)

