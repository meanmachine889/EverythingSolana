"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import bs58 from "bs58";
import {ed25519} from "@noble/curves/ed25519"

export default function SignMsg() {
  const [message, setMessage] = useState("default message");

  const { publicKey, signMessage } = useWallet();

  const SignMessage = async () => {
    if(!publicKey){
        alert("Please connect wallet first");
    }
    if(!signMessage){
        alert("Sign message not available");
    }
    const encodedMsg = new TextEncoder().encode(message);
    const signature = await signMessage!(encodedMsg);

    if(!ed25519.verify(signature, encodedMsg, publicKey!.toBytes())){
        alert("Signature verification failed");
    }

    alert(`Message signed successfully with signature: ${bs58.encode(signature)}`);
  };

  return (
    <div className="w-full h-fit px-5 border rounded-xl py-5">
      <div className="space-y-6 h-fit">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-2xl sm:text-3xl font-normal">Sign Message</p>
          <Button
            onClick={SignMessage}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Sign
          </Button>
        </div>
        <div className="space-y-2">
          <Input
            id="message"
            onChange={(e) => setMessage(e.target.value)}
            className="placeholder:text-lg h-16 placeholder:text-gray-500"
            placeholder="Enter message"
          />
        </div>
      </div>
    </div>
  );
}
