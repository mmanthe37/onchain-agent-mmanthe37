import { useCallback, useEffect, useState } from 'react';
import { AGENT_NAME } from '../constants';
import StreamSvg from '../svg/StreamSvg';
import WalletSvg from '../svg/WalletSvg';
import { formatDateToBangkokTime } from '../utils';

type NavbarProps = {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileChatOpen: (isOpen: boolean) => void;
  isMobileChatOpen: boolean;
};

export default function Navbar({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  isMobileChatOpen,
  setIsMobileChatOpen,
}: NavbarProps) {
  const [isLiveDotVisible, setIsLiveDotVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isClient) {
    return false;
  }

  return (
    <div className="z-10 flex flex-col items-center justify-between bg-black border-[#5788FA]/50 border-b">
      <div className="flex w-full items-center justify-between border-[#5788FA]/50 border-b p-2 md:hidden">
        <button type="button" onClick={handleMobileProfileClick}>
          <WalletSvg />
        </button>
        <h2 className="font-bold text-[#5788FA] text-xl">{AGENT_NAME}</h2>
        <button type="button" onClick={handleMobileChatClick}>
          <StreamSvg />
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
          <span className="sm:text-sm text-xs text-zinc-50">
            Live on Base Sepolia
          </span>
        </div>
        <div className="sm:text-sm text-xs" aria-live="polite">
          {formatDateToBangkokTime(new Date())} ICT
        </div>
      </div>
    </div>
  );
}
