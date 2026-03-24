import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useTickingNumber(
  target: number,
  durationMs: number = 1500,
  active: boolean = true,
): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setCurrent(0);
      return;
    }

    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(t);
      setCurrent(Math.round(eased * target));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, durationMs, active]);

  return current;
}
