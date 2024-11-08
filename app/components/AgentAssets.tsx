import { type Token, TokenRow } from '@coinbase/onchainkit/token';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useGetNFTs from '../hooks/useGetNFTs';
import { erc721Abi, type Address } from 'viem';
import { useContractRead, useToken } from 'wagmi';
import useGetTokens from '../hooks/useGetTokens';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { NFTCollectionTitle } from '@coinbase/onchainkit/nft/mint';

type AgentAssetProps = {
  tokenAddress: Address;
};

function AgentToken({ tokenAddress }: AgentAssetProps) {
  const { data } = useToken({ address: tokenAddress, chainId: 84532 });
  const token: Token = {
    address: tokenAddress,
    chainId: 84532,
    decimals: data?.decimals || 0,
    name: data?.name || '',
    symbol: data?.symbol || '',
    image: '',
  };

  return <TokenRow token={token} className="max-w-56 rounded font-mono" />;
}

function AgentNFT({ tokenAddress }: AgentAssetProps) {
  const { data: name } = useContractRead({
    address: tokenAddress,
    abi: erc721Abi,
    functionName: 'name',
    chainId: 84532,
  });

  const nftData = useMemo(() => {
    return {
      name,
    };
  }, [name]);

  if (!name) {
    return null;
  }

  return (
    <NFTMintCard contractAddress={tokenAddress} useNFTData={() => nftData}>
      <NFTCollectionTitle className="font-mono text-sm" />
    </NFTMintCard>
  );
}
export default function AgentAssets() {
  const [tab, setTab] = useState('tokens');
  const [nfts, setNFTs] = useState<Address[]>([]);
  const [tokens, setTokens] = useState<Address[]>([]);

  const { getTokens } = useGetTokens({ onSuccess: setTokens });
  const { getNFTs } = useGetNFTs({ onSuccess: setNFTs });

  const handleTabChange = useCallback((tab: string) => {
    return () => setTab(tab);
  }, []);

  useEffect(() => {
    getNFTs();
    getTokens();
  }, [getNFTs, getTokens]);

  return (
    <div className="mr-2 mb-4 rounded-sm bg-black p-4">
      <div className="flex flex-col items-start gap-4">
        <div className="flex w-full grow gap-6 border-zinc-700 border-b">
          <button
            type="button"
            onClick={handleTabChange('nfts')}
            className={`flex items-center justify-center py-1 ${
              tab === 'nfts' ? 'border-b border-[#5788FA]' : ''
            }`}
          >
            NFTs
          </button>
          <button
            type="button"
            onClick={handleTabChange('tokens')}
            className={`flex items-center justify-center py-1 ${
              tab === 'tokens' ? 'border-[#5788FA] border-b' : ''
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

        {tab === 'nfts' && nfts && (
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4">
            {nfts?.map((nft) => (
              <AgentNFT key={nft} tokenAddress={nft} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
