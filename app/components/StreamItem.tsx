import type { StreamEntry } from '../types';
import TimeDisplay from './TimeDisplay';

type StreamItemProps = {
  entry: StreamEntry;
};

export default function StreamItem({ entry }: StreamItemProps) {

  return (
    <div className="mb-2">
      <TimeDisplay timestamp={entry.timestamp} />
      <div className={`flex items-center space-x-2 max-w-full ${entry?.type !== 'user' ? 'text-[#5788FA]' : 'text-gray-300'}`}>
        <span className="max-w-full text-wrap break-all"> {entry.content}</span>
      </div>
    </div>
  );
}
