!function(t){var n={};function o(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=n,o.d=function(t,n,e){o.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="dist/",o(o.s=2)}([function(t,n,o){"use strict";function e(){PIXI.Container.call(this);var t=this;this.otstup=2,this.content2d=new PIXI.Container,this.addChild(this.content2d),window.debugMenuBlokSet=this,this.w=new PLWindow(this.content2d,0,0,"DebugMenuBlokSet"),this.w.width=250,this.w.height=250,this.w.hasMinimizeButton=!0,this.contentSlid=new PIXI.Container,this.w.content.addChild(this.contentSlid),this.panelBtnL=new PLGalleryBtn(this.w.content,0,0,function(n){if(t.po){var o=n.obj.obj,e=t.po.arraySet.indexOf(o);-1!==e&&(t.po.index=e,visi3D.intRend=1,setTimeout(function(){visi3D.intRend=1},1e3))}}),this.panelBtnL.btnHeight=64,this.panelBtnL.widthBtn=64,this.setBlok=function(n){var o=n.blokKont.po;if(t.po=o,this.panelBtnL.arr=[],o){o.index=o.index||0;for(var e=[],i=0;i<o.arraySet.length;i++)e[i]={},e[i].index=i,e[i].link=o.arraySet[i].link,e[i].link1=o.arraySet[i].link1,e[i].text=o.arraySet[i].name||"no name",e[i].obj=o.arraySet[i];this.panelBtnL.arr=e}};for(var n in this.arrSlid=[],this.arrSlid)this.arrSlid[n].width=this.w.width-2*this.otstup,this.arrSlid[n].idName=n;this.reposition=function(){var t=this.otstup,n=this.otstup;for(var o in this.arrSlid){this.arrSlid[o].position.set(t,n);var e=this.arrSlid[o].height;"PLSliderBig"==this.arrSlid[o].type?e+=18:"PLColor"==this.arrSlid[o].type&&(e+=4),n+=this.otstup+e}this.panelBtnL.width=this.w.width,this.panelBtnL.height=this.w.height},this.reposition()}e.prototype=Object.create(PIXI.Container.prototype),e.prototype.constructor=e},function(t,n,o){"use strict";var e,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=function(){function t(t,n){for(var o=0;o<n.length;o++){var e=n[o];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(n,o,e){return o&&t(n.prototype,o),e&&t(n,e),n}}();var l={x:4,y:5,z:6},a=l.x,s=l.y,u=l.z;console.log(a,s,u);var c={foo:function(){console.log("Привет от Родителя!")}},f=e={foo:function(){(function t(n,o,e){null===n&&(n=Function.prototype);var i=Object.getOwnPropertyDescriptor(n,o);if(void 0===i){var r=Object.getPrototypeOf(n);return null===r?void 0:t(r,o,e)}if("value"in i)return i.value;var l=i.get;return void 0!==l?l.call(e):void 0})(e.__proto__||Object.getPrototypeOf(e),"foo",this).call(this),console.log("Привет от Ребёнка!")}};Object.setPrototypeOf(f,c),f.foo();var h=["di","boo","punkeye"];h.size=3;var d=!0,p=!1,y=void 0;try{for(var v,b=h[Symbol.iterator]();!(d=(v=b.next()).done);d=!0){var w=v.value;console.log(w)}}catch(t){p=!0,y=t}finally{try{!d&&b.return&&b.return()}finally{if(p)throw y}}var S=function(){function t(){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),console.log("Создан экземпляр task!")}return r(t,[{key:"showId",value:function(){console.log(23)}}],[{key:"loadAll",value:function(){console.log("Загружаем все tasks...")}}]),t}();console.log(void 0===S?"undefined":i(S)),(new S).showId(),S.loadAll()},function(t,n,o){"use strict";var e,i=o(1);(e=i)&&e.__esModule,function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);n.default=t}(o(0))}]);