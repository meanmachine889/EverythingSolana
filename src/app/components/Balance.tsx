"use client";

import { Button } from "@/components/ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function Balance() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [Balance, setBalance] = useState(0);

  const getBalance = async () => {
    const res = await connection.getBalance(wallet.publicKey!);
    const sol = res / LAMPORTS_PER_SOL;
    setBalance(sol);
  };

  useEffect(() => {
    getBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return (
    <div className="w-full h-fit px-5 border rounded-xl py-5">
      <div className="space-y-6 h-fit">
        <div className="flex justify-between w-[100%]">
          <p className="self-start text-3xl">Account Details</p>
          <Button
            onClick={getBalance}
            className=""
          >
            Refresh
          </Button>
        </div>
        <div className="flex flex-col text-lg bg-zinc-900 p-5 rounded-xl gap-5 w-[100%]">
          {wallet.publicKey ? (
            <>
              <p className="text-gray-300 text-xl">
                <span className="text-gray-400 text-lg">Public Key</span> :{" "}
                {wallet.publicKey!.toBase58()}
              </p>
              <p className="text-gray-300 text-xl">
                {" "}
                <span className="text-gray-400 text-lg">Balance</span> :{" "}
                {Balance} <span className="text-gray-400 text-lg">SOL</span>
              </p>
            </>
          ) : (
            <p className="text-gray-400">Please connect wallet</p>
          )}
        </div>
      </div>
    </div>
  );
}
