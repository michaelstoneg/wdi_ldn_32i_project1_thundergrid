
// Add weapon switching (add aux weapon)


console.log("It's Aliiive!!!!");

var smallGrid = document.getElementById('size9');
var bigGrid = document.getElementById('size36');
var boardSize = 36;
var modifier = 2;
var outerLimit = 35;
var boardFrame = document.getElementById('boardFrame');
var gridSquares = document.getElementsByClassName('gridSquare');
var infoBoxOne = document.getElementById('playerOneInfo');
var infoBoxTwo = document.getElementById('playerTwoInfo');
var playerOneItems = document.getElementById('playerOneItems');
var playerTwoItems = document.getElementById('playerTwoItems');
var target = 0;
var spearLocation = undefined;
var bowLocation = undefined;
var magicStaffLocation = undefined;
var spearImage = document.getElementById('spearImage');

// targetingAdjust = {
//
// }

playerOne = {
  name: 'p1',
  avatar: '<img src="images/frogright.png">',
  up: '<img src="images/frogup.png">',
  down: '<img src="images/frogdown.png">',
  left: '<img src="images/frogleft.png">',
  right: '<img src="images/frogright.png">',
  position: undefined,
  action: '',
  weapon: 'sword',
  auxweapon: '',
  health: '',
  direction: 'd',
  score: 0,
  infoBox: infoBoxOne,
  bag: playerOneItems,
};
playerTwo = {
  name: 'p2',
  avatar: '<img src="images/paladinleftattack3.png">',
  up: '<img src="images/paladinupattack3.png">',
  down: '<img src="images/paladindownattack2.png">',
  left: '<img src="images/paladinleftattack3.png">',
  right: '<img src="images/paladinrightattack2.png">',
  position: undefined,
  action: '',
  weapon: 'sword',
  auxweapon: '',
  health: '',
  direction: 'i',
  score: 0,
  infoBox: infoBoxTwo,
  bag: playerTwoItems,
};

var player = undefined;
var altPlayer = undefined;

if (player === playerOne) {
  altPlayer = playerTwo;
} if (player === playerTwo) {
  altPlayer = playerOne;
}

var jumpSound = document.getElementById('jump');
var attackSound = document.getElementById('attack');
var defendedSound = document.getElementById('defended');
var deathSound = document.getElementById('death');
var bgm = document.getElementById('bgm');
var powerUpSound = document.getElementById('powerUp');
var supplyDropSound = document.getElementById('supplyDrop');
var defendSound = document.getElementById('defends');
var spawnSound = document.getElementById('spawn');


setup();

function setup() {
bigGrid.addEventListener('click', function(){
  boardSize = 36;
  modifier = 2;
  outerLimit = 35;
  document.getElementById('popup').style.display = 'none';
  buildBoard();
});
smallGrid.addEventListener('click', function() {
  boardSize = 9;
  modifier = 1;
  outerLimit = 8;
  document.getElementById('popup').style.display = 'none';
  buildBoard();
});
}

function buildBoard () {
for (var a = 0; a < boardSize; a ++) {
   console.log(boardSize);
   var gridSquare = document.createElement('div');
   gridSquare.setAttribute('class', 'gridSquare');
   gridSquare.setAttribute('data-position', a);
   boardFrame.appendChild(gridSquare);
   if (boardSize === 9) {
     boardFrame.style.width = '300px';
     boardFrame.style.height = '300px';
     gridSquare.style.width = '28%';
     gridSquare.style.height = '28%';
   }
   if (boardSize === 36) {
     boardFrame.style.width = '600px';
     boardFrame.style.height = '600px';
     gridSquare.style.width = '12.5%';
     gridSquare.style.height = '12.5%';
   }
}
}

bgm.volume = 0.5;
bgm.play();

function  spawnPlayer() {
  // choose random spawn point
  if (player.position === undefined) {
    var spawnPoint = gridSquares[Math.floor(Math.random() * boardSize)];
    spawnSound.play();
    spawnPoint.innerHTML = player.avatar;
    player.position = parseFloat(spawnPoint.getAttribute('data-position'));
    player.weapon = 'sword';
    player.health = 'alive';
    player.action = 'move';
    player.bag.innerHTML = '<img src="images/sword.png">';
  }
}

window.addEventListener("keyup", function(e) {
  whatPress = e.key;
  console.log(whatPress);
  if (whatPress === '1') {
    player = playerOne;
    spawnPlayer();
  }
  if (whatPress === '0' ) {
    player = playerTwo;
    spawnPlayer();
  }
  if (whatPress === 'c' || whatPress === 'f') {
    player = playerOne;
    fightClub();
  }
  if (whatPress === 'n' || whatPress === 'h') {
    player = playerTwo;
    fightClub();
  }
  if (whatPress === 'q' || whatPress === 'o' || whatPress === 'e' || whatPress === 'u') {
    grabBag();
  }
  else {
  hotStepper();
  }
});

function hotStepper () {

  if (player.health === 'dead') {
  console.log('respawn');
  }

  if (whatPress === 'w' || whatPress === 'a' || whatPress === 's' || whatPress === 'd') {
    player = playerOne;
  }
  if (whatPress === 'i' || whatPress === 'j' || whatPress === 'k' || whatPress === 'l') {
    player = playerTwo;
  }
  if (whatPress === player.direction) {
  player.action = 'move';
  targeting();

  if (target < 0 || target > outerLimit) {
    gridSquares[player.position].innerHTML = '';
    deathSound.playbackRate = 2;
    deathSound.play();
    player.health = 'dead';
    player.position = undefined;
    player.weapon = '';
    player.action = '';
  }
  if (target !== playerOne.position && target !== playerTwo.position) {
    player.action = 'move';
    jumpSound.playbackRate = 2;
    jumpSound.play();
    gridSquares[player.position].innerHTML = '';
    gridSquares[player.position].style.background = '';
    gridSquares[target].innerHTML = player.avatar;
    player.position = target;
    treasureHunt(player.position);
  }
}
  else {
    imageRotator ();
    }
  }

  function targeting() {
    if (player.weapon === 'magicStaff' && player.action === 'attack') {
      target = altPlayer.position;
    }
    if (player.direction === 'd' || player.direction === 'l' ) {
      if (player.action === 'attack' && player.weapon === 'spear') {
        target = player.position + 2;
      }
      if (player.action === 'attack' && player.weapon === 'bow') {
        target = player.position + 4;
      }
      if (player.action === 'move' || player.weapon === 'sword') {
        target = player.position + 1;
      }
    }
  if (player.direction === 's' || player.direction === 'k' ) {
      if (player.action === 'attack' && player.weapon === 'spear') {
        target = player.position + (6 * modifier);
      }
      if (player.action === 'attack' && player.weapon === 'bow') {
        target = player.position + 24;
      }
      if (player.action === 'move' || player.weapon === 'sword') {
          target = player.position + (3 * modifier);
      }
  }
  if (player.direction === 'a' || player.direction === 'j') {
      if (player.action === 'attack' && player.weapon === 'spear') {
        target = player.position - 2;
      }
      if (player.action === 'attack' && player.weapon === 'bow') {
        target = player.position - 4;
      }
      if (player.action === 'move' || player.weapon === 'sword') {
        target = player.position - 1;
      }
    }
  if (player.direction === 'w' || player.direction === 'i') {
      if (player.action === 'attack' && player.weapon === 'spear') {
        target = player.position - (6 * modifier);
      }
      if (player.action === 'attack' && player.weapon === 'bow') {
        target = player.position - 24;
      }
      if (player.action === 'move' || player.weapon === 'sword') {
        target = player.position - (3 * modifier);
      }
    }
  }

function imageRotator() {
    if (whatPress === 'i' || whatPress === 'w') {
      player.direction = whatPress;
      player.avatar = player.up ;
    } else if (whatPress === 'j' || whatPress === 'a') {
      player.direction = whatPress;
      player.avatar = player.left ;
    } else if (whatPress === 'k' || whatPress === 's') {
      player.direction = whatPress;
      player.avatar = player.down;
    } else if (whatPress === 'l' || whatPress === 'd') {
      player.direction = whatPress;
      player.avatar = player.right ;
    }
    gridSquares[player.position].innerHTML = player.avatar;
}

function fightClub () {
  if (player === playerOne) {
    altPlayer = playerTwo;
  } if (player === playerTwo) {
    altPlayer = playerOne;
  }

  if (whatPress === 'c' || whatPress === 'n') {
    player.action = 'attack';
    attackSound.playbackRate = 2.5;
    attackSound.play();
    gridSquares[player.position].style.background = '#ff5050';
    targeting();
      if (target === altPlayer.position) {
        if (altPlayer.action !== 'defend' && altPlayer.health !== 'dead' ) {
          deathSound.playbackRate = 1.5;
          deathSound.play();
          altPlayer.health = 'dead';
          player.action = '';
          altPlayer.bag.innerHTML = '';
          gridSquares[altPlayer.position].innerHTML = '<img src="images/blood.png">';
          gridSquares[altPlayer.position].style.background = '';
          altPlayer.position = undefined;
          player.score = player.score + 1;
          player.infoBox.innerHTML = player.name + "'s score is   " + player.score + '<br>';
          supplyDrop(player.score);
        }
        else {
          defendedSound.playbackRate = 1;
          defendedSound.play();
        }
    }
      else {
        console.log("no one's home");
      }
    }
    if (whatPress === 'f' || whatPress === 'h') {
      player.action = 'defend';
      defendSound.playbackRate = 1;
      defendSound.play();
      gridSquares[player.position].style.background = '#3399ff';
  }
}

function supplyDrop(ps) {

  if (ps=== 5) {
    spearLocation = gridSquares[Math.floor(Math.random() * boardSize)];
    if (spearLocation.innerHTML === '') {
      spearLocation.innerHTML = '<img src="images/spear.png">';
      supplyDropSound.playbackRate = 2;
      supplyDropSound.play();
    }
  }
  else if (boardSize === 36 && ps === 10) {
    bowLocation = gridSquares[Math.floor(Math.random() * boardSize)];
      if (bowLocation.innerHTML === '') {
        bowLocation.innerHTML = '<img src="images/bow.png">';
        supplyDropSound.playbackRate = 2;
        supplyDropSound.play();
      }
    }
  else if (boardSize === 36 && ps === 20) {
    magicStaffLocation = gridSquares[Math.floor(Math.random() * boardSize)];
    if (magicStaffLocation.innerHTML === '') {
      magicStaffLocation.innerHTML = '<img src="images/magicStaff.png">';
      supplyDropSound.playbackRate = 2;
      supplyDropSound.play();
    }
  }

}


function treasureHunt() {
  if (gridSquares[player.position] === spearLocation) {
    player.auxweapon = player.weapon;
    player.weapon = 'spear';
    player.bag.innerHTML = '<img src="images/spear.png">';
    powerUpSound.playbackRate = 1.5;
    powerUpSound.play();
    spearLocation = undefined;
  }

  if (gridSquares[player.position] === magicStaffLocation) {
    player.auxweapon = player.weapon;
    player.weapon = 'magicStaff';
    player.bag.innerHTML = '<img src="images/magicStaff.png">';
    powerUpSound.playbackRate = 1.5;
    powerUpSound.play();
    magicStaffLocation = undefined;
  }

  if (gridSquares[player.position] === bowLocation) {
    player.auxweapon = player.weapon;
    player.weapon = 'bow';
    player.bag.innerHTML = '<img src="images/bow.png">';
    powerUpSound.playbackRate = 1.5;
    powerUpSound.play();
    bowLocation = undefined;
  }
}

// function grabBag () {
//   if (player === playerOne) {
//     altPlayer = playerTwo;
//   } if (player === playerTwo) {
//     altPlayer = playerOne;
//   }
//   //weapon switch
//   if (whatPress === 'e') {
//     player = playerOne;
//     console.log('change places');
//     var holder = player.auxweapon;
//     player.auxweapon = player.weapon;
//     player.weapon = holder;
//   }
//   if (whatPress === 'u') {
//     console.log('change places');
//     player = playerTwo;
//     var holder = player.auxweapon;
//     player.auxweapon = player.weapon;
//     player.weapon = holder;
//   }
// }
