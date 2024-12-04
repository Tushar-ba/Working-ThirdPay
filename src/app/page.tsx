"use client";
import { getContract, prepareContractCall } from "thirdweb";
import { ConnectButton, useSendTransaction } from "thirdweb/react";
import { client } from "./client";
import { chain } from "./chain";

export default function Home() {
  const contract = getContract({
    client: client, 
    address: "0x14Ec70b86852B030C7411f73F9C026AFA89875d1",
    chain: chain, 
  });

  const contract1 = getContract({
    client: client,
    address: "0x4C033EB7Baf936cF2FFED08D1C948106641095cf",
    chain: chain,
  });


  const { mutate: sendTx } = useSendTransaction({
    payModal: {
      buyWithFiat: {
        prefillSource: {
          currency: "USD",
        },
        testMode: true,
      },
    },
  });


  const mintNFT = async () => {
    try {
      const transaction = prepareContractCall({
        contract:contract,
        method: "function mintToken(address, string, address[], uint256[])",
        params: [
          "0x49f51e3C94B459677c3B1e611DB3E44d4E6b1D55",
          "THIS IS A TEST",
          ["0x6803549eBe803518906B54Be4F2f837D39Cb1Cce", "0x6cE8a476Ad1b83e66f7ff20B2744d5262d392273"],
          [10, 10],
        ],
      });
      console.log("Transaction prepared:", transaction);
      sendTx({ ...transaction });
    } catch (error) {
      console.error("Mint NFT error:", error);
    }
  };
  const addRecipient = async () => {
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function addRecipients(uint256, address[], uint256[])",
        params: [
          1,
          ["0x6803549eBe803518906B54Be4F2f837D39Cb1Cce", "0x6cE8a476Ad1b83e66f7ff20B2744d5262d392273"],
          [10, 10],
        ],
      });
      console.log("Transaction prepared:", transaction);
      sendTx({ ...transaction });
    } catch (error) {
      console.error("Mint NFT error:", error);
    }
  };
  const removeRecipient = async () => {
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function removeRecipients(uint256, address[])",
        params: [
          1,
          ["0x6803549eBe803518906B54Be4F2f837D39Cb1Cce", "0x6cE8a476Ad1b83e66f7ff20B2744d5262d392273"],
        ],
      });
      console.log("Transaction prepared:", transaction);
      sendTx({ ...transaction });
    } catch (error) {
      console.error("Mint NFT error:", error);
    }
  };
  const approvalToContract = async () => {
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function approve(address, uint256)",
        params: [
          "0x4C033EB7Baf936cF2FFED08D1C948106641095cf",
          1,
        ],
      });
      console.log("Transaction prepared:", transaction);
      sendTx(transaction);
    } catch (error) {
      console.error("Mint NFT error:", error);
    }
  };

  const _grantRole = async () => {
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function grantRole(bytes32, address)",
        params: [
          "0x4c845bd8367732455594e4267d2660f9c3f2cbb53288e8c2f3ec69276e9a440a",
          "0x4C033EB7Baf936cF2FFED08D1C948106641095cf",
        ],
      });
      console.log("Transaction prepared:", transaction);
      sendTx(transaction);
    } catch (error) {
      console.error("Mint NFT error:", error);
    }
  };

  const listing = async () => {
    try {
      const transaction =  prepareContractCall({
        contract: contract1,
        method: "function createListing(address,uint256,uint256,bool)",
        params: [
          "0x14Ec70b86852B030C7411f73F9C026AFA89875d1",
          1,
          1,
          true,
        ],
      });
      console.log("Full Transaction Details:", JSON.stringify(transaction, null, 2));
    console.log("Contract Address:", contract1.address);
      console.log("Transaction prepared:", transaction);
      const result = sendTx(
        { ...transaction },
        {
          onSuccess: (result) => {
            console.log("Transaction successful:", result);
          },
          onError: (error) => {
            console.error("Transaction error:", error);
          }
        }
      );
      
      console.log("Transaction result:", result);
    } catch (error) {
      console.error("Error during transaction preparation:", error);
    }
  };

  const removeListing = async ()=>{
    try {
      const transaction = prepareContractCall({
        contract:contract1,
        method:("function removeListing(uint256)"),
        params:[2],
      })
      const result = sendTx(
        { ...transaction },
        {
          onSuccess: (result) => {
            console.log("Transaction successful:", result);
          },
          onError: (error) => {
            console.error("Transaction error:", error);
          }
        }
      );
      console.log("Transaction result:", result);
      console.log("Sent transaction")
    } catch (error) {
      console.error(error)
    }
  }

  

  return (
    <>
      <ConnectButton client={client} />
      <button onClick={mintNFT}>Mint the NFT</button>
      <button onClick={addRecipient}>addRecipient</button>
      <button onClick={removeRecipient}>Remove </button>
      <button onClick={_grantRole}>grant role</button>
      <button onClick={approvalToContract}>Approve</button>
      <button onClick={listing}>Create Listing</button>
      <button onClick={removeListing}>Remove Listing</button>
    </>
  );
}
