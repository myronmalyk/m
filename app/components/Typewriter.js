"use client";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * @param {Object} props
 * @param {string} props.text
 * @param {number} [props.speed]       // ms por carácter (↓ más rápido)
 * @param {number} [props.startDelay]  // ms antes de empezar
 * @param {boolean} [props.cursor]     // mostrar cursor
 * @param {string} [props.className]
 */
export default function Typewriter({
  text,
  speed = 35,
  startDelay = 200,
  cursor = true,
  className = "",
}) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const started = useRef(false);

  // Respeta “prefers-reduced-motion si vale”
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (prefersReduced) {
      setOut(text);
      setDone(true);
      return;
    }

    let i = 0;
    const t0 = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => clearTimeout(t0);
  }, [text, speed, startDelay, prefersReduced]);

  return (
    <span className={className}>
      {out}
      {cursor && (
        <span
          className={`inline-block w-[0.6ch] translate-y-[1px] ${
            done ? "opacity-0" : "animate-blink"
          }`}
        >
          |
        </span>
      )}
      <style jsx>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s step-end infinite; }
      `}</style>
    </span>
  );
}