(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wikipediaPreview"] = factory();
	else
		root["wikipediaPreview"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js?!./style/popup.less":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js??ref--6-2!./style/popup.less ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".wp-popup {\\n  box-sizing: border-box;\\n  padding: 0;\\n  position: absolute;\\n  border: solid rgba(0, 0, 0, 0.05) 1px;\\n  border-radius: 2px;\\n  background-color: white;\\n  box-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.3), 0 0 1px 1px rgba(0, 0, 0, 0.05);\\n  height: 200px;\\n  width: auto;\\n  z-index: 110;\\n}\\n.wp-popup * {\\n  box-sizing: border-box;\\n}\\n.wp-popup .wp-article-preview {\\n  display: flex;\\n}\\n.wp-popup .wp-article-preview .wp-text-content {\\n  width: 200px;\\n  height: 200px;\\n  padding: 10px;\\n  display: flex;\\n  flex-direction: column;\\n}\\n.wp-popup .wp-article-preview .wp-text-content .wp-title {\\n  font-size: 20px;\\n  font-family: 'Linux Libertine', 'Georgia', 'Times', serif;\\n}\\n.wp-popup .wp-article-preview .wp-text-content .wp-preview {\\n  font-size: 14px;\\n  flex-grow: 1;\\n  font-family: sans-serif;\\n}\\n.wp-popup .wp-article-preview .wp-text-content .wp-preview p {\\n  padding: 0;\\n  margin: 0;\\n  overflow: hidden;\\n  line-height: 20px;\\n  max-height: 140px;\\n}\\n.wp-popup .wp-article-preview .wp-text-content .wp-preview p:after {\\n  content: ' ';\\n  position: absolute;\\n  bottom: 25px;\\n  left: 10px;\\n  right: 200px;\\n  top: 160px;\\n  background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%, #ffffff 100%);\\n  /* FF3.6-15 */\\n  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, #ffffff 100%);\\n  /* Chrome10-25,Safari5.1-6 */\\n  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #ffffff 100%);\\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff', endColorstr='#ffffff', GradientType=0);\\n  /* IE6-9 */\\n}\\n.wp-popup .wp-article-preview .wp-text-content .wp-preview .wp-link {\\n  font-family: 'Linux Libertine';\\n}\\n.wp-popup .wp-article-preview .wp-image {\\n  width: 200px;\\n  height: 200px;\\n  background-size: cover;\\n  background-position: center;\\n}\\n\", \"\"]);\n\n\n//# sourceURL=webpack://wikipediaPreview/./style/popup.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js??ref--6-2");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \"{\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      // eslint-disable-next-line prefer-destructuring\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = modules[_i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = \"(\".concat(item[2], \") and (\").concat(mediaQuery, \")\");\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot).concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack://wikipediaPreview/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar stylesInDom = {};\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nfunction listToStyles(list, options) {\n  var styles = [];\n  var newStyles = {};\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var css = item[1];\n    var media = item[2];\n    var sourceMap = item[3];\n    var part = {\n      css: css,\n      media: media,\n      sourceMap: sourceMap\n    };\n\n    if (!newStyles[id]) {\n      styles.push(newStyles[id] = {\n        id: id,\n        parts: [part]\n      });\n    } else {\n      newStyles[id].parts.push(part);\n    }\n  }\n\n  return styles;\n}\n\nfunction addStylesToDom(styles, options) {\n  for (var i = 0; i < styles.length; i++) {\n    var item = styles[i];\n    var domStyle = stylesInDom[item.id];\n    var j = 0;\n\n    if (domStyle) {\n      domStyle.refs++;\n\n      for (; j < domStyle.parts.length; j++) {\n        domStyle.parts[j](item.parts[j]);\n      }\n\n      for (; j < item.parts.length; j++) {\n        domStyle.parts.push(addStyle(item.parts[j], options));\n      }\n    } else {\n      var parts = [];\n\n      for (; j < item.parts.length; j++) {\n        parts.push(addStyle(item.parts[j], options));\n      }\n\n      stylesInDom[item.id] = {\n        id: item.id,\n        refs: 1,\n        parts: parts\n      };\n    }\n  }\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n\n  if (typeof options.attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      options.attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(options.attributes).forEach(function (key) {\n    style.setAttribute(key, options.attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  var styles = listToStyles(list, options);\n  addStylesToDom(styles, options);\n  return function update(newList) {\n    var mayRemove = [];\n\n    for (var i = 0; i < styles.length; i++) {\n      var item = styles[i];\n      var domStyle = stylesInDom[item.id];\n\n      if (domStyle) {\n        domStyle.refs--;\n        mayRemove.push(domStyle);\n      }\n    }\n\n    if (newList) {\n      var newStyles = listToStyles(newList, options);\n      addStylesToDom(newStyles, options);\n    }\n\n    for (var _i = 0; _i < mayRemove.length; _i++) {\n      var _domStyle = mayRemove[_i];\n\n      if (_domStyle.refs === 0) {\n        for (var j = 0; j < _domStyle.parts.length; j++) {\n          _domStyle.parts[j]();\n        }\n\n        delete stylesInDom[_domStyle.id];\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack://wikipediaPreview/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/unfetch/dist/unfetch.mjs":
/*!***********************************************!*\
  !*** ./node_modules/unfetch/dist/unfetch.mjs ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(JSON.parse(s.responseText))},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||\"get\",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\\S\\n]*([\\s\\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+\",\"+t:t}),t(a())},s.onerror=r,s.withCredentials=\"include\"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)})});\n//# sourceMappingURL=unfetch.mjs.map\n\n\n//# sourceURL=webpack://wikipediaPreview/./node_modules/unfetch/dist/unfetch.mjs?");

/***/ }),

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/*! exports provided: fetchPagePreview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchPagePreview\", function() { return fetchPagePreview; });\n/* harmony import */ var _cachedFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cachedFetch */ \"./src/cachedFetch.js\");\n\n\nvar fetchPagePreview = function fetchPagePreview(lang, title) {\n  var fetch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _cachedFetch__WEBPACK_IMPORTED_MODULE_0__[\"cachedFetch\"];\n  var url = \"https://\".concat(lang, \".wikipedia.org/api/rest_v1/page/summary/\").concat(encodeURIComponent(title));\n  return fetch(url, function (data) {\n    if (data.type !== 'standard') {\n      // don't show popup for disambiguation or redirect\n      return false;\n    }\n\n    if (data.dir !== 'ltr') {\n      return false;\n    }\n\n    return {\n      title: data.displaytitle,\n      extractHtml: data.extract_html,\n      pageUrl: data.content_urls.desktop.page,\n      imgUrl: data.thumbnail ? data.thumbnail.source : null\n    };\n  });\n};\n\n\n\n//# sourceURL=webpack://wikipediaPreview/./src/api.js?");

/***/ }),

/***/ "./src/cachedFetch.js":
/*!****************************!*\
  !*** ./src/cachedFetch.js ***!
  \****************************/
/*! exports provided: cachedFetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cachedFetch\", function() { return cachedFetch; });\n/* harmony import */ var unfetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unfetch */ \"./node_modules/unfetch/dist/unfetch.mjs\");\n\nvar dataCache = {};\nvar requestCache = {};\n\nvar cachedFetch = function cachedFetch(url, transformFn) {\n  var f = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : unfetch__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n  if (typeof dataCache[url] !== 'undefined') {\n    return Promise.resolve(dataCache[url]);\n  }\n\n  if (requestCache[url]) {\n    return requestCache[url];\n  } // todo: figure out how to sent client-specific analytics tracking\n  // const headers = { 'X-Analytics': 'wikipedia-preview-' + clientId };\n\n\n  return requestCache[url] = f(url).then(function (response) {\n    return response.json();\n  }).then(function (data) {\n    return transformFn(data);\n  }).then(function (data) {\n    dataCache[url] = data;\n    return data;\n  });\n};\n\n\n\n//# sourceURL=webpack://wikipediaPreview/./src/cachedFetch.js?");

/***/ }),

/***/ "./src/i18n.js":
/*!*********************!*\
  !*** ./src/i18n.js ***!
  \*********************/
/*! exports provided: msg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"msg\", function() { return msg; });\nvar messages = {\n  en: {\n    'wikipedia': 'Wikipedia'\n  },\n  fr: {\n    'wikipedia': 'Wikipédia'\n  },\n  es: {\n    'wikipedia': 'Wikipedia'\n  }\n};\n\nvar msg = function msg(lang, key) {\n  return (messages[lang] || messages.en)[key];\n};\n\n\n\n//# sourceURL=webpack://wikipediaPreview/./src/i18n.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup */ \"./src/popup.js\");\n/* harmony import */ var _preview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./preview */ \"./src/preview.js\");\n/* harmony import */ var _style_popup_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/popup.less */ \"./style/popup.less\");\n/* harmony import */ var _style_popup_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_popup_less__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nfunction init() {\n  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n      root = _ref.root,\n      selector = _ref.selector,\n      lang = _ref.lang,\n      popupContainer = _ref.popupContainer;\n\n  var globalLang = lang || 'en';\n  root = root || document;\n  selector = selector || '[data-wikipedia-preview]';\n  popupContainer = popupContainer || document.body;\n  var popup = Object(_popup__WEBPACK_IMPORTED_MODULE_1__[\"createPopup\"])(popupContainer);\n\n  var mouseEnter = function mouseEnter(_ref2) {\n    var target = _ref2.target;\n    var title = target.getAttribute('data-wp-title') || target.textContent;\n    var lang = target.getAttribute('data-wp-lang') || globalLang;\n    Object(_api__WEBPACK_IMPORTED_MODULE_0__[\"fetchPagePreview\"])(lang, title).then(function (data) {\n      if (data) {\n        popup.show(Object(_preview__WEBPACK_IMPORTED_MODULE_2__[\"renderPreview\"])(lang, data), target);\n      }\n    });\n  };\n\n  Array.prototype.forEach.call(root.querySelectorAll(selector), function (node) {\n    node.addEventListener('mouseenter', mouseEnter);\n  });\n}\n\n\n\n//# sourceURL=webpack://wikipediaPreview/./src/index.js?");

/***/ }),

/***/ "./src/popup.js":
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
/*! exports provided: createPopup, computePopupPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createPopup\", function() { return createPopup; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"computePopupPosition\", function() { return computePopupPosition; });\nvar computePopupPosition = function computePopupPosition(targetRect, popupWidth, scrollX, scrollY, innerWidth, innerHeight) {\n  var left,\n      right = '',\n      top = '',\n      bottom = '';\n  left = targetRect.x > innerWidth / 2 ? scrollX + targetRect.right - popupWidth : scrollX + targetRect.left;\n\n  if (targetRect.y > innerHeight / 2) {\n    bottom = innerHeight - targetRect.top - scrollY;\n  } else {\n    top = scrollY + targetRect.bottom;\n  }\n\n  return {\n    left: left,\n    right: right,\n    top: top,\n    bottom: bottom\n  };\n};\n\nvar withPx = function withPx(value) {\n  return value ? value + 'px' : value;\n};\n\nvar popup;\n\nvar createPopup = function createPopup(container) {\n  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;\n  var currentTargetElement;\n\n  if (!popup) {\n    popup = win.document.createElement('div');\n    popup.setAttribute('dir', 'ltr');\n    popup.classList.add('wp-popup');\n    popup.style.visibility = 'hidden';\n    container.appendChild(popup);\n  }\n\n  var onMouseLeave = function onMouseLeave(_ref) {\n    var toElement = _ref.toElement;\n\n    if (toElement !== currentTargetElement && !popup.contains(toElement)) {\n      popup.style.visibility = 'hidden';\n      currentTargetElement.removeEventListener('mouseleave', onMouseLeave);\n      currentTargetElement = null;\n    }\n  };\n\n  popup.addEventListener('mouseleave', onMouseLeave);\n\n  var show = function show(content, nextTo) {\n    popup.innerHTML = content;\n    var position = computePopupPosition(nextTo.getBoundingClientRect(), popup.offsetWidth, win.scrollX, win.scrollY, win.innerWidth, win.innerHeight);\n    popup.style.left = withPx(position.left);\n    popup.style.right = withPx(position.right);\n    popup.style.top = withPx(position.top);\n    popup.style.bottom = withPx(position.bottom);\n    currentTargetElement = nextTo;\n    currentTargetElement.addEventListener('mouseleave', onMouseLeave);\n    popup.style.visibility = 'visible';\n  };\n\n  return {\n    show: show\n  };\n};\n\n\n\n//# sourceURL=webpack://wikipediaPreview/./src/popup.js?");

/***/ }),

/***/ "./src/preview.js":
/*!************************!*\
  !*** ./src/preview.js ***!
  \************************/
/*! exports provided: renderPreview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderPreview\", function() { return renderPreview; });\n/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ \"./src/i18n.js\");\n\n\nvar renderPreview = function renderPreview(lang, data) {\n  var image = data.imgUrl ? \"<div class=\\\"wp-image\\\" style=\\\"background-image: url('\".concat(data.imgUrl, \"');\\\" />\") : '';\n  var wp = Object(_i18n__WEBPACK_IMPORTED_MODULE_0__[\"msg\"])(lang, 'wikipedia');\n  return \"\\n\\t\\t<div class=\\\"wp-article-preview\\\">\\n\\t\\t\\t<div class=\\\"wp-text-content\\\">\\n\\t\\t\\t\\t<div class=\\\"wp-title\\\">\".concat(data.title, \"</div>\\n\\t\\t\\t\\t<div class=\\\"wp-preview\\\">\").concat(data.extractHtml, \"</div>\\n\\t\\t\\t\\t<a class=\\\"wp-link\\\" href=\\\"\").concat(data.pageUrl, \"\\\" target=\\\"_blank\\\">\").concat(wp, \"</a>\\n\\t\\t\\t</div>\\n\\t\\t\\t\").concat(image, \"\\n\\t\\t</div>\\n\\t\").trim();\n};\n\n\n\n//# sourceURL=webpack://wikipediaPreview/./src/preview.js?");

/***/ }),

/***/ "./style/popup.less":
/*!**************************!*\
  !*** ./style/popup.less ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/less-loader/dist/cjs.js??ref--6-2!./popup.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js?!./style/popup.less\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack://wikipediaPreview/./style/popup.less?");

/***/ })

/******/ });
});