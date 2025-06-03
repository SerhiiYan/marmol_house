import { Helmet } from 'react-helmet';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <html lang="ru" />
        <title>Политика конфиденциальности | Marmol House</title>
        <meta
          name="description"
          content="Узнайте, как Marmol House защищает ваши персональные данные. Политика конфиденциальности описывает сбор, использование и защиту информации."
        />
        <meta
          name="keywords"
          content="политика конфиденциальности, защита данных, Marmol House, Гродно, Беларусь"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Marmol House" />
        <link rel="canonical" href="https://marmolhouse.by/privacy" />
        <meta property="og:title" content="Политика конфиденциальности | Marmol House" />
        <meta
          property="og:description"
          content="Как Marmol House обрабатывает ваши данные: сбор, хранение и защита персональной информации."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marmolhouse.by/privacy" />
        <meta property="og:image" content="https://marmolhouse.by/og-image.png" />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Политика конфиденциальности | Marmol House" />
        <meta
          name="twitter:description"
          content="Узнайте о защите ваших данных на сайте Marmol House."
        />
        <meta name="twitter:image" content="https://marmolhouse.by/og-image.png" />
        <meta name="twitter:site" content="@MarmolHouse" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://marmolhouse.by/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Политика конфиденциальности',
                item: 'https://marmolhouse.by/privacy',
              },
            ],
          })}
        </script>
      </Helmet>
      <section className="max-w-4xl mx-auto pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#17253c] mb-6">
            Политика конфиденциальности
          </h1>
          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              В Marmol House мы ценим вашу конфиденциальность и стремимся защитить ваши персональные данные. Эта политика конфиденциальности объясняет, как мы собираем, используем, храним и защищаем информацию, которую вы предоставляете на сайте{' '}
              <a href="https://marmolhouse.by" className="text-[#f9c615] hover:text-[#e5b512] underline">
                marmolhouse.by
              </a>.
            </p>
            <div>
              <h2 className="text-xl font-semibold text-[#17253c] mb-2">1. Какие данные мы собираем</h2>
              <p className="leading-relaxed">
                Мы собираем только те данные, которые вы добровольно предоставляете через формы на сайте (например, имя, номер телефона, комментарии). Эти данные используются исключительно для связи с вами и обсуждения вашего проекта строительства каркасного дома.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#17253c] mb-2">2. Как мы используем ваши данные</h2>
              <p className="leading-relaxed">
                Ваши данные используются для:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ответа на ваши запросы и предоставления консультаций.</li>
                <li>Обсуждения деталей проекта строительства.</li>
                <li>Улучшения качества наших услуг.</li>
              </ul>
              <p className="mt-2 leading-relaxed">
                Мы не используем ваши данные в маркетинговых целях без вашего явного согласия.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#17253c] mb-2">3. Передача данных третьим лицам</h2>
              <p className="leading-relaxed">
                Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Республики Беларусь (например, по запросу государственных органов).
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#17253c] mb-2">4. Хранение и защита данных</h2>
              <p className="leading-relaxed">
                Ваши данные хранятся в соответствии с Законом Республики Беларусь № 99-З «О защите персональных данных». Мы принимаем технические и организационные меры для защиты информации от несанкционированного доступа, утраты или разглашения.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#17253c] mb-2">5. Ваши права</h2>
              <p className="leading-relaxed">
                Вы имеете право:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Запросить доступ к вашим данным.</li>
                <li>Требовать исправления или удаления данных.</li>
                <li>Отозвать согласие на обработку данных.</li>
              </ul>
              <p className="mt-2 leading-relaxed">
                Для реализации этих прав свяжитесь с нами по телефону +375 29 184 54 81 или через форму обратной связи.
              </p>
            </div>
            <p className="text-lg leading-relaxed">
              Эта политика конфиденциальности может обновляться. Последняя версия всегда доступна на этой странице. Дата последнего обновления: 3 июня 2025 года.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;