#!/bin/bash
# Get currency data from API services.
# Added by Black13eard at Wed Jun 21 CST 2017

pathdir="/data/release/TravelCurrencyApp"

curl -s --get --include 'http://ali-waihui.showapi.com/bank10?bankCode=ICBC'  -H 'Authorization:APPCODE 97b2db3639f9401cb7f822545cc637e3'|grep showapi_res_body|jq '.showapi_res_body.codeList' > $pathdir/currency_rawdata.json

#curl https://www.nethunter.cn:4430/tcurrency

# update the runtime data file.
node $pathdir/merge.js

echo `date` >> $pathdir/server.log
