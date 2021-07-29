
var a = `[{key:0,value:"关"},{key:1,value:"开"}]`; 
JSON.parse(a.replaceAll('key','"key"').replaceAll('value','"value"'));
