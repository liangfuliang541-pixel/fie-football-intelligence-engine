import { memo } from 'react';

const LiveIndicator = memo(function LiveIndicator() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fie-accent-danger opacity-75" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fie-accent-danger" />
    </span>
  );
});

export default LiveIndicator;
