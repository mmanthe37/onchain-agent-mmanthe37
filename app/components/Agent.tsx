import { useCallback, useState } from 'react';

import type { Language } from '../types';
import AgentProfile from './AgentProfile';
import AgentBalance from './AgentBalance';
import Footer from './Footer';
import Navbar from './Navbar';
import Stream from './Stream';
import Chat from './Chat';
import AgentAssets from './AgentAssets';

export default function Agent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const handleLanguageChange = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
  }, []);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-black font-mono text-[#5788FA]">
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isMobileChatOpen={isMobileChatOpen}
        setIsMobileChatOpen={setIsMobileChatOpen}
        setCurrentLanguage={handleLanguageChange}
        currentLanguage={currentLanguage}
      />

      <div className="relative flex flex-grow overflow-hidden">
        <div
          className={`
          ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed z-20 flex h-full w-full flex-col overflow-y-auto bg-black transition-transform duration-300 lg:relative lg:z-0 lg:w-1/3 lg:translate-x-0 lg:border-[#5788FA]/50 lg:border-r `}
        >
          <AgentProfile currentLanguage={currentLanguage} />
          <AgentBalance />
          <AgentAssets />
        </div>

        <div className="flex lg:w-2/3 w-full">
          <Stream currentLanguage={currentLanguage} />
          <Chat currentLanguage={currentLanguage} className="hidden" />
        </div>

        <div
          className={`
          ${
            isMobileChatOpen ? 'translate-y-0' : 'hidden'
          } fixed pt-[100px] top-0 z-8 flex h-full w-full flex-col overflow-y-auto bg-black transition-transform duration-300 md:hidden`}
        >
          <Chat
            currentLanguage={currentLanguage}
            className="w-full flex-col flex"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
