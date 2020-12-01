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
})({"Qvvn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTTFB = exports.getLCP = exports.getFID = exports.getFCP = exports.getCLS = void 0;

var t,
    n,
    e = function () {
  return "".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12);
},
    i = function (t) {
  var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
  return {
    name: t,
    value: n,
    delta: 0,
    entries: [],
    id: e(),
    isFinal: !1
  };
},
    a = function (t, n) {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(t)) {
      var e = new PerformanceObserver(function (t) {
        return t.getEntries().map(n);
      });
      return e.observe({
        type: t,
        buffered: !0
      }), e;
    }
  } catch (t) {}
},
    r = !1,
    o = !1,
    s = function (t) {
  r = !t.persisted;
},
    u = function () {
  addEventListener("pagehide", s), addEventListener("beforeunload", function () {});
},
    c = function (t) {
  var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  o || (u(), o = !0), addEventListener("visibilitychange", function (n) {
    var e = n.timeStamp;
    "hidden" === document.visibilityState && t({
      timeStamp: e,
      isUnloading: r
    });
  }, {
    capture: !0,
    once: n
  });
},
    l = function (t, n, e, i) {
  var a;
  return function () {
    e && n.isFinal && e.disconnect(), n.value >= 0 && (i || n.isFinal || "hidden" === document.visibilityState) && (n.delta = n.value - (a || 0), (n.delta || n.isFinal || void 0 === a) && (t(n), a = n.value));
  };
},
    p = function (t) {
  var n,
      e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      r = i("CLS", 0),
      o = function (t) {
    t.hadRecentInput || (r.value += t.value, r.entries.push(t), n());
  },
      s = a("layout-shift", o);

  s && (n = l(t, r, s, e), c(function (t) {
    var e = t.isUnloading;
    s.takeRecords().map(o), e && (r.isFinal = !0), n();
  }));
},
    d = function () {
  return void 0 === t && (t = "hidden" === document.visibilityState ? 0 : 1 / 0, c(function (n) {
    var e = n.timeStamp;
    return t = e;
  }, !0)), {
    get timeStamp() {
      return t;
    }

  };
},
    v = function (t) {
  var n,
      e = i("FCP"),
      r = d(),
      o = a("paint", function (t) {
    "first-contentful-paint" === t.name && t.startTime < r.timeStamp && (e.value = t.startTime, e.isFinal = !0, e.entries.push(t), n());
  });
  o && (n = l(t, e, o));
},
    f = function (t) {
  var n = i("FID"),
      e = d(),
      r = function (t) {
    t.startTime < e.timeStamp && (n.value = t.processingStart - t.startTime, n.entries.push(t), n.isFinal = !0, s());
  },
      o = a("first-input", r),
      s = l(t, n, o);

  o ? c(function () {
    o.takeRecords().map(r), o.disconnect();
  }, !0) : window.perfMetrics && window.perfMetrics.onFirstInputDelay && window.perfMetrics.onFirstInputDelay(function (t, i) {
    i.timeStamp < e.timeStamp && (n.value = t, n.isFinal = !0, n.entries = [{
      entryType: "first-input",
      name: i.type,
      target: i.target,
      cancelable: i.cancelable,
      startTime: i.timeStamp,
      processingStart: i.timeStamp + t
    }], s());
  });
},
    m = function () {
  return n || (n = new Promise(function (t) {
    return ["scroll", "keydown", "pointerdown"].map(function (n) {
      addEventListener(n, t, {
        once: !0,
        passive: !0,
        capture: !0
      });
    });
  })), n;
},
    g = function (t) {
  var n,
      e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      r = i("LCP"),
      o = d(),
      s = function (t) {
    var e = t.startTime;
    e < o.timeStamp ? (r.value = e, r.entries.push(t)) : r.isFinal = !0, n();
  },
      u = a("largest-contentful-paint", s);

  if (u) {
    n = l(t, r, u, e);

    var p = function () {
      r.isFinal || (u.takeRecords().map(s), r.isFinal = !0, n());
    };

    m().then(p), c(p, !0);
  }
},
    h = function (t) {
  var n,
      e = i("TTFB");
  n = function () {
    try {
      var n = performance.getEntriesByType("navigation")[0] || function () {
        var t = performance.timing,
            n = {
          entryType: "navigation",
          startTime: 0
        };

        for (var e in t) "navigationStart" !== e && "toJSON" !== e && (n[e] = Math.max(t[e] - t.navigationStart, 0));

        return n;
      }();

      e.value = e.delta = n.responseStart, e.entries = [n], e.isFinal = !0, t(e);
    } catch (t) {}
  }, "complete" === document.readyState ? setTimeout(n, 0) : addEventListener("pageshow", n);
};

exports.getTTFB = h;
exports.getLCP = g;
exports.getFID = f;
exports.getFCP = v;
exports.getCLS = p;
},{}],"QiGE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = getType;

/**
 * @type {RegExp}
 */
var extensionPattern = /\.(\w{2,5})(?:$|\?.*)/;
/**
 * @type {string}
 */

var IMAGES = 'images';
/**
 * @type {string}
 */

var JAVASCRIPT = 'javascript';
/**
 * @type {string}
 */

var STYLESHEETS = 'stylesheets';
/**
 * @type {string}
 */

var OTHER = 'other';
/**
 * @type {RegExp}
 */

var typePatterns = [{
  type: IMAGES,
  pattern: /jpe?g|gif|png|webm/i
}, {
  type: JAVASCRIPT,
  pattern: /[m|c]?js/i
}, {
  type: STYLESHEETS,
  pattern: /css/i
}];
/**
 * @param {string}
 * @param {RegExp}
 * @param {any}
 * @returns {object}
 */

function get(source, pattern) {
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var match = source.match(pattern);
  return match && match.pop() || fallback;
}
/**
 * @type {object}
 * @property {string} img
 * @property {string} script
 */


var initiators = {
  img: IMAGES,
  image: IMAGES,
  script: JAVASCRIPT
};
/**
 * @param {string} o.initiatorType
 * @param {string} o.name
 * @returns {string} (images, javascript, stylesheets, other)
 */

function getType(_ref) {
  var initiatorType = _ref.initiatorType,
      name = _ref.name;

  if (Object.hasOwnProperty.call(initiators, initiatorType)) {
    return initiators[initiatorType];
  }

  var extension = get(name, extensionPattern);

  var _ref2 = typePatterns.find(function (_ref3) {
    var pattern = _ref3.pattern;
    return get(extension, pattern);
  }) || {
    type: OTHER
  },
      type = _ref2.type;

  return type;
}
},{}],"yLhy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.number = number;
var parseFloat = Number.parseFloat || window.parseFloat;
var isNaN = Number.isNaN || window.isNaN;
var isFinite = Number.isFinite || window.isFinite;
var _Number$MAX_SAFE_INTE = Number.MAX_SAFE_INTEGER,
    MAX_SAFE_INTEGER = _Number$MAX_SAFE_INTE === void 0 ? 9007199254740991 : _Number$MAX_SAFE_INTE;
/**
 * @param {number}
 * @returns {number?}
 */

function number(input) {
  if (typeof input !== 'number') {
    return;
  }

  var value = parseFloat(input);

  if (isNaN(value)) {
    return;
  }

  if (value < 0) {
    return;
  }

  if (!isFinite(value)) {
    return;
  }

  if (value > MAX_SAFE_INTEGER) {
    return MAX_SAFE_INTEGER;
  }

  return value;
}
},{}],"noNX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assets = assets;

var _index = require("../get-type/index.js");

var _index2 = require("../number/index.js");

var FINAL_ASSET_PREFIX = 'final_asset';
/**
 * @returns {object}
 */

function assets() {
  if (!window.performance || !window.performance.getEntriesByType) {
    return {};
  }

  var metrics = {};
  window.performance.getEntriesByType('resource').forEach(function (entry) {
    var type = (0, _index.getType)(entry);
    add(metrics, type, 'count', 1);
    add(metrics, type, 'load', entry.duration);
    add(metrics, type, 'size', entry.decodedBodySize);
  });

  for (var key in metrics) {
    if (Number.isNaN(metrics[key])) {
      metrics[key] = undefined;
    }
  }

  return metrics;
}
/**
 * Mutating
 * @param {object} accumulator
 * @param {string} type
 * @param {string} key
 * @param {number} value
 * @returns {void}
 */


function add(accumulator, type, key, value) {
  var field = [FINAL_ASSET_PREFIX, type, key].join('_');
  accumulator[field] = accumulator[field] || 0;
  accumulator[field] += (0, _index2.number)(value) || 0;
}
},{"../get-type/index.js":"QiGE","../number/index.js":"yLhy"}],"PKRT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = connection;

var _index = require("../number/index.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Optional values of legacy navigation types
 * 0: TYPE_NAVIGATE
 * 1: TYPE_RELOAD
 * 2: TYPE_BACK_FORWARD
 * 255: TYPE_RESERVED
 */
var LEGACY_NAVIGATION_TYPES = ['navigate', 'reload', 'back_forward'];
/**
 * @see [NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
 * @returns {object}
 */

function connection() {
  var _ref = window.navigator || {},
      connection = _ref.connection;

  var result = {};

  try {
    var _performance$getEntri = performance.getEntriesByType('navigation'),
        _performance$getEntri2 = _slicedToArray(_performance$getEntri, 1),
        _performance$getEntri3 = _performance$getEntri2[0],
        navigation = _performance$getEntri3 === void 0 ? performance.navigation : _performance$getEntri3;

    result.navigation_type = typeof navigation.type === 'number' ? LEGACY_NAVIGATION_TYPES[navigation.type] : navigation.type;
  } catch (error) {// ignore
  }

  if (connection) {
    Object.assign(result, {
      connection_type: connection.type,
      // bluetooth, cellular, ethernet, none, wifi, wimax, other, unknown
      effective_bandwidth: (0, _index.number)(connection.downlink),
      // MBsS
      effective_connection_type: connection.effectiveType,
      // slow-2g, 2g, 3g, 4g
      effective_max_bandwidth: (0, _index.number)(connection.downlinkMax),
      // MBsS
      reduced_data_usage: connection.saveData,
      // boolean
      round_trip_time: (0, _index.number)(connection.rtt)
    });
  }

  return result;
}
},{"../number/index.js":"yLhy"}],"PWnK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.display = display;

var _index = require("../number/index.js");

/**
 * @returns {object}
 */
function display() {
  var result = {
    window_inner_height: (0, _index.number)(window.innerHeight),
    window_inner_width: (0, _index.number)(window.innerWidth)
  };
  var _window = window,
      screen = _window.screen;
  screen && Object.assign(result, {
    screen_color_depth: (0, _index.number)(screen.colorDepth),
    screen_pixel_depth: (0, _index.number)(screen.pixelDepth),
    screen_orientation_type: screen.orientation && screen.orientation.type
  });
  return result;
}
},{"../number/index.js":"yLhy"}],"aHI8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dom = dom;

var _index = require("../number/index.js");

/**
 * getMaxNestLevel: Determine the largest DOM depth in the document or under a base element
 * @param {number} [depth=2] Used for recursion
 * @returns {number}
 */
function getMaxNestLevel() {
  var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return document.querySelector("".concat('*>'.repeat(depth), "*")) ? getMaxNestLevel(depth + 1) : depth;
}
/**
 * Get stats on a DOM tree safely
 * @returns {object}
 */


function dom() {
  try {
    return {
      final_dom_node_count: (0, _index.number)(document.querySelectorAll('*').length),
      final_dom_nest_depth: (0, _index.number)(getMaxNestLevel()),
      final_html_size: (0, _index.number)(document.querySelector('html').outerHTML.length)
    };
  } catch (error) {
    return {
      final_dom_node_count: undefined,
      final_dom_nest_depth: undefined,
      final_html_size: undefined
    };
  }
}
},{"../number/index.js":"yLhy"}],"bl8m":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elapsed = elapsed;

function elapsed() {
  var page_time_elapsed = window.performance.now();
  return Number.isFinite(page_time_elapsed) ? {
    page_time_elapsed: page_time_elapsed
  } : {};
}
},{}],"I8z3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snakeCase = void 0;

/**
 * @param {string}
 * @returns {string}
 */
var snakeCase = function snakeCase(str) {
  return str.replace(/([A-Z])/g, '_$1').replace(/-/g, '_').toLowerCase().replace(/_j_s_/g, '_js_');
};

exports.snakeCase = snakeCase;
},{}],"sAwE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memory = memory;

var _index = require("../number/index.js");

var _index2 = require("../snake-case/index.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * @type {string[]}
 */
var METRICS = ['jsHeapSizeLimit', 'totalJSHeapSize', 'usedJSHeapSize'];
/**
 * @returns {object}
 */

function memory() {
  var _ref = window.performance || {},
      memory = _ref.memory;

  if (!memory) {
    return {};
  }

  return Object.assign.apply(Object, _toConsumableArray(METRICS.map(function (metric) {
    return _defineProperty({}, (0, _index2.snakeCase)(metric), (0, _index.number)(memory[metric]));
  })));
}
},{"../number/index.js":"yLhy","../snake-case/index.js":"I8z3"}],"iTLC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigation = navigation;

var _index = require("../number/index.js");

var _index2 = require("../snake-case/index.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * @type {string[]}
 */
var METRICS = ['connectEnd', 'connectStart', 'decodedBodySize', 'domainLookupEnd', 'domainLookupStart', 'domComplete', 'domContentLoadedEventEnd', 'domContentLoadedEventStart', 'domInteractive', 'domLoading', 'duration', 'encodedBodySize', 'fetchStart', 'loadEventEnd', 'loadEventStart', 'navigationStart', 'redirectEnd', 'redirectStart', 'requestStart', 'responseEnd', 'responseStart', 'secureConnectionStart', 'transferSize', 'unloadEventEnd', 'unloadEventStart', 'workerStart'];
/**
 * @returns {object}
 */

function navigation() {
  var _window = window,
      performance = _window.performance;

  if (!performance || !performance.getEntriesByType) {
    return {};
  }

  var navigationEntries = performance.getEntriesByType('navigation'); // PerformanceNavigationTiming interface

  if (navigationEntries.length) {
    var _ref;

    return Object.assign.apply(Object, [{}].concat(_toConsumableArray((_ref = []).concat.apply(_ref, _toConsumableArray(navigationEntries.map(function (entry) {
      return METRICS.filter(function (metric) {
        return !Number.isNaN(entry[metric]);
      }).map(function (metric) {
        return _defineProperty({}, (0, _index2.snakeCase)(metric), (0, _index.number)(entry[metric]));
      });
    }))))));
  } // Fall back to obsolete PerformanceTiming interface


  var timing = performance.timing;

  if (!timing) {
    return {};
  }

  var start = performance.timeOrigin || timing.navigationStart;

  if (!start) {
    return {};
  }

  return METRICS.reduce(function (accumulator, metric) {
    var value = timing[metric] - start;
    accumulator[(0, _index2.snakeCase)(metric)] = value < 0 ? undefined : (0, _index.number)(value);
    return accumulator;
  }, {});
}
},{"../number/index.js":"yLhy","../snake-case/index.js":"I8z3"}],"Vd3j":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paint = paint;

var _index = require("../number/index.js");

var _index2 = require("../snake-case/index.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Retrieve all paint entries
 * @returns {object}
 */
function paint() {
  var _ref;

  var _window = window,
      performance = _window.performance;

  if (!performance || !performance.getEntriesByType) {
    return {};
  }

  return Object.assign.apply(Object, [{}].concat(_toConsumableArray((_ref = []).concat.apply(_ref, _toConsumableArray(performance.getEntriesByType('paint').map(function (_ref2) {
    var name = _ref2.name,
        startTime = _ref2.startTime;
    return _defineProperty({}, (0, _index2.snakeCase)(name), (0, _index.number)(startTime));
  }))))));
}
},{"../number/index.js":"yLhy","../snake-case/index.js":"I8z3"}],"iXFF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = void 0;

var _index = require("../navigation/index.js");

var _index2 = require("../paint/index.js");

var _index3 = require("../assets/index.js");

var _index4 = require("../connection/index.js");

var _index5 = require("../memory/index.js");

var _index6 = require("../display/index.js");

var _index7 = require("../dom/index.js");

var _index8 = require("../elapsed/index.js");

/**
 * @returns {object}
 */
var all = function all() {
  return Object.assign({}, (0, _index.navigation)(), (0, _index2.paint)(), (0, _index3.assets)(), (0, _index4.connection)(), (0, _index5.memory)(), (0, _index6.display)(), (0, _index7.dom)(), (0, _index8.elapsed)());
};

exports.all = all;
},{"../navigation/index.js":"iTLC","../paint/index.js":"Vd3j","../assets/index.js":"noNX","../connection/index.js":"PKRT","../memory/index.js":"sAwE","../display/index.js":"PWnK","../dom/index.js":"aHI8","../elapsed/index.js":"bl8m"}],"eJ9r":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fps = fps;

/**
 * Check window frames per second rate
 * @param {number} sample Number of seconds to check
 * @returns {number?}
 */
function fps() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$sample = _ref.sample,
      sample = _ref$sample === void 0 ? 1 : _ref$sample;

  return new Promise(function (resolve) {
    var _window = window,
        requestAnimationFrame = _window.requestAnimationFrame;

    if (!requestAnimationFrame) {
      resolve(undefined);
    }

    var start = window.performance.now();
    var end = start + 1000 * sample;
    var frames = 0;
    requestAnimationFrame(count);

    function count() {
      if (window.performance.now() > end) {
        resolve(frames / sample);
      } else {
        ++frames;
        requestAnimationFrame(count);
      }
    }
  });
}
},{}],"XxLS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measure = measure;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Add a 'measure' entry measuring the execution of a function
 * @param  {Function} fn
 * @param  {String}   name
 * @return {Any}           original method return value
 */
function measure(_x, _x2) {
  return _measure.apply(this, arguments);
}

function _measure() {
  _measure = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(fn, name) {
    var _window, performance, unique, _map, _map2, start, end, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _window = window, performance = _window.performance;
            unique = Math.random().toString(32).substr(2);
            _map = ['start', 'end'].map(function (suffix) {
              return [name, suffix, unique].join('-');
            }), _map2 = _slicedToArray(_map, 2), start = _map2[0], end = _map2[1];
            performance.mark(start);
            _context.next = 6;
            return fn();

          case 6:
            result = _context.sent;
            performance.mark(end);
            performance.measure(name, start, end);
            performance.clearMarks(start);
            performance.clearMarks(end);
            return _context.abrupt("return", result);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _measure.apply(this, arguments);
}
},{}],"uBxZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "assets", {
  enumerable: true,
  get: function () {
    return _index.assets;
  }
});
Object.defineProperty(exports, "connection", {
  enumerable: true,
  get: function () {
    return _index2.connection;
  }
});
Object.defineProperty(exports, "display", {
  enumerable: true,
  get: function () {
    return _index3.display;
  }
});
Object.defineProperty(exports, "dom", {
  enumerable: true,
  get: function () {
    return _index4.dom;
  }
});
Object.defineProperty(exports, "elapsed", {
  enumerable: true,
  get: function () {
    return _index5.elapsed;
  }
});
Object.defineProperty(exports, "memory", {
  enumerable: true,
  get: function () {
    return _index6.memory;
  }
});
Object.defineProperty(exports, "navigation", {
  enumerable: true,
  get: function () {
    return _index7.navigation;
  }
});
Object.defineProperty(exports, "paint", {
  enumerable: true,
  get: function () {
    return _index8.paint;
  }
});
Object.defineProperty(exports, "all", {
  enumerable: true,
  get: function () {
    return _index9.all;
  }
});
Object.defineProperty(exports, "fps", {
  enumerable: true,
  get: function () {
    return _index10.fps;
  }
});
Object.defineProperty(exports, "measure", {
  enumerable: true,
  get: function () {
    return _index11.measure;
  }
});

var _index = require("./assets/index.js");

var _index2 = require("./connection/index.js");

var _index3 = require("./display/index.js");

var _index4 = require("./dom/index.js");

var _index5 = require("./elapsed/index.js");

var _index6 = require("./memory/index.js");

var _index7 = require("./navigation/index.js");

var _index8 = require("./paint/index.js");

var _index9 = require("./all/index.js");

var _index10 = require("./fps/index.js");

var _index11 = require("./measure/index.js");
},{"./assets/index.js":"noNX","./connection/index.js":"PKRT","./display/index.js":"PWnK","./dom/index.js":"aHI8","./elapsed/index.js":"bl8m","./memory/index.js":"sAwE","./navigation/index.js":"iTLC","./paint/index.js":"Vd3j","./all/index.js":"iXFF","./fps/index.js":"eJ9r","./measure/index.js":"XxLS"}],"mpVp":[function(require,module,exports) {
"use strict";

var _webVitals = require("web-vitals");

var _index = require("../src/index.js");

Object.assign(window, {
  measure: _index.measure,
  fps: _index.fps,
  all: _index.all,
  getLCP: _webVitals.getLCP,
  getFID: _webVitals.getFID,
  getCLS: _webVitals.getCLS
});
},{"web-vitals":"Qvvn","../src/index.js":"uBxZ"}]},{},["mpVp"], null)
//# sourceMappingURL=script.b6d75034.js.map