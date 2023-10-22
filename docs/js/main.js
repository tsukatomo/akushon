/* main.js */

// get elements in document
// canvas - background layer
const backgLay = document.getElementById("backg_lay");
const backgCtx = backgLay.getContext("2d");
// canvas - character layer
const charaLay = document.getElementById("chara_lay");
const charaCtx = charaLay.getContext("2d");
// canvas - UI layer
const useriLay = document.getElementById("useri_lay");
const useriCtx = useriLay.getContext("2d");
// canvas - transition layer
const transLay = document.getElementById("trans_lay");
const transCtx = transLay.getContext("2d");

// get image
// player
let imgPlayer = new Image();
imgPlayer.src = "./img/fighter_action.png";

// animation data
let animePlayer = {
  "stand_l": {frames: 1, dulation: 8, img: [0]},
  "stand_r": {frames: 1, dulation: 8, img: [3]},
  "run_l": {frames: 4, dulation: 6, img: [0, 2, 0, 1]},
  "run_r": {frames: 4, dulation: 6, img: [3, 5, 3, 4]},
  "jump_l": {frames: 1, dulation: 8, img: [1]},
  "jump_r": {frames: 1, dulation: 8, img: [4]},
  "default": {frames:1, dulation: 8, img: [0]}
};

// global variables
// for key inputs
let keyInput = [];
let keyPressed = [];
let keyPressedPrevious = [];
let keyInterval = 0;
let buttonPressed;
// for map
let mapWidth = 20;
let mapHeight = 15;
let gridSize = 32;
let mapData = [
  "....................",
  ".*..................",
  "....................",
  "............***.....",
  "....*...............",
  "........*...........",
  "..........***.......",
  "...............*..*.",
  ".....*..............",
  "....**..........**..",
  "******.....*********",
  "******.....*********",
  "*********..*********",
  "*********..*********",
  "*********..*********",
];
// for game scene
let scene;
let sceneOverLay;
let initFlag;

// character class
class CharacterObject {
  constructor(name, x, y, w, h, ltx, lty, rbx, rby, img, anime) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.w= w;
    this.h = h;
    // ltx,lty = left top of hitbox
    this.ltx = ltx;
    this.lty = lty;
    // rbx, rby = right bottom of hitbox
    this.rbx = rbx;
    this.rby = rby;
    // image and animation data
    this.img = img;
    this.anime = anime;
    this.direction = "right";
    this.anitype = "default";
    this.anicount = 0;
    // speed and landing flag
    this.dx = 0;
    this.dy = 0;
    this.onLand = false;
  };

  changeAnime (new_anitype) {
    if (new_anitype === this.anitype) return;
    this.anitype = new_anitype;
    this.anicount = 0;
  };

  drawAnime (ctx) {
    this.anicount++;
    let frameNumber = Math.floor(this.anicount / this.anime[this.anitype].dulation) % (this.anime[this.anitype].frames);
    // console.log(frameNumber);
    ctx.drawImage(this.img, this.w * this.anime[this.anitype].img[frameNumber], 0, this.w, this.h, this.x, this.y, this.w, this.h);
  };

};


let plc;
let coyoteTime = 0;

// get map data from coordinate
let getMap = (x, y) => {
  let mapX = Math.floor(x / gridSize);
  let mapY = Math.floor(y / gridSize);
  if (mapX < 0 || mapWidth <= mapX) return ".";
  if (mapY < 0 || mapHeight <= mapY) return ".";
  return mapData[mapY][mapX];
}





  // --------------//
 // get key event //
// --------------//
// pressed key
window.onkeydown = function (e) {
  //if (isAcceptKeyInput === false) return;
  if (e.defaultPrevented) return false;
  // read pressed key
  if (e.code === "ArrowUp" || e.code === "KeyK") {
    if (keyInput.indexOf("u") == -1) keyInput.push("u");
  }
  if (e.code === "ArrowDown" || e.code === "KeyJ") {
    if (keyInput.indexOf("d") == -1) keyInput.push("d");
  }
  if (e.code === "ArrowLeft" || e.code === "KeyH") {
    if (keyInput.indexOf("l") == -1) keyInput.push("l");
  }
  if (e.code === "ArrowRight" || e.code === "KeyL") {
    if (keyInput.indexOf("r") == -1) keyInput.push("r");
  }
  if (e.code === "KeyZ" || e.code === "Enter") {
    if (keyInput.indexOf("z") == -1) keyInput.push("z");
  }
  if (e.code === "KeyX") {
    if (keyInput.indexOf("x") == -1) keyInput.push("x");
  }
  if (e.code === "KeyA") {
    if (keyInput.indexOf("a") == -1) keyInput.push("a");
  }
  if (e.code === "KeyS") {
    if (keyInput.indexOf("s") == -1) keyInput.push("s");
  }
  // prevent default key input
  if (!e.metaKey && !e.shiftKey && !e.ctrlKey){
    e.preventDefault();
  }
};

// released key
window.onkeyup = function (e) {
  //if (isAcceptKeyInput === false) return;
  if (e.defaultPrevented) return false;
  // read released key
  let idx;
  if (e.code === "ArrowUp" || e.code === "KeyK") {
    idx = keyInput.indexOf("u");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "ArrowDown" || e.code === "KeyJ") {
    idx = keyInput.indexOf("d");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "ArrowLeft" || e.code === "KeyH") {
    idx = keyInput.indexOf("l");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "ArrowRight" || e.code === "KeyL") {
    idx = keyInput.indexOf("r");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "KeyZ" || e.code === "Enter") {
    idx = keyInput.indexOf("z");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "KeyX") {
    idx = keyInput.indexOf("x");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "KeyA") {
    idx = keyInput.indexOf("a");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "KeyS") {
    idx = keyInput.indexOf("s");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  // prevent default key input
  if (!e.metaKey && !e.shiftKey && !e.ctrlKey){
    e.preventDefault();
  }
};

// check if the key pressed in this loop
let isKeyPressedNow = function(key) {
  return (keyPressed.indexOf(key) != -1 && keyPressedPrevious.indexOf(key) === -1);
};

   //=====================//
  //  Scene List         //
 //=====================//
let sceneList = {
  "game" : {
    "init" : () => {
      plc = new CharacterObject("player", 0, 0, 32, 32, 8, 4, 24, 32, imgPlayer, animePlayer);
      console.log(plc.ltx, plc.lty, plc.rbx, plc.rby);
    },
    "update" : () => {
      // player character move
      plc.onLand = (getMap(plc.x + plc.ltx, plc.y + plc.rby + 0.125) === "*" || getMap(plc.x + plc.rbx, plc.y + plc.rby + 0.125) === "*");
      if (plc.onLand) {
        plc.dy = 0;
        coyoteTime = 6;
        if (keyInput.indexOf("l") != -1) {
          plc.dx -= 0.5;
          plc.direction = "left";
        }
        else if (keyInput.indexOf("r") != -1) {
          plc.dx += 0.5;
          plc.direction = "right";
        }
        else {
          plc.dx = Math.sign(plc.dx) * (Math.abs(plc.dx) - 0.25);
        }
      }
      else {
        coyoteTime--;
        if (keyInput.indexOf("l") != -1) {
          plc.dx -= 0.25;
          plc.direction = "left";
        }
        else if (keyInput.indexOf("r") != -1) {
          plc.dx += 0.25;
          plc.direction = "right";
        }
        if (keyInput.indexOf("z") != -1) {
          plc.dy += 0.25;
        }
        else {
          plc.dy += 0.5;
        }
      }
      // jump
      if (isKeyPressedNow("z") && coyoteTime > 0) {
        plc.dy = -6;
        coyoteTime = 0;
      }
      // limit speed
      if (plc.dx > 2.5) plc.dx = 2.5;
      if (plc.dx < -2.5) plc.dx = -2.5;
      if (plc.dy > 12.0) plc.dy = 12.0;
      // update x position
      plc.x += plc.dx;
      // マップとの衝突
      // left
      while (getMap(plc.x + plc.ltx, plc.y + plc.lty) === "*" || getMap(plc.x + plc.ltx, plc.y + plc.rby) === "*") {
        plc.x += 0.125;
        plc.dx = 0;
      }
      // right
      while (getMap(plc.x + plc.rbx, plc.y + plc.lty) === "*" || getMap(plc.x + plc.rbx, plc.y + plc.rby) === "*") {
        plc.x -= 0.125;
        plc.dx = 0;
      }
      // update y position
      plc.y += plc.dy;
      // top
      while (getMap(plc.x + plc.ltx, plc.y + plc.lty) === "*" || getMap(plc.x + plc.rbx, plc.y + plc.lty) === "*") {
        plc.y += 0.125;
        plc.dy = 0;
      }
      // bottom
      while (getMap(plc.x + plc.ltx, plc.y + plc.rby) === "*" || getMap(plc.x + plc.rbx, plc.y + plc.rby) === "*") {
        plc.y -= 0.125;
        plc.dy = 0;
      }
      //console.log(plc.x, plc.y);

      // draw map
      charaCtx.fillStyle = "black";
      charaCtx.fillRect(0, 0, 640, 480);
      for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
          if (mapData[y][x] === '*') {
            charaCtx.fillStyle = "green";
            charaCtx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          }
          else if (mapData[y][x] === '-') {
            charaCtx.fillStyle = "tomato";
            charaCtx.fillRect(x * gridSize, y * gridSize, gridSize, 12);
          }
        }
      }
      // draw character
      if (plc.onLand) {
        if (plc.dx === 0) {
          plc.changeAnime(plc.direction === "left" ? "stand_l" : "stand_r");
        }
        else {
          plc.changeAnime(plc.direction === "left" ? "run_l" : "run_r");
        }
      }
      else {
        plc.changeAnime(plc.direction === "left" ? "jump_l" : "jump_r");
      }
      /* hit box
      charaCtx.fillStyle = "pink";
      charaCtx.fillRect(Math.round(plc.x + plc.ltx), Math.round(plc.y + plc.lty), plc.rbx - plc.ltx, plc.rby - plc.lty);
      */
      plc.drawAnime(charaCtx);
    }
  },
};

   //=======================//
  //  Over Lay Scene List  //
 //=======================//
 let sceneOverLayList = {
  "none" : () => {
    // there is no 
  }
};



     //=====================//
    //                     //
   //  G A M E   L O O P  //
  //                     //
 //=====================//
let gameLoop = () => {
  // reset canvas
  charaCtx.clearRect(0,0,640,480);
  useriCtx.clearRect(0,0,640,480);
  transCtx.clearRect(0,0,640,480);
  // get key input
  keyPressedPrevious = keyPressed.slice(); // storage previous key input
  keyPressed = keyInput.slice();
  // in game
  // scene
  if (initFlag) {
    sceneList[scene]["init"]();
    initFlag = false;
  }
  sceneList[scene]["update"]();
  // scene (over lay)
  //sceneOverLayList[sceneOverLay]();
};

  //-----------------//
 // Onload function //
//-----------------//
window.onload = () => {
  scene = "game";
  initFlag = true;
  setInterval(gameLoop, 1000/60);
};




