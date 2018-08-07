//set module we use 
const fs = require('fs');
const Web3 = require('web3');
const solc = require('solc');


//set blockchain infomation we use
const rpcUrl = 'http://localhost:8555';

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(rpcurl));


// To judge web3 set provider yet
if(typrof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
}else{
    web3 = new Web3(new Wen3.providers.HttpProvider(rpcUrl));
}


//To judge web3 is coneect yet
if(!web3.isConnected()){
    throw new Error('unable connect to blockchain url');
}else{
    console.log('ethereum js api version is ::'+web3.version.api);
    console.log('node version is ::'+web3.version.node);
    console.log('protocol version is ::'+web3.version.network);
    console.log('This node connet with network ::'+web3.net.listening);
    console.log('How many peer connect with this node ::'+web3.net.peerCount);
}
