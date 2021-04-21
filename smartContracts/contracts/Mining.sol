// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
* @title mining library for bytes32
* @author Carson Case
 */
library mining {

    /**
    * @notice checkNonce is a function to return true if inputs solve a hash puzzle 
    * where the number of leading zeros required is equal to the leading zeros of input 1 + leading zeros
    * of input 2 + 1 
    * @param _x is the first input hash
    * @param _y is the second input hash
    * @return true or false
     */    
    function checkNonce(bytes32 _x, bytes32 _y, uint256 _nonce) internal pure returns(bool){
        bytes32 check = hash(_x,_y,_nonce);
        uint8 difficulty = countScore(_x) + countScore(_y) + 1;
        return puzzle(check, difficulty);
    }
    
    /**
    * @notice puzzle returns true if a hash has _difficulty number of leading 0s
    * @param _entry is the hash
    * @param _difficulty is the required number of leading 0s
     */
    function puzzle(bytes32 _entry, uint8 _difficulty) internal pure returns(bool){
        bytes32 check = _entry >> (32*8) - _difficulty*4;
        return(check == 0);
    }
    
    /**
    * @notice countScore returns the number of leading 0s a hash has
    * @param _toCount is the hash to count zeros
    * @return the number of leading 0s
     */
    function countScore(bytes32 _toCount) internal pure returns(uint8){
        if (_toCount == 0) {return 0;}
        uint8 difficulty = 64;
        
        while(_toCount != 0){
            difficulty--;
            _toCount >>= 4;
        }
        return difficulty;
    }

    /**
    * @notice hash two inputs and a nonce with kecckak256
    * @dev all inputs are sorted and then hashed. This way the order of elements does not matter. (fire X water & water x fire = same)
    * @param _x input 1
    * @param _y input 2
    * @param _nonce is the nonce
    * @return result
     */
    function hash(bytes32 _x, bytes32 _y, uint256 _nonce) internal pure returns(bytes32){
        bytes32[] memory hashes = new bytes32[](3);
        hashes[0] = bytes32(_nonce);
        hashes[1] = _x;
        hashes[2] = _y;
        return keccak256(abi.encodePacked(_sort(hashes)));
    }
    
    /**
    * @notice helper bubble sort
    * @dev Note the use of bubble sort. I was considering using a more fancy algo like quicksort/mergesort since this IS a resume
    * project after all. But bubble is just a good call here. There's only 3 inputs so asymtotic complexity is not a big concern. And 
    * unlike fancier sorts bubble is good in special situations that will be more common in small datasets like this. Such as if the array is already
    * sorted, or the array is partially sorted. So bubble is what I went with. Costs about 3000 - 9000 gas in a few runs I did. Would like to test
    * other algos.
    * @param _hashes. Array to sort
    * @return sorted array
     */
    function _sort(bytes32[] memory _hashes) private pure returns(bytes32[] memory){
        uint8 size = uint8(_hashes.length);
        bool sorted = false;
        while(!sorted){
            for(uint i=0; i<size-1; i++){
                sorted = true;
                if(_hashes[i] > _hashes[i+1]){
                    sorted = false;
                    //Swap with no register. This is so neat. I love this.
                    _hashes[i] ^= _hashes[i+1];
                    _hashes[i+1] ^= _hashes[i];
                    _hashes[i] ^= _hashes[i+1];
                }
            } 
        }
        return _hashes;
    }
    

}