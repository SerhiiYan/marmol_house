import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Contact = () => {
  return (
    <section className="max-w-6xl mx-auto p-6 pt-28" aria-labelledby="contact-heading">
      <Helmet>
        <title>Контакты | Marmol House</title>
        <meta
          name="description"
          content="Контактная информация Marmol House. Адрес офиса, телефон и email. Приезжайте, звоните или пишите!"
        />
        <link rel="canonical" href="https://marmolhouse.by/contact" />
      </Helmet>

      <h1 id="contact-heading" className="sr-only">Контактная информация Marmol House</h1>

      <motion.div
        className="grid gap-6 md:grid-cols-3 bg-white rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Телефон</h2>
          <p className="text-gray-600 hover:text-black transition-colors">
            <a href="tel:+375291845481" className="hover:underline">
              +375 (29) 184 54 81
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Email</h2>
          <p className="text-gray-600 hover:text-black transition-colors">
            <a href="mailto:yurmarmol@gmail.com" className="hover:underline">
              yurmarmol@gmail.com
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Адрес</h2>
          <p className="text-gray-600 hover:text-black transition-colors">
            г. Гродно, ул. Лелевеля 12, кабинет 6
          </p>
        </div>
      </motion.div>

      <motion.div
        className="mt-10 rounded-2xl overflow-hidden shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <iframe
          title="Карта - ул. Лелевеля 12A"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2364.047621362822!2d23.820859900000002!3d53.6639519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dfd7d2201bf22b%3A0xa9490ad61d0a97d5!2z0YPQuy4g0JvRjtC80LjRg9C70L7QstCwLCAxMiwg0JPQsNCz0L7RgNC-0LLQsCwg0JHRg9C70YzQstGB0LosINCf0L7Qu9C40YbQsA!5e0!3m2!1sru!2sby!4v1747305691832!5m2!1sru!2sby&gestureHandling=greedy"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </motion.div>

      <div className="text-center mt-6 text-gray-700">
        <p>Есть вопросы? Мы всегда рады помочь — позвоните или напишите нам!</p>
      </div>
    </section>
  );
};

export default Contact;
