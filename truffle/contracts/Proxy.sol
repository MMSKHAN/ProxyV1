// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;
import "./Parent.sol";
import "./Child.sol";

contract Proxy {
    address public implementation;
    address public admin;

    constructor(address _implementation, address _admin) {
        implementation = _implementation;
        admin = _admin;
    }
    function getimplime() public view returns(address,address){
        return(implementation,admin);
    }

    function upgradeTo(address newImplementation) external {
        require(msg.sender == admin, "Only admin can upgrade");
        (string memory parentName, uint parentAge) = Parent(implementation).getValue();
        Child(newImplementation).setValue(parentName, parentAge, "Unknown", 0);
       
        implementation = newImplementation;
    }

    fallback() external  {
    address _impl = implementation;
    require(_impl != address(0), "Implementation address is not set");

        // assembly {
            
        //     let ptr := mload(0x40)
        //     calldatacopy(ptr, 0, calldatasize())
        //     // let result := staticcall(gas(), _impl, ptr, calldatasize(), 0, 0)
        //           let result := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0)
        //             // let result := delegatecall(gas(), _impl, ptr, calldatasize(), ptr, calldatasize())


        //     switch result
        //     case 0 {
        //         revert(0, 0)
        //     }
        //     default {
        //         let size := returndatasize()
        //         returndatacopy(ptr, 0, size)
        //         return(ptr, size)
        //     }
        // }
         assembly {
        let ptr := mload(0x40)
        calldatacopy(ptr, 0, calldatasize())
        let success := call(gas(), _impl, 0, ptr, calldatasize(), 0, 0)

        returndatacopy(0, 0, returndatasize())

        switch success
        case 0 {
            revert(0, returndatasize())
        }
        default {
            return(0, returndatasize())
        }
    }
    }
}

