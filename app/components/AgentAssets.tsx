import { useCallback, useEffect, useMemo, useState } from 'react';
import getNfts from '../hooks/useGetNfts';

// TODO: add assets
export default function AgentAssets() {
  const [tab, setTab] = useState('tokens');

  const tokensClass = useMemo(() => {
    if (tab === 'tokens') {
      return 'border-b border-[#5788FA] flex items-center justify-center py-1';
    }
    return ' flex items-center justify-center py-1';
  }, [tab]);

  const nftsClass = useMemo(() => {
    if (tab === 'nft') {
      return 'border-b border-[#5788FA] flex items-center justify-center py-1';
    }
    return ' flex items-center justify-center py-1';
  }, [tab]);

  const createdClass = useMemo(() => {
    if (tab === 'created') {
      return 'border-b border-[#5788FA] flex items-center justify-center py-1';
    }
    return ' flex items-center justify-center py-1';
  }, [tab]);

  const handleTabChange = useCallback((tab: string) => {
    return () => setTab(tab);
  }, []);

  useEffect(() => {
    getNfts();
  }, []);

  return (
    <div className="mr-2 mb-4 rounded-sm bg-black p-4">
      <div className="flex flex-col items-start gap-4">
        <div className="flex w-full grow gap-6 border-zinc-700 border-b">
          <button
            type="button"
            onClick={handleTabChange('tokens')}
            className={tokensClass}
          >
            Tokens
          </button>
          <button
            type="button"
            onClick={handleTabChange('nft')}
            className={nftsClass}
          >
            NFTs
          </button>
          <button
            type="button"
            onClick={handleTabChange('created')}
            className={createdClass}
          >
            Created
          </button>
        </div>

        {tab === 'tokens' ? <div>tokens</div> : <div>nfts</div>}
      </div>
    </div>
  );
}
