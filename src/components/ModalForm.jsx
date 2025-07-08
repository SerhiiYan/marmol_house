import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 1. ИМПОРТИРУЕМ КОМПОНЕНТ МАСКИ
import { IMaskInput } from 'react-imask';

export default function ModalForm({ show, onClose, defaultComment = '' }) {
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  // 2. ДОБАВЛЯЕМ СОСТОЯНИЕ ДЛЯ ПОЛЯ-ЛОВУШКИ
  const [honeypot, setHoneypot] = useState('');

  // Сбрасываем форму при закрытии и повторном открытии
  useEffect(() => {
    if (show) {
      setFormData({ name: '', phone: '', comment: defaultComment });
      setHoneypot('');
      setSuccess(false);
      setError(null);
    }
  }, [show, defaultComment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Быстрая проверка ловушки на клиенте
    if (honeypot) {
      console.log('Поймали бота на клиенте!');
      onClose(); // Просто тихо закрываем форму
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await fetch('/api/form_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: `+375${formData.phone}`,
          message: formData.comment || 'Клиент запросил консультацию',
          honeypot: honeypot, // 3. ОТПРАВЛЯЕМ ПОЛЕ-ЛОВУШКУ
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка сети или сервера.');
      }
      
      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error(result.message || 'Произошла неизвестная ошибка.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-red-500 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out"
          aria-label="Закрыть модальное окно"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <h2 className="text-xl font-bold mb-4">Оставьте заявку</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 4. ДОБАВЛЯЕМ НЕВИДИМОЕ ПОЛЕ-ЛОВУШКУ */}
          <div className="absolute left-[-5000px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input type="text" id="website" name="website" tabIndex="-1" autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>

          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border px-4 py-2 rounded focus:ring-[#f9c615] focus:border-[#f9c615]"
          />

          {/* 5. ЗАМЕНЯЕМ ОБЫЧНЫЙ INPUT НА МАСКУ */}
          <IMaskInput
            mask="+375 (00) 000-00-00"
            unmask={true} // Возвращает чистое значение без маски
            value={formData.phone}
            onAccept={(unmaskedValue) => setFormData({ ...formData, phone: unmaskedValue })}
            placeholder="+375 (29) 123-45-67"
            name="phone"
            required
            className="w-full border px-4 py-2 rounded focus:ring-[#f9c615] focus:border-[#f9c615]"
          />
          
          <textarea
            name="comment"
            placeholder="Комментарий"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="w-full border px-4 py-2 rounded focus:ring-[#f9c615] focus:border-[#f9c615]"
          />
          <div className="flex items-center">
            <input
              id="acceptPolicy"
              type="checkbox"
              required
              className="mr-2 text-[#f9c615] focus:ring-[#f9c615]"
            />
            <label htmlFor="acceptPolicy" className="text-sm text-gray-600">
              Я согласен с <Link to="/privacy" className="text-[#f9c615] underline hover:text-[#e5b512]">политикой конфиденциальности</Link>
            </label>
          </div>
          <button
            type="submit"
            disabled={loading || success}
            className="bg-[#f9c615] text-[#17253c] font-semibold py-2 px-4 rounded hover:bg-[#e5b512] w-full disabled:opacity-50 transition-colors"
          >
            {loading ? 'Отправка...' : (success ? 'Отправлено!' : 'Отправить')}
          </button>
          {success && <p className="text-green-600 text-center mt-2">Спасибо! Мы скоро свяжемся с вами.</p>}
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}