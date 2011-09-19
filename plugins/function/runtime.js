// ECMAScript 5 strict mode
"use strict";

assert2(cr,"cr namespace not created");
assert2(cr.plugins,"cr.plugins not created");

cr.plugins_.Function = function(runtime)
{
	this.runtime = runtime;
};

(function()
{
	var pluginProto = cr.plugins_.Function.prototype;

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
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function()
	{
	};

	pluginProto.cnds = {};
	var cnds = pluginProto.cnds;

	cnds["OnFunction"] = function()
	{
		return true;
	};

	pluginProto.acts = {};
	var acts = pluginProto.acts;
	acts["CallFunction"] = function(name)
	{
		
	};
	pluginProto.exps = {};
	var exps = pluginProto.exps;
	
}());
