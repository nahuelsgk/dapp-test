pragma solidity ^0.4.17;

import '../node_modules/zeppelin-solidity/contracts/token/StandardToken.sol';

contract N8Token is StandardToken
{
    string public constant name = "N8";
    string public constant symbol = "N8";
    uint256 public constant decimals = 0;
    uint256 public constant INITIAL_SUPPLY = 1500000000;

    function N8Token()
    {
        totalSupply = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;

        //https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#transfer-1
        //EIP 20: A token contract which creates new tokens SHOULD trigger a
        //Transfer event with the _from address set to 0x0
        //when tokens are created.
        Transfer(0x0, msg.sender, INITIAL_SUPPLY);
    }
}