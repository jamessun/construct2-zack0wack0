function GetPluginSettings()
{
	return {
		"name":	"Storage",
		"id": "Storage",
		"description": "Allows you to store data in the browser cache.",
		"author": "Zack0Wack0",
		"help url": "http://www.zack0wack0.com",
		"category": "Web",
		"type": "object",
		"rotatable": false,
		"flags": pf_singleglobal
	};
}
AddCondition(0,0,"Local Storage supported","Local","Local Storage supported","Check if Local Storage is supported.","LocalStorageEnabled");
AddCondition(1,0,"Session Storage supported","Session","Session Storage supported","Check if Session Storage is supported.","SessionStorageEnabled");
AddAnyTypeParam("Key","Enter the name the data is stored under.", "\"\"");
AddCondition(3,0,"Local data exists","Local","{0} exists in Local Storage","Check if data stored under a key exists in Local Storage.","LocalStorageExists");
AddAnyTypeParam("Key","Enter the name the data is stored under.", "\"\"");
AddCondition(4,0,"Session data exists","Session","{0} exists in Session Storage","Check if data stored under a key exists in Session Storage.","SessionStorageExists");

AddAnyTypeParam("Key","Enter the name the data is stored under.", "\"\"");
AddExpression(0,ef_return_string,"Get local data","Local","GetLocal","Get data from Local Storage.");
AddAnyTypeParam("Key","Enter the name the data is stored under.", "\"\"");
AddExpression(1,ef_return_string,"Get session data","Session","GetSession","Get data from Session Storage.");

AddAnyTypeParam("Key","Enter the name to store the data under.", "\"\"");
AddAnyTypeParam("Data","Enter the data to store.", "\"\"");
AddAction(0,0,"Store local data","Local","Store {1} under {0} in Local Storage","Store data in Local Storage, available in any session.","StoreLocal");
AddAnyTypeParam("Key","Enter the name to store the data under.", "\"\"");
AddAnyTypeParam("Data","Enter the data to store.", "\"\"");
AddAction(1,0,"Store session data","Session","Store {1} under {0} in Session Storage","Store data in Session Storage, available in the current session.","StoreSession");

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