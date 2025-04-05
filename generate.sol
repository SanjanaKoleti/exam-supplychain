// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PacketManager {

    struct Packet {
        uint256 packetId;
        string printCenter;
        uint256 batchNo;
        string destinationCenter;
        int256 destinationLat;   // Scaled by 1e6 (store 12.345678 as 12345678)
        int256 destinationLong;  // Same as above
        uint256 createdAt;
        bool exists;
    }

    mapping(uint256 => Packet) public packets;

    event PacketCreated(
        uint256 packetId,
        string printCenter,
        uint256 batchNo,
        string destinationCenter,
        int256 destinationLat,
        int256 destinationLong,
        uint256 createdAt
    );

    function createPacket(
        uint256 _packetId,
        string memory _printCenter,
        uint256 _batchNo,
        string memory _destinationCenter,
        int256 _destinationLat,     // send lat * 1e6
        int256 _destinationLong     // send long * 1e6
    ) public {
        require(!packets[_packetId].exists, "Packet already exists");

        packets[_packetId] = Packet({
            packetId: _packetId,
            printCenter: _printCenter,
            batchNo: _batchNo,
            destinationCenter: _destinationCenter,
            destinationLat: _destinationLat,
            destinationLong: _destinationLong,
            createdAt: block.timestamp,
            exists: true
        });

        emit PacketCreated(
            _packetId,
            _printCenter,
            _batchNo,
            _destinationCenter,
            _destinationLat,
            _destinationLong,
            block.timestamp
        );
    }
}
