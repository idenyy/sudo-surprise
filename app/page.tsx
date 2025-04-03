"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function BirthdayApp() {
  const [step, setStep] = useState(0);
  const [command, setCommand] = useState("");
  const [hacking, setHacking] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [cracked, setCracked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setStep(1), 1000);
    setTimeout(() => setStep(2), 2000);
    setTimeout(() => setStep(3), 3000);
    setTimeout(() => setShowInput(true), 4000);
  }, []);

  const handleCommand = () => {
    if (command.trim().toLowerCase() === "sudo start") {
      setHacking(true);
      setTimeout(() => setStep(4), 2000);
      setTimeout(() => setStep(5), 4000);
      setTimeout(() => setStep(6), 6000);
      setTimeout(() => setCracked(true), 10000);
    }
  };

  useEffect(() => {
    if (cracked) {
      setTimeout(() => {
        router.push("/game");
      }, 500);
    }
  }, [cracked, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-green-400 font-mono px-4">
      {!hacking ? (
        <div className="text-left w-full max-w-lg">
          {step >= 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              [*] Завантаження системи
            </motion.p>
          )}
          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              [*] Ініціалізація
            </motion.p>
          )}
          {step >= 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              [*] Завантаження завершено
            </motion.p>
          )}
          {showInput && (
            <div className="mt-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
              >
                <p className="text-[14px]">
                  root@server:~$ Enter <b>sudo start</b>:
                </p>
                <input
                  className="w-full bg-black text-green-400 border border-green-500 p-2 mt-2 outline-none"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                />
                <button
                  className="mt-2 w-full bg-green-700 text-white py-2"
                  onClick={handleCommand}
                >
                  Enter
                </button>
              </motion.div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-left w-full max-w-md">
          {step >= 4 && !cracked && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              [*] Запуск системи
            </motion.p>
          )}
          {step >= 5 && !cracked && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              [*] Відстеження IP
            </motion.p>
          )}
          {step >= 6 && !cracked && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              [*] Отримано доступ
            </motion.p>
          )}
        </div>
      )}
    </div>
  );
}
