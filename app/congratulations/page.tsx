"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RiCloseFill } from "react-icons/ri";

export default function Congratulations() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPS, setShowPS] = useState(false);
  const [typedText, setTypedText] = useState("");

  const router = useRouter();

  const fullText = `
##
# Я програміст,
# тому пишу код, щоб привітати тебе особливим способом
##
i = Boy("Diniska");
u = Girl("Mariya aka bibizyana");
# 9 березня я зустрів тебе
i.meet(u);
# Протягом цього часу ти стала маленьким джерелом позитиву
u.become(smallSourceOf('positivity'));
# Тепер я посміхаюсь кожен день, згадуючи тебе
i.smileEveryDay(() => i.remember(u));
# Іноді між нами трапляються баги, але ми завжди їх виправляємо
debug.conflict(u, i, sometimes=True)
# Вітаю тебе з твоїм днем народження!
i.congratulate(u, 'happyBirthday');

# Дякую, що ти є, навіть якщо іноді зависаєш як браузер з 50 вкладками <3
`;

  const closePS = () => {
    setShowPS(false);
  };

  useEffect(() => {
    if (showPS) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showPS]);

  return (
    <div>
      {!showPS ? (
        <div className="flex flex-col items-center justify-between h-screen bg-black relative overflow-hidden">
          <div>
            <h1 className="mt-20 text-4xl font-mono text-green-400 drop-shadow-md">
              Happy Birthday
            </h1>
          </div>

          <div className="mb-20 cursor-pointer">
            {!isOpen ? (
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={() => setIsOpen(true)}
              >
                <motion.img
                  src="/gift.png"
                  alt="Gift Box"
                  className="w-40 h-40"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                />
              </motion.div>
            ) : (
              <motion.div
                className="text-lg leading-5 text-white bg-black px-6 py-3 shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0 }}
              >
                <p className="mb-2">Маленька,</p>
                <p>
                  У цей світлий і пам’ятний день хочеться побажати тобі всього
                  самого найкращого, що є в цьому світі: любові, щастя, удачі,
                  тепла і доброти. Нехай у твоєму домі завжди панують гармонія,
                  достаток і радість, а поруч будуть рідні та віддані друзі.
                  Бажаю, щоб робота приносила задоволення, а кожен новий день
                  дарував нові можливості й приводи для усмішок. Нехай всі,
                  навіть самі зухвалі мрії, рано чи пізно збудуться. Будь собою
                  і ніколи не сумнівайся в своїй красі ❤
                </p>
              </motion.div>
            )}
          </div>

          <div>
            <motion.button
              onClick={() => router.push("/")}
              className="absolute bottom-4 left-4 mt-6 px-6 py-3 bg-black border border-green-500 text-green-400 font-semibold rounded-xl shadow-lg transition transform hover:scale-105"
              whileTap={{ scale: 0.9 }}
            >
              Грати знову
            </motion.button>

            <motion.button
              onClick={() => setShowPS(!showPS)}
              className="absolute bottom-4 right-4 mt-4 px-4 py-2 bg-green-500 text-black font-semibold rounded-lg shadow-lg hover:bg-green-600 transition transform hover:scale-105"
              whileTap={{ scale: 0.9 }}
            >
              P.S.
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-screen bg-black">
          <RiCloseFill
            onClick={closePS}
            className="absolute top-3 right-3 w-8 h-8 text-white"
          />
          <motion.div
            className="relative text-white shadow-lg text-lg mt-8 px-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <pre className="text-left text-sm whitespace-pre-wrap px-1 py-4 rounded-lg shadow-lg">
              {typedText.split("\n").map((line, index) => (
                <span
                  key={index}
                  className={
                    line.trim().startsWith("#")
                      ? "text-green-400"
                      : "text-white"
                  }
                >
                  {line}
                  {"\n"}
                </span>
              ))}
            </pre>
          </motion.div>
        </div>
      )}
    </div>
  );
}
