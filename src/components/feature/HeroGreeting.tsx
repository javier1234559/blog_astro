import { useEffect, useRef, useState } from "react";

const PREFIX = "Hi there 👋! My name is";
const INITIAL_NAME = "Nhat Nguyen";
const FINAL_NAME = "Javier";
const SWAP_DELAY_MS = 2000;
const DELETE_INTERVAL_MS = 70;
const TYPE_INTERVAL_MS = 90;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function WordReveal({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);

  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-baseline mr-[0.28em]"
        >
          <span
            className="inline-block whitespace-nowrap animate-title-word [animation-fill-mode:backwards]"
            style={{ animationDelay: `${index * 0.07}s` }}
          >
            {word}
          </span>
        </span>
      ))}
    </>
  );
}

export default function HeroGreeting() {
  const [displayedName, setDisplayedName] = useState(INITIAL_NAME);
  const [showCursor, setShowCursor] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    let cancelled = false;

    const clearTimers = () => {
      timers.forEach((id) => {
        window.clearTimeout(id);
        window.clearInterval(id);
      });
      timers.length = 0;
    };

    const typewriterSwap = (from: string, to: string) =>
      new Promise<void>((resolve) => {
        if (cancelled) {
          resolve();
          return;
        }

        setShowCursor(true);
        let current = from;

        const deleteTimer = window.setInterval(() => {
          current = current.slice(0, -1);
          setDisplayedName(current);

          if (current.length === 0) {
            window.clearInterval(deleteTimer);

            let typed = "";
            const typeTimer = window.setInterval(() => {
              typed = to.slice(0, typed.length + 1);
              setDisplayedName(typed);

              if (typed.length === to.length) {
                window.clearInterval(typeTimer);
                window.setTimeout(() => {
                  setShowCursor(false);
                  resolve();
                }, 400);
              }
            }, TYPE_INTERVAL_MS);

            timers.push(typeTimer);
          }
        }, DELETE_INTERVAL_MS);

        timers.push(deleteTimer);
      });

    const runSequence = async () => {
      await delay(SWAP_DELAY_MS);
      if (cancelled) return;

      await typewriterSwap(INITIAL_NAME, FINAL_NAME);

      await delay(SWAP_DELAY_MS);
      if (cancelled) return;

      await typewriterSwap(FINAL_NAME, INITIAL_NAME);
    };

    runSequence();

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, []);

  return (
    <>
      <h1 className="sr-only">
        {PREFIX} {INITIAL_NAME}
      </h1>
      <h1
        aria-hidden="true"
        className="text-2xl font-bold leading-snug [text-wrap:balance]"
      >
        <span className="inline-flex flex-wrap items-baseline gap-x-[0.28em]">
          <WordReveal text={PREFIX} />
          <span className="inline-flex items-baseline whitespace-nowrap">
            <span>{displayedName}</span>
            {showCursor && (
              <span className="ml-[1px] inline-block translate-y-[0.02em] animate-pulse">
                |
              </span>
            )}
          </span>
        </span>
      </h1>
    </>
  );
}
