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
  const gameAreaRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const addSnowflake = () => {
    if (!gameAreaRef.current) return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const newSnowflake: Snowflake = {
      id: uuidv4(),
      x: Math.random() * rect.width,
      y: 0,
      size: Math.random() * 20 + 12,
    };
    setSnowflakes((prev) => [...prev, newSnowflake]);
  };

  const catchSnowflake = (id: string) => {
    setSnowflakes((prev) => prev.filter((snowflake) => snowflake.id !== id));
    setCaughtCount((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addSnowflake();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (caughtCount >= 69) {
      setTimeout(() => {
        router.push("/congratulations");
      }, 500);
    }
  }, [caughtCount, router]);

  return (
    <div
      ref={gameAreaRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {snowflakes.map((snowflake) => (
        <motion.div
          key={snowflake.id}
          initial={{ y: -40 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 4 + Math.random() * 2,
            ease: "easeIn",
          }}
          onClick={() => catchSnowflake(snowflake.id)}
          className="absolute text-green-400"
          style={{
            left: snowflake.x,
            fontSize: `${snowflake.size}px`,
          }}
        >
          <FaSnowflake />
        </motion.div>
      ))}

      <div className="absolute top-4 left-4 text-white text-xl font-bold">
        {caughtCount}
      </div>
    </div>
  );
}
