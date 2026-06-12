export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F8FCFF] px-8 py-20 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-600">
          ClinMatch Health
        </p>

        <h1 className="mt-4 text-5xl font-black">Gizlilik Politikası</h1>

        <p className="mt-4 text-slate-500">Son Güncelleme: 12 Haziran 2026</p>

        <div className="mt-10 space-y-6">
          {[
            [
              "1. Genel Bilgilendirme",
              "ClinMatch Health, kullanıcı gizliliğine önem verir. Bu politika, web sitemizi kullanan kişilerin bilgilerinin hangi amaçlarla toplandığını, işlendiğini ve korunduğunu açıklamak amacıyla hazırlanmıştır.",
            ],
            [
              "2. Toplanan Bilgiler",
              "Web sitemiz üzerinden ad, soyad, ülke, telefon numarası, WhatsApp bilgisi, e-posta adresi, tedavi talebi ve kullanıcı tarafından paylaşılan mesaj içerikleri toplanabilir.",
            ],
            [
              "3. Bilgilerin Kullanım Amacı",
              "Toplanan bilgiler; başvuruların değerlendirilmesi, kullanıcılarla iletişime geçilmesi, uygun sağlık hizmeti seçenekleri hakkında bilgilendirme yapılması ve hizmet deneyiminin geliştirilmesi amacıyla kullanılmaktadır.",
            ],
            [
              "4. Çerezler",
              "Web sitemizde kullanıcı deneyimini geliştirmek, site performansını analiz etmek ve başvuruların güvenli şekilde işlenmesini sağlamak amacıyla gerekli çerezler kullanılabilir.",
            ],
            [
              "5. Üçüncü Taraflarla Paylaşım",
              "Kullanıcı bilgileri, açık rıza veya yasal zorunluluk bulunmadıkça üçüncü kişilerle paylaşılmaz. Başvurunun değerlendirilmesi için gerekli olması halinde ilgili sağlık hizmeti sağlayıcılarıyla sınırlı paylaşım yapılabilir.",
            ],
            [
              "6. Veri Güvenliği",
              "ClinMatch Health, kullanıcı bilgilerinin yetkisiz erişime, kayba, kötüye kullanıma veya izinsiz paylaşılmasına karşı korunması için makul teknik ve idari önlemleri alır.",
            ],
            [
              "7. İletişim",
              "Gizlilik politikasıyla ilgili soru ve talepleriniz için ClinMatch Health ile iletişime geçebilirsiniz.",
            ],
          ].map(([title, text]) => (
            <section
              key={title}
              className="rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl font-black">{title}</h2>
              <p className="mt-4 leading-8 text-slate-600">{text}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}