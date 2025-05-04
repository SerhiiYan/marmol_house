import teamImage from '../assets/team.jpg';

function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 py-8 pt-20">
      {/* Хедер с відступом */}
      <h1 className="text-4xl font-bold mb-4">О нас</h1>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Картинка */}
        <img
          src={teamImage}
          alt="Наша команда"
          className="w-full sm:w-1/2 rounded-2xl shadow-md"
        />

        {/* Текст */}
        <div className="sm:w-1/2">
          <p className="text-lg leading-7 mb-4">
            Компания <strong>Marmol House</strong> занимается строительством домов, дач, бань и гаражей более 10 лет.
            Мы объединяем опыт, современные материалы и душевный подход к каждому клиенту.
          </p>

          <p className="text-lg leading-7 mb-4">
            Наш приоритет — качество, надежность и прозрачность на каждом этапе. Мы предлагаем индивидуальные решения, гарантии и сопровождение проекта от начала до сдачи.
          </p>
        </div>
      </div>

      {/* Блок с дополнительной информацией */}
      <div className="grid sm:grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-[#f9c615] text-[#17253c] rounded-xl shadow">
          <p className="text-xl font-semibold">10+ лет опыта</p>
        </div>
        <div className="p-4 bg-[#17253c] text-white rounded-xl shadow">
          <p className="text-xl font-semibold">100+ завершённых объектов</p>
        </div>
        <div className="p-4 bg-[#f9c615] text-[#17253c] rounded-xl shadow">
          <p className="text-xl font-semibold">Индивидуальный подход</p>
        </div>
        <div className="p-4 bg-[#17253c] text-white rounded-xl shadow">
          <p className="text-xl font-semibold">Гарантия на все работы</p>
        </div>
      </div>
    </div>
  );
}

export default About;
