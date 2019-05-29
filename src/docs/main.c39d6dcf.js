// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"CST.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    PLAY: "PLAY"
  },
  IMAGE: {
    OPTIONS: "options_button.png",
    PLAY: "play_button.png",
    TITLE: "background.jpg"
  },
  AUDIO: {},
  SPRITE: {}
};
},{}],"assets/image/play_button.png":[function(require,module,exports) {
module.exports = "/play_button.612f9d30.png";
},{}],"assets/image/options_button.png":[function(require,module,exports) {
module.exports = "/options_button.d065e32d.png";
},{}],"assets/image/background.jpg":[function(require,module,exports) {
module.exports = "/background.970f52a8.jpg";
},{}],"scenes/LoadScene.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var LoadScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(LoadScene, _Phaser$Scene);

  function LoadScene() {
    _classCallCheck(this, LoadScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadScene).call(this, {
      key: CST_1.CST.SCENES.LOAD
    }));
  }

  _createClass(LoadScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "loadImages",
    value: function loadImages() {
      this.load.image("play_button", require("../assets/image/play_button.png"));
      this.load.image("options_button", require("../assets/image/options_button.png"));
      this.load.image("background", require("../assets/image/background.jpg"));
    }
  }, {
    key: "loadAudio",
    value: function loadAudio() {
      this.load.setPath("../assets/audio");

      for (var prop in CST_1.CST.AUDIO) {
        //@ts-ignore
        this.load.audio(CST_1.CST.AUDIO[prop], CST_1.CST.AUDIO[prop]);
      }
    } // @ts-ignore

  }, {
    key: "loadSprites",
    value: function loadSprites(frameConfig) {
      this.load.setPath("../assets/sprite");

      for (var prop in CST_1.CST.SPRITE) {
        //@ts-ignore
        this.load.spritesheet(CST_1.CST.SPRITE[prop], CST_1.CST.SPRITE[prop], frameConfig);
      }
    }
  }, {
    key: "preload",
    value: function preload() {
      var _this = this;

      //load image, spritesheet, sound
      this.loadImages(); //create loading bar

      var loadingBar = this.add.graphics({
        fillStyle: {
          color: 0xffffff //white

        }
      }); //simulate large load

      for (var i = 0; i < 100; i++) {
        this.load.spritesheet("cat" + i, "./assets/cat.png", {
          frameHeight: 32,
          frameWidth: 32
        });
      }

      this.load.on("progress", function (percent) {
        loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 50);
      });
      this.load.on("complete", function () {
        _this.scene.start(CST_1.CST.SCENES.MENU);
      });
    }
  }, {
    key: "create",
    value: function create() {}
  }]);

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"CST.ts","../assets/image/play_button.png":"assets/image/play_button.png","../assets/image/options_button.png":"assets/image/options_button.png","../assets/image/background.jpg":"assets/image/background.jpg"}],"scenes/MenuScene.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var MenuScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);

  function MenuScene() {
    _classCallCheck(this, MenuScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuScene).call(this, {
      key: CST_1.CST.SCENES.MENU
    }));
  }

  _createClass(MenuScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      //creating the menu screen
      //create images
      var background = this.add.image(0, 0, "background").setOrigin(0).setDepth(0);
      var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play_button").setDepth(1);
      var optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "options_button").setDepth(1);
      playButton.setInteractive();
      playButton.on("pointerup", function () {
        _this.scene.start(CST_1.CST.SCENES.PLAY);
      });
      optionsButton.setInteractive();
      optionsButton.on("pointerup", function () {//options
      });
    }
  }]);

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"CST.ts"}],"assets/image/tileset_dungeon.png":[function(require,module,exports) {
module.exports = "/tileset_dungeon.3e7ca7aa.png";
},{}],"assets/maps/testmap.json":[function(require,module,exports) {
module.exports = {
  "height": 15,
  "infinite": false,
  "layers": [{
    "data": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAAAAAAAAAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAAAAAAAAAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAAAAAAAAAAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAAAAAAAAAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAAAAAAAAAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAAAAAAAAAAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAAAAAAAAAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAAAAAAAAAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAAAAAAAAAAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAAAAAAAAAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAAAAAAAAAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAAAAAAAAAAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "encoding": "base64",
    "height": 15,
    "id": 1,
    "name": "ground",
    "opacity": 1,
    "type": "tilelayer",
    "visible": true,
    "width": 20,
    "x": 0,
    "y": 0
  }, {
    "data": "LgAAABIAAAASAAAAEgAAABIAAAASAAAAEgAAABIAAAASAAAAEgAAABIAAAASAAAAEgAAABIAAAASAAAAEgAAABIAAAASAAAAEgAAAC4AAAAuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALgAAAC4AAAAAAAAANAAAADQAAAAAAAAAAAAAAAAAAAA0AAAAAAAAACUAAAAnAAAAAAAAADQAAAAAAAAANAAAAAAAAAAlAAAAJwAAAAAAAAAuAAAALgAAAAAAAAA0AAAANAAAAAAAAAA0AAAANAAAADQAAAAAAAAANQAAADcAAAAAAAAANAAAAAAAAAA0AAAAAAAAADUAAAA3AAAAAAAAAC4AAAAuAAAAAAAAADQAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAADQAAAAAAAAAAAAAAAAAAAAAAAAALgAAAC4AAAAAAAAANAAAADQAAAAAAAAANAAAADQAAAA0AAAAAAAAADQAAAA0AAAANAAAADQAAAAAAAAANAAAADQAAAA0AAAANAAAAAAAAAAuAAAALgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC4AAAAuAAAAAAAAADQAAAA0AAAAAAAAADQAAAAAAAAAAAAAAAAAAAA0AAAANAAAADQAAAAAAAAANAAAADQAAAA0AAAANAAAAAAAAAA0AAAALgAAAC4AAAAAAAAANAAAADQAAAAAAAAANAAAADQAAAA0AAAANAAAADQAAAAAAAAANAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAADQAAAAuAAAALgAAAAAAAAA0AAAANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAADQAAAA0AAAAAAAAADQAAAAAAAAANAAAAC4AAAAuAAAANAAAAAAAAAAAAAAAAAAAADQAAAA0AAAAAAAAADQAAAAAAAAAAAAAADQAAAAAAAAANAAAADQAAAAAAAAANAAAAAAAAAA0AAAALgAAAC4AAAA0AAAAAAAAACUAAAAnAAAANAAAADQAAAAAAAAANAAAADQAAAA0AAAANAAAAAAAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuAAAALgAAADQAAAAAAAAANQAAADcAAAA0AAAANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAADQAAAA0AAAAAAAAAC4AAAAuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAADQAAAA0AAAANAAAADQAAAAAAAAANAAAADQAAAA0AAAANAAAADQAAAAAAAAALgAAAC4AAAASAAAAEgAAABIAAAASAAAAEgAAABIAAAASAAAAEgAAABIAAAASAAAAEgAAABIAAAASAAAAEgAAABIAAAASAAAAEgAAABIAAAAuAAAA",
    "encoding": "base64",
    "height": 15,
    "id": 3,
    "name": "top",
    "opacity": 1,
    "type": "tilelayer",
    "visible": true,
    "width": 20,
    "x": 0,
    "y": 0
  }, {
    "data": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "encoding": "base64",
    "height": 15,
    "id": 4,
    "name": "wall",
    "opacity": 1,
    "type": "tilelayer",
    "visible": true,
    "width": 20,
    "x": 0,
    "y": 0
  }],
  "nextlayerid": 5,
  "nextobjectid": 1,
  "orientation": "orthogonal",
  "renderorder": "right-down",
  "tiledversion": "1.2.3",
  "tileheight": 32,
  "tilesets": [{
    "columns": 8,
    "firstgid": 1,
    "image": "..\/..\/..\/..\/..\/..\/Downloads\/tileset_dungeon.png",
    "imageheight": 256,
    "imagewidth": 256,
    "margin": 0,
    "name": "tileset_dungeon",
    "spacing": 0,
    "tilecount": 64,
    "tileheight": 32,
    "tiles": [{
      "id": 0,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 1,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 2,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 3,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 4,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 8,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 9,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 10,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 11,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 12,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 16,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 17,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 18,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 19,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 20,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 36,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 37,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 38,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 44,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 45,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 46,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 51,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 52,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 53,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }, {
      "id": 54,
      "properties": [{
        "name": "collides",
        "type": "bool",
        "value": true
      }]
    }],
    "tilewidth": 32
  }],
  "tilewidth": 32,
  "type": "map",
  "version": 1.2,
  "width": 20
};
},{}],"assets/image/character.png":[function(require,module,exports) {
module.exports = "/character.6e2ca09d.png";
},{}],"assets/image/Food.png":[function(require,module,exports) {
module.exports = "/Food.2497f5cd.png";
},{}],"scenes/PlayScene.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var PlayScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(PlayScene, _Phaser$Scene);

  function PlayScene() {
    var _this;

    _classCallCheck(this, PlayScene);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PlayScene).call(this, {
      key: CST_1.CST.SCENES.PLAY
    }));
    _this.numberOfBait = 3;
    _this.baitTimer = 1;
    return _this;
  }

  _createClass(PlayScene, [{
    key: "preload",
    value: function preload() {
      this.load.image("Dungeon", require("../assets/image/tileset_dungeon.png"));
      this.load.tilemapTiledJSON("mappy", require("../assets/maps/testmap.json"));
      this.load.spritesheet("dude", require("../assets/image/character.png"), {
        frameWidth: 32,
        frameHeight: 32
      });
      this.load.spritesheet("bait", require("../assets/image/Food.png"), {
        frameWidth: 16,
        frameHeight: 16
      });
    }
  }, {
    key: "create",
    value: function create() {
      this.cameras.main.setSize(640, 480);
      this.cameras.main.setViewport(0, 0, 640, 480); //map

      var mappy = this.add.tilemap("mappy");
      var terrain = mappy.addTilesetImage("tileset_dungeon", "Dungeon"); //layers

      var ground = mappy.createStaticLayer("ground", [terrain], 0, 0).setDepth(0);
      var wall = mappy.createStaticLayer("wall", [terrain], 0, 0).setDepth(1);
      var top = mappy.createStaticLayer("top", [terrain], 0, 0).setDepth(2); // player

      this.player = this.physics.add.sprite(144, 415, "dude").setDepth(5);
      this.enemy = this.physics.add.sprite(300, 350, "dude").setDepth(5).setImmovable(true); //map collisions

      this.physics.add.collider(this.player, ground);
      this.physics.add.collider(this.player, wall);
      this.physics.add.collider(this.player, top);
      this.physics.add.collider(this.enemy, ground);
      this.physics.add.collider(this.enemy, wall);
      this.physics.add.collider(this.enemy, top, this.collidewall, undefined, this); //tile property

      ground.setCollisionByProperty({
        collides: true
      });
      wall.setCollisionByProperty({
        collides: true
      });
      top.setCollisionByProperty({
        collides: true
      }); //animations

      this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNumbers("dude", {
          start: 3,
          end: 5
        }),
        frameRate: 10
      }); // this.add.grid(this.game.renderer.width/2, this.game.renderer.height/2, 640, 480, 32, 32, 0x057605);
      //keyboard input

      this.Keyboard = this.input.keyboard.addKeys("W, A, S, D, B, F"); // bait group

      this.baitsgroup = this.add.group();
      this.enemy.setVelocityY(-100);
    } // collide(){
    //     if(this.Keyboard.F.isDown && this.enemy.body.touching.left){
    //          this.enemy.setVelocityX(128)
    //     } else if(this.Keyboard.F.isDown && this.enemy.body.touching.right){
    //         this.enemy.setVelocityX(-128)
    //     } else if(this.Keyboard.F.isDown && this.enemy.body.touching.up){
    //         this.enemy.setVelocityY(128)
    //     } else if(this.Keyboard.F.isDown && this.enemy.body.touching.down){
    //         this.enemy.setVelocityY(-128)
    //     }
    // }

  }, {
    key: "collidewall",
    value: function collidewall() {
      var direction = Phaser.Math.Between(1, 4);
      console.log(direction);

      if (direction == 1) {
        this.enemy.setVelocityY(-100);
        this.enemy.play("walk", true);
      } else if (direction == 2) {
        this.enemy.setVelocityY(100);
        this.enemy.play("walk", true);
      } else if (direction == 3) {
        this.enemy.setVelocityX(100);
        this.enemy.play("walk", true);
      } else {
        this.enemy.setVelocityX(-100);
        this.enemy.play("walk", true);
      }
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      var _this2 = this;

      // bait pickup
      if (this.physics.world.overlap(this.player, this.baitsgroup) && this.Keyboard.B.isDown && this.baitTimer == 1) {
        this.numberOfBait++;
        console.log("works");
      }

      if (this.Keyboard.B.isDown && this.numberOfBait > 0 && this.baitTimer == 1 && !this.physics.world.overlap(this.player, this.baitsgroup)) {
        this.numberOfBait--;
        this.baitTimer = 0;
        this.baitsgroup.add(this.physics.add.sprite(this.player.x, this.player.y, "bait").setDepth(5).setScale(1.25).setFrame(21).setImmovable(true));
        setTimeout(function () {
          _this2.baitTimer = 1;
        }, 500);
      } // player movement


      if (this.Keyboard.W.isDown) {
        this.player.setVelocityY(-100);
        this.player.play("walk", true);
        this.player.flipX = false;
      }

      if (this.Keyboard.S.isDown) {
        this.player.setVelocityY(100);
        this.player.play("walk", true);
      }

      if (this.Keyboard.A.isDown) {
        this.player.setVelocityX(-100);
        this.player.play("walk", true);
        this.player.flipX = true;
      }

      if (this.Keyboard.D.isDown) {
        this.player.setVelocityX(100);
        this.player.play("walk", true);
        this.player.flipX = false;
      }

      if (this.Keyboard.A.isUp && this.Keyboard.D.isUp) {
        this.player.setVelocityX(0);
      }

      if (this.Keyboard.S.isUp && this.Keyboard.W.isUp) {
        this.player.setVelocityY(0);
      }

      if (this.physics.world.collide(this.player, this.enemy)) {}
    }
  }]);

  return PlayScene;
}(Phaser.Scene);

exports.PlayScene = PlayScene;
},{"../CST":"CST.ts","../assets/image/tileset_dungeon.png":"assets/image/tileset_dungeon.png","../assets/maps/testmap.json":"assets/maps/testmap.json","../assets/image/character.png":"assets/image/character.png","../assets/image/Food.png":"assets/image/Food.png"}],"main.ts":[function(require,module,exports) {
"use strict";
/** @type {import("./typings/phaser")} */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LoadScene_1 = require("./scenes/LoadScene");

var MenuScene_1 = require("./scenes/MenuScene");

var PlayScene_1 = require("./scenes/PlayScene"); // @ts-ignore


var game = new Phaser.Game({
  width: 800,
  height: 600,
  scene: [LoadScene_1.LoadScene, MenuScene_1.MenuScene, PlayScene_1.PlayScene],
  render: {
    pixelArt: true
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
});
},{"./scenes/LoadScene":"scenes/LoadScene.ts","./scenes/MenuScene":"scenes/MenuScene.ts","./scenes/PlayScene":"scenes/PlayScene.ts"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49625" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.js.map