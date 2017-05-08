/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class MovingObject {

  constructor() {    
  }

  move() {
    this.x_pos += this.x_vel;
    this.y_pos += this.y_vel;
    this.update_offset();
  }

  update_offset() {
    this.x_offset = this.x_pos + this.width;
    this.y_offset = this.y_pos + this.height;
    this.set_center();
  }

  set_center() {
    this.center = [(this.x_offset + this.x_pos)/2, (this.y_offset + this.y_pos)/2];
  }

}

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


const BULLET_SPEED = -6;

class Bullet extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {

  constructor(caster_pos, bullet_type, target_x, target_y) {
    super();
    // debugger
    this.height = 14;
    this.width = 13;
    this.x_pos = caster_pos[0];
    this.y_pos = caster_pos[1];
    this.bullet_type = bullet_type;
    this.hit = false;
    this.target_x = this.x_pos + this.width;
    this.target_y = this.y_pos + this.height;
    this.set_velocity(this.x_pos - target_x, this.y_pos - target_y);
    this.set_center();
  }

  bind(stage) {
    if (this.x_pos >= stage.canvas.width) {
      this.hit = true;
    }
    if (this.x_pos <= 0) {
      this.hit = true;
    }
    if (this.y_pos >= stage.canvas.height) {
      // this.alive = false;
      this.hit = true;
    }
    if (this.y_pos <= 0) {
      // this.alive = false;
      this.hit = true;
    }
  }

  set_velocity(offset_x, offset_y) {
    let tan_angle = Math.atan2(offset_x, offset_y);
    this.x_vel = Math.sin(tan_angle) * BULLET_SPEED;
    this.y_vel = Math.cos(tan_angle) * BULLET_SPEED;
  }

  draw(stage) {
    let spell_img = new Image();
    if (this.bullet_type === 'fireball') {
      spell_img.src = "./game/assets/fireball.png";
    } else {
      spell_img.src = "./game/assets/frostball.png";
    }
    this.move();
    this.bind(stage);
    // stage.fillStyle='black';
    stage.drawImage(spell_img, this.x_pos, this.y_pos);
    // stage.fillRect(this.x_pos, this.y_pos, this.width, this.height);
  }

}


/* harmony default export */ __webpack_exports__["a"] = (Bullet);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);



class Enemy extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {

  constructor(boss_pos) {
    super();
    this.update_boss_pos(boss_pos);
    this.generate_pos();
    this.height = 200;
    this.width = 200;
    this.alive = true;
    this.update_offset();
  }

  generate_pos() {
    let x_generator = Math.floor(Math.random() * 2);
    if (x_generator === 1) {
      this.x_pos = Math.floor(Math.random() * 1700 - 1500) + 1500;
    } else {
      this.x_pos = Math.floor(Math.random() * 150);
    }
    let y_generator = Math.floor(Math.random() * 2);
    if (y_generator == 1) {
      this.y_pos = Math.floor(Math.random() * 100);
    } else {
      this.y_pos = Math.floor(Math.random() * 800 - 700) + 700;
    }
  }

  bind(stage) {
    if (this.x_pos >= stage.canvas.width) {
      this.reposition(this.boss_pos);
    }
    if (this.x_pos <= 0) {
      this.reposition(this.boss_pos);
    }
    if (this.y_pos >= stage.canvas.height) {
      // this.alive = false;
      this.reposition(this.boss_pos);
    }
    if (this.y_pos <= 0) {
      // this.alive = false;
      this.reposition(this.boss_pos);
    }
  }

  collideWith(other_obj) {
    return (!((this.x_pos > other_obj.x_offset || this.x_offset < other_obj.x_pos) ||
      (this.y_pos > other_obj.y_offset || this.y_offset < other_obj.y_pos)));
  }

  update_boss_pos(boss_pos) {
    this.boss_pos = boss_pos;
  }

  reposition(boss_pos) {
    this.alive = true;
    this.generate_pos();
    this.update_offset();
    this.update_class_attributes(boss_pos);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Enemy);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(5);


class StartScreen {

  constructor(stage) {
    this.draw(stage);
    this.stage = stage;
    document.addEventListener("keyup", this.startGame());
  }

  startGame() {
    const handler = function(e) {
      if (e.keyCode === 13) {
        document.removeEventListener("keyup", handler);
        new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](this.stage);
      }
    }.bind(this);

    return handler;
  }

  draw(stage) {
    stage.clearRect(0, 0, 1300, 800);
    stage.font = "100px Arial";
    stage.fillStyle = '#0e1282';
    stage.fillRect(0, 0, 1300, 800);
    stage.fillStyle = 'black';
    stage.textAlign="center";
    stage.fillText("Nexus", 650, 300);
    stage.font = "50px Arial";
    stage.fillText("Press Enter to Play", 650, 500);
    stage.textAlign="start";
  }

}

/* harmony default export */ __webpack_exports__["a"] = (StartScreen);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bullet__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__status__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__moving_object__ = __webpack_require__(0);



const MAX_SPEED = 3;

class Boss extends __WEBPACK_IMPORTED_MODULE_2__moving_object__["a" /* default */] {

  constructor() {
    super();
    this.x_vel = 0;
    this.y_vel = 0;
    this.x_pos = 600;
    this.y_pos = 200;
    this.width = 132;
    this.height = 140;
    this.dir = 'still';
    this.move();
    this.speed = 0.5;
    this.friction = 0.92;
    this.keys = {};
    this.spells = [];
    this.setStatus();
  }


  collideWith(other_obj) {
    return (!((this.x_pos > other_obj.x_offset || this.x_offset < other_obj.x_pos) ||
      (this.y_pos > other_obj.y_offset || this.y_offset < other_obj.y_pos)));
  }

  setStatus() {
    this.health = 100;
    this.energy = 100;
    setInterval(() => {
      if (this.energy < 100) {
        this.energy += 1;
      }
    }, 50);
    this.status = new __WEBPACK_IMPORTED_MODULE_1__status__["a" /* default */]();
  }


  update_movement() {
    if (this.keys[65] && this.x_vel >= -1 * MAX_SPEED) {
      this.x_vel -= this.speed;
    }
    if (this.keys[68] && this.x_vel <= MAX_SPEED) {
      this.x_vel += this.speed;
    }
    if (this.keys[87] && this.y_vel >= -1 * MAX_SPEED) {
      this.y_vel -= this.speed;
    }
    if (this.keys[83] && this.y_vel <= MAX_SPEED) {
      this.y_vel += this.speed;
    }
    this.x_vel *= this.friction;
    this.y_vel *= this.friction;
  }

  bind(stage) {
    if (this.x_pos >= stage.canvas.width - 132) {
      this.x_pos = stage.canvas.width - 132;
    }
    if (this.x_pos <= 0) {
      this.x_pos = 0;
    }
    if (this.y_pos >= stage.canvas.height - 140) {
      this.y_pos = stage.canvas.height - 140;
    }
    if (this.y_pos <= 0) {
      this.y_pos = 0;
    }
  }

  castSpell(x_offSet, y_offSet) {
    // debugger
    if (this.energy >= 10) {
      this.spells.push(new __WEBPACK_IMPORTED_MODULE_0__bullet__["a" /* default */](this.center, 'red', x_offSet, y_offSet));
      this.energy -= 10;
    }
    console.log(this.spells);
    // console.log(this.spells);
  }

  castSpells(stage) {
    this.spells.forEach((spell) => {
      spell.draw(stage);
    });
  }

  draw(stage) {
    let boss_img = new Image();
    this.update_movement();
    this.move();
    this.bind(stage);
    this.update_offset();
    this.get_dir();
    this.castSpells(stage);
    this.status.draw(stage, this.health, this.energy);
    boss_img.src = "./game/assets/dragon_spritesheet.png";
    if (this.dir === 'east') {
      stage.drawImage(boss_img, 0, 0, 102, 134, this.x_pos, this.y_pos, 102, 134);
    }
    else if (this.dir === 'west') {
      stage.drawImage(boss_img, 103, 0, 102, 134, this.x_pos, this.y_pos, 102, 134);
    }
    else {
      stage.drawImage(boss_img, 0, 135, 132, 140, this.x_pos, this.y_pos, 132, 140);
    }
  }

  get_dir() {
    let x_vel = this.x_vel;
    let y_vel = this.y_vel;
    // console.log(x_vel);
    // console.log(y_vel);
    if ((x_vel < 0.2 && x_vel > -0.2) && (y_vel < 0.2 && y_vel > -0.2)) {
      this.dir = 'still';
    }
    else if (x_vel > 0) {
      let tan_angle = Math.atan2(x_vel, y_vel) / Math.PI * 180;
      // console.log(tan_angle);
      if (tan_angle <= 22.5) {
        this.dir = 'south';
        //south
      } else if (tan_angle <= 67.5) {
        this.dir = 'east';
        //southeast
      } else if (tan_angle <= 112.5) {
        this.dir = 'east';
        //east
      } else if (tan_angle <= 157.5) {
        this.dir = 'east';
        //northeast
      } else if (tan_angle <= 180) {
        this.dir = 'north';
        //north
      }
    }
    else if (x_vel < 0) {
      let tan_angle = Math.atan2(x_vel, y_vel) / Math.PI * 180;
      if (tan_angle >= -22.5) {
        this.dir = 'south';
        //south
      } else if (tan_angle >= -67.5) {
        this.dir = 'west';
        //southwest
      } else if (tan_angle >= -112.5) {
        this.dir = 'west';
        //west
      } else if (tan_angle >= -157.5) {
        this.dir = 'west';
        //northwest
      } else if (tan_angle >= -180) {
        this.dir = 'north';
        //north
      }
    }
  }
}



/* harmony default export */ __webpack_exports__["a"] = (Boss);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boss__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__warrior__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wizard__ = __webpack_require__(8);




class Game {

  constructor(stage) {
    this.stage = stage;
    this.enemies = []; 
    this.slain_enemies = [];
    this.addBoss();
    this.addEnemies();
    this.addKeyEvents();
    this.start();
    //Timeout toggle so I can refresh appropriatly
    this.timeout = false;
    this.refresh_enemies = this.refresh_enemies.bind(this);
  }


  addBoss() {
    this.boss = new __WEBPACK_IMPORTED_MODULE_0__boss__["a" /* default */]();
  }

  addEnemies() {
    for (let i = 0; i < 2 ; i++) {
      this.enemies.push(new __WEBPACK_IMPORTED_MODULE_1__warrior__["a" /* default */](this.boss.center));
      this.enemies.push(new __WEBPACK_IMPORTED_MODULE_2__wizard__["a" /* default */](this.boss.center));
    }

  }

  detectCollisions() {
    window.enemies = this.enemies;
    this.enemies.forEach((enemy) => {
      if (enemy.alive) {
        if (enemy.collideWith(this.boss)) {
            this.slain_enemies.push(enemy);
            enemy.alive = false;
            this.boss.health -= 20;
        } else {
          let hit_spells = [];
          //LOOK AT THIS SHIT FIGURE IT OUT
          this.boss.spells.forEach((spell, i) => {
            if (enemy.collideWith(spell)) {
              spell.hit = true;
              this.slain_enemies.push(enemy);
              enemy.alive = false;
              }
            if (spell.hit) {
              hit_spells.push(i);
            }
          });
          hit_spells.forEach((spell_number) => {
            this.boss.spells.splice(spell_number, 1);
          });
        }
        if (enemy.constructor.name === 'Wizard') {
          let hit_spells = [];
          enemy.spells.forEach((spell, i) => {
            if (this.boss.collideWith(spell)) {
              spell.hit = true;
              this.boss.health -= 20;
              if (spell.hit) {
                hit_spells.push(i);
              }
            }
          });
          hit_spells.forEach((spell_number) => {
              enemy.spells.splice(spell_number, 1);
          });
        }
      }

    });
  }

  addKeyEvents() {
    document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
      this.boss.keys[e.keyCode] = true;
    });
    document.getElementsByTagName("body")[0].addEventListener("keyup", (e) => {
      this.boss.keys[e.keyCode] = false;
    });
    this.stage.canvas.addEventListener('click', (e) => {
      // debugger
      this.boss.castSpell(e.offsetX, e.offsetY);
    });
  }

  start() {
     requestAnimationFrame(this.animate.bind(this));

  }

  animate(time) {
    this.stage.clearRect(0, 0, 1300, 800);
    this.stage.fillStyle = '#fde5c6';
    this.stage.fillRect(0, 0, 1300, 800);

    this.enemies.forEach((enemy) => {
      if (enemy.alive) {
        enemy.draw(this.stage);
        enemy.update_boss_pos(this.boss.center);
      }
    });
    if (this.slain_enemies.length === this.enemies.length) {
      if (this.timeout === false) {
        this.timeout = true;
        setTimeout(() => (this.refresh_enemies()), 1500);
      }
    }

    this.boss.draw(this.stage);

    this.detectCollisions();

    requestAnimationFrame(this.animate.bind(this));
  }

  refresh_enemies() {
    this.timeout = false;
    // this.boss.health += (this.boss.health%100)/2;
    this.slain_enemies = [];
    this.enemies.forEach((enemy) => {
      // enemy.update_boss_pos(this.boss.center);
      enemy.reposition(this.boss.center);
    });
  }




}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Status {

  constructor() {

  }

  draw(stage, health, energy) {
    stage.fillStyle = 'red';
    stage.font = '30px Arial';
    stage.fillText("Health", 10, 40);
    stage.fillStyle = 'black';
    stage.fillRect(9, 49, 302, 22);
    stage.fillStyle = 'red';
    stage.fillRect(10, 50, 3 * health, 20);
    stage.fillStyle = 'green';
    stage.fillText("Energy", 10, 100);
    stage.fillStyle = 'black';
    stage.fillRect(9, 109, 302, 22);
    stage.fillStyle = 'green';
    stage.fillRect(10, 110, 3 * energy, 20);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Status);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemies__ = __webpack_require__(2);


const WARRIOR_SPEED = 4;

class Warrior extends __WEBPACK_IMPORTED_MODULE_0__enemies__["a" /* default */] {

  constructor(boss_center) {
    super(boss_center);
    this.set_velocity(this.boss_pos);
    this.height = 120;
    this.width = 120;

  }

  set_velocity() {
    let triangle_x = this.boss_pos[0] - this.center[0];
    let triangle_y = this.boss_pos[1] - this.center[1];
    this.tan_angle = Math.atan2(triangle_y, triangle_x);
    this.x_vel = Math.cos(this.tan_angle) * WARRIOR_SPEED;
    this.y_vel = Math.sin(this.tan_angle) * WARRIOR_SPEED;
  }

  update_class_attributes(boss_pos) {
      this.update_boss_pos(boss_pos);
      this.set_velocity();
  }

  draw(stage) {
    let warrior_img = new Image();
    warrior_img.src = "./game/assets/warrior.png";
    // window.warrior = warrior_img;
    this.move();
    this.bind(stage);
    stage.save();
    stage.translate(this.center[0], this.center[1]);
    stage.rotate(this.tan_angle);
    stage.translate(-(this.center[0]), -this.center[1]);
    // stage.fillStyle='black';
    // stage.fillRect(this.x_pos, this.y_pos, this.width, this.height);
    // stage.translate(stage.canvas.width/2, stage.canvas.height/2);
    // stage.rotate(Math.PI/4);
    stage.drawImage(warrior_img, this.x_pos, this.y_pos);
    stage.restore();
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Warrior);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemies__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet__ = __webpack_require__(1);



class Wizard extends __WEBPACK_IMPORTED_MODULE_0__enemies__["a" /* default */] {

  constructor(boss_center) {
    super(boss_center);
    this.height = 130;
    this.width = 145;
    this.update_boss_pos(boss_center);
    this.spells = [];
    this.update_offset();
    setTimeout(() => {
      this.castSpells();
    }, 500);
  }

  castSpells() {
    // debugger
    setInterval(() => {
      if (this.alive) {
        this.spells.push(new __WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* default */](this.center, 'fireball', this.boss_pos[0], this.boss_pos[1]));
      }
    }, 1500);

  }

  draw(stage) {
    this.bind(stage);
    let mage_img = new Image();
    mage_img.src = "./game/assets/wizard.png";
    let triangle_x = this.boss_pos[0] - this.center[0];
    let triangle_y = this.boss_pos[1] - this.center[1];
    let tan_angle = Math.atan2(triangle_y, triangle_x);
    stage.save();
    stage.translate(this.center[0], this.center[1]);
    stage.rotate(tan_angle);
    stage.translate(-(this.center[0]), -this.center[1]);
    stage.drawImage(mage_img, this.x_pos, this.y_pos);
    stage.restore();
    this.spells.forEach((spell) => {
      spell.draw(stage);
    });
  }

  update_class_attributes(boss_center) {
    this.spells = [];
    this.update_boss_pos(boss_center);
  }


}

/* harmony default export */ __webpack_exports__["a"] = (Wizard);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_start_screen__ = __webpack_require__(3);


const GAME_WIDTH = 1300;
const GAME_HEIGHT = 800;

document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("gameScreen");
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  const stage = canvas.getContext('2d');
  new __WEBPACK_IMPORTED_MODULE_0__lib_start_screen__["a" /* default */](stage);
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map