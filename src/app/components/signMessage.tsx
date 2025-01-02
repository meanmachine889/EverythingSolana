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
        <div className="flex justify-between w-[100%]">
          <p className="self-start text-3xl">Sign Message</p>
          <Button
            onClick={SignMessage}
            className=""
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
