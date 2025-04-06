// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auth {
    struct User {
        string username;
        bytes32 passwordHash;
        string privateShare;
        string role;
        bool exists;
    }
    
    mapping(string => User) private users;
    
    event UserRegistered(string username, string role);
    
    function registerUser(
        string memory _username,
        bytes32 _passwordHash,
        string memory _privateShare,
        string memory _role
    ) public {
        require(!users[_username].exists, "Username already taken");
        
        users[_username] = User({
            username: _username,
            passwordHash: _passwordHash,
            privateShare: _privateShare,
            role: _role,
            exists: true
        });
        
        emit UserRegistered(_username, _role);
    }
    
    // function verifyUser(
    //     string memory _username,
    //     bytes32 _passwordHash,
    //     string memory _privateShare
    // ) public view returns (bool isValid, string memory role) {
    //     User memory user = users[_username];
        
    //     if (!user.exists) {
    //         return (false, "");
    //     }
        
    //     // Compare password hash and private share
    //     bool passwordMatch = user.passwordHash == _passwordHash;
    //     bool shareMatch = keccak256(abi.encodePacked(user.privateShare)) == 
    //                      keccak256(abi.encodePacked(_privateShare));
        
    //     if (passwordMatch && shareMatch) {
    //         return (true, user.role);
    //     }
        
    //     return (false, "");
    // }
    function verifyUser(
    string memory _username, 
    bytes32 _passwordHash, 
    string memory _privateShare
) public view returns (bool) {
    require(users[_username].exists, "User does not exist");
    require(users[_username].passwordHash == _passwordHash, "Invalid Password");
    require(keccak256(abi.encodePacked(users[_username].privateShare)) == keccak256(abi.encodePacked(_privateShare)), "Invalid Private Share");

    return true;
}

}