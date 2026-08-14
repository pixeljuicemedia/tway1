import { useEffect, useRef, useState } from "react";

/**
 * Slow parallax for a background layer that stays inside its section.
 * Returns a ref to attach to the container and a translateY value.
 * speed: fraction of scroll movement (0.2 = very slow, 0.5 = moderate).
 */
export function useParallax(speed = 0.25) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // progress from section entering to leaving viewport (-windowHeight .. windowHeight)
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        // move background slower than scroll; range centered around 0
        const y = (progress - 0.5) * rect.height * speed;
        setOffset(y);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return { ref, offset };
}
