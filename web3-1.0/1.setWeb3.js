
var Web3 = require('./web3.js-1.0.0-beta.35/package');
var web3 = new Web3(new Web3.providers.setHttpProvider('http://localhost:8545'));
web3.eth.isStyncing()
.then(console.log);
/*
var myContractInstance  = new web3.eth.Contract(abi,contract_address);

myContractInstance.methods.methodfunction(param).call();

myContractInstance.methods.methodfunction(param)
.send({from: account,value: web3.util.toWei('0.1','ether')})
.on('receipt',function(receipt){
    console.log('successfully!');
})
.on('error',function(error){
    console.log(error);
});

//listening event is generate or not
myContractInstance.events.EventName()
.on("data",function(event){
    console.log(event.returnValue);
})
.on("error",console.log(error));

//filter indexed parameter of EventName
myContractInstance.events.EventName({filter:{indexedParam:value}})
.on("data",function(event){
    console.log(event.returnValue);
})
.on("error",console.log(error));

//get all log of EventName from 0 to lastest
myContractInstance.getPastEvents("EventName",{fromBlock:0,toBlock:lastest})
.on("data",function(event){
    console.log(event.returnValue);
})
.on("error",console.log(error));
*/