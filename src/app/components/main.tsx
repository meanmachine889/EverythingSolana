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
              <div className="flex justify-between w-[80%] px-5">
                <div className="text-3xl font-medium flex gap-2 items-center">
                  <Pizza size={26} />
                  furiyash
                </div>
                <div className="flex gap-3">
                  <WalletMultiButton className="" />
                </div>
              </div>
              <div className="flex p-7 py-6 flex-col items-center gap-7 justify-start w-[80%]">
                
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
