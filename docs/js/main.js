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
  "....................",
  "....................",
  "............***.....",
  "....................",
  "....................",
  "....................",
  "....................",
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
  constructor(name, x, y, width, height) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.ax = 0;
    this.ay = 0;
    this.w= width;
    this.h = height;
    this.onLand = false;
  };
};


let playerChara;

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

   //=====================//
  //  Scene List         //
 //=====================//
let sceneList = {
  "game" : {
    "init" : () => {
      playerChara = new CharacterObject("player", 16, 16, 16, 16);
    },
    "update" : () => {
      // player character move
      if (playerChara.onLand) {
        if (keyInput.indexOf("l") != -1) {
          playerChara.ax = -2;
        }
        else if (keyInput.indexOf("r") != -1) {
          playerChara.ax = 2;
        }
        else {
          playerChara.ax = Math.sign(playerChara.ax) * (Math.abs(playerChara.ax) - 0.125);
        }
        if (keyInput.indexOf("z") != -1) {
          playerChara.ay = -6;
          playerChara.onLand = false;
        }
      }
      else {
        if (keyInput.indexOf("l") != -1) {
          playerChara.ax = -1;
        }
        else if (keyInput.indexOf("r") != -1) {
          playerChara.ax = 1;
        }
        playerChara.ay += 0.25;
      }
      // update position
      playerChara.x += playerChara.ax;
      playerChara.y += playerChara.ay;
      // マップとの衝突
      // 上下方向の衝突
      while (getMap(playerChara.x, playerChara.y + playerChara.h) === "*" || getMap(playerChara.x + playerChara.w, playerChara.y + playerChara.h) === "*") {
        playerChara.onLand = true;
        playerChara.y -= 0.125;
      }
      while (getMap(playerChara.x, playerChara.y) === "*" || getMap(playerChara.x + playerChara.w, playerChara.y) === "*") {
        playerChara.y += 0.125;
      }
      //console.log(playerChara.x, playerChara.y);

      // draw map
      for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
          if (mapData[y][x] === '*') {
            charaCtx.fillStyle = "green";
            charaCtx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          }
        }
      }
      // draw character
      charaCtx.fillStyle = "royalblue"
      charaCtx.fillRect(Math.round(playerChara.x), Math.round(playerChara.y), playerChara.w, playerChara.h);
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
  setInterval(gameLoop, 10);
};




