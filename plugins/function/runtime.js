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
		this.currentFunction = "";
		this.currentArguments = [];
		this.builtArguments = [];
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function()
	{
	};

	pluginProto.cnds = {};
	var cnds = pluginProto.cnds;

	cnds["OnFunction"] = function(name)
	{
		return name.toLowerCase() == this.currentFunction.toLowerCase();
	};

	pluginProto.acts = {};
	var acts = pluginProto.acts;
	
	acts["CallFunction"] = function(name)
	{
		this.currentFunction = name;
		this.currentArguments = this.builtArguments;
		this.builtArguments = [];
		
		this.runtime.trigger(pluginProto.cnds.OnFunction,this);
	};
	acts["AddParameter"] = function(value)
	{
		this.builtArguments.push(value);
	};
	
	pluginProto.exps = {};
	var exps = pluginProto.exps;
	exps["GetParameterCount"] = function(ret)
	{
		ret.set_int(this.currentArguments.length);
	};
	exps["GetParameter"] = function(ret,index)
	{
		var value = this.currentArguments[index];
		
		if(typeof(value) == "undefined")
			return ret.set_string("");
		
		ret.set_any(value);
	};
}());
	
