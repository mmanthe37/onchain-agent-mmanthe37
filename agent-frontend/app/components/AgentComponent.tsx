import { useState, useEffect, useCallback } from "react";

import { translations } from "../translations";
import Navbar from "./Navbar";
import {
  ActionEntry,
  AnimatedData,
  Language,
  StreamEntry,
  ThoughtEntry,
} from "../types";
import Stream from "./Stream";
import ChatInput from "./ChatInput";
import Footer from "./Footer";
import AgentProfile from "./AgentProfile";
import AgentStats from "./AgentStats";

const generateRandomThought = (currentLanguage: Language): ThoughtEntry => {
  const thoughts = [
    translations[currentLanguage].thoughts.analyzing,
    translations[currentLanguage].thoughts.processing,
    translations[currentLanguage].thoughts.optimizing,
    translations[currentLanguage].thoughts.generating,
    translations[currentLanguage].thoughts.evaluating,
    translations[currentLanguage].thoughts.simulating,
  ];
  return {
    timestamp: new Date(),
    content: thoughts[Math.floor(Math.random() * thoughts.length)],
  };
};

const generateRandomAction = (currentLanguage: Language): ActionEntry => {
  const actions = [
    {
      type: "create_wallet" as const,
      content: `${translations[currentLanguage].actions.createWallet} 0x453b...3432`,
    },
    {
      type: "request_faucet_funds" as const,
      content: translations[currentLanguage].actions.requestFunds,
    },
    {
      type: "get_balance" as const,
      content: `0x4534...d342${translations[currentLanguage].actions.getBalance} 1003.45 USDC`,
    },
    {
      type: "transfer_token" as const,
      content: `${translations[currentLanguage].actions.transferToken} 100 USDC ${translations[currentLanguage].actions.to} 0x1234...5678`,
    },
    {
      type: "transfer_nft" as const,
      content: `${translations[currentLanguage].actions.transferNft} #1234 ${translations[currentLanguage].actions.to} 0x5678...9012`,
    },
    {
      type: "swap_token" as const,
      content: `${translations[currentLanguage].actions.swapToken} 10 ETH ${translations[currentLanguage].actions.to} 15000 USDC`,
    },
  ];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  return {
    timestamp: new Date(),
    type: randomAction.type,
    content: randomAction.content,
  };
};

export default function Component() {
  const [streamEntries, setStreamEntries] = useState<StreamEntry[]>([]);
  const [userInput, setUserInput] = useState("");
  const [animatedData, setAnimatedData] = useState<AnimatedData>({
    earned: 10000,
    spent: 4000,
    nftsOwned: 3,
    tokensOwned: 0,
    transactions: 0,
    thoughts: 900,
  });
  const [walletBalance, setWalletBalance] = useState(5000); // Initial wallet balance
  const [isThinking, setIsThinking] = useState(true);
  const [loadingDots, setLoadingDots] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [isLiveDotVisible, setIsLiveDotVisible] = useState(true);

  useEffect(() => {
    const streamInterval = setInterval(() => {
      setIsThinking(true);
      setTimeout(() => {
        const newEntry =
          Math.random() > 0.3
            ? generateRandomThought(currentLanguage)
            : generateRandomAction(currentLanguage);
        setStreamEntries((prevEntries) =>
          [...prevEntries, newEntry].slice(-10)
        );
        setAnimatedData((prev) => ({
          ...prev,
          thoughts: prev.thoughts + (newEntry.type === undefined ? 1 : 0),
          transactions:
            prev.transactions + (newEntry.type !== undefined ? 1 : 0),
        }));
        setIsThinking(false);
      }, 1500);
    }, 3000);

    const dataInterval = setInterval(() => {
      setAnimatedData((prev) => ({
        earned: prev.earned + Math.random() * 10,
        spent: prev.spent + Math.random() * 5,
        nftsOwned: prev.nftsOwned + (Math.random() > 0.95 ? 1 : 0),
        tokensOwned: prev.tokensOwned + (Math.random() > 0.98 ? 1 : 0),
        transactions: prev.transactions,
        thoughts: prev.thoughts,
      }));
      setWalletBalance((prev) => prev + (Math.random() - 0.5) * 100);
    }, 2000);

    return () => {
      clearInterval(streamInterval);
      clearInterval(dataInterval);
    };
  }, [currentLanguage]);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setLoadingDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setIsLiveDotVisible((prev) => !prev);
    }, 1000);

    return () => clearInterval(dotInterval);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!userInput.trim()) return;

      const userMessage: ActionEntry = {
        timestamp: new Date(),
        type: "user",
        content: userInput.trim(),
      };

      setStreamEntries((prev) => [...prev, userMessage].slice(-10));
      setUserInput("");
    },
    [userInput]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  const handleLanguageChange = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
    setStreamEntries([]);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black font-mono text-[#5788FA] relative overflow-hidden">
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isLiveDotVisible={isLiveDotVisible}
        setCurrentLanguage={handleLanguageChange}
        currentLanguage={currentLanguage}
      />

      <div className="flex flex-grow overflow-hidden relative">
        <div
          className={`
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          fixed lg:relative
          w-full lg:w-1/3 
          h-full
          bg-black
          z-20 lg:z-0
          transition-transform
          duration-300
          p-2 lg:border-r lg:border-[#5788FA]/50 
          flex flex-col 
          overflow-y-auto
        `}
        >
          <AgentProfile currentLanguage={currentLanguage} />
          <AgentStats
            currentLanguage={currentLanguage}
            animatedData={animatedData}
            walletBalance={walletBalance}
          />
        </div>

        <div className="flex-grow flex flex-col w-full lg:w-2/3">
          <Stream
            currentLanguage={currentLanguage}
            streamEntries={streamEntries}
            isThinking={isThinking}
            loadingDots={loadingDots}
          />
          <ChatInput
            currentLanguage={currentLanguage}
            userInput={userInput}
            handleKeyPress={handleKeyPress}
            handleSubmit={handleSubmit}
            setUserInput={setUserInput}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
