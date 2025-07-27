import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
        <title>404 — Страница не найдена | Marmol House</title>
        <meta
          name="description"
          content="Страница не найдена. Но мы точно знаем, как построить вам уютный дом :)"
        />
        <meta name="robots" content="noindex, follow" />

      <div className="min-h-screen flex flex-col items-center justify-center text-[#17253c] p-4 text-center">
        <motion.img
          src="/logo.png"
          alt="Marmol House Logo"
          className="w-28 md:w-36 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        />
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-[#f9c615] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Ой! Такой страницы нет...
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-6 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Зато мы можем построить дом, в котором точно будет всё на своём месте :)
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="/"
            className="bg-[#f9c615] text-[#17253c] px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition"
          >
            Вернуться на главную
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
