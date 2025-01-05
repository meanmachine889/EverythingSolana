"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export default function Launchpad() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [initialSupply, setInitialSupply] = useState(0);
  const [decimals, setDecimals] = useState(9);

  const { connection } = useConnection();

  const wallet = useWallet();

  async function CreateToken() {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const keypair = Keypair.generate();

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey!,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(
        keypair.publicKey,
        decimals,
        wallet.publicKey!,
        wallet.publicKey!,
        TOKEN_PROGRAM_ID
      )
    );

    transaction.feePayer = wallet.publicKey!;
    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

    transaction.partialSign(keypair);
    const response = await wallet.sendTransaction(transaction, connection);
    console.log(response);
    alert(response);
  }

  return (
    <div className="w-full h-fit px-5 border rounded-xl p-5">
      <div className="space-y-6 h-fit">
        <div className="flex justify-between w-[100%]">
          <p className="self-start text-3xl">Launch Solana Tokens</p>
          <Button className="font-normal" onClick={CreateToken}>Launch</Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="tokenName"
              className="text-lg font-normal text-zinc-500"
            >
              Token Name
            </Label>
            <Input
              id="tokenName"
              onChange={(e) => setTokenName(e.target.value)}
              value={tokenName}
              className="placeholder:text-lg h-16 placeholder:text-gray-500"
              placeholder="Enter token name"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="tokenSymbol"
              className="text-lg font-normal text-zinc-500"
            >
              Token Symbol
            </Label>
            <Input
              id="tokenSymbol"
              onChange={(e) => setTokenSymbol(e.target.value)}
              value={tokenSymbol}
              className="placeholder:text-lg h-16 placeholder:text-gray-500"
              placeholder="Enter token symbol"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-lg font-normal text-zinc-500">
              Image URL
            </Label>
            <Input
              id="url"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              className="placeholder:text-lg h-16 placeholder:text-gray-500"
              placeholder="Enter image url"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="initialSupply"
              className="text-lg font-normal text-zinc-500"
            >
              Initial Supply
            </Label>
            <Input
              id="initialSupply"
              type="number"
              onChange={(e) => setInitialSupply(Number(e.target.value))}
              value={initialSupply}
              className="placeholder:text-lg h-16 placeholder:text-gray-500"
              placeholder="Enter initial supply"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="decimals"
              className="text-lg font-normal text-zinc-500"
            >
              Decimals
            </Label>
            <Input
              id="decimals"
              type="number"
              onChange={(e) => setDecimals(Number(e.target.value))}
              value={decimals}
              className="placeholder:text-lg h-16 placeholder:text-gray-500"
              placeholder="Enter decimals"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
