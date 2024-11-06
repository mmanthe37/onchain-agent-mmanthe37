import { useMemo } from 'react';
import { notoSansThai } from '../constants';
import type { Language, StreamEntry } from '../types';
import TimeDisplay from './TimeDisplay';

type StreamItemProps = {
  entry: StreamEntry;
  currentLanguage: Language;
};

export default function StreamItem({
  entry,
  currentLanguage,
}: StreamItemProps) {
  const className = useMemo(() => {
    let baseClass = 'flex items-center space-x-2 max-w-full';

    if (entry?.type !== 'user') {
      baseClass += ' text-[#5788FA]';
    } else {
      baseClass += ' text-gray-300';
    }

    if (currentLanguage === 'th') {
      baseClass += ` ${notoSansThai.className}`;
    }

    return baseClass;
  }, [currentLanguage, entry?.type]);

  return (
    <div className="mb-2">
      <TimeDisplay timestamp={entry.timestamp} />
      <div className={className}>
        <span className="max-w-full text-wrap break-all"> {entry.content}</span>
      </div>
    </div>
  );
}
