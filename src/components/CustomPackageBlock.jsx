// src/components/CustomPackageBlock.jsx

import { BsFillBoxSeamFill } from 'react-icons/bs';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { features } from '../data/siteData'; 

const CustomPackageBlock = ({ onOrderClick }) => {
  const handleOrder = () => {
    onOrderClick('Здравствуйте, интересует расчет стоимости "коробки дома" из газосиликатных блоков.');
  };

  return (
    <div className="bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-xl p-8 mb-12" data-aos="zoom-in">
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <BsFillBoxSeamFill className="w-16 h-16 text-yellow-500" />
        </div>
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-[#17253c]">Нужна только коробка дома?</h3>
          <p className="text-gray-600 mt-1">Мы можем построить для вас надежный конструктив по самой выгодной цене.</p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 text-center flex-shrink-0">
          <p className="text-gray-700 text-sm">Стоимость</p>
          <p className="text-3xl font-bold text-[#17253c]">от 930 <span className="text-xl">BYN/м²</span></p>
        </div>
      </div>
      
      <div className="border-t border-yellow-300 my-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2">
          <h4 className="font-semibold text-lg text-gray-800 mb-3">Что входит в эту стоимость:</h4>
          <ul className="space-y-2">
            {features.map(feature => (
              <li key={feature} className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border self-center">
          <p className="text-gray-700 font-semibold mb-3">
            Это базовый вариант, который можно гибко доработать под ваши требования и бюджет.
          </p>
          <button 
            onClick={handleOrder}
            className="w-full bg-[#f9c615] text-[#17253c] font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
          >
            Получить точный расчет
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPackageBlock;