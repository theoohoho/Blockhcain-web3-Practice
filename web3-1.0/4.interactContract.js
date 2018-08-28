var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545'); //ganache default url
var sender = '0xa013f13313627a1535b837b33f12cf4347b84af7'; // ganache random account
var _to = '0xa8be27cd3a65b85400f31ee4713f2fd5c4543813'; // ganache random account

var abi = JSON.parse(fs.readFileSync('./contractABI.json','utf8'));
var contractAddress = fs.readFileSync('./contractAddress.js','utf8');
var contractInstance = new web3.eth.Contract(abi,contractAddress);

contractInstance.methods.balanceOf(sender).call().then(console.log);
contractInstance.methods.transfer(_to,100).send({from:sender}).then(console.log);