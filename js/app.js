



console.log("It's Aliiive!!!!");

var gridSquares = document.getElementsByClassName('gridSquare');
var messageBox = document.getElementById('messageBox');
var infoBoxOne = document.getElementById('playerOne');
var infoBoxTwo = document.getElementById('playerTwo');
var playerOneItems = document.getElementById('playerOneItems');
var playerTwoItems = document.getElementById('playerTwoItems');
var target = 0;
var spearPosition = undefined;
var spearImage = document.getElementById('spearImage');

playerOne = {
  name: 'p1',
  avatar: '<img src="images/frogright.png">',
  up: '<img src="images/frogup.png">',
  down: '<img src="images/frogdown.png">',
  left: '<img src="images/frogleft.png">',
  right: '<img src="images/frogright.png">',
  upattack: '',
  downattack: '<img src="images/frogdownattack.gif">',
  leftattack: '<img src="images/frogleftattack.gif">',
  rightattack: '',
  position: undefined,
  action: '',
  weapon: 'sword',
  health: '',
  direction: 'd',
  score: 0,
  infoBox: infoBoxOne,
  bag: playerOneItems
};
playerTwo = {
  name: 'p2',
  avatar: '<img src="images/paladinleft.png">',
  up: '<img src="images/paladinup.png">',
  down: '<img src="images/paladindown.png">',
  left: '<img src="images/paladinleft.png">',
  right: '<img src="images/paladinright.png">',
  upattack: '<img src="images/paladinupattack.gif">',
  downattack: '<img src="images/paladindownattack.gif">',
  leftattack: '<img src="images/paladinleftattack.gif">',
  rightattack: '<img src="images/paladinrightattack.gif">',
  position: undefined,
  action: '',
  weapon: 'sword',
  health: '',
  direction: 'i',
  score: 0,
  infoBox: infoBoxTwo,
  bag: playerTwoItems
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
var tauntSound = document.getElementById('taunt');
var spawnSound = document.getElementById('spawn');


for (var i = 0; i < gridSquares.length; i ++) {
  gridSquares[i].setAttribute('data-position', i);
  console.log("mapping grid coordinates", gridSquares[i].getAttribute('data-position'));
}
// bgm.volume = .5;
// bgm.play();
function  spawnPlayer() {
  // choose random spawn point
  if (player.position === undefined) {
    console.log("spawning player");
    var spawnPoint = gridSquares[Math.floor(Math.random() * 30)];
    console.log("spawing at", spawnPoint.getAttribute('data-position'));
    console.log("Your direction is", player.direction);
    spawnSound.play();
    spawnPoint.innerHTML = player.avatar;
    player.position = parseFloat(spawnPoint.getAttribute('data-position'));
    console.log("player.position is", player.position);
    player.infoBox.innerHTML = player.name + "   spawned at   " + player.position;
    player.weapon = 'sword';
    player.health = 'alive';
    player.action = 'move';
  } else {
    console.log("No double spawnsies");
    player.infoBox.innerHTML = "No Double Spawnzies";
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
    console.log("player is", player);
    fightClub();
  }
  if (whatPress === 'n' || whatPress === 'h') {
  player = playerTwo;
  console.log("player is", player);
  fightClub();
  }
  else {
  hotStepper();
  }
});

function hotStepper () {
  if (player.health === 'dead') {
  console.log('where you think you going? you dead. respawn');
  player.infoBox.innerHTML = 'where you think you going?  ', + player.name + ' you dead. respawn';
}
  if (whatPress === 'w' || whatPress === 'a' || whatPress === 's' || whatPress === 'd') {
    player = playerOne;
    console.log("player is now", player);
    console.log("direction", player.direction);
  }
  if (whatPress === 'i' || whatPress === 'j' || whatPress === 'k' || whatPress === 'l') {
    player = playerTwo;
    console.log("player is now", player);
    console.log("direction", player.direction);
  }
  if (whatPress === player.direction) {
  console.log("ok to move");
  player.action = 'move';
  targeting();
  if (target < 0 || target > 35) {
  gridSquares[player.position].innerHTML = '';
  deathSound.playbackRate = 2;
  deathSound.play();
  player.health = 'dead';
  player.position = undefined;
  player.weapon = '';
  player.action = '';
  console.log("You just ran off a cliff");
  player.infoBox.innerHTML = player.name + 'You just ran off a cliff';
}
  if (target !== playerOne.position && target !== playerTwo.position) {
    console.log("target accquired. Redy to move to", target);
    player.action = 'move';
    jumpSound.playbackRate = 2;
    jumpSound.play();
    gridSquares[player.position].innerHTML = '';
    gridSquares[player.position].style.background = '';
    gridSquares[target].innerHTML = player.avatar;
    messageBox.innerHTML = player.name + "   moved to   " + target;
    player.position = target;
    console.log("direction", player.direction);
  }
    if (player.position === parseFloat(spearLocation.getAttribute('data-position'))) {
      player.weapon = 'spear';
      console.log("A wild spear appeared");
      console.log(player.name + "   now has a   " + player.weapon);
      player.bag.innerHTML = '<img src="images/spear.png">';
      powerUpSound.playbackRate = 1.5;
      powerUpSound.play();
      player.infoBox.innerHTML = player.name + "   has a   " + player.weapon;
      altPlayer.infoBox.innerHTML = player.name + "   has a   " + player.weapon;
      spearLocation = undefined;
      // gridSquares[player.position].innerHTML = '';
    }
    if (player.position === parseFloat(bowLocation.getAttribute('data-position'))) {
      player.weapon = 'bow';
      console.log("A wild bow appeared");
      console.log(player.name + "   now has a   " + player.weapon);
      player.bag.innerHTML = '<img src="images/bow.png">';
      powerUpSound.playbackRate = 1.5;
      powerUpSound.play();
      player.infoBox.innerHTML = player.name + "   has a   " + player.weapon;
      altPlayer.infoBox.innerHTML = player.name + "   has a   " + player.weapon;
      bowLocation = undefined;
    }
 else { console.log("nope");
 player.action = '';
}
}
  if (whatPress !== player.direction) {
    console.log("turn around");
    imageRotator ();
    }
  }

  function targeting() {
    if (player.direction === 'd' || player.direction === 'l' ) {
      if (player.action === 'attack' && player.weapon === 'spear') {
        console.log(player.name, '   used  ', player.weapon, player.action );
        // gridSquares[player.position + 1].innerHTML = '<img src="images/spear.png">';
        // console.log("spear img goes here", gridSquares[player.position + 1]);
        target = player.position + 2;
        console.log('target is', target);
      }
      if (player.action === 'attack' && player.weapon === 'bow') {
        console.log(player.name, '   used  ', player.weapon, player.action );
        // gridSquares[player.position + 1].innerHTML = '<img src="images/spear.png">';
        // console.log("spear img goes here", gridSquares[player.position + 1]);
        target = player.position + 4;
        console.log('target is', target);
      }
      if (player.action === 'move' || player.weapon === 'sword') {
        console.log("good for you buddy");
        target = player.position + 1;
        console.log('target is', target);
      }
    }
    if (player.direction === 's' || player.direction === 'k' ) {
        if (player.action === 'attack' && player.weapon === 'spear') {
          console.log(player.name, '   used  ', player.weapon, player.action );
          target = player.position + 12;
          console.log('target is', target);
        }
        if (player.action === 'attack' && player.weapon === 'bow') {
          console.log(player.name, '   used  ', player.weapon, player.action );
          // gridSquares[player.position + 1].innerHTML = '<img src="images/spear.png">';
          // console.log("spear img goes here", gridSquares[player.position + 1]);
          target = player.position + 24;
          console.log('target is', target);
        }
        if (player.action === 'move' || player.weapon === 'sword') {
          console.log("good for you buddy");
          target = player.position + 6;
          console.log('target is', target);
        }
  }
  if (player.direction === 'a' || player.direction === 'j') {
      if (player.action === 'attack' && player.weapon === 'spear') {
        console.log(player.name, '   used  ', player.weapon, player.action );
        target = player.position - 2;
        console.log('target is', target);
      }
      if (player.action === 'attack' && player.weapon === 'bow') {
        console.log(player.name, '   used  ', player.weapon, player.action );
        // gridSquares[player.position + 1].innerHTML = '<img src="images/spear.png">';
        // console.log("spear img goes here", gridSquares[player.position + 1]);
        target = player.position - 4;
        console.log('target is', target);
      }
      if (player.action === 'move' || player.weapon === 'sword') {
        console.log("good for you buddy");
        target = player.position - 1;
        console.log('target is', target);
      }
  }
  if (player.direction === 'w' || player.direction === 'i') {
      if (player.action === 'attack' && player.weapon === 'spear') {
        console.log(player.name, '   used  ', player.weapon, player.action );
        target = player.position - 12;
        console.log('target is', target);
      }
      if (player.action === 'attack' && player.weapon === 'bow') {
        console.log(player.name, '   used  ', player.weapon, player.action );
        // gridSquares[player.position + 1].innerHTML = '<img src="images/spear.png">';
        // console.log("spear img goes here", gridSquares[player.position + 1]);
        target = player.position - 24;
        console.log('target is', target);
      }
      if (player.action === 'move' || player.weapon === 'sword') {
        console.log("good for you buddy");
        target = player.position - 6;
        console.log('target is', target);
      }
  }
}

function imageRotator() {
    console.log("this is imageRotator");
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
    console.log(player, "drops his defense");
    console.log(player, "attacks");
    gridSquares[player.position].style.background = '#ff5050';
    targeting();
    console.log("target accquired at", target);
    console.log("target is ", target);
    // animator();
      if (target === altPlayer.position) {
        console.log("attacking", altPlayer);
        player.infoBox.innerHTML = player.name + "   attacks   " + altPlayer.name;
        if (altPlayer.action !== 'defend' && altPlayer.health !== 'dead' ) {
        deathSound.playbackRate = 1.5;
        deathSound.play();
        altPlayer.health = 'dead';
        console.log("kill confirmed");
        player.action = '';
        player.infoBox.innerHTML = '';
        altPlayer.infoBox.innerHTML = altPlayer.name + "   is dead";
        player.infoBox.innerHTML = altPlayer.name + "   is dead";
        gridSquares[altPlayer.position].innerHTML = '<img src="images/blood.png">';
        gridSquares[altPlayer.position].style.background = '';
        altPlayer.position = undefined;
        player.score = player.score + 1;
        // tauntSound.playbackRate = .7;
        // tauntSound.play();
        console.log('player score', player.score);
        player.infoBox.innerHTML = player.name + "'s score is" + player.score;
        if (player.score === 1) {
          supplyDrop();
        }
      } else {
        console.log(altPlayer, "defended");
        player.infoBox.innerHTML = altPlayer.name + "   defended";
        altPlayer.infoBox.innerHTML = altPlayer.name + "   defended";
        defendedSound.playbackRate = 1;
        defendedSound.play();
      }
    }
      else {
        console.log("no one's home");
      }
    } if (whatPress === 'f' || whatPress === 'h') {
      player.action = 'defend';
      console.log(player, player.action);
      defendSound.playbackRate = 1;
      defendSound.play();
      player.infoBox.innerHTML = player.name + "   defends";
      altPlayer.infoBox.innerHTML = player.name + "   defends";
      gridSquares[player.position].style.background = '#3399ff';
  }
}

function supplyDrop() {

  spearLocation = gridSquares[Math.floor(Math.random() * 30)];
  if (spearLocation !== playerOne.location || spearLocation !== playerTwo.location) {
  console.log("Spears go here   ", spearLocation);
  spearLocation.innerHTML = '<img src="images/spear.png">';
  supplyDropSound.playbackRate = 2;
  supplyDropSound.play();
}
  bowLocation = gridSquares[Math.floor(Math.random() * 30)];
  if (bowLocation !== playerOne.location || bowLocation !== playerTwo.location) {
  console.log("bow goes here   ", bowLocation);
  bowLocation.innerHTML = '<img src="images/bow.png">';
  supplyDropSound.playbackRate = 2;
  supplyDropSound.play();
}

}
