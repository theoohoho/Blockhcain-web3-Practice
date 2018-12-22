/* 
web3、infura

network information (getCoinbase、isMining、getGasPrice、getBlocknumber、)
block status (getBlock、subscribe(pendingTransaction、newBlockHeader))
address status (getBalance、getTransactionCount)
tx status (getTransaction、getTransactionReceipt)
create account 
send Tx (sendTransaction)
interact with contract  (web3.eth.Contract、myContract.deploy、myContract.methods.Method1(param...).send())

*/

const Web3 = require('web3');
const web3 = new Web3(WebSocket.givenProvider);

var create = function ()=>{
    
}

var sendTx = function ()=>{
    
}