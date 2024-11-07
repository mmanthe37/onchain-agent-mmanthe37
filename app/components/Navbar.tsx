import { useCallback, useEffect, useState } from 'react';
import { AGENT_NAME, notoSansThai } from '../constants';
import ChatSvg from '../svg/ChatSvg';
import WalletSvg from '../svg/WalletSvg';
import { translations } from '../translations';
import type { Language } from '../types';
import LanguageSelector from './LanguageSelector';

type NavbarProps = {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileChatOpen: (isOpen: boolean) => void;
  isMobileChatOpen: boolean;
  setCurrentLanguage: (language: Language) => void;
  currentLanguage: Language;
};

export default function Navbar({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  isMobileChatOpen,
  setIsMobileChatOpen,
  setCurrentLanguage,
  currentLanguage,
}: NavbarProps) {
  const [isLiveDotVisible, setIsLiveDotVisible] = useState(true);

  // enables glowing live on sepolia dot
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setIsLiveDotVisible((prev) => !prev);
    }, 1000);

    return () => clearInterval(dotInterval);
  }, []);

  const handleMobileProfileClick = useCallback(() => {
    if (!isMobileMenuOpen && isMobileChatOpen) {
      setIsMobileChatOpen(false);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [
    isMobileMenuOpen,
    isMobileChatOpen,
    setIsMobileChatOpen,
    setIsMobileMenuOpen,
  ]);

  const handleMobileChatClick = useCallback(() => {
    if (!isMobileChatOpen && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    setIsMobileChatOpen(!isMobileChatOpen);
  }, [
    isMobileMenuOpen,
    isMobileChatOpen,
    setIsMobileChatOpen,
    setIsMobileMenuOpen,
  ]);

  return (
    <div className="z-10 flex flex-col items-center justify-between border-[#5788FA]/50 border-b">
      <div className="flex w-full items-center justify-between border-[#5788FA]/50 border-b p-2 md:hidden">
        <button type="button" onClick={handleMobileProfileClick}>
          <WalletSvg />
        </button>
        <h2 className="font-bold text-[#5788FA] text-xl">{AGENT_NAME}</h2>
        <button type="button" onClick={handleMobileChatClick}>
          <ChatSvg />
        </button>
      </div>
      <div className="flex w-full justify-between p-2">
        <div className="flex items-center space-x-2">
          <button
            className="mr-2 hidden md:flex lg:hidden"
            onClick={handleMobileProfileClick}
            type="button"
          >
            ☰
          </button>
          <div
            className={`h-2 w-2 rounded-full transition-all duration-700 ease-in-out ${
              isLiveDotVisible
                ? 'bg-green-500 opacity-100'
                : 'bg-green-500 opacity-40'
            }
        `}
          />
          <span
            className={`text-sm text-zinc-50 ${
              currentLanguage === 'th' ? notoSansThai.className : ''
            }`}
          >
            {translations[currentLanguage].header.liveOn}
          </span>
        </div>
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />
      </div>
    </div>
  );
}
