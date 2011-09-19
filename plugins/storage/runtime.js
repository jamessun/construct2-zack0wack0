// ECMAScript 5 strict mode
"use strict";

assert2(cr,"cr namespace not created");
assert2(cr.plugins,"cr.plugins not created");

cr.plugins_.Storage = function(runtime)
{
	this.runtime = runtime;
};

(function()
{
	var pluginProto = cr.plugins_.Storage.prototype;

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

	cnds["LocalStorageEnabled"] = function()
	{
		return typeof(localStorage) != "undefined";
	};
	cnds["SessionStorageEnabled"] = function()
	{
		return typeof(sessionStorage) != "undefined";
	};
	cnds["LocalStorageExists"] = function(key)
	{
		if(typeof(localStorage) == "undefined")
			return false;
			
		key = key.toString();
			
		return localStorage.getItem("c2_" + key) != null;
	};
	cnds["SessionStorageExists"] = function(key)
	{
		if(typeof(sessionStorage) == "undefined")
			return false;
			
		key = key.toString();
			
		return sessionStorage.getItem("c2_" + key) != null;
	};

	pluginProto.acts = {};
	var acts = pluginProto.acts;
	acts["StoreLocal"] = function(key,data)
	{
		if(typeof(localStorage) == "undefined")
			return;
			
		key = key.toString();
		data = data.toString();
		
		localStorage.setItem("c2_" + key,data);
	};
	acts["StoreSession"] = function(key,data)
	{
		if(typeof(sessionStorage) == "undefined")
			return;
			
		key = key.toString();
		data = data.toString();
			
		sessionStorage.setItem("c2_" + key,data);
	};
	
	pluginProto.exps = {};
	var exps = pluginProto.exps;
	exps["GetLocal"] = function(result,key)
	{
		if(typeof(localStorage) == "undefined")
			result.set_string("");
		else
		{
			key = key.toString();
			
			var value = localStorage.getItem("c2_" + key);
			result.set_string(value.toString());
		}
	};
	exps["GetSession"] = function(result,key)
	{
		if(typeof(sessionStorage) == "undefined")
			result.set_string("");
		else
		{
			key = key.toString();
			
			var value = sessionStorage.getItem("c2_" + key);
			result.set_string(value.toString());
		}
	};
	
}());
