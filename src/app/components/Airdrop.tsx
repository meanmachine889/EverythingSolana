"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export default function Airdrop() {

    const wallet = useWallet();
    const { connection } = useConnection();

    const [tokenAmount, setTokenAmount] = useState(0);

    const request = () => {
        const pubKey = wallet.publicKey;
        connection.requestAirdrop(pubKey!, tokenAmount * LAMPORTS_PER_SOL);
    }


  return (
    <div className="w-full h-fit px-5 border rounded-xl py-5">
      <div className="space-y-6 h-fit">
        <div className="flex justify-between w-[100%]">
          <p className="self-start text-3xl">Airdrop Solana Tokens</p>
          <Button onClick={request} className="font-normal">Receive</Button>
        </div>
        <div className="space-y-2">
          <Input
            onChange={(e) => setTokenAmount(Number(e.target.value))}
            className="placeholder:text-lg h-16 placeholder:text-gray-500"
            placeholder="Enter token amount"
          />
        </div>
      </div>
    </div>
  );
}
