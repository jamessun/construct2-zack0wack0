/** Socket.IO 0.6 - Built with build.js */
/**
 * Socket.IO client
 * 
 * @author Guillermo Rauch <guillermo@learnboost.com>
 * @license The MIT license.
 * @copyright Copyright (c) 2010 LearnBoost <dev@learnboost.com>
 */
this.io={version:"0.6",setPath:function(a){window.console&&console.error&&console.error("io.setPath will be removed. Please set the variable WEB_SOCKET_SWF_LOCATION pointing to WebSocketMain.swf");this.path=/\/$/.test(a)?a:a+"/";WEB_SOCKET_SWF_LOCATION=a+"lib/vendor/web-socket-js/WebSocketMain.swf"}};if("jQuery"in this)jQuery.io=this.io;typeof window!="undefined"&&(WEB_SOCKET_SWF_LOCATION="/socket.io/lib/vendor/web-socket-js/WebSocketMain.swf");
(function(){var a=!1;io.util={ios:!1,load:function(c){if(document.readyState=="complete"||a)return c();"attachEvent"in window?window.attachEvent("onload",c):window.addEventListener("load",c,!1)},inherit:function(a,b){for(var d in b.prototype)a.prototype[d]=b.prototype[d]},indexOf:function(a,b,d){for(var e=a.length,d=d<0?Math.max(0,e+d):d||0;d<e;d++)if(a[d]===b)return d;return-1},isArray:function(a){return Object.prototype.toString.call(a)==="[object Array]"},merge:function(a,b){for(var d in b)b.hasOwnProperty(d)&&
(a[d]=b[d])}};io.util.ios=/iphone|ipad/i.test(navigator.userAgent);io.util.android=/android/i.test(navigator.userAgent);io.util.opera=/opera/i.test(navigator.userAgent);io.util.load(function(){a=!0})})();
(function(){Transport=io.Transport=function(a,c){this.base=a;this.options={timeout:15E3};io.util.merge(this.options,c)};Transport.prototype.send=function(){throw Error("Missing send() implementation");};Transport.prototype.connect=function(){throw Error("Missing connect() implementation");};Transport.prototype.disconnect=function(){throw Error("Missing disconnect() implementation");};Transport.prototype._encode=function(a){for(var c="",b,a=io.util.isArray(a)?a:[a],d=0,e=a.length;d<e;d++)a[d]===null||
a[d]===void 0?b="":(b=a[d],Object.prototype.toString.call(b)=="[object Object]"?"JSON"in window?b="~j~"+JSON.stringify(b):("console"in window&&console.error&&console.error("Trying to encode as JSON, but JSON.stringify is missing."),b='{ "$error": "Invalid message" }'):b=String(b)),c+="~m~"+b.length+"~m~"+b;return c};Transport.prototype._decode=function(a){var c=[],b,d;do{if(a.substr(0,3)!=="~m~")break;a=a.substr(3);b="";for(var e=0,g=a.length;e<g;e++)if(d=Number(a.substr(e,1)),a.substr(e,1)==d)b+=
d;else{a=a.substr(b.length+3);b=Number(b);break}c.push(a.substr(0,b));a=a.substr(b)}while(a!=="");return c};Transport.prototype._onData=function(a){this._setTimeout();if((a=this._decode(a))&&a.length)for(var c=0,b=a.length;c<b;c++)this._onMessage(a[c])};Transport.prototype._setTimeout=function(){var a=this;this._timeout&&clearTimeout(this._timeout);this._timeout=setTimeout(function(){a._onTimeout()},this.options.timeout)};Transport.prototype._onTimeout=function(){this._onDisconnect()};Transport.prototype._onMessage=
function(a){this.sessionid?a.substr(0,3)=="~h~"?this._onHeartbeat(a.substr(3)):a.substr(0,3)=="~j~"?this.base._onMessage(JSON.parse(a.substr(3))):this.base._onMessage(a):(this.sessionid=a,this._onConnect())};Transport.prototype._onHeartbeat=function(a){this.send("~h~"+a)};Transport.prototype._onConnect=function(){this.connected=!0;this.connecting=!1;this.base._onConnect();this._setTimeout()};Transport.prototype._onDisconnect=function(){this.connected=this.connecting=!1;this.sessionid=null;this.base._onDisconnect()};
Transport.prototype._prepareUrl=function(){return(this.base.options.secure?"https":"http")+"://"+this.base.host+":"+this.base.options.port+"/"+this.base.options.resource+"/"+this.type+(this.sessionid?"/"+this.sessionid:"/")}})();
(function(){var a=new Function,c;c="XMLHttpRequest"in window?(new XMLHttpRequest).withCredentials!=void 0:!1;var b=function(a){if("XDomainRequest"in window&&a)return new XDomainRequest;if("XMLHttpRequest"in window&&(!a||c))return new XMLHttpRequest;if(!a){try{return new ActiveXObject("MSXML2.XMLHTTP")}catch(b){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(d){}}return!1},d=io.Transport.XHR=function(){io.Transport.apply(this,arguments);this._sendBuffer=[]};io.util.inherit(d,io.Transport);
d.prototype.connect=function(){this._get();return this};d.prototype._checkSend=function(){if(!this._posting&&this._sendBuffer.length){var a=this._encode(this._sendBuffer);this._sendBuffer=[];this._send(a)}};d.prototype.send=function(a){io.util.isArray(a)?this._sendBuffer.push.apply(this._sendBuffer,a):this._sendBuffer.push(a);this._checkSend();return this};d.prototype._send=function(b){var c=this;this._posting=!0;this._sendXhr=this._request("send","POST");this._sendXhr.onreadystatechange=function(){var b;
if(c._sendXhr.readyState==4){c._sendXhr.onreadystatechange=a;try{b=c._sendXhr.status}catch(d){}c._posting=!1;b==200?c._checkSend():c._onDisconnect()}};this._sendXhr.send("data="+encodeURIComponent(b))};d.prototype.disconnect=function(){this._onDisconnect();return this};d.prototype._onDisconnect=function(){if(this._xhr)this._xhr.onreadystatechange=this._xhr.onload=a,this._xhr.abort(),this._xhr=null;if(this._sendXhr)this._sendXhr.onreadystatechange=this._sendXhr.onload=a,this._sendXhr.abort(),this._sendXhr=
null;this._sendBuffer=[];io.Transport.prototype._onDisconnect.call(this)};d.prototype._request=function(a,c,d){var f=b(this.base._isXDomain());if(d)f.multipart=!0;f.open(c||"GET",this._prepareUrl()+(a?"/"+a:""));c=="POST"&&"setRequestHeader"in f&&f.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=utf-8");return f};d.check=function(a){try{if(b(a))return!0}catch(c){}return!1};d.xdomainCheck=function(){return d.check(!0)};d.request=b})();
(function(){var a=io.Transport.websocket=function(){io.Transport.apply(this,arguments)};io.util.inherit(a,io.Transport);a.prototype.type="websocket";a.prototype.connect=function(){var a=this;this.socket=new WebSocket(this._prepareUrl());this.socket.onmessage=function(b){a._onData(b.data)};this.socket.onclose=function(){a._onClose()};return this};a.prototype.send=function(a){this.socket&&this.socket.send(this._encode(a));return this};a.prototype.disconnect=function(){this.socket&&this.socket.close();
return this};a.prototype._onClose=function(){this._onDisconnect();return this};a.prototype._prepareUrl=function(){return(this.base.options.secure?"wss":"ws")+"://"+this.base.host+":"+this.base.options.port+"/"+this.base.options.resource+"/"+this.type+(this.sessionid?"/"+this.sessionid:"")};a.check=function(){return"WebSocket"in window&&WebSocket.prototype&&WebSocket.prototype.send&&!!WebSocket.prototype.send.toString().match(/native/i)&&typeof WebSocket!=="undefined"};a.xdomainCheck=function(){return!0}})();
(function(){var a=io.Transport.flashsocket=function(){io.Transport.websocket.apply(this,arguments)};io.util.inherit(a,io.Transport.websocket);a.prototype.type="flashsocket";a.prototype.connect=function(){var a=this,b=arguments;WebSocket.__addTask(function(){io.Transport.websocket.prototype.connect.apply(a,b)});return this};a.prototype.send=function(){var a=this,b=arguments;WebSocket.__addTask(function(){io.Transport.websocket.prototype.send.apply(a,b)});return this};a.check=function(){if(typeof WebSocket==
"undefined"||!("__addTask"in WebSocket))return!1;if(io.util.opera)return!1;if("navigator"in window&&"plugins"in navigator&&navigator.plugins["Shockwave Flash"])return!!navigator.plugins["Shockwave Flash"].description;if("ActiveXObject"in window)try{return!!(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}catch(a){}return!1};a.xdomainCheck=function(){return!0}})();
(function(){var a=io.Transport.htmlfile=function(){io.Transport.XHR.apply(this,arguments)};io.util.inherit(a,io.Transport.XHR);a.prototype.type="htmlfile";a.prototype._get=function(){var a=this;this._open();window.attachEvent("onunload",function(){a._destroy()})};a.prototype._open=function(){this._doc=new ActiveXObject("htmlfile");this._doc.open();this._doc.write("<html></html>");this._doc.parentWindow.s=this;this._doc.close();var a=this._doc.createElement("div");this._doc.body.appendChild(a);this._iframe=
this._doc.createElement("iframe");a.appendChild(this._iframe);this._iframe.src=this._prepareUrl()+"/"+ +new Date};a.prototype._=function(a,b){this._onData(a);var d=b.getElementsByTagName("script")[0];d.parentNode.removeChild(d)};a.prototype._destroy=function(){if(this._iframe)this._iframe.src="about:blank",this._doc=null,CollectGarbage()};a.prototype.disconnect=function(){this._destroy();return io.Transport.XHR.prototype.disconnect.call(this)};a.check=function(){if("ActiveXObject"in window)try{return new ActiveXObject("htmlfile")&&
io.Transport.XHR.check()}catch(a){}return!1};a.xdomainCheck=function(){return!1}})();
(function(){var a=io.Transport["xhr-multipart"]=function(){io.Transport.XHR.apply(this,arguments)};io.util.inherit(a,io.Transport.XHR);a.prototype.type="xhr-multipart";a.prototype._get=function(){var a=this;this._xhr=this._request("","GET",!0);this._xhr.onreadystatechange=function(){a._xhr.readyState==3&&a._onData(a._xhr.responseText)};this._xhr.send()};a.check=function(){return"XMLHttpRequest"in window&&"prototype"in XMLHttpRequest&&"multipart"in XMLHttpRequest.prototype};a.xdomainCheck=function(){return!0}})();
(function(){var a=new Function,c=io.Transport["xhr-polling"]=function(){io.Transport.XHR.apply(this,arguments)};io.util.inherit(c,io.Transport.XHR);c.prototype.type="xhr-polling";c.prototype.connect=function(){if(io.util.ios||io.util.android){var a=this;io.util.load(function(){setTimeout(function(){io.Transport.XHR.prototype.connect.call(a)},10)})}else io.Transport.XHR.prototype.connect.call(this)};c.prototype._get=function(){var b=this;this._xhr=this._request(+new Date,"GET");"onload"in this._xhr?
this._xhr.onload=function(){b._onData(this.responseText);b._get()}:this._xhr.onreadystatechange=function(){var c;if(b._xhr.readyState==4){b._xhr.onreadystatechange=a;try{c=b._xhr.status}catch(e){}c==200?(b._onData(b._xhr.responseText),b._get()):b._onDisconnect()}};this._xhr.send()};c.check=function(){return io.Transport.XHR.check()};c.xdomainCheck=function(){return io.Transport.XHR.xdomainCheck()}})();io.JSONP=[];
JSONPPolling=io.Transport["jsonp-polling"]=function(){io.Transport.XHR.apply(this,arguments);this._insertAt=document.getElementsByTagName("script")[0];this._index=io.JSONP.length;io.JSONP.push(this)};io.util.inherit(JSONPPolling,io.Transport["xhr-polling"]);JSONPPolling.prototype.type="jsonp-polling";
JSONPPolling.prototype._send=function(a){function c(){b();d._posting=!1;d._checkSend()}function b(){d._iframe&&d._form.removeChild(d._iframe);try{f=document.createElement('<iframe name="'+d._iframeId+'">')}catch(a){f=document.createElement("iframe"),f.name=d._iframeId}f.id=d._iframeId;d._form.appendChild(f);d._iframe=f}var d=this;if(!("_form"in this)){var e=document.createElement("FORM"),g=document.createElement("TEXTAREA"),l=this._iframeId="socket_io_iframe_"+this._index,f;e.style.position="absolute";
e.style.top="-1000px";e.style.left="-1000px";e.target=l;e.method="POST";e.action=this._prepareUrl()+"/"+ +new Date+"/"+this._index;g.name="data";e.appendChild(g);this._insertAt.parentNode.insertBefore(e,this._insertAt);document.body.appendChild(e);this._form=e;this._area=g}b();this._posting=!0;this._area.value=a;try{this._form.submit()}catch(r){}this._iframe.attachEvent?f.onreadystatechange=function(){d._iframe.readyState=="complete"&&c()}:this._iframe.onload=c};
JSONPPolling.prototype._get=function(){var a=this,c=document.createElement("SCRIPT");if(this._script)this._script.parentNode.removeChild(this._script),this._script=null;c.async=!0;c.src=this._prepareUrl()+"/"+ +new Date+"/"+this._index;c.onerror=function(){a._onDisconnect()};this._insertAt.parentNode.insertBefore(c,this._insertAt);this._script=c};JSONPPolling.prototype._=function(){this._onData.apply(this,arguments);this._get();return this};JSONPPolling.check=function(){return!0};
JSONPPolling.xdomainCheck=function(){return!0};
(function(){var a=io.Socket=function(a,b){this.host=a||document.domain;this.options={secure:!1,document:document,port:document.location.port||80,resource:"socket.io",transports:["websocket","flashsocket","htmlfile","xhr-multipart","xhr-polling","jsonp-polling"],transportOptions:{"xhr-polling":{timeout:25E3},"jsonp-polling":{timeout:25E3}},connectTimeout:5E3,tryTransportsOnConnectTimeout:!0,rememberTransport:!0};io.util.merge(this.options,b);this.connecting=this.connected=!1;this._events={};this.transport=
this.getTransport();!this.transport&&"console"in window&&console.error("No transport available")};a.prototype.getTransport=function(a){var b=a||this.options.transports;if(this.options.rememberTransport&&!a&&(a=this.options.document.cookie.match("(?:^|;)\\s*socketio=([^;]*)")))this._rememberedTransport=!0,b=[decodeURIComponent(a[1])];for(var a=0,d;d=b[a];a++)if(io.Transport[d]&&io.Transport[d].check()&&(!this._isXDomain()||io.Transport[d].xdomainCheck()))return new io.Transport[d](this,this.options.transportOptions[d]||
{});return null};a.prototype.connect=function(){if(this.transport&&!this.connected&&(this.connecting&&this.disconnect(),this.connecting=!0,this.transport.connect(),this.options.connectTimeout)){var a=this;setTimeout(function(){if(!a.connected&&(a.disconnect(),a.options.tryTransportsOnConnectTimeout&&!a._rememberedTransport)){for(var b=[],d=a.options.transports,e=0,g;g=d[e];e++)g!=a.transport.type&&b.push(g);if(b.length)a.transport=a.getTransport(b),a.connect()}},this.options.connectTimeout)}return this};
a.prototype.send=function(a){if(!this.transport||!this.transport.connected)return this._queue(a);this.transport.send(a);return this};a.prototype.disconnect=function(){this.transport.disconnect();return this};a.prototype.on=function(a,b){a in this._events||(this._events[a]=[]);this._events[a].push(b);return this};a.prototype.fire=function(a,b){if(a in this._events)for(var d=0,e=this._events[a].length;d<e;d++)this._events[a][d].apply(this,b===void 0?[]:b);return this};a.prototype.removeEvent=function(a,
b){if(a in this._events)for(var d=0,e=this._events[a].length;d<e;d++)this._events[a][d]==b&&this._events[a].splice(d,1);return this};a.prototype._queue=function(a){if(!("_queueStack"in this))this._queueStack=[];this._queueStack.push(a);return this};a.prototype._doQueue=function(){if(!("_queueStack"in this)||!this._queueStack.length)return this;this.transport.send(this._queueStack);this._queueStack=[];return this};a.prototype._isXDomain=function(){return this.host!==document.domain};a.prototype._onConnect=
function(){this.connected=!0;this.connecting=!1;this._doQueue();if(this.options.rememberTransport)this.options.document.cookie="socketio="+encodeURIComponent(this.transport.type);this.fire("connect")};a.prototype._onMessage=function(a){this.fire("message",[a])};a.prototype._onDisconnect=function(){var a=this.connected;this.connecting=this.connected=!1;this._queueStack=[];a&&this.fire("disconnect")};a.prototype.addListener=a.prototype.addEvent=a.prototype.addEventListener=a.prototype.on})();
var swfobject=function(){function a(){if(!w){try{var a=i.getElementsByTagName("body")[0].appendChild(i.createElement("span"));a.parentNode.removeChild(a)}catch(b){return}w=!0;for(var a=A.length,c=0;c<a;c++)A[c]()}}function c(a){w?a():A[A.length]=a}function b(a){if(typeof n.addEventListener!=j)n.addEventListener("load",a,!1);else if(typeof i.addEventListener!=j)i.addEventListener("load",a,!1);else if(typeof n.attachEvent!=j)Q(n,"onload",a);else if(typeof n.onload=="function"){var b=n.onload;n.onload=
function(){b();a()}}else n.onload=a}function d(){var a=i.getElementsByTagName("body")[0],b=i.createElement(s);b.setAttribute("type",B);var c=a.appendChild(b);if(c){var d=0;(function(){if(typeof c.GetVariable!=j){var f=c.GetVariable("$version");if(f)f=f.split(" ")[1].split(","),h.pv=[parseInt(f[0],10),parseInt(f[1],10),parseInt(f[2],10)]}else if(d<10){d++;setTimeout(arguments.callee,10);return}a.removeChild(b);c=null;e()})()}else e()}function e(){var a=t.length;if(a>0)for(var b=0;b<a;b++){var c=t[b].id,
d=t[b].callbackFn,e={success:!1,id:c};if(h.pv[0]>0){var i=o(c);if(i)if(C(t[b].swfVersion)&&!(h.wk&&h.wk<312)){if(x(c,!0),d)e.success=!0,e.ref=g(c),d(e)}else if(t[b].expressInstall&&l()){e={};e.data=t[b].expressInstall;e.width=i.getAttribute("width")||"0";e.height=i.getAttribute("height")||"0";if(i.getAttribute("class"))e.styleclass=i.getAttribute("class");if(i.getAttribute("align"))e.align=i.getAttribute("align");for(var I={},i=i.getElementsByTagName("param"),m=i.length,k=0;k<m;k++)i[k].getAttribute("name").toLowerCase()!=
"movie"&&(I[i[k].getAttribute("name")]=i[k].getAttribute("value"));f(e,I,c,d)}else r(i),d&&d(e)}else if(x(c,!0),d){if((c=g(c))&&typeof c.SetVariable!=j)e.success=!0,e.ref=c;d(e)}}}function g(a){var b=null;if((a=o(a))&&a.nodeName=="OBJECT")typeof a.SetVariable!=j?b=a:(a=a.getElementsByTagName(s)[0])&&(b=a);return b}function l(){return!D&&C("6.0.65")&&(h.win||h.mac)&&!(h.wk&&h.wk<312)}function f(a,b,c,d){D=!0;G=d||null;J={success:!1,id:c};var e=o(c);if(e){e.nodeName=="OBJECT"?(z=q(e),E=null):(z=e,E=
c);a.id=K;if(typeof a.width==j||!/%$/.test(a.width)&&parseInt(a.width,10)<310)a.width="310";if(typeof a.height==j||!/%$/.test(a.height)&&parseInt(a.height,10)<137)a.height="137";i.title=i.title.slice(0,47)+" - Flash Player Installation";d=h.ie&&h.win?"ActiveX":"PlugIn";d="MMredirectURL="+n.location.toString().replace(/&/g,"%26")+"&MMplayerType="+d+"&MMdoctitle="+i.title;typeof b.flashvars!=j?b.flashvars+="&"+d:b.flashvars=d;if(h.ie&&h.win&&e.readyState!=4)d=i.createElement("div"),c+="SWFObjectNew",
d.setAttribute("id",c),e.parentNode.insertBefore(d,e),e.style.display="none",function(){e.readyState==4?e.parentNode.removeChild(e):setTimeout(arguments.callee,10)}();u(a,b,c)}}function r(a){if(h.ie&&h.win&&a.readyState!=4){var b=i.createElement("div");a.parentNode.insertBefore(b,a);b.parentNode.replaceChild(q(a),b);a.style.display="none";(function(){a.readyState==4?a.parentNode.removeChild(a):setTimeout(arguments.callee,10)})()}else a.parentNode.replaceChild(q(a),a)}function q(a){var b=i.createElement("div");
if(h.win&&h.ie)b.innerHTML=a.innerHTML;else if(a=a.getElementsByTagName(s)[0])if(a=a.childNodes)for(var c=a.length,d=0;d<c;d++)!(a[d].nodeType==1&&a[d].nodeName=="PARAM")&&a[d].nodeType!=8&&b.appendChild(a[d].cloneNode(!0));return b}function u(a,b,c){var d,e=o(c);if(h.wk&&h.wk<312)return d;if(e){if(typeof a.id==j)a.id=c;if(h.ie&&h.win){var f="",g;for(g in a)if(a[g]!=Object.prototype[g])g.toLowerCase()=="data"?b.movie=a[g]:g.toLowerCase()=="styleclass"?f+=' class="'+a[g]+'"':g.toLowerCase()!="classid"&&
(f+=" "+g+'="'+a[g]+'"');g="";for(var m in b)b[m]!=Object.prototype[m]&&(g+='<param name="'+m+'" value="'+b[m]+'" />');e.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+f+">"+g+"</object>";F[F.length]=a.id;d=o(a.id)}else{m=i.createElement(s);m.setAttribute("type",B);for(var k in a)a[k]!=Object.prototype[k]&&(k.toLowerCase()=="styleclass"?m.setAttribute("class",a[k]):k.toLowerCase()!="classid"&&m.setAttribute(k,a[k]));for(f in b)b[f]!=Object.prototype[f]&&f.toLowerCase()!=
"movie"&&(a=m,g=f,k=b[f],c=i.createElement("param"),c.setAttribute("name",g),c.setAttribute("value",k),a.appendChild(c));e.parentNode.replaceChild(m,e);d=m}}return d}function L(a){var b=o(a);if(b&&b.nodeName=="OBJECT")h.ie&&h.win?(b.style.display="none",function(){if(b.readyState==4){var c=o(a);if(c){for(var d in c)typeof c[d]=="function"&&(c[d]=null);c.parentNode.removeChild(c)}}else setTimeout(arguments.callee,10)}()):b.parentNode.removeChild(b)}function o(a){var b=null;try{b=i.getElementById(a)}catch(c){}return b}
function Q(a,b,c){a.attachEvent(b,c);y[y.length]=[a,b,c]}function C(a){var b=h.pv,a=a.split(".");a[0]=parseInt(a[0],10);a[1]=parseInt(a[1],10)||0;a[2]=parseInt(a[2],10)||0;return b[0]>a[0]||b[0]==a[0]&&b[1]>a[1]||b[0]==a[0]&&b[1]==a[1]&&b[2]>=a[2]?!0:!1}function M(a,b,c,d){if(!h.ie||!h.mac){var e=i.getElementsByTagName("head")[0];if(e){c=c&&typeof c=="string"?c:"screen";d&&(H=p=null);if(!p||H!=c)d=i.createElement("style"),d.setAttribute("type","text/css"),d.setAttribute("media",c),p=e.appendChild(d),
h.ie&&h.win&&typeof i.styleSheets!=j&&i.styleSheets.length>0&&(p=i.styleSheets[i.styleSheets.length-1]),H=c;h.ie&&h.win?p&&typeof p.addRule==s&&p.addRule(a,b):p&&typeof i.createTextNode!=j&&p.appendChild(i.createTextNode(a+" {"+b+"}"))}}}function x(a,b){if(N){var c=b?"visible":"hidden";w&&o(a)?o(a).style.visibility=c:M("#"+a,"visibility:"+c)}}function O(a){return/[\\\"<>\.;]/.exec(a)!=null&&typeof encodeURIComponent!=j?encodeURIComponent(a):a}var j="undefined",s="object",B="application/x-shockwave-flash",
K="SWFObjectExprInst",n=window,i=document,v=navigator,P=!1,A=[function(){P?d():e()}],t=[],F=[],y=[],z,E,G,J,w=!1,D=!1,p,H,N=!0,h=function(){var a=typeof i.getElementById!=j&&typeof i.getElementsByTagName!=j&&typeof i.createElement!=j,b=v.userAgent.toLowerCase(),c=v.platform.toLowerCase(),d=c?/win/.test(c):/win/.test(b),c=c?/mac/.test(c):/mac/.test(b),b=/webkit/.test(b)?parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,e=!+"\u000b1",f=[0,0,0],g=null;if(typeof v.plugins!=j&&typeof v.plugins["Shockwave Flash"]==
s){if((g=v.plugins["Shockwave Flash"].description)&&!(typeof v.mimeTypes!=j&&v.mimeTypes[B]&&!v.mimeTypes[B].enabledPlugin))P=!0,e=!1,g=g.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),f[0]=parseInt(g.replace(/^(.*)\..*$/,"$1"),10),f[1]=parseInt(g.replace(/^.*\.(.*)\s.*$/,"$1"),10),f[2]=/[a-zA-Z]/.test(g)?parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}else if(typeof n.ActiveXObject!=j)try{var h=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(h&&(g=h.GetVariable("$version")))e=!0,g=g.split(" ")[1].split(","),
f=[parseInt(g[0],10),parseInt(g[1],10),parseInt(g[2],10)]}catch(k){}return{w3:a,pv:f,wk:b,ie:e,win:d,mac:c}}();(function(){h.w3&&((typeof i.readyState!=j&&i.readyState=="complete"||typeof i.readyState==j&&(i.getElementsByTagName("body")[0]||i.body))&&a(),w||(typeof i.addEventListener!=j&&i.addEventListener("DOMContentLoaded",a,!1),h.ie&&h.win&&(i.attachEvent("onreadystatechange",function(){i.readyState=="complete"&&(i.detachEvent("onreadystatechange",arguments.callee),a())}),n==top&&function(){if(!w){try{i.documentElement.doScroll("left")}catch(b){setTimeout(arguments.callee,
0);return}a()}}()),h.wk&&function(){w||(/loaded|complete/.test(i.readyState)?a():setTimeout(arguments.callee,0))}(),b(a)))})();(function(){h.ie&&h.win&&window.attachEvent("onunload",function(){for(var a=y.length,b=0;b<a;b++)y[b][0].detachEvent(y[b][1],y[b][2]);a=F.length;for(b=0;b<a;b++)L(F[b]);for(var c in h)h[c]=null;h=null;for(var d in swfobject)swfobject[d]=null;swfobject=null})})();return{registerObject:function(a,b,c,d){if(h.w3&&a&&b){var e={};e.id=a;e.swfVersion=b;e.expressInstall=c;e.callbackFn=
d;t[t.length]=e;x(a,!1)}else d&&d({success:!1,id:a})},getObjectById:function(a){if(h.w3)return g(a)},embedSWF:function(a,b,d,e,g,i,r,m,k,n){var o={success:!1,id:b};h.w3&&!(h.wk&&h.wk<312)&&a&&b&&d&&e&&g?(x(b,!1),c(function(){d+="";e+="";var c={};if(k&&typeof k===s)for(var h in k)c[h]=k[h];c.data=a;c.width=d;c.height=e;h={};if(m&&typeof m===s)for(var q in m)h[q]=m[q];if(r&&typeof r===s)for(var p in r)typeof h.flashvars!=j?h.flashvars+="&"+p+"="+r[p]:h.flashvars=p+"="+r[p];if(C(g))q=u(c,h,b),c.id==
b&&x(b,!0),o.success=!0,o.ref=q;else if(i&&l()){c.data=i;f(c,h,b,n);return}else x(b,!0);n&&n(o)})):n&&n(o)},switchOffAutoHideShow:function(){N=!1},ua:h,getFlashPlayerVersion:function(){return{major:h.pv[0],minor:h.pv[1],release:h.pv[2]}},hasFlashPlayerVersion:C,createSWF:function(a,b,c){if(h.w3)return u(a,b,c)},showExpressInstall:function(a,b,c,d){h.w3&&l()&&f(a,b,c,d)},removeSWF:function(a){h.w3&&L(a)},createCSS:function(a,b,c,d){h.w3&&M(a,b,c,d)},addDomLoadEvent:c,addLoadEvent:b,getQueryParamValue:function(a){var b=
i.location.search||i.location.hash;if(b){/\?/.test(b)&&(b=b.split("?")[1]);if(a==null)return O(b);for(var b=b.split("&"),c=0;c<b.length;c++)if(b[c].substring(0,b[c].indexOf("="))==a)return O(b[c].substring(b[c].indexOf("=")+1))}return""},expressInstallCallback:function(){if(D){var a=o(K);if(a&&z){a.parentNode.replaceChild(z,a);if(E&&(x(E,!0),h.ie&&h.win))z.style.display="block";G&&G(J)}D=!1}}}}();
function FABridge(a,c){this.target=a;this.remoteTypeCache={};this.remoteInstanceCache={};this.remoteFunctionCache={};this.localFunctionCache={};this.bridgeID=FABridge.nextBridgeID++;this.name=c;this.nextLocalFuncID=0;FABridge.instances[this.name]=this;FABridge.idMap[this.bridgeID]=this;return this}FABridge.TYPE_ASINSTANCE=1;FABridge.TYPE_ASFUNCTION=2;FABridge.TYPE_JSFUNCTION=3;FABridge.TYPE_ANONYMOUS=4;FABridge.initCallbacks={};FABridge.userTypes={};
FABridge.addToUserTypes=function(){for(var a=0;a<arguments.length;a++)FABridge.userTypes[arguments[a]]={typeName:arguments[a],enriched:!1}};FABridge.argsToArray=function(a){for(var c=[],b=0;b<a.length;b++)c[b]=a[b];return c};function instanceFactory(a){this.fb_instance_id=a;return this}function FABridge__invokeJSFunction(a){var c=a[0],a=a.concat();a.shift();return FABridge.extractBridgeFromID(c).invokeLocalFunction(c,a)}
FABridge.addInitializationCallback=function(a,c){var b=FABridge.instances[a];b!=void 0?c.call(b):(b=FABridge.initCallbacks[a],b==null&&(FABridge.initCallbacks[a]=b=[]),b.push(c))};
function FABridge__bridgeInitialized(a){var c=document.getElementsByTagName("object"),b=c.length,d=[];if(b>0)for(var e=0;e<b;e++)typeof c[e].SetVariable!="undefined"&&(d[d.length]=c[e]);b=document.getElementsByTagName("embed");e=b.length;c=[];if(e>0)for(var g=0;g<e;g++)typeof b[g].SetVariable!="undefined"&&(c[c.length]=b[g]);g=d.length;b=c.length;e="bridgeName="+a;if(g==1&&!b||g==1&&b==1)FABridge.attachBridge(d[0],a);else if(b==1&&!g)FABridge.attachBridge(c[0],a);else{var l=!1;if(g>1)for(var f=0;f<
g;f++){for(var r=d[f].childNodes,q=0;q<r.length;q++){var u=r[q];if(u.nodeType==1&&u.tagName.toLowerCase()=="param"&&u.name.toLowerCase()=="flashvars"&&u.value.indexOf(e)>=0){FABridge.attachBridge(d[f],a);l=!0;break}}if(l)break}if(!l&&b>1)for(d=0;d<b;d++)if(c[d].attributes.getNamedItem("flashVars").nodeValue.indexOf(e)>=0){FABridge.attachBridge(c[d],a);break}}return!0}FABridge.nextBridgeID=0;FABridge.instances={};FABridge.idMap={};FABridge.refCount=0;
FABridge.extractBridgeFromID=function(a){return FABridge.idMap[a>>16]};FABridge.attachBridge=function(a,c){var b=new FABridge(a,c);FABridge[c]=b;var d=FABridge.initCallbacks[c];if(d!=null){for(var e=0;e<d.length;e++)d[e].call(b);delete FABridge.initCallbacks[c]}};FABridge.blockedMethods={toString:!0,get:!0,set:!0,call:!0};
FABridge.prototype={root:function(){return this.deserialize(this.target.getRoot())},releaseASObjects:function(){return this.target.releaseASObjects()},releaseNamedASObject:function(a){return typeof a!="object"?!1:this.target.releaseNamedASObject(a.fb_instance_id)},create:function(a){return this.deserialize(this.target.create(a))},makeID:function(a){return(this.bridgeID<<16)+a},getPropertyFromAS:function(a,c){if(FABridge.refCount>0)throw Error("You are trying to call recursively into the Flash Player which is not allowed. In most cases the JavaScript setTimeout function, can be used as a workaround.");
else return FABridge.refCount++,retVal=this.target.getPropFromAS(a,c),retVal=this.handleError(retVal),FABridge.refCount--,retVal},setPropertyInAS:function(a,c,b){if(FABridge.refCount>0)throw Error("You are trying to call recursively into the Flash Player which is not allowed. In most cases the JavaScript setTimeout function, can be used as a workaround.");else return FABridge.refCount++,retVal=this.target.setPropInAS(a,c,this.serialize(b)),retVal=this.handleError(retVal),FABridge.refCount--,retVal},
callASFunction:function(a,c){if(FABridge.refCount>0)throw Error("You are trying to call recursively into the Flash Player which is not allowed. In most cases the JavaScript setTimeout function, can be used as a workaround.");else return FABridge.refCount++,retVal=this.target.invokeASFunction(a,this.serialize(c)),retVal=this.handleError(retVal),FABridge.refCount--,retVal},callASMethod:function(a,c,b){if(FABridge.refCount>0)throw Error("You are trying to call recursively into the Flash Player which is not allowed. In most cases the JavaScript setTimeout function, can be used as a workaround.");
else return FABridge.refCount++,b=this.serialize(b),retVal=this.target.invokeASMethod(a,c,b),retVal=this.handleError(retVal),FABridge.refCount--,retVal},invokeLocalFunction:function(a,c){var b,d=this.localFunctionCache[a];d!=void 0&&(b=this.serialize(d.apply(null,this.deserialize(c))));return b},getTypeFromName:function(a){return this.remoteTypeCache[a]},createProxy:function(a,c){var b=this.getTypeFromName(c);instanceFactory.prototype=b;b=new instanceFactory(a);return this.remoteInstanceCache[a]=
b},getProxy:function(a){return this.remoteInstanceCache[a]},addTypeDataToCache:function(a){for(var c=new ASProxy(this,a.name),b=a.accessors,d=0;d<b.length;d++)this.addPropertyToType(c,b[d]);a=a.methods;for(d=0;d<a.length;d++)FABridge.blockedMethods[a[d]]==void 0&&this.addMethodToType(c,a[d]);return this.remoteTypeCache[c.typeName]=c},addPropertyToType:function(a,c){var b=c.charAt(0),d;b>="a"&&b<="z"?(d="get"+b.toUpperCase()+c.substr(1),b="set"+b.toUpperCase()+c.substr(1)):(d="get"+c,b="set"+c);a[b]=
function(a){this.bridge.setPropertyInAS(this.fb_instance_id,c,a)};a[d]=function(){return this.bridge.deserialize(this.bridge.getPropertyFromAS(this.fb_instance_id,c))}},addMethodToType:function(a,c){a[c]=function(){return this.bridge.deserialize(this.bridge.callASMethod(this.fb_instance_id,c,FABridge.argsToArray(arguments)))}},getFunctionProxy:function(a){var c=this;this.remoteFunctionCache[a]==null&&(this.remoteFunctionCache[a]=function(){c.callASFunction(a,FABridge.argsToArray(arguments))});return this.remoteFunctionCache[a]},
getFunctionID:function(a){if(a.__bridge_id__==void 0)a.__bridge_id__=this.makeID(this.nextLocalFuncID++),this.localFunctionCache[a.__bridge_id__]=a;return a.__bridge_id__},serialize:function(a){var c={},b=typeof a;if(b=="number"||b=="string"||b=="boolean"||b==null||b==void 0)c=a;else if(a instanceof Array){c=[];for(b=0;b<a.length;b++)c[b]=this.serialize(a[b])}else b=="function"?(c.type=FABridge.TYPE_JSFUNCTION,c.value=this.getFunctionID(a)):a instanceof ASProxy?(c.type=FABridge.TYPE_ASINSTANCE,c.value=
a.fb_instance_id):(c.type=FABridge.TYPE_ANONYMOUS,c.value=a);return c},deserialize:function(a){var c,b=typeof a;if(b=="number"||b=="string"||b=="boolean"||a==null||a==void 0)c=this.handleError(a);else if(a instanceof Array){c=[];for(b=0;b<a.length;b++)c[b]=this.deserialize(a[b])}else if(b=="object"){for(b=0;b<a.newTypes.length;b++)this.addTypeDataToCache(a.newTypes[b]);for(var d in a.newRefs)this.createProxy(d,a.newRefs[d]);if(a.type==FABridge.TYPE_PRIMITIVE)c=a.value;else if(a.type==FABridge.TYPE_ASFUNCTION)c=
this.getFunctionProxy(a.value);else if(a.type==FABridge.TYPE_ASINSTANCE)c=this.getProxy(a.value);else if(a.type==FABridge.TYPE_ANONYMOUS)c=a.value}return c},addRef:function(a){this.target.incRef(a.fb_instance_id)},release:function(a){this.target.releaseRef(a.fb_instance_id)},handleError:function(a){if(typeof a=="string"&&a.indexOf("__FLASHERROR")==0)throw a=a.split("||"),FABridge.refCount>0&&FABridge.refCount--,Error(a[1]);return a}};ASProxy=function(a,c){this.bridge=a;this.typeName=c;return this};
ASProxy.prototype={get:function(a){return this.bridge.deserialize(this.bridge.getPropertyFromAS(this.fb_instance_id,a))},set:function(a,c){this.bridge.setPropertyInAS(this.fb_instance_id,a,c)},call:function(a,c){this.bridge.callASMethod(this.fb_instance_id,a,c)},addRef:function(){this.bridge.addRef(this)},release:function(){this.bridge.release(this)}};
(function(){function a(){}if(!window.WebSocket){var c=window.console;c||(c={log:function(){},error:function(){}});swfobject.hasFlashPlayerVersion("9.0.0")?(location.protocol=="file:"&&c.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."),WebSocket=function(a,c,e,g,l){var f=this;f.readyState=WebSocket.CONNECTING;f.bufferedAmount=0;setTimeout(function(){WebSocket.__addTask(function(){f.__createFlash(a,
c,e,g,l)})},1)},WebSocket.prototype.__createFlash=function(a,d,e,g,l){var f=this;f.__flash=WebSocket.__flash.create(a,d,e||null,g||0,l||null);f.__flash.addEventListener("open",function(){try{f.readyState=f.__flash.getReadyState();f.__timer&&clearInterval(f.__timer);if(window.opera)f.__timer=setInterval(function(){f.__handleMessages()},500);if(f.onopen)f.onopen()}catch(a){c.error(a.toString())}});f.__flash.addEventListener("close",function(){try{if(f.readyState=f.__flash.getReadyState(),f.__timer&&
clearInterval(f.__timer),f.onclose)f.onclose()}catch(a){c.error(a.toString())}});f.__flash.addEventListener("message",function(){try{f.__handleMessages()}catch(a){c.error(a.toString())}});f.__flash.addEventListener("error",function(){try{if(f.__timer&&clearInterval(f.__timer),f.onerror)f.onerror()}catch(a){c.error(a.toString())}});f.__flash.addEventListener("stateChange",function(a){try{f.readyState=f.__flash.getReadyState(),f.bufferedAmount=a.getBufferedAmount()}catch(b){c.error(b.toString())}})},
WebSocket.prototype.send=function(a){if(this.__flash)this.readyState=this.__flash.getReadyState();if(!this.__flash||this.readyState==WebSocket.CONNECTING)throw"INVALID_STATE_ERR: Web Socket connection has not been established";a=this.__flash.send(encodeURIComponent(a));return a<0?!0:(this.bufferedAmount=a,!1)},WebSocket.prototype.close=function(){if(this.__flash&&(this.readyState=this.__flash.getReadyState(),!(this.readyState==WebSocket.CLOSED||this.readyState==WebSocket.CLOSING)))this.__flash.close(),
this.readyState=WebSocket.CLOSED,this.__timer&&clearInterval(this.__timer),this.onclose&&setTimeout(this.onclose,1)},WebSocket.prototype.addEventListener=function(a,c){if(!("__events"in this))this.__events={};if(!(a in this.__events)&&(this.__events[a]=[],"function"==typeof this["on"+a]))this.__events[a].defaultHandler=this["on"+a],this["on"+a]=this.__createEventHandler(this,a);this.__events[a].push(c)},WebSocket.prototype.removeEventListener=function(a,c){if(!("__events"in this))this.__events={};
if(a in this.__events)for(var e=this.__events.length;e>-1;--e)if(c===this.__events[a][e]){this.__events[a].splice(e,1);break}},WebSocket.prototype.dispatchEvent=function(a){if(!("__events"in this))throw"UNSPECIFIED_EVENT_TYPE_ERR";if(!(a.type in this.__events))throw"UNSPECIFIED_EVENT_TYPE_ERR";for(var c=0,e=this.__events[a.type].length;c<e;++c)if(this.__events[a.type][c](a),a.cancelBubble)break;!1!==a.returnValue&&"function"==typeof this.__events[a.type].defaultHandler&&this.__events[a.type].defaultHandler(a)},
WebSocket.prototype.__handleMessages=function(){for(var a=this.__flash.readSocketData(),d=0;d<a.length;d++){var e=decodeURIComponent(a[d]);try{if(this.onmessage){var g;window.MessageEvent?(g=document.createEvent("MessageEvent"),g.initMessageEvent("message",!1,!1,e,null,null,window,null)):g={data:e};this.onmessage(g)}}catch(l){c.error(l.toString())}}},WebSocket.prototype.__createEventHandler=function(b,c){return function(e){var g=new a;g.initEvent(c,!0,!0);g.target=g.currentTarget=b;for(var l in e)g[l]=
e[l];b.dispatchEvent(g,arguments)}},a.prototype.cancelable=!0,a.prototype.cancelBubble=!1,a.prototype.preventDefault=function(){if(this.cancelable)this.returnValue=!1},a.prototype.stopPropagation=function(){this.cancelBubble=!0},a.prototype.initEvent=function(a,c,e){this.type=a;this.cancelable=e;this.timeStamp=new Date},WebSocket.CONNECTING=0,WebSocket.OPEN=1,WebSocket.CLOSING=2,WebSocket.CLOSED=3,WebSocket.__tasks=[],WebSocket.__initialize=function(){if(WebSocket.__swfLocation)window.WEB_SOCKET_SWF_LOCATION=
WebSocket.__swfLocation;if(window.WEB_SOCKET_SWF_LOCATION){var a=document.createElement("div");a.id="webSocketContainer";a.style.position="absolute";WebSocket.__isFlashLite()?(a.style.left="0px",a.style.top="0px"):(a.style.left="-100px",a.style.top="-100px");var d=document.createElement("div");d.id="webSocketFlash";a.appendChild(d);document.body.appendChild(a);swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION,"webSocketFlash","1","1","9.0.0",null,{bridgeName:"webSocket"},{hasPriority:!0,allowScriptAccess:"always"},
null,function(a){a.success||c.error("[WebSocket] swfobject.embedSWF failed")});FABridge.addInitializationCallback("webSocket",function(){try{WebSocket.__flash=FABridge.webSocket.root();WebSocket.__flash.setCallerUrl(location.href);WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);for(var a=0;a<WebSocket.__tasks.length;++a)WebSocket.__tasks[a]();WebSocket.__tasks=[]}catch(b){c.error("[WebSocket] "+b.toString())}})}else c.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf")},
WebSocket.__addTask=function(a){WebSocket.__flash?a():WebSocket.__tasks.push(a)},WebSocket.__isFlashLite=function(){if(!window.navigator||!window.navigator.mimeTypes)return!1;var a=window.navigator.mimeTypes["application/x-shockwave-flash"];if(!a||!a.enabledPlugin||!a.enabledPlugin.filename)return!1;return a.enabledPlugin.filename.match(/flashlite/i)?!0:!1},window.webSocketLog=function(a){c.log(decodeURIComponent(a))},window.webSocketError=function(a){c.error(decodeURIComponent(a))},window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION||
(window.addEventListener?window.addEventListener("load",WebSocket.__initialize,!1):window.attachEvent("onload",WebSocket.__initialize))):c.error("Flash Player is not installed.")}})();


// ECMAScript 5 strict mode
"use strict";

//Socket plugin
assert2(cr,"cr namespace not created");
assert2(cr.plugins,"cr.plugins not created");

cr.plugins_.Socket = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.Socket.prototype;

	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;
	typeProto.onCreate = function()
	{
	};

	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		this.dataStack = [];
		this.lastAddress = "";
		this.lastPort = 80;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function()
	{
	};
	instanceProto.send = function(data)
	{
		var socket = this.socket;
		
		if(typeof(socket) != "undefined")
			socket.send(data);
	};
	instanceProto.disconnect = function()
	{
		var socket = this.socket;
		
		if(typeof(socket) != "undefined")
			socket.disconnect();
	};
	instanceProto.connect = function(host,port)
	{		
		var socket = this.socket;
		
		if(typeof(socket) != "undefined")
			socket.disconnect();
		
		this.lastAddress = host;
		this.lastPort = port;
		
		socket = new io.Socket(host,{port:port,transports:["websocket","flashsocket","xhr-multipart","xhr-polling","json-polling"]});;
		var instance = this;
		var runtime = instance.runtime;
		socket.connect();
		socket.on
		(
			"message",
			function(data)
			{
				instance.dataStack.push(data);
				runtime.trigger(pluginProto.cnds.OnData,instance);
			}
		);
		socket.on
		(
			"connect_failed",
			function(event)
			{
				runtime.trigger(pluginProto.cnds.OnError,instance);
			}
		);
		socket.on
		(
			"connect",
			function(event)
			{
				runtime.trigger(pluginProto.cnds.OnConnect,instance);
			}
		);
		socket.on
		(
			"disconnect",
			function()
			{
				runtime.trigger(pluginProto.cnds.OnDisconnect,instance);
			}
		);
		
		this.socket = socket;
	};

	pluginProto.cnds = {};
	var cnds = pluginProto.cnds;

	cnds["OnConnect"] = function()
	{
		return true;
	};
	cnds["OnDisconnect"] = function()
	{
		return true;
	};
	cnds["OnError"] = function()
	{
		return true;
	};
	cnds["OnData"] = function()
	{
		return true;
	};

	pluginProto.acts = {};
	var acts = pluginProto.acts;

	acts["Connect"] = function(host,port)
	{
		host = host.toString();
		port = port.toString();
		
		this.connect(host,port);
	};
	acts["Send"] = function(data)
	{
		data = data.toString();
		
		this.send(data);
	};
	acts["Disconnect"] = function()
	{
		this.disconnect();
	};

	pluginProto.exps = {};
	var exps = pluginProto.exps;

	exps["LastData"] = function(result)
	{
		var dataStack = this.dataStack;
		var dataLength = dataStack.length;
		
		var data = "";
		if(dataLength > 0)
			data = dataStack.splice(0,1)[0].toString();
		
		result.set_string(data);
	};
	exps["LastPort"] = function(result)
	{
		result.set_string(this.lastPort);
	};
	exps["LastAddress"] = function(result)
	{
		result.set_string(this.lastAddress);
	};

}());
