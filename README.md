NFT Alchemy
===========
By: Carson Case

Contract Address/ Deployed Dapp
-------------------------------
Contract (Kovan)    - 0x183B1C66f3526D91fDea08BFCB9eA7ed392e6E59 
WebApp              - http://71.94.82.7:8080/my-lab

more deployment details in deployment.txt. Also website may not always remain up until a mainnet launch

Backend
-------
Backend is written in NestJS. I'll admit, I don't know much about NestJS, and mostly copy pasted my way into this. However, working with it was pretty interesting and I'd be interested in working with it more as a replacement for Express in larger projects. Smaller ones like this however, I feel like a simple express router would have been more appropriate. Also MongoDB is used for database. Get endpoints are as follows:  
- /element/elements Returns a list of all elements
- /element/:id Returns a specific elment by it's hash

Frontend
--------
Written with Vue JS. I really should learn React more instead but I just like Vue. Uses Vueitify for styling although I'll admit I'm not a huge fan of vueitify, and think bootstrap/tailwind is better. Either way, didn't spend tons of time with styling

Smart Contracts
---------------
Two smart contracts. The elments contract and a "mining" library. Mining library was particularly interesting to make as I got to work with bytes in a rather lowlevel way which was cool. I also wanted the 3 elements of a hash (element ID 1, element ID 2 and a nonce) to produce the same hash independant of order, so that was an interesting challenge. Found XOR was not secure so instead settled on sorting the elements and wrote a buble sort for the first time since uni.  
The elements contract is a simple ERC721 contract that mints a new ERC721 if you combine two elements and a nonce to create a hash (as per the mining library) with as many leading zeros as the sum of the combination elements leading zeros + 1. For ex. combining 0x00ab3f2... + 0x034fa21... Would require a nonce that produces a hash that starts with 4 leading 0s.