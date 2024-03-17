// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
pragma experimental ABIEncoderV2;
contract Parent {
    string public name="saud";
    uint public age=21;

    function setValue(string memory _name, uint _age) public {
        name = _name;
        age = _age;
    }

    function getValue() public view returns (string memory, uint) {
        return (name, age);
    }
}
