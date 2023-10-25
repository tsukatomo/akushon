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
let imgPlayerShadow = new Image();
imgPlayer.src = "./img/fighter_action.png";
//imgPlayer.crossOrigin = "Anonymus";
// shot
let imgShot = new Image();
let imgShotShadow = new Image();
imgShot.src = "./img/shot.png";

let imgMapchip_1 = new Image();
let imgMapchip_2 = new Image();
imgMapchip_1.src = "./img/mapchip_1.png";
imgMapchip_2.src = "./img/mapchip_2.png";

// create shadow image
let createShadowURL = function(originalImg) {
  // create new canvas
  console.log(originalImg.width);
  const workCanvas = document.createElement('canvas');
  const workCtx = workCanvas.getContext("2d");
  workCanvas.width = originalImg.width;
  workCanvas.height = originalImg.height;
  workCtx.drawImage(originalImg, 0, 0);
  const sImageData = workCtx.getImageData(0, 0, workCanvas.width, workCanvas.height);
  const data = sImageData.data;
  for (let i = 0; i < data.length; i+=4) {
    if (data[i + 3] === 0) continue; // ignore transparent cell
    data[i] = 0; // red = 0
    data[i + 1] = 0; // green = 0
    data[i + 2] = 0; // blue = 0
    //console.log("黒");
  }
  // reset work canvas and draw shadow data
  workCtx.clearRect(0, 0, workCanvas.width, workCanvas.height);
  workCtx.putImageData(sImageData,0, 0);
  return workCanvas.toDataURL();
};


// animation data
let animePlayer = {
  "stand_l": { frames: 1, dulation: 8, img: [0], repeat: true },
  "stand_r": {frames: 1, dulation: 8, img: [3], repeat: true },
  "run_l": {frames: 4, dulation: 6, img: [0, 2, 0, 1], repeat: true },
  "run_r": {frames: 4, dulation: 6, img: [3, 5, 3, 4], repeat: true },
  "jump_l": {frames: 1, dulation: 8, img: [1], repeat: true },
  "jump_r": {frames: 1, dulation: 8, img: [4], repeat: true },
  "default": {frames: 1, dulation: 8, img: [0], repeat: true }
};
let animeShot = {
  "shot": { frames: 1, dulation: 8, img: [0], repeat: true },
  "vanish": { frames: 2, dulation: 3, img: [1, 2], repeat: false }, 
  "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
};
let animeDefault = { // no animation sprite
  "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
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
let gridSize = 16;
let mapData = [
  "....................",
  ".*..................",
  "........**.**.......",
  "............***.....",
  ".*-----*............",
  ".....--.*...*.....**",
  ".....--...***.......",
  ".*.............*....",
  ".....*..............",
  "....**..........**..",
  "******--...*********",
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
  constructor(name, x, y, w, h, ltx, lty, rbx, rby, img, shadow, anime) {
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
    this.shadow = shadow;
    this.anime = anime;
    this.direction = "right";
    this.anitype = "default";
    this.anicount = 0;
    // speed and landing flag
    this.dx = 0;
    this.dy = 0;
    this.onLand = false;
    // other parameter
    this.param1 = 0;
  };

  changeAnime (new_anitype) {
    if (new_anitype === this.anitype) return;
    this.anitype = new_anitype;
    this.anicount = 0;
  };

  updateAnime () {
    this.anicount++;
  };

  frameNumber () {
    let frameCount = Math.floor(this.anicount / this.anime[this.anitype].dulation);
    if (this.anime[this.anitype].repeat) {
      return frameCount % this.anime[this.anitype].frames;
    }
    return frameCount < this.anime[this.anitype].frames ? frameCount : this.anime[this.anitype].frames - 1;
  };

  drawAnime (ctx) {
    ctx.drawImage(this.img, this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, Math.floor(this.x), Math.floor(this.y), this.w, this.h);
  };

  drawShadow (ctx) {
    ctx.drawImage(this.shadow, this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, Math.floor(this.x) + 1, Math.floor(this.y) + 1, this.w, this.h);
  }

};

let plc;
let shotArray = [];
let shotMax = 5;
let coyoteTime = 0;

// get map data from pixel coordinate
let getMap = (x, y) => {
  let mapX = Math.floor(x / gridSize);
  let mapY = Math.floor(y / gridSize);
  if (mapX < 0 || mapWidth <= mapX) return ".";
  if (mapY < 0 || mapHeight <= mapY) return ".";
  if (mapData[mapY][mapX] === "-") { // half floor
    if (y % gridSize < 4){
      return "-";
    }
    else {
      return ".";
    }
  }
  return mapData[mapY][mapX];
}

// 



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
      plc = new CharacterObject("player", 0, 0, 16, 16, 3, 2, 12, 15, imgPlayer, imgPlayerShadow, animePlayer);
      console.log(plc.ltx, plc.lty, plc.rbx, plc.rby);
    },
    "update" : () => {
      // *********************
      // player character move
      // *********************
      plc.onLand = (getMap(plc.x + plc.ltx, plc.y + plc.rby + 0.0625) === "*" || getMap(plc.x + plc.rbx, plc.y + plc.rby + 0.0625) === "*");
      if (plc.dy >= 0) {
        plc.onLand |= (getMap(plc.x + plc.ltx, plc.y + plc.rby + 0.0625) === "-" || getMap(plc.x + plc.rbx, plc.y + plc.rby + 0.0625) === "-");
      }
      if (plc.onLand) {
        plc.dy = 0;
        coyoteTime = 7;
        if (keyInput.indexOf("l") != -1) {
          plc.dx -= 0.25;
          plc.direction = "left";
        }
        else if (keyInput.indexOf("r") != -1) {
          plc.dx += 0.25;
          plc.direction = "right";
        }
        else {
          plc.dx = Math.sign(plc.dx) * (Math.abs(plc.dx) - 0.125);
        }
      }
      else {
        coyoteTime--;
        if (keyInput.indexOf("l") != -1) {
          plc.dx -= 0.125;
          plc.direction = "left";
        }
        else if (keyInput.indexOf("r") != -1) {
          plc.dx += 0.125;
          plc.direction = "right";
        }
        if (keyInput.indexOf("z") != -1) {
          plc.dy += 0.125;
        }
        else {
          plc.dy += 0.25;
        }
      }
      // jump
      if (isKeyPressedNow("z") && coyoteTime > 0) {
        plc.dy = -3.5;
        coyoteTime = 0;
      }
      // create shot
      if (isKeyPressedNow("x") && shotArray.length < shotMax) {
        let newShot = new CharacterObject("shot", plc.x, plc.y, 16, 16, 4, 4, 11, 11, imgShot, imgShotShadow, animeShot);
        newShot.dx = plc.direction === "left" ? -2 : 2;
        newShot.changeAnime("shot");
        shotArray.push(newShot);
      }
      // move shot
      for (let i = 0; i < shotArray.length; i++) {
        shotArray[i].x += shotArray[i].dx;
        shotArray[i].param1++;
        if (shotArray[i].anitype === "shot") {
          if (shotArray[i].param1 >= 40 || getMap(shotArray[i].x + 8, shotArray[i].y + 8) === "*") {
            shotArray[i].dx = 0;
            shotArray[i].changeAnime("vanish");
            shotArray[i].param1 = 0;
          }
          shotArray[i].dx += Math.sign(shotArray[i].dx) * 0.0625;
        }
      }
      // erase shot
      shotArray = shotArray.filter((e) => {
        return e.param1 <= 6 || e.anitype != "vanish";
      });
      // limit speed
      if (plc.dx > 1.25) plc.dx = 1.25;
      if (plc.dx < -1.25) plc.dx = -1.25;
      if (plc.dy > 4.0) plc.dy = 4.0;
      // update x position
      plc.x += plc.dx;
      // マップとの衝突
      // left
      while (getMap(plc.x + plc.ltx, plc.y + plc.lty) === "*" || getMap(plc.x + plc.ltx, plc.y + plc.rby) === "*") {
        plc.x += 0.0625;
        plc.dx = 0;
      }
      // right
      while (getMap(plc.x + plc.rbx, plc.y + plc.lty) === "*" || getMap(plc.x + plc.rbx, plc.y + plc.rby) === "*") {
        plc.x -= 0.0625;
        plc.dx = 0;
      }
      // update y position
      plc.y += plc.dy;
      // top
      while (getMap(plc.x + plc.ltx, plc.y + plc.lty) === "*" || getMap(plc.x + plc.rbx, plc.y + plc.lty) === "*") {
        plc.y += 0.0625;
        plc.dy = 0;
      }
      // bottom
      while (getMap(plc.x + plc.ltx, plc.y + plc.rby) === "*" || getMap(plc.x + plc.rbx, plc.y + plc.rby) === "*") {
        plc.y -= 0.0625;
        plc.dy = 0;
      }
      if (plc.dy >= 0) {
        while (getMap(plc.x + plc.ltx, plc.y + plc.rby) === "-" || getMap(plc.x + plc.rbx, plc.y + plc.rby) === "-") {
          plc.y -= 0.0625;
          plc.dy = 0;
        }
      }
      
      // ******************
      // ---- drawing -----
      // ******************
      // update anime
      plc.updateAnime();
      shotArray.forEach((e) => {
        e.updateAnime();
      });

      // draw shadow (character)
      plc.drawShadow(charaCtx);
      for (let i = 0; i < shotArray.length; i++) {
        shotArray[i].drawShadow(charaCtx);
      }
      // draw shadow (map)
      for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
          if (mapData[y][x] === '*') {
            charaCtx.fillStyle = "#0d080d";
            charaCtx.fillRect(x * gridSize + 2, y * gridSize + 2, gridSize, gridSize);
          }
        }
      }
      // draw map image
      for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
          if (mapData[y][x] === '*') {
            if (y != 0) {
              if (mapData[y - 1][x] === "*") {
                charaCtx.drawImage(imgMapchip_2, x * gridSize, y * gridSize);
              }
              else {
                charaCtx.drawImage(imgMapchip_1, x * gridSize, y * gridSize);
              }
            }
            else {
              charaCtx.drawImage(imgMapchip_2, x * gridSize, y * gridSize);
            }
          }
          else if (mapData[y][x] === '-') {
            charaCtx.fillStyle = "tomato";
            charaCtx.fillRect(x * gridSize, y * gridSize, gridSize, 4);
          }
        }
      }

      // draw character
      // player
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
      // shot
      for (let i = 0; i < shotArray.length; i++) {
        shotArray[i].drawAnime(charaCtx);
      }
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
  // create shadow sprite
  imgPlayerShadow.src = createShadowURL(imgPlayer);
  imgShotShadow.src = createShadowURL(imgShot);
  // draw background
  backgCtx.fillStyle = "#2a2349";
  backgCtx.fillRect(0, 0, 320, 240);
  // start game loop
  setInterval(gameLoop, 1000/60); // 60fps
};




