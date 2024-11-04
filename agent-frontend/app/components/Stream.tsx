import { notoSansThai } from "../constants";
import NftSvg from "../svg/NftSvg";
import RequestSvg from "../svg/RequestSvg";
import SendSvg from "../svg/SendSvg";
import SwapSvg from "../svg/SwapSvg";
import TokenSvg from "../svg/TokenSvg";
import WalletSvg from "../svg/WalletSvg";
import { translations } from "../translations";
import { ActionEntry, Language, StreamEntry } from "../types";
import TimeDisplay from "./TimeDisplay";

type StreamEntryItemProps = {
  entry: StreamEntry;
  currentLang: Language;
};

const getActionIcon = (type: ActionEntry["type"]) => {
  switch (type) {
    case "create_wallet":
      return <WalletSvg />;
    case "request_faucet_funds":
      return <RequestSvg />;
    case "get_balance":
      return <WalletSvg />;
    case "swap_token":
      return <SwapSvg />;
    case "transfer_token":
      return <TokenSvg />;
    case "transfer_nft":
      return <NftSvg />;
    case "user":
      return <SendSvg />;
    default:
      return null;
  }
};

function StreamEntryItem({ entry, currentLang }: StreamEntryItemProps) {
  if (entry.type) {
    return (
      <div className="mb-2">
        <TimeDisplay timestamp={entry.timestamp} />
        <div
          className={`flex items-center space-x-2 text-[#5788FA] ${
            currentLang === "th" ? notoSansThai.className : ""
          }`}
        >
          {getActionIcon(entry.type)}
          <span>{entry.content}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="mb-2">
      <TimeDisplay timestamp={entry.timestamp} />
      <div
        className={`text-gray-300 ${
          currentLang === "th" ? notoSansThai.className : ""
        }`}
      >
        {entry.content}
      </div>
    </div>
  );
}

type StreamProps = {
  currentLang: Language;
  streamEntries: StreamEntry[];
  isThinking: boolean;
  loadingDots: string;
};

export default function Stream({
  currentLang,
  streamEntries,
  isThinking,
  loadingDots,
}: StreamProps) {
  return (
    <div className="flex-grow p-4 pb-40 overflow-y-auto">
      <p
        className={`text-zinc-500 ${
          currentLang === "th" ? notoSansThai.className : ""
        }`}
      >
        {translations[currentLang].stream.realTime}
      </p>
      <div className="mt-4 space-y-2" role="log" aria-live="polite">
        {streamEntries.map((entry, index) => (
          <StreamEntryItem
            key={index}
            entry={entry}
            currentLang={currentLang}
          />
        ))}
      </div>
      {isThinking && (
        <div className="flex items-center mt-4 text-[#5788FA] opacity-70">
          <span
            className={`font-mono ${
              currentLang === "th" ? notoSansThai.className : ""
            }`}
          >
            {translations[currentLang].stream.thinking}
            {loadingDots}
          </span>
        </div>
      )}
    </div>
  );
}
