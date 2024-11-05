import { useState, useEffect, useCallback } from "react";

import Navbar from "./Navbar";
import {
  ActionEntry,
  AgentMessage,
  AnimatedData,
  Language,
  StreamEntry,
} from "../types";
import Stream from "./Stream";
import ChatInput from "./ChatInput";
import Footer from "./Footer";
import AgentProfile from "./AgentProfile";
import AgentStats from "./AgentStats";
import useChat from "../hooks/useChat";

export default function Agent() {
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
  const [isChatMode, setIsChatMode] = useState(false);

  const handleSuccess = useCallback((messages: AgentMessage[]) => {
    const message = messages.find((res) => res.event === "agent");
    const streamEntry = {
      timestamp: new Date(),
      content: message?.data || "",
    };
    setIsThinking(false);
    setStreamEntries((prev) => [...prev, streamEntry]);
    setTimeout(() => {
      setIsThinking(true);
    }, 800);
  }, []);

  const { postChat, isLoading } = useChat({ onSuccess: handleSuccess });

  useEffect(() => {
    const streamInterval = setInterval(() => {
      if (!isLoading && !isChatMode) {
        postChat("same a one liner that is inspiring");
      }
    }, 1000);

    return () => {
      clearInterval(streamInterval);
    };
  }, [isLoading, postChat, isChatMode]);

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
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!userInput.trim()) return;

      setIsChatMode(true);
      setUserInput("");

      const userMessage: ActionEntry = {
        timestamp: new Date(),
        type: "user",
        content: userInput.trim(),
      };

      setStreamEntries((prev) => [...prev, userMessage]);

      postChat(userInput);
    },
    [postChat, userInput]
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
            isThinking={isThinking && !isChatMode}
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
