import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(
  durationMs: number,
  onComplete: () => void,
  active: boolean,
) {
  const [progress, setProgress] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(durationMs);
  const startTimeRef = useRef(0);
  const rafRef = useRef(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const tick = useCallback(
    (now: number) => {
      const elapsed = now - startTimeRef.current;
      const remaining = Math.max(0, durationMs - elapsed);
      const p = remaining / durationMs;

      setProgress(p);
      setTimeRemaining(remaining);

      if (remaining <= 0 && !completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current();
        return;
      }

      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [durationMs],
  );

  useEffect(() => {
    if (!active) {
      setProgress(1);
      setTimeRemaining(durationMs);
      completedRef.current = false;
      return;
    }

    startTimeRef.current = performance.now();
    completedRef.current = false;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, durationMs, tick]);

  return { progress, timeRemaining };
}
