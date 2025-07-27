// src/components/ModalForm.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMaskInput } from 'react-imask';

export default function ModalForm({ show, onClose, defaultComment = '' }) {
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [honeypot, setHoneypot] = useState('');

  const [isPolicyAccepted, setIsPolicyAccepted] = useState(true);

  useEffect(() => {
    if (show) {
      setFormData({ name: '', phone: '', comment: defaultComment });
      setHoneypot('');
      setSuccess(false);
      setError(null);
      setIsPolicyAccepted(true);
    }
  }, [show, defaultComment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('--- Начинается отправка формы ---');

    if (honeypot) {
      onClose(); 
      return;
    }
    
    if (!formData.name.trim() || !formData.phone || formData.phone.length < 9 || !isPolicyAccepted) {
        setError('Пожалуйста, заполните все обязательные поля.');
        return;
    }

    setLoading(true);
    setError(null);

    const requestBody = {
        name: formData.name,
        phone: `+375${formData.phone}`,
        message: formData.comment || 'Клиент запросил консультацию',
        honeypot: honeypot,
    };

    try {
        const response = await fetch('https://marmolhouse.by/api/form_handler.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        
        const result = await response.json();
        
        if (!response.ok) throw new Error(result.message || `Ошибка сервера: ${response.status}`);
        if (result.success) setSuccess(true);
        else throw new Error(result.message || 'Произошла ошибка.');
        
    } catch (err) {
        console.error('Ошибка при отправке формы:', err);
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        
        {success ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Спасибо!</h2>
            <p className="text-gray-700">Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.</p>
            <button onClick={onClose} className="mt-6 bg-[#f9c615] text-[#17253c] font-semibold py-2 px-6 rounded hover:bg-[#e5b512] transition-colors">
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <button type="button" onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-red-500 hover:scale-125" aria-label="Закрыть модальное окно">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <h2 id="form-title" className="text-2xl font-bold mb-4 text-[#17253c]">Оставьте заявку</h2>
            <p className="text-gray-600 mb-6">Мы перезвоним вам, чтобы ответить на все вопросы.</p>

            <form onSubmit={handleSubmit} className="space-y-4" aria-labelledby="form-title">
              <div className="absolute left-[-5000px]" aria-hidden="true">
                <input 
                  type="text" 
                  name="user_nickname" 
                  tabIndex="-1" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label htmlFor="form-name" className="sr-only">Ваше имя</label>
                <input
                  id="form-name" type="text" name="name" placeholder="Ваше имя"
                  autoComplete="name" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-[#f9c615] focus:border-[#f9c615]"
                  required 
                />
              </div>

              <div>
                <label htmlFor="form-phone" className="sr-only">Номер телефона</label>
                <IMaskInput
                  id="form-phone" mask="+375 (00) 000-00-00" unmask={true} 
                  value={formData.phone} onAccept={(unmaskedValue) => setFormData({ ...formData, phone: unmaskedValue })}
                  placeholder="+375 (29) 123-45-67" name="phone" autoComplete="tel"
                  className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-[#f9c615] focus:border-[#f9c615]"
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="form-comment" className="sr-only">Комментарий</label>
                <textarea
                  id="form-comment" name="comment" placeholder="Комментарий (необязательно)"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-[#f9c615] focus:border-[#f9c615]"
                  rows="3"
                />
              </div>

              <div className="flex items-start">
                <input
                  id="acceptPolicy" type="checkbox" checked={isPolicyAccepted}
                  onChange={(e) => setIsPolicyAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#f9c615] focus:ring-[#f9c615]"
                  required 
                />
                <label htmlFor="acceptPolicy" className="ml-2 text-sm text-gray-600">
                  Я согласен на обработку персональных данных и принимаю условия <Link to="/privacy" target='_blank' className="text-[#f9c615] underline hover:text-[#e5b512]">политики конфиденциальности</Link>.
                </label>
              </div>
              
              {error && <p className="text-red-600 text-center text-sm font-semibold">{error}</p>}

              <button type="submit" disabled={loading} className="w-full bg-[#f9c615] text-[#17253c] font-bold py-3 px-4 rounded-lg hover:bg-[#e5b512] disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                {loading ? 'Отправка...' : 'Получить консультацию'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}