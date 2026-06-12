export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-[#F8FCFF] px-8 py-20 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-600">
          ClinMatch Health
        </p>

        <h1 className="mt-4 text-5xl font-black">KVKK Aydınlatma Metni</h1>

        <p className="mt-4 text-slate-500">Son Güncelleme: 12 Haziran 2026</p>

        <div className="mt-10 space-y-6">
          {[
            [
              "1. Veri Sorumlusu",
              "Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında ClinMatch Health tarafından veri sorumlusu sıfatıyla hazırlanmıştır.",
            ],
            [
              "2. İşlenen Kişisel Veriler",
              "Web sitesi üzerinden gerçekleştirilen başvurular kapsamında ad, soyad, telefon numarası, e-posta adresi, ülke bilgisi, tedavi talebi ve kullanıcı tarafından iletilen diğer bilgiler işlenebilmektedir.",
            ],
            [
              "3. Kişisel Verilerin İşlenme Amaçları",
              "Kişisel verileriniz; başvuru taleplerinin değerlendirilmesi, kullanıcılarla iletişim kurulması, uygun tedavi seçenekleri hakkında bilgilendirme yapılması, hizmet kalitesinin geliştirilmesi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.",
            ],
            [
              "4. Verilerin Aktarılması",
              "Kişisel verileriniz yalnızca başvurunuzun değerlendirilmesi ve tarafınıza bilgi verilmesi amacıyla ilgili sağlık kuruluşları, uzman hekimler veya hizmet sağlayıcılarla sınırlı olarak paylaşılabilir. Kanunen zorunlu haller dışında üçüncü kişilere aktarılmaz.",
            ],
            [
              "5. Veri Toplama Yöntemi ve Hukuki Sebep",
              "Kişisel verileriniz elektronik ortamda internet sitesi üzerindeki başvuru formları aracılığıyla elde edilmekte olup KVKK’nın 5 ve 6. maddelerinde belirtilen hukuki sebepler doğrultusunda işlenmektedir.",
            ],
            [
              "6. KVKK Kapsamındaki Haklarınız",
              "KVKK kapsamında kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, eksik veya yanlış işlenen verilerin düzeltilmesini isteme, verilerin silinmesini veya yok edilmesini isteme ve kanunda belirtilen diğer haklara sahipsiniz.",
            ],
            [
              "7. İletişim",
              "KVKK kapsamındaki talepleriniz için ClinMatch Health ile iletişime geçebilirsiniz.",
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