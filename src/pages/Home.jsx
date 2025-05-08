import { useState } from 'react';
import herovideo from '../assets/herovideo.mp4';
import ModalForm from '../components/ModalForm';
import HowWeWork from '../components/HowWeWork';
import WhyChooseFrameHouse from '../components/WhyChooseFrameHouse';


function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('https://script.google.com/macros/s/AKfycby6QFmJOZb0l39zhVHOzl5ghg-bGa0Lj8OdK5Z6CCXWX33oT8fB1cOL67gCZqniA9jn/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.comment || 'Хочу консультации по строительству Дома',
        }),
      });
      setSuccess(true);
      setFormData({ name: '', phone: '', comment: '' });
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
      }, 2000);
    } catch (error) {
      alert('Ошибка при отправке');
    }
    setLoading(false);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
          <source src={herovideo} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            СТРОИМ КАРКАСНЫЕ ДОМА <br />
            <span className="text-yellow-400 text-5xl md:text-6xl">«ПОД КЛЮЧ»</span>
          </h1>
          <p className="text-lg md:text-2xl text-white mb-6">в Гродно и по всей Беларуси</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-300 transition mt-10"
          >
            ЗАКАЗАТЬ КОНСУЛЬТАЦИЮ
          </button>

          {/* Три блока */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl text-white text-sm md:text-base mt-20">
            <div className="flex flex-col h-full">
              <p className="font-bold text-yellow-400 mb-4 uppercase">Проектирование</p>
              <p className="text-justify">
                Разрабатываем проекты удобных и красивых загородных домов. Учитываем стиль, бюджет и пожелания клиента.
              </p>
            </div>
            <div className="flex flex-col h-full">
              <p className="font-bold text-yellow-400 mb-4 uppercase">Качественные материалы</p>
              <p className="text-justify">
                Для строительства используем только сухую строганную доску, проверенные утеплители и фурнитуру.
              </p>
            </div>
            <div className="flex flex-col h-full">
              <p className="font-bold text-yellow-400 mb-4 uppercase">Фиксированная цена</p>
              <p className="text-justify">
                Цена на дом прописывается в договоре и не меняется в процессе строительства.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Как мы работаем */}
      <WhyChooseFrameHouse/>
      <HowWeWork />
      
      {/* Модальное окно */}
      <ModalForm show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default Home;
