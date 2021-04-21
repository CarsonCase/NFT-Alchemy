//SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./Mining.sol";

/**
* @title Elements
* @author Carson Case
 */
contract Elements is ERC721Enumerable{
    using mining for bytes32;           //Mining Library
    address dev;
    
    event NewElement(address, uint256, uint256, uint256);

    /**
    * @notice constructor mints the 4 base elements to dev
     */
    constructor() ERC721("Elements", "ELM"){
        //Set dev
        dev = msg.sender;
        //Mint the origional 4 elements to dev
        _mint(dev, 0xc<<4*63);      //Water
        _mint(dev, 0xe<<4*63);      //Earth
        _mint(dev, 0xf<<4*63);      //Fire
        _mint(dev, 0xa<<4*63);      //Air
    }

    /**
    * @notice mintNew function can be called to mint a new element. If it is mined correctly
    * @param _id1 is the first NFT id 
    * @param _id2 is the second NFT id
    * @param _nonce is the nonce found when mining
     */
    function mintNew(uint256 _id1, uint256 _id2, uint256 _nonce) external{
        require(_exists(_id1) && _exists(_id2),"Must combine existing elements to create a new one");
        bytes32 id1 = bytes32(_id1);
        bytes32 id2 = bytes32(_id2);
        bool r = id1.checkNonce(id2, _nonce);
        require(r, "This nonce does not work to mint this element. The element will not be minted until you find the correct nonce");
        emit NewElement(msg.sender, _id1, _id2, _nonce);
        _mint(msg.sender, uint256(id1.hash(id2, _nonce)));
    }

    /**
    * @notice getLevel returns the score of an element. It's hex strings leading 0s. Since JS will remove them
    * @param _id to lookup
    * @return the # of leading zeros
     */
    function getLevel(uint256 _id) external pure returns(uint8){
        return bytes32(_id).countScore();
    }

}