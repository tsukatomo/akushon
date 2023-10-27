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

// enemy
let imgPumpkin = new Image();
let imgPumpkinShadow = new Image();
imgPumpkin.src = "./img/pumpkin.png";

// shot
let imgShot = new Image();
let imgShotShadow = new Image();
imgShot.src = "./img/shot.png";

let imgMapchip_1 = new Image();
let imgMapchip_2 = new Image();
let imgBridge = new Image();
let imgBlock = new Image();
imgMapchip_1.src = "./img/mapchip_1.png";
imgMapchip_2.src = "./img/mapchip_2.png";
imgBridge.src = "./img/bridge.png";
imgBlock.src = "./img/block.png";

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
let animeData = {
  "player":  {
    "stand_l": { frames: 1, dulation: 8, img: [0], repeat: true },
    "stand_r": {frames: 1, dulation: 8, img: [3], repeat: true },
    "run_l": {frames: 4, dulation: 6, img: [0, 2, 0, 1], repeat: true },
    "run_r": {frames: 4, dulation: 6, img: [3, 5, 3, 4], repeat: true },
    "jump_l": {frames: 1, dulation: 8, img: [1], repeat: true },
    "jump_r": {frames: 1, dulation: 8, img: [4], repeat: true },
    "default": {frames: 1, dulation: 8, img: [0], repeat: true }
  },
  "shot": {
    "shot": { frames: 1, dulation: 8, img: [0], repeat: true },
    "vanish": { frames: 2, dulation: 3, img: [1, 2], repeat: false }, 
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "pumpkin": {
    "laugh": { frames: 2, dulation: 8, img: [0, 1], repeat: true },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "default": {
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  }
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
  "....@-@-------......",
  "....*.*.............",
  "....*-*..........@..",
  "....b...............",
  "....b.......---.....",
  "....@@@@@...........",
  ".....***............",
  "............@@---...",
  "..---.......**......",
  "............bb....@@",
  "............bb...@**",
  "@@@@@@@@@...@@@@@***",
  "*********...********",
  "*********...********",
];
let mapChip = {
  "@": {
    img: imgMapchip_1,
    type: "wall",
    subtype: "none"
  },
  "*": {
    img: imgMapchip_2,
    type: "wall",
    subtype: "none"
  },
  "b": {
    img: imgBlock,
    type: "wall",
    subtype: "block"
  },
  "-": {
    img: imgBridge,
    type: "bridge",
    subtype: "none"
  },
  ".": {
    img: null,
    type: "none",
    subtype: "none"
  }
};

// for game scene
let scene;
let sceneOverLay;
let initFlag;
// for camera
let cameraX;
let cameraY;

// sprite class
class Sprite {
  constructor(name, x, y, w, h, img, shadow, anime) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.w= w;
    this.h = h;
    // image and animation data
    this.img = img;
    this.shadow = shadow;
    this.anime = anime;
    this.direction = "right";
    this.anitype = "default";
    this.anicount = 0;
    // speed
    this.dx = 0;
    this.dy = 0;
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
    ctx.drawImage(this.img, this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, Math.floor(this.x - cameraX), Math.floor(this.y - cameraY), this.w, this.h);
  };

  drawShadow (ctx) {
    ctx.drawImage(this.shadow, this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, Math.floor(this.x + 1 - cameraX), Math.floor(this.y + 1 - cameraY), this.w, this.h);
  }

};

// character class
class CharacterSprite extends Sprite{
  constructor(name, x, y, w, h, ltx, lty, rbx, rby, img, shadow, anime) {
    super(name, x, y, w, h, img, shadow, anime);
    // ltx,lty = left top of hitbox
    this.ltx = ltx;
    this.lty = lty;
    // rbx, rby = right bottom of hitbox
    this.rbx = rbx;
    this.rby = rby;
    // landing flag
    this.onLand = false;
  };

  lTopX () { return this.x + this.ltx; };
  lTopY () { return this.y + this.lty; };
  rBottomX () { return this.x + this.rbx; };
  rBottomY () { return this.y + this.rby; };

  isHit (opponent) {
    return (
      opponent.lTopX() <= this.rBottomX() && this.lTopX() <= opponent.rBottomX()
      && opponent.lTopY() <= this.rBottomY() && this.lTopY() <= opponent.rBottomY()
    );
  };
};

let plc;
let shotArray = [];
let shotMax = 5;
let coyoteTime = 0;
let invincibleTime = 0; // muteki jikan san!?
const invincibleTimeMax = 120;

// get map data from pixel coordinate (output: type of mapchip Object)
let getMapType = (x, y) => {
  let mapX = Math.floor(x / gridSize);
  let mapY = Math.floor(y / gridSize);
  if (mapX < 0 || mapWidth <= mapX) return "none";
  if (mapY < 0 || mapHeight <= mapY) return "none";
  if (mapChip[mapData[mapY][mapX]].type === "bridge") { // half floor
    if (y % gridSize < 4){
      return "bridge";
    }
    else {
      return "none";
    }
  }
  return mapChip[mapData[mapY][mapX]].type;
};

let getMapSubType = (x, y) => {
  let mapX = Math.floor(x / gridSize);
  let mapY = Math.floor(y / gridSize);
  if (mapX < 0 || mapWidth <= mapX) return "none";
  if (mapY < 0 || mapHeight <= mapY) return "none";
  return mapChip[mapData[mapY][mapX]].subtype;
};

// replace map data
let replaceMap = (x, y, newMapchip) => {
  mapData[y] = mapData[y].substring(0, x) + newMapchip + mapData[y].substring(x + 1, mapData[y].length);
};

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
      plc = new CharacterSprite("player", 0, 0, 16, 16, 3, 2, 12, 15, imgPlayer, imgPlayerShadow, animeData["player"]);
      enemy = new CharacterSprite("pumpkin", 128, 80, 16, 16, 2, 5, 13, 15, imgPumpkin, imgPumpkinShadow, animeData["pumpkin"]);
      enemy.changeAnime("laugh");
      console.log(plc.ltx, plc.lty, plc.rbx, plc.rby);
    },
    "update" : () => {
      // *********************
      // player character move
      // *********************
      plc.onLand = (getMapType(plc.lTopX(), plc.rBottomY() + 0.0625) === "wall" || getMapType(plc.rBottomX(), plc.rBottomY() + 0.0625) === "wall");
      if (plc.dy >= 0) {
        plc.onLand |= (getMapType(plc.lTopX(), plc.rBottomY() + 0.0625) === "bridge" || getMapType(plc.rBottomX(), plc.rBottomY() + 0.0625) === "bridge");
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
        let newShot = new CharacterSprite("shot", plc.x, plc.y, 16, 16, 4, 4, 11, 11, imgShot, imgShotShadow, animeData["shot"]);
        newShot.dx = plc.direction === "left" ? -2 : 2;
        newShot.changeAnime("shot");
        shotArray.push(newShot);
      }
      // move shot
      for (let i = 0; i < shotArray.length; i++) {
        shotArray[i].x += shotArray[i].dx;
        shotArray[i].param1++;
        if (shotArray[i].anitype === "shot") {
          if (shotArray[i].param1 >= 40 || getMapType(shotArray[i].x + 8, shotArray[i].y + 8) === "wall"|| shotArray[i].isHit(enemy)) {
            shotArray[i].dx = 0;
            shotArray[i].changeAnime("vanish");
            shotArray[i].param1 = 0;
            if (getMapSubType(shotArray[i].x + 8, shotArray[i].y + 8) === "block") {
              replaceMap(Math.floor((shotArray[i].x + 8) / gridSize), Math.floor((shotArray[i].y + 8) / gridSize), '.');
              console.log("break!!");
            }
          }
          shotArray[i].dx += Math.sign(shotArray[i].dx) * 0.0625;
        }
      }
      // erase shot
      shotArray = shotArray.filter((e) => {
        return e.param1 <= 6 || e.anitype != "vanish";
      });
      // damage
      if (invincibleTime > 0) invincibleTime--;
      if (plc.isHit(enemy) && invincibleTime <= 0) {
        plc.dx = -plc.dx;
        plc.dy = -2;
        invincibleTime = invincibleTimeMax;
      }

      // limit speed
      if (plc.dx > 1.25) plc.dx = 1.25;
      if (plc.dx < -1.25) plc.dx = -1.25;
      if (plc.dy > 4.0) plc.dy = 4.0;
      // update x position
      plc.x += plc.dx;
      // マップとの衝突
      // left
      while (getMapType(plc.lTopX(), plc.lTopY()) === "wall" || getMapType(plc.lTopX(), plc.rBottomY()) === "wall") {
        plc.x += 0.0625;
        plc.dx = 0;
      }
      // right
      while (getMapType(plc.rBottomX(), plc.lTopY()) === "wall" || getMapType(plc.rBottomX(), plc.rBottomY()) === "wall") {
        plc.x -= 0.0625;
        plc.dx = 0;
      }
      // update y position
      plc.y += plc.dy;
      // top
      while (getMapType(plc.lTopX(), plc.lTopY()) === "wall" || getMapType(plc.rBottomX(), plc.lTopY()) === "wall") {
        plc.y += 0.0625;
        plc.dy = 0;
      }
      // bottom
      while (getMapType(plc.lTopX(),plc.rBottomY()) === "wall"|| getMapType(plc.rBottomX(), plc.rBottomY()) === "wall") {
        plc.y -= 0.0625;
        plc.dy = 0;
      }
      if (plc.dy >= 0) {
        while (getMapType(plc.lTopX(), plc.rBottomY()) === "bridge" || getMapType(plc.rBottomX(), plc.rBottomY()) === "bridge") {
          plc.y -= 0.0625;
          plc.dy = 0;
        }
      }
      
      // ******************
      // ---- drawing -----
      // ******************
      // update camera position
      cameraX = Math.floor(plc.x - charaLay.width / 2 + 8);
      cameraY = Math.floor(plc.y - charaLay.height / 2 + 8);
      let startDrawingMapX = Math.floor(cameraX / gridSize);
      let startDrawingMapY = Math.floor(cameraY / gridSize);
      // update anime
      plc.updateAnime();
      enemy.updateAnime();
      shotArray.forEach((e) => {
        e.updateAnime();
      });
      
      // draw shadow (character)
      if (Math.floor(invincibleTime / 2) * 2 % 4 === 0) plc.drawShadow(charaCtx);
      enemy.drawShadow(charaCtx);
      for (let i = 0; i < shotArray.length; i++) {
        shotArray[i].drawShadow(charaCtx);
      }
      // draw shadow (map)
      charaCtx.fillStyle = "#0d080d";
      for (let x = startDrawingMapX; x < startDrawingMapX + mapWidth + 1; x++) {
        if (x < 0 || x >= mapData[0].length) continue;
        for (let y = startDrawingMapY; y < startDrawingMapY + mapHeight + 1; y++) {
          if (y < 0 || y >= mapData.length) continue;
          if (mapChip[mapData[y][x]].type === "wall") {
            charaCtx.fillRect(x * gridSize + 2 - cameraX, y * gridSize + 2 - cameraY, gridSize, gridSize);
          }
          else if (mapChip[mapData[y][x]].type === "bridge") {
            charaCtx.fillRect(x * gridSize + 2 - cameraX, y * gridSize + 2 - cameraY, gridSize, 4);
          }
        }
      }
      // draw map image
      for (let x = startDrawingMapX; x < startDrawingMapX + mapWidth + 1; x++) {
        if (x < 0 || x >= mapData[0].length) continue;
        for (let y = startDrawingMapY; y < startDrawingMapY + mapHeight + 1; y++) {
          if (y < 0 || y >= mapData.length) continue;
          if (mapChip[mapData[y][x]].type === "none") continue;
          charaCtx.drawImage(mapChip[mapData[y][x]].img, x * gridSize - cameraX, y * gridSize - cameraY);
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
      charaCtx.fillRect(Math.round(plc.lTopX()), Math.round(plc.lTopY()), plc.rbx - plc.ltx, plc.rby - plc.lty);
      */
      enemy.drawAnime(charaCtx);
      // shot
      for (let i = 0; i < shotArray.length; i++) {
        shotArray[i].drawAnime(charaCtx);
      }
      if (Math.floor(invincibleTime / 2) * 2 % 4 === 0) plc.drawAnime(charaCtx);
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
  imgPumpkinShadow.src = createShadowURL(imgPumpkin);
  imgShotShadow.src = createShadowURL(imgShot);
  // draw background
  backgCtx.fillStyle = "#2a2349";
  backgCtx.fillStyle = "#4f2b24";
  backgCtx.fillStyle = "#32535f";
  backgCtx.fillRect(0, 0, 320, 240);
  // start game loop
  setInterval(gameLoop, 1000/60); // 60fps
};




