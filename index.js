const Web3 = require('web3');
const solc = require('solc');

const rpcUrl = 'http://localhost:8555';

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(rpcurl));

if(typrof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
}else{
    web3 = new Web3(new Wen3.providers.HttpProvider('rpcUrl'));
}