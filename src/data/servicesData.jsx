// src/data/servicesData.js
import { FaBolt, FaClock, FaWeightHanging, FaHome, FaShieldAlt, FaVolumeDown, FaFire, FaTools, FaPencilRuler, FaCheckCircle, FaUserCheck, FaLightbulb, FaDraftingCompass, FaClipboardList, FaHardHat, FaRulerCombined, FaHammer, FaTree } from 'react-icons/fa';
import { GiStairs } from 'react-icons/gi';
import { FaLayerGroup } from 'react-icons/fa';

export const frameHouseBenefits = [
  { title: 'Энергоэффективность', text: 'Стены отлично сохраняют тепло, снижая расходы на отопление.', icon: <FaBolt size={24}/> },
  { title: 'Скорость строительства', text: 'Полный цикл — от фундамента до отделки — занимает от 2 до 4 месяцев.', icon: <FaClock size={24}/> },
  { title: 'Легкий вес', text: 'Конструкция позволяет экономить на фундаменте и строить на сложных грунтах.', icon: <FaWeightHanging size={24}/> },
  { title: 'Гибкость планировок', text: 'Легко менять внутреннюю планировку без сложных и дорогих перепланировок.', icon: <FaHome size={24}/> },
];

export const frameHouseSteps = [
  { name: 'Проект и фундамент', description: 'Разрабатываем архитектурный проект и возводим надежный свайно-ростверковый фундамент.', icon: FaRulerCombined, image: '/assets/service/fundament.webp' },
  { name: 'Сборка каркаса', description: 'Возводим несущие стены и перегородки из сухого бруса. Формируем прочный "скелет" вашего будущего дома.', icon: FaHammer, image: '/assets/service/frame.webp' },
  { name: 'Кровля и окна', description: 'Монтируем стропильную систему, укладываем металлочерепицу и устанавливаем качественные стеклопакеты.', icon: FaHome, image: '/assets/service/roof.webp' },
  { name: 'Отделка и утепление', description: 'Утепляем стены минеральной ватой, обшиваем фасад имитацией бруса и подготавливаем дом к сдаче.', icon: FaTree, image: '/assets/service/mineral.webp' },
];

export const gasSilicateBenefits = [
  { title: 'Долговечность', text: 'Каменные дома служат до 100–150 лет, не требуя сложного ухода.', icon: <FaShieldAlt size={24}/> },
  { title: 'Тишина и комфорт', text: 'Газосиликат отлично сохраняет тепло и защищает от уличного шума.', icon: <FaVolumeDown size={24}/> },
  { title: 'Пожаробезопасность', text: 'Материал не горит и не поддерживает горение, обеспечивая высший класс безопасности.', icon: <FaFire size={24}/> },
  { title: 'Идеальные стены', text: 'Ровная поверхность блоков упрощает и удешевляет внутреннюю отделку.', icon: <FaTools size={24}/> },
];

export const gasSilicateSteps = [
  { name: 'Фундамент и плита', description: 'Возводим надежный ленточный или плитный фундамент, готовим основание для вашего каменного дома.', icon: FaRulerCombined, image: '/assets/service/monolit.webp' },
  { name: 'Возведение стен', description: 'Производим кладку газосиликатных блоков на специальный клей, с обязательным армированием каждого ряда.', icon: FaLayerGroup, image: '/assets/service/gasoblock.webp' },
  { name: 'Перекрытия и кровля', description: 'Монтируем межэтажные перекрытия и возводим стропильную систему под выбранный тип кровли.', icon: GiStairs, image: '/assets/service/roof.webp' },
  { name: 'Фасад и отделка', description: 'Утепляем и отделываем фасад (штукатурка, кирпич, планкен), подготавливая дом к чистовым работам.', icon: FaHome, image: '/assets/service/exterdesign.webp' },
];

export const designBenefits = [
    { icon: FaPencilRuler, title: "Идеальная планировка", desc: "Создаем пространство под ваш сценарий жизни: от расположения розеток до вида из окна спальни." },
    { icon: FaCheckCircle, title: "Гарантия надежности", desc: "Рассчитываем все нагрузки, подбираем правильные материалы и гарантируем соответствие строительным нормам РБ." },
    { icon: FaUserCheck, title: "Экономия на материалах", desc: "Оптимизируем раскрой материалов и конструктивные решения, чтобы избежать ненужных расходов и переделок." },
];

export const designProcess = [
    { icon: FaLightbulb, name: "Консультация и ТЗ", description: "Обсуждаем ваши идеи, образ жизни и бюджет, формируя четкое техническое задание для будущего проекта." },
    { icon: FaDraftingCompass, name: "Эскизы и планировки", description: "Наши архитекторы создают первые эскизы и планировочные решения, которые мы дорабатываем вместе с вами." },
    { icon: FaClipboardList, name: "Рабочий проект", description: "Готовим полный комплект чертежей (АР и КР), необходимых для получения разрешения и начала строительства." },
    { icon: FaHardHat, name: "Авторский надзор", description: "Наш архитектор контролирует ход строительства, чтобы результат на 100% соответствовал проекту (по желанию)." }
];