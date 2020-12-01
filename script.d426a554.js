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
})({"QVnC":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"f6pS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTTFB = exports.getLCP = exports.getFID = exports.getFCP = exports.getCLS = void 0;

var t,
    e,
    n,
    i,
    a = function (t, e) {
  return {
    name: t,
    value: void 0 === e ? -1 : 0,
    delta: 0,
    entries: [],
    id: "v1-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
  };
},
    r = function (t, e) {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(t)) {
      var n = new PerformanceObserver(function (t) {
        return t.getEntries().map(e);
      });
      return n.observe({
        type: t,
        buffered: !0
      }), n;
    }
  } catch (t) {}
},
    o = !1,
    u = function (t, e) {
  o || "undefined" != typeof InstallTrigger || (addEventListener("beforeunload", function () {}), o = !0);
  addEventListener("visibilitychange", function n(i) {
    "hidden" === document.visibilityState && (t(i), e && removeEventListener("visibilitychange", n, !0));
  }, !0);
},
    c = function (t) {
  addEventListener("pageshow", function (e) {
    e.persisted && t(e);
  }, !0);
},
    s = new WeakSet(),
    f = function (t, e, n) {
  var i;
  return function () {
    e.value >= 0 && (n || s.has(e) || "hidden" === document.visibilityState) && (e.delta = e.value - (i || 0), (e.delta || void 0 === i) && (i = e.value, t(e)));
  };
},
    m = function (t, e) {
  var n,
      i = a("CLS", 0),
      o = function (t) {
    t.hadRecentInput || (i.value += t.value, i.entries.push(t), n());
  },
      s = r("layout-shift", o);

  s && (n = f(t, i, e), u(function () {
    s.takeRecords().map(o), n();
  }), c(function () {
    i = a("CLS", 0), n = f(t, i, e);
  }));
},
    d = -1,
    p = function () {
  return "hidden" === document.visibilityState ? 0 : 1 / 0;
},
    v = function () {
  u(function (t) {
    var e = t.timeStamp;
    d = e;
  }, !0);
},
    l = function () {
  return d < 0 && (d = p(), v(), c(function () {
    setTimeout(function () {
      d = p(), v();
    }, 0);
  })), {
    get timeStamp() {
      return d;
    }

  };
},
    S = function (t, e) {
  var n,
      i = l(),
      o = a("FCP"),
      u = r("paint", function (t) {
    "first-contentful-paint" === t.name && (u && u.disconnect(), t.startTime < i.timeStamp && (o.value = t.startTime, o.entries.push(t), s.add(o), n()));
  });
  u && (n = f(t, o, e), c(function (i) {
    o = a("FCP"), n = f(t, o, e), requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        o.value = performance.now() - i.timeStamp, s.add(o), n();
      });
    });
  }));
},
    y = {
  passive: !0,
  capture: !0
},
    h = new Date(),
    g = function (i, a) {
  t || (t = a, e = i, n = new Date(), T(removeEventListener), w());
},
    w = function () {
  if (e >= 0 && e < n - h) {
    var a = {
      entryType: "first-input",
      name: t.type,
      target: t.target,
      cancelable: t.cancelable,
      startTime: t.timeStamp,
      processingStart: t.timeStamp + e
    };
    i.map(function (t) {
      t(a);
    }), i = [];
  }
},
    L = function (t) {
  if (t.cancelable) {
    var e = (t.timeStamp > 1e12 ? new Date() : performance.now()) - t.timeStamp;
    "pointerdown" == t.type ? function (t, e) {
      var n = function () {
        g(t, e), a();
      },
          i = function () {
        a();
      },
          a = function () {
        removeEventListener("pointerup", n, y), removeEventListener("pointercancel", i, y);
      };

      addEventListener("pointerup", n, y), addEventListener("pointercancel", i, y);
    }(e, t) : g(e, t);
  }
},
    T = function (t) {
  ["mousedown", "keydown", "touchstart", "pointerdown"].map(function (e) {
    return t(e, L, y);
  });
},
    E = function (n, o) {
  var m,
      d = l(),
      p = a("FID"),
      v = function (t) {
    t.startTime < d.timeStamp && (p.value = t.processingStart - t.startTime, p.entries.push(t), s.add(p), m());
  },
      S = r("first-input", v);

  m = f(n, p, o), S && u(function () {
    S.takeRecords().map(v), S.disconnect();
  }, !0), S && c(function () {
    var r;
    p = a("FID"), m = f(n, p, o), i = [], e = -1, t = null, T(addEventListener), r = v, i.push(r), w();
  });
},
    b = function (t, e) {
  var n,
      i = l(),
      o = a("LCP"),
      m = function (t) {
    var e = t.startTime;
    e < i.timeStamp && (o.value = e, o.entries.push(t)), n();
  },
      d = r("largest-contentful-paint", m);

  if (d) {
    n = f(t, o, e);

    var p = function () {
      s.has(o) || (d.takeRecords().map(m), d.disconnect(), s.add(o), n());
    };

    ["keydown", "click"].map(function (t) {
      addEventListener(t, p, {
        once: !0,
        capture: !0
      });
    }), u(p, !0), c(function (i) {
      o = a("LCP"), n = f(t, o, e), requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          o.value = performance.now() - i.timeStamp, s.add(o), n();
        });
      });
    });
  }
},
    F = function (t) {
  var e,
      n = a("TTFB");
  e = function () {
    try {
      var e = performance.getEntriesByType("navigation")[0] || function () {
        var t = performance.timing,
            e = {
          entryType: "navigation",
          startTime: 0
        };

        for (var n in t) "navigationStart" !== n && "toJSON" !== n && (e[n] = Math.max(t[n] - t.navigationStart, 0));

        return e;
      }();

      n.value = n.delta = e.responseStart, n.entries = [e], t(n);
    } catch (t) {}
  }, "complete" === document.readyState ? setTimeout(e, 0) : addEventListener("pageshow", e);
};

exports.getTTFB = F;
exports.getLCP = b;
exports.getFID = E;
exports.getFCP = S;
exports.getCLS = m;
},{}],"U0Dg":[function(require,module,exports) {
var global = arguments[3];
var define;
(function(){var h="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,k="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};function l(){l=function(){};h.Symbol||(h.Symbol=m)}var n=0;function m(a){return"jscomp_symbol_"+(a||"")+n++}
function p(){l();var a=h.Symbol.iterator;a||(a=h.Symbol.iterator=h.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&k(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return q(this)}});p=function(){}}function q(a){var b=0;return r(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}function r(a){p();a={next:a};a[h.Symbol.iterator]=function(){return this};return a}function t(a){p();var b=a[Symbol.iterator];return b?b.call(a):q(a)}
function u(a){if(!(a instanceof Array)){a=t(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}var v=0;function w(a,b){var c=XMLHttpRequest.prototype.send,d=v++;XMLHttpRequest.prototype.send=function(f){for(var e=[],g=0;g<arguments.length;++g)e[g-0]=arguments[g];var E=this;a(d);this.addEventListener("readystatechange",function(){4===E.readyState&&b(d)});return c.apply(this,e)}}
function x(a,b){var c=fetch;fetch=function(d){for(var f=[],e=0;e<arguments.length;++e)f[e-0]=arguments[e];return new Promise(function(d,e){var g=v++;a(g);c.apply(null,[].concat(u(f))).then(function(a){b(g);d(a)},function(a){b(a);e(a)})})}}var y="img script iframe link audio video source".split(" ");function z(a,b){a=t(a);for(var c=a.next();!c.done;c=a.next())if(c=c.value,b.includes(c.nodeName.toLowerCase())||z(c.children,b))return!0;return!1}
function A(a){var b=new MutationObserver(function(c){c=t(c);for(var b=c.next();!b.done;b=c.next())b=b.value,"childList"==b.type&&z(b.addedNodes,y)?a(b):"attributes"==b.type&&y.includes(b.target.tagName.toLowerCase())&&a(b)});b.observe(document,{attributes:!0,childList:!0,subtree:!0,attributeFilter:["href","src"]});return b}
function B(a,b){if(2<a.length)return performance.now();var c=[];b=t(b);for(var d=b.next();!d.done;d=b.next())d=d.value,c.push({timestamp:d.start,type:"requestStart"}),c.push({timestamp:d.end,type:"requestEnd"});b=t(a);for(d=b.next();!d.done;d=b.next())c.push({timestamp:d.value,type:"requestStart"});c.sort(function(a,b){return a.timestamp-b.timestamp});a=a.length;for(b=c.length-1;0<=b;b--)switch(d=c[b],d.type){case "requestStart":a--;break;case "requestEnd":a++;if(2<a)return d.timestamp;break;default:throw Error("Internal Error: This should never happen");
}return 0}function C(a){a=a?a:{};this.w=!!a.useMutationObserver;this.u=a.minValue||null;a=window.__tti&&window.__tti.e;var b=window.__tti&&window.__tti.o;this.a=a?a.map(function(a){return{start:a.startTime,end:a.startTime+a.duration}}):[];b&&b.disconnect();this.b=[];this.f=new Map;this.j=null;this.v=-Infinity;this.i=!1;this.h=this.c=this.s=null;w(this.m.bind(this),this.l.bind(this));x(this.m.bind(this),this.l.bind(this));D(this);this.w&&(this.h=A(this.B.bind(this)))}
C.prototype.getFirstConsistentlyInteractive=function(){var a=this;return new Promise(function(b){a.s=b;"complete"==document.readyState?F(a):window.addEventListener("load",function(){F(a)})})};function F(a){a.i=!0;var b=0<a.a.length?a.a[a.a.length-1].end:0,c=B(a.g,a.b);G(a,Math.max(c+5E3,b))}
function G(a,b){!a.i||a.v>b||(clearTimeout(a.j),a.j=setTimeout(function(){var b=performance.timing.navigationStart,d=B(a.g,a.b),b=(window.a&&window.a.A?1E3*window.a.A().C-b:0)||performance.timing.domContentLoadedEventEnd-b;if(a.u)var f=a.u;else performance.timing.domContentLoadedEventEnd?(f=performance.timing,f=f.domContentLoadedEventEnd-f.navigationStart):f=null;var e=performance.now();null===f&&G(a,Math.max(d+5E3,e+1E3));var g=a.a;5E3>e-d?d=null:(d=g.length?g[g.length-1].end:b,d=5E3>e-d?null:Math.max(d,
f));d&&(a.s(d),clearTimeout(a.j),a.i=!1,a.c&&a.c.disconnect(),a.h&&a.h.disconnect());G(a,performance.now()+1E3)},b-performance.now()),a.v=b)}
function D(a){a.c=new PerformanceObserver(function(b){b=t(b.getEntries());for(var c=b.next();!c.done;c=b.next())if(c=c.value,"resource"===c.entryType&&(a.b.push({start:c.fetchStart,end:c.responseEnd}),G(a,B(a.g,a.b)+5E3)),"longtask"===c.entryType){var d=c.startTime+c.duration;a.a.push({start:c.startTime,end:d});G(a,d+5E3)}});a.c.observe({entryTypes:["longtask","resource"]})}C.prototype.m=function(a){this.f.set(a,performance.now())};C.prototype.l=function(a){this.f.delete(a)};
C.prototype.B=function(){G(this,performance.now()+5E3)};h.Object.defineProperties(C.prototype,{g:{configurable:!0,enumerable:!0,get:function(){return[].concat(u(this.f.values()))}}});var H={getFirstConsistentlyInteractive:function(a){a=a?a:{};return"PerformanceLongTaskTiming"in window?(new C(a)).getFirstConsistentlyInteractive():Promise.resolve(null)}};
"undefined"!=typeof module&&module.exports?module.exports=H:"function"===typeof define&&define.amd?define("ttiPolyfill",[],function(){return H}):window.ttiPolyfill=H;})();

},{}],"VV1I":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntries = void 0;

/**
 * Retrieve list of PerformanceTiming objects via promise
 * @param {string}
 * @returns {Promise<PerformanceEntry[]>}
 */
var getEntries = function getEntries() {
  for (var _len = arguments.length, entryTypes = new Array(_len), _key = 0; _key < _len; _key++) {
    entryTypes[_key] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    if (!window.performance) {
      reject(new Error('Performance API is not supported'));
      return;
    }

    var entries = entryTypes.map(function (entryType) {
      return window.performance.getEntriesByType(entryType);
    }).flat();

    if (entries.length) {
      resolve(entries);
      return;
    }

    if (typeof window.PerformanceObserver !== 'function') {
      reject(new Error('PerformanceObserver is not supported'));
      return;
    }

    var observer = new window.PerformanceObserver(function (entryList, observer) {
      resolve(entryList.getEntries());
      observer.disconnect();
    });
    observer.observe({
      entryTypes: entryTypes
    });
  });
};

exports.getEntries = getEntries;
},{}],"QiGE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = getType;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function getType(_x) {
  return _getType.apply(this, arguments);
}

function _getType() {
  _getType = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var initiatorType, name, extension, _ref2, type;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            initiatorType = _ref.initiatorType, name = _ref.name;

            if (!Object.hasOwnProperty.call(initiators, initiatorType)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", initiators[initiatorType]);

          case 3:
            extension = get(name, extensionPattern);
            _ref2 = typePatterns.find(function (_ref3) {
              var pattern = _ref3.pattern;
              return get(extension, pattern);
            }) || {
              type: OTHER
            }, type = _ref2.type;
            return _context.abrupt("return", type);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getType.apply(this, arguments);
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

var _index = require("../getEntries/index.js");

var _index2 = require("../get-type/index.js");

var _index3 = require("../number/index.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var FINAL_ASSET_PREFIX = 'final_asset';
/**
 * @returns {object}
 */

function assets() {
  return _assets.apply(this, arguments);
}
/**
 * Mutating
 * @param {object} accumulator
 * @param {string} type
 * @param {string} key
 * @param {number} value
 * @returns {void}
 */


function _assets() {
  _assets = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var metrics, entries, _iterator, _step, entry, type, key;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!window.performance || !window.performance.getEntriesByType)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", {});

          case 2:
            metrics = {};
            _context.next = 5;
            return (0, _index.getEntries)('resource');

          case 5:
            entries = _context.sent;
            _iterator = _createForOfIteratorHelper(entries);
            _context.prev = 7;

            _iterator.s();

          case 9:
            if ((_step = _iterator.n()).done) {
              _context.next = 19;
              break;
            }

            entry = _step.value;
            _context.next = 13;
            return (0, _index2.getType)(entry);

          case 13:
            type = _context.sent;
            add(metrics, type, 'count', 1);
            add(metrics, type, 'load', entry.duration);
            add(metrics, type, 'size', entry.decodedBodySize);

          case 17:
            _context.next = 9;
            break;

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](7);

            _iterator.e(_context.t0);

          case 24:
            _context.prev = 24;

            _iterator.f();

            return _context.finish(24);

          case 27:
            for (key in metrics) {
              if (Number.isNaN(metrics[key])) {
                metrics[key] = undefined;
              }
            }

            return _context.abrupt("return", metrics);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 21, 24, 27]]);
  }));
  return _assets.apply(this, arguments);
}

function add(accumulator, type, key, value) {
  var field = [FINAL_ASSET_PREFIX, type, key].join('_');
  accumulator[field] = accumulator[field] || 0;
  accumulator[field] += (0, _index3.number)(value) || 0;
}
},{"../getEntries/index.js":"VV1I","../get-type/index.js":"QiGE","../number/index.js":"yLhy"}],"PKRT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = connection;

var _index = require("../getEntries/index.js");

var _index2 = require("../number/index.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  return _connection.apply(this, arguments);
}

function _connection() {
  _connection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _ref, connection, result, _yield$getEntries, _yield$getEntries2, _yield$getEntries2$, _yield$getEntries2$$n, navigation;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = window.navigator || {}, connection = _ref.connection;
            result = {};
            _context.prev = 2;
            _context.next = 5;
            return (0, _index.getEntries)('navigation');

          case 5:
            _yield$getEntries = _context.sent;
            _yield$getEntries2 = _slicedToArray(_yield$getEntries, 1);
            _yield$getEntries2$ = _yield$getEntries2[0];
            _yield$getEntries2$ = _yield$getEntries2$ === void 0 ? {} : _yield$getEntries2$;
            _yield$getEntries2$$n = _yield$getEntries2$.navigation, navigation = _yield$getEntries2$$n === void 0 ? performance.navigation : _yield$getEntries2$$n;
            result.navigation_type = typeof navigation.type === 'number' ? LEGACY_NAVIGATION_TYPES[navigation.type] : navigation.type;
            _context.next = 15;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);

          case 15:
            if (connection) {
              Object.assign(result, {
                connection_type: connection.type,
                // bluetooth, cellular, ethernet, none, wifi, wimax, other, unknown
                effective_bandwidth: (0, _index2.number)(connection.downlink),
                // MBsS
                effective_connection_type: connection.effectiveType,
                // slow-2g, 2g, 3g, 4g
                effective_max_bandwidth: (0, _index2.number)(connection.downlinkMax),
                // MBsS
                reduced_data_usage: connection.saveData,
                // boolean
                round_trip_time: (0, _index2.number)(connection.rtt)
              });
            }

            return _context.abrupt("return", result);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 13]]);
  }));
  return _connection.apply(this, arguments);
}
},{"../getEntries/index.js":"VV1I","../number/index.js":"yLhy"}],"PWnK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.display = display;

var _index = require("../number/index.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @returns {object}
 */
function display() {
  return _display.apply(this, arguments);
}

function _display() {
  _display = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var result, _window, screen;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = {
              window_inner_height: (0, _index.number)(window.innerHeight),
              window_inner_width: (0, _index.number)(window.innerWidth)
            };
            _window = window, screen = _window.screen;
            screen && Object.assign(result, {
              screen_color_depth: (0, _index.number)(screen.colorDepth),
              screen_pixel_depth: (0, _index.number)(screen.pixelDepth),
              screen_orientation_type: screen.orientation && screen.orientation.type
            });
            return _context.abrupt("return", result);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _display.apply(this, arguments);
}
},{"../number/index.js":"yLhy"}],"aHI8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dom = dom;

var _index = require("../number/index.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  return _dom.apply(this, arguments);
}

function _dom() {
  _dom = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            return _context.abrupt("return", {
              final_dom_node_count: (0, _index.number)(document.querySelectorAll('*').length),
              final_dom_nest_depth: (0, _index.number)(getMaxNestLevel()),
              final_html_size: (0, _index.number)(document.querySelector('html').outerHTML.length)
            });

          case 4:
            _context.prev = 4;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {
              final_dom_node_count: undefined,
              final_dom_nest_depth: undefined,
              final_html_size: undefined
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 4]]);
  }));
  return _dom.apply(this, arguments);
}
},{"../number/index.js":"yLhy"}],"bl8m":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elapsed = elapsed;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function elapsed() {
  return _elapsed.apply(this, arguments);
}

function _elapsed() {
  _elapsed = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var page_time_elapsed;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page_time_elapsed = window.performance.now();
            return _context.abrupt("return", Number.isFinite(page_time_elapsed) ? {
              page_time_elapsed: page_time_elapsed
            } : {});

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _elapsed.apply(this, arguments);
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @type {string[]}
 */
var METRICS = ['jsHeapSizeLimit', 'totalJSHeapSize', 'usedJSHeapSize'];
/**
 * @returns {object}
 */

function memory() {
  return _memory.apply(this, arguments);
}

function _memory() {
  _memory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _ref, memory;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = window.performance || {}, memory = _ref.memory;

            if (memory) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", {});

          case 3:
            return _context.abrupt("return", Object.assign.apply(Object, _toConsumableArray(METRICS.map(function (metric) {
              return _defineProperty({}, (0, _index2.snakeCase)(metric), (0, _index.number)(memory[metric]));
            }))));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _memory.apply(this, arguments);
}
},{"../number/index.js":"yLhy","../snake-case/index.js":"I8z3"}],"iTLC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigation = navigation;

var _index = require("../getEntries/index.js");

var _index2 = require("../number/index.js");

var _index3 = require("../snake-case/index.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @type {string[]}
 */
var METRICS = ['connectEnd', 'connectStart', 'decodedBodySize', 'domainLookupEnd', 'domainLookupStart', 'domComplete', 'domContentLoadedEventEnd', 'domContentLoadedEventStart', 'domInteractive', 'domLoading', 'duration', 'encodedBodySize', 'fetchStart', 'loadEventEnd', 'loadEventStart', 'navigationStart', 'redirectEnd', 'redirectStart', 'requestStart', 'responseEnd', 'responseStart', 'secureConnectionStart', 'transferSize', 'unloadEventEnd', 'unloadEventStart', 'workerStart'];
/**
 * @returns {object}
 */

function navigation() {
  return _navigation.apply(this, arguments);
}

function _navigation() {
  _navigation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _window, performance, _yield$getEntries, _yield$getEntries2, navigation, timing, start, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _window = window, performance = _window.performance;

            if (!(!performance || !performance.getEntriesByType)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", {});

          case 3:
            _context.next = 5;
            return (0, _index.getEntries)('navigation');

          case 5:
            _yield$getEntries = _context.sent;
            _yield$getEntries2 = _slicedToArray(_yield$getEntries, 1);
            navigation = _yield$getEntries2[0];

            if (!navigation) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", Object.assign.apply(Object, _toConsumableArray(METRICS.filter(function (metric) {
              return !Number.isNaN(navigation[metric]);
            }).map(function (metric) {
              return _defineProperty({}, (0, _index3.snakeCase)(metric), (0, _index2.number)(navigation[metric]));
            }))));

          case 10:
            // Fall back to obsolete PerformanceTiming interface
            timing = performance.timing;

            if (timing) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", {});

          case 13:
            start = performance.timeOrigin || timing.navigationStart;

            if (start) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", {});

          case 16:
            result = METRICS.reduce(function (accumulator, metric) {
              var value = timing[metric] - start;
              accumulator[(0, _index3.snakeCase)(metric)] = value < 0 ? undefined : (0, _index2.number)(value);
              return accumulator;
            }, {});
            return _context.abrupt("return", result);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _navigation.apply(this, arguments);
}
},{"../getEntries/index.js":"VV1I","../number/index.js":"yLhy","../snake-case/index.js":"I8z3"}],"Vd3j":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paint = paint;

var _index = require("../getEntries/index.js");

var _index2 = require("../number/index.js");

var _index3 = require("../snake-case/index.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Retrieve all paint entries
 * @returns {object}
 */
function paint() {
  return _paint.apply(this, arguments);
}

function _paint() {
  _paint = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _ref;

    var _window, performance, entries;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _window = window, performance = _window.performance;

            if (!(!performance || !performance.getEntriesByType)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", {});

          case 3:
            _context.next = 5;
            return (0, _index.getEntries)('paint');

          case 5:
            entries = _context.sent;
            return _context.abrupt("return", Object.assign.apply(Object, [{}].concat(_toConsumableArray((_ref = []).concat.apply(_ref, _toConsumableArray(entries.map(function (_ref2) {
              var name = _ref2.name,
                  startTime = _ref2.startTime;
              return _defineProperty({}, (0, _index3.snakeCase)(name), (0, _index2.number)(startTime));
            })))))));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _paint.apply(this, arguments);
}
},{"../getEntries/index.js":"VV1I","../number/index.js":"yLhy","../snake-case/index.js":"I8z3"}],"iXFF":[function(require,module,exports) {
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @returns {object}
 */
var all = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all([(0, _index.navigation)(), (0, _index2.paint)(), (0, _index3.assets)(), (0, _index4.connection)(), (0, _index5.memory)(), (0, _index6.display)(), (0, _index7.dom)(), (0, _index8.elapsed)()]).then(function (results) {
              return Object.assign.apply(Object, [{}].concat(_toConsumableArray(results)));
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function all() {
    return _ref.apply(this, arguments);
  };
}();

exports.all = all;
},{"../navigation/index.js":"iTLC","../paint/index.js":"Vd3j","../assets/index.js":"noNX","../connection/index.js":"PKRT","../memory/index.js":"sAwE","../display/index.js":"PWnK","../dom/index.js":"aHI8","../elapsed/index.js":"bl8m"}],"eJ9r":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fps = void 0;

/**
 * Check window frames per second rate
 * @param {number} sample Number of seconds to check
 * @returns {number?}
 */
var fps = function fps() {
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
};

exports.fps = fps;
},{}],"XxLS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measure = measure;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
  _measure = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn, name) {
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

require("regenerator-runtime");

var _webVitals = require("web-vitals");

var _ttiPolyfill = _interopRequireDefault(require("tti-polyfill"));

var _index = require("../src/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

window.addEventListener('load', function () {
  window.performance_information = {};
  (0, _index.all)().then(function (result) {
    console.log('all', performance.now());
    Object.assign(window.performance_information, result);
    print();
  });
  [[_webVitals.getLCP, 'largest_contentful_paint'], [_webVitals.getFID, 'first_input_delay'], [_webVitals.getCLS, 'comulative_layout_shift']].forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        fn = _ref2[0],
        name = _ref2[1];

    return fn(function (_ref3) {
      var value = _ref3.value;
      console.log(name, performance.now());
      window.performance_information[name] = value;
      print();
    });
  });
  (0, _index.fps)().then(function (result) {
    console.log('fps', performance.now());
    window.performance_information.frames_per_second = result;
    print();
  });

  _ttiPolyfill.default.getFirstConsistentlyInteractive().then(function (result) {
    console.log('tti', performance.now());
    window.performance_information.time_to_interactive = result;
    print();
  });

  function print() {
    document.querySelector('table').innerHTML = Object.entries(window.performance_information).map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          value = _ref5[1];

      return "<tr><td>".concat(key, "</td><td>").concat(value, "</td></tr>");
    }).join('');
  }
}, {
  once: true
});
},{"regenerator-runtime":"QVnC","web-vitals":"f6pS","tti-polyfill":"U0Dg","../src/index.js":"uBxZ"}]},{},["mpVp"], null)
//# sourceMappingURL=script.d426a554.js.map