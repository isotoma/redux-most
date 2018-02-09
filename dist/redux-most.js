(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("most"));
	else if(typeof define === 'function' && define.amd)
		define(["most"], factory);
	else if(typeof exports === 'object')
		exports["ReduxMost"] = factory(require("most"));
	else
		root["ReduxMost"] = factory(root["most"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export cons */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return drop; });
/* unused harmony export tail */
/* unused harmony export copy */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return map; });
/* unused harmony export reduce */
/* unused harmony export replace */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return remove; });
/* unused harmony export removeAll */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return findIndex; });
/* unused harmony export isArrayLike */
/* unused harmony export id */
/* unused harmony export compose */
/* unused harmony export apply */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return curry2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return curry3; });
/* unused harmony export curry4 */
/** @license MIT License (c) copyright 2010-2016 original author or authors */

// Non-mutating array operations

// cons :: a -> [a] -> [a]
// a with x prepended
function cons (x, a) {
  var l = a.length;
  var b = new Array(l + 1);
  b[0] = x;
  for (var i = 0; i < l; ++i) {
    b[i + 1] = a[i];
  }
  return b
}

// append :: a -> [a] -> [a]
// a with x appended
function append (x, a) {
  var l = a.length;
  var b = new Array(l + 1);
  for (var i = 0; i < l; ++i) {
    b[i] = a[i];
  }

  b[l] = x;
  return b
}

// drop :: Int -> [a] -> [a]
// drop first n elements
function drop (n, a) { // eslint-disable-line complexity
  if (n < 0) {
    throw new TypeError('n must be >= 0')
  }

  var l = a.length;
  if (n === 0 || l === 0) {
    return a
  }

  if (n >= l) {
    return []
  }

  return unsafeDrop(n, a, l - n)
}

// unsafeDrop :: Int -> [a] -> Int -> [a]
// Internal helper for drop
function unsafeDrop (n, a, l) {
  var b = new Array(l);
  for (var i = 0; i < l; ++i) {
    b[i] = a[n + i];
  }
  return b
}

// tail :: [a] -> [a]
// drop head element
function tail (a) {
  return drop(1, a)
}

// copy :: [a] -> [a]
// duplicate a (shallow duplication)
function copy (a) {
  var l = a.length;
  var b = new Array(l);
  for (var i = 0; i < l; ++i) {
    b[i] = a[i];
  }
  return b
}

// map :: (a -> b) -> [a] -> [b]
// transform each element with f
function map (f, a) {
  var l = a.length;
  var b = new Array(l);
  for (var i = 0; i < l; ++i) {
    b[i] = f(a[i]);
  }
  return b
}

// reduce :: (a -> b -> a) -> a -> [b] -> a
// accumulate via left-fold
function reduce (f, z, a) {
  var r = z;
  for (var i = 0, l = a.length; i < l; ++i) {
    r = f(r, a[i], i);
  }
  return r
}

// replace :: a -> Int -> [a]
// replace element at index
function replace (x, i, a) { // eslint-disable-line complexity
  if (i < 0) {
    throw new TypeError('i must be >= 0')
  }

  var l = a.length;
  var b = new Array(l);
  for (var j = 0; j < l; ++j) {
    b[j] = i === j ? x : a[j];
  }
  return b
}

// remove :: Int -> [a] -> [a]
// remove element at index
function remove (i, a) {  // eslint-disable-line complexity
  if (i < 0) {
    throw new TypeError('i must be >= 0')
  }

  var l = a.length;
  if (l === 0 || i >= l) { // exit early if index beyond end of array
    return a
  }

  if (l === 1) { // exit early if index in bounds and length === 1
    return []
  }

  return unsafeRemove(i, a, l - 1)
}

// unsafeRemove :: Int -> [a] -> Int -> [a]
// Internal helper to remove element at index
function unsafeRemove (i, a, l) {
  var b = new Array(l);
  var j;
  for (j = 0; j < i; ++j) {
    b[j] = a[j];
  }
  for (j = i; j < l; ++j) {
    b[j] = a[j + 1];
  }

  return b
}

// removeAll :: (a -> boolean) -> [a] -> [a]
// remove all elements matching a predicate
function removeAll (f, a) {
  var l = a.length;
  var b = new Array(l);
  var j = 0;
  for (var x = (void 0), i = 0; i < l; ++i) {
    x = a[i];
    if (!f(x)) {
      b[j] = x;
      ++j;
    }
  }

  b.length = j;
  return b
}

// findIndex :: a -> [a] -> Int
// find index of x in a, from the left
function findIndex (x, a) {
  for (var i = 0, l = a.length; i < l; ++i) {
    if (x === a[i]) {
      return i
    }
  }
  return -1
}

// isArrayLike :: * -> boolean
// Return true iff x is array-like
function isArrayLike (x) {
  return x != null && typeof x.length === 'number' && typeof x !== 'function'
}

/** @license MIT License (c) copyright 2010-2016 original author or authors */

// id :: a -> a
var id = function (x) { return x; };

// compose :: (b -> c) -> (a -> b) -> (a -> c)
var compose = function (f, g) { return function (x) { return f(g(x)); }; };

// apply :: (a -> b) -> a -> b
var apply = function (f, x) { return f(x); };

// curry2 :: ((a, b) -> c) -> (a -> b -> c)
function curry2 (f) {
  function curried (a, b) {
    switch (arguments.length) {
      case 0: return curried
      case 1: return function (b) { return f(a, b); }
      default: return f(a, b)
    }
  }
  return curried
}

// curry3 :: ((a, b, c) -> d) -> (a -> b -> c -> d)
function curry3 (f) {
  function curried (a, b, c) { // eslint-disable-line complexity
    switch (arguments.length) {
      case 0: return curried
      case 1: return curry2(function (b, c) { return f(a, b, c); })
      case 2: return function (c) { return f(a, b, c); }
      default:return f(a, b, c)
    }
  }
  return curried
}

// curry4 :: ((a, b, c, d) -> e) -> (a -> b -> c -> d -> e)
function curry4 (f) {
  function curried (a, b, c, d) { // eslint-disable-line complexity
    switch (arguments.length) {
      case 0: return curried
      case 1: return curry3(function (b, c, d) { return f(a, b, c, d); })
      case 2: return curry2(function (c, d) { return f(a, b, c, d); })
      case 3: return function (d) { return f(a, b, c, d); }
      default:return f(a, b, c, d)
    }
  }
  return curried
}

/** @license MIT License (c) copyright 2016 original author or authors */


//# sourceMappingURL=index.es.js.map


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EPIC_BEGIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EPIC_END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return STATE_STREAM_SYMBOL; });
var EPIC_BEGIN = '@@redux-most/EPIC_BEGIN';
var EPIC_END = '@@redux-most/EPIC_END';
var STATE_STREAM_SYMBOL = Symbol('@@redux-most/STATE_STREAM');

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MulticastSource; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__most_prelude__ = __webpack_require__(0);


var MulticastDisposable = function MulticastDisposable (source, sink) {
  this.source = source
  this.sink = sink
  this.disposed = false
};

MulticastDisposable.prototype.dispose = function dispose () {
  if (this.disposed) {
    return
  }
  this.disposed = true
  var remaining = this.source.remove(this.sink)
  return remaining === 0 && this.source._dispose()
};

function tryEvent (t, x, sink) {
  try {
    sink.event(t, x)
  } catch (e) {
    sink.error(t, e)
  }
}

function tryEnd (t, x, sink) {
  try {
    sink.end(t, x)
  } catch (e) {
    sink.error(t, e)
  }
}

var dispose = function (disposable) { return disposable.dispose(); }

var emptyDisposable = {
  dispose: function dispose$1 () {}
}

var MulticastSource = function MulticastSource (source) {
  this.source = source
  this.sinks = []
  this._disposable = emptyDisposable
};

MulticastSource.prototype.run = function run (sink, scheduler) {
  var n = this.add(sink)
  if (n === 1) {
    this._disposable = this.source.run(this, scheduler)
  }
  return new MulticastDisposable(this, sink)
};

MulticastSource.prototype._dispose = function _dispose () {
  var disposable = this._disposable
  this._disposable = emptyDisposable
  return Promise.resolve(disposable).then(dispose)
};

MulticastSource.prototype.add = function add (sink) {
  this.sinks = Object(__WEBPACK_IMPORTED_MODULE_0__most_prelude__["a" /* append */])(sink, this.sinks)
  return this.sinks.length
};

MulticastSource.prototype.remove = function remove$1 (sink) {
  var i = Object(__WEBPACK_IMPORTED_MODULE_0__most_prelude__["e" /* findIndex */])(sink, this.sinks)
  // istanbul ignore next
  if (i >= 0) {
    this.sinks = Object(__WEBPACK_IMPORTED_MODULE_0__most_prelude__["g" /* remove */])(i, this.sinks)
  }

  return this.sinks.length
};

MulticastSource.prototype.event = function event (time, value) {
  var s = this.sinks
  if (s.length === 1) {
    return s[0].event(time, value)
  }
  for (var i = 0; i < s.length; ++i) {
    tryEvent(time, value, s[i])
  }
};

MulticastSource.prototype.end = function end (time, value) {
  var s = this.sinks
  for (var i = 0; i < s.length; ++i) {
    tryEnd(time, value, s[i])
  }
};

MulticastSource.prototype.error = function error (time, err) {
  var s = this.sinks
  for (var i = 0; i < s.length; ++i) {
    s[i].error(time, err)
  }
};

function multicast (stream) {
  var source = stream.source
  return source instanceof MulticastSource
    ? stream
    : new stream.constructor(new MulticastSource(source))
}

/* unused harmony default export */ var _unused_webpack_default_export = (multicast);
//# sourceMappingURL=multicast.es.js.map


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HoldSubjectSource__ = __webpack_require__(9);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__HoldSubjectSource__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__combineEpics__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineEpics", function() { return __WEBPACK_IMPORTED_MODULE_0__combineEpics__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__createEpicMiddleware__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createEpicMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_1__createEpicMiddleware__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createStateStreamEnhancer__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStateStreamEnhancer", function() { return __WEBPACK_IMPORTED_MODULE_2__createStateStreamEnhancer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "EPIC_END", function() { return __WEBPACK_IMPORTED_MODULE_3__constants__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__select__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return __WEBPACK_IMPORTED_MODULE_4__select__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectArray__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selectArray", function() { return __WEBPACK_IMPORTED_MODULE_5__selectArray__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__withState__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "withState", function() { return __WEBPACK_IMPORTED_MODULE_6__withState__["a"]; });








/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return combineEpics; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_prelude__ = __webpack_require__(0);



var combineEpics = function combineEpics(epicsArray) {
  return function (actions, store, dependencies) {
    if (!epicsArray || !Array.isArray(epicsArray)) {
      throw new TypeError('You must provide an array of Epics to combineEpics.');
    }

    if (epicsArray.length < 1) {
      throw new TypeError('The array passed to combineEpics must contain at least one Epic.');
    }

    var callEpic = function callEpic(epic) {
      if (typeof epic !== 'function') {
        throw new TypeError('The array passed to combineEpics must contain only Epics (functions).');
      }

      var out = epic(actions, store, dependencies);

      if (!out || !out.source) {
        var epicIdentifier = epic.name ? 'named ' + epic.name : 'at index ' + Object(__WEBPACK_IMPORTED_MODULE_1__most_prelude__["e" /* findIndex */])(epic, epicsArray) + ' of the passed in array';

        throw new TypeError('All Epics in the array provided to combineEpics must return a stream. Check the return value of the Epic ' + epicIdentifier + '.');
      }

      return out;
    };

    return Object(__WEBPACK_IMPORTED_MODULE_0_most__["mergeArray"])(Object(__WEBPACK_IMPORTED_MODULE_1__most_prelude__["f" /* map */])(callEpic, epicsArray));
  };
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createEpicMiddleware; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_most_subject__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(2);





var createEpicMiddleware = function createEpicMiddleware(epic, dependencies) {
  if (typeof epic !== 'function') {
    throw new TypeError('You must provide an Epic (a function) to createEpicMiddleware.');
  }

  var actionsIn$ = Object(__WEBPACK_IMPORTED_MODULE_1_most_subject__["a" /* async */])();

  var epic$ = Object(__WEBPACK_IMPORTED_MODULE_1_most_subject__["a" /* async */])();

  var middlewareApi = void 0;

  var epicMiddleware = function epicMiddleware(_middlewareApi) {
    middlewareApi = _middlewareApi;

    return function (next) {
      var callNextEpic = function callNextEpic(nextEpic) {
        middlewareApi.dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* epicBegin */])());

        var state$ = middlewareApi[__WEBPACK_IMPORTED_MODULE_3__constants__["c" /* STATE_STREAM_SYMBOL */]];
        var isUsingStateStreamEnhancer = !!state$;

        return isUsingStateStreamEnhancer ? nextEpic(actionsIn$, state$, dependencies) : nextEpic(actionsIn$, middlewareApi, dependencies);
      };

      var actionsOut$ = Object(__WEBPACK_IMPORTED_MODULE_0_most__["switchLatest"])(Object(__WEBPACK_IMPORTED_MODULE_0_most__["map"])(callNextEpic, epic$));
      Object(__WEBPACK_IMPORTED_MODULE_0_most__["observe"])(middlewareApi.dispatch, actionsOut$);

      epic$.next(epic);

      return function (action) {
        var result = next(action);
        actionsIn$.next(action);
        return result;
      };
    };
  };

  epicMiddleware.replaceEpic = function (nextEpic) {
    middlewareApi.dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["b" /* epicEnd */])());
    epic$.next(nextEpic);
  };

  return epicMiddleware;
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sources__ = __webpack_require__(4);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subjects__ = __webpack_require__(10);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__subjects__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__combinators__ = __webpack_require__(13);
/* unused harmony namespace reexport */



//# sourceMappingURL=index.js.map

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoldSubjectSource; });
/* unused harmony export dropAndAppend */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_multicast__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__most_prelude__ = __webpack_require__(0);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



var HoldSubjectSource = (function (_super) {
    __extends(HoldSubjectSource, _super);
    function HoldSubjectSource(source, bufferSize) {
        var _this = _super.call(this, source) || this;
        _this.has = false;
        _this.buffer = [];
        _this.bufferSize = bufferSize;
        return _this;
    }
    HoldSubjectSource.prototype.add = function (sink) {
        if (this.has) {
            pushEvents(this.buffer, sink);
        }
        return _super.prototype.add.call(this, sink);
    };
    HoldSubjectSource.prototype.event = function (time, value) {
        this.has = true;
        this.buffer = dropAndAppend(value, this.buffer, this.bufferSize);
        return _super.prototype.event.call(this, time, value);
    };
    return HoldSubjectSource;
}(__WEBPACK_IMPORTED_MODULE_1__most_multicast__["a" /* MulticastSource */]));

function pushEvents(buffer, sink) {
    var length = buffer.length;
    for (var i = 0; i < length; ++i) {
        sink.event(__WEBPACK_IMPORTED_MODULE_0_most__["defaultScheduler"].now(), buffer[i]);
    }
}
function dropAndAppend(value, buffer, bufferSize) {
    if (buffer.length === bufferSize) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__most_prelude__["a" /* append */])(value, Object(__WEBPACK_IMPORTED_MODULE_2__most_prelude__["d" /* drop */])(1, buffer));
    }
    return Object(__WEBPACK_IMPORTED_MODULE_2__most_prelude__["a" /* append */])(value, buffer);
}
//# sourceMappingURL=HoldSubjectSource.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__async__ = __webpack_require__(11);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__async__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sync__ = __webpack_require__(12);
/* unused harmony namespace reexport */


//# sourceMappingURL=index.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = async;
/* unused harmony export asAsync */
/* unused harmony export AsyncSubject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_multicast__ = __webpack_require__(3);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


function async() {
    return asAsync(Object(__WEBPACK_IMPORTED_MODULE_0_most__["never"])());
}
function asAsync(stream) {
    return new AsyncSubject(new __WEBPACK_IMPORTED_MODULE_1__most_multicast__["a" /* MulticastSource */](stream.source));
}
var AsyncSubject = (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject(source) {
        return _super.call(this, source) || this;
    }
    AsyncSubject.prototype.next = function (value) {
        __WEBPACK_IMPORTED_MODULE_0_most__["defaultScheduler"].asap(__WEBPACK_IMPORTED_MODULE_0_most__["PropagateTask"].event(value, this.source));
        return this;
    };
    AsyncSubject.prototype.error = function (err) {
        __WEBPACK_IMPORTED_MODULE_0_most__["defaultScheduler"].asap(__WEBPACK_IMPORTED_MODULE_0_most__["PropagateTask"].error(err, this.source));
        return this;
    };
    AsyncSubject.prototype.complete = function (value) {
        __WEBPACK_IMPORTED_MODULE_0_most__["defaultScheduler"].asap(__WEBPACK_IMPORTED_MODULE_0_most__["PropagateTask"].end(value, this.source));
        return this;
    };
    return AsyncSubject;
}(__WEBPACK_IMPORTED_MODULE_0_most__["Stream"]));

//# sourceMappingURL=index.js.map

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export sync */
/* unused harmony export asSync */
/* unused harmony export SyncSubject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_multicast__ = __webpack_require__(3);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


function sync() {
    return asSync(Object(__WEBPACK_IMPORTED_MODULE_0_most__["never"])());
}
function asSync(stream) {
    return new SyncSubject(new __WEBPACK_IMPORTED_MODULE_1__most_multicast__["a" /* MulticastSource */](stream.source));
}
var SyncSubject = (function (_super) {
    __extends(SyncSubject, _super);
    function SyncSubject(source) {
        return _super.call(this, source) || this;
    }
    SyncSubject.prototype.next = function (value) {
        this.source.event(__WEBPACK_IMPORTED_MODULE_0_most__["defaultScheduler"].now(), value);
        return this;
    };
    SyncSubject.prototype.error = function (err) {
        this.source.error(__WEBPACK_IMPORTED_MODULE_0_most__["defaultScheduler"].now(), err);
        return this;
    };
    SyncSubject.prototype.complete = function (value) {
        this.source.end(__WEBPACK_IMPORTED_MODULE_0_most__["defaultScheduler"].now(), value);
        return this;
    };
    return SyncSubject;
}(__WEBPACK_IMPORTED_MODULE_0_most__["Stream"]));

//# sourceMappingURL=index.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__next__ = __webpack_require__(14);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error__ = __webpack_require__(15);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__complete__ = __webpack_require__(16);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hold__ = __webpack_require__(17);
/* unused harmony namespace reexport */




//# sourceMappingURL=index.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export next */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__most_prelude__ = __webpack_require__(0);

var next = Object(__WEBPACK_IMPORTED_MODULE_0__most_prelude__["b" /* curry2 */])(function next(value, subject) {
    return subject.next(value);
});
//# sourceMappingURL=next.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export error */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__most_prelude__ = __webpack_require__(0);

var error = Object(__WEBPACK_IMPORTED_MODULE_0__most_prelude__["b" /* curry2 */])(function error(err, subject) {
    return subject.error(err);
});
//# sourceMappingURL=error.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export complete */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__most_prelude__ = __webpack_require__(0);

var complete = Object(__WEBPACK_IMPORTED_MODULE_0__most_prelude__["b" /* curry2 */])(function complete(value, subject) {
    return subject.complete(value);
});
//# sourceMappingURL=complete.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export hold */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__most_prelude__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sources__ = __webpack_require__(4);


var hold = Object(__WEBPACK_IMPORTED_MODULE_0__most_prelude__["b" /* curry2 */])(function hold(bufferSize, subject) {
    return new subject.constructor(new __WEBPACK_IMPORTED_MODULE_1__sources__["a" /* HoldSubjectSource */](subject.source, bufferSize));
});
//# sourceMappingURL=hold.js.map

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return epicBegin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return epicEnd; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);


var epicBegin = function epicBegin() {
  return { type: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* EPIC_BEGIN */] };
};

var epicEnd = function epicEnd() {
  return { type: __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* EPIC_END */] };
};

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createStateStreamEnhancer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var createStateStreamEnhancer = function createStateStreamEnhancer(epicMiddleware) {
  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;

      var middlewareApi = _defineProperty({
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      }, __WEBPACK_IMPORTED_MODULE_1__constants__["c" /* STATE_STREAM_SYMBOL */], Object(__WEBPACK_IMPORTED_MODULE_0_most__["skipRepeats"])(Object(__WEBPACK_IMPORTED_MODULE_0_most__["from"])(store)));

      _dispatch = epicMiddleware(middlewareApi)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return select; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_prelude__ = __webpack_require__(0);



var select = Object(__WEBPACK_IMPORTED_MODULE_1__most_prelude__["b" /* curry2 */])(function (actionType, stream) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_most__["filter"])(function (_ref) {
    var type = _ref.type;
    return type && type === actionType;
  }, stream);
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectArray; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_prelude__ = __webpack_require__(0);



var selectArray = Object(__WEBPACK_IMPORTED_MODULE_1__most_prelude__["b" /* curry2 */])(function (actionTypes, stream) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_most__["filter"])(function (_ref) {
    var type = _ref.type;
    return type && Object(__WEBPACK_IMPORTED_MODULE_1__most_prelude__["e" /* findIndex */])(type, actionTypes) !== -1;
  }, stream);
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return withState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_prelude__ = __webpack_require__(0);



var flippedSampleState = Object(__WEBPACK_IMPORTED_MODULE_1__most_prelude__["c" /* curry3 */])(function (f, stateStream, samplerStream) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_most__["sampleArray"])(f, samplerStream, [stateStream, samplerStream]);
});

var toArray = function toArray(state, samplerStreamEvent) {
  return [state, samplerStreamEvent];
};

var withState = flippedSampleState(toArray);

/***/ })
/******/ ]);
});