// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Adsolute is Ownable, ReentrancyGuard {
    IERC20 public adsToken;

    address public constant OWNER_ADDRESS = 0x54609ff7660d8bF2F6c2c6078dae2E7f791610b4;
    uint256 public constant TOKENS_PER_AD = 1 * 10**18;
    uint256 public constant STAKE_AMOUNT = 20 * 10**18;
    uint256 public constant INTERACTION_COST = 1 * 10**18;

    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isCreator;
    mapping(address => uint256) public lastAdWatchTime;

    event TokensMinted(address indexed user, uint256 amount);
    event TokensBurned(address indexed user, uint256 amount);
    event CreatorStaked(address indexed creator);
    event CreatorRewarded(address indexed creator, uint256 amount);
    event NFTPurchased(address indexed user, uint256 tokenCost);

    constructor(address _adsTokenAddress) Ownable(msg.sender) {
        require(_adsTokenAddress != address(0), "Invalid token address");
        adsToken = IERC20(_adsTokenAddress);
    }

    function mintTokensForAd(address user, address creator) external onlyOwner {
        require(user != address(0), "Invalid user address");
        require(creator != address(0), "Invalid creator address");
        
        uint256 amount = TOKENS_PER_AD;
        
        adsToken.transfer(user, amount);
        adsToken.transfer(creator, amount);
        
        emit TokensMinted(user, amount);
        emit TokensMinted(creator, amount);
    }

    function burnTokensForInteraction(address user) external onlyOwner {
        require(adsToken.balanceOf(user) >= INTERACTION_COST, "Insufficient balance");
        adsToken.transferFrom(user, address(this), INTERACTION_COST);
        emit TokensBurned(user, INTERACTION_COST);
    }

    function burnTokensForNFTPurchase(address user, uint256 tokenCost) external onlyOwner {
        require(adsToken.balanceOf(user) >= tokenCost, "Insufficient balance");
        adsToken.transferFrom(user, address(this), tokenCost);
        emit TokensBurned(user, tokenCost);
        emit NFTPurchased(user, tokenCost);
    }

    function stakeForCreator() external nonReentrant {
        require(!hasStaked[msg.sender], "Already staked");
        require(adsToken.balanceOf(msg.sender) >= STAKE_AMOUNT, "Insufficient balance for staking");
        adsToken.transferFrom(msg.sender, address(this), STAKE_AMOUNT);
        hasStaked[msg.sender] = true;
        isCreator[msg.sender] = true;
        emit CreatorStaked(msg.sender);
    }

    function isUserCreator(address user) external view returns (bool) {
        return isCreator[user];
    }
}
