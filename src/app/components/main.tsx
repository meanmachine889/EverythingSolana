"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Pizza } from "lucide-react";
import Airdrop from "./Airdrop";
import Balance from "./Balance";
import SendTokens from "./sendTokens";
import SignMsg from "./signMessage";
import Launchpad from "./launchpad";

export default function Main() {
  return (
    <div>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="flex flex-col h-[100vh] justify-start p-9 gap-[4rem] items-center">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
                  <div className="text-2xl sm:text-3xl font-medium flex items-center gap-2">
                    <Pizza size={26} />
                    <span>furiyash</span>
                  </div>
                  <div className="w-full sm:w-auto">
                    <WalletMultiButton className="w-full sm:w-auto" />
                  </div>
                </div>
              </div>
              <div className="flex md:p-7 py-6 flex-col items-center gap-7 justify-start md:w-[80%]">
                <Balance />
                <Launchpad />
                <SendTokens />
                <Airdrop />
                <SignMsg />
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
