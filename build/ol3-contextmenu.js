(function(e,t){"use strict";this.ContextMenu=function(){var o=function(e){var t={width:150,default_items:!0};this.options=n.mergeOptions(t,e),this.$html=new o.Html(this),this.container=this.$html.container,this.$internal=new o.Internal(this),ol.control.Control.call(this,{element:this.container})};return ol.inherits(o,ol.control.Control),o.prototype.clear=function(){n.removeAllChildren(this.container)},o.prototype.extend=function(e){n.assert(Array.isArray(e),"@param `arr` should be an Array."),e.forEach(this.push,this)},o.prototype.push=function(e){n.assert(n.isDefAndNotNull(e),"@param `item` must be informed."),this.$html.addMenuEntry(e,this.$internal.getNextItemIndex())},o.prototype.pop=function(){var e=this.container.lastChild;e&&this.container.removeChild(e)},o.prototype.setMap=function(e){ol.control.Control.prototype.setMap.call(this,e),this.$internal.init(e)},function(){o.Internal=function(e){this.map=void 0,this.container=e.container,this.$html=e.$html,this.coordinate_clicked=void 0},o.Internal.prototype={init:function(e){this.map=e,this.setListeners(),this.$html.createMenu()},getCoordinateClicked:function(){return this.coordinate_clicked},openMenu:function(e){var t=this.map.getSize(),i=[this.container.offsetWidth,this.container.offsetHeight],o=t[0],r=t[1],a=i[0],s=i[1],l=r-e[1],c=o-e[0],u=l>=s?e[1]-10:e[1]-s-10,d=c>=a?e[0]+5:e[0]-a-5;n.removeClass(this.container,"hidden"),this.container.style.left=d+"px",this.container.style.top=u+"px"},closeMenu:function(){n.addClass(this.container,"hidden")},getNextItemIndex:function(){return Object.keys(o.items).length},setListeners:function(){var e=this,t=this.map,n=t.getTargetElement(),r=function(i){i.stopPropagation(),i.preventDefault(),e.openMenu(t.getEventPixel(i)),e.coordinate_clicked=t.getEventCoordinate(i),n.addEventListener("mousedown",{handleEvent:function(t){e.closeMenu(),n.removeEventListener(t.type,this,!1)}},!1)};n.addEventListener("contextmenu",r,!1),i.subscribe(o.Constants.eventType.ADD_MENU_ENTRY,function(t){e.setItemListener(t.element,t.index)})},setItemListener:function(e,t){var n=this;e&&"function"==typeof o.items[t].callback&&!function(t){e.addEventListener("click",function(e){e.preventDefault();var i={coordinate:n.getCoordinateClicked()};n.closeMenu(),t.call(void 0,i,n.map)},!1)}(o.items[t].callback)}},o.items={},o.defaultItems=[{text:"Zoom In",classname:"zoom-in ol-contextmenu-icon",callback:function(e,t){var n=t.getView(),i=ol.animation.pan({duration:1e3,source:n.getCenter()}),o=ol.animation.zoom({duration:1e3,resolution:n.getResolution()});t.beforeRender(i,o),n.setCenter(e.coordinate),n.setZoom(+n.getZoom()+1)}},{text:"Zoom Out",classname:"zoom-out ol-contextmenu-icon",callback:function(e,t){var n=t.getView(),i=ol.animation.pan({duration:1e3,source:n.getCenter()}),o=ol.animation.zoom({duration:1e3,resolution:n.getResolution()});t.beforeRender(i,o),n.setCenter(e.coordinate),n.setZoom(+n.getZoom()-1)}}]}(e,t),function(e,t){o.Html=function(e){this.options=e.options,this.container=this.createContainer()},o.Html.prototype={createContainer:function(){var e=t.createElement("ul");return e.className="ol-contextmenu ol-unselectable hidden",e.style.width=parseInt(this.options.width,10)+"px",e},createMenu:function(){var e=this.options,t=[];return"items"in e?t=e.default_items?e.items.concat(o.defaultItems):e.items:e.default_items&&(t=o.defaultItems),0===t.length?!1:void t.forEach(this.addMenuEntry,this)},addMenuEntry:function(e,t){var r,a="",s="";"string"==typeof e?"-"==e.trim()&&(s='<li class="ol-menu-sep"><hr></li>'):(e.icon&&(e.classname+=" ol-contextmenu-icon",a=' style="background-image:url('+e.icon+')"'),r=e.classname?' class="'+e.classname+'"':"",s='<li id="index'+t+'"'+a+r+">"+e.text+"</li>");var l=n.createFragment(s),c=[].slice.call(l.childNodes,0)[0];this.container.appendChild(l),o.items[t]={id:t,callback:e.callback},i.publish(o.Constants.eventType.ADD_MENU_ENTRY,{index:t,element:c})}}}(e,t),function(){o.Constants={eventType:{ADD_MENU_ENTRY:"add-menu-entry"}}}(e,t),function(e,t){o.Utils={events:function(){var e={},t=e.hasOwnProperty;return{subscribe:function(n,i){t.call(e,n)||(e[n]=[]);var o=e[n].push(i)-1;return{remove:function(){delete e[n][o]}}},publish:function(n,i){t.call(e,n)&&e[n].forEach(function(e){e(void 0!==i?i:{})})}}},whiteSpaceRegex:/\s+/,to3857:function(e){return ol.proj.transform([parseFloat(e[0]),parseFloat(e[1])],"EPSG:4326","EPSG:3857")},to4326:function(e){return ol.proj.transform([parseFloat(e[0]),parseFloat(e[1])],"EPSG:3857","EPSG:4326")},classRegex:function(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")},_addClass:function(e,t){e.classList?e.classList.add(t):e.className=(e.className+" "+t).trim()},addClass:function(e,t){if(Array.isArray(e))return void e.forEach(function(e){n.addClass(e,t)});for(var i=Array.isArray(t)?t:t.split(n.whiteSpaceRegex),o=i.length;o--;)n.hasClass(e,i[o])||n._addClass(e,i[o])},_removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(n.classReg(t)," ").trim()},removeClass:function(e,t){if(Array.isArray(e))return void e.forEach(function(e){n.removeClass(e,t)});for(var i=Array.isArray(t)?t:t.split(n.whiteSpaceRegex),o=i.length;o--;)n.hasClass(e,i[o])&&n._removeClass(e,i[o])},hasClass:function(e,t){return e.classList?e.classList.contains(t):n.classReg(t).test(e.className)},toggleClass:function(e,t){return Array.isArray(e)?void e.forEach(function(e){n.toggleClass(e,t)}):void(e.classList?e.classList.toggle(t):n.hasClass(e,t)?n._removeClass(e,t):n._addClass(e,t))},$:function(e){return e="#"===e[0]?e.substr(1,e.length):e,t.getElementById(e)},isElement:function(t){return"HTMLElement"in e?!!t&&t instanceof HTMLElement:!!t&&"object"==typeof t&&1===t.nodeType&&!!t.nodeName},getAllChildren:function(e,t){return[].slice.call(e.getElementsByTagName(t))},emptyArray:function(e){for(;e.length;)e.pop()},removeAllChildren:function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},removeAll:function(e){for(var t;t=e[0];)t.parentNode.removeChild(t)},getChildren:function(e,t){return[].filter.call(e.childNodes,function(e){return t?1==e.nodeType&&e.tagName.toLowerCase()==t:1==e.nodeType})},template:function(e,t){var n=this;return e.replace(/\{ *([\w_-]+) *\}/g,function(e,i){var o=void 0===t[i]?"":t[i];return n.htmlEscape(o)})},htmlEscape:function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},mergeOptions:function(e,t){var n={};for(var i in e)n[i]=e[i];for(var o in t)n[o]=t[o];return n},createElement:function(e,n){var i;if(Array.isArray(e)){if(i=t.createElement(e[0]),e[1].id&&(i.id=e[1].id),e[1].classname&&(i.className=e[1].classname),e[1].attr){var o=e[1].attr;if(Array.isArray(o))for(var r=-1;++r<o.length;)i.setAttribute(o[r].name,o[r].value);else i.setAttribute(o.name,o.value)}}else i=t.createElement(e);i.innerHTML=n;for(var a=t.createDocumentFragment();i.childNodes[0];)a.appendChild(i.childNodes[0]);return i.appendChild(a),i},createFragment:function(e){var n=t.createDocumentFragment(),i=t.createElement("div");for(i.innerHTML=e;i.firstChild;)n.appendChild(i.firstChild);return n},isDefAndNotNull:function(e){return null!=e},assert:function(e,t){if(!e){if(t=t||"Assertion failed","undefined"!=typeof Error)throw new Error(t);throw t}},assertEqual:function(e,t,n){if(e!=t)throw new Error(n+" mismatch: "+e+" != "+t)}}}(e,t),o}();var n=ContextMenu.Utils,i=n.events()}).call(this,window,document);