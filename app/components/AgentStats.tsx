import { AGENT_WALLET_ADDRESS, notoSansThai } from "../constants";
import { translations } from "../translations";
import { Language } from "../types";
import { useBalance } from "wagmi";

type AgentStats = {
  currentLanguage: Language;
};

const dummyStats = {
  earned: 10000,
  spent: 4000,
  nftsOwned: 3,
  tokensOwned: 0,
  transactions: 0,
  thoughts: 900,
}

export default function AgentStats({
  currentLanguage,
}: AgentStats) {
  const { data } = useBalance({ address: AGENT_WALLET_ADDRESS });
  return (
    <div className="mb-4 mr-2 bg-black border border-[#5788FA]/50 rounded-sm">
      <div className="flex flex-col items-start p-4">
        <span className="text-2xl font-bold text-[#5788FA]">
          {`${parseFloat(data?.formatted || "").toFixed(6)} ETH`}
        </span>
        {/* TODO: update with actual data */}
        <ul className="space-y-1 pt-4">
          <li
            className={currentLanguage === "th" ? notoSansThai.className : ""}
          >
            {translations[currentLanguage].profile.stats.earned}: $
            {dummyStats.earned.toFixed(2)}
          </li>
          <li
            className={currentLanguage === "th" ? notoSansThai.className : ""}
          >
            {translations[currentLanguage].profile.stats.spent}: $
            {dummyStats.spent.toFixed(2)}
          </li>
          <li
            className={currentLanguage === "th" ? notoSansThai.className : ""}
          >
            {translations[currentLanguage].profile.stats.nfts}:{" "}
            {dummyStats.nftsOwned}
          </li>
          <li
            className={currentLanguage === "th" ? notoSansThai.className : ""}
          >
            {translations[currentLanguage].profile.stats.tokens}:{" "}
            {dummyStats.tokensOwned}
          </li>
          <li
            className={currentLanguage === "th" ? notoSansThai.className : ""}
          >
            {translations[currentLanguage].profile.stats.transactions}:{" "}
            {dummyStats.transactions}
          </li>
        </ul>
      </div>
    </div>
  );
}
