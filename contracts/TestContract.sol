pragma solidity ^0.4.17;

import '../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol';
import './N8Token.sol';

contract TestContract
{
    using SafeMath for uint256;

    N8Token public token;

    event totalAdded(address _sender, uint256 _value, uint256 _number);

    uint256 public total;

    function TestContract(N8Token _tokenContract) public
    {
        require(address(_tokenContract) != address(0));
        token = _tokenContract;
    }

    function test(uint256 _number) public returns (bool)
    {
        require(_number > 0);
        total = total.add(_number);
        totalAdded(msg.sender, msg.value, _number);
        return true;
    }
}