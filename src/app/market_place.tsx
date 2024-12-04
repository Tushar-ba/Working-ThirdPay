'use client';
import { getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { client } from "./client";
import { chain } from "./chain";

export default function Home1() {
  const contract = getContract({
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

  const listing = async () => {
    try {
      const transaction =  prepareContractCall({
        contract,
        method: "function createListing(address,uint256,uint256,bool)",
        params: [
          "0x14Ec70b86852B030C7411f73F9C026AFA89875d1",
          1,
          1,
          true
        ]
      });
      console.log("Transaction prepared:", transaction);
      sendTx(transaction);
    } catch (error) {
      console.error("Error during transaction preparation:", error);
    }
  };

  return (
    <div>
      <button onClick={listing}>Create Listing</button>
    </div>
  );
}
