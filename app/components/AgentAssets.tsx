import { Token, TokenRow } from '@coinbase/onchainkit/token';
import { useCallback, useEffect, useState } from 'react';
// import useGetNFTs from "../hooks/useGetNFTs";
import type { Address } from 'viem';
import { useToken } from 'wagmi';
import useGetTokens from '../hooks/useGetTokens';

type AgentTokenProps = {
  tokenAddress: Address;
};

function AgentToken({ tokenAddress }: AgentTokenProps) {
  const { data } = useToken({ address: tokenAddress, chainId: 84532 });
  const token: Token = {
    address: tokenAddress,
    chainId: 84532,
    decimals: data?.decimals || 0,
    name: data?.name || '',
    symbol: data?.symbol || '',
    image: '',
  };

  return <TokenRow token={token} className="rounded max-w-56" />;
}
export default function AgentAssets() {
  const [tab, setTab] = useState('tokens');
  // const [nfts, setNFTs] = useState<string[]>([]);
  const [tokens, setTokens] = useState<Address[]>([]);

  const { getTokens } = useGetTokens({ onSuccess: setTokens });
  // const { getNFTs } = useGetNFTs({ onSuccess: setNFTs });

  const handleTabChange = useCallback((tab: string) => {
    return () => setTab(tab);
  }, []);

  useEffect(() => {
    // getNFTs();
    getTokens();
  }, [getTokens]);

  return (
    <div className="mr-2 mb-4 rounded-sm bg-black p-4">
      <div className="flex flex-col items-start gap-4">
        <div className="flex w-full grow gap-6 border-zinc-700 border-b">
          {/* <button
            type="button"
            onClick={handleTabChange("nfts")}
            className={`flex items-center justify-center py-1 ${
              tab === "nfts" ? "border-b border-[#5788FA]" : ""
            }`}
          >
            NFTs
          </button> */}
          <button
            type="button"
            onClick={handleTabChange('tokens')}
            className={`flex items-center justify-center py-1 ${
              tab === 'tokens' ? 'border-b border-[#5788FA]' : ''
            }`}
          >
            Tokens
          </button>
        </div>

        {tab === 'tokens' &&
          tokens &&
          tokens?.map((token) => (
            <AgentToken key={token} tokenAddress={token} />
          ))}
      </div>
    </div>
  );
}
