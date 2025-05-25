import { v4 as uuidv4, v4 } from 'uuid';
// Данные о реализованных проектах
const CompletedProjects = [
  {
    id: uuidv4(),
    title: 'Дом из Блока',
    images: ['/assets/completed/180/3.jpg', '/assets/completed/180/1.jpg', '/assets/completed/180/4.jpg', '/assets/completed/180/2.jpg'],
    price: '150,000$',
    description: [
      'Барановичи',
      'Площадь: 180м²',
      'Завершено: 15/09/2024',
    ],
    // Дополнительные поля, если нужно
    completionDate: '15/09/2024г',
    clientFeedback: 'Отличный дом, построен быстро и качественно!',
  },
  {
    id: uuidv4(),
    title: 'Дом из Блока с гаражом',
    images: ['/assets/completed/tarusichy/1.jpg', '/assets/completed/tarusichy/2.jpg', '/assets/completed/tarusichy/3.jpg', '/assets/completed/tarusichy/4.jpg'],
    price: '76,000$',
    description: [
      'Тарусичи',
      'Площадь: 152м²',
      'Завершено: 25/05/2024г',
    ],
    // Дополнительные поля, если нужно
    completionDate: '25/05/2024г',
    clientFeedback: 'Отличный дом, построен быстро и качественно!',
  },
  {
    id: uuidv4(),
    title: 'Реконструкция дома',
    images: ['/assets/completed/ivanovci/1.jpg', '/assets/completed/ivanovci/2.jpg', '/assets/completed/ivanovci/3.jpg',],
    price: '15,000$',
    description: [
      'Ивановцы',
      'Площадь: 120м²',
      'Завершено: 08/06/2024',
    ],
    // Дополнительные поля, если нужно
    completionDate: '08.06.2024г',
    clientFeedback: 'Отличный дом, построен быстро и качественно!',
  },
];

export default CompletedProjects;