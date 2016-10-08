console.log("It's Aliiive!!!!");

var gridSquares = document.getElementsByClassName('gridSquare');
var movementKeys = ['a', 'w', 'd', 's'];
var strafe = '';
var target = 0;
playerOne = {
  avatar: '<img src="images/linkright.jpg">',
  up: '<img src="images/linkup.jpg">',
  down: '<img src="images/linkdown.jpg">',
  left: '<img src="images/linkleft.jpg">',
  right: '<img src="images/linkright.jpg">',
  position: 0,
  status: '',
  action: 'idle',
  direction: 'd'
}
playerTwo = {
  avatar: '<img src="images/fighterleft.jpg">',
  up: '<img src="images/fighterup.jpg">',
  down: '<img src="images/fighterdown.jpg">',
  left: '<img src="images/fighterleft.jpg">',
  right: '<img src="images/fighterright.jpg">',
  position: 0,
  status: '',
  action: 'idle',
  direction: 'j'
}

for (var i = 0; i < gridSquares.length; i ++) {
  gridSquares[i].setAttribute('data-position', i);
  console.log("mapping grid coordinates", gridSquares[i].getAttribute('data-position'));
}

spawnPlayer();
function  spawnPlayer() {
  // choose random spawn point
  console.log("spawning player");
  var spawnPoint = gridSquares[Math.floor(Math.random() * 30)];
  console.log("spawing at", spawnPoint.getAttribute('data-position'));
  console.log("Your direction is", playerOne.direction);
  // playerOne.avatar = image goes here ;
  spawnPoint.innerHTML = playerOne.avatar;
  playerOne.position = parseFloat(spawnPoint.getAttribute('data-position'));
  console.log("playerOne.position is", playerOne.position);

  // choose random spawn point
  console.log("spawning player");
  var spawnPoint = gridSquares[Math.floor(Math.random() * 30)];
  console.log("spawing at", spawnPoint.getAttribute('data-position'));
  console.log("Your direction is", playerTwo.direction);
  // playerOne.avatar = image goes here ;
  spawnPoint.innerHTML = playerTwo.avatar;
  playerTwo.position = parseFloat(spawnPoint.getAttribute('data-position'));
  console.log("playerTwo.position is", playerTwo.position);
}

// window.addEventListener("keydown", function(e) {
//   auxKey = e.key;
//   if (auxKey === 'q') {
//     var strafe = 'true'
//     console.log(strafe);
//   }
// });

window.addEventListener("keyup", function(e) {
  whatPress = e.key;
  if (whatPress === 'c' || whatPress === 'f' || whatPress === 'n' || whatPress === 'h') {
    fightClub();
  } else {
  hotStepper()
  }
});

function hotStepper () {

  if (whatPress === playerOne.direction) {

  console.log("ok to move");
  targeting();
  if (target !== playerTwo.position) {
  console.log("target accquired. Redy to move to", target);
  gridSquares[playerOne.position].innerHTML = '';
  gridSquares[target].innerHTML = playerOne.avatar;
  playerOne.position = target;
} else { console.log("nope");}
}
  if (whatPress === playerTwo.direction) {
  console.log("ok to move");
  targeting();
  if (target !== playerOne.position) {
  console.log("target accquired. Redy to move to", target);
  gridSquares[playerTwo.position].innerHTML = '';
  gridSquares[target].innerHTML = playerTwo.avatar;
  playerTwo.position = target;
} else {console.log("nope");}
}
  // else if (strafe === 'true') {
  //   console.log("strafing");
  //   console.log("ok to move");
  //   targeting();
  //   console.log("target accquired. Redy to move to", target);
  //   gridSquares[playerOne.position].innerHTML = '';
  //   gridSquares[target].innerHTML = playerOne.avatar;
  //   playerOne.position = target;
  //   strafe = '';
  // }
  else {
    if (whatPress === 'w' || whatPress === 'a' || whatPress === 's' || whatPress === 'd') {
    imageRotator ();
    }
    if (whatPress === 'i' || whatPress === 'j' || whatPress === 'k' || whatPress === 'l' ) {
      imageRotatorTwo();
    }
  }
}

function targeting() {
  if (whatPress === 'd') {
    target = playerOne.position + 1;
    console.log('target is', target);
  }
  if (whatPress === 's') {
    target = playerOne.position + 6;
    console.log('target is', target);
  }
  if (whatPress === 'a') {
    target = playerOne.position - 1;
    console.log('target is', target);
  }
  if (whatPress === 'w') {
    target = playerOne.position - 6;
  }
  if (whatPress === 'l') {
    target = playerTwo.position + 1;
    console.log('target is', target);
  }
  if (whatPress === 'k') {
    target = playerTwo.position + 6;
    console.log('target is', target);
  }
  if (whatPress === 'j') {
    target = playerTwo.position - 1;
    console.log('target is', target);
  }
  if (whatPress === 'i') {
    target = playerTwo.position - 6;
  }
}

function imageRotator() {

    playerOne.direction = whatPress;
    if (playerOne.direction === 'w') {
      playerOne.avatar = playerOne.up ;
    } else if (playerOne.direction === 'a') {
      playerOne.avatar = playerOne.left ;
    } else if (playerOne.direction === 's') {
      playerOne.avatar = playerOne.down;
    } else if (playerOne.direction === 'd') {
      playerOne.avatar = playerOne.right ;
    }
    gridSquares[playerOne.position].innerHTML = playerOne.avatar;
}
function imageRotatorTwo() {

    playerTwo.direction = whatPress;
    if (playerTwo.direction === 'i') {
      playerTwo.avatar = playerTwo.up ;
    } else if (playerTwo.direction === 'j') {
      playerTwo.avatar = playerTwo.left ;
    } else if (playerTwo.direction === 'k') {
      playerTwo.avatar = playerTwo.down;
    } else if (playerTwo.direction === 'l') {
      playerTwo.avatar = playerTwo.right ;
    }
    gridSquares[playerTwo.position].innerHTML = playerTwo.avatar;
}

function fightClub () {
  if (whatPress === 'c') {
    playerOne.status = '';
    console.log("playerOne drops his defense");
    console.log("playerOne attacks");
    targeting();
    console.log("target accquired at", target);
    if (target === playerTwo.position) {
      if (playerTwo.status === 'defend') {
        console.log("playerTwo defended");
      } else {
        playerTwo.health = 'dead';
        console.log("kill confirmed");
        gridSquares[playerTwo.position].innerHTML = '';
      }
    }
  } if (whatPress === 'f') {
    playerOne.status = 'defend';
    console.log("playerOne defends");
  } if (whatPress === 'n') {
    playerTwo.status = '';
    console.log("playerTwo drops his defense");
    console.log("playerTwo attacks");
    targeting();
    console.log("target accquired at", target);
    if (target === playerOne.position) {
        console.log("attacking playerOne");
      if (playerOne.status === 'defend') {
        console.log("playerOne defended");
      } else {
        playerOne.health = 'dead';
        console.log("kill confirmed");
        gridSquares[playerOne.position].innerHTML = '';
      }
    }
  } if (whatPress === 'h') {
    playerTwo.status = 'defend';
    console.log("p2 defends");
  }
}
