import { useState, useEffect } from 'react';

export default function ModalForm({ show, onClose, defaultComment = '' }) {
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🆕 Оновлюємо comment при зміні defaultComment
  useEffect(() => {
    setFormData((prev) => ({ ...prev, comment: defaultComment }));
  }, [defaultComment]);

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
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      alert('Ошибка при отправке');
    }
    setLoading(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl">
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Оставьте заявку</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            placeholder="Комментарий"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-300 w-full"
          >
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
          {success && <p className="text-green-600 text-center mt-2">Спасибо! Мы скоро свяжемся с вами.</p>}
        </form>
      </div>
    </div>
  );
}
