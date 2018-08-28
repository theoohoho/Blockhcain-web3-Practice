
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