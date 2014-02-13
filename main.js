// Keep track of each players moves
var player1Taken = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false
};
var player2Taken = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false
};

// Concept of a pair for each player. 15 - pair is either blocking or winning move.
var player1Pairs = {
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false, 
  9: false,
  10: false,
  11: false,
  12: false,
  13: false,
  14: false,
  15: false,
  16: false,
  17: false
};
var player2Pairs = {
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false, 
  9: false,
  10: false,
  11: false,
  12: false,
  13: false,
  14: false,
  15: false,
  16: false,
  17: false
};

// Keep track of moves for concept of a draw
var moveCounter = 0;


var board = document.getElementById('board');

// Delegate event listener to parent table element
board.addEventListener('click', function(ev) {

  if (ev.target.nodeName === "TD") {

    // Human player's move
    var move = +ev.target.id;
    
    // Loop through available cells and match current move with previous moves to create pair
    if (!player1Taken[move] && !player2Taken[move]) {
      for (var i = 0; i <= 9; i++) {
        if (player1Taken[i]) {
          player1Pairs[move + i] = true;
        }
      }
      player1Taken[move] = true;
      moveCounter++;

      // Draw X
      document.getElementById(ev.target.id).innerHTML = 'X';

      // If human get's to 5 moves without a result, it is a draw
      if (moveCounter === 5) {
        alert('Draw!');
        clear();
        return;
      }

      // Now the computer goes
      computerTurn();
    }

  }
});

function computerTurn() {
  // Define variable to keek track of computer's move
  var compMove;

  // If the middle square is available, always take that.
  if (!player2Taken[5] && !player1Taken[5]) {
    compMove = 5;
    player2Taken[compMove] = true;
    document.getElementById(compMove).innerHTML = 'O';
    return;
  }

  // If the human has taken the middle square on the first move, always play the corner
  else if (player1Taken[5] && moveCounter === 1) {
    compMove = 8;
    player2Taken[compMove] = true;
    document.getElementById(compMove).innerHTML = 'O';
    return;
  }

  else {
    for (var i = 1; i <= 9; i++) {
      // Winning move: If computer has a pair and the winning move isnt blocked, WIN!
      if (player2Pairs[15-i] && !player1Taken[i] && !player2Taken[i]) {
        compMove = i;
        document.getElementById(compMove).innerHTML = 'O';
        
        player2Taken[compMove] = true;
        alert('You lose!');

        // Execute clear function 
        clear()
        return;
      }
    }
    for (var i = 1; i <= 9; i++) {
      // Blocking move: If player1 has a pair, block player1 win
      if (player1Pairs[15-i] && !player2Taken[i] && !player1Taken[i]) {
        compMove = i;

        // Create a pair from any previous moves
        for (var j = 1; j <= 9; j++) {
          if (player2Taken[j]) {
            player2Pairs[compMove + j] = true;
          }
        }

        player2Taken[compMove] = true;
        document.getElementById(compMove).innerHTML = 'O';
        return;
      }
    }
    for (var i = 1; i <= 9; i++) {
      // If there are no winning or blocking moves, play anywhere
      if (!compMove && !player2Taken[i] && !player1Taken[i]) {
        compMove = i;

        // Create a pair from any previous moves
        for (var j = 1; j <= 9; j++) {
          if (player2Taken[j]) {
            player2Pairs[compMove + j] = true;
          }
        }

        player2Taken[compMove] = true;
        document.getElementById(compMove).innerHTML = 'O';
        return;
      }
    }
  }
};


function clear() {
  // Reset moves and pairs objects
  for (var i=1; i <= 9; i++) {
    player1Taken[i] = false;
    player2Taken[i] = false;
  }
  for (var i=3; i <= 17; i++) {
    player1Pairs[i] = false;
    player2Pairs[i] = false;
  }
  // reset moveCounter
  moveCounter = 0;

  var cells = document.getElementsByTagName('td');

  // Clear all table cells
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
}




