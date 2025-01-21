"use client";

import { Button } from "@/components/ui/button";
import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export default function Launchpad() {
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
        9,
        wallet.publicKey!,
        wallet.publicKey!,
        TOKEN_PROGRAM_ID
      )
    );

    transaction.feePayer = wallet.publicKey!;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    transaction.partialSign(keypair);
    const response = await wallet.sendTransaction(transaction, connection);
    console.log(response);
    alert(response);
  }

  return (
    <div className="w-full h-fit px-5 border rounded-xl p-5">
      <div className="space-y-6 h-fit">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-2xl sm:text-3xl font-normal">Launch Solana Tokens</p>
          <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90" onClick={CreateToken}>Launch</Button>
        </div>
      </div>
    </div>
  );
}
