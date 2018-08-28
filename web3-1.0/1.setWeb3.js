var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');


var myContractInstance  = new web3.eth.Contract(abi[,contract_address],{
    from: sender, //sender address
    gasPrice: 200000, //gas price in wei use for transaction
    gas: 2000000000, //maximum gas provide for transaction
    data: bytecode
});



console.log(myContractInstance.option);
/*
{
    address:, 
    jsonInterface:,
    from:,
    gasPrice:,
    gas
}
*/
myContractInstance.address = contract address;
myContractInstance.jsonInterface = abi;
myContractInstance.from = sender;
myContractInstance.gasPrice = price for tx use;
myContractInstance.gas = maximum gas provide for tx;


var myContractInstance1 = new web3.eth.Contract(abi);
//clone contract instance
myContractInstance1.clone(); 
var contractforclone = myContractInstance1.clone();
contractforclone.option.address = change contract address;
contractforclone.option.address = change sender address;

//delpoy contract 
myContractInstance1.deploy(); 
myContractInstance1.deploy({data:bytecode,argument:[parameter]}).send({from:sender,gasPrice:,gas:,value:},function(err,txHash){
    console.log(txHash);
})
.on('transactionHash',function(transactionHash){ 
    console.log(transactionHash);
})
.on('receipt',function(receipt){
    console.log(receipt);
})
.on('confirmation',function(confirmation){ //will count the tranasction time from pending to confirmation 
    console.log(confirmation);
})
.on('error',function(error){ //will return object
    console.log(error);
})
.then(function(newContractInstance){
    console.log(newContractInstance.options.address); //contract address
});


//estimate gas
myContractInstance1.deploy({data:bytecode,argument:[parameter]}).estimateGas(function(err,gas){console.log(gas)});


var myContractInstance2  = new web3.eth.Contract(abi,contract_address);

// call
myContractInstance2.methods.methodfunction(param).call();

// send
myContractInstance2.methods.methodfunction(param)
.send({from: account,value: web3.util.toWei('0.1','ether')})
.on('transactionHash',function(transactionHash){
    console.log(transactionHash);
})
.on('receipt',function(receipt){
    console.log(receipt);
})
.on('confirmation',function(confirmation){
    console.log(confirmation);
})
.on('error',function(error){
    console.log(error);
});


//listening event is generate or not
myContractInstance2.events.EventName()
.on("data",function(event){
    console.log(event.returnValue);
})
.on("error",console.log(error));


//filter indexed parameter of EventName
myContractInstance2.events.EventName({filter:{indexedParam:value}})
.on("data",function(event){
    console.log(event.returnValue);
})
.on("error",console.log(error));


//get all log of EventName from 0 to lastest
myContractInstance2.getPastEvents("EventName",{fromBlock:0,toBlock:lastest})
.on("data",function(event){
    console.log(event.returnValue);
})
.on("error",console.log(error));
