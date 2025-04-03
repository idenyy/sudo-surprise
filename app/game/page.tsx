"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { FaSnowflake } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Snowflake {
  id: string;
  x: number;
  y: number;
  size: number;
}

export default function DropGame() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const addSnowflake = () => {
    if (!gameAreaRef.current) return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const newSnowflake: Snowflake = {
      id: uuidv4(),
      x: Math.random() * (rect.width - 30),
      y: 0,
      size: Math.random() * (35 - 20) + 20,
    };
    setSnowflakes((prev) => [...prev, newSnowflake]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addSnowflake();
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (caughtCount >= 100) {
      setTimeout(() => {
        router.push("/congratulations");
      }, 300);
    }
  }, [caughtCount, router]);

  const handleCatch = (id: string) => {
    setSnowflakes((prev) => prev.filter((s) => s.id !== id));
    setCaughtCount((prev) => prev + 1);
  };

  return (
    <div
      ref={gameAreaRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {snowflakes.map((snowflake) => (
        <motion.div
          key={snowflake.id}
          initial={{ y: -60 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 4 + Math.random() * 2,
            ease: "easeIn",
          }}
          onMouseDown={() => handleCatch(snowflake.id)}
          onTouchStart={() => handleCatch(snowflake.id)}
          className="absolute text-green-400 cursor-pointer flex items-center justify-center"
          style={{
            left: `${snowflake.x}px`,
            fontSize: `${snowflake.size}px`,
            width: `${snowflake.size * 2}px`,
            height: `${snowflake.size * 2}px`,
          }}
        >
          <FaSnowflake style={{ pointerEvents: "none" }} />
        </motion.div>
      ))}

      <div className="absolute top-4 left-4 text-white text-xl font-bold bg-zinc-900 p-2 rounded-lg">
        {caughtCount}/100
      </div>
    </div>
  );
}
