var done = function done() {
  console.log('Move submitted.');
  process.exit();
};

var displayBoard = function displayBoard(r1, r2, r3) {
  console.log(
    '%s|%s|%s\n- - -\n%s|%s|%s\n- - -\n%s|%s|%s',
    r1[0],
    r1[1],
    r1[2],
    r2[0],
    r2[1],
    r2[2],
    r3[0],
    r3[1],
    r3[2]
  );  
};

displayBoard(
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
);
// prompt player 1
console.log('Player 1: Select a location to place your "X".');
// use process.stdin to prompt user for input
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(input) {
  console.log('this is the text: ', input);
  if (input === 'quit\n') {
    done();
  }
});

