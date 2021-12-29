define([
	"globalize",
	"text!cldr-data/main/en/currencies.json",
	"text!cldr-data/main/en/numbers.json",
	"text!cldr-data/supplemental/currencyData.json",
	"text!cldr-data/supplemental/likelySubtags.json",
	"text!cldr-data/supplemental/plurals.json",
	"../../util",

	"globalize/currency",
	"globalize/number"
], function( Globalize, enCurrencies, enNumbers, currencyData, likelySubtags, plurals, util ) {

var teslaS = 69900;

function extraSetup() {
	Globalize.load(
		JSON.parse(currencyData),
		JSON.parse(enCurrencies),
		JSON.parse(enNumbers),
		JSON.parse(plurals)
	);
}

QUnit.module( ".formatCurrencyToParts( value, currency [, options] )", {
	beforeEach: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {}
			}
		});
		Globalize.locale( "en" );
	},
	afterEach: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.formatCurrencyToParts();
	});

	util.assertNumberParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.formatCurrencyToParts( invalidValue );
		};
	});

	util.assertParameterPresence( assert, "currency", function() {
		Globalize.formatCurrencyToParts( 7 );
	});

	util.assertCurrencyParameter( assert, "currency", function( invalidValue ) {
		return function() {
			Globalize.formatCurrencyToParts( 7, invalidValue );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.formatCurrencyToParts( 7, "USD", invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.formatCurrencyToParts( 7, "USD" );
	});
});

QUnit.test( "should format currencies", function( assert ) {
	extraSetup();
	assert.deepEqual( Globalize.formatCurrencyToParts( teslaS, "USD" ), [
		{
			"type": "currency",
			"value": "$"
		},
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		}
	]);
});

});
