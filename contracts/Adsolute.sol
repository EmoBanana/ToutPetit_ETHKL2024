pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Adsolute is Ownable, ReentrancyGuard {
    IERC20 public adsToken;

    address public constant OWNER_ADDRESS = 0x54609ff7660d8bF2F6c2c6078dae2E7f791610b4;
    uint256 public constant TOKENS_PER_AD = 1 * 10**18; // 1 token per ad
    uint256 public constant STAKE_AMOUNT = 20 * 10**18; // 20 tokens to stake
    uint256 public constant INTERACTION_COST = 1 * 10**18; // 1 token for interactions

    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isCreator;
    mapping(address => uint256) public lastAdWatchTime;

    event TokensMinted(address indexed user, uint256 amount);
    event TokensBurned(address indexed user, uint256 amount);
    event CreatorStaked(address indexed creator);
    event CreatorRewarded(address indexed creator, uint256 amount);
    event NFTPurchased(address indexed user, uint256 tokenCost);

    constructor(address _adsTokenAddress) Ownable(msg.sender) {
        adsToken = IERC20(_adsTokenAddress);
    }

    function mintTokensForAd(address user) external onlyOwner {
        require(lastAdWatchTime[user] + 1 minutes <= block.timestamp, "Too soon to watch another ad");
        adsToken.transfer(user, TOKENS_PER_AD);
        lastAdWatchTime[user] = block.timestamp;
        emit TokensMinted(user, TOKENS_PER_AD);
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

    function rewardCreator(address creator, uint256 viewCount) external onlyOwner {
        require(isCreator[creator], "Not a creator");
        uint256 reward = viewCount * TOKENS_PER_AD;
        adsToken.transfer(creator, reward);
        emit CreatorRewarded(creator, reward);
    }

    function isUserCreator(address user) external view returns (bool) {
        return isCreator[user];
    }
}
