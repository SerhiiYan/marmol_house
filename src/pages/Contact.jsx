import React from 'react';

const Contact = () => {
  return (
    <section className="max-w-4xl mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Контакти</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Телефон</h2>
          <p className="text-gray-700">+1 (234) 567-89-00</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="text-gray-700">example@mail.com</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Адреса</h2>
          <p className="text-gray-700">123 Main Street, City, Country</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
