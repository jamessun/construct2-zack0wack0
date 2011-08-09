// ECMAScript 5 strict mode
"use strict";

//Socket plugin
assert2(cr,"cr namespace not created");
assert2(cr.plugins,"cr.plugins not created");

cr.plugins.Socket = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins.Socket.prototype;

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
		
		if(typeof(WebSocket) == "undefined")
			return alert("Your browser doesn't support WebSocket. You can't run this game, sorry.");
		
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
			socket.close();
	};
	instanceProto.connect = function(host,port)
	{
		if(typeof(WebSocket) == "undefined")
			return;
		
		var socket = this.socket;
		
		if(typeof(socket) != "undefined")
			socket.close();
		
		this.lastAddress = host;
		this.lastPort = port;
		
		socket = new WebSocket("ws://" + host + ":" + port);
		var instance = this;
		var runtime = this.runtime;
		socket.addEventListener
		(
			"message",
			function(event)
			{
				instance.dataStack.push(event.data);
				runtime.trigger("OnData",instance);
			}
		);
		socket.addEventListener
		(
			"error",
			function(event)
			{
				runtime.trigger("OnError",instance);
			}
		);
		socket.addEventListener
		(
			"open",
			function(event)
			{
				runtime.trigger("OnConnect",instance);
			}
		);
		socket.addEventListener
		(
			"close",
			function(event)
			{
				runtime.trigger("OnDisconnect",instance);
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