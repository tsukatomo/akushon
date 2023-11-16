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

// get font
let font = new FontFace("MaruMonica", "url(./fonts/x12y16pxMaruMonica.ttf)");

// get image
// player
let imgPlayer = [new Image(), new Image()]; // [original image, shadow image]
imgPlayer[0].src = "./img/fighter_action.png";
//imgPlayer.crossOrigin = "Anonymus";

// enemy
let imgPumpkin = [new Image(), new Image()];
imgPumpkin[0].src = "./img/pumpkin.png";
let imgWatage = [new Image(), new Image()];
imgWatage[0].src = "./img/watage.png";
let imgSlime = [new Image(), new Image()];
imgSlime[0].src = "./img/slime.png";
// enemy (Boss)
let imgBigPumpkin = [new Image(), new Image()];
imgBigPumpkin[0].src = "./img/bigpumpkin.png";

// item
let imgMedal = [new Image(), new Image()];
imgMedal[0].src = "./img/medal.png";

// shot
let imgShot = [new Image(), new Image()];
imgShot[0].src = "./img/shot.png";

// mapchip
let imgMapChip = [new Image(), new Image()];
imgMapChip[0].src = "./img/mapchip.png";

// effect
let imgExplode = [new Image(), new Image()];
imgExplode[0].src = "./img/explode.png";
let imgRedGlitter = [new Image(), new Image()];
imgRedGlitter[0].src = "./img/red_glitter.png";

// UI
let imgUiHeart = new Image();
imgUiHeart.src = "./img/heart.png";
let imgUiMedal = new Image();
imgUiMedal.src = "./img/ui_medal.png";
let imgUiCoin = new Image();
imgUiCoin.src = "./img/ui_coin.png";

let shadowList = [
  imgPlayer,
  imgPumpkin,
  imgWatage,
  imgSlime,
  imgBigPumpkin,
  imgMedal,
  imgShot,
  imgMapChip,
  imgExplode,
  imgRedGlitter 
];

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
    "yarare": {frames: 1, dulation: 8, img: [8], repeat: false},
    "spin": {frames: 4, dulation: 4, img: [0, 7, 6, 3], repeat: true },
    "fever": {frames: 2, dulation: 8, img: [9, 10], repeat: true },
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
  "bigpumpkin": {
    "laugh": { frames: 4, dulation: 8, img: [0, 1, 2, 3], repeat: true},
    "yarare": { frames: 1, dulation: 8, img: [4], repeat: true},
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "medal": {
    "default": { frames: 5, dulation: 6, img: [0, 1, 2, 3, 4], repeat: true }
  },
  "explode": {
    "default": { frames: 5, dulation: 5, img: [0, 1, 2, 3, 4], repeat: false } 
  },
  "glitter": {
    "default": { frames: 6, dulation: 2, img: [0, 1, 2, 2, 1, 0], repeat: false } 
  },
  "glitter_slow": {
    "default": { frames: 7, dulation: 3, img: [0, 1, 2, 2, 2, 2, 1], repeat: false } 
  },
  "default": {
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  }
};

// global variables

// for map
const gridSize = 16;
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
  },
  "?": {
    id: [16, 16, 16, 16, 16, 17, 18, 17],
    type: "none",
    subtype: "heart"
  },
  "!": {
    id: [1],
    type: "wall",
    subtype: "block_heart"
  },
  "π": { // id 19 = hidden block
    id: [19],
    type: "wall",
    subtype: "block"
  },
  "ø": {
    id: [19],
    type: "wall",
    subtype: "block_coin"
  },
  "†": {
    id: [19],
    type: "wall",
    subtype: "block_heart"
  },
  "∆": {
    id: [19],
    type: "wall",
    subtype: "block_door"
  },
  "∑": {
    id: [20],
    type: "none",
    subtype: "door"
  },
  ";": {
    id: [0],
    type: "none",
    subtype: "boss_gate"
  }
};
const mapChipList = Object.keys(mapChip);

// get level data
let levelSpecial = "none"; // ボス部屋のときは"boss"
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
  console.log("level has been loaded!");
  levelSpecial = levelData["special"];
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
const transAnimeCountInit = 40;
const nokogiri = 32;

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
let quakeTimeX = 0;
let quakeTimeY = 0;

// sprite class
class Sprite {
  constructor(id, x, y, w, h, img, anime) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // image and animation data
    this.img = img;
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
    ctx.drawImage(this.img[0], this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, drawX, drawY, this.w, this.h);
  };

  drawShadow (ctx, drawX, drawY) {
    ctx.drawImage(this.img[1], this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, drawX, drawY, this.w, this.h);
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
    // trueのとき、他キャラクターとの衝突判定を行わない
    this.isNoHit = false;
  };

  lTopX () { return this.x + this.ltx; };
  lTopY () { return this.y + this.lty; };
  rBottomX () { return this.x + this.rbx; };
  rBottomY () { return this.y + this.rby; };

  isHit (opponent) {
    if (this.isNoHit || opponent.isNoHit) return false;
    return (
      opponent.lTopX() <= this.rBottomX() && this.lTopX() <= opponent.rBottomX()
      && opponent.lTopY() <= this.rBottomY() && this.lTopY() <= opponent.rBottomY()
    );
  };
};

let plc;
let plcMaxHp = 4;
let enemyArray = [];
let shotArray = [];
let itemArray = [];
let effectArray = [];
let doorArray = [];
const shotMax = 5;
let coyoteTime = 0; // ku-chu-de jump dekiru yu-yo frame su
let isJumping = false;
const invincibleTimeMax = 120; // muteki jikan san!?
let stopFlag = false;
let bossBattlePhase = "none";
let yarareAnimeCounter = 0;
let clearAnimeCounter = 0;
let collectedMedal = [false, false, false];
let collectedCoins = 0;
let coinCounter = 0;
let dataResetCount = 0;

// get map type from pixel coordinate (output: type of mapchip Object)
// 注意：一方通行床はy座標がグリッド上部の時しか検出しません
let getMapType = (x, y) => {
  let mapX = Math.floor(x / gridSize);
  let mapY = Math.floor(y / gridSize);
  if (mapX < 0 || mapWidth <= mapX) return "wall";
  if (mapY < 0) mapY = 0;
  if (mapHeight <= mapY) return "none";
  if (mapChipList.indexOf(mapData[mapY][mapX]) === -1) return "none";
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
  if (mapChipList.indexOf(mapData[mapY][mapX]) === -1) return "none";
  return mapChip[mapData[mapY][mapX]].subtype;
};

// replace map data
let replaceMap = (x, y, newMapchip) => {
  mapData[y] = mapData[y].substring(0, x) + newMapchip + mapData[y].substring(x + 1, mapData[y].length);
};

// キャラクターの接地判定
let isTouchingLeftWall = (character) => {
  let isTouching = false;
  for (let y = 0; y < character.rBottomY() - character.lTopY(); y += gridSize) {
    isTouching |= getMapType(character.lTopX() - 0.0625, character.lTopY() + y) === "wall";
  }
  isTouching |= getMapType(character.lTopX() - 0.0625, character.rBottomY()) === "wall";
  return isTouching;
};

let isTouchingRightWall = (character) => {
  let isTouching = false;
  for (let y = 0; y < character.rBottomY() - character.lTopY(); y += gridSize) {
    isTouching |= getMapType(character.rBottomX() + 0.0625, character.lTopY() + y) === "wall";
  }
  isTouching |= getMapType(character.rBottomX() + 0.0625, character.rBottomY()) === "wall";
  return isTouching;
};

let isHeading = (character) => {
  let isTouching = false;
  for (let x = 0; x < character.rBottomX() - character.lTopX(); x += gridSize) {
    isTouching |= getMapType(character.lTopX() + x, character.lTopY() - 0.0625) === "wall";
  }
  isTouching |= getMapType(character.rBottomX(), character.lTopY() - 0.0625) === "wall";
  return isTouching;
};

let isOnLand = (character) => {
  let isTouching = false;
  for (let x = 0; x < character.rBottomX() - character.lTopX(); x += gridSize) {
    isTouching |= getMapType(character.lTopX() + x, character.rBottomY() + 0.0625) === "wall";
  }
  isTouching |= getMapType(character.rBottomX(), character.rBottomY() + 0.0625) === "wall";
  if (character.dy >= 0) {
    for (let x = 0; x < character.rBottomX() - character.lTopX(); x += gridSize) {
      isTouching |= getMapType(character.lTopX() + x, character.rBottomY() + 0.0625) === "bridge";
    }
    isTouching |= getMapType(character.rBottomX(), character.rBottomY() + 0.0625) === "bridge";
  }
  return isTouching;
};

// キャラクターを移動させ、地形とぶつかったら押し戻す関数
let moveAndCheckCollisionWithMap = (character) => {
  // update x position
  character.x += character.dx;
  // collision flag
  let isTouching = false;
  const loopMax = 10000;
  // left
  for (let i = 0; i < loopMax; i++) {
    isTouching = false;
    for (let y = 0; y < character.rBottomY() - character.lTopY(); y += gridSize) {
      isTouching |= getMapType(character.lTopX(), character.lTopY() + y) === "wall";
    }
    isTouching |= getMapType(character.lTopX(), character.rBottomY()) === "wall";
    if (!isTouching) break;
    character.x += 0.0625;
  }
  // right
  for (let i = 0; i < loopMax; i++) {
    isTouching = false;
    for (let y = 0; y < character.rBottomY() - character.lTopY(); y += gridSize) {
      isTouching |= getMapType(character.rBottomX(), character.lTopY() + y) === "wall";
    }
    isTouching |= getMapType(character.rBottomX(), character.rBottomY()) === "wall";
    if (!isTouching) break;
    character.x -= 0.0625;
  }
  // update y position
  character.y += character.dy;
  // top
  for (let i = 0; i < loopMax; i++) {
    let isTouching = false;
    for (let x = 0; x < character.rBottomX() - character.lTopX(); x += gridSize) {
      isTouching |= getMapType(character.lTopX() + x, character.lTopY()) === "wall";
    }
    isTouching |= getMapType(character.rBottomX(), character.lTopY()) === "wall";
    if (!isTouching) break;
    character.y += 0.0625;
  }
  // bottom
  for (let i = 0; i < loopMax; i++) {
    let isTouching = false;
    for (let x = 0; x < character.rBottomX() - character.lTopX(); x += gridSize) {
      isTouching |= getMapType(character.lTopX() + x, character.rBottomY()) === "wall";
    }
    isTouching |= getMapType(character.rBottomX(), character.rBottomY()) === "wall";
    if (!isTouching) break;
    character.y -= 0.0625;
  }
  // bottom (bridge)
  if (character.dy >= 0) {
    for (let i = 0; i < loopMax; i++) {
      let isTouching = false;
      for (let x = 0; x < character.rBottomX() - character.lTopX(); x += gridSize) {
        isTouching |= getMapType(character.lTopX() + x, character.rBottomY()) === "bridge";
      }
      isTouching |= getMapType(character.rBottomX(), character.rBottomY()) === "bridge";
      if (!isTouching) break;
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
  "W" : { // watage 1
    "type": "normal",
    "w" : 16,
    "h" : 16,
    "box" : [3, 3, 12, 12],
    "hp" : 4,
    "img" : imgWatage,
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
    "type": "normal",
    "w" : 16,
    "h" : 16,
    "box" : [3, 3, 12, 12],
    "hp" : 2,
    "img" : imgWatage,
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
  "P" : { // Pumpkin
    "type": "normal",
    "w" : 16,
    "h" : 16,
    "box" : [3, 3, 12, 15],
    "hp" : 3,
    "img" : imgPumpkin,
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
        if (Math.abs(me.x - plc.x) < 100 && cameraY < me.y + me.h && me.y < cameraY + charaLay.height) {
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
    "type": "normal",
    "w" : 32,
    "h" : 32,
    "box" : [8, 16, 23, 31],
    "hp" : 8,
    "img" : imgSlime,
    "anime": "slime",
    "move": (me) => {
      if (!isOnLand(me)) {
        me.dy += 0.125;
      }
      else {
        me.dy = 0;
      }
      if (me.dy > 4) me.dy = 4;
      if (((isOnLand(me) && getMapType(me.lTopX(), me.rBottomY() + 1) === "none") || isTouchingLeftWall(me)) && me.anitype === "walk_l") {
        me.direction = "right";
        me.changeAnime("turn_to_r");
      }
      else if ((((isOnLand(me) && getMapType(me.rBottomX(), me.rBottomY() + 1) === "none") || isTouchingRightWall(me)) && me.anitype === "walk_r") || me.anitype === "default") {
        me.direction = "left";
        me.changeAnime("turn_to_l");
      }
      if (me.isEndAnime()) {
        me.changeAnime(me.direction === "left" ? "walk_l" : "walk_r");
      }
      me.dx = 0.25 * (me.anitype === "walk_l" ? -1 : me.anitype === "walk_r" ? 1 : 0);
      moveAndCheckCollisionWithMap(me);
    }
  },
  "p": { // big pumpkin
    "type": "boss",
    "w" : 64,
    "h" : 64,
    "box" : [3, 16, 60, 63],
    "hp" : 80,
    "img" : imgBigPumpkin,
    "anime": "bigpumpkin",
    "move": (me) => {
      me.isNoHit = true; // 戦闘中以外衝突判定しない
      switch(bossBattlePhase) {
        case "none" :
          me.y = -64; // 画面外に移動
          break;
        case "entrance" :
          if (!isOnLand(me)) {
            me.dy += (me.dy > 0) ? 0.25 : 0.125;
          }
          else {
            bossBattlePhase = "fight";
          }
          me.changeAnime("laugh");
          moveAndCheckCollisionWithMap(me);
          break; 
        case "fight" :
          me.isNoHit = false;
          if (me.param.length === 0) {
            me.param.push(200); // 地面での待機時間
            me.param.push(1); // 滞空時1，着地した瞬間に0に変更
          }
          if (!isOnLand(me)) {
            me.param[0] = me.hp * 2 + 40
            me.param[1] = 1;
            me.dy += (me.dy > 0) ? 0.25 : 0.125;
          }
          else {
            //me.direction = (me.x < plc.x) ? "right" : "left";
            if (me.param[1] === 1) { // 着地
              me.param[1] = 0;
              quakeTimeY = 15;
              createEnemy("P", randInt(cameraX + 32, cameraX + charaLay.width - 48), -16);
            }
            if (me.param[0]-- < 0) { // ジャンプ
              me.dx = randInt(2, 6) * 0.25 * (me.direction === "left") ? -1 : 1;
              me.dy = -6;
            }
            else { // 待機
              me.dx = 0;
              me.dy = 0;
            }
          }
          if (isTouchingLeftWall(me) && me.direction === "left") {
            me.direction = "right";
            me.dx = -me.dx;
          }
          if (isTouchingRightWall(me) && me.direction === "right") {
            me.direction = "left";
            me.dx = -me.dx;
          }
          me.changeAnime("laugh");
          moveAndCheckCollisionWithMap(me);
          // HPバーの描画
          useriCtx.fillStyle = "#2a2349";
          useriCtx.fillRect(0, 222, 320, 16);
          useriCtx.fillStyle = "#c16c5b";
          useriCtx.fillRect(0, 224, Math.ceil(320 * (me.hp / 80)), 12);
          if (me.hp <= 0) { // ぐえ〜〜
            bossBattlePhase = "defeated";
            me.param[0] = 0;
            enemyArray.forEach((e) => {
              e.hp = 0;
            });
          }
          break;
        case "defeated" :
          me.reaction = me.param[0];
          me.param[0]++;
          if (me.param[0] % 8 === 1) {
            createEffect("explode", randInt(me.lTopX() - 32, (me.lTopX() + me.rBottomX()) / 2 - 16), randInt(me.lTopY() - 32, me.rBottomY()), 0, 0);
            createEffect("explode", randInt((me.lTopX() + me.rBottomX()) / 2 - 16, me.rBottomX()), randInt(me.lTopY() - 32, me.rBottomY()), 0, 0);
          }
          me.changeAnime("yarare");
          if (me.param[0] > 200) {
            quakeTimeY = 20;
            bossBattlePhase = "end";
          }
          break;
        default:
          break;
      }
    }
  }
};

const enemyKeyList = Object.keys(enemyData);

let createEnemy = (enemyId, x, y) => {
  let newEnemy = new CharacterSprite(
    enemyId, // id
    x, // start position x
    y, // start position y
    enemyData[enemyId].w, // width
    enemyData[enemyId].h, // height
    enemyData[enemyId].box[0], // hit box 
    enemyData[enemyId].box[1],
    enemyData[enemyId].box[2],
    enemyData[enemyId].box[3],
    enemyData[enemyId].hp, // hp
    enemyData[enemyId].img, // sprite sheet
    animeData[enemyData[enemyId].anime]
  );
  enemyArray.push(newEnemy);
};

  // ============ //
 //  item data   //
// ============ //
let itemData = {
  "1": { // medal 1
    "w": 32,
    "h": 32,
    "box" : [6, 6, 25, 25],
    "img": imgMedal,
    "anime": "medal",
    "move": (me) => {
      if (collectedMedal[0]) me.hp = 0;
      if (mapAnimeCount % 5 === 1) createEffect("red_glitter", randInt(me.x, me.x + 24), randInt(me.y, me.y + 24), 0, 0);
    },
    "obtained": (me) => {
      collectedMedal[0] = true;
      for (let i = 0; i < 8; i++) {
        createEffect("red_glitter_slow", me.x + 12, me.y + 12, Math.cos(2*Math.PI*i/8) * 2, Math.sin(2*Math.PI*i/8) * 2);
      }
    }
  },
  "2": { // medal 2
    "w": 32,
    "h": 32,
    "box" : [6, 6, 25, 25],
    "img": imgMedal,
    "anime": "medal",
    "move": (me) => {
      if (collectedMedal[1]) me.hp = 0;
      if (mapAnimeCount % 5 === 1) createEffect("red_glitter", randInt(me.x, me.x + 24), randInt(me.y, me.y + 24), 0, 0);
    },
    "obtained": (me) => {
      collectedMedal[1] = true;
      for (let i = 0; i < 8; i++) {
        createEffect("red_glitter_slow", me.x + 12, me.y + 12, Math.cos(2*Math.PI*i/8) * 2, Math.sin(2*Math.PI*i/8) * 2);
      }
    }
  },
  "3": { // medal 3 (boss)
    "w": 32,
    "h": 32,
    "box" : [6, 6, 25, 25],
    "img": imgMedal,
    "anime": "medal",
    "move": (me) => {
      if (me.param.length === 0) { // ボス戦が終わるまで画面上方で待機
        me.y = -64;
        me.dy = 0;
        me.param.push(0);
        me.isNoHit = true;
      }
      if (bossBattlePhase === "end" && me.isNoHit) {
        me.isNoHit = false;
      }
      if (!me.isNoHit) {
        if (me.dy < 4.0) me.dy += 0.125;
        if (me.y >= 72) {
          me.dy -= 0.25;
          if (me.dy < 0) me.dy = 0;
        }
        if (mapAnimeCount % 5 === 1) createEffect("red_glitter", randInt(me.x, me.x + 24), randInt(me.y, me.y + 24), 0, 0);
      }
      me.y += me.dy;
    },
    "obtained": (me) => {
      collectedMedal[2] = true;
      for (let i = 0; i < 8; i++) {
        createEffect("red_glitter_slow", me.x + 12, me.y + 12, Math.cos(2*Math.PI*i/8) * 2, Math.sin(2*Math.PI*i/8) * 2);
      }
    }
  },
};

let itemKeyList = Object.keys(itemData);

let createItem = (itemId, x, y) => {
  let newItem = new CharacterSprite(
    itemId, // id
    x, // start position x
    y, // start position y
    itemData[itemId].w, // width
    itemData[itemId].h, // height
    itemData[itemId].box[0], // hit box 
    itemData[itemId].box[1],
    itemData[itemId].box[2],
    itemData[itemId].box[3],
    1, // hp
    itemData[itemId].img, // sprite sheet
    animeData[itemData[itemId].anime]
  );
  itemArray.push(newItem);
};


  // ============== //
 //  effect data   //
// ============== //
let effectData = {
  "explode": {
    "w": 32,
    "h": 32,
    "img": imgExplode,
    "anime": "explode"
  },
  "red_glitter": {
    "w": 8,
    "h": 8,
    "img": imgRedGlitter,
    "anime": "glitter"
  },
  "red_glitter_slow": {
    "w": 8,
    "h": 8,
    "img": imgRedGlitter,
    "anime": "glitter_slow"
  }
};

let effectKeyList = Object.keys(effectData);

let createEffect = (effectId, x, y, dx, dy) => {
  let newEffect = new Sprite (
    effectId,
    x,
    y,
    effectData[effectId].w,
    effectData[effectId].h,
    effectData[effectId].img,
    animeData[effectData[effectId].anime]
  );
  newEffect.dx = dx;
  newEffect.dy = dy;
  newEffect.changeAnime("default");
  effectArray.push(newEffect);
};

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
  ////---------------//
  /// title         ///
  //---------------////
  "title": {
    "init" : async () => {
      // load coin
      let storageCoins = localStorage.getItem("coin")
      collectedCoins = storageCoins === null ? 0 : parseInt(storageCoins);
      // drawing
      backgCtx.fillStyle = "#2a2349";
      backgCtx.fillRect(0, 0, backgLay.width, backgLay.height);
      backgCtx.fillStyle = "#fff9e4";
      backgCtx.textAlign = "left";
      backgCtx.textBaseline = "top";
      let displayText = "アクションゲーム（仮）";
      let displaySize = backgCtx.measureText(displayText);
      backgCtx.fillText(displayText, Math.floor(backgLay.width - displaySize.width) / 2, 64);
      displayText = "Zキーで 始めます";
      displaySize = backgCtx.measureText(displayText);
      backgCtx.fillText(displayText, Math.floor(backgLay.width - displaySize.width) / 2, 176);
      plc.changeAnime("run_r");
      return 0;
    },
    "update" : () => {
      // draw animation
      plc.updateAnime();
      plc.drawShadow(charaCtx, Math.floor((charaLay.width - plc.w) / 2 + 2), Math.floor((charaLay.height - plc.h) / 2 + 2));
      plc.drawAnime(charaCtx, Math.floor((charaLay.width - plc.w) / 2), Math.floor((charaLay.height - plc.h) / 2));
      useriCtx.fillStyle = "#fff9e4";
      useriCtx.textBaseline = "top";
      useriCtx.textAlign = "left";
      useriCtx.fillText(Math.ceil(collectedCoins).toString().padStart(4, "0"), gridSize, 0);
      useriCtx.drawImage(imgUiCoin, 0, 0, 16, 16, 0, 0, 16, 16);
      // press z key
      if (isKeyPressedNow("z")) {
        // reset level status
        collectedMedal = [false, false, false];
        plc.hp = plcMaxHp;
        levelName = "1-1";
        levelStart = "A";
        coinCounter = collectedCoins;
        // start game
        setTransition("game");
      }
      // erase data
      if (keyInput.indexOf("x") != -1 && sceneOverLay === "none") {
        dataResetCount++;
        useriCtx.fillStyle = "#c16c5b";
        useriCtx.fillRect(0, 220, dataResetCount * 2, 8);
        useriCtx.fillStyle = "#bebbb2";
        useriCtx.fillText("X長押しでデータ消去", 0, 204); 
        if (dataResetCount > 160) {
          collectedCoins = 0;
          localStorage.setItem("coin", 0);
          setTransition("title");
        }
      }
      else {
        dataResetCount = 0;
      }
    }
  },
  ////---------------//
  /// game          ///
  //---------------////
  "game" : {
    "init" : async () => {
      // reset data
      shotArray = [];
      enemyArray = [];
      itemArray = [];
      effectArray = [];
      doorArray = [];
      // 時は動き出す……
      stopFlag = false;
      yarareAnimeCounter = 0;
      clearAnimeCounter = 0;
      // ボス戦前にリセット
      bossBattlePhase = "none";
      // get level data
      await getLevelData(levelName);
      // respawn plc
      if (plc.hp <= 0) plc.hp = plcMaxHp;
      plc.dx = 0;
      plc.dy = 0;
      plc.direction = "right";
      plc.reaction = 0;
      // create Character Objects
      for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
          // player
          if (mapData[y][x] === levelStart) {
            plc.x = x * gridSize;
            plc.y = y * gridSize;
          }
          // door
          if (mapData[y][x] === "@" || mapData[y][x] === "∆") {
            doorArray.push({ x: x * gridSize, y: y * gridSize, next: nextData.pop() });
          }
          // item
          if (itemKeyList.indexOf(mapData[y][x]) != -1) {
            createItem(mapData[y][x], x * gridSize, y * gridSize);
          }
          // enemy
          if (enemyKeyList.indexOf(mapData[y][x]) != -1) {
            createEnemy(mapData[y][x], x * gridSize, y * gridSize);
          }
        }
      }
      //console.log(plc.ltx, plc.lty, plc.rbx, plc.rby);
      // draw background
      backgCtx.fillStyle = "#2a2349"; // 藍色
      //backgCtx.fillStyle = "#4f2b24"; // 赤茶色
      //backgCtx.fillStyle = "#32535f"; // 濃い青緑
      //backgCtx.fillStyle = "#74adbb"; // 水色
      backgCtx.fillRect(0, 0, 320, 240);
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
          let newShot = new CharacterSprite("shot", plc.x, plc.y, 16, 16, 4, 4, 11, 11, 1, imgShot, animeData["shot"]);
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
              // 地形破壊
              if (getMapSubType(shotArray[i].x + 8, shotArray[i].y + 8) === "block") {
                replaceMap(Math.floor((shotArray[i].x + 8) / gridSize), Math.floor((shotArray[i].y + 8) / gridSize), '.');
              }
              else if (getMapSubType(shotArray[i].x + 8, shotArray[i].y + 8) === "block_coin") {
                replaceMap(Math.floor((shotArray[i].x + 8) / gridSize), Math.floor((shotArray[i].y + 8) / gridSize), '¥');
              }
              else if (getMapSubType(shotArray[i].x + 8, shotArray[i].y + 8) === "block_heart") {
                replaceMap(Math.floor((shotArray[i].x + 8) / gridSize), Math.floor((shotArray[i].y + 8) / gridSize), '?');
              }
              else if (getMapSubType(shotArray[i].x + 8, shotArray[i].y + 8) === "block_door") {
                replaceMap(Math.floor((shotArray[i].x + 8) / gridSize), Math.floor((shotArray[i].y + 8) / gridSize), '∑');
              }
            }
            shotArray[i].dx += Math.sign(shotArray[i].dx) * 0.0625;
          }
        }
        // erase shot
        shotArray = shotArray.filter((e) => {
          return e.param[0] <= 6 || e.anitype != "vanish";
        });
        // get item (MapChip)
        if (getMapSubType(plc.x + gridSize / 2, plc.y + gridSize / 2) === "coin") {
          collectedCoins++;
          replaceMap(Math.floor((plc.x + 8) / gridSize), Math.floor((plc.y + 8) / gridSize), '.');
        }
        if (getMapSubType(plc.x + gridSize / 2, plc.y + gridSize / 2) === "heart") {
          if (plc.hp < plcMaxHp) plc.hp += 1;
          replaceMap(Math.floor((plc.x + 8) / gridSize), Math.floor((plc.y + 8) / gridSize), '.');
        }
        // get item (Object)
        itemArray.forEach((e) => {
          if (!e.isHit(plc)) return;
          e.hp = 0; // 取得フラグはhpで代用
          itemData[e.id].obtained(e);
        });
        // obtain 3rd medal and on land -> clear
        if (collectedMedal[2]) {
          if (clearAnimeCounter++ > 100 && isOnLand(plc)) {
            clearAnimeCounter = 0;
            stopFlag = true;
          }
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
            plc.hp -= 1;
            plc.dx = - plc.dx;
            plc.dy = plc.dy >= 0 ? -1.5 : 0;
            if (plc.hp <= 0) { // ぐえ〜〜
              yarareAnimeCounter = 0;
              stopFlag = true;
              plc.dx = 0;
              plc.dy = 0;
            }
          };
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
          if (e.hp <= 0 && enemyData[e.id].type != "boss") { // やられた時 (ボスを除く)
            createEffect("explode", e.lTopX() + ((e.rbx - e.ltx) - 32) / 2, e.lTopY() + ((e.rby - e.lty)- 32) / 2, 0, 0);
          }
        });
        // item move
        itemArray.forEach((e) => {
          itemData[e.id].move(e);
        });
        // effect move
        effectArray.forEach((e) => {
          e.x += e.dx;
          e.y += e.dy;
        });

        // erase enemy
        enemyArray = enemyArray.filter((e) => {
          return (e.hp > 0 || (enemyData[e.id].type === "boss" && bossBattlePhase != "end"));
        });
        // erase item
        itemArray = itemArray.filter((e) => {
          return e.hp > 0;
        });
        // erase effect
        effectArray = effectArray.filter((e) => {
          return e.isEndAnime() === false;
        });
      } // stop flag が立ってない時の処理 ここまで！
      
      else if (plc.hp <= 0) { // ミス！
        if (plc.reaction > 0) plc.reaction--;
        if (++yarareAnimeCounter < 20) {
          plc.dx = 0;
          plc.dy = 0;
        }
        else {
          if (yarareAnimeCounter === 20) plc.dy = -4;
          plc.dx = 0;
          plc.dy += 0.125;
        }
        plc.x += plc.dx;
        plc.y += plc.dy;
        if (yarareAnimeCounter === 180) {
          setTransition("game");
        }
      }

      else if (collectedMedal[2]) {
        plc.reaction = 0;
        if (++clearAnimeCounter === 180) {
          localStorage.setItem("coin", collectedCoins.toString());
          setTransition("title");
        }
      }

      // ******************
      // ---- drawing -----
      // ******************
      
      if (!stopFlag) {
        // update enemy and shot anime
        enemyArray.forEach((e) => {
          e.updateAnime();
        });
        shotArray.forEach((e) => {
          e.updateAnime();
        });
        itemArray.forEach((e) => {
          e.updateAnime();
        });
        effectArray.forEach((e) => {
          e.updateAnime();
        })
        // update camera position
        cameraX = Math.floor(plc.x - charaLay.width / 2 + 8);
        cameraY = Math.floor(plc.y - charaLay.height / 2 + 8);
        if (bossBattlePhase != "none") {
          cameraX = mapWidth * gridSize - charaLay.width;
        }
        if (cameraX < 0) cameraX = 0;
        if (cameraY < 0) cameraY = 0;
        if (cameraX > mapWidth * gridSize - charaLay.width) {
          cameraX = mapWidth * gridSize - charaLay.width;
          // ボスバトル部屋でカメラが右端に到達したら開戦
          if (levelSpecial === "boss" && bossBattlePhase === "none") {
            bossBattlePhase = "entrance";
            for (let y = 0; y < mapData.length; y++) {
              for (let x = 0; x < mapData[y].length; x++) {
                if (mapData[y][x] === ";") {
                  createEffect("explode", x * gridSize - 8, y * gridSize - 8, 0, 0);
                  replaceMap(x, y, "+");
                }
              }
            }
          }
        }
        if (cameraY > mapHeight * gridSize - charaLay.height) {
          cameraY = mapHeight * gridSize - charaLay.height;
        }
        if (quakeTimeX-- > 0) {
          cameraX -= (((quakeTimeX + 1) / 2 * 2) % 4 - 1) * 2;
        }
        if (quakeTimeY-- > 0) {
          cameraY -= ((quakeTimeY / 2 * 2) % 4 - 1) * 2;
        }
      }
      
      // change player animation
      if (!stopFlag){
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
      }
      else {
        if (plc.hp <= 0) {
          plc.changeAnime("yarare");
        }
        else if (collectedMedal[2]) {
          plc.changeAnime(clearAnimeCounter < 40 ? "spin" : "fever");
        }
        else {
          plc.changeAnime(plc.direction === "left" ? "back_l" : "back_r");
        }
      }
      // update player anime
      plc.updateAnime();
      
      // draw character shadow
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
      itemArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawShadow(charaCtx, Math.floor(e.x - cameraX + 1), Math.floor(e.y - cameraY + 1));
      }));
      effectArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawShadow(charaCtx, Math.floor(e.x - cameraX + 1), Math.floor(e.y - cameraY + 1));
      }));
      if (Math.floor(plc.reaction / 3) * 3 % 6 === 0 || plc.hp <= 0) plc.drawShadow(charaCtx, Math.floor(plc.x - cameraX + 1), Math.floor(plc.y - cameraY) + 1);

      // draw map shadow & map
      if (!stopFlag) mapAnimeCount++;
      let startDrawingMapX = Math.floor(cameraX / gridSize);
      let startDrawingMapY = Math.floor(cameraY / gridSize);
      for (let y = startDrawingMapY - 1; y < startDrawingMapY + mapHeight + 1; y++) {
        if (y < 0 || y >= mapData.length) continue;
        for (let x = startDrawingMapX - 1; x < startDrawingMapX + mapWidth + 1; x++) {
          if (x < 0 || x >= mapData[y].length) continue;
          if (mapChipList.indexOf(mapData[y][x]) === -1) continue;
          let mapAnimeFrame = mapChip[mapData[y][x]].id[Math.floor(mapAnimeCount / 8) % mapChip[mapData[y][x]].id.length]
          if (mapAnimeFrame === 0) continue;
          if (mapChip[mapData[y][x]].type != "background") {
            charaCtx.drawImage(imgMapChip[1], mapAnimeFrame * gridSize, 0, gridSize, gridSize, x * gridSize - cameraX + 2, y * gridSize - cameraY + 2, gridSize, gridSize);
            if (y === 0 && getMapType(x * gridSize, y) === "wall") { // copy wall shadow if top of map is wall
              charaCtx.drawImage(imgMapChip[1], mapAnimeFrame * gridSize, 0, gridSize, gridSize, x * gridSize - cameraX + 2, (y - 1) * gridSize - cameraY + 2, gridSize, gridSize);
            }
          }
          charaCtx.drawImage(imgMapChip[0], mapAnimeFrame * gridSize, 0, gridSize, gridSize, x * gridSize - cameraX, y * gridSize - cameraY, gridSize, gridSize);
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
      itemArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawAnime(charaCtx, Math.floor(e.x - cameraX), Math.floor(e.y - cameraY));
      }));
      effectArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawAnime(charaCtx, Math.floor(e.x - cameraX), Math.floor(e.y - cameraY));
      }));
      if (Math.floor(plc.reaction / 3) * 3 % 6 === 0 || plc.hp <= 0) plc.drawAnime(charaCtx, Math.floor(plc.x - cameraX), Math.floor(plc.y - cameraY));

      // draw UI
      // hearts
      let shakeHeartX = (plc.reaction < invincibleTimeMax - 20 ? 0 : ((plc.reaction / 4) * 4 % 8 - 2) / 2);
      let shakeHeartY = (plc.reaction < invincibleTimeMax - 20 ? 0 : (((plc.reaction + 2) / 4) * 4 % 8 - 2) / 2);
      for (let i = 0; i < plcMaxHp; i++) {
        useriCtx.drawImage(imgUiHeart, (plc.hp > i) ? 0 : 16, 0, 16, 16, i * gridSize + shakeHeartX, shakeHeartY, 16, 16);
      }
      // medals
      for (let i = 0; i < 3; i++) {
        useriCtx.drawImage(imgUiMedal, (collectedMedal[i]) ? 0 : 16, 0, 16, 16, i * gridSize + useriLay.width - 3 * gridSize, 0, 16, 16);
      }
      // coins
      let hopCoinY = 0;
      useriCtx.fillStyle = "#fff9e4";
      if (coinCounter < collectedCoins) {
        coinCounter += 0.25;
        useriCtx.fillStyle = "#fbdf9b";
        hopCoinY = 1;
      }
      useriCtx.textBaseline = "top";
      useriCtx.textAlign = "left";
      useriCtx.fillText(Math.ceil(coinCounter).toString().padStart(4, "0"), gridSize, gridSize - hopCoinY - 2);
      useriCtx.drawImage(imgUiCoin, 0, 0, 16, 16, 0, gridSize - hopCoinY - 2, 16, 16);
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
      transCtx.fillStyle = "#0d080d"; // black
      transCtx.beginPath();
      transCtx.moveTo(0, 0);
      for (let i = 0; i <= nokogiri; i++) {
        transCtx.lineTo(transLay.width * ((transAnimeCountInit - transAnimeCount) / transAnimeCountInit) + 16 * (i % 2), i * (transLay.height / nokogiri));
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
      transCtx.fillStyle = "#0d080d"; // black
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
      transCtx.fillStyle = "#0d080d"; // black
      transCtx.beginPath();
      transCtx.moveTo(transLay.width, 0);
      for (let i = 0; i <= nokogiri; i++) {
        transCtx.lineTo(transLay.width * ((transAnimeCountInit - transAnimeCount) / transAnimeCountInit) - 16 * (i % 2), i * (transLay.height / nokogiri));
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
  scene = "title";
  sceneOverLay = "none";
  initFlag = true;
  overLayInitFlag = true;
  nowLoading = true;
  // create shadow sprite
  Object.keys(shadowList).forEach((key) => {
    shadowList[key][1].src = createShadowURL(shadowList[key][0]);
  });
  // create Player Character
  plc = new CharacterSprite("player", 0, 0, 16, 16, 3, 2, 12, 15, plcMaxHp, imgPlayer, animeData["player"]);
  // start game loop
  setInterval(gameLoop, 1000/60); // 60fps
};

// load font
font.load().then((loadedFace) => {
  console.log("フォントを読み込みました！");
  document.fonts.add(loadedFace);
  document.body.style.fontFamily = '"MaruMonica"';
  backgCtx.font = "16px MaruMonica";
  charaCtx.font = "16px MaruMonica";
  useriCtx.font = "16px MaruMonica";
  transCtx.font = "16px MaruMonica";
}).catch((e) => {
  console.error("フォントを読み込めません！");
  backgCtx.font = "12px MS ゴシック";
  charaCtx.font = "12px MS ゴシック";
  useriCtx.font = "12px MS ゴシック";
  transCtx.font = "12px MS ゴシック";
});





