pragma solidity ^0.4.24;

contract Token{
    address owner;
    mapping (address => uint) balances;
    constructor(uint _supply) public{
        owner = msg.sender;
        balances[owner] = _supply;
    }
    function balanceOf(address _addr) public view returns(uint){
        return balances[_addr];
    }
    function transfer(address _to, uint _value) public {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
    }
    function kill () public{
        if(msg.sender == owner){
            selfdestruct(owner);
        }
        
    }
}