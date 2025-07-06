import { v4 as uuidv4, v4 } from 'uuid';
// Данные о реализованных проектах
const CompletedProjects = [
  {
    id: uuidv4(),
    title: 'Дом из блока',
    images: ['/assets/completed/180/3.jpg', '/assets/completed/180/1.jpg', '/assets/completed/180/4.jpg', '/assets/completed/180/2.jpg'],
    price: '290 000 BYN',
    description: [
      'Барановичи',
      'Площадь: 180м²',
      'Завершено: 15/09/2024',
    ],
  },
  {
    id: uuidv4(),
    title: 'Дом из блока с гаражом',
    images: ['/assets/completed/tarusichy/1.jpg', '/assets/completed/tarusichy/2.jpg', '/assets/completed/tarusichy/3.jpg', '/assets/completed/tarusichy/4.jpg'],
    price: '167 000 BYN',
    description: [
      'Тарусичи',
      'Площадь: 152м²',
      'Завершено: 25/05/2024г',
    ],
  },
  {
    id: uuidv4(),
    title: 'Реконструкция дома',
    images: ['/assets/completed/ivanovci/1.jpg', '/assets/completed/ivanovci/2.jpg', '/assets/completed/ivanovci/3.jpg',],
    price: '132 000 BYN',
    description: [
      'Ивановцы',
      'Площадь: 120м²',
      'Завершено: 08/06/2024',
    ],
  },
  {
    id: uuidv4(),
    title: 'Дом из блока',
    images: ['/assets/completed/grodno/1.jpg', '/assets/completed/grodno/2.jpg', '/assets/completed/grodno/3.jpg',],
    price: '345 000 BYN',
    description: [
      'Гродно, Южный 4',
      'Площадь: 200м²',
      'Завершено: 21/04/2023',
    ],
  },
  {
    id: uuidv4(),
    title: 'Дом из блока',
    images: ['/assets/completed/pogorany/1.jpg', '/assets/completed/pogorany/2.jpg', '/assets/completed/pogorany/3.jpg', '/assets/completed/pogorany/4.jpg'],
    price: '372 000 BYN',
    description: [
      'Погораны',
      'Площадь: 200м²',
      'Завершено: 05/09/2023',
    ],
  },
   {
    id: uuidv4(),
    title: 'Дом из блока',
    images: ['/assets/completed/corobchicy/1.jpg', '/assets/completed/corobchicy/2.jpg', '/assets/completed/corobchicy/3.jpg'],
    price: '235 400 BYN',
    description: [
      'Коробчицы',
      'Площадь: 130м²',
      'Завершено: 08/10/2024',
    ],
  },
   {
    id: uuidv4(),
    title: 'Дом из блока',
    images: ['/assets/completed/uzhnyi/1.jpg', '/assets/completed/uzhnyi/2.jpg', '/assets/completed/uzhnyi/3.jpg'],
    price: '330 600 BYN',
    description: [
      'Гродно, Южный',
      'Площадь: 185м²',
      'Завершено: 25/04/2024',
    ],
  },
];

export default CompletedProjects;