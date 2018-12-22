# Web3.js Note
## Interduce
web3 是一個library，可以透過HTTP或IPC和 local端或remote端 的Ethereum Node 進行互動

* 四種針對Ethereum Ecosystem特定的functionality module
1. `web3-eth` for Eth Blockchain and Smart contract
2. `web3-shh` for whisper protocol, that communicate p2p and broadcast
3. `web3-bzz` for swarm protocol, that decentralized file storage
4. `web3-utils` useful helper for Dapp

* Callback Promises Event
為了幫助web3可以整合多種不同標準的專案，將採用多種方式去執行非同步function。多數web3 object允許callback作為最後一個參數，還有回傳promises到chain function。
由於blockchain有分成不同的執行結果，所以在回傳事件return event，需要合併event emitter來准許回傳不同的結果，可以在每個function後面加上`on`、`once`、`off` characteristic，來查看特定的結果訊息


* Web3
    * 主要語法符號
    * `var Web3 = require('web3);`
* web3 object
    * web3 instance，會包含所有與Ethereum有關的module
    * `var web3 = new Web3(Web3.givenProvider);`
    * `web3.eth、web3.utils、web3.version ....`
* setProvider
    * 可以針對特定的module設定不同provider
    * 不過如果是設定 web3 object則會影響所有sub module 例如:`web3.eth、web3.shh ...`，除了`web3.bzz`是永遠獨立出來設定
    * `web3.setProvider()`、`web3.eth.setProvuder()`
* providers
    * 會包含目前有效的providers，主要針對以下兩種類型
    * `Web3.providers.WebsocketProvider()`
    * `Web3.providers.IpcProvider()` 適用在local node，連接上會比較安全
* givenProvider
    * 會自動設定Browser環境的provider
    * `web3.givenProvider`
* currentProvider
    * 會回傳目前連接的provider
    * `web3.currentProvider`
```javascript
var Web3 = require('web3');

// initiate provider setting
var web3 = new Web3('http://localhost:8545'); 
// or 
var web3 = new Web3(Web3.givenProvider || 'ws://remotenode.com:8546');

// change provider
web3.setProvider('ws://localhost:8546'); 
web3.setProvider(new Web3.provider.WebsocketProvider('ws://localhost:8546'));

// use IPC provider
var net = require('net');
var web3 = new Web3(new Web3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net));
```

* BatchRequest
    * 建立和執行批次request
```javascript
var contract - new web3.eth.Contract(abi,address);

var batch = new web3.BatchRequest();
batch.add(web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
batch.add(contract.methods.balance(address).call.request({from: '0x0000000000000000000000000000000000000000'}, callback2));
batch.execute();
```

* extend
    * 可以加入自訂的web3 module

## web3.eth
在Web3 module的呼叫，可以透過直接呼叫module code`var eth = require('web3-eth');`或是 以object的方式`web3.eth`來呼叫
* `web3.eth.defaultAccount`
* `web3.eth.defaultBlock`
* `web3.eth.getProtocolVersion`
    * return `string` as protocol version
* `web3.eth.getCoinbase`
* `web3.eth.isMining`
* `web3.eth.getHashrate`
    * return node mining 每秒hash的數量
* `web3.eth.getGasPrice`
* `web3.eth.getAccounts([callback])`
    * return node 使用provider所控制的 list of account that call RPC method `eth_accounts`
    * result same as `web3.eth.personal.getAccounts` that call RPC method `personal_listAccounts`
* `web3.eth.getBlockNumber([callback])`
* `web3.eth.getBalance(address[,defaultBlock][,callback])`
* `web3.eth.getStorageAt(address, position [,defaultBlock][,callback])`
    * get storage at a specific position of address
    * `position` is an index of storage    
* `web3.eth.getCode(address [,defaultBlock][,callback])`
    * get the code at specific address
* `web3.eth.getBlock(blockHash or blockNumber[,returnTxObject][,callback])`
    * return a Block matching the block number or block hash
    * `returnTxObject` is boolean ( default is `false`) that decide contain all Tx object, if `false` only contain Tx hash.
* `web3.eth.getBlockTransactionCount(blockHash or blockNumber [,callback])`
    * return num of tx in given block
    * first parameter can ba `string` (genesis、lastest、pending)  or `number`
* `web3.eth.getUncle(blockHash or blockNumber, uncleIndex [,returnTxObject][,callback])`
    * return block uncle by given uncle index position
* `web3.eth.getTransaction(transactionHash [,callback])`
    * return tx matching the given tx hash
* `web3.eth.getTransactionFromBlock(hashString or number, indexNumber [,callback])`
    * return tx object based on block hash or block number and tx index position
* `web3.eth.getTrnasactionReceipt(hash [,callback])`
    * return tx receipt by tx hash
* `web3.eth.getTransactionCount(address [,defaultBlock][,callback])`
    * get num of tx sent from address
* `web3.eth.sendTransaction(txObject[,callback])`
    * send tx to network
    * tx Object structure
        ```javascript
            {
                from: ,
                to:,
                value:,
                gas:,
                gasPrice: ,
                data: abi byte string,
                nonce: 設定相同nonce，會覆蓋相同nonce的 pending tx
            }
        ```
    * return event emitter
        * `transactionHash`
        * `receipt`
        * `confirmation`
        * `error`
        ```javascript
            web3.eth.sendTransaction({
                from: ...,
                to: ...,
                value: ...               
            })
            .then((receipt)=>{
                ...
            })
            .on('transactionHash',(hash)=>{
                ...
            })
            .on('receipt',(receipt)=>{
                ...
            })
            .on('confirmation',(confirmNum,receipt)=>{
                ...
            })
            .on('error',(err)=>{
                ...
            })
        ```

* `web3.eth.sendSignedTransaction(signedTransactionData [,callback])`
    * send an already signed transaction 由`web3.eth.account.signTransaction` sign 
    * `signedTransactionData` is `string` in HEX format 
* `web3.eth.sign(dataToSign, address [,callback])`
    * first parameter can be `string` or hex string, cause both valid 
    * second parameter is an address to sign data 
    * return `string` signature 
* `web3.eth.signTransaction(txObject, address [,callback])`
    * return object (the RLP econded transaction) 
    * `raw` property use `web3.eth.sendSignedTransaction` to send tx
* `web3.eth.call(callObject [,defaultBlock] [,callback])`
    * execute a message call(訊息回傳) transaction ，但是不會被mine進blockchain (也就是說執行不會改變contract內容的 訊息回傳transaction)
    * `callObject`就是txObject，不過`from` property is optional
* `web3.eth.estimateGas(callObject [,callback])`
    * 回傳需要gas used的用量
    * `callObject`就是txObject，不過`from` property is optional
* `web3.eth.getPastLogs(option [,callback])`
    * 透過`option`指定範圍，回傳過去的log
    * `option` is a filter as sturcutre
        * `fromBlock`
        * `toBlock`
        * `address` can be `string` or `array`, get log from particular account 
        * `topics` can be `array`
* `web3.eth.getWork()`
    * get work for miner to mine on  取得miner的工作內容
    * return `array` 
        1. index 0 : current block header pow-hash
        2. index 1 : seed hash used for DAG
        3. index 2 : boundary condition 
* `web3.eth.submitWork(nonce, powHash, digest [,callback])`
    * 提交 PoW solution
    * `nonce` is `string` 8 bytes
    * `powHash` is `string` 32 bytes，header's pow hash
    * `digest` is `string` 32 bytes，mix digest
    * return `boolean`


## web3.eth.subscribe
This function is subscribing specific event in the blockchain 只訂閱特定在blockchain中特定的 event
* `web3.eth.subscribe(type [,options] [,callback])`
    * `type` is `string` as following item
        * 'pendingTransactions'
            * subscribe incoming pending tx, non `options`
        * 'newBlockHeaders'
            * subscribe incoming block headers, non `options`
        * 'syncing'
            * subscribe syncing events, non `options`
        * 'logs'
            subscribe incoming logs, filer by `options`
    * all type return `data`、`changed`、`error`, except 'pendingTransactions' and 'newBlockHeaders' haven't `changed`
* `web3.eth.clearSubscriptions()`
    * reset subscriptions, but not reset from other packages like `web3-shh`


## web3.eth.Contract
main function to interact with smart contract in blockchain. When create contract object, first step is give abi json object of respective smart contract and web3 will convert all calls into low level ABI calls over RPC 

* `new web3.eth.Contract(abiJsonObject [,address][,options])`
    * create new contract instance 
    * `address` mean the address of the smart contract that I want to call 
    * `options` 
        * `from` addres transaction made from 
        * `gasPrice`
        * `gas`
        * `data` byte code of contract
    * Method
        * `clone`
            * clone the current contract instance 
        * `deploy(options)`
            * deploy new contract to blockchain 
            * `options`
                * `data` contract bytecode 
                * `argument` is `array`(optional), the argument pass to constructor on deployment
            * return tx object 
                * argument 
                * `send`
                * `estimateGas`
                * `encodeABI`
        * `methods.methodName([param1,param2...])`
            * create tx object for that method 可以針對指定的method，來建立一個tx object
            * declare method:: `methods.methodName([param1,param2...])`、`methods['methodSignature'](param1)`
            * return tx object as following 呼叫emthods 回傳的tx object包含
                * argument 
                * `call([options][,callback])` execute smart contract and call constant method in EVM without sending tx 
                    * `options` include `from`、`gasPrice`、`gas`
                * `send(options [,callback])` send tx to smart contract and execute it method 
                    * `options` include `from`(non-optional)、`gasPrice`、`gas`、`value`(optional)
                    * return promiEvent `transactionHash`、`receipt`、`confirmation`、`error`
                * `estimateGas` estimate gas that method execution will take, but the estimation different from actual gas used, cause the state of smart contract can be different at that time 
                    * `options` include `from`、`gas` as a gasLimit、`value` for call tx 
                * `encodeABI` enocde abi for this mehtod, can used to send tx, call method, pass to method as argument 
```javascript
// initiate 
var myContract = new web3.eth.Contract(abi);

// clone
var myContract2 = myContract.clone();
myContract2.options.address = address2;

// deploy
myContract.deploy({data: bytecode,argument:[uint256,"string",[array1,array2]]}).send({from: userAddress});
myContract.deploy({data: bytecode,argument:[uint256,"string",[array1,array2]]}).estimateGas().then((gasAmount)=>{console.log(gasAmount)});
myContract.deploy({data: bytecode,argument:[uint256,"string",[array1,array2]]}).encodeABI();

myContract.options.data = bytecode;
myContract.deploy({argument:[uint256,"string",[array1,array2]]});

//methods
myContract.methods.Method1().call();
myContract.methods.Method2(param1,param2).send({from: userAddress1});
```

