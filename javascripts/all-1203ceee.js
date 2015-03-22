/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   2.0.0
 */
(function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function e(t){return"function"==typeof t}function n(t){return"object"==typeof t&&null!==t}function r(){}function o(){return function(){process.nextTick(c)}}function i(){var t=0,e=new z(c),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function s(){var t=new MessageChannel;return t.port1.onmessage=c,function(){t.port2.postMessage(0)}}function u(){return function(){setTimeout(c,1)}}function c(){for(var t=0;L>t;t+=2){var e=Y[t],n=Y[t+1];e(n),Y[t]=void 0,Y[t+1]=void 0}L=0}function a(){}function l(){return new TypeError("You cannot resolve a promise with itself")}function f(){return new TypeError("A promises callback cannot return that same promise.")}function h(t){try{return t.then}catch(e){return K.error=e,K}}function p(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function d(t,e,n){R(function(t){var r=!1,o=p(n,e,function(n){r||(r=!0,e!==n?m(t,n):w(t,n))},function(e){r||(r=!0,g(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,g(t,o))},t)}function v(t,e){e._state===U?w(t,e._result):t._state===F?g(t,e._result):b(e,void 0,function(e){m(t,e)},function(e){g(t,e)})}function _(t,n){if(n.constructor===t.constructor)v(t,n);else{var r=h(n);r===K?g(t,K.error):void 0===r?w(t,n):e(r)?d(t,n,r):w(t,n)}}function m(e,n){e===n?g(e,l()):t(n)?_(e,n):w(e,n)}function y(t){t._onerror&&t._onerror(t._result),A(t)}function w(t,e){t._state===I&&(t._result=e,t._state=U,0===t._subscribers.length||R(A,t))}function g(t,e){t._state===I&&(t._state=F,t._result=e,R(y,t))}function b(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+U]=n,o[i+F]=r,0===i&&t._state&&R(A,t)}function A(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r,o,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?T(n,r,o,i):o(i);t._subscribers.length=0}}function E(){this.error=null}function S(t,e){try{return t(e)}catch(n){return N.error=n,N}}function T(t,n,r,o){var i,s,u,c,a=e(r);if(a){if(i=S(r,o),i===N?(c=!0,s=i.error,i=null):u=!0,n===i)return void g(n,f())}else i=o,u=!0;n._state!==I||(a&&u?m(n,i):c?g(n,s):t===U?w(n,i):t===F&&g(n,i))}function j(t,e){try{e(function(e){m(t,e)},function(e){g(t,e)})}catch(n){g(t,n)}}function P(t,e,n,r){this._instanceConstructor=t,this.promise=new t(a,r),this._abortOnReject=n,this._validateInput(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._init(),0===this.length?w(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&w(this.promise,this._result))):g(this.promise,this._validationError())}function k(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function C(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function M(t){this._id=J++,this._state=void 0,this._result=void 0,this._subscribers=[],a!==t&&(e(t)||k(),this instanceof M||C(),j(this,t))}var O;O=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var x,D=O,L=(Date.now||function(){return(new Date).getTime()},Object.create||function(t){if(arguments.length>1)throw new Error("Second argument not supported");if("object"!=typeof t)throw new TypeError("Argument must be an object");return r.prototype=t,new r},0),R=function(t,e){Y[L]=t,Y[L+1]=e,L+=2,2===L&&x()},q="undefined"!=typeof window?window:{},z=q.MutationObserver||q.WebKitMutationObserver,W="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,Y=new Array(1e3);x="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?o():z?i():W?s():u();var I=void 0,U=1,F=2,K=new E,N=new E;P.prototype._validateInput=function(t){return D(t)},P.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},P.prototype._init=function(){this._result=new Array(this.length)};var V=P;P.prototype._enumerate=function(){for(var t=this.length,e=this.promise,n=this._input,r=0;e._state===I&&t>r;r++)this._eachEntry(n[r],r)},P.prototype._eachEntry=function(t,e){var r=this._instanceConstructor;n(t)?t.constructor===r&&t._state!==I?(t._onerror=null,this._settledAt(t._state,e,t._result)):this._willSettleAt(r.resolve(t),e):(this._remaining--,this._result[e]=this._makeResult(U,e,t))},P.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===I&&(this._remaining--,this._abortOnReject&&t===F?g(r,n):this._result[e]=this._makeResult(t,e,n)),0===this._remaining&&w(r,this._result)},P.prototype._makeResult=function(t,e,n){return n},P.prototype._willSettleAt=function(t,e){var n=this;b(t,void 0,function(t){n._settledAt(U,e,t)},function(t){n._settledAt(F,e,t)})};var $=function(t,e){return new V(this,t,!0,e).promise},B=function(t,e){function n(t){m(i,t)}function r(t){g(i,t)}var o=this,i=new o(a,e);if(!D(t))return g(i,new TypeError("You must pass an array to race.")),i;for(var s=t.length,u=0;i._state===I&&s>u;u++)b(o.resolve(t[u]),void 0,n,r);return i},G=function(t,e){var n=this;if(t&&"object"==typeof t&&t.constructor===n)return t;var r=new n(a,e);return m(r,t),r},H=function(t,e){var n=this,r=new n(a,e);return g(r,t),r},J=0,Q=M;M.all=$,M.race=B,M.resolve=G,M.reject=H,M.prototype={constructor:M,then:function(t,e){var n=this,r=n._state;if(r===U&&!t||r===F&&!e)return this;var o=new this.constructor(a),i=n._result;if(r){var s=arguments[r-1];R(function(){T(r,o,s,i)})}else b(n,o,t,e);return o},"catch":function(t){return this.then(null,t)}};var X=function(){var t;t="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self;var n="Promise"in t&&"resolve"in t.Promise&&"reject"in t.Promise&&"all"in t.Promise&&"race"in t.Promise&&function(){var n;return new t.Promise(function(t){n=t}),e(n)}();n||(t.Promise=Q)},Z={Promise:Q,polyfill:X};"function"==typeof define&&define.amd?define(function(){return Z}):"undefined"!=typeof module&&module.exports?module.exports=Z:"undefined"!=typeof this&&(this.ES6Promise=Z)}).call(this),function(){var t;t=navigator.userAgent.match(/iPhone|iPad/),document.addEventListener("DOMContentLoaded",function(){var e,n,r,o,i;return o=document.querySelector("#speech-input"),r=document.querySelector("#speech-button"),i=document.querySelector("#voice-select"),e=[],null!=window.speechSynthesis?(n=function(){return new Promise(function(t,e){var n,r;return r=window.setTimeout(function(){return e("timeout")},5e3),(n=function(){var e;return(e=window.speechSynthesis.getVoices())&&e.length?(window.clearTimeout(r),t(Array.prototype.slice.call(e))):window.setTimeout(n,300)})()})},document.body.classList.add("synthesis-supported"),n().then(function(t){return e=t.filter(function(t){return t.lang.match(/^zh/)}),e.sort(function(t){return t.lang.match(/tw$/i)?-1:1}),Array.prototype.forEach.call(i.children,function(t){return t.remove()}),i.disabled=!1,e.forEach(function(t,e){var n;return n=document.createElement("option"),n.text=t.name+" ("+t.lang+")",n.value=e,i.appendChild(n)})})["catch"](function(){return i.querySelector("option[placeholder]").text="Default zh-TW"}),r.addEventListener("click",function(){var n,r,s;return n=o.value,n.replace(/\n/,","),r=new SpeechSynthesisUtterance(n),(s=e[i.value])&&(r.voice=s),r.rate=t?.4:1.2,null==r.voice&&(r.lang="zh-TW"),window.speechSynthesis.speak(r)})):void 0}),window.addEventListener("unload",function(){return window.speechSynthesis.cancel()})}.call(this);