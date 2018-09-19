
var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');

web3.eth.isMining()
.then(console.log);

/*return true or false */
web3.eth.net.isListening()
.then(console.log);

/*return main, private, modern, ropsten */
web3.eth.net.getNetworkType()
.then(function(result){
    console.log('network type :: '+result)
});

web3.eth.getGasPrice()
.then(function(result){
    console.log('gas price :: '+result)
});

web3.eth.getCoinbase()
.then(function(result){
    console.log('coinbase :: '+result)
});

web3.eth.getAccounts()
.then(console.log);


// utils function method

web3.utils.sha3(stringOrHEX); // 0x12312fqweqwe.....

web3.utils.soliditySha3(param1[,param2,...]); //  0xasdgqwe123.....
/* 
## param can be object, bool, string, hex, bool, number, bn
example:: web3.utils.soliditySha3('string',0x1234abc,true,-1000);

## web3.utils.soliditySha3({type:'',value:''}); //can set any type of value
example::  web3.utils.soliditySha3({type:'address' , value: '0x12345'}); == web3.utils.soliditySha3({t:'bytes',v:'0x12345'});
*/


web3.utils.isAddress('0xqwe123123...'); //  true or false
/* 
開頭不一定要加 0x，全部大寫也會return true，只有在其中一個字母大小寫變化，才會return false
web3.utils.isAddress('qwe123123') == isAddress('QWE123123') !== isAddress('Qwe123') 
*/


web3.utils.toWei(number[,uint]); // uint default is ether
web3.utils.fromWei(number[,uint]);
/*
wei: 1
mwei: 1000000
gwei: 1000000000
szabo: 1000000000000
finney: 1000000000000000
ether: 1000000000000000000

example:: web3.utils.toWei(1000,'ether'); == 1000 * 1000000000000000000
example:: web3.utils.fromWei(1000,'ether') == 1000 / 1000000000000000000
*/

web3.utils.padLeft(string,characterAmount[,sign]); //sign is string that like instead 0
web3.utils.padRight(string,characterAmount[,sign]); //characterAmount is number that represent total string should have unclude 0x
/* 
example:: web3.utils.padLeft('0xabcde',10) == 0x00000abcde
example:: web3.utils.padRight('0xabcde',10) == 0xabcde00000
*/