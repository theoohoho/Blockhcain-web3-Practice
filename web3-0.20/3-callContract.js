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

//compile contract file
var contractFile = fs.readFileSync('./smartcontract.sol','utf8');
var compiledContract = solc.compile(contractFile);
for(var contractName in compiledContract.contracts){
    var bytecode = compiledContract.contracts[contractName].bytecode;
    var abi = JSON.parse(compiledContract.contracts[contractName].interface);
}


//call contract function
var myContract = web3.eth.contract(abi);
var myContractInstance = myContract.at(contractAddress);

//use contract function
//There are two ways to call function .call() & .sendTransaction
//First Function just a input function, if function not setting return it will not return value
//that's mean you don't need console to show result
var nonChangeContractContentFunction = myContractInstance.ContractFunction.call(parameter);
console.log(nonChangeContractContentFunction);

//Second Function will change data in contact, so you need add .sendTransaction() 
//assume this function is like ...function ContractFunction(address _addr,uint _amount) public(){}...
//after you execute this code will send transaction to contract and return transactionHash
web3.personal.unlockAccount(senderAddress,'password');
var TransactionHash = myContractInstance.ContractFunction.sendTransaction(address parameter1, uint parameter2...,{from: senderAddress});
console.log(TransactionHash);

//so if smart contact have event fucntion then we can listen this event to check transaction have finished yet
//event function in solidity like this ...event EeventFunction(address _addr,uint _amount)...
//after transaction been confirmed it will callback transaction receipt 
myContractInstance.EventFunction(function(err,result){
    if(!err){
        console.log(result);
    }
})
