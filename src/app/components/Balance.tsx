"use client"

import { Button } from "@/components/ui/button"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"

export default function Balance() {
  const wallet = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = useState(0)

  const getBalance = async () => {
    if (wallet.publicKey) {
      const res = await connection.getBalance(wallet.publicKey)
      const sol = res / LAMPORTS_PER_SOL
      setBalance(sol)
    }
  }

  useEffect(() => {
    getBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet])

  return (
    <div className="w-[100%] md:max-w-[100%]">
      <div className="border rounded-xl p-4 sm:p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-2xl sm:text-3xl font-normal">Account Details</p>
            <Button
              onClick={getBalance}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Refresh
            </Button>
          </div>
          <div className="flex flex-col text-base sm:text-lg bg-zinc-900 p-4 sm:p-5 rounded-xl gap-4 sm:gap-5 w-full">
            {wallet.publicKey ? (
              <>
                <div>
                  <p className="text-gray-400 mb-1">Public Key</p>
                  <p className="text-gray-300 break-all">{wallet.publicKey.toBase58()}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Balance</p>
                  <p className="text-gray-300">
                    {balance} <span className="text-gray-400">SOL</span>
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-400">Please connect wallet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

