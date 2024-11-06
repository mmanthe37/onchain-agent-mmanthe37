import { useBalance } from 'wagmi';
import { AGENT_WALLET_ADDRESS } from '../constants';

export default function AgentBalance() {
  const { data } = useBalance({
    address: AGENT_WALLET_ADDRESS,
    query: { refetchInterval: 5000 },
  });

  return (
    <div className="rounded-sm bg-black border-t p-4 pt-8  border-zinc-700">
      <div className="flex flex-col items-start ">
        <span className="font-bold text-3xl text-[#5788FA]">
          {`${Number.parseFloat(data?.formatted || '').toFixed(6)} ETH`}
        </span>
      </div>
    </div>
  );
}
