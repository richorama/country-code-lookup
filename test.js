var countries = require('./index.js');

describe('country code', function(){

	it('loads the countries into an array', function(done){
		if (countries.countries.length !== 237) done("not all countries loaded");
		done();
	});

	it('finds countries by fips', function(done){
		var uk = countries.byFips('UK');
		if (!uk) done('no country');
		if (uk.country !== 'United Kingdom') done('wrong country');
		if (uk.continent !== "Europe") done("wrong continent");
		if (uk.region !== "Western Europe") done("wrong region");
		if (uk.capital !== "London") done("wrong capital");
		done();
	});

	it('finds countries by iso 2', function(done){
		var uk = countries.byIso('GB');
		if (!uk) done('no country');
		if (uk.country !== 'United Kingdom') done('wrong country');
		done();
	});

	it('finds countries by iso 3', function(done){
		var uk = countries.byIso('GBR');
		if (!uk) done('no country');
		if (uk.country !== 'United Kingdom') done('wrong country');
		done();
	});

	it('finds countries by iso number', function(done){
		var uk = countries.byIso(826);
		if (!uk) done('no country');
		if (uk.country !== 'United Kingdom') done('wrong country');
		done();
	});


	it('finds countries by iso number as a string', function(done){
		var uk = countries.byIso('826');
		if (!uk) done('no country');
		if (uk.country !== 'United Kingdom') done('wrong country');
		done();
	});

	it('finds countries by internet code', function(done){
		var uk = countries.byInternet('UK');
		if (!uk) done('no country');
		if (uk.country !== 'United Kingdom') done('wrong country');
		done();
	});

	it('finds countries by lower case fips', function(done){
		var uk = countries.byFips('uk');
		if (!uk) done('no country');
		if (uk.country !== 'United Kingdom') done('wrong country');
		done();
	});

});