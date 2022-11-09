
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;
    constructor() ERC721("Astrono NFT", "Astrono"){}
    function mint(string memory _tokenURI) external returns(uint) {
        require( tokenCount < 1024,"max mint surpassed");
        tokenCount ++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return(tokenCount);
    }
}
