export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F8FCFF] px-8 py-20 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-600">
          ClinMatch Health
        </p>

        <h1 className="mt-4 text-5xl font-black">Kullanım Şartları</h1>

        <p className="mt-4 text-slate-500">Son Güncelleme: 12 Haziran 2026</p>

        <div className="mt-10 space-y-6">
          {[
            [
              "1. Hizmet Kapsamı",
              "ClinMatch Health, kullanıcıların sağlık hizmetleri hakkında bilgi almasına ve başvuru taleplerini uygun sağlık hizmeti seçenekleriyle eşleştirmesine yardımcı olan bağımsız bir bilgilendirme ve koordinasyon platformudur.",
            ],
            [
              "2. Tıbbi Tavsiye Niteliği Taşımama",
              "Web sitesinde yer alan hiçbir içerik tıbbi tavsiye, teşhis veya tedavi önerisi niteliği taşımaz. Nihai teşhis, tedavi planı ve tıbbi kararlar yalnızca ilgili sağlık kuruluşları ve yetkili uzman hekimler tarafından verilir.",
            ],
            [
              "3. Sorumluluk Reddi",
              "ClinMatch Health bir hastane, klinik veya sağlık hizmeti sağlayıcısı değildir. Üçüncü taraf sağlık kuruluşları tarafından sunulan hizmetlerin içeriği, sonucu, fiyatı, randevu süreci veya tıbbi uygulamalarından ClinMatch Health sorumlu değildir.",
            ],
            [
              "4. Kullanıcı Sorumluluğu",
              "Kullanıcı, başvuru sırasında paylaştığı bilgilerin doğru, güncel ve eksiksiz olduğunu kabul eder. Eksik veya hatalı bilgi paylaşımından doğabilecek sonuçlardan kullanıcı sorumludur.",
            ],
            [
              "5. Fikri Mülkiyet Hakları",
              "ClinMatch Health web sitesi, tasarımı, kullanıcı arayüzü, marka unsurları, içerikleri, yazılım kodları, veri yapıları ve diğer tüm dijital varlıklar fikri mülkiyet mevzuatı kapsamında korunmaktadır.",
            ],
            [
              "6. İzinsiz Kullanım Yasağı",
              "Site içeriğinin, tasarımının, yazılımının, iş modelinin veya marka unsurlarının herhangi bir bölümünün önceden yazılı izin alınmaksızın kopyalanması, çoğaltılması, dağıtılması, yeniden yayınlanması veya ticari amaçla kullanılması yasaktır.",
            ],
            [
              "7. Hukuki Hakların Saklı Tutulması",
              "ClinMatch Health markasının, web sitesi tasarımının, iş modelinin veya içeriklerinin izinsiz kullanılması durumunda gerekli hukuki ve cezai işlemleri başlatma hakkı saklıdır. Tüm hakları saklıdır.",
            ],
            [
              "8. Değişiklik Hakkı",
              "ClinMatch Health, kullanım şartlarını, gizlilik politikasını ve hizmet kapsamını gerekli gördüğü hallerde güncelleme hakkını saklı tutar.",
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