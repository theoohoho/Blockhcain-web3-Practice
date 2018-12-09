var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545'); //ganache default url
var sender = '0x3a8ed9523252a74c53ddf618271fa4fdcee9bb27'; // ganache random account
var _to = '0x06903a43b8323861438d6652b424d40ad73f380f'; // ganache random account

var abi = JSON.parse(fs.readFileSync('./contractABI.json','utf8'));
var contractAddress = fs.readFileSync('./contractAddress.js','utf8');
var contractInstance = new web3.eth.Contract(abi,contractAddress);



contractInstance.methods.balanceOf(sender).call(); //直接放進變數裡會顯示Promise
contractInstance.methods.transfer(_to,100).send({from:sender}).then(console.log); //then會回傳transaction receipt

//將call contract function 到function內之後判斷return value
function test2(encrypted){
    var hashValue= web3.utils.sha3(encrypted);
    return  contractInstance.methods.test(hashValue).call();
}

if(!test2('12345')){
    console.log('not yet');
}else{
    console.log('get');
}

