function GetPluginSettings()
{
	return {
		"name":	"Function",
		"id": "Function",
		"description": "Create functions and call them with arguments.",
		"author": "Zack0Wack0",
		"help url": "http://www.zack0wack0.com",
		"category": "Web",
		"type": "object",
		"rotatable": false,
		"flags": pf_singleglobal
	};
}

AddAnyTypeParam("Function","Enter the name of the function.", "\"\"");
AddCondition(0,cf_trigger,"On function","Function","On function \"{0}\"","Triggered when a specific function is called.","OnFunction");

AddAnyTypeParam("Function","Enter the name of the function.", "\"\"");
AddAction(0,0,"Call function","Function","Call function \"{0\"","Call a function.","CallFunction");

ACESDone();

var property_list = [
];

function CreateIDEObjectType()
{
	return new IDEObjectType();
}

function IDEObjectType()
{
	assert2(this instanceof arguments.callee,"Constructor called as a function");
}

IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee,"Constructor called as a function");
	
	this.instance = instance;
	this.type = type;
	
	this.properties = {};
	
	for(property in property_list)
		this.properties[property.name] = property.initial_value;
}

IDEInstance.prototype.OnCreate = function()
{
}

IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

IDEInstance.prototype.Draw = function(renderer)
{
}

IDEInstance.prototype.OnRendererReleased = function()
{
}
