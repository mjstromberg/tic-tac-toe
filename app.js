var Board = function() {
  this.moves = [' ', ' ', ' ',
                ' ', ' ', ' ',
                ' ', ' ', ' '];
  this.round = 1;
};

Board.prototype.addMove = function(xo, location) {
  this.moves[location - 1] = xo;
};

Board.prototype.boardLocationEmpty = function(location) {
  return this.moves[location - 1] === ' ';
};

Board.prototype.checkGameStatus = function(xo) {
  if ( (this.moves[0] === xo && this.moves[1] === xo && this.moves[2] === xo) ||
       (this.moves[3] === xo && this.moves[4] === xo && this.moves[5] === xo) ||
       (this.moves[6] === xo && this.moves[7] === xo && this.moves[8] === xo) ||
       (this.moves[0] === xo && this.moves[3] === xo && this.moves[6] === xo) ||
       (this.moves[1] === xo && this.moves[4] === xo && this.moves[7] === xo) ||
       (this.moves[2] === xo && this.moves[5] === xo && this.moves[8] === xo) ||
       (this.moves[0] === xo && this.moves[4] === xo && this.moves[8] === xo) ||
       (this.moves[2] === xo && this.moves[4] === xo && this.moves[6] === xo)
  ) {
    return 'winner';
  } else if (this.round === 9) {
    return 'cat\'s game';
  } else {
    return 'continue';
  }
};

Board.prototype.displayBoard = function() {
  console.log(
    '%s|%s|%s\n- - -\n%s|%s|%s\n- - -\n%s|%s|%s',
    this.moves[0],
    this.moves[1],
    this.moves[2],
    this.moves[3],
    this.moves[4],
    this.moves[5],
    this.moves[6],
    this.moves[7],
    this.moves[8]
  );
};

Board.prototype.done = function() {
  console.log('Game over.');
  process.exit();
};

Board.prototype.playRound = function() {
  var player = this.round % 2 !== 0 ? 'Player1' : 'Player2';
  console.log(player + ' , choose an open space (1 through 9).');

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.once('data', function(input) {
    if ( /[1-9]\n/.test(input) ) {
      if ( this.boardLocationEmpty(input) ) {
        var xo = this.round % 2 !== 0 ? 'X' : 'O';
        this.addMove(xo, input);
        
        if (this.checkGameStatus(xo) === 'winner') {
          console.log(player + ' is the winner!');
          this.done();
        } else if (this.checkGameStatus(xo) === 'cat\'s game') {
          console.log('It\'s a cat\'s game!');
          this.done();
        } else {
          this.round++;
          this.displayBoard();
          this.playRound();
        }
      } else {
        console.log('That space is taken already. Try again.');
        this.playRound();
      }
    } else if (input === 'quit\n') {
      this.done();
    } else {
      console.log('Invalid input. Try again.');
      this.playRound();
    }
  }.bind(this));  
};

var board = new Board();
board.displayBoard();
board.playRound();
