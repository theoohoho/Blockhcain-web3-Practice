pragma solidity ^0.4.0;
contract MyToken {
    mapping (address => uint256) public balanceOf; //create an array with all balances 
    
    function MyToken(uint256 initialSupply) public{ //initialize contract with initial supply tokens to the creator of the contract
        balanceOf[msg.sender] = initialSupply;
    }  //give the creator all initial tokens   
    
    function transfer(address _to, uint256 _value) public{ //send Coin
        require(balanceOf[msg.sender] >= _value); //check if the sender has enough
        require(balanceOf[_to] + _value>= balanceOf[_to]); //check for overflows
        balanceOf[msg.sender] -= _value; //substract from the sender
        balanceOf[_to] += _value; //add the same to the recipient
    }
}