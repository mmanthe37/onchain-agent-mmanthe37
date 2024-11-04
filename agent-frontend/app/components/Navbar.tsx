import { useCallback } from "react";
import { translations } from "../translations";
import { Language } from "../types";
import LanguageSelector from "./LanguageSelector";
import { notoSansThai } from "../constants";

type NavbarProps = {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isLiveDotVisible: boolean;
  isMobileMenuOpen: boolean;
  setCurrentLang: (language: Language) => void;
  currentLang: Language;
};

export default function Navbar({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  isLiveDotVisible,
  setCurrentLang,
  currentLang,
}: NavbarProps) {
  const handleClick = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  return (
    <div className="flex justify-between items-center p-2 border-b border-[#5788FA]/50">
      <div className="flex items-center space-x-2">
        <button className="lg:hidden mr-2" onClick={handleClick}>
          ☰
        </button>
        <div
          className={`
          w-2 h-2 rounded-full 
          transition-all duration-700 ease-in-out
          ${
            isLiveDotVisible
              ? "bg-green-500 opacity-100"
              : "bg-green-500 opacity-40"
          }
        `}
        />
        <span
          className={`text-sm text-zinc-50 ${
            currentLang === "th" ? notoSansThai.className : ""
          }`}
        >
          {translations[currentLang].header.liveOn}
        </span>
      </div>
      <LanguageSelector
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />
    </div>
  );
}
