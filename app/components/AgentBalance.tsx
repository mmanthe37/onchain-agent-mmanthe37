import { useBalance } from 'wagmi';
import { AGENT_WALLET_ADDRESS } from '../constants';

export default function AgentBalance() {
  const { data } = useBalance({
    address: AGENT_WALLET_ADDRESS,
    query: { refetchInterval: 5000 },
  });

  return (
    <div className="rounded-sm border-zinc-700">
      <span className="text-base text-[#5788FA]">
        {`${Number.parseFloat(data?.formatted || '').toFixed(6)} ETH`}
      </span>
    </div>
  );
}
