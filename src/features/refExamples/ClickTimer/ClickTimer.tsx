import { useRef } from 'react';
import { Button } from '../../../shared/ui/Button';

type ClickData = {
  startTime: number | null;
  clickCount: number;
};

export const ClickTimer = () => {
  const ref = useRef<ClickData>({ startTime: null, clickCount: 0 });

  const onClick = () => {
    if (ref.current.startTime === null) {
      ref.current.startTime = Date.now();
    }
    ref.current.clickCount += 1;

    const diff = Date.now() - (ref.current.startTime ?? Date.now());
    console.log('ClickTimer:', { diffMs: diff, clicks: ref.current.clickCount });
  };

  return (
    <Button variant="secondary" onClick={onClick}>
      ClickTimer (logs to console)
    </Button>
  );
};
