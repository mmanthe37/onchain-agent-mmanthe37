import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AGENT_NAME, AGENT_WALLET_ADDRESS, notoSansThai } from '../constants';
import { translations } from '../translations';
import type { Language } from '../types';

type AgentProfileProps = {
  currentLanguage: Language;
};

export default function AgentProfile({ currentLanguage }: AgentProfileProps) {
  const [eyePosition, setEyePosition] = useState({ x: 50, y: 50 });
  const [showToast, setShowToast] = useState(false);
  const avatarRef = useRef<SVGSVGElement>(null);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(AGENT_WALLET_ADDRESS)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy wallet address: ', err);
      });
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (avatarRef.current) {
        const avatarRect = avatarRef.current.getBoundingClientRect();
        const avatarCenterX = avatarRect.left + avatarRect.width / 2;
        const avatarCenterY = avatarRect.top + avatarRect.height / 2;

        const dx = event.clientX - avatarCenterX;
        const dy = event.clientY - avatarCenterY;
        const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2;

        const normalizedX = Math.min(
          Math.max((dx / maxDistance) * 30 + 50, 20),
          80,
        );
        const normalizedY = Math.min(
          Math.max((dy / maxDistance) * 30 + 50, 20),
          80,
        );

        setEyePosition({ x: normalizedX, y: normalizedY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const formattedAddress = useMemo(() => {
    return `${AGENT_WALLET_ADDRESS.slice(0, 6)}...${AGENT_WALLET_ADDRESS.slice(
      -4,
    )}`;
  }, []);

  return (
    <div className="mb-4">
      <div className="flex flex-col space-y-4 py-2">
        <div className="flex items-center space-x-5">
          <svg
            ref={avatarRef}
            width="70"
            height="70"
            viewBox="0 0 100 100"
            className="bg-[#5788FA]"
            role="img"
            aria-label="Animated avatar"
          >
            <circle cx="50" cy="50" r="45" fill="#000000" />
            <circle
              cx={eyePosition.x}
              cy={eyePosition.y}
              r="5"
              fill="#5788FA"
            />
          </svg>

          <div className="flex flex-col justify-center space-y-2">
            <h2 className="font-bold text-[#5788FA] text-xl">{AGENT_NAME}</h2>
            <div className="group relative inline-flex items-center">
              <button
                type="button"
                onClick={copyToClipboard}
                className="text-[#5788FA] text-sm transition-colors hover:text-[#3D7BFF]"
              >
                {formattedAddress}
              </button>
              {showToast && (
                <div className="absolute top-full left-0 mt-2 rounded-xs bg-[#5788FA] px-2 py-1 text-xs text-zinc-950">
                  Copied
                </div>
              )}
            </div>
          </div>
        </div>

        <p
          className={`text-[#5788FA] text-base ${
            currentLanguage === 'th' ? notoSansThai.className : ''
          }`}
        >
          {translations[currentLanguage].profile.bio}
        </p>
      </div>
    </div>
  );
}
