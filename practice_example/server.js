/* 
web3、infura

network information (getCoinbase、isMining、getGasPrice、getBlocknumber)
block status (getBlock、subscribe(pendingTransaction、newBlockHeader))
address status (getBalance、getTransactionCount)
tx status (getTransaction、getTransactionReceipt)
create account 
send Tx (sendTransaction)
interact with contract  (web3.eth.Contract、myContract.deploy、myContract.methods.Method1(param...).send())

*/

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/a18e477ef5054ba7990221817a29e3af');


// Network Information
var networkType = ()=>{
    web3.eth.net.getNetworkType().then((result)=>{
        console.log(result);
    })
}

var getCoinbase = ()=>{
    web3.eth.getCoinbase((err,result)=>{console.log(result);});
}

var getGasPrice = ()=>{
    web3.eth.getGasPrice().then((result)=>{
        console.log(result);
    });
}

var isMining = ()=>{
    web3.eth.isMining().then((result)=>{
        console.log(result);
    });
}

var getBlockNumber = ()=>{
    web3.eth.getBlockNumber().then((result)=>{
        console.log(result);
    });
}

var getAccounts = ()=>{
    web3.eth.getAccounts().then((result)=>{
        console.log(result);
    });
}

var getWork = ()=>{
    web3.eth.getWork((err,result)=>{console.log(result);});
}



// Block Status
// getBlock、subscribe(pendingTransaction、newBlockHeader)
var getBlock = ()=>{
    web3.eth.getBlock('latest').then((result)=>{
        console.log(result);
    });
}

var getBlockTransactionCount = ()=>{
    web3.eth.getBlockTransactionCount('latest').then((result)=>{
        console.log(result);
    });
}
var getPastLogs = ()=>{
    web3.eth.getPastLogs({fromBlock:'pending',toBlock:'pending'}).then((result)=>{
        console.log(result);
    });
}
var Subscribe = ()=>{
    web3.eth.subscribe('pendingTransactions',(err,result)=>{
      if(!err){
        console.log(result); 
      }
    }).on('data',(transaction)=>{
        console.log(transaction);
    })
}


// Address Status
var getBalance = (address)=>{
    web3.eth.getBalance(address).then((result)=>{
        console.log(result);
    });
}

var getTransactionCount = (address)=>{
    web3.eth.getTransactionCount(address).then((result)=>{
        console.log(result);
    });
}

var getCode = (address)=>{
    web3.eth.getCode(address).then((result)=>{
        console.log(result);
    });
}

var getStorageAt = (address)=>{
    web3.eth.getStorageAt(address).then((result)=>{
        console.log(result);
    });
}



// Tx status
var getTransaction = (txHash)=>{
    web3.eth.getTransaction(txHash).then((result)=>{
        console.log(result);
    });
}

var getTransactionReceipt = (txHash)=>{
    web3.eth.getTransactionReceipt(txHash).then((result)=>{
        console.log(result);
    });
}


// Send Tx
var sendTx = (_from,_to,_value)=>{
    var txObjcet = {
        from: _from,
        to: _to,
        value: _value
    };
    web3.eth.sendTransaction(txObjcet).then((receipt)=>{
        console.log(receipt);
    })
}

var hashMessage = (message)=>{
    console.log(web3.eth.accounts.hashMessage(message));
}

hashMessage("TEST");