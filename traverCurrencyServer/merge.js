// 引入datafiles
// const currency_data = require('./currency_data');
// const rawdata = require('./rawdata');

var fs = require('fs');
var currency_data = JSON.parse(fs.readFileSync('/data/release/TravelCurrencyApp/currency_data.json'));
var currency_rawdata = JSON.parse(fs.readFileSync('/data/release/TravelCurrencyApp/currency_rawdata.json'));

for (var idx in currency_rawdata) {
	if (currency_data[idx].currencyCode != "RMB") {
		currency_data[idx].currencyChaoOut = currency_rawdata[idx].chao_out
	};
};

//console.log(currency_data)
fs.writeFileSync('/data/release/TravelCurrencyApp/currency_data.json',JSON.stringify(currency_data));


