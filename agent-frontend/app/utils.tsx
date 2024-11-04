import { ActionEntry } from "./types";
import NftSvg from "./svg/NftSvg";
import RequestSvg from "./svg/RequestSvg";
import SendSvg from "./svg/SendSvg";
import SwapSvg from "./svg/SwapSvg";
import TokenSvg from "./svg/TokenSvg";
import WalletSvg from "./svg/WalletSvg";

export const getActionIcon = (type: ActionEntry["type"]) => {
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
