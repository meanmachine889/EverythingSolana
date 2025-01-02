import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Launchpad() {
  return (
    <div className="w-full h-fit px-5">
      <div className="space-y-6 h-fit">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="tokenName" className="text-lg font-normal text-zinc-500">
              Token Name
            </Label>
            <Input 
              id="tokenName" 
              className="placeholder:text-lg h-16 placeholder:text-gray-500"
              placeholder="Enter token name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tokenSymbol" className="text-lg font-normal text-zinc-500">
              Token Symbol
            </Label>
            <Input 
              id="tokenSymbol" 
              className="placeholder:text-lg h-16 placeholder:text-gray-500"
              placeholder="Enter token symbol"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="decimals" className="text-lg font-normal text-zinc-500">
              Decimals
            </Label>
            <Input 
              id="decimals" 
              type="number"
              className="placeholder:text-lg h-16 placeholder:text-gray-500"
              placeholder="Enter decimals"
              defaultValue="18"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialSupply" className="text-lg font-normal text-zinc-500">
              Initial Supply
            </Label>
            <Input 
              id="initialSupply" 
              type="number"
              className="placeholder:text-lg h-16 placeholder:text-gray-500"
              placeholder="Enter initial supply"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageAddress" className="text-lg font-normal text-zinc-500">
              Image
            </Label>
            <div className="w-full h-[120px]  rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-zinc-500 transition-colors">
              <span className="text-zinc-400">Upload image</span>
            </div>
            <p className="text-xs text-zinc-400">Most meme coin use a squared 1000x1000 logo</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-lg font-normal text-zinc-500">
              Description
            </Label>
            <textarea 
              id="description"
              className="w-full h-[120px] text-lg bg-[#080808] ring-1 placeholder:text-lg ring-slate-800   p-5 border-none outline-none rounded-xl text-zinc-200 placeholder-zinc-500 focus:ring-0 resize-none"
              placeholder="Enter token description"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

