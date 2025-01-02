"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

export default function SendTokens() {
  const wallet = useWallet();

  const [tokenAmount, setTokenAmount] = useState(0);
  const [receiverAddress, setReceiverAddress] = useState("");

  const { connection } = useConnection();

  const sendTransaction = async () => {
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey!,
        toPubkey: new PublicKey(receiverAddress),
        lamports: tokenAmount * LAMPORTS_PER_SOL,
      })
    );
    await wallet.sendTransaction(transaction, connection!);
    alert("Transaction sent successfully");
  };

  return (
    <div className="w-full h-fit px-5 border rounded-xl py-5">
      <div className="space-y-6 h-fit">
        <div className="flex justify-between w-[100%]">
          <p className="self-start text-3xl">Transfer Solana</p>
          <Button
            onClick={sendTransaction}
            className=""
          >
            Send
          </Button>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="address"
            className="text-lg font-normal text-zinc-500"
          >
            Receiver Address
          </Label>
          <Input
            id="address"
            onChange={(e) => setReceiverAddress(e.target.value)}
            className="placeholder:text-lg h-16 placeholder:text-gray-500"
            placeholder="Enter receiver's address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-lg font-normal text-zinc-500">
            Amount
          </Label>
          <Input
            id="amount"
            onChange={(e) => setTokenAmount(Number(e.target.value))}
            className="placeholder:text-lg h-16 placeholder:text-gray-500"
            placeholder="Enter the amount of sol"
          />
        </div>
      </div>
    </div>
  );
}
