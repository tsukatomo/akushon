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

let imageSmoothing = (ctx, isEnabled) => {
  ctx.imageSmoothingEnabled = isEnabled;
  ctx.mozImageSmoothingEnabled = isEnabled;
  ctx.webkitImageSmoothingEnabled = isEnabled;
  ctx.msImageSmoothingEnabled = isEnabled;
}

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
let imgFlyingCamera = [new Image(), new Image()];
imgFlyingCamera[0].src = "./img/flying_camera.png";
let imgSlime = [new Image(), new Image()];
imgSlime[0].src = "./img/slime.png";
let imgSlimeLauncher = [new Image(), new Image()];
imgSlimeLauncher[0].src = "./img/slimelauncher.png";
let imgElectroJar = [new Image(), new Image()];
imgElectroJar[0].src = "./img/electrojar.png";
let imgTulip = [new Image(), new Image()];
imgTulip[0].src = "./img/tulip.png";
let imgBomb = [new Image(), new Image()];
imgBomb[0].src = "./img/the_bomb2.png";
let imgMinionSlime = [new Image(), new Image()];
imgMinionSlime[0].src = "./img/minionslime.png";
let imgDanmakuYellow = [new Image(), new Image()];
imgDanmakuYellow[0].src = "./img/danmaku_yellow.png";
let imgDanmakuWhite = [new Image(), new Image()];
imgDanmakuWhite[0].src = "./img/danmaku_white.png";
let imgDanmakuRed = [new Image(), new Image()];
imgDanmakuRed[0].src = "./img/danmaku_red.png";
let imgWatageSatelite = [new Image(), new Image()];
imgWatageSatelite[0].src = "./img/bigwatage_satelite.png";

// enemy (Boss)
let imgBigPumpkin = [new Image(), new Image()];
imgBigPumpkin[0].src = "./img/bigpumpkin.png";
let imgRenchin = [new Image(), new Image()];
imgRenchin[0].src = "./img/renchin.png";
let imgBigWatage = [new Image(), new Image()];
imgBigWatage[0].src = "./img/bigwatage.png";

// item
let imgKey = [new Image(), new Image()];
imgKey[0].src = "./img/key.png";
let imgMedal = [new Image(), new Image()];
imgMedal[0].src = "./img/medal.png";

// gimmick
let imgMoveFloor = [new Image(), new Image()];
imgMoveFloor[0].src = "./img/movefloor.png";
let imgCloudLift = [new Image(), new Image()];
imgCloudLift[0].src = "./img/cloudlift.png";
let imgCloudLiftSmall = [new Image(), new Image()];
imgCloudLiftSmall[0].src = "./img/cloudlift_small.png";
let imgMagma = [new Image(), new Image()];
imgMagma[0].src = "./img/kappazushi.png";

// shot
let imgShot = [new Image(), new Image()];
imgShot[0].src = "./img/shot.png";

// mapchip
let imgMapChip = [new Image(), new Image()];
imgMapChip[0].src = "./img/mapchip.png";

// effect
let imgMiniExplode = [new Image(), new Image()];
imgMiniExplode[0].src = "./img/miniexplode.png";
let imgExplode = [new Image(), new Image()];
imgExplode[0].src = "./img/explode.png";
let imgStar = [new Image(), new Image()];
imgStar[0].src = "./img/star.png";
let imgRedGlitter = [new Image(), new Image()];
imgRedGlitter[0].src = "./img/red_glitter.png";
let imgYellowGlitter = [new Image(), new Image()];
imgYellowGlitter[0].src = "./img/yellow_glitter.png";
let imgMiniBlock = [new Image(), new Image()];
imgMiniBlock[0].src = "./img/miniblock.png";
let imgBombEffect = [new Image(), new Image()];
imgBombEffect[0].src = "./img/bomb_effect.png";

// UI
let imgUiHeart = new Image();
imgUiHeart.src = "./img/heart.png";
let imgUiMedal = new Image();
imgUiMedal.src = "./img/ui_medal.png";
let imgUiCoin = new Image();
imgUiCoin.src = "./img/ui_coin.png";
let imgUiKey = new Image();
imgUiKey.src = "./img/ui_key.png";

// stage select
let imgThumbnail = new Image();
imgThumbnail.src = "./img/thumbnail_1.png";
let imgSSMedal = new Image();
imgSSMedal.src = "./img/ssmedal.png";
let imgSSCursorL = [new Image(), new Image()];
imgSSCursorL[0].src = "./img/sscursor_l.png";
let imgSSCursorR = [new Image(), new Image()];
imgSSCursorR[0].src = "./img/sscursor_r.png";
let imgWip = new Image();
imgWip.src = "./img/work_in_progress.png";
let imgOption = new Image();
imgOption.src = "./img/option.png";

// shop & tool list
let imgMerchan = [new Image(), new Image()];
imgMerchan[0].src = "./img/merchan.png";
let imgTool = [new Image(), new Image()];
imgTool[0].src = "./img/tool.png";
let imgToolCursor = [new Image(), new Image()];
imgToolCursor[0].src = "./img/cursor.png";
let imgShopBg = new Image();
imgShopBg.src = "./img/shop_bg.png";
let imgCheckMark = new Image();
imgCheckMark.src = "./img/checkmark.png";

// list of shadowing objects
let shadowList = [
  imgMapChip,
  imgPlayer,
  imgPumpkin,
  imgWatage,
  imgFlyingCamera,
  imgSlime,
  imgSlimeLauncher,
  imgElectroJar,
  imgTulip,
  imgBomb,
  imgMinionSlime,
  imgDanmakuYellow,
  imgDanmakuWhite,
  imgDanmakuRed,
  imgWatageSatelite,
  imgBigPumpkin,
  imgRenchin,
  imgBigWatage,
  imgKey,
  imgMedal,
  imgMoveFloor,
  imgCloudLift,
  imgCloudLiftSmall,
  imgMagma,
  imgShot,
  imgMiniExplode,
  imgExplode,
  imgStar,
  imgRedGlitter,
  imgYellowGlitter,
  imgBombEffect,
  imgMiniBlock,
  imgSSCursorL,
  imgSSCursorR,
  imgMerchan,
  imgTool,
  imgToolCursor
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
  workCtx.putImageData(sImageData, 0, 0);
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
    "back_l": {frames: 1, dulation: 8, img: [6], repeat: false },
    "back_r": {frames: 1, dulation: 8, img: [7], repeat: false },
    "yarare": {frames: 1, dulation: 8, img: [8], repeat: false },
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
    "float3": { frames: 3, dulation: 6, img: [8, 9, 10], repeat: true },
    "damaged1" : { frames: 1, dulation: 2, img: [3], repeat: true },
    "damaged2" : { frames: 1, dulation: 2, img: [7], repeat: true },
    "damaged3" : { frames: 1, dulation: 2, img: [11], repeat: true },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "flying_camera": {
    "float_l": { frames: 4, dulation: 4, img: [4, 5, 6, 7], repeat: false },
    "float_r": { frames: 4, dulation: 4, img: [12, 13, 14, 15], repeat: false },
    "glow_l" : { frames: 4, dulation: 4, img: [0, 1, 2, 3], repeat: false },
    "glow_r" : { frames: 4, dulation: 4, img: [8, 9, 10, 11], repeat: false },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "slime": {
    "walk_l": {frames: 4, dulation: 8, img: [0, 1, 2, 3], repeat: true },
    "walk_r": {frames: 4, dulation: 8, img: [4, 5, 6, 7], repeat: true },
    "turn_to_l" : {frames: 3, dulation: 6, img: [8, 9, 10], repeat: false },
    "turn_to_r" : {frames: 3, dulation: 6, img: [10, 9, 8], repeat: false },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "slimelauncher": {
    "munch": {frames: 4, dulation: 6, img: [0, 1, 2, 3], repeat: true },
    "vomit": {frames: 3, dulation: 8, img: [4, 5, 6], repeat: false },
    "damaged": {frames: 1, dulation: 8, img: [7], repeat: true },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "electrojar": {
    "launch": { frames: 4, dulation: 5, img: [0, 0, 1, 2], repeat: false },
    "launch_fast": { frames: 4, dulation: 2, img: [0, 0, 1, 2], repeat: false },
    "default": { frames: 1, dulation: 8, img: [2], repeat: true }
  },
  "minionslime": {
    "walk_l": {frames: 2, dulation: 6, img: [0, 1], repeat: true },
    "walk_r": {frames: 2, dulation: 6, img: [2, 3], repeat: true },
    "fall_l": {frames: 1, dulation: 8, img: [4], repeat: true },
    "fall_r": {frames: 1, dulation: 8, img: [5], repeat: true },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "tulip" :{
    "open_l" : { frames: 2, dulation: 16, img: [0, 1], repeat: false},
    "damaged_l" : { frames: 2, dulation: 4, img: [2, 1], repeat: true},
    "stop_l": { frames: 1, dulation: 8, img: [1], repeat: true },
    "open_r" : { frames: 2, dulation: 16, img: [3, 4], repeat: false},
    "damaged_r" : { frames: 2, dulation: 4, img: [5, 4], repeat: true},
    "stop_r": { frames: 1, dulation: 8, img: [4], repeat: true },
    "open_d" : { frames: 2, dulation: 16, img: [6, 7], repeat: false},
    "damaged_d" : { frames: 2, dulation: 4, img: [8, 7], repeat: true},
    "stop_d": { frames: 1, dulation: 8, img: [7], repeat: true },
    "default" : { frames: 1, dulation: 8, img: [0], repeat: true },
  },
  "bomb": {
    "count_4" : { frames: 2, dulation: 6, img: [0, 1], repeat: true },
    "count_3" : { frames: 2, dulation: 6, img: [2, 3], repeat: true },
    "count_2" : { frames: 2, dulation: 6, img: [4, 5], repeat: true },
    "count_1" : { frames: 2, dulation: 6, img: [6, 7], repeat: true },
    "bomb!" : { frames: 1, dulation: 8, img: [8], repeat: false },
    "default": { frames: 1, dulation: 8, img: [9], repeat: true }
  },
  "bomb_bakuhu": {
    "type_1": { frames: 8, dulation: 4, img: [0,1,2,3,4,5,6,7], repeat: false },
    "type_2": { frames: 8, dulation: 4, img: [8,9,10,11,12,13,14,15], repeat: false },
    "default": { frames: 8, dulation: 4, img: [0,1,2,3,4,5,6,7], repeat: false }
  },
  "danmakuyellow": {
    "shot": { frames: 2, dulation: 4, img: [0, 1], repeat: true },
    "vanish": { frames: 2, dulation: 4, img: [2, 3], repeat: false },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "danmakuwhite": {
    "shot": { frames: 4, dulation: 2, img: [0, 1, 2, 3], repeat: true },
    "vanish": { frames: 3, dulation: 3, img: [4, 5, 6], repeat: false },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "danmakured": {
    "shot": { frames: 4, dulation: 3, img: [0, 1, 2, 3], repeat: true },
    "vanish": { frames: 3, dulation: 3, img: [4, 5, 6], repeat: false },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "watage_satelite": {
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "bigpumpkin": {
    "laugh": { frames: 4, dulation: 8, img: [0, 1, 2, 3], repeat: true },
    "yarare": { frames: 1, dulation: 8, img: [4], repeat: true },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "renchin": {
    "stand": { frames: 2, dulation: 8, img: [0, 1], repeat: true },
    "jump": { frames: 1, dulation: 8, img: [2], repeat: true },
    "fall": { frames: 2, dulation: 8, img: [3, 4], repeat: false },
    "shake": { frames: 2, dulation: 2, img: [15, 16], repeat: true },
    "shake_red": { frames: 2, dulation: 2, img: [21, 22], repeat: true },
    "dash": { frames: 4, dulation: 3, img: [5, 6, 7, 8], repeat: true },
    "dash_red": { frames: 4, dulation: 3, img: [17, 18, 19, 20], repeat: true },
    "clash": { frames: 1, dulation: 8, img: [4], repeat: true },
    "open_1": { frames: 3, dulation: 2, img: [9, 10, 11], repeat: false },
    "open_2": { frames: 3, dulation: 2, img: [12, 13, 14], repeat: false },
    "open_2_red": { frames: 3, dulation: 2, img: [12, 23, 24], repeat: false },
    "yarare": { frames: 1, dulation: 8, img: [12], repeat: true },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true } 
  },
  "bigwatage": {
    "damage": { frames: 2, dulation: 4, img: [2, 1], repeat: false },
    "yarare": { frames: 1, dulation: 8, img: [3], repeat: true },
    "angry": { frames: 1, dulation: 8, img: [4], repeat: true },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true }
  },
  "key": {
    "default": { frames: 1, dulation: 8, img: [0], repeat: true }
  },
  "medal": {
    "collected": { frames: 5, dulation: 6, img: [5, 6, 7, 8, 9], repeat: true },
    "default": { frames: 5, dulation: 6, img: [0, 1, 2, 3, 4], repeat: true }
  },
  "movefloor": {
    "default": { frames: 4, dulation: 2, img: [0, 1, 2, 3], repeat: true }
  },
  "cloudlift": {
    "default": { frames: 1, dulation: 8, img: [0], repeat: true }
  },
  "cloudliftsmall": {
    "default": { frames: 1, dulation: 8, img: [0], repeat: true }
  },
  "magma": {
    "top": { frames: 4, dulation: 4, img: [0, 1, 2, 3], repeat: true},
    "mid": { frames: 4, dulation: 4, img: [4, 5, 6, 7], repeat: true},
    "default": { frames: 1, dulation: 8, img: [0], repeat: true }
  },
  "miniexplode": {
    "default": { frames: 5, dulation: 5, img: [0, 1, 2, 3, 4], repeat: false } 
  },
  "explode": {
    "default": { frames: 5, dulation: 5, img: [0, 1, 2, 3, 4], repeat: false } 
  },
  "glitter": {
    "default": { frames: 6, dulation: 2, img: [0, 1, 2, 2, 1, 0], repeat: false } 
  },
  "glitter_slow": {
    "default": { frames: 7, dulation: 3, img: [0, 1, 2, 3, 3, 3, 2], repeat: false } 
  },
  "star": {
    "default": { frames: 2, dulation: 64, img: [0, 0], repeat: false } 
  },
  "bomb_type1": {
    "default": { frames: 8, dulation: 4, img: [0,1,2,3,4,5,6,7], repeat: false }
  },
  "bomb_type2":  {
    "default": { frames: 8, dulation: 4, img: [8,9,10,11,12,13,14,15], repeat: false }
  },
  "miniblock": {
    "default": { frames: 2, dulation: 64, img: [0, 0], repeat: false } 
  },
  "watage_satelite_fade": {
    "default": { frames: 4, dulation: 4, img: [4, 1, 2, 3], repeat: false }
  },
  "sscursor": {
    "default": { frames: 4, dulation: 8, img: [0, 1, 2, 1], repeat: true }
  },
  "merchan": {
    "normal": { frames: 1, dulation: 8, img: [0], repeat: true },
    "bad": { frames: 1, dulation: 8, img: [1], repeat: true },
    "happy": { frames: 1, dulation: 8, img: [2], repeat: true },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true }
  },
  "tool": {
    "lifeup": { frames: 1, dulation: 8, img: [0], repeat: true },
    "shotup": { frames: 1, dulation: 8, img: [1], repeat: true },
    "bottle": { frames: 1, dulation: 8, img: [2], repeat: true },
    "default": { frames: 1, dulation: 8, img: [3], repeat: true }
  },
  "toolcursor": {
    "default": { frames: 4, dulation: 8, img: [0, 1, 2, 1], repeat: true }
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
  ".": { id: [0], dulation: 1, type: "none", subtype: "none" },
  "#": { id: [1], dulation: 1, type: "wall", subtype: "block" },
  "$": { id: [1], dulation: 1, type: "wall", subtype: "block_coin" },
  "%": { id: [2], dulation: 1, type: "wall", subtype: "none" },
  "*": { id: [3], dulation: 1, type: "wall", subtype: "none" },
  "[": { id: [4], dulation: 1, type: "bridge", subtype: "none" },
  "-": { id: [5], dulation: 1, type: "bridge", subtype: "none" },
  "]": { id: [6], dulation: 1, type: "bridge", subtype: "none" },
  "+": { id: [7], dulation: 1, type: "wall", subtype: "hard" },
  "¢": { id: [7], dulation: 1, type: "wall", subtype: "hard_coin" },
  "^": { id: [8], dulation: 1, type: "none", subtype: "damage" },
  "~": { id: [9], dulation: 1, type: "none", subtype: "damage" },
  "¥": { id: [10, 11, 12, 13], dulation: 8, type: "none", subtype: "coin" },
  "|": { id: [14], dulation: 1, type: "background", subtype: "none" },
  "@": { id: [15], dulation: 1, type: "background", subtype: "door" },
  "?": { id: [16, 16, 16, 16, 16, 17, 18, 17], dulation: 8, type: "none", subtype: "heart" },
  "!": { id: [1], dulation: 1, type: "wall", subtype: "block_heart"},
  "π": { id: [19], dulation: 1, type: "wall", subtype: "block" }, // alt + p // hidden block
  "∂": { id: [19], dulation: 1, type: "wall", subtype: "block_coin" }, // alt + d
  "†": { id: [19], dulation: 1, type: "wall", subtype: "block_heart" }, // alt + t
  "∆": { id: [19], dulation: 1, type: "wall", subtype: "block_door" }, // alt + j
  "∑": { id: [20], dulation: 1, type: "none", subtype: "door" }, // alt + w
  ";": { id: [0], dulation: 1, type: "none", subtype: "boss_gate" },
  "≥": { id: [21, 22, 23, 24], dulation: 2, type: "wall", subtype: "left_conv" },
  "≤": { id: [25, 26, 27, 28], dulation: 2, type: "wall", subtype: "right_conv" },
  "»": { id: [21, 22, 23, 24], dulation: 1, type: "wall", subtype: "left_conv_fast" }, // alt + shift + ]
  "«": { id: [25, 26, 27, 28], dulation: 1, type: "wall", subtype: "right_conv_fast" }, // alt + ]
  "/": { id: [29], dulation: 1, type: "wall", subtype: "none" },
  "&": { id: [30], dulation: 1, type: "wall", subtype: "none" },
  "ƒ": { id: [31, 32, 31, 33], dulation: 4, type: "wall", subtype: "reverse_switch"}, // alt + f
  "º": { id: [34], dulation: 1, type: "wall", subtype: "lock"}, // alt + 0
  "ø": { id: [35], dulation: 1, type: "wall", subtype: "block" }, // alt + o // red block
  "£": { id: [35], dulation: 1, type: "wall", subtype: "block_coin" }, // alt + 3
  "¿": { id: [35], dulation: 1, type: "wall", subtype: "block_heart" }, // alt + shift + /
  "¬": { id: [36], dulation: 1, type: "wall", subtype: "none" }, // alt + l
  "¡": { id: [37], dulation: 1, type: "wall", subtype: "ice" }, // alt + 1
  "◊": { id: [38, 39], dulation: 8, type: "wall", subtype: "bomb" }, // alt + shift + v
  "=": { id: [40], dulation: 1, type: "bridge", subtype: "ice" },
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

// save data
const saveDataNameList = ["Akushon1", "Akushon2", "Akushon3"];
let currentSaveData = "Akushon1";
let saveDataObject = {
  "coins": 0,
  "progress": 0,
  "medal": {},
  "tool": {}
};

let readSaveData = async (saveDataName) => {
  let saveDataJson = localStorage.getItem(saveDataName);
  if (saveDataJson === null) {
    console.log("データが存在しません！");
    await createNewSaveData(saveDataName);
    saveDataJson = localStorage.getItem(saveDataName);
  }
  saveDataObject = JSON.parse(saveDataJson);
};

let modifySaveData = () => {
  if (!saveDataObject.hasOwnProperty("coins")) saveDataObject["coins"] = 0;
  if (!saveDataObject.hasOwnProperty("progress")) saveDataObject["progress"] = 0;
  if (!saveDataObject.hasOwnProperty("medal")) saveDataObject["medal"] = {};
  if (!saveDataObject.hasOwnProperty("tool")) saveDataObject["tool"] = {};
};

let writeSaveData = async (saveDataName) => {
  modifySaveData();
  localStorage.setItem(saveDataName, JSON.stringify(saveDataObject));
};

let createNewSaveData = async (saveDataName) => {
  saveDataObject = {
    "coins": 0,
    "progress": 0,
    "medal": {},
    "tool": {}
  };
  await writeSaveData(saveDataName, saveDataObject);
};

let isMedalcollected = (stageId, medalId) => {
  if (!saveDataObject["medal"].hasOwnProperty(stageId)) return false;
  return  saveDataObject["medal"][stageId][medalId];
}

// stage select
let stageId = 0;
let ssCursorL, ssCursorR;
let stageData = [
  {
    name: "カボチャ平原",
    level: "1-1",
  },
  {
    name: "あおみどり研究所",
    level: "2-1",
  },
  {
    name: "こなゆき山",
    level: "3-1",
  }
];

// jump to level (debug)
let goToLevel = (lName) => {
  collectedMedal = [false, false, false];
  collectedKey = [false, false, false];
  collectedKeyNum = 0;
  changedMapList.length = 0;
  plc.hp = plcMaxHp;
  levelName = lName;
  levelStart = "A";
  coinCounter = collectedCoins;
  setTransition("game");
}

// scene
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

  // === animation ===
  startAnime (anitype) {
    this.anitype = anitype;
    this.anicount = 0;
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
    if (this.anime === null) return false;
    return (!this.anime[this.anitype].repeat && this.anicount > this.anime[this.anitype].dulation * this.anime[this.anitype].frames)
  };

  frameNumber () {
    if (this.anime === null) return false;
    let frameCount = Math.floor(this.anicount / this.anime[this.anitype].dulation);
    if (this.anime[this.anitype].repeat) {
      return frameCount % this.anime[this.anitype].frames;
    }
    return frameCount < this.anime[this.anitype].frames ? frameCount : this.anime[this.anitype].frames - 1;
  };

  drawAnime (ctx, drawX, drawY) {
    if (this.img === null) return;
    ctx.drawImage(this.img[0], this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, drawX, drawY, this.w, this.h);
  };

  drawShadow (ctx, drawX, drawY) {
    if (this.img === null) return;
    ctx.drawImage(this.img[1], this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, drawX, drawY, this.w, this.h);
  };

  // === parameter ===
  setParam (idx, value) {
    while (this.param.length <= idx) {
      this.param.push(0);
    }
    this.param[idx] = value;
  };

  getParam (idx) {
    if (this.param.length <= idx) return null;
    return this.param[idx];
  };

  isParamEmpty () {
    return this.param.length === 0;
  };

  incParam (idx) {
    if (this.param.length <= idx) return null;
    this.setParam(idx, this.getParam(idx) + 1);
    return this.param[idx];
  };

  decParam (idx) {
    if (this.param.length <= idx) return null;
    this.setParam(idx, this.getParam(idx) - 1);
    return this.param[idx];
  };

};

// character class
class CharacterSprite extends Sprite{
  constructor(id, type, x, y, w, h, ltx, lty, rbx, rby, hltx, hlty, hrbx, hrby, hp, img, anime) {
    super(id, x, y, w, h, img, anime);
    // type
    this.type = type;
    // ltx, lty = left top of hitbox (for mapchip and gimmick)
    this.ltx = ltx;
    this.lty = lty;
    // rbx, rby = right bottom of hitbox (for mapchip and gimmick)
    this.rbx = rbx;
    this.rby = rby;
    // hltx, hlty = left top of hitbox (for other objects)
    this.hltx = hltx;
    this.hlty = hlty;
    // hrbx, hrby = right bottom of hitbox (for other objects)
    this.hrbx = hrbx;
    this.hrby = hrby;
    // hit point
    this.hp = hp;
    // initial parameter
    this.initParam = 0;
    // reaction effect counter
    this.reaction = 0;
    // trueのとき、他キャラクターとの衝突判定を行わない
    this.isNoHit = false;
    // trueのとき、プレイヤーとの衝突判定を行わない
    this.isNoHitWithPlc = false;
    // trueのとき、プレイヤーの弾との衝突判定を行わない
    this.isNoHitWithShot = false;
    // trueのとき、無敵
    this.isInvincible = false;
    // 地形から受ける移動量（慣性が乗る）
    this.px = 0;
    this.py = 0;
    // 乗っている物体
    this.riding = null;
    this.rx = 0;
    this.ry = 0;
  };

  lTopX () { return this.x + this.ltx; };
  lTopY () { return this.y + this.lty; };
  rBottomX () { return this.x + this.rbx; };
  rBottomY () { return this.y + this.rby; };

  hLTopX () { return this.x + this.hltx; };
  hLTopY () { return this.y + this.hlty; };
  hRBottomX () { return this.x + this.hrbx; };
  hRBottomY () { return this.y + this.hrby; };

  // タイプ判定
  isType (typename) {
    return this.type === typename;
  }

  // 衝突判定
  isHit (opponent) {
    if (this.isNoHit || opponent.isNoHit) return false;
    return (
      opponent.hLTopX() <= this.hRBottomX() && this.hLTopX() <= opponent.hRBottomX()
      && opponent.hLTopY() <= this.hRBottomY() && this.hLTopY() <= opponent.hRBottomY()
    );
  };

  // 物体に乗っているかチェックし、乗っていたら riding 情報を記録する
  checkRiding (vehicle) {
    if (this.dy < 0) return;
    if (this.rBottomY() + 1 < vehicle.lTopY() || vehicle.rBottomY() < this.rBottomY() + 1) return;
    if (this.rBottomX() < vehicle.lTopX() || vehicle.rBottomX() < this.lTopX()) return;
    this.riding = vehicle;
  };

  // 乗り物に追従する
  rideOn () {
    if (this.riding === null) return;
    this.y = this.riding.y - this.rby - 1;
    this.rx = this.riding.dx;
    this.ry = this.riding.dy;
    this.px = 0;
    this.py = 0;
  };
};

let plc;
let plcMaxHp = 4;
let enemyArray = [];
let shotArray = [];
let itemArray = [];
let gimmickArray = [];
let effectArray = [];
let effectSubArray = []; // stopFlag が true の時に動くエフェクト
let doorArray = []; // ドア情報を格納
const shotMax = 5;
let shotPower = 2;
let coyoteTime = 0; // ku-chu-de jump dekiru yu-yo frame su
let isJumping = false;
const invincibleTimeMax = 120; // muteki jikan san!?
let stopFlag = false;
let bossBattlePhase = "none";
let yarareAnimeCounter = 0;
let clearAnimeCounter = 0;
let collectedMedal = [false, false, false];
let collectedKey = [false, false, false];
let collectedKeyNum = 0;
let changedMapList = [];
let collectedCoins = 0;
let coinCounter = 0;
let dataResetCount = 0;
let snowEffect = [];
let magmaTopY = 9999;
let magmaSpeed = 0.125;
let bossMaxHp = 0;
let bossHpBarWhite = 0;
let bossHpBarWhiteReduceto = 0;
let bossHpBarWhiteReduceFlag = false;
let bossHpBarRed = 0;
let bossHpBarRedPrev = 0;
let bossHpBarReduceCounter = 100;
let timeCounter = 0;
let isResumedNow = false;
let backToSelectCount = 0;
let isGensui = false;

// get map type from pixel coordinate (output: type of mapchip Object)
// 注意：一方通行床はy座標がグリッド上部の時しか検出しません
let getMapType = (x, y) => {
  let mapX = Math.floor(x / gridSize);
  let mapY = Math.floor(y / gridSize);
  if (mapX < 0 || mapWidth <= mapX) return "wall"; // マップ左右端は壁
  if (mapY < 0) mapY = 0; // マップより上は最上部のマップチップを参照
  if (mapHeight <= mapY) mapY = mapHeight - 1; // マップより下は最下部のマップチップを参照
  if (mapChipList.indexOf(mapData[mapY][mapX]) === -1) return "none"; // 定義されてないマップチップは全部虚無
  if (mapChip[mapData[mapY][mapX]].type === "bridge") { // 一方通行床は上4ドットのみ衝突判定
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
  if (mapHeight <= mapY) mapY = mapHeight - 1;
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
  if (character.dy + character.py + character.ry >= 0) {
    for (let x = 0; x < character.rBottomX() - character.lTopX(); x += gridSize) {
      isTouching |= getMapType(character.lTopX() + x, character.rBottomY() + 0.0625) === "bridge";
    }
    isTouching |= getMapType(character.rBottomX(), character.rBottomY() + 0.0625) === "bridge";
  }
  return isTouching || (character.riding != null);
};

// マップチップから受ける移動効果
let movesAffectedByMap = (character) => {
  let footData = [];// 足元のマップチップ情報を格納する配列
  for (let x = 0; x < character.rBottomX() - character.lTopX(); x += gridSize) {
    footData.push(getMapSubType(character.lTopX() + x, character.rBottomY() + 0.0625));
  }
  footData.push(getMapSubType(character.rBottomX(), character.rBottomY() + 0.0625));
  // belt conv
  if (footData.indexOf("left_conv") != -1) {
    character.px = 0.5;
  }
  else if (footData.indexOf("right_conv") != -1) {
    character.px = -0.5;
  }
  else if (footData.indexOf("left_conv_fast") != -1) {
    character.px = 1;
  }
  else if (footData.indexOf("right_conv_fast") != -1) {
    character.px = -1;
  }
  else {
    character.px = 0;
    character.py = 0;
  }
};

// 地形と重力の影響を受ける物体の速度(dx, dy, px, py, rx, ry)を更新
let updateVelocity = (character) => {
  if (!isOnLand(character)) {
    character.dy += 0.125;
    character.rx = 0;
    character.ry = 0;
  }
  else {
    character.dy = 0;
    character.px = 0;
    character.py = 0;
    character.rideOn();
    movesAffectedByMap(character);
  }
  if (character.dy > 4) character.dy = 4;
};

// キャラクターを移動させ、地形とぶつかったら押し戻す関数
let moveAndCheckCollisionWithMap = (character) => {
  // collision flag
  let isTouching = false;
  const loopMax = 256; // 押し戻す回数の上限
  const slideLength = 0.0625; // 1回で押し戻す量
  // update y position
  character.y += character.dy + character.py;
  // bottom
  for (let i = 0; i < loopMax; i++) {
    let isTouching = false;
    for (let x = 0; x < character.rBottomX() - character.lTopX(); x += gridSize) {
      isTouching |= getMapType(character.lTopX() + x, character.rBottomY()) === "wall";
    }
    isTouching |= getMapType(character.rBottomX(), character.rBottomY()) === "wall";
    if (!isTouching) break;
    character.py = 0;
    character.y -= slideLength;
  }
  if (isTouching) character.y += slideLength * loopMax;
  // bottom (bridge)
  if (character.dy + character.py + character.ry >= 0) {
    for (let i = 0; i < loopMax; i++) {
      let isTouching = false;
      for (let x = 0; x < character.rBottomX() - character.lTopX(); x += gridSize) {
        isTouching |= getMapType(character.lTopX() + x, character.rBottomY()) === "bridge";
      }
      isTouching |= getMapType(character.rBottomX(), character.rBottomY()) === "bridge";
      if (!isTouching) break;
      character.py = 0;
      character.y -= slideLength;
    }
  }
  if (isTouching) character.y += slideLength * loopMax;
  // top
  for (let i = 0; i < loopMax; i++) {
    let isTouching = false;
    for (let x = 0; x < character.rBottomX() - character.lTopX(); x += gridSize) {
      isTouching |= getMapType(character.lTopX() + x, character.lTopY()) === "wall";
    }
    isTouching |= getMapType(character.rBottomX(), character.lTopY()) === "wall";
    if (!isTouching) break;
    character.py = 0;
    character.y += slideLength;
  }
  if (isTouching) character.y -= slideLength * loopMax;
  //------------------
  // update x position
  character.x += character.dx + character.px + character.rx;
  // left
  for (let i = 0; i < loopMax; i++) {
    isTouching = false;
    for (let y = 0; y < character.rBottomY() - character.lTopY(); y += gridSize) {
      isTouching |= getMapType(character.lTopX(), character.lTopY() + y) === "wall";
    }
    isTouching |= getMapType(character.lTopX(), character.rBottomY()) === "wall";
    if (!isTouching) break;
    character.px = 0;
    character.x += slideLength;
  }
  if (isTouching) character.x -= slideLength * loopMax;
  // right
  for (let i = 0; i < loopMax; i++) {
    isTouching = false;
    for (let y = 0; y < character.rBottomY() - character.lTopY(); y += gridSize) {
      isTouching |= getMapType(character.rBottomX(), character.lTopY() + y) === "wall";
    }
    isTouching |= getMapType(character.rBottomX(), character.rBottomY()) === "wall";
    if (!isTouching) break;
    character.px = 0;
    character.x -= slideLength;
  }
  if (isTouching) character.x += slideLength * loopMax;
};

// reset boss hp bar
let initBossHpBar = (maxHp) => {
  bossMaxHp = maxHp;
  bossHpBarRed = maxHp;
  bossHpBarRedPrev = maxHp;
  bossHpBarWhite = maxHp;
  bossHpBarWhiteReduceto = maxHp;
  bossHpBarWhiteReduceFlag = false;
  bossHpBarReduceCounter = 0;
};

// update boss hp bar
let updateBossHpBar = (hp) => {
  bossHpBarRed = hp;
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
    "type": "flight",
    "w" : 16,
    "h" : 16,
    "box" : [3, 3, 12, 12],
    "hit" : [3, 3, 12, 12],
    "hp" : 8,
    "img" : imgWatage,
    "anime": "watage",
    "move": (me) => {
      let angryHp = 6;
      if (me.isParamEmpty()) {
        me.setParam(0, me.x);
        me.setParam(1, me.y);
        me.setParam(2, randInt(0,799));
        me.setParam(3, randInt(0,799));
      }
      if (me.hp >= angryHp) { // float
        if (me.reaction > 0) {
          me.changeAnime("damaged1");
          me.setParam(2, (me.getParam(2) + 1) % 800);
          me.setParam(3, (me.getParam(3) + 1) % 800);
        }
        else {
          me.changeAnime("float1");
          me.setParam(2, (me.getParam(2) + 2) % 800);
          me.setParam(3, (me.getParam(3) + 2) % 800);
        }
        me.dx = Math.cos(2 * Math.PI * me.getParam(2) / 800 * 2) * 24;
        me.dy = Math.sin(2 * Math.PI * me.getParam(3) / 800 * 3) * 24;
        me.x = me.getParam(0) + me.dx;
        me.y = me.getParam(1) + me.dy;
      }
      else { // chase
        me.dx += Math.sign(plc.x - me.x) * 0.03125;
        me.dy += Math.sign(plc.y - me.y) * 0.0625;
        if (me.dx > 2) me.dx = 2;
        if (me.dx < -2) me.dx = -2;
        if (me.dy > 1.5) me.dy = 1.5;
        if (me.dy < -1.5) me.dy = -1.5;
        if (me.reaction-- > 0) {
          me.changeAnime(me.hp >= angryHp ? "damaged1" : "damaged3");
          me.dx *= 0.75;
          me.dy = 0.5;
        }
        else {
          me.changeAnime(me.hp >= angryHp ? "float1" : "float3");
        }
        me.x += me.dx;
        me.y += me.dy;        
      }
    }
  },
  "w" : { // watage 2
    "type": "flight",
    "w" : 16,
    "h" : 16,
    "box" : [3, 3, 12, 12],
    "hit" : [3, 3, 12, 12],
    "hp" : 3,
    "img" : imgWatage,
    "anime": "watage",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, me.x);
        me.setParam(1, me.y);
        me.setParam(2, randInt(0,799));
      }
      if (me.reaction > 0) {
        me.changeAnime("damaged2");
        me.setParam(2, (me.getParam(2) + 1) % 800);
      }
      else {
        me.changeAnime("float2");
        me.setParam(2, (me.getParam(2) + 2) % 800);
      }
      me.dx = 0;
      me.dy = Math.sin(2 * Math.PI * me.getParam(2) / 800 * 2) * 24;
      me.x = me.getParam(0) + me.dx;
      me.y = me.getParam(1) + me.dy;
    }
  },
  "P" : { // Pumpkin
    "type": "normal",
    "w" : 16,
    "h" : 16,
    "box" : [1, 3, 14, 15],
    "hit" : [3, 3, 12, 14],
    "hp" : 3,
    "img" : imgPumpkin,
    "anime": "pumpkin",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
      }
      if (isOnLand(me)) {
        if (Math.abs(me.x - plc.x) < 100 && cameraY < me.y + me.h && me.y < cameraY + charaLay.height && me.getParam(0) <= 0) {
          me.dy = -3.0;
          me.direction = (me.x < plc.x) ? "right" : "left";
          me.dx = me.direction === "right" ? 0.5 : -0.5;
        }
        else {
          me.dx = 0;
          me.dy = 0;
          me.setParam(0, me.getParam(0) - 1);
        }
      }
      else {
        me.setParam(0, 8); // 接地時間
      }
      if (isHeading(me)) { // 天井に衝突
        me.dy = -me.dy;
      }
      if (me.reaction > 0) { // 被弾
        me.changeAnime("damaged");
        if (me.anicount === 0) {
          me.dx = - me.dx / 2;
          me.dy = 0;
        }
      }
      else {
        me.changeAnime("laugh");
      }
      me.dy += 0.125;
      if (me.dy > 4) me.dy = 4;
      me.px = 0;
      me.py = 0;
      me.rx = 0;
      me.ry = 0;
      me.rideOn();
      movesAffectedByMap(me);
      moveAndCheckCollisionWithMap(me);
    }
  },
  "S": { // Slime
    "type": "normal",
    "w" : 32,
    "h" : 32,
    "box" : [8, 16, 23, 31],
    "hit" : [8, 16, 23, 31],
    "hp" : 16,
    "img" : imgSlime,
    "anime": "slime",
    "move": (me) => {
      if (!isOnLand(me)) {
        me.dy += 0.125;
        me.rx = 0;
        me.ry = 0;
      }
      else {
        me.dy = 0;
        me.px = 0;
        me.py = 0;
        me.rideOn();
        movesAffectedByMap(me);
      }
      if (me.dy > 4) me.dy = 4;
      if (((isOnLand(me) && getMapType(me.lTopX(), me.rBottomY() + 1) === "none" && me.px === 0) || isTouchingLeftWall(me) || me.px > 0) && me.anitype === "walk_l") {
        me.direction = "right";
        me.changeAnime("turn_to_r");
      }
      else if ((((isOnLand(me) && getMapType(me.rBottomX(), me.rBottomY() + 1) === "none" && me.px === 0) || isTouchingRightWall(me) || me.px < 0) && me.anitype === "walk_r") || me.anitype === "default") {
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
  "f": { // flying camera
    "type": "flight",
    "w" : 16,
    "h" : 16,
    "box" : [3, 3, 12, 12],
    "hit" : [3, 3, 12, 12],
    "hp" : 6,
    "img" : imgFlyingCamera,
    "anime": "flying_camera",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, me.x + 8 * me.initParam); // 初期座標（X）(initParam=1 で半マス右にずれます)
        me.setParam(1, me.y); // 初期座標（Y）
        me.setParam(2, randInt(0,199)); // 移動時間
        me.setParam(3, 0); // クールタイム
        me.setParam(4, 0); // 点滅回数カウント
        me.changeAnime("float_l");
      }
      if (me.isEndAnime()) {
        if ((me.anitype === "glow_l" || me.anitype === "glow_r") ) {
          me.setParam(4, me.getParam(4) + 1);
          if (me.getParam(4) >= 3) {
            let theta = Math.atan2(plc.y - me.y, plc.x - me.x)
            createEnemy("danmaku_white", me.x, me.y, Math.cos(theta) * 1.75, Math.sin(theta) * 1.75);
            me.setParam(3, 60 + randInt(0, 20));
            me.setParam(4, 0);
            me.startAnime(plc.x < me.x ? "float_l" : "float_r");
          }
          else {
            me.startAnime(plc.x < me.x ? "glow_l" : "glow_r");
          }
        }
        else {
          if (me.getParam(3) <= 0 && Math.abs(plc.x - me.x) < 150 && Math.abs(plc.y - me.y) < 75) {
            me.startAnime(plc.x < me.x ? "glow_l" : "glow_r");
          }
          else {
            me.startAnime(plc.x < me.x ? "float_l" : "float_r");
          }
        }
      }
      me.setParam(2, (me.getParam(2) + 1) % 200);
      me.setParam(3, me.getParam(3) - 1);
      me.dx = 0;
      me.dy = Math.sin(2 * Math.PI * me.getParam(2) / 200) * 16;
      me.x = me.getParam(0) + me.dx;
      me.y = me.getParam(1) + me.dy;
    }
  },
  "L": { // Slime Launcher
    "type": "normal",
    "w" : 32,
    "h" : 32,
    "box" : [2, 4, 29, 31],
    "hit" : [2, 4, 29, 31],
    "hp" : 16,
    "img" : imgSlimeLauncher,
    "anime": "slimelauncher",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
        if (me.initParam === 1) me.x += 8; // 初期パラメータを1にすると半マスずれる
      }
      if (!isOnLand(me)) {
        me.dy += 0.125;
        me.rx = 0;
        me.ry = 0;
      }
      else {
        me.dy = 0;
        me.px = 0;
        me.py = 0;
        me.rideOn();
        movesAffectedByMap(me);
      }
      if (me.dy > 4) me.dy = 4;
      moveAndCheckCollisionWithMap(me);
      if (me.anitype != "vomit") {
        me.anitype = (me.reaction > 0) ? "damaged" : "munch";
        me.setParam(0, me.getParam(0) + 1);
        if (me.getParam(0) > 120) {
          me.param[0] = 0;
          createEnemy("minion", me.x, me.y + 8, -1.0 + me.dx + me.px + me.rx, -2.0 + me.dy + me.py + me.ry).direction = "left";
          me.changeAnime("vomit");
        } 
      }
      else if (me.isEndAnime()) {
        me.changeAnime("munch");
      }
    }
  },
  "e" : { // electro jar
    "type": "normal",
    "w" : 32,
    "h" : 32,
    "box" : [1, 8, 30, 31],
    "hit" : [8, 8, 23, 24],
    "hp" : 20,
    "img" : imgElectroJar,
    "anime": "electrojar",
    "move": (me) => {
      if (me.initParam === 0) { // 初期変数を指定しない時は5に自動設定する
        me.initParam = 5;
      }
      if (me.isParamEmpty()) {
        me.setParam(0, randInt(0, me.initParam * 10));
      }
      updateVelocity(me);
      moveAndCheckCollisionWithMap(me);
      me.setParam(0, me.getParam(0) + 1);
      if (me.getParam(0) === me.initParam * 10) {
        me.startAnime(me.initParam <= 2 ? "launch_fast" : "launch");
        createEnemy("danmaku_yellow", me.x + 8, me.y - 8, -1.000 + randInt(0, 8) * 0.125, -2.5 - randInt(0, 8) * 0.0625);
      }
      if (me.getParam(0) >= me.initParam * 20) {
        me.setParam(0, 0);
        me.startAnime(me.initParam <= 2 ? "launch_fast" : "launch");
        createEnemy("danmaku_yellow", me.x + 8, me.y - 8,  1.000 - randInt(0, 8) * 0.125, -2.5 - randInt(0, 8) * 0.0625);
      }
    }
  },
  "T" : { // tulip (left)
    "type": "wall_stuck",
    "w" : 16,
    "h" : 16,
    "box" : [1, 5, 15, 12],
    "hit" : [1, 5, 15, 12],
    "hp" : 5,
    "img" : imgTulip,
    "anime": "tulip",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
      }
      if (me.reaction > 0) {
        me.changeAnime("damaged_l");
      }
      else {
        if (me.anitype != "open_l") me.changeAnime("stop_l");
        if (me.incParam(0) > 180) {
          me.setParam(0, 0);
          me.startAnime("open_l");
          createEnemy("danmaku_red", me.x - 8, me.y, -0.75, 0);
        }
      }
    }
  },
  "t" : { // tulip (right)
    "type": "wall_stuck",
    "w" : 16,
    "h" : 16,
    "box" : [0, 5, 14, 12],
    "hit" : [0, 5, 14, 12],
    "hp" : 5,
    "img" : imgTulip,
    "anime": "tulip",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
      }
      if (me.reaction > 0) {
        me.changeAnime("damaged_r");
      }
      else {
        if (me.anitype != "open_r") me.changeAnime("stop_r");
        if (me.incParam(0) > 180) {
          me.setParam(0, 0);
          me.startAnime("open_r");
          createEnemy("danmaku_red", me.x + 8, me.y, 0.75, 0);
        }
      }
    }
  },
  "u" : { // tulip (down)
    "type": "flight",
    "w" : 16,
    "h" : 16,
    "box" : [5, 0, 12, 14],
    "hit" : [5, 0, 12, 14],
    "hp" : 5,
    "img" : imgTulip,
    "anime": "tulip",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
      }
      if (me.reaction > 0) {
        me.changeAnime("damaged_d");
      }
      else {
        if (me.anitype != "open_d") me.changeAnime("stop_d");
        if (me.incParam(0) > 180) {
          me.setParam(0, 0);
          me.startAnime("open_d");
          createEnemy("danmaku_red", me.x, me.y + 8, 0, 0.75);
        }
      }
    }
  },
  // 爆弾
  "b" : { // bomb TODO: Infinite respawn
    "type": "normal",
    "w" : 32,
    "h" : 32,
    "box": [6, 11, 25, 30],
    "hit": [8, 12, 23, 27],
    "hp": 9999,
    "img" : imgBomb,
    "anime" : "bomb",
    "move" : (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0); // カウントダウン
        me.setParam(1, "normal"); // 状態
        me.isNoHitWithPlc = true;
      }
      // カウントダウン
      if (me.getParam(1) === "fire") {
        me.incParam(0);
        me.changeAnime(me.getParam(0) > 180 ? "count_1" : me.getParam(0) > 120 ? "count_2" : me.getParam(0) > 60 ? "count_3" : "count_4");
      }
      // 爆発
      if (me.getParam(0) > 240 && me.getParam(1) === "fire") {
        me.isNoHitWithShot = true;
        me.type = "danmaku";
        me.startAnime("bomb!");
        me.setParam(1, "bomb");
        me.setParam(0, 0);
        quakeTimeY = 20;
        for (let i = 0; i < 8; i++) {
          createEffect("star", me.lTopX() + ((me.rbx - me.ltx) - 8) / 2, me.lTopY() + ((me.rby - me.lty) - 8) / 2, randInt(0, 250) * 0.01 * (i % 2 * 2 - 1), randInt(50, 450) * -0.01);
        }
        // 自機と衝突判定のある爆風を発生
        createEnemy("bomb_bakuhu", me.lTopX() - 20, me.lTopY() - 20, 0, 0);
        createEnemy("bomb_bakuhu", me.rBottomX() - 12, me.lTopY() - 20, 0, 0);
        createEnemy("bomb_bakuhu", me.lTopX() - 20, me.rBottomY() - 12, 0, 0);
        createEnemy("bomb_bakuhu", me.rBottomX() - 12, me.rBottomY() - 12, 0, 0);
        // 爆弾の衝突判定を拡張
        [me.hltx, me.hlty, me.hrbx, me.hrby] = [me.hltx - 16, me.hlty - 16, me.hrbx + 16, me.hrby + 16];
        // 敵を破壊
        enemyArray.forEach((e) => {
          if (me.isHit(e) && e.type != "danmaku") {
            e.hp -= 50;
          }
        });
      }
      // 爆発後
      if (me.getParam(1) === "bomb") {
        me.incParam(0);
        if (me.getParam(0) < 30) { // 爆発エフェクト
          if (me.getParam(0) % 6 === 0) {
            createEnemy("bomb_bakuhu", randInt(me.lTopX() - 32, (me.lTopX() + me.rBottomX()) / 2 - 16), randInt(me.lTopY() - 32, me.rBottomY()), 0, 0);
          }
          else if (me.getParam(0) % 6 === 3) {
            createEnemy("bomb_bakuhu", randInt((me.hLTopX() + me.rBottomX()) / 2 - 16, me.rBottomX()), randInt(me.lTopY() - 32, me.rBottomY()), 0, 0);
          }
        }
        else { // スプライト消去
          me.hp = 0;
        }
      }
      // 移動
      if (me.getParam(1) === "bomb") {
        me.dx = 0;
        me.dy = 0;
        me.px = 0;
        me.py = 0;
        me.rx = 0;
        me.ry = 0;
      }
      else {
        if (isOnLand(me)) {
          me.dx = 0;
          me.dy = 0;
        }
        else {
          me.dy += 0.125;
          if (me.dy > 4) me.dy = 4;
          if (isTouchingLeftWall(me) && me.dx < 0) me.dx = - me.dx;
          if (isTouchingRightWall(me) && me.dx > 0) me.dx = - me.dx;
        }
        // ショットとの衝突
        shotArray.forEach((e) => {
          if (!e.isHit(me)) return;
          if (me.getParam(1) === "normal") me.setParam(1, "fire");
          me.dy = -3.5;
          me.dx = 1.0 * (e.direction === "right" ? 1 : -1);
        });
        if (isHeading(me)) me.dy = -me.dy;
        me.px = 0;
        me.py = 0;
        me.rx = 0;
        me.ry = 0;
        me.rideOn();
        movesAffectedByMap(me);
        moveAndCheckCollisionWithMap(me);
      }
    }
  },
  "minion": { // Minion Slime
    "type": "normal",
    "w" : 16,
    "h" : 16,
    "box" : [2, 4, 13, 15],
    "hit" : [2, 4, 13, 15],
    "hp" : 8,
    "img" : imgMinionSlime,
    "anime": "minionslime",
    "move": (me) => {
      if (!isOnLand(me)) {
        me.dy += 0.125;
      }
      else {
        me.dx = 0.25 * (me.anitype === "walk_l" ? -1 : 1);
        me.dy = 0;
        me.rx = 0;
        me.ry = 0;
        me.rideOn();
        movesAffectedByMap(me);
      }
      if (me.dy > 4) me.dy = 4;
      moveAndCheckCollisionWithMap(me);
      if ((isTouchingLeftWall(me) || me.px > 0) && me.anitype === "walk_l") {
        me.direction = "right";
      }
      else if ((isTouchingRightWall(me) || me.px < 0) && me.anitype === "walk_r") {
        me.direction = "left";
      }
      if (!isOnLand(me)) {
        me.changeAnime(me.direction === "left" ? "fall_l" : "fall_r");
      }
      else {
        me.changeAnime(me.direction === "left" ? "walk_l" : "walk_r");
      }
    }
  },
  "danmaku_yellow": { // danmaku (yellow)
    "type": "danmaku",
    "w" : 16,
    "h" : 16,
    "box" : [3, 3, 12, 12],
    "hit" : [3, 3, 12, 12],
    "hp" : 1,
    "img" : imgDanmakuYellow,
    "anime": "danmakuyellow",
    "move": (me) => {
      if (isOnLand(me) || isTouchingLeftWall(me) || isTouchingRightWall(me) || isHeading(me)) {
        me.isNoHit = true;
        me.dx = 0;
        me.dy = 0;
        me.changeAnime("vanish");
      }
      else if (me.anitype != "vanish") {
        me.dy += 0.0625;
        me.changeAnime("shot");
      }
      if (me.isEndAnime()) {
        me.hp = 0;
      }
      moveAndCheckCollisionWithMap(me);
    }
  },
  "danmaku_white": { // danmaku (white)
    "type": "danmaku",
    "w" : 16,
    "h" : 16,
    "box" : [5, 5, 10, 10],
    "hit" : [5, 5, 10, 10],
    "hp" : 1,
    "img" : imgDanmakuWhite,
    "anime": "danmakuwhite",
    "move": (me) => {
      if (isOnLand(me) || isTouchingLeftWall(me) || isTouchingRightWall(me) || isHeading(me)) {
        me.isNoHit = true;
        me.dx = 0;
        me.dy = 0;
        me.changeAnime("vanish");
        // びっくりブロック◊にぶつかったら破壊
        for (let i = 0; i < 4; i++) {
          let hitX = i < 2 ? me.lTopX() - 1 : me.rBottomX() + 1;
          let hitY = i % 2 === 0 ? me.lTopY() - 1: me.rBottomY() + 1;
          if (getMapSubType(hitX, hitY) != "bomb") continue;
          replaceMap(Math.floor(hitX / gridSize), Math.floor(hitY / gridSize), '.');
          createGimmick("bakufu", Math.floor(hitX / gridSize) * 16, Math.floor(hitY / gridSize) * 16, 0, 0);
        }
      }
      else  if (me.anitype != "vanish") {
        me.changeAnime("shot");
      }
      if (me.isEndAnime()) {
        me.hp = 0;
      }
      moveAndCheckCollisionWithMap(me);
    }
  },
  "danmaku_red": { // danmaku (red)
    "type": "danmaku",
    "w" : 16,
    "h" : 16,
    "box" : [5, 5, 10, 10],
    "hit" : [5, 5, 10, 10],
    "hp" : 1,
    "img" : imgDanmakuRed,
    "anime": "danmakured",
    "move": (me) => {
      if (isOnLand(me) || isTouchingLeftWall(me) || isTouchingRightWall(me) || isHeading(me)) {
        me.isNoHit = true;
        me.dx = 0;
        me.dy = 0;
        me.changeAnime("vanish");
      }
      else if (me.anitype != "vanish") {
        me.changeAnime("shot");
      }
      if (me.isEndAnime()) {
        me.hp = 0;
      }
      moveAndCheckCollisionWithMap(me);
    }
  },
  "bomb_bakuhu": { // 爆弾から発生する爆風
    "type": "danmaku",
    "w" : 32,
    "h" : 32,
    "box": [8, 8, 23, 23],
    "hit": [8, 8, 23, 23],
    "hp" : 1,
    "img": imgBombEffect,
    "anime": "bomb_bakuhu",
    "move": (me) => {
      if (me.isParamEmpty()){
        me.setParam(0, 0);
        me.startAnime(randInt(0, 1) === 0 ? "type_1" : "type_2");
      }
      if (me.incParam(0) > 4){
        me.isNoHit = true;
      }
      if (me.isEndAnime()){
        me.hp = 0;
      }
    }
  },
  "watage_satelite": { // ボスわたげの周囲のビット
    "type": "normal",
    "w" : 16,
    "h" : 16,
    "box" : [3, 3, 12, 12],
    "hit" : [3, 3, 12, 12],
    "hp" : 1,
    "img" : imgWatageSatelite,
    "anime": "watage_satelite",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
        me.isInvincible = true;
      }
      if (me.incParam(0) % 8 === 0) {
        createEffect("satelite_fade", me.x, me.y, 0, 0);
      }
    }
  },
  //-------------------------------BOSS----------------------------------
  // big pumpkin
  "p": { 
    "type": "boss",
    "w" : 64,
    "h" : 64,
    "box" : [3, 16, 60, 63],
    "hit" : [3, 16, 60, 63],
    "hp" : 160,
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
            initBossHpBar(me.hp);
            bossBattlePhase = "fight";
          }
          me.changeAnime("laugh");
          moveAndCheckCollisionWithMap(me);
          break; 
        case "fight" :
          me.isNoHit = false;
          if (me.isParamEmpty()) {
            me.setParam(0, 160); // 地面での待機時間
            me.setParam(1, 1); // 滞空時1，着地した瞬間に0に変更
          }
          if (!isOnLand(me)) {
            me.setParam(0, me.hp + 36);
            me.setParam(1, 1);
            me.dy += (me.dy > 0) ? 0.25 : 0.125;
          }
          else {
            //me.direction = (me.x < plc.x) ? "right" : "left";
            if (me.getParam(1) === 1) { // 着地
              me.setParam(1, 0);
              quakeTimeY = 15;
              createEnemy("P", randInt(cameraX + 32, cameraX + charaLay.width - 48), -16, 0, 0);
            }
            me.setParam(0, me.getParam(0) - 1);
            if (me.getParam(0) < 0) { // ジャンプ
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
          updateBossHpBar(me.hp);
          if (me.hp <= 0) { // ぐえ〜〜
            bossBattlePhase = "defeated";
            me.setParam(0, 0);
            enemyArray.forEach((e) => {
              e.hp = 0;
            });
          }
          break;
        case "defeated" :
          me.reaction = me.getParam(0);
          me.setParam(0, me.getParam(0) + 1);
          if (me.getParam(0) % 8 === 1) {
            createEffect("explode", randInt(me.lTopX() - 32, (me.lTopX() + me.rBottomX()) / 2 - 16), randInt(me.lTopY() - 32, me.rBottomY()), 0, 0);
            createEffect("explode", randInt((me.lTopX() + me.rBottomX()) / 2 - 16, me.rBottomX()), randInt(me.lTopY() - 32, me.rBottomY()), 0, 0);
          }
          me.changeAnime("yarare");
          if (me.getParam(0) > 200) {
            for (let i = 0; i < 16; i++) {
              createEffect("star", me.lTopX() + ((me.rbx - me.ltx) - 8) / 2, me.lTopY() + ((me.rby - me.lty) - 8) / 2, randInt(0, 250) * 0.01 * (i % 2 * 2 - 1), randInt(50, 450) * -0.01);
            }
            quakeTimeY = 20;
            bossBattlePhase = "end";
          }
          break;
        default:
          break;
      }
    }
  },
  "R": { // denshi renji
    "type": "boss",
    "w" : 96,
    "h" : 48,
    "box" : [36, 18, 88, 47],
    "hit" : [36, 18, 88, 47],
    "hp" : 200,
    "img" : imgRenchin,
    "anime": "renchin",
    "move": (me) => {
      const halfHp = 100;
      me.isNoHit = true; // 戦闘中以外衝突判定しない
      switch(bossBattlePhase) {
        case "none" :
          me.isInvincible = true;
          me.changeAnime("default");
          break;
        case "entrance" :
          initBossHpBar(me.hp);
          bossBattlePhase = "fight";
          me.changeAnime("stand");
          moveAndCheckCollisionWithMap(me);
          break; 
        case "fight" :
          me.isNoHit = false;
          if (me.param.length === 0) {
            me.setParam(0, 100); // 待機時間
            me.setParam(1, "dash_wait"); // 行動パターン
            me.setParam(2, me.x); // 初期位置
          }
          me.setParam(0, me.getParam(0) - 1);
          if (me.getParam(1) === "dash_wait") {
            me.isInvincible = true;
            me.dx = 0;
            me.dy = 0;
            if (me.getParam(0) <= 0) {
              me.setParam(0, 50);
              me.setParam(1, "shake");
              me.changeAnime(me.hp > halfHp ? "shake" : "shake_red");
            }
          }
          else if (me.getParam(1) === "shake") {
            if (me.getParam(0) <= 0) {
              me.dx = 0.25;
              me.setParam(1, "dash");
              me.changeAnime(me.hp > halfHp ? "dash" : "dash_red");
            }
          }
          else if (me.getParam(1) === "dash") {
            if (me.dx > -8) me.dx -= me.hp > halfHp ? 0.0625 : 0.1875;
            if (me.isHit(plc) && plc.reaction === invincibleTimeMax) {
              plc.dx += me.dx / 2;
              plc.dy = - 2.0;
            }
            if (isTouchingLeftWall(me)) {
              me.setParam(1, "clash");
              me.dy = -1.25;
              quakeTimeX = 15;
              createEnemy("minion", randInt(cameraX + 32, cameraX + charaLay.width / 2 - 8), -16, 0, 0).direction = "right";
              createEnemy("minion", randInt(cameraX + charaLay.width / 2 - 8, cameraX + charaLay.width - 48), -16, 0, 0).direction = "left";
              if (me.hp <= halfHp) createEnemy("minion", randInt(cameraX + 32, cameraX + charaLay.width - 48), -16, 0, 0).direction = "left";
              me.changeAnime("clash");
            }
          }
          else if (me.getParam(1) === "clash") {
            me.dx = 1;
            me.dy += 0.125;
            if (isOnLand(me)) {
              me.setParam(0, 25);
              me.setParam(1, "jump_wait");
              me.changeAnime("stand");
            }
          }
          else if (me.getParam(1) === "jump_wait") {
            me.dx = 0;
            me.dy = 0;
            if (me.getParam(0) <= 0) {
              me.setParam(1, "jump");
              me.changeAnime("jump");
              me.dy -= 4;
            }
          }
          else if (me.getParam(1) === "jump") {
            me.dx = 1.75;
            me.dy += 0.0625;
            if (me.anitype === "jump" && me.dy > 0) me.changeAnime("fall");
            if (me.x > me.param[2]) me.x = me.param[2];
            if (isOnLand(me)) {
              quakeTimeY = 20;
              createEnemy("minion", randInt(cameraX + 32, cameraX + charaLay.width - 48), -16, 0, 0).direction = "right";
              if (me.hp <= halfHp) createEnemy("minion", randInt(cameraX + 32, cameraX + charaLay.width - 48), -16, 0, 0).direction = "left";
              me.setParam(0, 100);
              me.setParam(1, "open_wait");
              me.changeAnime("stand");
            }
          }
          else if (me.getParam(1) === "open_wait") {
            me.dx = 0;
            me.dy = 0;
            if (me.getParam(0) <= 0) {
              me.setParam(0, 225);
              me.setParam(1, "open");
              me.changeAnime("open_1");
            }
          }
          else if (me.getParam(1) === "open") {
            if (me.isEndAnime() && me.anitype === "open_1") {
              me.changeAnime(me.hp > halfHp ? "open_2" : "open_2_red");
            }
            if (me.anitype === "open_2" || me.anitype === "open_2_red"){
              me.hltx = me.isEndAnime() ? 36 : 16; // 扉によるダメージ
              me.isInvincible = false;
            }
            if ((me.getParam(0) > 40 && me.getParam(0) % 35 === 15 && me.anitype === "open_2") || (me.getParam(0) > 40 && me.getParam(0) % 20 === 15 && me.anitype === "open_2_red")) {
              createEnemy("danmaku_yellow", me.x + 48, me.y + 24, -0.25 - randInt(0, 8) * 0.125, -3.0 - randInt(0, 8) * 0.0625);
            }
            if (me.anitype === "open_2" && me.hp <= 80) { // hpが80以下なら強制的に第2形態へ
              me.setParam(0, 60);
              me.setParam(1, "dash_wait");
              me.changeAnime("stand");
            }
            if (me.getParam(0) <= 0) {
              me.setParam(0, 30);
              me.setParam(1, "dash_wait");
              me.changeAnime("stand");
            }
          }
          moveAndCheckCollisionWithMap(me);
          // HPバーの描画
          updateBossHpBar(me.hp);
          if (me.hp <= 0) { // ぐえ〜〜
            bossBattlePhase = "defeated";
            me.setParam(0, 0);
            enemyArray.forEach((e) => {
              e.hp = 0;
            });
          }
          break;
        case "defeated" :
          me.reaction = me.getParam(0);
          me.setParam(0, me.getParam(0) + 1);
          if (me.getParam(0) % 8 === 1) {
            createEffect("explode", randInt(me.lTopX() - 32, (me.lTopX() + me.rBottomX()) / 2 - 16), randInt(me.lTopY() - 32, me.rBottomY()), 0, 0);
            createEffect("explode", randInt((me.lTopX() + me.rBottomX()) / 2 - 16, me.rBottomX()), randInt(me.lTopY() - 32, me.rBottomY()), 0, 0);
          }
          me.changeAnime("yarare");
          if (me.getParam(0) > 200) {
            for (let i = 0; i < 16; i++) {
              createEffect("star", me.lTopX() + ((me.rbx - me.ltx) - 8) / 2, me.lTopY() + ((me.rby - me.lty) - 8) / 2, randInt(0, 250) * 0.01 * (i % 2 * 2 - 1), randInt(50, 450) * -0.01);
            }
            quakeTimeY = 20;
            bossBattlePhase = "end";
          }
          break;
        default:
          break;
      }
    }
  },
  "V": { // Big watage
    "type": "boss",
    "w" : 96,
    "h" : 96,
    "box" : [16, 16, 79, 79],
    "hit" : [20, 20, 75, 75],
    "hp" : 300,
    "img" : imgBigWatage,
    "anime": "bigwatage",
    "move": (me) => {
      me.isNoHit = true; // 戦闘中以外衝突判定しない
      if (me.isParamEmpty()) { // 変数初期化
        me.setParam(0, 0); // 時間カウンター
        me.setParam(1, createEnemy("watage_satelite", me.x + me.w / 2 - 8, me.y, 0, 0)); // 衛星（上から時計回り）
        me.setParam(2, createEnemy("watage_satelite", me.x + me.w - 8, me.y + me.h / 2 - 8, 0, 0));
        me.setParam(3, createEnemy("watage_satelite", me.x + me.w / 2 - 8 , me.y + me.h - 8, 0, 0));
        me.setParam(4, createEnemy("watage_satelite", me.x, me.y + me.h / 2 - 8, 0, 0));
        me.setParam(5, 0); // 行動タイムカウンター
        me.setParam(6, "wait") // 行動タグ
        me.setParam(7, 0); // 衛星との距離
        me.setParam(8, me.x); // 初期位置x
        me.setParam(9, me.y); // 初期位置y
        me.setParam(10, me.hp); // HP変動チェック
        me.setParam(11, 240); // 待機カウントの上限値
        me.setParam(12, 0); // 行動回数カウンター
      }
      switch(bossBattlePhase) {
        case "none" :
          me.y = -128;
          me.changeAnime("default");
          break;
        case "entrance" :
          me.y += 2;
          if (me.y >= me.getParam(9)) {
            initBossHpBar(me.hp);
            bossBattlePhase = "fight";
            me.y = me.getParam(9); 
          }
          break; 
        case "fight" :
          me.isNoHit = false;
          me.incParam(5);
          let isMoveEnd = false;
          if (me.getParam(6) === "wait") {
            me.x = me.getParam(8);
            me.y = me.getParam(9) + Math.sin(2 * Math.PI * ((me.getParam(5) % 120)/ 120)) * 24;
            if (me.getParam(5) >= me.getParam(11)) {
              if (me.incParam(12) % 3 === 1) {
                me.setParam(6, "gather");
              }
              else {
                let saikoro = randInt(0, 2);
                if (plc.x < me.x + me.w / 2) {
                  me.setParam(6, saikoro === 0 ? "guru_r" : saikoro === 1 ? "attack_r" : "eight_r");
                }
                else {
                  me.setParam(6, saikoro === 0 ? "guru_l" : saikoro === 1 ? "attack_l" : "eight_l");
                }
              }
              me.setParam(5, 0);
              me.incParam(12);
            }
          }
          else if (me.getParam(6) === "gather") {
            me.setParam(7, - 30 + Math.abs(me.getParam(5) - 30));
            if (me.getParam(7) < -12) me.setParam(7, -12);
            if (me.getParam(5) >= 59) {
              me.setParam(6, "spread");
              me.setParam(5, 0);
            }
          }
          else if (me.getParam(6) === "spread") {
            me.setParam(7, 100 - Math.abs(me.getParam(5) - 100));
            if (me.getParam(5) >= 200) isMoveEnd = true;
            
          }
          else if (me.getParam(6) === "guru_l") {  
            me.x = me.getParam(8) - Math.sin(2 * Math.PI * ((me.getParam(5) % 240)/ 240)) * Math.sin(2 * Math.PI * ((me.getParam(5) % 960)/ 960)) * 140;
            me.y = me.getParam(9) - Math.cos(2 * Math.PI * ((me.getParam(5) % 240)/ 240)) * Math.sin(2 * Math.PI * ((me.getParam(5) % 960)/ 960)) * 80;
            if (me.getParam(5) >= 480) isMoveEnd = true;
            
          }
          else if (me.getParam(6) === "guru_r") {
            me.x = me.getParam(8) + Math.sin(2 * Math.PI * ((me.getParam(5) % 240)/ 240)) * Math.sin(2 * Math.PI * ((me.getParam(5) % 960)/ 960)) * 140;
            me.y = me.getParam(9) - Math.cos(2 * Math.PI * ((me.getParam(5) % 240)/ 240)) * Math.sin(2 * Math.PI * ((me.getParam(5) % 960)/ 960)) * 80;
            if (me.getParam(5) >= 480) isMoveEnd = true;
            
          }
          else if (me.getParam(6) === "attack_l") {
            me.x = me.getParam(8) - Math.sin(2 * Math.PI * ((me.getParam(5) % 200)/ 200)) * (1 - Math.cos(2 * Math.PI * ((me.getParam(5) % 200)/ 200))) * 98;
            //me.y = me.getParam(9) - Math.cos(2 * Math.PI * ((me.getParam(5) % 180)/ 180)) * (1 - Math.cos(2 * Math.PI * ((me.getParam(5) % 180)/ 180))) * 52;
            if (me.getParam(5) >= 200) isMoveEnd = true;
          }
          else if (me.getParam(6) === "attack_r") {
            me.x = me.getParam(8) + Math.sin(2 * Math.PI * ((me.getParam(5) % 200)/ 200)) * (1 - Math.cos(2 * Math.PI * ((me.getParam(5) % 200)/ 200))) * 98;
            //me.y = me.getParam(9) - Math.cos(2 * Math.PI * ((me.getParam(5) % 180)/ 180)) * (1 - Math.cos(2 * Math.PI * ((me.getParam(5) % 180)/ 180))) * 52;
            if (me.getParam(5) >= 200) isMoveEnd = true;
          }
          else if (me.getParam(6) === "eight_l") {
            me.x = me.getParam(8) - Math.sin(2 * Math.PI * ((me.getParam(5) % 240)/ 240)) * 120;
            me.y = me.getParam(9) + Math.sin(2 * Math.PI * ((me.getParam(5) % 120)/ 120)) * 60;
            if (me.getParam(5) >= 240) isMoveEnd = true;
          }
          else if (me.getParam(6) === "eight_r") {
            me.x = me.getParam(8) + Math.sin(2 * Math.PI * ((me.getParam(5) % 240)/ 240)) * 120;
            me.y = me.getParam(9) + Math.sin(2 * Math.PI * ((me.getParam(5) % 120)/ 120)) * 60;
            if (me.getParam(5) >= 240) isMoveEnd = true;
          }
          if (isMoveEnd) {
            me.setParam(6, "wait");
            me.setParam(5, 0);
            me.setParam(11, me. hp <= 100 ? 0 : me.hp <= 200 ? 120 : 240);
          }
          // アニメ
          if (me.hp < me.getParam(10)) {
            me.setParam(10, me.hp);
            me.startAnime("damage");
          }
          else if (me.reaction <= 0){
            me.changeAnime(me.hp <= 100 ? "angry" : "default");
          }
          // HPバーの描画
          updateBossHpBar(me.hp);
          if (me.hp <= 0) { // ぐえ〜〜
            bossBattlePhase = "defeated";
            me.setParam(0, 0);
            enemyArray.forEach((e) => {
              e.hp = 0;
            });
          }
          break;
        case "defeated" :
          me.reaction = me.incParam(0);
          if (me.getParam(0) % 8 === 1) {
            createEffect("explode", randInt(me.lTopX() - 32, (me.lTopX() + me.rBottomX()) / 2 - 16), randInt(me.lTopY() - 32, me.rBottomY()), 0, 0);
            createEffect("explode", randInt((me.lTopX() + me.rBottomX()) / 2 - 16, me.rBottomX()), randInt(me.lTopY() - 32, me.rBottomY()), 0, 0);
          }
          me.changeAnime("yarare");
          if (me.getParam(0) > 200) {
            for (let i = 0; i < 16; i++) {
              createEffect("star", me.lTopX() + ((me.rbx - me.ltx) - 8) / 2, me.lTopY() + ((me.rby - me.lty) - 8) / 2, randInt(0, 250) * 0.01 * (i % 2 * 2 - 1), randInt(50, 450) * -0.01);
            }
            quakeTimeY = 20;
            bossBattlePhase = "end";
          }
          break;
        default:
          break;
      }
      // 衛星の移動
      if (bossBattlePhase != "defeated") {
        me.incParam(0);
        for (let i = 1; i <= 4; i++) {
          let rad = 2 * Math.PI * ((me.getParam(0) % 160 + i * 40)/ 160);
          me.getParam(i).x = me.x + me.w / 2 - 8 + Math.cos(rad) * (48 + me.getParam(7));
          me.getParam(i).y = me.y + me.h / 2 - 8 + Math.sin(rad) * (48 + me.getParam(7));
        }
      }
    }
  }
};

const enemyKeyList = Object.keys(enemyData);

let createEnemy = (enemyId, x, y, dx, dy) => {
  let newEnemy = new CharacterSprite(
    enemyId, // id
    enemyData[enemyId].type, // type
    x, // start position x
    y, // start position y
    enemyData[enemyId].w, // width
    enemyData[enemyId].h, // height
    enemyData[enemyId].box[0], // hit box (map)
    enemyData[enemyId].box[1],
    enemyData[enemyId].box[2],
    enemyData[enemyId].box[3],
    enemyData[enemyId].hit[0], // hit box (character)
    enemyData[enemyId].hit[1],
    enemyData[enemyId].hit[2],
    enemyData[enemyId].hit[3],
    enemyData[enemyId].hp, // hp
    enemyData[enemyId].img, // sprite sheet
    animeData[enemyData[enemyId].anime]
  );
  newEnemy.dx = dx;
  newEnemy.dy = dy;
  enemyArray.push(newEnemy);
  return newEnemy;
};

  // ============ //
 //  item data   //
// ============ //
let itemData = {
  //--------------------------------- Key ------------------------------
  "à": { // key 0 (alt + _ -> a)
    "type": "gravity",
    "w": 16,
    "h": 16,
    "box" : [0, 6, 14, 15],
    "hit" : [0, 6, 14, 15],
    "img": imgKey,
    "anime": "key",
    "move": (me) => {
      if (collectedKey[0]) me.hp = 0;
      else if (mapAnimeCount % 20 === 1) {
        createEffect("yellow_glitter", randInt(me.lTopX() - 8, me.rBottomX()), randInt(me.lTopY() - 8, me.rBottomY()), 0, 0);
      }
    },
    "obtained": (me) => {
      collectedKey[0] = true;
      collectedKeyNum++;
      for (let i = 0; i < 4; i++) {
        createEffect("yellow_glitter_slow", me.x + 4, me.y + 4, Math.cos(2*Math.PI*(i*2+1)/8) * 4, Math.sin(2*Math.PI*(i*2+1)/8) * 4);
      }
    }
  },
  "è": { // key 1 (alt + _ -> e)
    "type": "gravity",
    "w": 16,
    "h": 16,
    "box" : [0, 6, 14, 15],
    "hit" : [0, 6, 14, 15],
    "img": imgKey,
    "anime": "key",
    "move": (me) => {
      if (collectedKey[1]) me.hp = 0;
      else if (mapAnimeCount % 20 === 1) {
        createEffect("yellow_glitter", randInt(me.lTopX() - 8, me.rBottomX()), randInt(me.lTopY() - 8, me.rBottomY()), 0, 0);
      }
    },
    "obtained": (me) => {
      collectedKey[1] = true;
      collectedKeyNum++;
      for (let i = 0; i < 4; i++) {
        createEffect("yellow_glitter_slow", me.x + 4, me.y + 4, Math.cos(2*Math.PI*(i*2+1)/8) * 4, Math.sin(2*Math.PI*(i*2+1)/8) * 4);
      }
    }
  },
  "ì": { // key 2 (alt + _ -> i)
    "type": "gravity",
    "w": 16,
    "h": 16,
    "box" : [0, 6, 14, 15],
    "hit" : [0, 6, 14, 15],
    "img": imgKey,
    "anime": "key",
    "move": (me) => {
      if (collectedKey[2]) me.hp = 0;
      else if (mapAnimeCount % 20 === 1) {
        createEffect("yellow_glitter", randInt(me.lTopX() - 8, me.rBottomX()), randInt(me.lTopY() - 8, me.rBottomY()), 0, 0);
      }
    },
    "obtained": (me) => {
      collectedKey[2] = true;
      collectedKeyNum++;
      for (let i = 0; i < 4; i++) {
        createEffect("yellow_glitter_slow", me.x + 4, me.y + 4, Math.cos(2*Math.PI*(i*2+1)/8) * 4, Math.sin(2*Math.PI*(i*2+1)/8) * 4);
      }
    }
  },
  //--------------------------------- Medal ------------------------------
  "X": { // medal 0
    "type": "medal",
    "w": 32,
    "h": 32,
    "box" : [6, 6, 25, 25],
    "hit" : [6, 6, 25, 25],
    "img": imgMedal,
    "anime": "medal",
    "move": (me) => {
      if (collectedMedal[0]) me.hp = 0;
      if (isMedalcollected(stageId, 0)) {
        me.changeAnime("collected");
      }
      else if (mapAnimeCount % 5 === 1) {
        createEffect("red_glitter", randInt(me.x, me.x + 24), randInt(me.y, me.y + 24), 0, 0);
      }
    },
    "obtained": (me) => {
      collectedMedal[0] = true;
      if (isMedalcollected(stageId, 0)) {
        collectedCoins += 10;
      }
      else {
        for (let i = 0; i < 8; i++) {
          createEffect("red_glitter_slow", me.x + 12, me.y + 12, Math.cos(2*Math.PI*i/8) * 4, Math.sin(2*Math.PI*i/8) * 4);
        }
      }
    }
  },
  "Y": { // medal 1
    "type": "medal",
    "w": 32,
    "h": 32,
    "box" : [6, 6, 25, 25],
    "hit" : [6, 6, 25, 25],
    "img": imgMedal,
    "anime": "medal",
    "move": (me) => {
      if (collectedMedal[1]) me.hp = 0;
      if (isMedalcollected(stageId, 1)) {
        me.changeAnime("collected");
      }
      else if (mapAnimeCount % 5 === 1) {
        createEffect("red_glitter", randInt(me.x, me.x + 24), randInt(me.y, me.y + 24), 0, 0);
      }
    },
    "obtained": (me) => {
      collectedMedal[1] = true;
      if (isMedalcollected(stageId, 1)) {
        collectedCoins += 10;
      }
      else {
        for (let i = 0; i < 8; i++) {
          createEffect("red_glitter_slow", me.x + 12, me.y + 12, Math.cos(2*Math.PI*i/8) * 4, Math.sin(2*Math.PI*i/8) * 4);
        }
      }
    }
  },
  "Z": { // medal 2 (boss)
    "type": "medal",
    "w": 32,
    "h": 32,
    "box" : [6, 6, 25, 25],
    "hit" : [6, 6, 25, 25],
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
        if (mapAnimeCount % 5 === 1 && !isMedalcollected(stageId, 2)) {
          createEffect("red_glitter", randInt(me.x, me.x + 24), randInt(me.y, me.y + 24), 0, 0);
        }
      }
      if (isMedalcollected(stageId, 2)) {
        me.changeAnime("collected");
      }
      me.y += me.dy;
    },
    "obtained": (me) => {
      collectedMedal[2] = true;
      if (isMedalcollected(stageId, 2)) {
        collectedCoins += 10;
      }
      else {
        for (let i = 0; i < 8; i++) {
          createEffect("red_glitter_slow", me.x + 12, me.y + 12, Math.cos(2*Math.PI*i/8) * 4, Math.sin(2*Math.PI*i/8) * 4);
        }
      }
    }
  },
};

let itemKeyList = Object.keys(itemData);

let createItem = (itemId, x, y) => {
  let newItem = new CharacterSprite(
    itemId, // id
    itemData[itemId].type, // type
    x, // start position x
    y, // start position y
    itemData[itemId].w, // width
    itemData[itemId].h, // height
    itemData[itemId].box[0], // hit box (map)
    itemData[itemId].box[1],
    itemData[itemId].box[2],
    itemData[itemId].box[3],
    itemData[itemId].hit[0], // hit box (character)
    itemData[itemId].hit[1],
    itemData[itemId].hit[2],
    itemData[itemId].hit[3],
    1, // hp
    itemData[itemId].img, // sprite sheet
    animeData[itemData[itemId].anime]
  );
  itemArray.push(newItem);
  return newItem;
};

  // ============== //
 //  gimmick data  //
// ============== //
const gimmickData = {
  // 上下に動く床
  "{" : {
    "type": "floor",
    "w": 32,
    "h": 32,
    "box" : [0, 0, 31, 5],
    "hit" : [0, 0, 31, 5],
    "img": imgMoveFloor,
    "anime": "movefloor",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, me.initParam * 60);  
      }
      me.setParam(0, (me.getParam(0) + 1) % 240);
      me.dy = (Math.cos(2 * Math.PI * (me.getParam(0) + 1) / 240) - Math.cos(2 * Math.PI * me.getParam(0) / 240)) * 32;
      //me.dx = (Math.sin(2 * Math.PI * (me.param + 1) / 240) - Math.sin(2 * Math.PI * me.param / 240)) * 32;
      me.x += me.dx;
      me.y += me.dy;
    },
  },
  // 左右に動く床（壁で跳ね返る）
  "}" : {
    "type": "floor",
    "w": 48,
    "h": 16,
    "box" : [0, 0, 46, 5],
    "hit" : [0, 0, 46, 5],
    "img": imgCloudLift,
    "anime": "cloudlift",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
        me.direction = me.initParam === 0 ? "left" : "right";  
      }
      if (isTouchingLeftWall(me)) {
        me.direction = "right";
      }
      else if (isTouchingRightWall(me)) {
        me.direction = "left";
      }
      me.dx = me.direction === "left" ? -0.5 : 0.5;
      me.x += me.dx;
      me.y += me.dy;
    }
  },
  // 動く床を同じ行に発生させる装置
  "Æ" : { // alt + shift + * 
    "type": "floorgen",
    "w": 0,
    "h": 0,
    "box" : [0, 0, 0, 0],
    "hit" : [0, 0, 0, 0],
    "img": null,
    "anime": null,
    "move": (me) => {
      if (me.initParam === 0) me.initParam = 5; // initParam = 発生間隔（指定しない場合は5）
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
        me.direction = "left";
        for (let i = 0; i <= mapWidth / me.initParam + 1; i++) {
          createGimmick("minicloud", mapWidth * gridSize - (i * gridSize * me.initParam), me.y).direction = me.direction;
        }
      }
      if (me.incParam(0) > me.initParam * gridSize / 0.5) {
        me.setParam(0, 0);
        createGimmick("minicloud", mapWidth * gridSize, me.y).direction = me.direction;
      }
    }
  },
  "æ" : { // alt + * 
    "type": "floorgen",
    "w": 0,
    "h": 0,
    "box" : [0, 0, 0, 0],
    "hit" : [0, 0, 0, 0],
    "img": null,
    "anime": null,
    "move": (me) => {
      if (me.initParam === 0) me.initParam = 5; // initParam = 発生間隔（指定しない場合は5）
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
        me.direction = "right";
        for (let i = 0; i <= mapWidth / me.initParam + 1; i++) {
          createGimmick("minicloud", i * gridSize * me.initParam - 32, me.y).direction = me.direction;
        }
      }
      if (me.incParam(0) > me.initParam * gridSize / 0.5) {
        me.setParam(0, 0);
        createGimmick("minicloud", -32, me.y).direction = me.direction;
      }
    }
  },
  // 左（右）に動き続ける床（Æ,æから発生）
  "minicloud" : {
    "type": "floor",
    "w": 32,
    "h": 16,
    "box" : [0, 0, 31, 5],
    "hit" : [0, 0, 31, 5],
    "img": imgCloudLiftSmall,
    "anime": "cloudliftsmall",
    "move": (me) => {
      me.dx = me.direction === "left" ? -0.5 : 0.5;
      me.x += me.dx;
      me.y += me.dy;
      if (me.x < - 96) me.hp = 0;
      if (me.x > mapWidth * gridSize + 64) me.hp = 0;
    }
  },
  // 爆風（びっくりブロック破壊時に発生）
  "bakufu" : {
    "type": "explode",
    "w": 16,
    "h": 16,
    "box" : [0, 0, 15, 15],
    "hit" : [0, 0, 15, 15],
    "img": null,
    "anime": null,
    "move": (me) => {
      me.isNoHit = true;
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
        createEffect("miniexplode", me.x, me.y, 0, 0)
        for (let i = 0; i < 2; i++) {
          createEffect("miniblock", me.lTopX() + ((me.rbx - me.ltx) - 8) / 2, me.lTopY() + ((me.rby - me.lty) - 8) / 2, randInt(0, 150) * 0.01 * (i % 2 * 2 - 1), randInt(50, 300) * -0.01);
        }
      }
      if (me.incParam(0) === 8) {
        me.hp = 0;
        let neighborX = [0, 1, 0, -1];
        let neighborY = [1, 0, -1, 0];
        for (let i = 0; i < 4; i++) {
          let neighborMapchip = getMapSubType(me.x + 16 * neighborX[i], me.y + 16 * neighborY[i]);
          if (neighborMapchip != "hard" && neighborMapchip != "hard_coin" && neighborMapchip != "bomb") continue;
          createGimmick("bakufu", me.x + 16 * neighborX[i], me.y + 16 * neighborY[i]);
          replaceMap(me.x / 16 + neighborX[i], me.y / 16 + neighborY[i], neighborMapchip === "hard_coin" ? '¥' : '.');
        }
      }
    }
  },
};

let gimmickKeyList = Object.keys(gimmickData);

let createGimmick = (gimmickId, x, y) => {
  let newGimmick = new CharacterSprite(
    gimmickId, // id
    gimmickData[gimmickId].type, // type
    x, // start position x
    y, // start position y
    gimmickData[gimmickId].w, // width
    gimmickData[gimmickId].h, // height
    gimmickData[gimmickId].box[0], // hit box (map)
    gimmickData[gimmickId].box[1],
    gimmickData[gimmickId].box[2],
    gimmickData[gimmickId].box[3],
    gimmickData[gimmickId].hit[0], // hit box (character)
    gimmickData[gimmickId].hit[1],
    gimmickData[gimmickId].hit[2],
    gimmickData[gimmickId].hit[3],
    1, // hp
    gimmickData[gimmickId].img, // sprite sheet
    animeData[gimmickData[gimmickId].anime]
  );
  gimmickArray.push(newGimmick);
  return newGimmick;
};

  // ============== //
 //  effect data   //
// ============== //
let effectData = {
  "explode": {
    "w": 32,
    "h": 32,
    "img": imgExplode,
    "anime": "explode",
    "move": "stop"
  },
  "miniexplode": {
    "w": 16,
    "h": 16,
    "img": imgMiniExplode,
    "anime": "miniexplode",
    "move": "stop"
  },
  "red_glitter": {
    "w": 8,
    "h": 8,
    "img": imgRedGlitter,
    "anime": "glitter",
    "move": "stop"
  },
  "red_glitter_slow": {
    "w": 8,
    "h": 8,
    "img": imgRedGlitter,
    "anime": "glitter_slow",
    "move": "slowy"
  },
  "yellow_glitter": {
    "w": 8,
    "h": 8,
    "img": imgYellowGlitter,
    "anime": "glitter",
    "move": "stop"
  },
  "yellow_glitter_slow": {
    "w": 8,
    "h": 8,
    "img": imgYellowGlitter,
    "anime": "glitter_slow",
    "move": "slowy"
  },
  "star": {
    "w": 8,
    "h": 8,
    "img": imgStar,
    "anime": "star",
    "move": "gravity"
  },
  "bomb_type1": {
    "w": 32,
    "h": 32,
    "img": imgBombEffect,
    "anime": "bomb_type1",
    "move": "stop"
  },
  "bomb_type2": {
    "w": 32,
    "h": 32,
    "img": imgBombEffect,
    "anime": "bomb_type2",
    "move": "stop"
  },
  "miniblock": {
    "w": 8,
    "h": 8,
    "img": imgMiniBlock,
    "anime": "miniblock",
    "move": "gravity"
  },
  "satelite_fade": {
    "w": 16,
    "h": 16,
    "img": imgWatageSatelite,
    "anime": "watage_satelite_fade",
    "move": "behind"
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
  return newEffect;
};

let createEffectSub = (effectId, x, y, dx, dy) => {
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
  effectSubArray.push(newEffect);
  return newEffect;
};

  //---------------//
 //   shop/tool   //
//---------------//
let shopScene = "enter";
let merchan;
let cursorSprite;
let shelf = [];
let shopCursor = 0;
let toolCursor = 0;

let isAlreadyBought = (toolId) => { // 購入済みかどうか確かめる
  return saveDataObject["tool"].hasOwnProperty(toolId);
};

const toolData = {
  "lifeup1" : {
    anime: "lifeup",
    price: 10,
    name: "ライフアップ",
    explain_merchan: "最大HPが1増えるよー",
    explain_normal: "最大HP+1",
    sell_condition : () => {
      return true;
    },
    effect: () => {
      plcMaxHp += 1;
    }
  },
  "lifeup2" : {
    anime: "lifeup",
    price: 200,
    name: "ライフアップ",
    explain_merchan: "最大HPが1増えるよー",
    explain_normal: "最大HP+1",
    sell_condition : () => {
      return (saveDataObject.progress > 1 && isAlreadyBought("lifeup1"));
    },
    effect: () => {
      plcMaxHp += 1;
    }
  },
  "lifeup3" : {
    anime: "lifeup",
    price: 1000,
    name: "ライフアップ",
    explain_merchan: "最大HPが1増えるよー",
    explain_normal: "最大HP+1",
    sell_condition : () => {
      return (saveDataObject.progress > 2 && isAlreadyBought("lifeup2"));
    },
    effect: () => {
      plcMaxHp += 1;
    }
  },
  "shotup1" : {
    anime: "shotup",
    price: 300,
    name: "ショット威力アップ",
    explain_merchan: "与えるダメージが増えるよー",
    explain_normal: "与ダメージ増加",
    sell_condition : () => {
      return true;
    },
    effect: () => {
      shotPower += 1;
    }
  },
  "dummy1" : {
    anime: "default",
    price: 999999,
    name: "ダミーアイテム",
    explain_merchan: "なにこれー？",
    explain_normal: "なんじゃこりゃ",
    sell_condition : () => {
      return false;
    },
    effect: () => {
    }
  },
  "dummy2" : {
    anime: "default",
    price: 999999,
    name: "ダミーアイテム",
    explain_merchan: "なにこれー？",
    explain_normal: "なんじゃこりゃ",
    sell_condition : () => {
      return false;
    },
    effect: () => {
    }
  },
  "dummy3" : {
    anime: "default",
    price: 999999,
    name: "ダミーアイテム",
    explain_merchan: "なにこれー？",
    explain_normal: "なんじゃこりゃ",
    sell_condition : () => {
      return false;
    },
    effect: () => {
    }
  },
  "dummy4" : {
    anime: "default",
    price: 999999,
    name: "ダミーアイテム",
    explain_merchan: "なにこれー？",
    explain_normal: "なんじゃこりゃ",
    sell_condition : () => {
      return false;
    },
    effect: () => {
    }
  },
  "dummy5" : {
    anime: "default",
    price: 999999,
    name: "ダミーアイテム",
    explain_merchan: "なにこれー？",
    explain_normal: "なんじゃこりゃ",
    sell_condition : () => {
      return false;
    },
    effect: () => {
    }
  },
  "dummy6" : {
    anime: "default",
    price: 999999,
    name: "ダミーアイテム",
    explain_merchan: "なにこれー？",
    explain_normal: "なんじゃこりゃ",
    sell_condition : () => {
      return false;
    },
    effect: () => {
    }
  }
};

const toolDataKeys = Object.keys(toolData);

let drawToolImage = (ctx, toolId, x, y) => {
  if (toolDataKeys.indexOf(toolId) === -1) return;
  let toolSprite = new Sprite(toolId, x, y, 32, 32, imgTool, animeData["tool"]);
  toolSprite.changeAnime(toolData[toolId].anime);
  toolSprite.drawShadow(ctx, x + 2, y + 2);
  toolSprite.drawAnime(ctx, x, y);
};

let applyToolEffect = (toolId) => {
  toolData[toolId].effect();
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
let acceptKeyInput = true;

// pressed key
window.onkeydown = function (e) {
  if (e.defaultPrevented) return false;
  // read pressed key
  if (e.code === "ArrowUp" || e.code === "KeyK" || e.code === "KeyW") {
    if (keyInput.indexOf("u") == -1) keyInput.push("u");
  }
  if (e.code === "ArrowDown" || e.code === "KeyJ" || e.code === "KeyS") {
    if (keyInput.indexOf("d") == -1) keyInput.push("d");
  }
  if (e.code === "ArrowLeft" || e.code === "KeyH" || e.code === "KeyA") {
    if (keyInput.indexOf("l") == -1) keyInput.push("l");
  }
  if (e.code === "ArrowRight" || e.code === "KeyL" || e.code === "KeyD") {
    if (keyInput.indexOf("r") == -1) keyInput.push("r");
  }
  if (e.code === "KeyZ" || e.code === "Enter" || e.code === "Space") {
    if (keyInput.indexOf("z") == -1) keyInput.push("z");
  }
  if (e.code === "KeyX" || e.code === "IntlRo" || e.code === "ShiftRight") {
    if (keyInput.indexOf("x") == -1) keyInput.push("x");
  }
  if (e.code === "KeyQ") {
    if (keyInput.indexOf("q") == -1) keyInput.push("q");
  }
  // prevent default key input
  if (!e.metaKey && !e.shiftKey && !e.ctrlKey){
    e.preventDefault();
  }
};

// released key
window.onkeyup = function (e) {
  if (e.defaultPrevented) return false;
  // read released key
  let idx;
  if (e.code === "ArrowUp" || e.code === "KeyK" || e.code === "KeyW") {
    idx = keyInput.indexOf("u");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "ArrowDown" || e.code === "KeyJ" || e.code === "KeyS") {
    idx = keyInput.indexOf("d");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "ArrowLeft" || e.code === "KeyH" || e.code === "KeyA") {
    idx = keyInput.indexOf("l");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "ArrowRight" || e.code === "KeyL" || e.code === "KeyD") {
    idx = keyInput.indexOf("r");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "KeyZ" || e.code === "Enter" || e.code === "Space") {
    idx = keyInput.indexOf("z");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "KeyX" || e.code === "IntlRo" || e.code === "ShiftRight") {
    idx = keyInput.indexOf("x");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "KeyQ") {
    idx = keyInput.indexOf("q");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  // prevent default key input
  if (!e.metaKey && !e.shiftKey && !e.ctrlKey){
    e.preventDefault();
  }
};

// ボタンが押下されているか調べる
let isKeyPressed = function(key) {
  if (!acceptKeyInput) return false;
  return (keyPressed.indexOf(key) != -1);
};

// "今のフレームで"ボタンが押下されたか調べる
let isKeyPressedNow = function(key) {
  if (!acceptKeyInput) return false;
  return (keyPressed.indexOf(key) != -1 && keyPressedPrevious.indexOf(key) === -1);
};

   //=====================//
  //  Scene List         //
 //=====================//
let sceneList = {
  ////---------------//
  ///    title      ///
  //---------------////
  "title": {
    "init" : async () => {
      // drawing
      backgCtx.fillStyle = "#2a2349";
      backgCtx.fillRect(0, 0, backgLay.width, backgLay.height);
      backgCtx.fillStyle = "#fff9e4";
      backgCtx.textAlign = "left";
      backgCtx.textBaseline = "top";
      let displayText = "アクションゲーム（仮）";
      let displaySize = backgCtx.measureText(displayText);
      backgCtx.fillText(displayText, Math.floor((backgLay.width - displaySize.width) / 2), 64);
      displayText = "Zキーで 始めます";
      displaySize = backgCtx.measureText(displayText);
      backgCtx.fillText(displayText, Math.floor((backgLay.width - displaySize.width) / 2), 160);
      plc.changeAnime("run_r");
      // set transition animation
      setOverlayScene("transout");
      return 0;
    },
    "update" : () => {
      // draw animation
      plc.updateAnime();
      plc.drawShadow(charaCtx, Math.floor((charaLay.width - plc.w) / 2 + 2), Math.floor((charaLay.height - plc.h) / 2 + 2));
      plc.drawAnime(charaCtx, Math.floor((charaLay.width - plc.w) / 2), Math.floor((charaLay.height - plc.h) / 2));
      if (sceneOverLay != "none") return;
      // press z key
      if (isKeyPressedNow("z")) {
        // start game
        setTransition("stageselect");
      }
      // erase data
      if (keyInput.indexOf("x") != -1) {
        dataResetCount++;
        useriCtx.fillStyle = "#c16c5b";
        useriCtx.fillRect(0, 220, dataResetCount * 2, 8);
        useriCtx.fillStyle = "#bebbb2";
        useriCtx.fillText("X長押しでデータ消去", 0, 204); 
        if (dataResetCount > 160) {
          collectedCoins = 0;
          dataResetCount = 0;
          createNewSaveData(currentSaveData);
          setTransition("title");
        }
      }
      else {
        dataResetCount = 0;
      }
    }
  },
  ////---------------//
  ///  stageselect  ///
  //---------------////
  "stageselect" : {
    "init" : async () => {
      // load save data
      await readSaveData(currentSaveData);
      modifySaveData();
      collectedCoins = saveDataObject["coins"];
      ssCursorL = new Sprite("c",  3 * gridSize, 6 * gridSize, 32, 64, imgSSCursorL, animeData["sscursor"]);
      ssCursorR = new Sprite("c", 15 * gridSize, 6 * gridSize, 32, 64, imgSSCursorR, animeData["sscursor"]);
      // パラメータを装備アイテム適用前のデフォルト値に設定
      plcMaxHp = 3;
      shotPower = 2;
      // カーソル位置がおかしかったら修正
      if (stageId > saveDataObject.progress) {
        stageId = 0;
      }
      // アイテム効果を反映
      let ownToolKeys = Object.keys(saveDataObject["tool"]);
      ownToolKeys.forEach((e) => {
        if (toolDataKeys.indexOf(e) === -1) return; // 変なアイテムが保存されていたら弾く
        if (!saveDataObject["tool"][e].is_activated) return;
        applyToolEffect(e);
      });
      plc.hp = plcMaxHp;
      //backgCtx.fillStyle = "#4f2b24"; // 赤茶色
      backgCtx.fillStyle = "#4180a0"; // 青色
      backgCtx.fillRect(0, 0, 320, 240);
      setOverlayScene("transout");
      return 0;
    },
    "update" : () => {
      // drawing
      useriCtx.fillStyle = "#fff9e4";
      useriCtx.textAlign = "left";
      useriCtx.textBaseline = "top";
      // ---- stage number
      let displayText = "Stage " + (stageId + 1);
      let displaySize = useriCtx.measureText(displayText);
      useriCtx.fillText(displayText, Math.floor((useriLay.width - displaySize.width) / 2), 32);
      // ---- stage name
      if (stageId < stageData.length) {
        displayText = "- " + stageData[stageId].name + " -";
      }
      else {
        displayText = "- ただいま製作中！ -";
      }
      displaySize = useriCtx.measureText(displayText);
      useriCtx.fillText(displayText, Math.floor((useriLay.width - displaySize.width) / 2), 48);
      // ---- thumbnail
      if (stageId < stageData.length) {
        useriCtx.drawImage(imgThumbnail, stageId * 128, 0, 128, 96, Math.floor((useriLay.width - 128) / 2), 80, 128, 96);
      }
      else {
        useriCtx.drawImage(imgWip, 0, 0, 128, 96, Math.floor((useriLay.width - 128) / 2), 80, 128, 96);
      }
      // ---- cursor
      ssCursorL.updateAnime();
      ssCursorR.updateAnime();
      if (stageId > 0) {
        ssCursorL.drawShadow(useriCtx, ssCursorL.x + 2, ssCursorL.y + 2);
        ssCursorL.drawAnime(useriCtx, ssCursorL.x, ssCursorL.y);
      }
      if (stageId < saveDataObject.progress) {
        ssCursorR.drawShadow(useriCtx, ssCursorR.x + 2, ssCursorR.y + 2);
        ssCursorR.drawAnime(useriCtx, ssCursorR.x, ssCursorR.y);
      }
      // ---- medal
      if (stageId < stageData.length) {
        for (let i = 0; i < 3; i++) {
          useriCtx.drawImage(imgSSMedal, isMedalcollected(stageId, i) * 32, 0, 32, 32, 112 + 32 * i , 186, 32, 32);
        }
      }
      // ---- heart & coins
      for (let i = 0; i < plcMaxHp; i++) {
        useriCtx.drawImage(imgUiHeart, 0, 0, 16, 16, i * gridSize, 0, 16, 16);
      }
      useriCtx.fillText(Math.ceil(collectedCoins).toString().padStart(4, "0"), gridSize, gridSize - 2);
      useriCtx.drawImage(imgUiCoin, 0, 0, 16, 16, 0, 16 - 2, 16, 16);
      // ---- options
      if (saveDataObject.progress > 0) useriCtx.drawImage(imgOption, useriLay.width - 48, 0);
      // トランジション中はキー入力無効
      if (sceneOverLay != "none") return;
      // key input
      if (isKeyPressedNow("l") && stageId > 0) { // previous stage
        stageId--;
      }
      else if (isKeyPressedNow("r") && stageId < saveDataObject.progress) { // next stage
        stageId++;
      }
      else if (isKeyPressedNow("x")) { // back to title
        setTransition("title");
      }
      else if (isKeyPressedNow("z") && stageId < stageData.length) { // start game
        // reset level status
        collectedMedal = [false, false, false];
        collectedKey = [false, false, false];
        collectedKeyNum = 0;
        changedMapList.length = 0;
        plc.hp = plcMaxHp;
        levelName = stageData[stageId].level;
        levelStart = "A";
        coinCounter = collectedCoins;
        // start game
        setTransition("game");
      }
      else if (isKeyPressedNow("u") && saveDataObject.progress > 0) { // shop
        setTransition("shop");
      }
      else if (isKeyPressedNow("d") && saveDataObject.progress > 0) { // tool list
        setTransition("toollist");
      }
    }
  },
  ////---------------//
  /// shop          ///
  //---------------////
  "shop" : {
    "init" : async () => {
      // シーンリセット
      shopScene = "enter";
      shopCursor = 0;
      merchan = new Sprite("merchan", 180, 120, 64, 64, imgMerchan, animeData["merchan"]);
      cursorSprite = new Sprite("tool_cursor", 24, 120, 48, 48, imgToolCursor, animeData["toolcursor"]);
      // 品揃えの更新
      shelf.length = 0;
      toolDataKeys.forEach((e) => {
        if (shelf.length >= 4) return;
        if (!toolData[e].sell_condition()) return;
        if (isAlreadyBought(e)) return;
        shelf.push(e);
      });
      while (shelf.length < 4) {
        shelf.push("no_item");
      }
      // 背景
      backgCtx.fillStyle = "#2a2349";
      backgCtx.drawImage(imgShopBg, 0, 0);
      setOverlayScene("transout");
      return 0;
    },
    "update" : async () => {
      let serifuX = 16;
      let serifuY = 32;
      let toolOnCursor = shelf[shopCursor] === "no_item" ? -1 : toolData[shelf[shopCursor]];
      // 文字描画設定
      // ---- 吹き出しの中（キャラクターレイヤー・紺色）
      charaCtx.textBaseline = "top";
      charaCtx.textAlign = "left";
      charaCtx.fillStyle = "#2a2349";
      // ---- その他（UIレイヤー・白）
      useriCtx.textBaseline = "top";
      useriCtx.textAlign = "left";
      useriCtx.fillStyle = "#fff9e4";
      // お金
      useriCtx.fillText(saveDataObject["coins"].toString().padStart(4, "0"), gridSize, 0);
      useriCtx.drawImage(imgUiCoin, 0, 0, 16, 16, 0, 0, 16, 16);
      // まーちゃん
      merchan.updateAnime();
      merchan.drawAnime(charaCtx, 240, 144);
      // カーソル
      cursorSprite.updateAnime();
      if (shopScene != "enter" && shopScene != "exit") {
        cursorSprite.drawAnime(useriCtx, 24 + 48 * shopCursor, 112);
      }
      // 品揃え
      for (let i = 0; i < shelf.length; i++) {
        if (shelf[i] === "no_item") continue;
        drawToolImage(charaCtx, shelf[i], 32 + i * 48, 120);
        let priceText = toolData[shelf[i]].price.toString();
        let priceSize = useriCtx.measureText(priceText);
        useriCtx.fillText(priceText, 32 + i * 48 + (16 - priceSize.width / 2), 156);
      }
      // シーンごとの描画・操作
      if (shopScene === "enter") { // シーン：入店
        merchan.changeAnime("happy");
        charaCtx.fillText("ごゆっくりー", serifuX, serifuY);
        if (isKeyPressedNow("z")) {
          shopScene = "choose";
        }
      }
      else if (shopScene === "choose") { // シーン：商品選択
        merchan.changeAnime("normal");
        if (toolOnCursor === -1) {
          charaCtx.fillText("そこには何もないよー", serifuX, serifuY);  
        }
        else {
          charaCtx.fillText(toolOnCursor.name, serifuX, serifuY);
          charaCtx.fillText(toolOnCursor.explain_merchan, serifuX, serifuY + 16);
        }
        if (isKeyPressedNow("l") && shopCursor > 0) {
          shopCursor--;
        }
        else if (isKeyPressedNow("r") && shopCursor < 3) {
          shopCursor++;
        }
        else if (isKeyPressedNow("z") && toolOnCursor != -1) {
          shopScene = "select";
        }
        else if (isKeyPressedNow("x")) {
          shopScene = "exit";
        }
      }
      else if (shopScene === "select") { // シーン：購入確認
        charaCtx.fillText(toolOnCursor.name + "は" + toolOnCursor.price + "コインだよー どうする？", serifuX, serifuY);
        charaCtx.fillText("Z:買う    X:やめる", serifuX, serifuY + 16);
        if (isKeyPressedNow("z")) { 
          if (saveDataObject["coins"] < toolOnCursor.price) {
            shopScene = "tarinai";
          }
          else { // 購入処理はここで行う
            saveDataObject["tool"][shelf[shopCursor]] = { is_activated : true };
            saveDataObject["coins"] -= toolOnCursor.price;
            shelf[shopCursor] = "no_item";
            shopScene = "okaiage";
          }
        }
        else if (isKeyPressedNow("x")) {
          shopScene = "choose";
        }
      }
      else if (shopScene === "tarinai") { // シーン：お金足りない
        merchan.changeAnime("bad");
        charaCtx.fillText("コインが足りないよー……", serifuX, serifuY);
        if (isKeyPressedNow("z")) {
          shopScene = "choose";
        }
      }
      else if (shopScene === "okaiage") { // シーン：お買い上げ
        merchan.changeAnime("happy");
        charaCtx.fillText("まいどありー♪", serifuX, serifuY);
        if (isKeyPressedNow("z")) {
          shopScene = "choose";
        }
      }
      else { // シーン：退店
        merchan.changeAnime("happy");
        charaCtx.fillText("またねー", serifuX, serifuY);
        if (isKeyPressedNow("z")) {
          writeSaveData(currentSaveData);
          setTransition("stageselect");
        }
      }
    }
  },
  ////---------------//
  /// tool list     ///
  //---------------////
  "toollist" : {
    "init" : async () => {
      // 変数リセット
      toolCursor = 0;
      cursorSprite = new Sprite("tool_cursor", 24, 120, 48, 48, imgToolCursor, animeData["toolcursor"]);
      // 背景描画
      backgCtx.fillStyle = "#4180a0"; // 青色
      backgCtx.fillRect(0, 0, 320, 240);
      backgCtx.fillStyle = "#fff9e4"; // 白色
      backgCtx.textAlign = "left";
      backgCtx.textBaseline = "top";
      backgCtx.fillText("● 装備アイテム一覧 ●", 8, 4);
      backgCtx.fillStyle = "#bebbb2"; // 灰色
      backgCtx.fillText("[Z] ON/OFF 切り替え    [X] 保存して終了", 8, 20);
      setOverlayScene("transout");
      return 0;
    },
    "update" : () => {
      // 装備アイテムリスト
      charaCtx.fillStyle = "#32535f";
      for (let i = 0; i < toolDataKeys.length; i++) {
        let toolDrawX = (i % 5) * 48 + 48;
        let toolDrawY = Math.floor(i / 5) * 48 + 64;
        if (!isAlreadyBought(toolDataKeys[i])) {
          charaCtx.fillRect(toolDrawX, toolDrawY, 32, 32);
        }
        else {
          drawToolImage(charaCtx, toolDataKeys[i], toolDrawX, toolDrawY);
          if (saveDataObject["tool"][toolDataKeys[i]].is_activated) {
            useriCtx.drawImage(imgCheckMark, toolDrawX + 24, toolDrawY - 8);
          }
        }
      }
      // 説明文
      useriCtx.textAlign = "left";
      useriCtx.textBaseline = "top";
      useriCtx.fillStyle = "fff9e4";
      if (isAlreadyBought(toolDataKeys[toolCursor])) {
        let toolNameSize = useriCtx.measureText(toolData[toolDataKeys[toolCursor]].name);
        useriCtx.fillText(toolData[toolDataKeys[toolCursor]].name, 16, 180);
        useriCtx.fillText(toolData[toolDataKeys[toolCursor]].explain_normal, 16, 196);
        if (saveDataObject["tool"][toolDataKeys[toolCursor]].is_activated) {
          useriCtx.drawImage(imgCheckMark, 16 + toolNameSize.width + 24, 180);
        }
      }
      else {
        useriCtx.fillText("???", 16, 180);
        useriCtx.fillText("まだ持っていない……", 16, 196);
      }
      // カーソル
      cursorSprite.updateAnime();
      cursorSprite.drawAnime(charaCtx, (toolCursor % 5) * 48 + 40, Math.floor(toolCursor / 5) * 48 + 56);
      // カーソル操作（ゴミ実装注意！！）
      if (isKeyPressedNow("u") || isKeyPressedNow("d")) {
        toolCursor = (toolCursor + 5) % 10; 
      }
      else if (isKeyPressedNow("l")) {
        toolCursor--;
        if (toolCursor === 4) toolCursor = 9;
        if (toolCursor === -1) toolCursor = 4;
      }
      else if (isKeyPressedNow("r")) {
        toolCursor++;
        if (toolCursor === 5) toolCursor = 0;
        if (toolCursor === 10) toolCursor = 5;
      }
      else if (isKeyPressedNow("z") && (isAlreadyBought(toolDataKeys[toolCursor]))) {
         saveDataObject["tool"][toolDataKeys[toolCursor]].is_activated = !saveDataObject["tool"][toolDataKeys[toolCursor]].is_activated;
      }
      else if (isKeyPressedNow("x")) {
        writeSaveData(currentSaveData);
        setTransition("stageselect");
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
      gimmickArray = [];
      effectArray = [];
      effectSubArray = [];
      doorArray = [];
      // 時は動き出す……
      stopFlag = false;
      yarareAnimeCounter = 0;
      clearAnimeCounter = 0;
      // ボス戦前にリセット
      bossBattlePhase = "none";
      // get level data
      try {
        await getLevelData(levelName);
      }
      catch {
        console.log("エラー：ステージ", levelName , "が見つかりません!")
        await getLevelData("test");
      }
      // respawn plc
      if (plc.hp <= 0) {
        plc.hp = plcMaxHp;
        collectedCoins -= 10;
        if (collectedCoins < 0) collectedCoins = 0;
      }
      plc.dx = 0;
      plc.dy = 0;
      plc.px = 0;
      plc.py = 0;
      plc.rx = 0;
      plc.ry = 0;
      plc.direction = "right";
      plc.reaction = 0;
      // create Character Objects
      let newCharacter;
      for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
          // player
          if (mapData[y][x] === levelStart) {
            plc.x = x * gridSize;
            plc.y = y * gridSize;
          }
          // door
          if (mapData[y][x] === "@" || mapData[y][x] === "∆") {
            doorArray.push({ x: x, y: y, next: nextData.pop() });
          }
          // item
          if (itemKeyList.indexOf(mapData[y][x]) != -1) {
            newCharacter = createItem(mapData[y][x], x * gridSize, y * gridSize);
          }
          // gimmick
          if (gimmickKeyList.indexOf(mapData[y][x]) != -1) {
            newCharacter = createGimmick(mapData[y][x], x * gridSize, y * gridSize);
          }
          // enemy
          if (enemyKeyList.indexOf(mapData[y][x]) != -1) {
            newCharacter = createEnemy(mapData[y][x], x * gridSize, y * gridSize, 0, 0);
          }
          // add initial parameter (look next mapchip)
          if (x + 1 >= mapData[y].length) continue;
          if ('0' <= mapData[y][x + 1] && mapData[y][x + 1] <= '9') {
            newCharacter.initParam = parseInt(mapData[y][x + 1]);
          }  
        }
      }
      // マップの更新情報を反映
      changedMapList.forEach((e) => {
        if (e.level != levelName) return;
        replaceMap(e.x, e.y, e.replaceTo);
      });
      // initialize camera position
      cameraX = Math.floor(plc.x - charaLay.width / 2 + 8);
      cameraY = Math.floor(plc.y - charaLay.height / 2 + 8);
      // draw background
      backgCtx.fillStyle = "#2a2349"; // 藍色
      //backgCtx.fillStyle = "#4f2b24"; // 赤茶色
      //backgCtx.fillStyle = "#32535f"; // 濃い青緑
      //backgCtx.fillStyle = "#74adbb"; // 水色
      backgCtx.fillRect(0, 0, 320, 240);
      // define snow effect
      snowEffect.length = levelSpecial === "snow" ? Math.floor(mapWidth * mapHeight / 12) : 0;
      for (let i = 0; i < snowEffect.length; i++) {
        snowEffect[i] = {
          x: randInt(0, mapWidth * gridSize),
          y: randInt(0, mapHeight * gridSize),
          dx: randInt(-50, 0) / 100,
          isFront: (i % 2 === 0) 
        };
      }
      // reset magma rising
      magmaTopY = mapHeight * gridSize;
      // reset time counter
      timeCounter = 0;
      // set transition animation
      setOverlayScene("transout");
      return 0;
    },
    "update" : () => {
      const plcMaxSpeedX = 1.25;
      if (!stopFlag) {
        //============================= move character ================================
        // gimmick move
        plc.riding = null;
        enemyArray.forEach( (enemy) => {enemy.riding = null;} );
        itemArray.forEach( (item) => {item.riding = null;} );
        gimmickArray.forEach((vehicle) => {
          if (gimmickData[vehicle.id].type === "floor"){
            plc.checkRiding(vehicle);
            enemyArray.forEach((enemy) => {
              if (enemyData[enemy.id].type === "normal") enemy.checkRiding(vehicle);
            });
            itemArray.forEach((item) => {
              if (itemData[item.id].type === "gravity") item.checkRiding(vehicle);
            });
          }
          gimmickData[vehicle.id].move(vehicle);
        });
        // enemy move
        enemyArray.forEach((e) => {
          enemyData[e.id].move(e);
          if (e.y > mapHeight * gridSize + 64) e.hp = 0; // 落下死
          if (e.hp <= 0 && !e.isType("boss") && !e.isType("danmaku")) { // やられた時 (ボスと弾幕を除く)
            if (e.y > mapHeight * gridSize) return;
            createEffect("explode", e.lTopX() + ((e.rbx - e.ltx) - 32) / 2, e.lTopY() + ((e.rby - e.lty) - 32) / 2, 0, 0);
            for (let i = 0; i < e.w * 2 / gridSize; i++) {
              createEffect("star", e.lTopX() + ((e.rbx - e.ltx) - 8) / 2, e.lTopY() + ((e.rby - e.lty) - 8) / 2, randInt(0, 150) * 0.01 * (i % 2 * 2 - 1), randInt(50, 300) * -0.01);
            }
          }
        });
        // item move
        itemArray.forEach((e) => {
          itemData[e.id].move(e);
          if (e.type === "gravity") {
            updateVelocity(e);
            moveAndCheckCollisionWithMap(e);
          }
        });
        // effect move
        effectArray.forEach((e) => {
          e.x += e.dx;
          e.y += e.dy;
          if (effectData[e.id].move === "gravity") {
            e.dy += 0.125;
          }
          else if (effectData[e.id].move === "slowy") {
            e.dx *= 0.90;
            e.dy *= 0.90;
          }
        });
        // magma move
        magmaTopY -= magmaSpeed;
        
        //============================ erase character ================================
        // erase enemy
        enemyArray = enemyArray.filter((e) => {
          return (e.hp > 0 || (enemyData[e.id].type === "boss" && bossBattlePhase != "end"));
        });
        // erase item
        itemArray = itemArray.filter((e) => {
          return e.hp > 0;
        });
        // erase item
        gimmickArray = gimmickArray.filter((e) => {
          return e.hp > 0;
        });
        // erase effect
        effectArray = effectArray.filter((e) => {
          return e.isEndAnime() === false;
        });

        //============================ player character ================================
        // *********************
        // player character move
        // *********************
        // hit wall -> stop
        if ((isTouchingLeftWall(plc) && plc.dx < 0) || (isTouchingRightWall(plc) && plc.dx > 0)) {
          plc.dx = 0;
        }
        if (isHeading(plc) && plc.dy < 0) {
          plc.dy = 0;
        }
        // key inputs
        if (isOnLand(plc) || plc.riding != null) {
          plc.dy = 0;
          isJumping = false;
          coyoteTime = 7;
          let accel = 0.125; // 加速度
          let decay = 0.0625; // 速度減衰量
          // 氷の上は滑りやすい
          if (getMapSubType(plc.lTopX(), plc.rBottomY() + 0.0625) === "ice" || getMapSubType(plc.rBottomX(), plc.rBottomY() + 0.0625) === "ice" ) {
            accel /= 8;
            decay /= 8;
          }
          if (isKeyPressed("l")) {
            if (plc.dx > -plcMaxSpeedX) plc.dx = Math.max(plc.dx - accel, -plcMaxSpeedX);
            plc.direction = "left";
          }
          else if (isKeyPressed("r")) {
            if (plc.dx < plcMaxSpeedX) plc.dx = Math.min(plc.dx + accel, plcMaxSpeedX);
            plc.direction = "right";
          }
          else {
            plc.dx = Math.sign(plc.dx) * (Math.abs(plc.dx) - decay > 0 ? Math.abs(plc.dx) - decay : 0);
          }
          // 最高速を超えている場合は減衰させる
          if (plc.dx < -plcMaxSpeedX) plc.dx = -plcMaxSpeedX;
          if (plc.dx >  plcMaxSpeedX) plc.dx =  plcMaxSpeedX;
          // 地形効果から受ける移動量を計算
          if (plc.riding === null) {
            movesAffectedByMap(plc);
            plc.rx = 0;
            plc.ry = 0;
          }
          // 乗っている物体の移動を反映
          plc.rideOn();
          // enter to door
          if (isKeyPressedNow("u")) {
            doorArray.forEach((e) => {
              if (plc.x + 8 < e.x * gridSize || e.x * gridSize + gridSize < plc.x + 8) return;
              if (plc.y + 8 < e.y * gridSize || e.y * gridSize + gridSize < plc.y + 8) return;
              levelName = e["next"]["level"];
              levelStart = e["next"]["start"];
              setTransition("game");
              stopFlag = true;
            });
          }
        }
        else {
          // 慣性を移動速度に反映
          plc.dx += plc.px;
          plc.dy += plc.py;
          if (plc.dy >= 0) { // 動く足場の慣性は落下時にのみ適用
            plc.dy += plc.ry;
          }
          // 慣性リセット
          plc.px = 0;
          plc.py = 0;
          plc.ry = 0;
          if (coyoteTime <= 0) {
            plc.rx = 0;
          }
          coyoteTime--;
          // 左右移動
          if (isKeyPressed("l")) {
            if (plc.dx > -plcMaxSpeedX) plc.dx = Math.max(plc.dx - 0.0625, -plcMaxSpeedX);
            plc.direction = "left";
          }
          else if (isKeyPressed("r")) {
            if (plc.dx < plcMaxSpeedX) plc.dx = Math.min(plc.dx + 0.0625, plcMaxSpeedX);
            plc.direction = "right";
          }
          else if (isGensui){ // キーが押されていなければ減衰
            plc.dx = plc.dx > 0 ? plc.dx - 0.03125 : plc.dx < 0 ? plc.dx + 0.03125 : 0;
          }
          if (isKeyPressed("z") && isJumping) {
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
          let newShot = new CharacterSprite("shot", "p_shot", plc.x, plc.y, 16, 16, 4, 4, 11, 11, 4, 4, 11, 11, 1, imgShot, animeData["shot"]);
          newShot.dx = plc.direction === "left" ? -2 : 2;
          newShot.direction = plc.direction;
          newShot.changeAnime("shot");
          newShot.param.push(0);
          shotArray.push(newShot);
        }
        // move shot
        for (let i = 0; i < shotArray.length; i++) {
          shotArray[i].dx += Math.sign(shotArray[i].dx) * 0.0625;
          shotArray[i].x += shotArray[i].dx;
          shotArray[i].param[0]++;
          if (shotArray[i].anitype === "shot") {
            let isShotVanish = shotArray[i].param[0] >= 30; // 自然消滅
            isShotVanish |= getMapType(shotArray[i].x + 8, shotArray[i].y + 8) === "wall"; // 壁に激突
            // 敵にヒット
            enemyArray.forEach((e) => {
              if (e.isHit(shotArray[i]) && !e.isType("danmaku") && !e.isNoHitWithShot) {
                isShotVanish = true;
                if (!e.isInvincible) {
                  e.hp -= shotPower;
                  e.reaction = 20;
                }
              }
            });
            if (isShotVanish) {
              shotArray[i].dx = 0;
              shotArray[i].changeAnime("vanish");
              shotArray[i].param[0] = 0;
              // 地形破壊
              let hitMapX = Math.floor((shotArray[i].x + 8) / gridSize);
              let hitMapY = Math.floor((shotArray[i].y + 8) / gridSize);
              let hitMapSubType = getMapSubType(shotArray[i].x + 8, shotArray[i].y + 8);
              if (hitMapSubType === "block") {
                replaceMap(hitMapX, hitMapY, '.');
              }
              else if (hitMapSubType === "block_coin") {
                replaceMap(hitMapX, hitMapY, '¥');
              }
              else if (hitMapSubType === "block_heart") {
                replaceMap(hitMapX, hitMapY, '?');
              }
              else if (hitMapSubType === "block_door") {
                replaceMap(hitMapX, hitMapY, '∑');
              }
              // びっくりブロック◊
              else if (hitMapSubType === "bomb") {
                replaceMap(hitMapX, hitMapY, '.');
                createGimmick("bakufu", hitMapX * 16, hitMapY * 16, 0, 0);
              }
              // 解錠
              else if (hitMapSubType === "lock" && collectedKeyNum > 0) {
                collectedKeyNum--;
                replaceMap(hitMapX, hitMapY, '.');
                changedMapList.push( { level: levelName, x: hitMapX, y: hitMapY, replaceTo: '.'} );
                for (let j = 0; j < 4; j++) {
                  createEffect("yellow_glitter_slow", shotArray[i].x + 8, shotArray[i].y + 8, Math.cos(2*Math.PI*(j*2+1)/8) * 4, Math.sin(2*Math.PI*(j*2+1)/8) * 4);
                }
              }
              // ベルトコンベア切り替え
              else if (hitMapSubType === "reverse_switch") {
                for (let y = 0; y < mapData.length; y++) {
                  for (let x = 0; x < mapData[y].length; x++) {
                    if (mapData[y][x] === "≥") replaceMap(x, y, "≤");
                    else if (mapData[y][x] === "≤") replaceMap(x, y, "≥");
                    else if (mapData[y][x] === "»") replaceMap(x, y, "«");
                    else if (mapData[y][x] === "«") replaceMap(x, y, "»");
                  }
                }
              }
            }
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
          if (plc.hp < plcMaxHp) {
            plc.hp += 1;
          }
          else {
            collectedCoins += 5;
          }
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
          let isDamaged = (getMapSubType(plc.x + gridSize / 2, plc.y + gridSize / 2) === "damage");
          enemyArray.forEach((e) => {
            isDamaged |= (e.isHit(plc) && !e.isNoHitWithPlc);
          });
          if (isDamaged) {
            plc.reaction = invincibleTimeMax;
            if ((bossBattlePhase != "defeated") && (bossBattlePhase != "end")) plc.hp -= 1;
            plc.dx = - plc.dx;
            plc.dy = -1.5;
          };
        }
        // fall
        if (plc.y > cameraY + charaLay.height + 64) {
          plc.reaction = invincibleTimeMax;
          plc.hp = 0;
          for (let i = 0; i < 6; i++) {
            createEffectSub("star", plc.lTopX() + ((plc.rbx - plc.ltx) - 8) / 2, cameraY + charaLay.height, randInt(0, 60) * 0.01 * (i % 2 * 2 - 1), randInt(200, 500) * -0.01);
          }
        }
        // dive into magma
        if (plc.y + 12 > magmaTopY && levelSpecial === "magma") { // "12" is a magic number
          plc.reaction = invincibleTimeMax;
          plc.hp = 0;
        }
        // ぐえ〜〜
        if (plc.hp <= 0) {
          yarareAnimeCounter = 0;
          stopFlag = true;
          plc.dx = 0;
          plc.dy = 0;
          plc.px = 0;
          plc.py = 0;
        }
        // limit speed
        if (plc.dx < -4.0) plc.dx = -4.0;
        if (plc.dx >  4.0) plc.dx =  4.0;
        if (plc.dy >  4.0) plc.dy =  4.0;

        // update player position
        moveAndCheckCollisionWithMap(plc);
        
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
        // effect move
        effectSubArray.forEach((e) => {
          e.x += e.dx;
          e.y += e.dy;
          if (effectData[e.id].move === "gravity") {
            e.dy += 0.125;
          }
          else if (effectData[e.id].move === "slowy") {
            e.dx *= 0.90;
            e.dy *= 0.90;
          }
        });
        if (yarareAnimeCounter === 180) {
          setTransition("game");
        }
      }

      else if (collectedMedal[2]) {
        shotArray.length = 0;
        plc.reaction = 0;
        if (++clearAnimeCounter === 180) {
          // クリアデータを保存してステージセレクトへ
          saveDataObject["coins"] = collectedCoins;
          if (saveDataObject["progress"] <= stageId) {
            saveDataObject["progress"] = stageId + 1;
          }
          if (!saveDataObject["medal"].hasOwnProperty(stageId)) {
            saveDataObject["medal"][stageId] = collectedMedal;
          }
          else {
            for (let i = 0; i < collectedMedal.length; i++) {
              saveDataObject["medal"][stageId][i] |= collectedMedal[i];
            }
          }
          writeSaveData(currentSaveData);
          setTransition("stageselect");
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
        gimmickArray.forEach((e) => {
          e.updateAnime();
        });       
        effectArray.forEach((e) => {
          e.updateAnime();
        })
        // update camera position
        cameraX = plc.x - charaLay.width / 2 + 8;
        cameraY = plc.y - charaLay.height / 2 + 8;
        if (bossBattlePhase != "none") { // ボスバトル開戦後はx軸固定
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
      }

      // 揺れ
      if (quakeTimeX-- > 0) {
        cameraX -= (Math.floor(((quakeTimeX + 1) / 2) * 2) % 4 - 1) * 2;
      }
      if (quakeTimeY-- > 0) {
        cameraY -= ((Math.floor(quakeTimeY / 2) * 2) % 4 - 1) * 2;
      }

      // 小数点以下の誤差（動く足場の表示ずれを修正するために使用します）
      let gosaX = cameraX - Math.floor(cameraX);
      let gosaY = cameraY - Math.floor(cameraY);

      // カメラ位置を整数値に変換
      cameraX = Math.floor(cameraX);
      cameraY = Math.floor(cameraY);
      
      // change player animation
      if (!stopFlag || sceneOverLay === "pause"){
        if (isOnLand(plc) || plc.riding != null) {
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
      if (sceneOverLay != "pause") plc.updateAnime();
      
      // 雪の座標を更新，後ろの雪を描画
      charaCtx.fillStyle = "#bebbb2";
      snowEffect.forEach((e) => {
        if (!stopFlag) {
          e.x = (e.x + e.dx < 0 ? e.x + e.dx + mapWidth * gridSize : e.x + e.dx);
          e.y = (e.y + (e.isFront ? 1 : 0.8)) % (mapHeight * gridSize);
        }
        if (e.isFront) return;
        if (e.x + 1 < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + 1 < cameraY || cameraY + charaLay.height < e.y) return;
        charaCtx.fillRect(Math.floor(e.x - cameraX), Math.floor(e.y - cameraY), 2, 2);
      });

      // draw character shadow
      itemArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawShadow(charaCtx, Math.floor(e.x - cameraX + 1), Math.floor(e.y - cameraY + 1));
      }));
      gimmickArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawShadow(charaCtx, Math.floor(e.x - cameraX - gosaX + 1), Math.floor(e.y - cameraY + 1));
      }));
      enemyArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        let shake = e.reaction-- > 0 ? (((Math.floor(e.reaction / 2) * 2) % 4) - 1) : 0;
        e.drawShadow(charaCtx, Math.floor(e.x - cameraX + 1 + (e.type === "wall_stuck" ? 0 : shake)), Math.floor(e.y - cameraY + 1 + (e.type === "wall_stuck" ? shake : 0)));
      }));
      shotArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawShadow(charaCtx, Math.floor(e.x - cameraX + 1), Math.floor(e.y - cameraY + 1));
      }));
      effectArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawShadow(charaCtx, Math.floor(e.x - cameraX + 1), Math.floor(e.y - cameraY + 1));
      }));
      effectSubArray.forEach((e => {
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
          let mapAnimeFrame = mapChip[mapData[y][x]].id[Math.floor(mapAnimeCount / mapChip[mapData[y][x]].dulation) % mapChip[mapData[y][x]].id.length]
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
      effectArray.forEach((e => {
        if (effectData[e.id].move != "behind") return; // behind
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawAnime(charaCtx, Math.floor(e.x - cameraX), Math.floor(e.y - cameraY));
      }));
      itemArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawAnime(charaCtx, Math.floor(e.x - cameraX), Math.floor(e.y - cameraY));
      }));
      gimmickArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawAnime(charaCtx, Math.floor(e.x - cameraX - gosaX), Math.floor(e.y - cameraY));
      }));
      enemyArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        let shake = e.reaction > 0 ? (((Math.floor(e.reaction / 2) * 2) % 4) - 1)  : 0;
        e.drawAnime(charaCtx, Math.floor(e.x - cameraX + (e.type === "wall_stuck" ? 0 : shake)), Math.floor(e.y - cameraY + (e.type === "wall_stuck" ? shake : 0)));
      }));
      shotArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawAnime(charaCtx, Math.floor(e.x - cameraX), Math.floor(e.y - cameraY));
      }));
      effectArray.forEach((e => {
        if (effectData[e.id].move === "behind") return; // behindじゃない
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawAnime(charaCtx, Math.floor(e.x - cameraX), Math.floor(e.y - cameraY));
      }));
      effectSubArray.forEach((e => {
        if (e.x + e.w < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + e.h < cameraY || cameraY + charaLay.height < e.y) return;
        e.drawAnime(charaCtx, Math.floor(e.x - cameraX), Math.floor(e.y - cameraY));
      }));
      if (Math.floor(plc.reaction / 3) * 3 % 6 === 0 || plc.hp <= 0) plc.drawAnime(charaCtx, Math.floor(plc.x - cameraX), Math.floor(plc.y - cameraY));
      
      // 手前の雪を描画
      charaCtx.fillStyle = "#fff9e4";
      snowEffect.forEach((e) => {
        if (!e.isFront) return;
        if (e.x + 1 < cameraX || cameraX + charaLay.width < e.x) return;
        if (e.y + 1 < cameraY || cameraY + charaLay.height < e.y) return;
        charaCtx.fillRect(Math.floor(e.x - cameraX), Math.floor(e.y - cameraY), 2, 2);
      });

      // マグマの描画
      if (levelSpecial === "magma") {
        const magmaFrame = 4;
        const magmaDulation = 8;
        for (let x = 0; x <= charaLay.width / gridSize; x++) {
          charaCtx.drawImage(imgMagma[0], (Math.floor(mapAnimeCount / magmaDulation) % magmaFrame) * 16, 0, 16, 16, Math.floor(x * gridSize - cameraX % gridSize), Math.floor(magmaTopY - cameraY), gridSize, gridSize);
        }
        for (let y = 1; y <= (cameraY + charaLay.height - magmaTopY)/ gridSize; y++) {
          for (let x = 0; x <= charaLay.width / gridSize; x++) {
            charaCtx.drawImage(imgMagma[0], (Math.floor(mapAnimeCount / magmaDulation) % magmaFrame + magmaFrame) * 16, 0, 16, 16, Math.floor(x * gridSize - cameraX % gridSize), Math.floor(magmaTopY - cameraY) + y * gridSize, gridSize, gridSize);
          }
        }
      }

      // draw UI
      // hearts
      let shakeHeartX = (plc.reaction < invincibleTimeMax - 20 ? 0 : (Math.floor(plc.reaction / 4) * 4 % 8 - 2) / 2);
      let shakeHeartY = (plc.reaction < invincibleTimeMax - 20 ? 0 : (Math.floor((plc.reaction + 2) / 4) * 4 % 8 - 2) / 2);
      for (let i = 0; i < plcMaxHp; i++) {
        useriCtx.drawImage(imgUiHeart, (plc.hp > i) ? 0 : 16, 0, 16, 16, i * gridSize + shakeHeartX, shakeHeartY, 16, 16);
      }
      // medals
      for (let i = 0; i < 3; i++) {
        useriCtx.drawImage(imgUiMedal, (isMedalcollected(stageId, i) || collectedMedal[i]) ? 0 : 16, 0, 16, 16, i * gridSize + useriLay.width - 3 * gridSize, 0, 16, 16);
      }
      // coins
      let hopCoinY = 0;
      useriCtx.fillStyle = "#fff9e4";
      if (coinCounter < collectedCoins) {
        coinCounter += 0.25;
        useriCtx.fillStyle = "#fbdf9b";
        hopCoinY = 1;
      }
      else if (coinCounter > collectedCoins) {
        coinCounter -= 0.25;
        useriCtx.fillStyle = "#e89973";
        hopCoinY = 1;
      }
      useriCtx.textBaseline = "top";
      useriCtx.textAlign = "left";
      useriCtx.fillText(Math.ceil(coinCounter).toString().padStart(4, "0"), gridSize, gridSize - hopCoinY - 2);
      useriCtx.drawImage(imgUiCoin, 0, 0, 16, 16, 0, gridSize - hopCoinY - 2, 16, 16);
      // key
      if (collectedKeyNum > 0) {
        useriCtx.fillStyle = "#fff9e4";
        useriCtx.fillText(collectedKeyNum, gridSize, gridSize * 2 - 2);
        useriCtx.drawImage(imgUiKey, 0, 0, 16, 16, 0, gridSize * 2 - 2, 16, 16);
      }
      // boss hp bar
      if (bossBattlePhase === "fight") {
        // update reduce counter
        if (bossHpBarRed < bossHpBarRedPrev) {
          bossHpBarRedPrev = bossHpBarRed;
          bossHpBarReduceCounter = 32; // この値が0より大きいときは白ゲージが減らない
        }
        // reduce white bar
        if (bossHpBarWhiteReduceFlag) {
          bossHpBarWhite -= 1;
          if (bossHpBarWhite <= bossHpBarWhiteReduceto) {
            bossHpBarWhiteReduceFlag = false;
          }
        }
        else if (bossHpBarReduceCounter > 0) {
          if (--bossHpBarReduceCounter <= 0) {
            bossHpBarWhiteReduceFlag = true;
            bossHpBarWhiteReduceto = bossHpBarRed;
          }
        }
        // drawing
        useriCtx.fillStyle = "#2a2349";
        useriCtx.fillRect(0, 222, 320, 16);
        useriCtx.fillStyle = "#fff9e4";
        useriCtx.fillRect(0, 224, Math.ceil(320 * (bossHpBarWhite / bossMaxHp)), 12);
        useriCtx.fillStyle = "#c16c5b";
        useriCtx.fillRect(0, 224, Math.ceil(320 * (bossHpBarRed / bossMaxHp)), 12);
      }
      
      // time counter
      timeCounter++;
      // ポーズ画面
      if (isKeyPressedNow("q") && !stopFlag && !isResumedNow) {
        setOverlayScene("pause");
        stopFlag = true;
      }
      isResumedNow = false;
    }
  },
};

   //=======================//
  //  Over Lay Scene List  //
 //=======================//
let sceneOverLayList = {
  
  // sub scene: transin（トランジション開始）
  "transin": {
    init: () => {
      acceptKeyInput = false;
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
      if (transAnimeCount-- === 0) {
        // change scene
        setScene(sceneAfterTrans);
      }
    }
  },

  // sub scene: transout（トランジション終了）
  "transout": {
    init: () => {
      acceptKeyInput = true;
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
      if (transAnimeCount-- === 0) {
        // finish transition
        setOverlayScene("none");
      }
    }
  },

  // pause
  "pause" : {
    init: () => {

    },
    update: () => {
      // key input
      if (isKeyPressedNow("q")) { // Qでゲーム再開
        setOverlayScene("none");
        stopFlag = false;
        isResumedNow = true;
      }
      else if (keyInput.indexOf("x") != -1) { // X長押しでデータを保存してステージセレクトへ
        backToSelectCount++;
        if (backToSelectCount > 80) {
          saveDataObject["coins"] = collectedCoins;
          if (!saveDataObject["medal"].hasOwnProperty(stageId)) {
            saveDataObject["medal"][stageId] = collectedMedal;
          }
          else {
            for (let i = 0; i < collectedMedal.length; i++) {
              saveDataObject["medal"][stageId][i] |= collectedMedal[i];
            }
          }
          writeSaveData(currentSaveData);
          setTransition("stageselect");
        }
      }
      else {
        backToSelectCount = 0;
      }
      // drawing
      useriCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
      useriCtx.fillRect(0, 0, useriLay.width, useriLay.height);
      useriCtx.textAlign = "left";
      useriCtx.textBaseline = "top";
      useriCtx.fillStyle = "#fff9e4";
      let displayText = "- P A U S E -";
      let displaySize = useriCtx.measureText(displayText);
      useriCtx.fillText(displayText, Math.floor((useriLay.width - displaySize.width) / 2), 64);
      displayText = "Q: 再開    X長押し: ステージを出る";
      displaySize = useriCtx.measureText(displayText);
      useriCtx.fillText(displayText, Math.floor((useriLay.width - displaySize.width) / 2), 112);
      if (backToSelectCount > 0) {
        useriCtx.fillStyle = "#c16c5b";
        useriCtx.fillRect(0, 220, backToSelectCount * 4, 8);
        useriCtx.fillStyle = "#bebbb2";
        useriCtx.fillText("ステージを脱出！", 0, 204); 
      }
    }
  },

  // none（何もしない，でもこの処理は必要）
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
    backgCtx.clearRect(0,0,640,480);
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
  // smoothing disabled
  imageSmoothing(backgCtx, false);
  imageSmoothing(charaCtx, false);
  imageSmoothing(useriCtx, false);
  imageSmoothing(transCtx, false);
  // create shadow sprite
  Object.keys(shadowList).forEach((key) => {
    shadowList[key][1].src = createShadowURL(shadowList[key][0]);
  });
  // create Player Character
  plc = new CharacterSprite("player", "player", 0, 0, 16, 16, 3, 3, 12, 15, 3, 3, 12, 12, plcMaxHp, imgPlayer, animeData["player"]);
  // start game loop
  setInterval(gameLoop, 1000/60); // 60fps
};

// load font
font.load().then((loadedFace) => {
  console.log("フォントを読み込みました！");
  document.fonts.add(loadedFace);
  //document.body.style.fontFamily = '"MaruMonica"';
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