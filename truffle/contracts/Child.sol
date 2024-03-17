// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Child{
     string public name;
    uint public age;
    string public gender;
    uint public contact;

    function setValue(string memory _name, uint _age, string memory _gender, uint _Contact) public {
        name = _name;
        age = _age;
        gender=_gender;
        contact=_Contact;
    }

    function getValue() public view returns (string memory, uint,string memory,uint) {
        return (name, age,gender,contact);
    }
}