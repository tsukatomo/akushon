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
let imgWatage = new Image();
let imgWatageShadow = new Image();
imgWatage.src = "./img/watage.png";
let imgSlime = new Image();
let imgSlimeShadow = new Image();
imgSlime.src = "./img/slime.png";

// shot
let imgShot = new Image();
let imgShotShadow = new Image();
imgShot.src = "./img/shot.png";

let imgMapChip = new Image();
let imgMapChipShadow = new Image();
imgMapChip.src = "./img/mapchip.png";

let originShadowList = {
  "player" : { origin: imgPlayer, shadow: imgPlayerShadow },
  "pumpkin" : { origin: imgPumpkin, shadow: imgPumpkinShadow },
  "watage" : { origin: imgWatage, shadow: imgWatageShadow },
  "slime" : { origin: imgSlime, shadow: imgSlimeShadow },
  "shot" : { origin: imgShot, shadow: imgShotShadow},
  "mapchip" : { origin: imgMapChip, shadow: imgMapChipShadow },
};

// create shadow image
let createShadowURL = function(originalImg) {
  // create new canvas
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
    data[i + 3] = 0x40;
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
    "back_l": {frames: 1, dulation: 8, img: [6], repeat: false},
    "back_r": {frames: 1, dulation: 8, img: [7], repeat: false},
    "default": {frames: 1, dulation: 8, img: [0], repeat: true }
  },
  "shot": {
    "shot": { frames: 1, dulation: 8, img: [0], repeat: true },
    "vanish": { frames: 2, dulation: 3, img: [1, 2], repeat: false }, 
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "pumpkin": {
    "laugh": { frames: 2, dulation: 8, img: [0, 1], repeat: true },
    "damaged" : { frames: 1, dulation: 2, img: [2], repeat: true },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "watage": {
    "float1": { frames: 3, dulation: 6, img: [0, 1, 2], repeat: true },
    "float2": { frames: 3, dulation: 6, img: [4, 5, 6], repeat: true },
    "damaged1" : { frames: 1, dulation: 2, img: [3], repeat: true },
    "damaged2" : { frames: 1, dulation: 2, img: [7], repeat: true },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "slime": {
    "walk_l": {frames: 4, dulation: 8, img: [0, 1, 2, 3], repeat: true},
    "walk_r": {frames: 4, dulation: 8, img: [4, 5, 6, 7], repeat: true},
    "turn_to_l" : {frames: 3, dulation: 6, img: [8, 9, 10], repeat: false},
    "turn_to_r" : {frames: 3, dulation: 6, img: [10, 9, 8], repeat: false},
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "default": {
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  }
};

// global variables

// for map
let gridSize = 16;
let mapAnimeCount = 0;
const mapChip = {
  ".": {
    id: [0],
    type: "none",
    subtype: "none"
  },
  "#": {
    id: [1],
    type: "wall",
    subtype: "block"
  },
  "$": {
    id: [1],
    type: "wall",
    subtype: "block_coin"
  },
  "%": {
    id: [2],
    type: "wall",
    subtype: "none"
  },
  "*": {
    id: [3],
    type: "wall",
    subtype: "none"
  },
  "[": {
    id: [4],
    type: "bridge",
    subtype: "none"
  },
  "-": {
    id: [5],
    type: "bridge",
    subtype: "none"
  },
  "]": {
    id: [6],
    type: "bridge",
    subtype: "none"
  },
  "+": {
    id: [7],
    type: "wall",
    subtype: "none"
  },
  "^": {
    id: [8],
    type: "none",
    subtype: "damage"
  },
  "~": {
    id: [9],
    type: "none",
    subtype: "damage"
  },
  "¥": {
    id: [10, 11, 12, 13],
    type: "none",
    subtype: "coin"
  },
  "|": {
    id: [14],
    type: "background",
    subtype: "none"
  },
  "@": {
    id: [15],
    type: "background",
    subtype: "door"
  }
};
const mapChipList = Object.keys(mapChip);

// get level data
let levelName = "1-1";
let levelStart = "A";
let mapWidth = 90;
let mapHeight = 15;
let mapData;
let nextData;
async function getLevelData(levelName) {
  const requestURL = "./js/levels/level" + levelName +".json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  const levelData = await response.json();
  console.log("loaded!");
  mapWidth = levelData["width"];
  mapHeight = levelData["height"];
  mapData = levelData["map"];
  nextData = levelData["next"];
};

// for game scene
let scene;
let sceneOverLay;
let initFlag, overLayInitFlag;
let nowLoading;
let sceneAfterTrans;
let transAnimeCount = 0;
const transAnimeCountInit = 30;

let setScene = (nextscene) => {
  scene = nextscene;
  initFlag = true;
  nowLoading = true;
};

let setOverlayScene = (nextscene) => {
  sceneOverLay = nextscene;
  overLayInitFlag = true;
};

let setTransition = (nextscene) => {
  sceneAfterTrans = nextscene;
  setOverlayScene("transin");
}

// for camera
let cameraX;
let cameraY;

// sprite class
class Sprite {
  constructor(id, x, y, w, h, img, shadow, anime) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
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
    this.param = [];
  };

  changeAnime (new_anitype) {
    if (new_anitype === this.anitype) return;
    this.anitype = new_anitype;
    this.anicount = 0;
  };

  updateAnime () {
    this.anicount++;
  };

  isEndAnime () {
    return (!this.anime[this.anitype].repeat && this.anicount > this.anime[this.anitype].dulation * this.anime[this.anitype].frames)
  };

  frameNumber () {
    let frameCount = Math.floor(this.anicount / this.anime[this.anitype].dulation);
    if (this.anime[this.anitype].repeat) {
      return frameCount % this.anime[this.anitype].frames;
    }
    return frameCount < this.anime[this.anitype].frames ? frameCount : this.anime[this.anitype].frames - 1;
  };

  drawAnime (ctx, drawX, drawY) {
    ctx.drawImage(this.img, this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, drawX, drawY, this.w, this.h);
  };

  drawShadow (ctx, drawX, drawY) {
    ctx.drawImage(this.shadow, this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, drawX, drawY, this.w, this.h);
  };

};

// character class
class CharacterSprite extends Sprite{
  constructor(id, x, y, w, h, ltx, lty, rbx, rby, hp, img, shadow, anime) {
    super(id, x, y, w, h, img, shadow, anime);
    // ltx,lty = left top of hitbox
    this.ltx = ltx;
    this.lty = lty;
    // rbx, rby = right bottom of hitbox
    this.rbx = rbx;
    this.rby = rby;
    // hit point
    this.hp = hp;
    // reaction effect counter
    this.reaction = 0;
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
let enemyArray = [];
let shotArray = [];
let doorArray = [];
const shotMax = 5;
let coyoteTime = 0; // ku-chu-de jump dekiru yu-yo frame su
let isJumping = false;
const invincibleTimeMax = 120; // muteki jikan san!?
let stopFlag = false;

// get map type from pixel coordinate (output: type of mapchip Object)
// 注意：一方通行床はy座標がグリッド上部の時しか検出しません
let getMapType = (x, y) => {
  let mapX = Math.floor(x / gridSize);
  let mapY = Math.floor(y / gridSize);
  if (mapX < 0 || mapWidth <= mapX) return "wall";
  if (mapY < 0) mapY = 0;
  if (mapHeight <= mapY) return "none";
  if ('A' <= mapData[mapY][mapX] && mapData[mapY][mapX] <= 'Z') return "none";
  if ('a' <= mapData[mapY][mapX] && mapData[mapY][mapX] <= 'z') return "none";
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
  if (mapY < 0) mapY = 0;
  if (mapHeight <= mapY) return "none";
  if ('A' <= mapData[mapY][mapX] && mapData[mapY][mapX] <= 'Z') return "none";
  if ('a' <= mapData[mapY][mapX] && mapData[mapY][mapX] <= 'z') return "none";
  return mapChip[mapData[mapY][mapX]].subtype;
};

// replace map data
let replaceMap = (x, y, newMapchip) => {
  mapData[y] = mapData[y].substring(0, x) + newMapchip + mapData[y].substring(x + 1, mapData[y].length);
};

// キャラクターの接地判定
let isTouchingLeftWall = (character) => {
  return (getMapType(character.lTopX() - 0.0625, character.lTopY()) === "wall" || getMapType(character.lTopX() - 0.0625, character.rBottomY()) === "wall");
};

let isTouchingRightWall = (character) => {
  return (getMapType(character.rBottomX() + 0.0625, character.lTopY()) === "wall" || getMapType(character.rBottomX() + 0.0625, character.rBottomY()) === "wall");
};

let isHeading = (character) => {
  return (getMapType(character.lTopX(), character.lTopY() - 0.0625) === "wall" || getMapType(character.rBottomX(), character.lTopY() - 0.0625) === "wall");
};

let isOnLand = (character) => {
  let onLand = (getMapType(character.lTopX(), character.rBottomY() + 0.0625) === "wall" || getMapType(character.rBottomX(), character.rBottomY() + 0.0625) === "wall");
  if (character.dy >= 0) {
    onLand |= (getMapType(character.lTopX(), character.rBottomY() + 0.0625) === "bridge" || getMapType(character.rBottomX(), character.rBottomY() + 0.0625) === "bridge");
  }
  return onLand;
};

// キャラクターを移動させ、地形とぶつかったら押し戻す関数
let moveAndCheckCollisionWithMap = (character) => {
  // update x position
  character.x += character.dx;
  // left
  while (getMapType(character.lTopX(), character.lTopY()) === "wall" || getMapType(character.lTopX(), character.rBottomY()) === "wall") {
    character.x += 0.0625;
  }
  // right
  while (getMapType(character.rBottomX(), character.lTopY()) === "wall" || getMapType(character.rBottomX(), character.rBottomY()) === "wall") {
    character.x -= 0.0625;
  }
  // update y position
  character.y += character.dy;
  // top
  while (getMapType(character.lTopX(), character.lTopY()) === "wall" || getMapType(character.rBottomX(), character.lTopY()) === "wall") {
    character.y += 0.0625;
  }
  // bottom
  while (getMapType(character.lTopX(),character.rBottomY()) === "wall"|| getMapType(character.rBottomX(), character.rBottomY()) === "wall") {
    character.y -= 0.0625;
  }
  if (character.dy >= 0) {
    while (getMapType(character.lTopX(), character.rBottomY()) === "bridge" || getMapType(character.rBottomX(), character.rBottomY()) === "bridge") {
      character.y -= 0.0625;
    }
  }
};

// get random integer (min ≤ r ≤ max)
let randInt = function(min, max) {
  let minInt = Math.ceil(min);
  let maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

  // ============= //
 //  enemy data   //
// ============= //
const enemyData = {
  "W" : { // watage
    "w" : 16,
    "h" : 16,
    "box" : [3, 3, 12, 12],
    "hp" : 4,
    "img" : [imgWatage, imgWatageShadow],
    "anime": "watage",
    "move": (me) => {
      if (me.param.length === 0) {
        me.param.push(me.x);
        me.param.push(me.y);
        me.param.push(randInt(0,799));
        me.param.push(randInt(0,799));
      }
      if (me.hp >= 3) { // float
        if (me.reaction > 0) {
          me.changeAnime("damaged1");
          me.param[2] = (me.param[2] + 1) % 800;
          me.param[3] = (me.param[3] + 1) % 800;
        }
        else {
          me.changeAnime("float1");
          me.param[2] = (me.param[2] + 2) % 800;
          me.param[3] = (me.param[3] + 2) % 800;
        }
        me.dx = Math.cos(2 * Math.PI * me.param[2] / 800 * 2) * 24;
        me.dy = Math.sin(2 * Math.PI * me.param[3] / 800 * 3) * 24;
        me.x = me.param[0] + me.dx;
        me.y = me.param[1] + me.dy;
      }
      else { // chase
        me.dx += Math.sign(plc.x - me.x) * 0.03125;
        me.dy += Math.sign(plc.y - me.y) * 0.0625;
        if (me.dx > 2) me.dx = 2;
        if (me.dx < -2) me.dx = -2;
        if (me.dy > 2) me.dy = 2;
        if (me.dy < -2) me.dy = -2;
        if (me.reaction-- > 0) {
          me.changeAnime("damaged1");
          me.dx *= 0.75;
          me.dy += 0.03125;
        }
        else {
          me.changeAnime("float1");
        }
        me.x += me.dx;
        me.y += me.dy;        
      }
    }
  },
  "w" : { // watage 2
    "w" : 16,
    "h" : 16,
    "box" : [3, 3, 12, 12],
    "hp" : 4,
    "img" : [imgWatage, imgWatageShadow],
    "anime": "watage",
    "move": (me) => {
      if (me.param.length === 0) {
        me.param.push(me.x);
        me.param.push(me.y);
        me.param.push(randInt(0,799));
      }
      if (me.reaction > 0) {
        me.changeAnime("damaged2");
        me.param[2] = (me.param[2] + 1) % 800;
      }
      else {
        me.changeAnime("float2");
        me.param[2] = (me.param[2] + 2) % 800;
      }
      me.dx = 0;
      me.dy = Math.sin(2 * Math.PI * me.param[2] / 800 * 2) * 24;
      me.x = me.param[0] + me.dx;
      me.y = me.param[1] + me.dy;
    }
  },
  "P" : {
    "w" : 16,
    "h" : 16,
    "box" : [3, 3, 12, 15],
    "hp" : 3,
    "img" : [imgPumpkin, imgPumpkinShadow],
    "anime": "pumpkin",
    "move": (me) => {
      if (me.reaction > 0) {
        me.changeAnime("damaged");
        if (me.anicount === 0) me.dy = 0;
      }
      else {
        me.changeAnime("laugh");
      }
      if (isOnLand(me)) {
        if (Math.abs(me.x - plc.x) < 100) {
          me.dy = -3.0;
          me.direction = (me.x < plc.x) ? "right" : "left";
          if (me.reaction <= 0) me.dx = me.direction === "right" ? 0.5 : -0.5;
        }
        else {
          me.dx = 0;
          me.dy = 0;
        }
      }
      if (isHeading(me)) {
        me.dy = -me.dy;
      }
      me.dy += 0.125;
      if (me.dy > 4) me.dy = 4;
      moveAndCheckCollisionWithMap(me);
    }
  },
  "S": { // Slime
    "w" : 32,
    "h" : 32,
    "box" : [7, 16, 24, 31],
    "hp" : 8,
    "img" : [imgSlime, imgSlimeShadow],
    "anime": "slime",
    "move": (me) => {
      if (!isOnLand(me)) {
        me.dy += 0.125;
      }
      else {
        me.dy = 0;
      }
      if (me.dy > 4) me.dy = 4;
      if (isTouchingLeftWall(me) && me.direction === "left") {
        me.direction = "right";
        me.changeAnime("turn_to_r");
      }
      if ((isTouchingRightWall(me) && me.direction === "right") || me.anitype === "default") {
        me.direction = "left";
        me.changeAnime("turn_to_l");
      }
      if (me.isEndAnime()) {
        me.changeAnime(me.direction === "left" ? "walk_l" : "walk_r");
      }
      me.dx = 0.25 * (me.anitype === "walk_l" ? -1 : me.anitype === "walk_r" ? 1 : 0);
      moveAndCheckCollisionWithMap(me);
    }
  }
};

const enemyChipList = Object.keys(enemyData);

  // --------------//
 // get key event //
// --------------//
// grobal variables for key inputs
let keyInput = [];
let keyPressed = [];
let keyPressedPrevious = [];
let keyInterval = 0;
let buttonPressed;

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
    "init" : async () => {
      // reset data
      shotArray = [];
      enemyArray = [];
      doorArray = [];
      // 時は動き出す……
      stopFlag = false;
      // get level data
      await getLevelData(levelName);
      // create Player Character
      plc = new CharacterSprite("player", 0, 0, 16, 16, 3, 2, 12, 15, 5, imgPlayer, imgPlayerShadow, animeData["player"]);
      // create Enemy Character
      for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
          // player
          if (mapData[y][x] === levelStart) {
            plc.x = x * gridSize;
            plc.y = y * gridSize;
          }
          // door
          if (mapData[y][x] === "@") {
            doorArray.push({ x: x * gridSize, y: y * gridSize, next: nextData.pop() });
          }
          // enemy
          if (enemyChipList.indexOf(mapData[y][x]) === -1) continue;
          let newEnemy = new CharacterSprite(
            mapData[y][x], // id
            x * gridSize, // start position x
            y * gridSize, // start position y
            enemyData[mapData[y][x]].w, // width
            enemyData[mapData[y][x]].h, // height
            enemyData[mapData[y][x]].box[0], // hit box 
            enemyData[mapData[y][x]].box[1],
            enemyData[mapData[y][x]].box[2],
            enemyData[mapData[y][x]].box[3],
            enemyData[mapData[y][x]].hp, // hp
            enemyData[mapData[y][x]].img[0], // sprite sheet
            enemyData[mapData[y][x]].img[1],
            animeData[enemyData[mapData[y][x]].anime]
          );
          enemyArray.push(newEnemy);
          console.log("add enemy:" + mapData[y][x]);
        }
      }
      //enemy = new CharacterSprite("pumpkin", 160, 120, 16, 16, 2, 5, 13, 15, imgPumpkin, imgPumpkinShadow, animeData["pumpkin"]);
      //enemy.changeAnime("laugh");
      console.log(plc.ltx, plc.lty, plc.rbx, plc.rby);
      return 0;
    },
    "update" : () => {
      if (!stopFlag) {
        // *********************
        // player character move
        // *********************
        // hit wall -> stop
        if (isTouchingLeftWall(plc) || isTouchingRightWall(plc)) plc.dx = 0;
        if (isHeading(plc)) plc.dy = 0;
        // key inputs
        if (isOnLand(plc)) {
          plc.dy = 0;
          isJumping = false;
          coyoteTime = 7;
          if (keyInput.indexOf("l") != -1) {
            plc.dx -= 0.125;
            plc.direction = "left";
          }
          else if (keyInput.indexOf("r") != -1) {
            plc.dx += 0.125;
            plc.direction = "right";
          }
          else {
            plc.dx = Math.sign(plc.dx) * (Math.abs(plc.dx) - 0.0625 > 0 ? Math.abs(plc.dx) - 0.0625 : 0);
          }
          // enter to door
          if (isKeyPressedNow("u")) {
            doorArray.forEach((e) => {
              if (plc.x + 8 < e.x || e.x + gridSize < plc.x + 8) return;
              if (plc.y + 8 < e.y || e.y + gridSize < plc.y + 8) return;
              levelName = e["next"]["level"];
              levelStart = e["next"]["start"];
              setTransition("game");
              stopFlag = true;
            });
          }
        }
        else {
          coyoteTime--;
          if (keyInput.indexOf("l") != -1) {
            plc.dx -= 0.0625;
            plc.direction = "left";
          }
          else if (keyInput.indexOf("r") != -1) {
            plc.dx += 0.0625;
            plc.direction = "right";
          }
          if (keyInput.indexOf("z") != -1 && isJumping) {
            plc.dy += 0.0625;
          }
          else {
            isJumping = false;
            plc.dy += 0.125;
          }
        }
        // jump
        if (isKeyPressedNow("z") && coyoteTime > 0) {
          plc.dy = -2.5;
          isJumping = true;
          coyoteTime = 0;
        }
        // create shot
        if (isKeyPressedNow("x") && shotArray.length < shotMax) {
          let newShot = new CharacterSprite("shot", plc.x, plc.y, 16, 16, 4, 4, 11, 11, 1, imgShot, imgShotShadow, animeData["shot"]);
          newShot.dx = plc.direction === "left" ? -2 : 2;
          newShot.changeAnime("shot");
          newShot.param.push(0);
          shotArray.push(newShot);
        }
        // move shot
        for (let i = 0; i < shotArray.length; i++) {
          shotArray[i].x += shotArray[i].dx;
          shotArray[i].param[0]++;
          if (shotArray[i].anitype === "shot") {
            let isShotVanish = shotArray[i].param[0] >= 30;
            isShotVanish |= getMapType(shotArray[i].x + 8, shotArray[i].y + 8) === "wall";
            enemyArray.forEach((e) => {
              if (e.isHit(shotArray[i])) {
                isShotVanish = true;
                e.hp -= 1;
                e.reaction = 20;
              }
            });
            if (isShotVanish) {
              shotArray[i].dx = 0;
              shotArray[i].changeAnime("vanish");
              shotArray[i].param[0] = 0;
              if (getMapSubType(shotArray[i].x + 8, shotArray[i].y + 8) === "block") {
                replaceMap(Math.floor((shotArray[i].x + 8) / gridSize), Math.floor((shotArray[i].y + 8) / gridSize), '.');
              }
              else if (getMapSubType(shotArray[i].x + 8, shotArray[i].y + 8) === "block_coin") {
                replaceMap(Math.floor((shotArray[i].x + 8) / gridSize), Math.floor((shotArray[i].y + 8) / gridSize), '¥');
              }
            }
            shotArray[i].dx += Math.sign(shotArray[i].dx) * 0.0625;
          }
        }
        // erase shot
        shotArray = shotArray.filter((e) => {
          return e.param[0] <= 6 || e.anitype != "vanish";
        });
        // get item
        if (getMapSubType(plc.x + gridSize / 2, plc.y + gridSize / 2) === "coin") {
          replaceMap(Math.floor((plc.x + 8) / gridSize), Math.floor((plc.y + 8) / gridSize), '.');
        }
        // damage
        if (plc.reaction > 0) plc.reaction--;
        if (plc.reaction <= 0) {
          let isDamaged = getMapSubType(plc.x + gridSize / 2, plc.y + gridSize / 2) === "damage";
          enemyArray.forEach((e) => {
            isDamaged |= e.isHit(plc);
          });
          if (isDamaged) {
            plc.reaction = invincibleTimeMax;
            plc.dx = - plc.dx;
            plc.dy = plc.dy >= 0 ? -1.5 : 0;
          } 
        }
        // limit speed
        if (plc.dx > 1.25) plc.dx = 1.25;
        if (plc.dx < -1.25) plc.dx = -1.25;
        if (plc.dy > 4.0) plc.dy = 4.0;

        // update player position
        moveAndCheckCollisionWithMap(plc);
        
        // enemy move
        enemyArray.forEach((e) => {
          enemyData[e.id].move(e);
        });
        // erase enemy
        enemyArray = enemyArray.filter((e) => {
          return e.hp > 0;
        });
      } // stop flag ここまで！

      // ******************
      // ---- drawing -----
      // ******************
      // update camera position
      cameraX = Math.floor(plc.x - charaLay.width / 2 + 8);
      cameraY = Math.floor(plc.y - charaLay.height / 2 + 8);
      if (cameraX < 0) cameraX = 0;
      if (cameraY < 0) cameraY = 0;
      if (cameraX > mapWidth * gridSize - charaLay.width) cameraX = mapWidth * gridSize - charaLay.width;
      if (cameraY > mapHeight * gridSize - charaLay.height) cameraY = mapHeight * gridSize - charaLay.height;
      let startDrawingMapX = Math.floor(cameraX / gridSize);
      let startDrawingMapY = Math.floor(cameraY / gridSize);
      // update anime
      plc.updateAnime();
      enemyArray.forEach((e) => {
        e.updateAnime();
      });
      shotArray.forEach((e) => {
        e.updateAnime();
      });
      
      // update player animation
      if (isOnLand(plc)) {
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
      if (stopFlag) {
        plc.changeAnime(plc.direction === "left" ? "back_l" : "back_r");
      }
      // draw shadow (player)
      enemyArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        let shakeX = e.reaction-- > 0 ? ((e.reaction / 2 * 2) % 4) - 1 * (e.w / gridSize) : 0;
        e.drawShadow(charaCtx, Math.floor(e.x - cameraX + 1) + shakeX, Math.floor(e.y - cameraY + 1));
      }));
      shotArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawShadow(charaCtx, Math.floor(e.x - cameraX + 1), Math.floor(e.y - cameraY + 1));
      }));
      if (Math.floor(plc.reaction / 3) * 3 % 6 === 0) plc.drawShadow(charaCtx, Math.floor(plc.x - cameraX + 1), Math.floor(plc.y - cameraY) + 1);

      // draw map shadow & map
      mapAnimeCount++;
      charaCtx.fillStyle = "rgba(0, 0, 0, 0.25)";
      for (let y = startDrawingMapY - 1; y < startDrawingMapY + mapHeight + 1; y++) {
        if (y < 0 || y >= mapData.length) continue;
        for (let x = startDrawingMapX - 1; x < startDrawingMapX + mapWidth + 1; x++) {
          if (x < 0 || x >= mapData[y].length) continue;
          if ('A' <= mapData[y][x] && mapData[y][x] <= 'Z') continue;
          if ('a' <= mapData[y][x] && mapData[y][x] <= 'z') continue;
          let mapAnimeFrame = mapChip[mapData[y][x]].id[Math.floor(mapAnimeCount / 8) % mapChip[mapData[y][x]].id.length]
          if (mapAnimeFrame === 0) continue;
          if (mapChip[mapData[y][x]].type != "background") {
            charaCtx.drawImage(imgMapChipShadow, mapAnimeFrame * gridSize, 0, gridSize, gridSize, x * gridSize - cameraX + 2, y * gridSize - cameraY + 2, gridSize, gridSize);
            if (y === 0 && getMapType(x * gridSize, y) === "wall") { // copy wall shadow if top of map is wall
              charaCtx.drawImage(imgMapChipShadow, mapAnimeFrame * gridSize, 0, gridSize, gridSize, x * gridSize - cameraX + 2, (y - 1) * gridSize - cameraY + 2, gridSize, gridSize);
            }
          }
          charaCtx.drawImage(imgMapChip, mapAnimeFrame * gridSize, 0, gridSize, gridSize, x * gridSize - cameraX, y * gridSize - cameraY, gridSize, gridSize);
        }
      }

      // draw character
      enemyArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        let shakeX = e.reaction > 0 ? ((e.reaction / 2 * 2) % 4) - 1  * (e.w / gridSize) : 0;
        e.drawAnime(charaCtx, Math.floor(e.x - cameraX) + shakeX, Math.floor(e.y - cameraY));
      }));
      shotArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawAnime(charaCtx, Math.floor(e.x - cameraX), Math.floor(e.y - cameraY));
      }));
      if (Math.floor(plc.reaction / 3) * 3 % 6 === 0) plc.drawAnime(charaCtx, Math.floor(plc.x - cameraX), Math.floor(plc.y - cameraY));
    }
  },
  "golevel": {
    "init": () => {
      setScene("game");
    },
    "update": () => {

    }
  }
};

   //=======================//
  //  Over Lay Scene List  //
 //=======================//
let sceneOverLayList = {
  
  // sub scene: transin（トランジション開始）
  "transin": {
    init: () => {
      transAnimeCount = transAnimeCountInit;
      return 0;
    },
    update: () => {
      transCtx.fillStyle = "rgba(0, 0, 0, 1.0)"; // black
      transCtx.beginPath();
      transCtx.moveTo(0, 0);
      for (let i = 0; i <= 16; i++) {
        transCtx.lineTo(transLay.width * ((transAnimeCountInit - transAnimeCount) / transAnimeCountInit) + 32 * (i % 2), i * (transLay.height / 16));
      }
      transCtx.lineTo(0, transLay.height);
      transCtx.closePath();
      transCtx.fill();
      //transCtx.globalAlpha = 1.0;
      //transCtx.fillRect(640 * (transAnimeCount / transAnimeCountInit), 0, 640, 480);
      //transCtx.globalAlpha = 1.0 - (transAnimeCount / transAnimeCountInit);
      //transCtx.fillRect(0, 0, 640, 480);
      if (--transAnimeCount <= 0) {
        // set transition animation
        setOverlayScene("transwait");
      }
    }
  },

  // sub scene: transwait（トランジション中間）
  "transwait": {
    init: () =>  {
      transAnimeCount = transAnimeCountInit;
      return 0;
    },
    update: () => {
      transCtx.fillStyle = "rgba(0, 0, 0, 1.0)"; // black
      transCtx.fillRect(0, 0, 640, 480);
      if (--transAnimeCount <= 0) {
        // change scene
        setScene(sceneAfterTrans);
        // set transition animation
        setOverlayScene("transout");
      }
    }  
  },

  // sub scene: transout（トランジション終了）
  "transout": {
    init: () => {
      transAnimeCount = transAnimeCountInit;
      return 0;
    },
    update: () => {
      // update
      transCtx.fillStyle = "rgba(0, 0, 0, 1.0)"; // black
      transCtx.beginPath();
      transCtx.moveTo(transLay.width, 0);
      for (let i = 0; i <= 16; i++) {
        transCtx.lineTo(transLay.width * ((transAnimeCountInit - transAnimeCount) / transAnimeCountInit) + 32 * (i % 2), i * (transLay.height / 16));
      }
      transCtx.lineTo(transLay.width, transLay.height);
      transCtx.closePath();
      transCtx.fill();
      //transCtx.globalAlpha = transAnimeCount / transAnimeCountInit;
      //transCtx.fillRect(0, 0, 640 * (transAnimeCount / transAnimeCountInit), 480);
      if (--transAnimeCount <= 0) {
        // finish transition
        setOverlayScene("none");
      }
    }
  },

  "none" : {
    init: () => {
      return 0;
    },
    update: () => {}
  }
};



     //=====================//
    //                     //
   //  G A M E   L O O P  //
  //                     //
 //=====================//
let gameLoop = async () => {
  // reset canvas
  charaCtx.clearRect(0,0,640,480);
  useriCtx.clearRect(0,0,640,480);
  transCtx.clearRect(0,0,640,480);
  // get key input
  keyPressedPrevious = keyPressed.slice(); // storage previous key input
  keyPressed = keyInput.slice();
  // in game
  // scene
  // scene (over lay)
  if (overLayInitFlag) {
    overLayInitFlag = false;
    sceneOverLayList[sceneOverLay]["init"]();  
  }
  sceneOverLayList[sceneOverLay]["update"]();
  if (initFlag) {
    initFlag = false;
    nowLoading = await sceneList[scene]["init"]();
  }
  if (!nowLoading) {
    sceneList[scene]["update"]();
  }
};

  //-----------------//
 // Onload function //
//-----------------//
window.onload = () => {
  scene = "game";
  sceneOverLay = "none";
  initFlag = true;
  overLayInitFlag = true;
  nowLoading = true;
  // create shadow sprite
  Object.keys(originShadowList).forEach((key) => {
    originShadowList[key].shadow.src = createShadowURL(originShadowList[key].origin);
  });
  // draw background
  backgCtx.fillStyle = "#2a2349";
  //backgCtx.fillStyle = "#4f2b24";
  //backgCtx.fillStyle = "#32535f";
  //backgCtx.fillStyle = "#74adbb";
  backgCtx.fillRect(0, 0, 320, 240);
  // start game loop
  setInterval(gameLoop, 1000/60); // 60fps
};






