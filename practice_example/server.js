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
if(typeof web3 !== 'undefined'){
    var web3 = new Web3(web3.currentProvider);
    console.log('define');
}
else{
    var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/a18e477ef5054ba7990221817a29e3af'));
    console.log(web3.eth.net.isListening().then(console.log));
}
  




// Network Information
var netWorkInformation = {
    networkType: function(){
        web3.eth.net.getNetworkType().then((result)=>{
            console.log(result);
        });
    },
    networkListening: function(){
        web3.eth.net.isListening().then((result)=>{
            console.log(result);
        });
    },
    networkPeerCount: function(){
        web3.eth.net.getPeerCount().then((result)=>{
            console.log(result);
        });
    },
    networkId: function(){
        web3.eth.net.getId().then((result)=>{
            console.log(result);
        });
    },
    getCoinbase: function(){
        web3.eth.getCoinbase((err,result)=>{console.log(result);});
    },
    getGasPrice: function(){
        web3.eth.getGasPrice().then((result)=>{
            console.log(result);
        });
    },
    isMining: function(){
        web3.eth.isMining().then((result)=>{
            console.log(result);
        });
    },
    getBlockNumber: function(){
        web3.eth.getBlockNumber().then((result)=>{
            console.log(result);
        });
    },
    getAccounts: function(){
        web3.eth.getAccounts().then((result)=>{
            console.log(result);
        });
    },
    getWork: function(){
        web3.eth.getWork((err,result)=>{console.log(result);});
    }
};



// Block Status
// getBlock、subscribe(pendingTransaction、newBlockHeader)
var BlockStatus={
    getBlock: ()=>{
        web3.eth.getBlock('latest').then((result)=>{
            console.log(result);
        });
    },
    getBlockTransactionCount: ()=>{
        web3.eth.getBlockTransactionCount('latest').then((result)=>{
            console.log(result);
        });
    },
    getPastLogs: ()=>{
        web3.eth.getPastLogs({fromBlock:'pending',toBlock:'pending'}).then((result)=>{
            console.log(result);
        });
    },
    Subscribe: ()=>{
        web3.eth.subscribe('pendingTransactions',(err,result)=>{
          if(!err){
            console.log(result); 
          }
        }).on('data',(transaction)=>{
            console.log(transaction);
        })
    }
}



// Address Status
var addressStatus={
    getBalance: (address)=>{
        web3.eth.getBalance(address).then((result)=>{
            console.log(result);
        });
    },
    
    getTransactionCount: (address)=>{
        web3.eth.getTransactionCount(address).then((result)=>{
            console.log(result);
        });
    },
    
    getCode: (address)=>{
        web3.eth.getCode(address).then((result)=>{
            console.log(result);
        });
    },
    getStorageAt: (address)=>{
        web3.eth.getStorageAt(address).then((result)=>{
            console.log(result);
        });
    }
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

// Contract 
var myContract = new web3.eth.Contract(abi);
myContract.deploy({data: bytecode,argument:[uint256,"string",[array1,array2]]}).send({from: userAddress, gasPrice: , gas: , value: });
myContract.deploy({data: bytecode,argument:[uint256,"string",[array1,array2]]}).estimateGas((err,gasAmount)=>{console.log(gasAmount)});

myContract.methods.Method1().call();
myContract.methods.Method2(param1,param2).send({from: userAddress1});

myContract.once(event [,options] ,callback)

