function GetBehaviorSettings()
{
	return {
		"name": "Rigidbody",
		"id": "Rigidbody",
		"description": "An object with laws of physics applied to it.",
		"author": "Zack0Wack0",
		"help url": "http://zack0wack0.com",
		"category":	"Physics",
		"flags": 0
	};
};

ACESDone();

var property_list = [
	new cr.Property(ept_float,"Density",1,"The density of the object."),
	new cr.Property(ept_float,"Restitution",1,"The restitution of the object."),
	new cr.Property(ept_float,"Friction",0,"The friction of the object.")
];

function CreateIDEBehaviorType()
{
	return new IDEBehaviorType();
}

function IDEBehaviorType()
{
	assert2(this instanceof arguments.callee,"Constructor called as a function");
}

IDEBehaviorType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	this.instance = instance;
	this.type = type;
	
	this.properties = {};
	
	for(var property in property_list)
		this.properties[property.name] = property.initial_value;
}

IDEInstance.prototype.OnCreate = function()
{
}

IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
