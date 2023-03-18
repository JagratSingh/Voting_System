pragma solidity ^0.4.17;

contract Voting{

  struct Voter {
    address VoterId;
    uint Aadhaar;
    bool isExist;
  }

  address public manager;
  mapping (address => Voter) voters;
  mapping (uint => bool) AadhaarRegister;
  mapping (address => bool) public voted;
  uint public voterCount;

  uint public AAP=0;
  uint public BJP=0;
  uint public BSP=0;
  uint public INC=0;

  modifier restricted() {
        require(msg.sender == manager);
        _;
    }

  function Voting() public {
    manager = msg.sender;
  }

  function Register(address VoterId, uint Aadhaar) public {
    require ((!voters[VoterId].isExist) && (!AadhaarRegister[Aadhaar]),"User already Registered!!");
    voters[VoterId] = Voter({
      VoterId: VoterId,
      Aadhaar: Aadhaar,
      isExist: true
    });
    AadhaarRegister[Aadhaar] = true;

    voterCount++;
  }

  function Login(address Address, uint Aadhaar) public {
    require((Address == voters[Address].VoterId) && (Aadhaar == voters[Address].Aadhaar), "User Not Registered Yet");
  }

  function VoteTo(string LeaderName) public returns(string){
    require(voters[msg.sender].isExist);
    require(!voted[msg.sender], "User Already Voted");
    if (keccak256(abi.encodePacked(LeaderName)) == keccak256(abi.encodePacked("AAP"))) {
      AAP++;
      voted[msg.sender]=true;
    }else if (keccak256(abi.encodePacked(LeaderName)) == keccak256(abi.encodePacked("BJP"))) {
      BJP++;
      voted[msg.sender]=true;
    }else if (keccak256(abi.encodePacked(LeaderName)) == keccak256(abi.encodePacked("BSP"))) {
      BSP++;
      voted[msg.sender]=true;
    }else if (keccak256(abi.encodePacked(LeaderName)) == keccak256(abi.encodePacked("INC"))) {
      INC++;
      voted[msg.sender]=true;
    }else return "Wrong Input, Try Again!!";
  }

  function PickWinner() public restricted returns(string){
    if (AAP>BJP && AAP>BSP && AAP>INC){
      AAP=BJP=BSP=INC=0;
      return "AAP is the Winner";
    }else if (AAP<BJP && BJP>BSP && BJP>INC){
      AAP=BJP=BSP=INC=0;
      return "BJP is the Winner";
    }else if (AAP<BSP && BJP<BSP && BSP>INC){
      AAP=BJP=BSP=INC=0;
      return "BSP is the Winner";
    }else if (AAP<INC && BJP<INC && BSP<INC){
      AAP=BJP=BSP=INC=0;
      return "INC is the Winner";
    }else return "Election will be held again";
  }

}