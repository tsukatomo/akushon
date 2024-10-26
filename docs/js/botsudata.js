// 没データ置き場

// 爆弾
let imgBomb = [new Image(), new Image()];
imgBomb[0].src = "./img/the_bomb2.png";
// ゴーレム
let imgGolemHead = [new Image(), new Image()];
imgGolemHead[0].src = "./img/golem_head.png";
let imgGolemBody = [new Image(), new Image()];
imgGolemBody[0].src = "./img/golem_body.png";
let imgGolemHand = [new Image(), new Image()];
imgGolemHand[0].src = "./img/golem_hand.png";
let imgGolemBooster = [new Image(), new Image()];
imgGolemBooster[0].src = "./img/golem_booster.png";

let botsuAnime = {
  "bomb": {
    "count_4": { frames: 2, dulation: 6, img: [0, 1], repeat: true },
    "count_3": { frames: 2, dulation: 6, img: [2, 3], repeat: true },
    "count_2": { frames: 2, dulation: 6, img: [4, 5], repeat: true },
    "count_1": { frames: 2, dulation: 6, img: [6, 7], repeat: true },
    "bomb!": { frames: 1, dulation: 8, img: [8], repeat: false },
    "default": { frames: 1, dulation: 8, img: [9], repeat: true }
  },
  "golem_head": {
    "damage": { frames: 2, dulation: 8, img: [1, 0], repeat: false },
    "yarare": { frames: 1, dulation: 8, img: [2], repeat: true },
    "default": { frames: 1, dulation: 8, img: [0], repeat: true }
  },
  "golem_body": {
    "default": { frames: 1, dulation: 8, img: [0], repeat: true }
  },
  "golem_hand": {
    "default": { frames: 1, dulation: 8, img: [0], repeat: true }
  },
  "golem_booster": {
    "default": { frames: 2, dulation: 4, img: [0, 1], repeat: true }
  },
};

let botsuObject = {
  // 爆弾
  "b": { // bomb TODO: Infinite respawn
    "type": "normal",
    "w": 32,
    "h": 32,
    "box": [6, 11, 25, 30],
    "hit": [8, 12, 23, 27],
    "hp": 9999,
    "img": imgBomb,
    "anime": "bomb",
    "move": (me) => {
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
  "bomb_bakuhu": { // 爆弾から発生する爆風
    "type": "danmaku",
    "w": 32,
    "h": 32,
    "box": [8, 8, 23, 23],
    "hit": [8, 8, 23, 23],
    "hp": 1,
    "img": imgBombEffect,
    "anime": "bomb_bakuhu",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
        me.startAnime(randInt(0, 1) === 0 ? "type_1" : "type_2");
      }
      if (me.incParam(0) > 4) {
        me.isNoHit = true;
      }
      if (me.isEndAnime()) {
        me.hp = 0;
      }
    }
  },
  "G": { // Golem (head)
    "type": "boss",
    "w": 32,
    "h": 32,
    "box": [8, 0, 16, 31],
    "hit": [12, 4, 18, 31],
    "hp": 240,
    "img": imgGolemHead,
    "anime": "golem_head",
    "move": (me) => {
      me.isNoHit = true; // 戦闘中以外衝突判定しない
      if (me.isParamEmpty()) { // 変数初期化
        me.setParam(0, 0); // 時間カウンター
        me.setParam(1, me.x); // 初期位置x
        me.setParam(2, me.y); // 初期位置y
        me.setParam(3, "wait") // 行動タグ
        me.setParam(4, 0); // 行動カウンター
        me.setParam(10, me.hp); // hp減少チェック
        // 以下、各パーツのデフォルト座標（頭部パーツから見た相対位置）
        me.setParam(31, {x: -34, y: 44}); // 右手
        me.setParam(32, {x: -16, y: 32}); // ボディ
        me.setParam(33, {x: 0, y: 96}); // ジェットブースター
        me.setParam(34, {x: 34, y: 44}); // 左手
        // 以下、各パーツのスプライト
        me.setParam(51, createEnemy("golem_hand", me.x + me.getParam(31).x, me.y + me.getParam(31).y, 0, 0)); // 右手（奥）
        me.setParam(52, createEnemy("golem_body", me.x + me.getParam(32).x, me.y + me.getParam(32).y, 0, 0)); // ボディ
        me.setParam(53, createEnemy("golem_booster", me.x + me.getParam(33).x, me.y + me.getParam(33).y, 0, 0)); // ジェットブースター
        me.setParam(54, createEnemy("golem_hand", me.x + me.getParam(34).x, me.y + me.getParam(34).y, 0, 0)); // 左手（手前）
      }
      switch (bossBattlePhase) {
        case "none":
          me.y = -128;
          me.changeAnime("default");
          break;
        case "entrance":
          me.y += 2;
          if (me.y >= me.getParam(2)) {
            initBossHpBar(me.hp);
            bossBattlePhase = "fight";
            me.y = me.getParam(2);
          }
          break;
        case "fight":
          me.isNoHit = false;
          me.incParam(4);
          if (me.getParam(3) === "wait") {
            me.x = me.getParam(1)
            me.y = me.getParam(2) + Math.sin(2 * Math.PI * (me.getParam(4) % 480) / 160) * 48; 
          }
          // アニメ
          if (me.hp < me.getParam(10)) {
            me.setParam(10, me.hp);
            me.startAnime("damage");
          }
          else if (me.reaction <= 0) {
            me.changeAnime("default");
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
        case "defeated":
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
      // 付属パーツの移動
      if (bossBattlePhase != "defeated") {
        me.incParam(0);
        // 右手
        me.getParam(51).x = me.x + me.getParam(31).x;
        me.getParam(51).y = me.y + me.getParam(31).y + Math.sin(2 * Math.PI * (me.getParam(0) % 36) /36) * 2;
        // ボディ
        me.getParam(52).x = me.x + me.getParam(32).x;
        me.getParam(52).y = me.y + me.getParam(32).y;
        // ジェットエンジン
        me.getParam(53).x = me.x + me.getParam(33).x;
        me.getParam(53).y = me.y + me.getParam(33).y;
        // 左手
        me.getParam(54).x = me.x + me.getParam(34).x;
        me.getParam(54).y = me.y + me.getParam(34).y - Math.sin(2 * Math.PI * (me.getParam(0) % 36) /36) * 2;
      }
    }
  },
  "golem_hand": { // ゴーレムの手
    "type": "boss",
    "w": 32,
    "h": 32,
    "box": [6, 6, 25, 25],
    "hit": [6, 6, 25, 25],
    "hp": 1,
    "img": imgGolemHand,
    "anime": "golem_hand",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
        me.isInvincible = true;
      }
    }
  },
  "golem_body": { // ゴーレムのボディ
    "type": "boss",
    "w": 64,
    "h": 64,
    "box": [8, 4, 55, 59],
    "hit": [8, 4, 55, 59],
    "hp": 1,
    "img": imgGolemBody,
    "anime": "golem_body",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
        me.isInvincible = true;
      }
    }
  },
  "golem_booster": { // ゴーレムのジェットエンジン
    "type": "boss",
    "w": 32,
    "h": 32,
    "box": [12, 0, 19, 24],
    "hit": [12, 0, 19, 24],
    "hp": 1,
    "img": imgGolemBooster,
    "anime": "golem_booster",
    "move": (me) => {
      if (me.isParamEmpty()) {
        me.setParam(0, 0);
        me.isInvincible = true;
      }
    }
  }
};