
var countries = [];

function load(){
	var path = require('path');
	var data = require('fs').readFileSync(path.join(__dirname, 'country-codes.csv')).toString().split('\n');

	var headings = data[0].split(',');

	for (var i = 1; i < data.length; i++){
		var parts = data[i].split(',');
		var country = {};
		for (var j = 0; j < headings.length; j++){
			country[headings[j]] = parts[j].trim();
		}
		countries.push(country);
	}
	module.exports.countries = countries;
}

load();

module.exports.byFips = function(code){
	return search('fips', code.toUpperCase());
}

module.exports.byIso = function(code){
	if (!isNaN(parseInt(code))){
		return search('isoNo', code.toString());
	}

	if (code.length === 2){
		return search('iso2', code.toUpperCase());
	}

	if (code.length === 3){
		return search('iso3', code.toUpperCase());
	} 

	throw new Error("cannot determine ISO code type");
}

module.exports.byInternet = function(code){
	return search('internet', code.toUpperCase());
}

function search(field, code){
	for (i = 0; i < countries.length; i++){
		if (countries[i][field] === code){
			return countries[i];
		}
	}
	return null;
}

