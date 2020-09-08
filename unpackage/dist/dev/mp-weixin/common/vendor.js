(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 104:
/*!*******************************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/node_modules/js-md5/src/md5.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_MD5_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(/*! !webpack amd options */ 107);
  var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [128, 32768, 8388608, -2147483648];
  var SHIFT = [0, 8, 16, 24];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];
  var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

  var blocks = [],buffer8;
  if (ARRAY_BUFFER) {
    var buffer = new ArrayBuffer(68);
    buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }

  if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  /**
     * @method hex
     * @memberof md5
     * @description Output hash as hex string
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} Hex string
     * @example
     * md5.hex('The quick brown fox jumps over the lazy dog');
     * // equal to
     * md5('The quick brown fox jumps over the lazy dog');
     */
  /**
         * @method digest
         * @memberof md5
         * @description Output hash as bytes array
         * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
         * @returns {Array} Bytes array
         * @example
         * md5.digest('The quick brown fox jumps over the lazy dog');
         */
  /**
             * @method array
             * @memberof md5
             * @description Output hash as bytes array
             * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
             * @returns {Array} Bytes array
             * @example
             * md5.array('The quick brown fox jumps over the lazy dog');
             */
  /**
                 * @method arrayBuffer
                 * @memberof md5
                 * @description Output hash as ArrayBuffer
                 * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
                 * @returns {ArrayBuffer} ArrayBuffer
                 * @example
                 * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
                 */
  /**
                     * @method buffer
                     * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
                     * @memberof md5
                     * @description Output hash as ArrayBuffer
                     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
                     * @returns {ArrayBuffer} ArrayBuffer
                     * @example
                     * md5.buffer('The quick brown fox jumps over the lazy dog');
                     */
  /**
                         * @method base64
                         * @memberof md5
                         * @description Output hash as base64 string
                         * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
                         * @returns {String} base64 string
                         * @example
                         * md5.base64('The quick brown fox jumps over the lazy dog');
                         */
  var createOutputMethod = function createOutputMethod(outputType) {
    return function (message) {
      return new Md5(true).update(message)[outputType]();
    };
  };

  /**
      * @method create
      * @memberof md5
      * @description Create Md5 object
      * @returns {Md5} Md5 object.
      * @example
      * var hash = md5.create();
      */
  /**
          * @method update
          * @memberof md5
          * @description Create and update Md5 object
          * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
          * @returns {Md5} Md5 object.
          * @example
          * var hash = md5.update('The quick brown fox jumps over the lazy dog');
          * // equal to
          * var hash = md5.create();
          * hash.update('The quick brown fox jumps over the lazy dog');
          */
  var createMethod = function createMethod() {
    var method = createOutputMethod('hex');
    if (NODE_JS) {
      method = nodeWrap(method);
    }
    method.create = function () {
      return new Md5();
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type);
    }
    return method;
  };

  var nodeWrap = function nodeWrap(method) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var nodeMethod = function nodeMethod(message) {
      if (typeof message === 'string') {
        return crypto.createHash('md5').update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw ERROR;
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
      message.constructor === Buffer) {
        return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  /**
      * Md5 class
      * @class Md5
      * @description This is internal class.
      * @see {@link md5.create}
      */
  function Md5(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else {
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(buffer);
        this.blocks = new Uint32Array(buffer);
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  /**
     * @method update
     * @memberof Md5
     * @instance
     * @description Update hash
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {Md5} Md5 object.
     * @see {@link md5.update}
     */
  Md5.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }

    var notString,type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var code,index = 0,i,length = message.length,blocks = this.blocks;
    var buffer8 = this.buffer8;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = blocks[16];
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            buffer8[i++] = message[index];
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        }
      } else {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              buffer8[i++] = code;
            } else if (code < 0x800) {
              buffer8[i++] = 0xc0 | code >> 6;
              buffer8[i++] = 0x80 | code & 0x3f;
            } else if (code < 0xd800 || code >= 0xe000) {
              buffer8[i++] = 0xe0 | code >> 12;
              buffer8[i++] = 0x80 | code >> 6 & 0x3f;
              buffer8[i++] = 0x80 | code & 0x3f;
            } else {
              code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
              buffer8[i++] = 0xf0 | code >> 18;
              buffer8[i++] = 0x80 | code >> 12 & 0x3f;
              buffer8[i++] = 0x80 | code >> 6 & 0x3f;
              buffer8[i++] = 0x80 | code & 0x3f;
            }
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
              blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            }
          }
        }
      }
      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Md5.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks,i = this.lastByteIndex;
    blocks[i >> 2] |= EXTRA[i & 3];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = blocks[16];
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.bytes << 3;
    blocks[15] = this.hBytes << 3 | this.bytes >>> 29;
    this.hash();
  };

  Md5.prototype.hash = function () {
    var a,b,c,d,bc,da,blocks = this.blocks;

    if (this.first) {
      a = blocks[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ d & (a ^ -271733879)) + blocks[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ c & (d ^ a)) + blocks[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ b & (c ^ d)) + blocks[0] - 680876936;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ a & (b ^ c)) + blocks[1] - 389564586;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ d & (a ^ b)) + blocks[2] + 606105819;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ c & (d ^ a)) + blocks[3] - 1044525330;
      b = (b << 22 | b >>> 10) + c << 0;
    }

    a += (d ^ b & (c ^ d)) + blocks[4] - 176418897;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[5] + 1200080426;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[6] - 1473231341;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[7] - 45705983;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks[8] + 1770035416;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[9] - 1958414417;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[10] - 42063;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[11] - 1990404162;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks[12] + 1804603682;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[13] - 40341101;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[14] - 1502002290;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[15] + 1236535329;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[1] - 165796510;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[6] - 1069501632;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[11] + 643717713;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[0] - 373897302;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[5] - 701558691;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[10] + 38016083;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[15] - 660478335;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[4] - 405537848;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[9] + 568446438;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[14] - 1019803690;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[3] - 187363961;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[8] + 1163531501;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[13] - 1444681467;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[2] - 51403784;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[7] + 1735328473;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[12] - 1926607734;
    b = (b << 20 | b >>> 12) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[5] - 378558;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[8] - 2022574463;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[11] + 1839030562;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[14] - 35309556;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[1] - 1530992060;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[4] + 1272893353;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[7] - 155497632;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[10] - 1094730640;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[13] + 681279174;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[0] - 358537222;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[3] - 722521979;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[6] + 76029189;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[9] - 640364487;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[12] - 421815835;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[15] + 530742520;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[2] - 995338651;
    b = (b << 23 | b >>> 9) + c << 0;
    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
    b = (b << 21 | b >>> 11) + c << 0;

    if (this.first) {
      this.h0 = a + 1732584193 << 0;
      this.h1 = b - 271733879 << 0;
      this.h2 = c - 1732584194 << 0;
      this.h3 = d + 271733878 << 0;
      this.first = false;
    } else {
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
    }
  };

  /**
      * @method hex
      * @memberof Md5
      * @instance
      * @description Output hash as hex string
      * @returns {String} Hex string
      * @see {@link md5.hex}
      * @example
      * hash.hex();
      */
  Md5.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0,h1 = this.h1,h2 = this.h2,h3 = this.h3;

    return HEX_CHARS[h0 >> 4 & 0x0F] + HEX_CHARS[h0 & 0x0F] +
    HEX_CHARS[h0 >> 12 & 0x0F] + HEX_CHARS[h0 >> 8 & 0x0F] +
    HEX_CHARS[h0 >> 20 & 0x0F] + HEX_CHARS[h0 >> 16 & 0x0F] +
    HEX_CHARS[h0 >> 28 & 0x0F] + HEX_CHARS[h0 >> 24 & 0x0F] +
    HEX_CHARS[h1 >> 4 & 0x0F] + HEX_CHARS[h1 & 0x0F] +
    HEX_CHARS[h1 >> 12 & 0x0F] + HEX_CHARS[h1 >> 8 & 0x0F] +
    HEX_CHARS[h1 >> 20 & 0x0F] + HEX_CHARS[h1 >> 16 & 0x0F] +
    HEX_CHARS[h1 >> 28 & 0x0F] + HEX_CHARS[h1 >> 24 & 0x0F] +
    HEX_CHARS[h2 >> 4 & 0x0F] + HEX_CHARS[h2 & 0x0F] +
    HEX_CHARS[h2 >> 12 & 0x0F] + HEX_CHARS[h2 >> 8 & 0x0F] +
    HEX_CHARS[h2 >> 20 & 0x0F] + HEX_CHARS[h2 >> 16 & 0x0F] +
    HEX_CHARS[h2 >> 28 & 0x0F] + HEX_CHARS[h2 >> 24 & 0x0F] +
    HEX_CHARS[h3 >> 4 & 0x0F] + HEX_CHARS[h3 & 0x0F] +
    HEX_CHARS[h3 >> 12 & 0x0F] + HEX_CHARS[h3 >> 8 & 0x0F] +
    HEX_CHARS[h3 >> 20 & 0x0F] + HEX_CHARS[h3 >> 16 & 0x0F] +
    HEX_CHARS[h3 >> 28 & 0x0F] + HEX_CHARS[h3 >> 24 & 0x0F];
  };

  /**
      * @method toString
      * @memberof Md5
      * @instance
      * @description Output hash as hex string
      * @returns {String} Hex string
      * @see {@link md5.hex}
      * @example
      * hash.toString();
      */
  Md5.prototype.toString = Md5.prototype.hex;

  /**
                                               * @method digest
                                               * @memberof Md5
                                               * @instance
                                               * @description Output hash as bytes array
                                               * @returns {Array} Bytes array
                                               * @see {@link md5.digest}
                                               * @example
                                               * hash.digest();
                                               */
  Md5.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0,h1 = this.h1,h2 = this.h2,h3 = this.h3;
    return [
    h0 & 0xFF, h0 >> 8 & 0xFF, h0 >> 16 & 0xFF, h0 >> 24 & 0xFF,
    h1 & 0xFF, h1 >> 8 & 0xFF, h1 >> 16 & 0xFF, h1 >> 24 & 0xFF,
    h2 & 0xFF, h2 >> 8 & 0xFF, h2 >> 16 & 0xFF, h2 >> 24 & 0xFF,
    h3 & 0xFF, h3 >> 8 & 0xFF, h3 >> 16 & 0xFF, h3 >> 24 & 0xFF];

  };

  /**
      * @method array
      * @memberof Md5
      * @instance
      * @description Output hash as bytes array
      * @returns {Array} Bytes array
      * @see {@link md5.array}
      * @example
      * hash.array();
      */
  Md5.prototype.array = Md5.prototype.digest;

  /**
                                               * @method arrayBuffer
                                               * @memberof Md5
                                               * @instance
                                               * @description Output hash as ArrayBuffer
                                               * @returns {ArrayBuffer} ArrayBuffer
                                               * @see {@link md5.arrayBuffer}
                                               * @example
                                               * hash.arrayBuffer();
                                               */
  Md5.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(16);
    var blocks = new Uint32Array(buffer);
    blocks[0] = this.h0;
    blocks[1] = this.h1;
    blocks[2] = this.h2;
    blocks[3] = this.h3;
    return buffer;
  };

  /**
      * @method buffer
      * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
      * @memberof Md5
      * @instance
      * @description Output hash as ArrayBuffer
      * @returns {ArrayBuffer} ArrayBuffer
      * @see {@link md5.buffer}
      * @example
      * hash.buffer();
      */
  Md5.prototype.buffer = Md5.prototype.arrayBuffer;

  /**
                                                     * @method base64
                                                     * @memberof Md5
                                                     * @instance
                                                     * @description Output hash as base64 string
                                                     * @returns {String} base64 string
                                                     * @see {@link md5.base64}
                                                     * @example
                                                     * hash.base64();
                                                     */
  Md5.prototype.base64 = function () {
    var v1,v2,v3,base64Str = '',bytes = this.array();
    for (var i = 0; i < 15;) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
      BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
      BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] +
      BASE64_ENCODE_CHAR[v3 & 63];
    }
    v1 = bytes[i];
    base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
    BASE64_ENCODE_CHAR[v1 << 4 & 63] +
    '==';
    return base64Str;
  };

  var exports = createMethod();

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    /**
           * @method md5
           * @description Md5 hash function, export to global in browsers.
           * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
           * @returns {String} md5 hashes
           * @example
           * md5(''); // d41d8cd98f00b204e9800998ecf8427e
           * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
           * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
           *
           * // It also supports UTF-8 encoding
           * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
           *
           * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
           * md5([]); // d41d8cd98f00b204e9800998ecf8427e
           * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
           */
    root.md5 = exports;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 105), __webpack_require__(/*! (webpack)/buildin/global.js */ 3)))

/***/ }),

/***/ 105:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 106);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 106:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 105)))

/***/ }),

/***/ 107:
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!*****************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/filters/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.Revise = exports.Delivery = exports.TypesInfo = exports.isRedBall = void 0; // 红球 篮球的过滤
var isRedBall = function isRedBall(value) {
  if (value) return value.replace(/,/g, "  ");
};
// 球的玩法类型
exports.isRedBall = isRedBall;var TypesInfo = function TypesInfo(value) {
  switch (value) {
    case null:
      return value = '直选';
      break;
    case '':
      return value = '直选';
      break;
    case '1':
      return value = '直选';
      break;
    case '2':
      return value = '组三';
      break;
    case '3':
      return value = '组六';
      break;
    case '4':
      return value = '和值';
      break;
    case '5':
      return value = '和值-组三';
      break;
    case '6':
      return value = '和值-组六';
      break;
    case '7':
      return value = '胆拖';
      break;}

};
// 配送方式
exports.TypesInfo = TypesInfo;var Delivery = function Delivery(value) {
  switch (value) {
    case '1':
      return value = '自提';
      break;
    case '2':
      return value = '外送';
      break;
    case '3':
      return value = '托管';
      break;}

};

// 用户图像的修改
exports.Delivery = Delivery;var Revise = function Revise(value) {
  if (value) {
    if (value.indexOf('http')) {
      return 'http://fucai.yiruit.com' + value;
    } else {
      return value;
    }
  }
};exports.Revise = Revise;

/***/ }),

/***/ 188:
/*!***************************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/pages/luckyWheel/config.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.defaultList = void 0;var defaultList = [
{
  Icon: __webpack_require__(/*! ../../static/lucky/bean1.png */ 189), // 奖品图片
  Name: "幽魂上衣", // 奖品名称
  isPrize: 1 // 该奖项是否为奖品
},
{
  Icon: __webpack_require__(/*! ../../static/lucky/bean2.png */ 190),
  Name: "天帝剑",
  isPrize: 1 },

{
  Icon: __webpack_require__(/*! ../../static/lucky/bean3.png */ 191),
  Name: "幽魂手镯",
  isPrize: 1 },

{
  Icon: __webpack_require__(/*! ../../static/lucky/bean4.png */ 192),
  Name: "军神耳环",
  isPrize: 1 },

{
  Icon: __webpack_require__(/*! ../../static/lucky/bean5.png */ 193),
  Name: "灭世之怒",
  isPrize: 1 },

{
  Icon: __webpack_require__(/*! ../../static/lucky/bean1.png */ 189),
  Name: "生命脉动",
  isPrize: 1 },

{
  Icon: __webpack_require__(/*! ../../static/lucky/bean6.png */ 194),
  Name: "木棍",
  isPrize: 1 },

{
  Icon: __webpack_require__(/*! ../../static/lucky/bean1.png */ 189),
  Name: "逆转结局",
  isPrize: 1 }];exports.defaultList = defaultList;

/***/ }),

/***/ 189:
/*!***********************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/static/lucky/bean1.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAABQCAYAAADV9a3ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYyNTEyQUJGQkVGMjExRTdCQTE5QkE5RUY3MjIwRkE5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYyNTEyQUMwQkVGMjExRTdCQTE5QkE5RUY3MjIwRkE5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjI1MTJBQkRCRUYyMTFFN0JBMTlCQTlFRjcyMjBGQTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjI1MTJBQkVCRUYyMTFFN0JBMTlCQTlFRjcyMjBGQTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4PPTiLAAAt6UlEQVR42ux9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"

/***/ }),

/***/ 19:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

/***/ }),

/***/ 190:
/*!***********************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/static/lucky/bean2.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAABQCAYAAADV9a3ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2RUQwOUYyQkVGOTExRTdBQTQ2ODYzRDRCNTUyREE5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ2RUQwOUYzQkVGOTExRTdBQTQ2ODYzRDRCNTUyREE5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDZFRDA5RjBCRUY5MTFFN0FBNDY4NjNENEI1NTJEQTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDZFRDA5RjFCRUY5MTFFN0FBNDY4NjNENEI1NTJEQTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4F2/cgAAAh70lEQVR42ux9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"

/***/ }),

/***/ 191:
/*!***********************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/static/lucky/bean3.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAABQCAYAAADV9a3ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGREFBNEREQkVGMjExRTdCREZEOTREQ0IzNTcyRUZBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGREFBNERFQkVGMjExRTdCREZEOTREQ0IzNTcyRUZBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUZEQUE0REJCRUYyMTFFN0JERkQ5NERDQjM1NzJFRkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUZEQUE0RENCRUYyMTFFN0JERkQ5NERDQjM1NzJFRkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ScXyHAAAU60lEQVR42uxd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"

/***/ }),

/***/ 192:
/*!***********************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/static/lucky/bean4.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAABQCAYAAADV9a3ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlFMjYwNkY2QkY4MDExRTc4RThGRkJGNTU1ODZFRTEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlFMjYwNkY3QkY4MDExRTc4RThGRkJGNTU1ODZFRTEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUUyNjA2RjRCRjgwMTFFNzhFOEZGQkY1NTU4NkVFMTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUUyNjA2RjVCRjgwMTFFNzhFOEZGQkY1NTU4NkVFMTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7F6uMJAAAWgUlEQVR42uxd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"

/***/ }),

/***/ 193:
/*!***********************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/static/lucky/bean5.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAABQCAYAAADV9a3ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODc4QkJDQkY4MTExRTc4RDU0QThBNkY5RTJDM0IyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAxODc4QkJEQkY4MTExRTc4RDU0QThBNkY5RTJDM0IyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDE4NzhCQkFCRjgxMTFFNzhENTRBOEE2RjlFMkMzQjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4NzhCQkJCRjgxMTFFNzhENTRBOEE2RjlFMkMzQjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz71sCpmAAAWYUlEQVR42uxc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"

/***/ }),

/***/ 194:
/*!***********************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/static/lucky/bean6.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAABQCAYAAADV9a3ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlDQkFCQkVEQkVGMjExRTc4MDgwOTEyQ0RDNTA2MkQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlDQkFCQkVFQkVGMjExRTc4MDgwOTEyQ0RDNTA2MkQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUNCQUJCRUJCRUYyMTFFNzgwODA5MTJDREM1MDYyRDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUNCQUJCRUNCRUYyMTFFNzgwODA5MTJDREM1MDYyRDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4nn+/vAAAywUlEQVR42ux9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"

/***/ }),

/***/ 195:
/*!************************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/static/lucky/gongxi.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAADICAYAAAA0n5+2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlDRDkwQjU1QkY5MzExRTc5NTgzOTc0MDg5QjEwRTJCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlDRDkwQjU2QkY5MzExRTc5NTgzOTc0MDg5QjEwRTJCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUNEOTBCNTNCRjkzMTFFNzk1ODM5NzQwODlCMTBFMkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUNEOTBCNTRCRjkzMTFFNzk1ODM5NzQwODlCMTBFMkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7R26dFAAB5WElEQVR42ux9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"

/***/ }),

/***/ 196:
/*!***********************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/static/lucky/sorry.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/lucky/sorry.png";

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 21);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 21:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

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
  runtime.wrap = wrap;

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
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
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
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
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
        return new Promise(function(resolve, reject) {
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
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
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
        if (delegate.iterator.return) {
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

  Gp[toStringTagSymbol] = "Generator";

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

  runtime.keys = function(object) {
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
  runtime.values = values;

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
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 22:
/*!*****************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/jweixin/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}!function (e, n) { true ? module.exports = n(e) : undefined;}(window, function (o, e) {function c(n, e, i) {o.WeixinJSBridge ? WeixinJSBridge.invoke(n, r(e), function (e) {a(n, e, i);}) : d(n, i);}function i(n, i, t) {o.WeixinJSBridge ? WeixinJSBridge.on(n, function (e) {t && t.trigger && t.trigger(e), a(n, e, i);}) : d(n, t || i);}function r(e) {return (e = e || {}).appId = M.appId, e.verifyAppId = M.appId, e.verifySignType = "sha1", e.verifyTimestamp = M.timestamp + "", e.verifyNonceStr = M.nonceStr, e.verifySignature = M.signature, e;}function n(e) {return { timeStamp: e.timestamp + "", nonceStr: e.nonceStr, package: e.package, paySign: e.paySign, signType: e.signType || "SHA1" };}function a(e, n, i) {"openEnterpriseChat" == e && (n.errCode = n.err_code), delete n.err_code, delete n.err_desc, delete n.err_detail;var t = n.errMsg;t || (t = n.err_msg, delete n.err_msg, t = function (e, n) {var i = e,t = f[i];t && (i = t);var o = "ok";if (n) {var r = n.indexOf(":");"confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail");}return n = i + ":" + o;}(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), delete i._complete), t = n.errMsg || "", M.debug && !i.isInnerInvoke && alert(JSON.stringify(n));var o = t.indexOf(":");switch (t.substring(o + 1)) {case "ok":i.success && i.success(n);break;case "cancel":i.cancel && i.cancel(n);break;default:i.fail && i.fail(n);}i.complete && i.complete(n);}function s(e) {if (e) {for (var n = 0, i = e.length; n < i; ++n) {var t = e[n],o = p[t];o && (e[n] = o);}return e;}}function d(e, n) {if (!(!M.debug || n && n.isInnerInvoke)) {var i = f[e];i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "");}}function l() {return new Date().getTime();}function u(e) {I && (o.WeixinJSBridge ? e() : t.addEventListener && t.addEventListener("WeixinJSBridgeReady", e, !1));}if (!o.jWeixin) {var _C;var p = { config: "preVerifyJSAPI", onMenuShareTimeline: "menu:share:timeline", onMenuShareAppMessage: "menu:share:appmessage", onMenuShareQQ: "menu:share:qq", onMenuShareWeibo: "menu:share:weiboApp", onMenuShareQZone: "menu:share:QZone", previewImage: "imagePreview", getLocation: "geoLocation", openProductSpecificView: "openProductViewWithPid", addCard: "batchAddCard", openCard: "batchViewCard", chooseWXPay: "getBrandWCPayRequest", openEnterpriseRedPacket: "getRecevieBizHongBaoRequest", startSearchBeacons: "startMonitoringBeacons", stopSearchBeacons: "stopMonitoringBeacons", onSearchBeacons: "onBeaconsInRange", consumeAndShareCard: "consumedShareCard", openAddress: "editAddress" },f = function () {var e = {};for (var n in p) {e[p[n]] = n;}return e;}(),t = o.document,m = t.title,g = navigator.userAgent.toLowerCase(),h = navigator.platform.toLowerCase(),v = !(!h.match("mac") && !h.match("win")),S = -1 != g.indexOf("wxdebugger"),I = -1 != g.indexOf("micromessenger"),y = -1 != g.indexOf("android"),_ = -1 != g.indexOf("iphone") || -1 != g.indexOf("ipad"),w = (O = g.match(/micromessenger\/(\d+\.\d+\.\d+)/) || g.match(/micromessenger\/(\d+\.\d+)/)) ? O[1] : "",k = { initStartTime: l(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0 },T = { version: 1, appId: "", initTime: 0, preVerifyTime: 0, networkType: "", isPreVerifyOk: 1, systemType: _ ? 1 : y ? 2 : -1, clientVersion: w, url: encodeURIComponent(location.href) },M = {},P = { _completes: [] },x = { state: 0, data: {} };u(function () {k.initEndTime = l();});var A = !1,V = [],C = (_C = { config: function config(e) {d("config", M = e);var t = !1 !== M.check;u(function () {if (t) c(p.config, { verifyJsApiList: s(M.jsApiList) }, function () {P._complete = function (e) {k.preVerifyEndTime = l(), x.state = 1, x.data = e;}, P.success = function (e) {T.isPreVerifyOk = 0;}, P.fail = function (e) {P._fail ? P._fail(e) : x.state = -1;};var t = P._completes;return t.push(function () {!function (e) {if (!(v || S || M.debug || w < "6.0.2" || T.systemType < 0)) {var i = new Image();T.appId = M.appId, T.initTime = k.initEndTime - k.initStartTime, T.preVerifyTime = k.preVerifyEndTime - k.preVerifyStartTime, C.getNetworkType({ isInnerInvoke: !0, success: function success(e) {T.networkType = e.networkType;var n = "https://open.weixin.qq.com/sdk/report?v=" + T.version + "&o=" + T.isPreVerifyOk + "&s=" + T.systemType + "&c=" + T.clientVersion + "&a=" + T.appId + "&n=" + T.networkType + "&i=" + T.initTime + "&p=" + T.preVerifyTime + "&u=" + T.url;i.src = n;} });}}();}), P.complete = function (e) {for (var n = 0, i = t.length; n < i; ++n) {t[n]();}P._completes = [];}, P;}()), k.preVerifyStartTime = l();else {x.state = 1;for (var e = P._completes, n = 0, i = e.length; n < i; ++n) {e[n]();}P._completes = [];}}), C.invoke || (C.invoke = function (e, n, i) {o.WeixinJSBridge && WeixinJSBridge.invoke(e, r(n), i);}, C.on = function (e, n) {o.WeixinJSBridge && WeixinJSBridge.on(e, n);});}, ready: function ready(e) {0 != x.state ? e() : (P._completes.push(e), !I && M.debug && e());}, error: function error(e) {w < "6.0.2" || (-1 == x.state ? e(x.data) : P._fail = e);}, checkJsApi: function checkJsApi(e) {c("checkJsApi", { jsApiList: s(e.jsApiList) }, (e._complete = function (e) {if (y) {var n = e.checkResult;n && (e.checkResult = JSON.parse(n));}e = function (e) {var n = e.checkResult;for (var i in n) {var t = f[i];t && (n[t] = n[i], delete n[i]);}return e;}(e);}, e));}, onMenuShareTimeline: function onMenuShareTimeline(e) {i(p.onMenuShareTimeline, { complete: function complete() {c("shareTimeline", { title: e.title || m, desc: e.title || m, img_url: e.imgUrl || "", link: e.link || location.href, type: e.type || "link", data_url: e.dataUrl || "" }, e);} }, e);}, onMenuShareAppMessage: function onMenuShareAppMessage(n) {i(p.onMenuShareAppMessage, { complete: function complete(e) {"favorite" === e.scene ? c("sendAppMessage", { title: n.title || m, desc: n.desc || "", link: n.link || location.href, img_url: n.imgUrl || "", type: n.type || "link", data_url: n.dataUrl || "" }) : c("sendAppMessage", { title: n.title || m, desc: n.desc || "", link: n.link || location.href, img_url: n.imgUrl || "", type: n.type || "link", data_url: n.dataUrl || "" }, n);} }, n);}, onMenuShareQQ: function onMenuShareQQ(e) {i(p.onMenuShareQQ, { complete: function complete() {c("shareQQ", { title: e.title || m, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, onMenuShareWeibo: function onMenuShareWeibo(e) {i(p.onMenuShareWeibo, { complete: function complete() {c("shareWeiboApp", { title: e.title || m, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, onMenuShareQZone: function onMenuShareQZone(e) {i(p.onMenuShareQZone, { complete: function complete() {c("shareQZone", { title: e.title || m, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, updateTimelineShareData: function updateTimelineShareData(e) {c("updateTimelineShareData", { title: e.title, link: e.link, imgUrl: e.imgUrl }, e);}, updateAppMessageShareData: function updateAppMessageShareData(e) {c("updateAppMessageShareData", { title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl }, e);}, startRecord: function startRecord(e) {c("startRecord", {}, e);}, stopRecord: function stopRecord(e) {c("stopRecord", {}, e);}, onVoiceRecordEnd: function onVoiceRecordEnd(e) {i("onVoiceRecordEnd", e);}, playVoice: function playVoice(e) {c("playVoice", { localId: e.localId }, e);}, pauseVoice: function pauseVoice(e) {c("pauseVoice", { localId: e.localId }, e);}, stopVoice: function stopVoice(e) {c("stopVoice", { localId: e.localId }, e);}, onVoicePlayEnd: function onVoicePlayEnd(e) {i("onVoicePlayEnd", e);}, uploadVoice: function uploadVoice(e) {c("uploadVoice", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, downloadVoice: function downloadVoice(e) {c("downloadVoice", { serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, translateVoice: function translateVoice(e) {c("translateVoice", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, chooseImage: function chooseImage(e) {c("chooseImage", { scene: "1|2", count: e.count || 9, sizeType: e.sizeType || ["original", "compressed"], sourceType: e.sourceType || ["album", "camera"] }, (e._complete = function (e) {if (y) {var n = e.localIds;try {n && (e.localIds = JSON.parse(n));} catch (e) {}}}, e));}, getLocation: function getLocation(e) {}, previewImage: function previewImage(e) {c(p.previewImage, { current: e.current, urls: e.urls }, e);}, uploadImage: function uploadImage(e) {c("uploadImage", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, downloadImage: function downloadImage(e) {c("downloadImage", { serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, getLocalImgData: function getLocalImgData(e) {!1 === A ? (A = !0, c("getLocalImgData", { localId: e.localId }, (e._complete = function (e) {if (A = !1, 0 < V.length) {var n = V.shift();wx.getLocalImgData(n);}}, e))) : V.push(e);}, getNetworkType: function getNetworkType(e) {c("getNetworkType", {}, (e._complete = function (e) {e = function (e) {var n = e.errMsg;e.errMsg = "getNetworkType:ok";var i = e.subtype;if (delete e.subtype, i) e.networkType = i;else {var t = n.indexOf(":"),o = n.substring(t + 1);switch (o) {case "wifi":case "edge":case "wwan":e.networkType = o;break;default:e.errMsg = "getNetworkType:fail";}}return e;}(e);}, e));}, openLocation: function openLocation(e) {c("openLocation", { latitude: e.latitude, longitude: e.longitude, name: e.name || "", address: e.address || "", scale: e.scale || 28, infoUrl: e.infoUrl || "" }, e);} }, _defineProperty(_C, "getLocation", function getLocation(e) {c(p.getLocation, { type: (e = e || {}).type || "wgs84" }, (e._complete = function (e) {delete e.type;}, e));}), _defineProperty(_C, "hideOptionMenu", function hideOptionMenu(e) {c("hideOptionMenu", {}, e);}), _defineProperty(_C, "showOptionMenu", function showOptionMenu(e) {c("showOptionMenu", {}, e);}), _defineProperty(_C, "closeWindow", function closeWindow(e) {c("closeWindow", {}, e = e || {});}), _defineProperty(_C, "hideMenuItems", function hideMenuItems(e) {c("hideMenuItems", { menuList: e.menuList }, e);}), _defineProperty(_C, "showMenuItems", function showMenuItems(e) {c("showMenuItems", { menuList: e.menuList }, e);}), _defineProperty(_C, "hideAllNonBaseMenuItem", function hideAllNonBaseMenuItem(e) {c("hideAllNonBaseMenuItem", {}, e);}), _defineProperty(_C, "showAllNonBaseMenuItem", function showAllNonBaseMenuItem(e) {c("showAllNonBaseMenuItem", {}, e);}), _defineProperty(_C, "scanQRCode", function scanQRCode(e) {c("scanQRCode", { needResult: (e = e || {}).needResult || 0, scanType: e.scanType || ["qrCode", "barCode"] }, (e._complete = function (e) {if (_) {var n = e.resultStr;if (n) {var i = JSON.parse(n);e.resultStr = i && i.scan_code && i.scan_code.scan_result;}}}, e));}), _defineProperty(_C, "openAddress", function openAddress(e) {c(p.openAddress, {}, (e._complete = function (e) {var n;(n = e).postalCode = n.addressPostalCode, delete n.addressPostalCode, n.provinceName = n.proviceFirstStageName, delete n.proviceFirstStageName, n.cityName = n.addressCitySecondStageName, delete n.addressCitySecondStageName, n.countryName = n.addressCountiesThirdStageName, delete n.addressCountiesThirdStageName, n.detailInfo = n.addressDetailInfo, delete n.addressDetailInfo, e = n;}, e));}), _defineProperty(_C, "openProductSpecificView", function openProductSpecificView(e) {c(p.openProductSpecificView, { pid: e.productId, view_type: e.viewType || 0, ext_info: e.extInfo }, e);}), _defineProperty(_C, "addCard", function addCard(e) {for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {var r = n[t],a = { card_id: r.cardId, card_ext: r.cardExt };i.push(a);}c(p.addCard, { card_list: i }, (e._complete = function (e) {var n = e.card_list;if (n) {for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {var o = n[i];o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ;}e.cardList = n, delete e.card_list;}}, e));}), _defineProperty(_C, "chooseCard", function chooseCard(e) {c("chooseCard", { app_id: M.appId, location_id: e.shopId || "", sign_type: e.signType || "SHA1", card_id: e.cardId || "", card_type: e.cardType || "", card_sign: e.cardSign, time_stamp: e.timestamp + "", nonce_str: e.nonceStr }, (e._complete = function (e) {e.cardList = e.choose_card_info, delete e.choose_card_info;}, e));}), _defineProperty(_C, "openCard", function openCard(e) {for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {var r = n[t],a = { card_id: r.cardId, code: r.code };i.push(a);}c(p.openCard, { card_list: i }, e);}), _defineProperty(_C, "consumeAndShareCard", function consumeAndShareCard(e) {c(p.consumeAndShareCard, { consumedCardId: e.cardId, consumedCode: e.code }, e);}), _defineProperty(_C, "chooseWXPay", function chooseWXPay(e) {c(p.chooseWXPay, n(e), e);}), _defineProperty(_C, "openEnterpriseRedPacket", function openEnterpriseRedPacket(e) {c(p.openEnterpriseRedPacket, n(e), e);}), _defineProperty(_C, "startSearchBeacons", function startSearchBeacons(e) {c(p.startSearchBeacons, { ticket: e.ticket }, e);}), _defineProperty(_C, "stopSearchBeacons", function stopSearchBeacons(e) {c(p.stopSearchBeacons, {}, e);}), _defineProperty(_C, "onSearchBeacons", function onSearchBeacons(e) {i(p.onSearchBeacons, e);}), _defineProperty(_C, "openEnterpriseChat", function openEnterpriseChat(e) {c("openEnterpriseChat", { useridlist: e.userIds, chatname: e.groupName }, e);}), _defineProperty(_C, "launchMiniProgram", function launchMiniProgram(e) {c("launchMiniProgram", { targetAppId: e.targetAppId, path: function (e) {if ("string" == typeof e && 0 < e.length) {var n = e.split("?")[0],i = e.split("?")[1];return n += ".html", void 0 !== i ? n + "?" + i : n;}}(e.path), envVersion: e.envVersion }, e);}), _defineProperty(_C, "miniProgram", { navigateBack: function navigateBack(e) {e = e || {}, u(function () {c("invokeMiniProgramAPI", { name: "navigateBack", arg: { delta: e.delta || 1 } }, e);});}, navigateTo: function navigateTo(e) {u(function () {c("invokeMiniProgramAPI", { name: "navigateTo", arg: { url: e.url } }, e);});}, redirectTo: function redirectTo(e) {u(function () {c("invokeMiniProgramAPI", { name: "redirectTo", arg: { url: e.url } }, e);});}, switchTab: function switchTab(e) {u(function () {c("invokeMiniProgramAPI", { name: "switchTab", arg: { url: e.url } }, e);});}, reLaunch: function reLaunch(e) {u(function () {c("invokeMiniProgramAPI", { name: "reLaunch", arg: { url: e.url } }, e);});}, postMessage: function postMessage(e) {u(function () {c("invokeMiniProgramAPI", { name: "postMessage", arg: e.data || {} }, e);});}, getEnv: function getEnv(e) {u(function () {e({ miniprogram: "miniprogram" === o.__wxjs_environment });});} }), _C),L = 1,B = {};return t.addEventListener("error", function (e) {if (!y) {var n = e.target,i = n.tagName,t = n.src;if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {e.preventDefault(), e.stopPropagation();var o = n["wx-id"];if (o || (o = L++, n["wx-id"] = o), B[o]) return;B[o] = !0, wx.ready(function () {wx.getLocalImgData({ localId: t, success: function success(e) {n.src = e.localData;} });});}}}, !0), t.addEventListener("load", function (e) {if (!y) {var n = e.target,i = n.tagName;if (n.src, "IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {var t = n["wx-id"];t && (B[t] = !1);}}}, !0), e && (o.wx = o.jWeixin = C), C;}var O;});

/***/ }),

/***/ 229:
/*!*****************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/utils/ballNum.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 给球添加数量
var forNum = function forNum(arr, num) {
  for (var index = 1; index < num; index++) {
    if (index < 10) {
      index = "0" + index;
    }
    arr.push({
      isActive: false,
      isActiveSpecil: false,
      num: index });

  }
  return arr;
};

var forGroup = function forGroup(arr, num) {
  for (var index = 0; index <= num; index++) {
    arr.push({
      isActive: false,
      isActiveSpecil: false,
      num: index });

  }
};
module.exports = {
  forNum: forNum,
  forGroup: forGroup };

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!***********************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/pages.json ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 535:
/*!********************************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/components/tki-qrcode/qrcode.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var QRCode = {};
(function () {
  /**
               * 获取单个字符的utf8编码
               * unicode BMP平面约65535个字符
               * @param {num} code
               * return {array}
               */
  function unicodeFormat8(code) {
    // 1 byte
    var c0, c1, c2;
    if (code < 128) {
      return [code];
      // 2 bytes
    } else if (code < 2048) {
      c0 = 192 + (code >> 6);
      c1 = 128 + (code & 63);
      return [c0, c1];
      // 3 bytes
    } else {
      c0 = 224 + (code >> 12);
      c1 = 128 + (code >> 6 & 63);
      c2 = 128 + (code & 63);
      return [c0, c1, c2];
    }
  }
  /**
     * 获取字符串的utf8编码字节串
     * @param {string} string
     * @return {array}
     */
  function getUTF8Bytes(string) {
    var utf8codes = [];
    for (var i = 0; i < string.length; i++) {
      var code = string.charCodeAt(i);
      var utf8 = unicodeFormat8(code);
      for (var j = 0; j < utf8.length; j++) {
        utf8codes.push(utf8[j]);
      }
    }
    return utf8codes;
  }
  /**
     * 二维码算法实现
     * @param {string} data              要编码的信息字符串
     * @param {num} errorCorrectLevel 纠错等级
     */
  function QRCodeAlg(data, errorCorrectLevel) {
    this.typeNumber = -1; //版本
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null; //二维矩阵，存放最终结果
    this.moduleCount = 0; //矩阵大小
    this.dataCache = null; //数据缓存
    this.rsBlocks = null; //版本数据信息
    this.totalDataCount = -1; //可使用的数据量
    this.data = data;
    this.utf8bytes = getUTF8Bytes(data);
    this.make();
  }
  QRCodeAlg.prototype = {
    constructor: QRCodeAlg,
    /**
                             * 获取二维码矩阵大小
                             * @return {num} 矩阵大小
                             */
    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },
    /**
        * 编码
        */
    make: function make() {
      this.getRightType();
      this.dataCache = this.createData();
      this.createQrcode();
    },
    /**
        * 设置二位矩阵功能图形
        * @param  {bool} test 表示是否在寻找最好掩膜阶段
        * @param  {num} maskPattern 掩膜的版本
        */
    makeImpl: function makeImpl(maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (var row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(true, maskPattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(true);
      }
      this.mapData(this.dataCache, maskPattern);
    },
    /**
        * 设置二维码的位置探测图形
        * @param  {num} row 探测图形的中心横坐标
        * @param  {num} col 探测图形的中心纵坐标
        */
    setupPositionProbePattern: function setupPositionProbePattern(row, col) {
      for (var r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;
        for (var c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;
          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },
    /**
        * 创建二维码
        * @return {[type]} [description]
        */
    createQrcode: function createQrcode() {
      var minLostPoint = 0;
      var pattern = 0;
      var bestModules = null;
      for (var i = 0; i < 8; i++) {
        this.makeImpl(i);
        var lostPoint = QRUtil.getLostPoint(this);
        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
          bestModules = this.modules;
        }
      }
      this.modules = bestModules;
      this.setupTypeInfo(false, pattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(false);
      }
    },
    /**
        * 设置定位图形
        * @return {[type]} [description]
        */
    setupTimingPattern: function setupTimingPattern() {
      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
        if (this.modules[6][r] != null) {
          continue;
        }
        this.modules[6][r] = r % 2 == 0;
      }
    },
    /**
        * 设置矫正图形
        * @return {[type]} [description]
        */
    setupPositionAdjustPattern: function setupPositionAdjustPattern() {
      var pos = QRUtil.getPatternPosition(this.typeNumber);
      for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
          var row = pos[i];
          var col = pos[j];
          if (this.modules[row][col] != null) {
            continue;
          }
          for (var r = -2; r <= 2; r++) {
            for (var c = -2; c <= 2; c++) {
              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },
    /**
        * 设置版本信息（7以上版本才有）
        * @param  {bool} test 是否处于判断最佳掩膜阶段
        * @return {[type]}      [description]
        */
    setupTypeNumber: function setupTypeNumber(test) {
      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },
    /**
        * 设置格式信息（纠错等级和掩膜版本）
        * @param  {bool} test
        * @param  {num} maskPattern 掩膜版本
        * @return {}
        */
    setupTypeInfo: function setupTypeInfo(test, maskPattern) {
      var data = QRErrorCorrectLevel[this.errorCorrectLevel] << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);
      // vertical
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
        // horizontal
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }
      // fixed module
      this.modules[this.moduleCount - 8][8] = !test;
    },
    /**
        * 数据编码
        * @return {[type]} [description]
        */
    createData: function createData() {
      var buffer = new QRBitBuffer();
      var lengthBits = this.typeNumber > 9 ? 16 : 8;
      buffer.put(4, 4); //添加模式
      buffer.put(this.utf8bytes.length, lengthBits);
      for (var i = 0, l = this.utf8bytes.length; i < l; i++) {
        buffer.put(this.utf8bytes[i], 8);
      }
      if (buffer.length + 4 <= this.totalDataCount * 8) {
        buffer.put(0, 4);
      }
      // padding
      while (buffer.length % 8 != 0) {
        buffer.putBit(false);
      }
      // padding
      while (true) {
        if (buffer.length >= this.totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeAlg.PAD0, 8);
        if (buffer.length >= this.totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeAlg.PAD1, 8);
      }
      return this.createBytes(buffer);
    },
    /**
        * 纠错码编码
        * @param  {buffer} buffer 数据编码
        * @return {[type]}
        */
    createBytes: function createBytes(buffer) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var length = this.rsBlock.length / 3;
      var rsBlocks = new Array();
      for (var i = 0; i < length; i++) {
        var count = this.rsBlock[i * 3 + 0];
        var totalCount = this.rsBlock[i * 3 + 1];
        var dataCount = this.rsBlock[i * 3 + 2];
        for (var j = 0; j < count; j++) {
          rsBlocks.push([dataCount, totalCount]);
        }
      }
      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r][0];
        var ecCount = rsBlocks[r][1] - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i = 0; i < dcdata[r].length; i++) {
          dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        }
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i++) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }
      var data = new Array(this.totalDataCount);
      var index = 0;
      for (var i = 0; i < maxDcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < dcdata[r].length) {
            data[index++] = dcdata[r][i];
          }
        }
      }
      for (var i = 0; i < maxEcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < ecdata[r].length) {
            data[index++] = ecdata[r][i];
          }
        }
      }
      return data;

    },
    /**
        * 布置模块，构建最终信息
        * @param  {} data
        * @param  {} maskPattern
        * @return {}
        */
    mapData: function mapData(data, maskPattern) {
      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;
        while (true) {
          for (var c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              var dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }
              var mask = QRUtil.getMask(maskPattern, row, col - c);
              if (mask) {
                dark = !dark;
              }
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    } };

  /**
          * 填充字段
          */
  QRCodeAlg.PAD0 = 0xEC;
  QRCodeAlg.PAD1 = 0x11;
  //---------------------------------------------------------------------
  // 纠错等级对应的编码
  //---------------------------------------------------------------------
  var QRErrorCorrectLevel = [1, 0, 3, 2];
  //---------------------------------------------------------------------
  // 掩膜版本
  //---------------------------------------------------------------------
  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7 };

  //---------------------------------------------------------------------
  // 工具类
  //---------------------------------------------------------------------
  var QRUtil = {
    /*
                 每个版本矫正图形的位置
                  */
    PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]],

    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
    /*
                                                             BCH编码格式信息
                                                              */
    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },
    /*
       BCH编码版本信息
        */
    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },
    /*
       获取BCH位信息
        */
    getBCHDigit: function getBCHDigit(data) {
      var digit = 0;
      while (data != 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    },
    /*
       获取版本对应的矫正图形位置
        */
    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },
    /*
       掩膜算法
        */
    getMask: function getMask(maskPattern, i, j) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);}

    },
    /*
       获取RS的纠错多项式
        */
    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
      var a = new QRPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    },
    /*
       获取评价
        */
    getLostPoint: function getLostPoint(qrCode) {
      var moduleCount = qrCode.getModuleCount(),
      lostPoint = 0,
      darkCount = 0;
      for (var row = 0; row < moduleCount; row++) {
        var sameCount = 0;
        var head = qrCode.modules[row][0];
        for (var col = 0; col < moduleCount; col++) {
          var current = qrCode.modules[row][col];
          //level 3 评价
          if (col < moduleCount - 6) {
            if (current && !qrCode.modules[row][col + 1] && qrCode.modules[row][col + 2] && qrCode.modules[row][col + 3] && qrCode.modules[row][col + 4] && !qrCode.modules[row][col + 5] && qrCode.modules[row][col + 6]) {
              if (col < moduleCount - 10) {
                if (qrCode.modules[row][col + 7] && qrCode.modules[row][col + 8] && qrCode.modules[row][col + 9] && qrCode.modules[row][col + 10]) {
                  lostPoint += 40;
                }
              } else if (col > 3) {
                if (qrCode.modules[row][col - 1] && qrCode.modules[row][col - 2] && qrCode.modules[row][col - 3] && qrCode.modules[row][col - 4]) {
                  lostPoint += 40;
                }
              }
            }
          }
          //level 2 评价
          if (row < moduleCount - 1 && col < moduleCount - 1) {
            var count = 0;
            if (current) count++;
            if (qrCode.modules[row + 1][col]) count++;
            if (qrCode.modules[row][col + 1]) count++;
            if (qrCode.modules[row + 1][col + 1]) count++;
            if (count == 0 || count == 4) {
              lostPoint += 3;
            }
          }
          //level 1 评价
          if (head ^ current) {
            sameCount++;
          } else {
            head = current;
            if (sameCount >= 5) {
              lostPoint += 3 + sameCount - 5;
            }
            sameCount = 1;
          }
          //level 4 评价
          if (current) {
            darkCount++;
          }
        }
      }
      for (var col = 0; col < moduleCount; col++) {
        var sameCount = 0;
        var head = qrCode.modules[0][col];
        for (var row = 0; row < moduleCount; row++) {
          var current = qrCode.modules[row][col];
          //level 3 评价
          if (row < moduleCount - 6) {
            if (current && !qrCode.modules[row + 1][col] && qrCode.modules[row + 2][col] && qrCode.modules[row + 3][col] && qrCode.modules[row + 4][col] && !qrCode.modules[row + 5][col] && qrCode.modules[row + 6][col]) {
              if (row < moduleCount - 10) {
                if (qrCode.modules[row + 7][col] && qrCode.modules[row + 8][col] && qrCode.modules[row + 9][col] && qrCode.modules[row + 10][col]) {
                  lostPoint += 40;
                }
              } else if (row > 3) {
                if (qrCode.modules[row - 1][col] && qrCode.modules[row - 2][col] && qrCode.modules[row - 3][col] && qrCode.modules[row - 4][col]) {
                  lostPoint += 40;
                }
              }
            }
          }
          //level 1 评价
          if (head ^ current) {
            sameCount++;
          } else {
            head = current;
            if (sameCount >= 5) {
              lostPoint += 3 + sameCount - 5;
            }
            sameCount = 1;
          }
        }
      }
      // LEVEL4
      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    } };


  //---------------------------------------------------------------------
  // QRMath使用的数学工具
  //---------------------------------------------------------------------
  var QRMath = {
    /*
                 将n转化为a^m
                  */
    glog: function glog(n) {
      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }
      return QRMath.LOG_TABLE[n];
    },
    /*
       将a^m转化为n
        */
    gexp: function gexp(n) {
      while (n < 0) {
        n += 255;
      }
      while (n >= 256) {
        n -= 255;
      }
      return QRMath.EXP_TABLE[n];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256) };


  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }
  //---------------------------------------------------------------------
  // QRPolynomial 多项式
  //---------------------------------------------------------------------
  /**
   * 多项式类
   * @param {Array} num   系数
   * @param {num} shift a^shift
   */
  function QRPolynomial(num, shift) {
    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }
    var offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset++;
    }
    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }
  QRPolynomial.prototype = {
    get: function get(index) {
      return this.num[index];
    },
    getLength: function getLength() {
      return this.num.length;
    },
    /**
        * 多项式乘法
        * @param  {QRPolynomial} e 被乘多项式
        * @return {[type]}   [description]
        */
    multiply: function multiply(e) {
      var num = new Array(this.getLength() + e.getLength() - 1);
      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }
      return new QRPolynomial(num, 0);
    },
    /**
        * 多项式模运算
        * @param  {QRPolynomial} e 模多项式
        * @return {}
        */
    mod: function mod(e) {
      var tl = this.getLength(),
      el = e.getLength();
      if (tl - el < 0) {
        return this;
      }
      var num = new Array(tl);
      for (var i = 0; i < tl; i++) {
        num[i] = this.get(i);
      }
      while (num.length >= el) {
        var ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0));

        for (var i = 0; i < e.getLength(); i++) {
          num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        }
        while (num[0] == 0) {
          num.shift();
        }
      }
      return new QRPolynomial(num, 0);
    } };


  //---------------------------------------------------------------------
  // RS_BLOCK_TABLE
  //---------------------------------------------------------------------
  /*
  二维码各个版本信息[块数, 每块中的数据块数, 每块中的信息块数]
   */
  var RS_BLOCK_TABLE = [
  // L
  // M
  // Q
  // H
  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]];


  /**
                              * 根据数据获取对应版本
                              * @return {[type]} [description]
                              */
  QRCodeAlg.prototype.getRightType = function () {
    for (var typeNumber = 1; typeNumber < 41; typeNumber++) {
      var rsBlock = RS_BLOCK_TABLE[(typeNumber - 1) * 4 + this.errorCorrectLevel];
      if (rsBlock == undefined) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + this.errorCorrectLevel);
      }
      var length = rsBlock.length / 3;
      var totalDataCount = 0;
      for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0];
        var dataCount = rsBlock[i * 3 + 2];
        totalDataCount += dataCount * count;
      }
      var lengthBytes = typeNumber > 9 ? 2 : 1;
      if (this.utf8bytes.length + lengthBytes < totalDataCount || typeNumber == 40) {
        this.typeNumber = typeNumber;
        this.rsBlock = rsBlock;
        this.totalDataCount = totalDataCount;
        break;
      }
    }
  };

  //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------
  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }
  QRBitBuffer.prototype = {
    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return this.buffer[bufIndex] >>> 7 - index % 8 & 1;
    },
    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit(num >>> length - i - 1 & 1);
      }
    },
    putBit: function putBit(bit) {
      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }
      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }
      this.length++;
    } };




  // xzedit
  var qrcodeAlgObjCache = [];
  /**
                               * 二维码构造函数，主要用于绘制
                               * @param  {参数列表} opt 传递参数
                               * @return {}
                               */
  QRCode = function QRCode(opt) {
    //设置默认参数
    this.options = {
      text: '',
      size: 256,
      correctLevel: 3,
      background: '#ffffff',
      foreground: '#000000',
      pdground: '#000000',
      image: '',
      imageSize: 30,
      canvasId: opt.canvasId,
      context: opt.context,
      usingComponents: opt.usingComponents,
      showLoading: opt.showLoading,
      loadingText: opt.loadingText };

    if (typeof opt === 'string') {// 只编码ASCII字符串
      opt = {
        text: opt };

    }
    if (opt) {
      for (var i in opt) {
        this.options[i] = opt[i];
      }
    }
    //使用QRCodeAlg创建二维码结构
    var qrCodeAlg = null;
    for (var i = 0, l = qrcodeAlgObjCache.length; i < l; i++) {
      if (qrcodeAlgObjCache[i].text == this.options.text && qrcodeAlgObjCache[i].text.correctLevel == this.options.correctLevel) {
        qrCodeAlg = qrcodeAlgObjCache[i].obj;
        break;
      }
    }
    if (i == l) {
      qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel);
      qrcodeAlgObjCache.push({
        text: this.options.text,
        correctLevel: this.options.correctLevel,
        obj: qrCodeAlg });

    }
    /**
       * 计算矩阵点的前景色
       * @param {Obj} config
       * @param {Number} config.row 点x坐标
       * @param {Number} config.col 点y坐标
       * @param {Number} config.count 矩阵大小
       * @param {Number} config.options 组件的options
       * @return {String}
       */
    var getForeGround = function getForeGround(config) {
      var options = config.options;
      if (options.pdground && (
      config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5 ||
      config.row > config.count - 6 && config.row < config.count - 2 && config.col > 1 && config.col < 5 ||
      config.row > 1 && config.row < 5 && config.col > config.count - 6 && config.col < config.count - 2))
      {
        return options.pdground;
      }
      return options.foreground;
    };
    // 创建canvas
    var createCanvas = function createCanvas(options) {
      if (options.showLoading) {
        uni.showLoading({
          title: options.loadingText,
          mask: true });

      }
      var ctx = uni.createCanvasContext(options.canvasId, options.context);
      var count = qrCodeAlg.getModuleCount();
      var ratioSize = options.size;
      var ratioImgSize = options.imageSize;
      //计算每个点的长宽
      var tileW = (ratioSize / count).toPrecision(4);
      var tileH = (ratioSize / count).toPrecision(4);
      //绘制
      for (var row = 0; row < count; row++) {
        for (var col = 0; col < count; col++) {
          var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
          var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
          var foreground = getForeGround({
            row: row,
            col: col,
            count: count,
            options: options });

          ctx.setFillStyle(qrCodeAlg.modules[row][col] ? foreground : options.background);
          ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
        }
      }
      if (options.image) {




        // 画圆角矩形
        var drawRoundedRect = function drawRoundedRect(ctxi, x, y, width, height, r, lineWidth, fill, stroke) {
          ctxi.setLineWidth(lineWidth);
          ctxi.setFillStyle(options.background);
          ctxi.setStrokeStyle(options.background);
          ctxi.beginPath(); // draw top and top right corner 
          ctxi.moveTo(x + r, y);
          ctxi.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner 
          ctxi.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner 
          ctxi.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner 
          ctxi.arcTo(x, y, x + r, y, r);
          ctxi.closePath();
          if (fill) {
            ctxi.fill();
          }
          if (stroke) {
            ctxi.stroke();
          }
        };var x = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));var y = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));drawRoundedRect(ctx, x, y, ratioImgSize, ratioImgSize, 2, 6, true, true);ctx.drawImage(options.image, x, y, ratioImgSize, ratioImgSize);
      }
      setTimeout(function () {
        ctx.draw(true, function () {
          // 保存到临时区域
          setTimeout(function () {
            uni.canvasToTempFilePath({
              width: options.width,
              height: options.height,
              destWidth: options.width,
              destHeight: options.height,
              canvasId: options.canvasId,
              quality: Number(1),
              success: function success(res) {
                if (options.cbResult) {
                  options.cbResult(res.tempFilePath);
                }
              },
              fail: function fail(res) {
                if (options.cbResult) {
                  options.cbResult(res);
                }
              },
              complete: function complete() {
                if (options.showLoading) {
                  uni.hideLoading();
                }
              } },
            options.context);
          }, options.text.length + 100);
        });
      }, options.usingComponents ? 0 : 150);
    };
    createCanvas(this.options);
    // 空判定
    var empty = function empty(v) {
      var tp = typeof v,
      rt = false;
      if (tp == "number" && String(v) == "") {
        rt = true;
      } else if (tp == "undefined") {
        rt = true;
      } else if (tp == "object") {
        if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true;
      } else if (tp == "string") {
        if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true;
      } else if (tp == "function") {
        rt = false;
      }
      return rt;
    };
  };
  QRCode.prototype.clear = function (fn) {
    var ctx = uni.createCanvasContext(this.options.canvasId, this.options.context);
    ctx.clearRect(0, 0, this.options.size, this.options.size);
    ctx.draw(false, function () {
      if (fn) {
        fn();
      }
    });
  };
})();var _default =

QRCode;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 55:
/*!****************************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/utils/qqmap-wx-jssdk.min.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _createClass = function () {function a(e, c) {for (var b = 0; b < c.length; b++) {var d = c[b];d.enumerable = d.enumerable || false;d.configurable = true;if ("value" in d) {d.writable = true;}Object.defineProperty(e, d.key, d);}}return function (d, b, c) {if (b) {a(d.prototype, b);}if (c) {a(d, c);}return d;};}();function _classCallCheck(a, b) {if (!(a instanceof b)) {throw new TypeError("Cannot call a class as a function");}}var ERROR_CONF = { KEY_ERR: 311, KEY_ERR_MSG: "key格式错误", PARAM_ERR: 310, PARAM_ERR_MSG: "请求参数信息有误", SYSTEM_ERR: 600, SYSTEM_ERR_MSG: "系统错误", WX_ERR_CODE: 1000, WX_OK_CODE: 200 };var BASE_URL = "https://apis.map.qq.com/ws/";var URL_SEARCH = BASE_URL + "place/v1/search";var URL_SUGGESTION = BASE_URL + "place/v1/suggestion";var URL_GET_GEOCODER = BASE_URL + "geocoder/v1/";var URL_CITY_LIST = BASE_URL + "district/v1/list";var URL_AREA_LIST = BASE_URL + "district/v1/getchildren";var URL_DISTANCE = BASE_URL + "distance/v1/";var Utils = { location2query: function location2query(c) {if (typeof c == "string") {return c;}var b = "";for (var a = 0; a < c.length; a++) {var e = c[a];if (!!b) {b += ";";}if (e.location) {b = b + e.location.lat + "," + e.location.lng;}if (e.latitude && e.longitude) {b = b + e.latitude + "," + e.longitude;}}return b;}, getWXLocation: function getWXLocation(c, b, a) {wx.getLocation({ type: "gcj02", success: c, fail: b, complete: a });}, getLocationParam: function getLocationParam(b) {if (typeof b == "string") {var a = b.split(",");if (a.length === 2) {b = { latitude: b.split(",")[0], longitude: b.split(",")[1] };} else {b = {};}}return b;}, polyfillParam: function polyfillParam(a) {a.success = a.success || function () {};a.fail = a.fail || function () {};a.complete = a.complete || function () {};}, checkParamKeyEmpty: function checkParamKeyEmpty(c, b) {if (!c[b]) {var a = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + b + "参数格式有误");c.fail(a);c.complete(a);return true;}return false;}, checkKeyword: function checkKeyword(a) {return !this.checkParamKeyEmpty(a, "keyword");}, checkLocation: function checkLocation(c) {var a = this.getLocationParam(c.location);if (!a || !a.latitude || !a.longitude) {var b = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + " location参数格式有误");c.fail(b);c.complete(b);return false;}return true;}, buildErrorConfig: function buildErrorConfig(a, b) {return { status: a, message: b };}, buildWxRequestConfig: function buildWxRequestConfig(c, a) {var b = this;a.header = { "content-type": "application/json" };a.method = "GET";a.success = function (d) {var e = d.data;if (e.status === 0) {c.success(e);} else {c.fail(e);}};a.fail = function (d) {d.statusCode = ERROR_CONF.WX_ERR_CODE;c.fail(b.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, result.errMsg));};a.complete = function (d) {var e = +d.statusCode;switch (e) {case ERROR_CONF.WX_ERR_CODE:c.complete(b.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, d.errMsg));break;case ERROR_CONF.WX_OK_CODE:var f = d.data;if (f.status === 0) {c.complete(f);} else {c.complete(b.buildErrorConfig(f.status, f.message));}break;default:c.complete(b.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));}};return a;}, locationProcess: function locationProcess(f, e, c, a) {var d = this;c = c || function (g) {g.statusCode = ERROR_CONF.WX_ERR_CODE;f.fail(d.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, g.errMsg));};a = a || function (g) {if (g.statusCode == ERROR_CONF.WX_ERR_CODE) {f.complete(d.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, g.errMsg));}};if (!f.location) {d.getWXLocation(e, c, a);} else {if (d.checkLocation(f)) {var b = Utils.getLocationParam(f.location);e(b);}}} };var QQMapWX = function () {function b(i) {_classCallCheck(this, b);if (!i.key) {throw Error("key值不能为空");}this.key = i.key;}_createClass(b, [{ key: "search", value: function f(i) {var l = this;i = i || {};Utils.polyfillParam(i);if (!Utils.checkKeyword(i)) {return;}var k = { keyword: i.keyword, orderby: i.orderby || "_distance", page_size: i.page_size || 10, page_index: i.page_index || 1, output: "json", key: l.key };if (i.address_format) {k.address_format = i.address_format;}if (i.filter) {k.filter = i.filter;}var n = i.distance || "1000";var j = i.auto_extend || 1;var m = function m(o) {k.boundary = "nearby(" + o.latitude + "," + o.longitude + "," + n + "," + j + ")";wx.request(Utils.buildWxRequestConfig(i, { url: URL_SEARCH, data: k }));};Utils.locationProcess(i, m);} }, { key: "getSuggestion", value: function h(i) {var k = this;i = i || {};Utils.polyfillParam(i);if (!Utils.checkKeyword(i)) {return;}var j = { keyword: i.keyword, region: i.region || "全国", region_fix: i.region_fix || 0, policy: i.policy || 0, output: "json", key: k.key };wx.request(Utils.buildWxRequestConfig(i, { url: URL_SUGGESTION, data: j }));} }, { key: "reverseGeocoder", value: function a(i) {var k = this;i = i || {};Utils.polyfillParam(i);var j = { coord_type: i.coord_type || 5, get_poi: i.get_poi || 0, output: "json", key: k.key };if (i.poi_options) {j.poi_options = i.poi_options;}var l = function l(m) {j.location = m.latitude + "," + m.longitude;wx.request(Utils.buildWxRequestConfig(i, { url: URL_GET_GEOCODER, data: j }));};Utils.locationProcess(i, l);} }, { key: "geocoder", value: function g(i) {var k = this;i = i || {};Utils.polyfillParam(i);if (Utils.checkParamKeyEmpty(i, "address")) {return;}var j = { address: i.address, output: "json", key: k.key };wx.request(Utils.buildWxRequestConfig(i, { url: URL_GET_GEOCODER, data: j }));} }, { key: "getCityList", value: function c(i) {var k = this;i = i || {};Utils.polyfillParam(i);var j = { output: "json", key: k.key };
      wx.request(Utils.buildWxRequestConfig(i, { url: URL_CITY_LIST, data: j }));} }, { key: "getDistrictByCityId", value: function d(i) {var k = this;i = i || {};Utils.polyfillParam(i);if (Utils.checkParamKeyEmpty(i, "id")) {return;}var j = { id: i.id || "", output: "json", key: k.key };wx.request(Utils.buildWxRequestConfig(i, { url: URL_AREA_LIST, data: j }));} }, { key: "calculateDistance", value: function e(i) {var k = this;i = i || {};Utils.polyfillParam(i);if (Utils.checkParamKeyEmpty(i, "to")) {return;}var j = { mode: i.mode || "walking", to: Utils.location2query(i.to), output: "json", key: k.key };var l = function l(m) {j.from = m.latitude + "," + m.longitude;wx.request(Utils.buildWxRequestConfig(i, { url: URL_DISTANCE, data: j }));};if (i.from) {i.location = i.from;}Utils.locationProcess(i, l);} }]);return b;}();module.exports = QQMapWX;

/***/ }),

/***/ 564:
/*!******************************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/components/uni-icons/icons.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 579:
/*!*********************************************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/components/uni-search-bar/uni-icons/icons.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 8:
/*!*****************************************************!*\
  !*** E:/彩票项目/彩票项目（改7-H5）/fucai-H5/common/common.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var URL = 'https://fucaiapi.yiruit.com/yiru/rds/';
var PicURL = 'http://fucai.yiruit.com';
// var jweixin = require('../utils/jweixin-module.js') 
var cachetime = 30;
//判断是否登录
//url_keyvalue格式：ID=123&UserName=abc
function isLogin(obj, zhuantiao) {
  var userState = getstate();
  if (!!userState.ID) {
    return true;
  } else {
    if (zhuantiao) {
      uni.reLaunch({
        url: "/pages/login/userLogin" });

    }
    return false;
  }
}

function logout(_bool) {
  uni.removeStorageSync('jingwei');
  uni.removeStorageSync('userinfo');
  uni.removeStorageSync('fucaistate');
  uni.removeStorageSync('riderinfo');
  uni.removeStorageSync('openid');
  // if (!_bool) {
  uni.navigateTo({
    url: "/pages/login/userLogin" });

  // ({
  // 	url: "/pages/login/userLogin"
  // });
  // }
}

function getHeadImg(_url, _sex) {
  if (!!_url) {
    return _url.substr(0, 4) == "http" ? _url : PicURL + _url;
  }
  if (_sex == 1) {
    return "/static/on-boy.jpg";
  } else {
    return "/static/on-girl.jpg";
  }
}
var flagIndex = 0;

function request(par) {
  flagIndex++;
  // return new Promise((resolve, reject) => {
  if (par.cache) {
    var _value = uni.getStorageSync(par.cache.key);
    if (_value) {
      var _valuejson = JSON.parse(_value);
      if (TimeDifference(new Date(_valuejson.addtime), new Date()) < (par.cache.time ? par.cache.time : cachetime)) {
        uni.hideLoading();
        return par.success(_valuejson.data);
      }
    }
  }
  uni.showLoading({
    title: "数据加载中...",
    mask: true });

  uni.request({
    url: URL + par.path,
    data: postdata(par.data || ""),
    method: par.method ? par.method : 'POST',
    dataType: 'json',
    success: function success(res) {
      if (!par.isloading) {
        uni.hideLoading();
      }
      if (res.data.code == 200 || res.data.code == 400) {
        if (par.cache) {
          uni.setStorageSync(par.cache.key, JSON.stringify({
            data: res.data.data,
            addtime: new Date() }));

        }
        return par.success(res.data);
        // resolve(par.success(res.data.data))
      }
      if (res.data.code == 410) {
        logout(true);
        uni.reLaunch({
          url: "/pages/login/userLogin" });

      } else {
        if (!par.fail) {
          uni.showToast({
            icon: 'none',
            title: res.data.info });

        } else {
          return par.fail(res.data);
          // reject(res.data)
        }
      }
    },
    fail: function fail(e) {
      uni.hideLoading();
      uni.showToast({
        icon: 'none',
        title: '网络异常,请稍后重试' });


    },
    complete: function complete() {
      flagIndex--;
      if (flagIndex == 0) uni.hideLoading();
    } });

  // })
}

function requestFile(par) {
  var up = uni.uploadFile({
    url: URL + par.path,
    filePath: par.file,
    name: 'upload',
    formData: postdata(par.data),
    success: function success(res) {
      uni.hideLoading();
      if (res.statusCode == 200) {
        var arr = JSON.parse(res.data);
        if (arr.code == 200) {
          return par.success(arr.data);
        }
        if (arr.code == 410) {
          setstate({});
          uni.reLaunch({
            url: "/pages/login/userLogin" });

        } else {
          uni.showToast({
            icon: 'none',
            title: arr.info });

        }
      } else {
        uni.showToast({
          icon: 'none',
          title: '请求错误，请稍后再试' });

      }
    },
    fail: function fail(e) {
      uni.hideLoading();
      uni.showToast({
        icon: 'none',
        title: '网络异常,请稍后重试' });

    } });

  if (par.Progress) {
    up.onProgressUpdate(function (res) {
      return par.Progress(res);
    });
  }
}
//2各日期相差分钟数
function TimeDifference(k, j) {
  return (j.getTime() - k.getTime()) / 1000 / 60; //时间差的毫秒数
};
//统计封装的请求数据
function postdata(data) {
  var pos = {};
  pos.loginMark = getloginMark();
  pos.token = getstate().token;
  if (isJsonFormat(data)) {
    pos.data = JSON.stringify(data || {});
  } else {
    pos.data = data;
  }
  //pos.data = JSON.stringify(data);
  return pos;
};

function isJsonFormat(str) {
  var obj = str;
  var xy = Object.prototype.toString.call(obj);
  if (xy == "[object Object]" || xy == "[object Array]") {
    return true;
  } else {
    return false;
  }
};
//获取会员缓存的信息
function getstate() {
  var state = uni.getStorageSync('fucaistate') || "{}";
  return JSON.parse(state);
}
//设置会员缓存信息
function setstate(state) {
  uni.setStorageSync('fucaistate', JSON.stringify(state));
}

function checkPhone(phone) {
  phone = phone || '';
  var reg = /^0?(13|15|18|16|14|17|19)[0-9]{9}$/;
  return reg.test(phone);
};

function checkNumber(Number) {
  if (Number === "" || Number == null) {
    return false;
  }
  if (!isNaN(Number)) {
    return true;
  }
  return false;
};
//小程序端自动生成设备识别码
function customuuid() {
  var len = 29;
  var radix = 16; //基数
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
  i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  return 'MP_' + uuid.join('');
}
//获取设备识别码
function getloginMark() {
  //uni.removeStorageSync('loginMark');
  var mark = uni.getStorageSync('loginMark');
  if (!mark) {
    mark = customuuid();
    uni.setStorageSync('loginMark', mark);
  }
  return mark;
}
// 获取复选的组数
// 比如8个数 每7个数组合一组，可以有多少组 即有多少注彩票
// 默认 6 个球一组
function getGroups(max) {var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  var allmax = max;
  var allmin = min;
  var flagmax = 1;
  while (flagmax < min) {
    flagmax++;
    allmax = allmax * (max - 1);
    max = max - 1;
  };
  while (min > 1) {
    allmin = allmin * (min - 1);
    min = min - 1;
  };
  return allmax / allmin;
};

function getCity(city) {
  return new Promise(function (resolve, reject) {
    uni.getLocation({
      type: "gcj02",
      success: function success(res1) {
        var latitude = res1.latitude;
        var longitude = res1.longitude;
        uni.setStorageSync("jingwei", {
          latitude: latitude,
          longitude: longitude });

        uni.request({
          url: "https://apis.map.qq.com/ws/geocoder/v1/?location=".concat(latitude, ",").concat(longitude, "&key=5XTBZ-SXL6R-7OYWX-WTOCF-M7BUK-TSFBQ"),
          data: {},
          header: {
            "content-type": "application/json" },

          method: "GET",
          dataType: "json",
          responseType: "text",
          success: function success(result) {
            city = result.data.result.address_component.city;
            resolve(city);
          } });

      },
      fail: function fail(err) {
        reject(err);
      },
      complete: function complete() {

      } });

  });
}
function Time() {
  var now = new Date();
  var year = now.getFullYear(); //得到年份
  var month = now.getMonth(); //得到月份
  var date = now.getDate(); //得到日期
  var day = now.getDay(); //得到周几
  var hour = now.getHours(); //得到小时
  var minu = now.getMinutes(); //得到分钟
  var sec = now.getSeconds(); //得到秒
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minu < 10) {
    minu = "0" + minu;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  month = month + 1;
  var time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
  return time;
}var _default =
{
  URL: URL,
  isLogin: isLogin,
  logout: logout,
  getloginMark: getloginMark,
  request: request,
  requestFile: requestFile,
  setstate: setstate,
  getstate: getstate,
  checkPhone: checkPhone,
  checkNumber: checkNumber,
  PicURL: PicURL,
  getHeadImg: getHeadImg,
  getGroups: getGroups,
  postdata: postdata,
  getCity: getCity,
  Time: Time };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map