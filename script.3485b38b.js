parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Qvvn":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getTTFB=exports.getLCP=exports.getFID=exports.getFCP=exports.getCLS=void 0;var t,e,n=function(){return"".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)},i=function(t){return{name:t,value:arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1,delta:0,entries:[],id:n(),isFinal:!1}},a=function(t,e){try{if(PerformanceObserver.supportedEntryTypes.includes(t)){var n=new PerformanceObserver(function(t){return t.getEntries().map(e)});return n.observe({type:t,buffered:!0}),n}}catch(t){}},r=!1,o=!1,s=function(t){r=!t.persisted},u=function(){addEventListener("pagehide",s),addEventListener("unload",function(){})},c=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];o||(u(),o=!0),addEventListener("visibilitychange",function(e){var n=e.timeStamp;"hidden"===document.visibilityState&&t({timeStamp:n,isUnloading:r})},{capture:!0,once:e})},p=function(t,e,n,i){var a;return function(){n&&e.isFinal&&n.disconnect(),e.value>=0&&(i||e.isFinal||"hidden"===document.visibilityState)&&(e.delta=e.value-(a||0),(e.delta||e.isFinal||void 0===a)&&(t(e),a=e.value))}},d=function(t){var e,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=i("CLS",0),o=function(t){t.hadRecentInput||(r.value+=t.value,r.entries.push(t),e())},s=a("layout-shift",o);s&&(e=p(t,r,s,n),c(function(t){var n=t.isUnloading;s.takeRecords().map(o),n&&(r.isFinal=!0),e()}))},l=function(){return void 0===t&&(t="hidden"===document.visibilityState?0:1/0,c(function(e){var n=e.timeStamp;return t=n},!0)),{get timeStamp(){return t}}},v=function(t){var e,n=i("FCP"),r=l(),o=a("paint",function(t){"first-contentful-paint"===t.name&&t.startTime<r.timeStamp&&(n.value=t.startTime,n.isFinal=!0,n.entries.push(t),e())});o&&(e=p(t,n,o))},f=function(t){var e=i("FID"),n=l(),r=function(t){t.startTime<n.timeStamp&&(e.value=t.processingStart-t.startTime,e.entries.push(t),e.isFinal=!0,s())},o=a("first-input",r),s=p(t,e,o);o?c(function(){o.takeRecords().map(r),o.disconnect()},!0):window.perfMetrics&&window.perfMetrics.onFirstInputDelay&&window.perfMetrics.onFirstInputDelay(function(t,i){i.timeStamp<n.timeStamp&&(e.value=t,e.isFinal=!0,e.entries=[{entryType:"first-input",name:i.type,target:i.target,cancelable:i.cancelable,startTime:i.timeStamp,processingStart:i.timeStamp+t}],s())})},m=function(){return e||(e=new Promise(function(t){return["scroll","keydown","pointerdown"].map(function(e){addEventListener(e,t,{once:!0,passive:!0,capture:!0})})})),e},g=function(t){var e,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=i("LCP"),o=l(),s=function(t){var n=t.startTime;n<o.timeStamp?(r.value=n,r.entries.push(t)):r.isFinal=!0,e()},u=a("largest-contentful-paint",s);if(u){e=p(t,r,u,n);var d=function(){r.isFinal||(u.takeRecords().map(s),r.isFinal=!0,e())};m().then(d),c(d,!0)}},S=function(t){var e,n=i("TTFB");e=function(){try{var e=performance.getEntriesByType("navigation")[0]||function(){var t=performance.timing,e={entryType:"navigation",startTime:0};for(var n in t)"navigationStart"!==n&&"toJSON"!==n&&(e[n]=Math.max(t[n]-t.navigationStart,0));return e}();n.value=n.delta=e.responseStart,n.entries=[e],n.isFinal=!0,t(n)}catch(t){}},"complete"===document.readyState?setTimeout(e,0):addEventListener("pageshow",e)};exports.getTTFB=S,exports.getLCP=g,exports.getFID=f,exports.getFCP=v,exports.getCLS=d;
},{}],"QiGE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getType=c;var e=/\.(\w{2,5})(?:$|\?.*)/,t="images",r="javascript",n="stylesheets",p="other",a=[{type:t,pattern:/jpe?g|gif|png|webm/i},{type:r,pattern:/[m|c]?js/i},{type:n,pattern:/css/i}];function i(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=e.match(t);return n&&n.pop()||r}var s={img:t,image:t,script:r};function c(t){var r=t.initiatorType,n=t.name;if(Object.hasOwnProperty.call(s,r))return s[r];var c=i(n,e);return(a.find(function(e){var t=e.pattern;return i(c,t)})||{type:p}).type}
},{}],"yLhy":[function(require,module,exports) {
"use strict";function e(e){if("number"==typeof e){var r=Number.parseFloat(e);if(!(Number.isNaN(r)||r<0))return Number.isFinite(r)?r:void 0}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.number=e;
},{}],"noNX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.assets=o;var e=require("../get-type"),r=require("../number"),n="final_asset";function o(){if(!window.performance||!window.performance.getEntriesByType)return{};var r={};for(var n in window.performance.getEntriesByType("resource").forEach(function(n){var o=(0,e.getType)(n);t(r,o,"count",1),t(r,o,"load",n.duration),t(r,o,"size",n.decodedBodySize)}),r)Number.isNaN(r[n])&&(r[n]=void 0);return r}function t(e,o,t,i){var a=[n,o,t].join("_");e[a]=e[a]||0,e[a]+=(0,r.number)(i)||0}
},{"../get-type":"QiGE","../number":"yLhy"}],"PKRT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.connection=n;var e=require("../number");function n(){var n=(window.navigator||{}).connection;return n?{connection_type:n.type,effective_bandwidth:(0,e.number)(n.downlink),effective_connection_type:n.effectiveType,effective_max_bandwidth:(0,e.number)(n.downlinkMax),reduced_data_usage:n.saveData,round_trip_time:(0,e.number)(n.rtt)}:{}}
},{"../number":"yLhy"}],"PWnK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.display=n;var e=require("../number");function n(){var n={window_inner_height:(0,e.number)(window.innerHeight),window_inner_width:(0,e.number)(window.innerWidth)},r=window.screen;return r&&Object.assign(n,{screen_color_depth:(0,e.number)(r.colorDepth),screen_pixel_depth:(0,e.number)(r.pixelDepth),screen_orientation_type:r.orientation&&r.orientation.type}),n}
},{"../number":"yLhy"}],"aHI8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.dom=n;var e=require("../number");function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return document.querySelector("".concat("*>".repeat(e),"*"))?t(e+1):e}function n(){try{return{final_dom_node_count:(0,e.number)(document.querySelectorAll("*").length),final_dom_nest_depth:(0,e.number)(t()),final_html_size:(0,e.number)(document.querySelector("html").outerHTML.length)}}catch(n){return{final_dom_node_count:void 0,final_dom_nest_depth:void 0,final_html_size:void 0}}}
},{"../number":"yLhy"}],"I8z3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.snakeCase=void 0;var e=function(e){return e.replace(/([A-Z])/g,"_$1").replace(/-/g,"_").toLowerCase().replace(/_j_s_/g,"_js_")};exports.snakeCase=e;
},{}],"sAwE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.memory=f;var e=require("../number"),r=require("../snake-case");function t(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function n(e){return u(e)||i(e)||a(e)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(e,r){if(e){if("string"==typeof e)return c(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?c(e,r):void 0}}function i(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function u(e){if(Array.isArray(e))return c(e)}function c(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var s=["jsHeapSizeLimit","totalJSHeapSize","usedJSHeapSize"];function f(){var o=(window.performance||{}).memory;return o?Object.assign.apply(Object,n(s.map(function(n){return t({},(0,r.snakeCase)(n),(0,e.number)(o[n]))}))):{}}
},{"../number":"yLhy","../snake-case":"I8z3"}],"iTLC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.navigation=s;var e=require("../number"),t=require("../snake-case");function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e){return u(e)||i(e)||a(e)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}function i(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function u(e){if(Array.isArray(e))return c(e)}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var d=["connectEnd","connectStart","decodedBodySize","domainLookupEnd","domainLookupStart","domComplete","domContentLoadedEventEnd","domContentLoadedEventStart","domInteractive","domLoading","encodedBodySize","fetchStart","loadEventEnd","loadEventStart","navigationStart","redirectEnd","redirectStart","requestStart","responseEnd","responseStart","secureConnectionStart","transferSize","unloadEventEnd","unloadEventStart"];function s(){var o=window.performance;if(!o||!o.getEntriesByType)return{};var a,i=o.getEntriesByType("navigation");if(i.length)return Object.assign.apply(Object,[{}].concat(r((a=[]).concat.apply(a,r(i.map(function(r){return d.filter(function(e){return!Number.isNaN(r[e])}).map(function(o){return n({},(0,t.snakeCase)(o),(0,e.number)(r[o]))})}))))));var u=o.timing;if(!u)return{};var c=o.timeOrigin||u.navigationStart;return c?d.reduce(function(n,r){var o=u[r]-c;return n[(0,t.snakeCase)(r)]=o<0?void 0:(0,e.number)(o),n},{}):{}}
},{"../number":"yLhy","../snake-case":"I8z3"}],"Vd3j":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.paint=s;var e=require("../number"),r=require("../snake-case");function t(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function n(e){return u(e)||i(e)||o(e)||a()}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e,r){if(e){if("string"==typeof e)return c(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?c(e,r):void 0}}function i(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function u(e){if(Array.isArray(e))return c(e)}function c(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function s(){var a,o=window.performance;return o&&o.getEntriesByType?Object.assign.apply(Object,[{}].concat(n((a=[]).concat.apply(a,n(o.getEntriesByType("paint").map(function(n){var a=n.name,o=n.startTime;return t({},(0,r.snakeCase)(a),(0,e.number)(o))})))))):{}}
},{"../number":"yLhy","../snake-case":"I8z3"}],"iXFF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.all=void 0;var e=require("../navigation"),r=require("../paint"),i=require("../assets"),t=require("../connection"),n=require("../memory"),o=require("../display"),s=require("../dom"),a=function(){return Object.assign({},(0,e.navigation)(),(0,r.paint)(),(0,i.assets)(),(0,t.connection)(),(0,n.memory)(),(0,o.display)(),(0,s.dom)())};exports.all=a;
},{"../navigation":"iTLC","../paint":"Vd3j","../assets":"noNX","../connection":"PKRT","../memory":"sAwE","../display":"PWnK","../dom":"aHI8"}],"eJ9r":[function(require,module,exports) {
"use strict";function e(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).sample,n=void 0===e?1:e;return new Promise(function(e){var o=window.requestAnimationFrame;o||e(void 0);var r=window.performance.now()+1e3*n,i=0;o(function t(){window.performance.now()>r?e(i/n):(++i,o(t))})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.fps=e;
},{}],"XxLS":[function(require,module,exports) {
"use strict";function r(r,n){return a(r)||o(r,n)||e(r,n)||t()}function t(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function e(r,t){if(r){if("string"==typeof r)return n(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(r,t):void 0}}function n(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n}function o(r,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(r)){var e=[],n=!0,o=!1,a=void 0;try{for(var u,i=r[Symbol.iterator]();!(n=(u=i.next()).done)&&(e.push(u.value),!t||e.length!==t);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==i.return||i.return()}finally{if(o)throw a}}return e}}function a(r){if(Array.isArray(r))return r}function u(r,t,e,n,o,a,u){try{var i=r[a](u),c=i.value}catch(s){return void e(s)}i.done?t(c):Promise.resolve(c).then(n,o)}function i(r){return function(){var t=this,e=arguments;return new Promise(function(n,o){var a=r.apply(t,e);function i(r){u(a,n,o,i,c,"next",r)}function c(r){u(a,n,o,i,c,"throw",r)}i(void 0)})}}function c(r,t){return s.apply(this,arguments)}function s(){return(s=i(regeneratorRuntime.mark(function t(e,n){var o,a,u,i,c,s,f,l;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=window,a=o.performance,u=Math.random().toString(32).substr(2),i=["start","end"].map(function(r){return[n,r,u].join("-")}),c=r(i,2),s=c[0],f=c[1],a.mark(s),t.next=6,e();case 6:return l=t.sent,a.mark(f),a.measure(n,s,f),a.clearMarks(s),a.clearMarks(f),t.abrupt("return",l);case 12:case"end":return t.stop()}},t)}))).apply(this,arguments)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.measure=c;
},{}],"uBxZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"assets",{enumerable:!0,get:function(){return e.assets}}),Object.defineProperty(exports,"connection",{enumerable:!0,get:function(){return r.connection}}),Object.defineProperty(exports,"display",{enumerable:!0,get:function(){return t.display}}),Object.defineProperty(exports,"dom",{enumerable:!0,get:function(){return n.dom}}),Object.defineProperty(exports,"memory",{enumerable:!0,get:function(){return o.memory}}),Object.defineProperty(exports,"navigation",{enumerable:!0,get:function(){return i.navigation}}),Object.defineProperty(exports,"paint",{enumerable:!0,get:function(){return u.paint}}),Object.defineProperty(exports,"all",{enumerable:!0,get:function(){return a.all}}),Object.defineProperty(exports,"fps",{enumerable:!0,get:function(){return s.fps}}),Object.defineProperty(exports,"measure",{enumerable:!0,get:function(){return p.measure}});var e=require("./assets"),r=require("./connection"),t=require("./display"),n=require("./dom"),o=require("./memory"),i=require("./navigation"),u=require("./paint"),a=require("./all"),s=require("./fps"),p=require("./measure");
},{"./assets":"noNX","./connection":"PKRT","./display":"PWnK","./dom":"aHI8","./memory":"sAwE","./navigation":"iTLC","./paint":"Vd3j","./all":"iXFF","./fps":"eJ9r","./measure":"XxLS"}],"mpVp":[function(require,module,exports) {
"use strict";var e=require("web-vitals"),s=require("../src/index.js");Object.assign(window,{measure:s.measure,fps:s.fps,all:s.all,getLCP:e.getLCP,getFID:e.getFID,getCLS:e.getCLS});
},{"web-vitals":"Qvvn","../src/index.js":"uBxZ"}]},{},["mpVp"], null)
//# sourceMappingURL=script.3485b38b.js.map