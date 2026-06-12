"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Lang = "tr" | "en" | "de" | "fr" | "es" | "ru" | "ar";

const languages: { code: Lang; label: string }[] = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
];

const treatmentOptions = [
  { value: "Hair Transplant", labels: { tr: "Saç Ekimi", en: "Hair Transplant", de: "Haartransplantation", fr: "Greffe de cheveux", es: "Trasplante capilar", ru: "Пересадка волос", ar: "زراعة الشعر" } },
  { value: "Dental Treatments", labels: { tr: "Diş Tedavileri", en: "Dental Treatments", de: "Zahnbehandlungen", fr: "Soins dentaires", es: "Tratamientos dentales", ru: "Стоматология", ar: "علاجات الأسنان" } },
  { value: "Plastic Surgery", labels: { tr: "Estetik Cerrahi", en: "Plastic Surgery", de: "Plastische Chirurgie", fr: "Chirurgie esthétique", es: "Cirugía estética", ru: "Пластическая хирургия", ar: "الجراحة التجميلية" } },
  { value: "Bariatric Surgery", labels: { tr: "Obezite Cerrahisi", en: "Bariatric Surgery", de: "Adipositaschirurgie", fr: "Chirurgie bariatrique", es: "Cirugía bariátrica", ru: "Бариатрическая хирургия", ar: "جراحة السمنة" } },
  { value: "Eye Surgery", labels: { tr: "Göz Tedavileri", en: "Eye Treatments", de: "Augenbehandlungen", fr: "Soins ophtalmologiques", es: "Tratamientos oculares", ru: "Лечение глаз", ar: "علاجات العيون" } },
  { value: "IVF Treatment", labels: { tr: "Tüp Bebek", en: "IVF Treatment", de: "IVF-Behandlung", fr: "FIV", es: "FIV", ru: "ЭКО", ar: "أطفال الأنابيب" } },
];

const translations = {
  tr: {
    nav: ["Tedaviler", "Klinikler", "Süreç", "Başvuru"],
    badge: "Türkiye’nin seçkin sağlık ağına akıllı erişim",
    title: "Doğru doktoru, doğru hastaneyi, doğru tedavi planını eşleştiriyoruz.",
    desc: "ClinMatch Health; uluslararası hastaları Türkiye’deki güvenilir hastaneler, uzman doktorlar ve kişiselleştirilmiş tedavi seçenekleriyle buluşturan premium medikal turizm platformudur.",
    primary: "Ücretsiz Ön Başvuru",
    secondary: "Sistem Nasıl Çalışır?",
    engine: "AI Matching Engine",
    engineSteps: ["Hasta talebi analiz edilir", "Tedavi kategorisi belirlenir", "Uygun doktor ve hastane eşleşir", "Teklif ve koordinasyon süreci başlar"],
    score: "Ortalama eşleşme skoru",
    stats: ["Doğrulanmış Uzman", "Partner Klinik & Hastane", "Hasta Ülkesi", "Hasta Koordinasyonu"],
    treatmentsTitle: "Tedavi Alanları",
    treatmentsDesc: "Başvurunu oluştur, ClinMatch senin için en uygun uzmanlık alanını, hastane profilini ve tedavi yol haritasını eşleştirsin.",
    cardText: "Uzman doktor, hastane, tedavi planı ve hasta koordinasyonu tek sistemde değerlendirilir.",
    networkTitle: "Türkiye’nin Güçlü Sağlık Ağı",
    networkDesc: "ClinMatch; Türkiye’de bilinen hastane ve klinik ağlarını, hasta ihtiyacına göre akıllı eşleştirme sistemiyle bir araya getirir.",
    hospitalText: "Uluslararası hasta deneyimine uygun tedavi koordinasyonu.",
    processTitle: "Nasıl Çalışır?",
    process: ["Başvurunu gönder", "Talebin analiz edilir", "Doktor & hastane eşleşir", "Koordinasyon başlar"],
    formTitle: "Ön Başvuru Oluştur",
    formDesc: "Bilgilerini gönder, ClinMatch ekibi seni en uygun tedavi ağıyla eşleştirsin.",
    success: "Başvurun başarıyla alındı. Ekibimiz seninle iletişime geçecek.",
    placeholders: ["Ad Soyad", "Ülke", "WhatsApp", "E-posta", "Tedavi Seçiniz", "Tedavi talebinizi kısaca anlatın"],
    submit: "Başvuruyu Gönder",
    sending: "Gönderiliyor...",
    footer: "Türkiye merkezli premium medikal turizm eşleştirme platformu.",
  },
  en: {
    nav: ["Treatments", "Clinics", "Process", "Apply"],
    badge: "Smart access to Turkey’s premium healthcare network",
    title: "We match you with the right doctor, hospital and treatment plan.",
    desc: "ClinMatch Health is a premium medical tourism platform connecting international patients with trusted hospitals, specialist doctors and personalized treatment options in Turkey.",
    primary: "Start Free Application",
    secondary: "How It Works",
    engine: "AI Matching Engine",
    engineSteps: ["Patient request is analyzed", "Treatment category is defined", "Doctor and hospital are matched", "Offer and coordination begin"],
    score: "Average match score",
    stats: ["Verified Specialists", "Partner Clinics & Hospitals", "Patient Countries", "Patient Coordination"],
    treatmentsTitle: "Treatment Areas",
    treatmentsDesc: "Submit your request and ClinMatch will match you with the right specialty, hospital profile and treatment roadmap.",
    cardText: "Doctor, hospital, treatment plan and patient coordination are evaluated in one system.",
    networkTitle: "Turkey’s Strong Healthcare Network",
    networkDesc: "ClinMatch brings together leading hospital and clinic networks in Turkey through an intelligent patient-matching system.",
    hospitalText: "Treatment coordination designed for international patient experience.",
    processTitle: "How It Works",
    process: ["Submit your application", "Your request is analyzed", "Doctor & hospital are matched", "Coordination begins"],
    formTitle: "Start Your Application",
    formDesc: "Send your information and the ClinMatch team will match you with the most suitable treatment network.",
    success: "Your application has been received successfully. Our team will contact you.",
    placeholders: ["Full Name", "Country", "WhatsApp", "Email", "Select Treatment", "Briefly describe your treatment request"],
    submit: "Submit Application",
    sending: "Sending...",
    footer: "Turkey-based premium medical tourism matching platform.",
  },
  de: {
    nav: ["Behandlungen", "Kliniken", "Ablauf", "Anfrage"],
    badge: "Intelligenter Zugang zum Premium-Gesundheitsnetzwerk der Türkei",
    title: "Wir verbinden Sie mit dem richtigen Arzt, Krankenhaus und Behandlungsplan.",
    desc: "ClinMatch Health verbindet internationale Patienten mit vertrauenswürdigen Krankenhäusern, Fachärzten und personalisierten Behandlungsoptionen in der Türkei.",
    primary: "Kostenlose Anfrage starten",
    secondary: "So funktioniert es",
    engine: "KI-Matching-System",
    engineSteps: ["Patientenanfrage wird analysiert", "Behandlungskategorie wird definiert", "Arzt und Krankenhaus werden zugeordnet", "Angebot und Koordination beginnen"],
    score: "Durchschnittlicher Match-Score",
    stats: ["Verifizierte Spezialisten", "Partnerkliniken & Krankenhäuser", "Patientenländer", "Patientenkoordination"],
    treatmentsTitle: "Behandlungsbereiche",
    treatmentsDesc: "Senden Sie Ihre Anfrage, und ClinMatch findet die passende Fachrichtung, Klinik und Behandlungsroute.",
    cardText: "Arzt, Krankenhaus, Behandlungsplan und Patientenkoordination werden in einem System bewertet.",
    networkTitle: "Starkes Gesundheitsnetzwerk in der Türkei",
    networkDesc: "ClinMatch verbindet führende Kliniken und Krankenhäuser in der Türkei mit einem intelligenten Matching-System.",
    hospitalText: "Koordination für internationale Patientenerfahrung.",
    processTitle: "So funktioniert es",
    process: ["Anfrage senden", "Anfrage wird analysiert", "Arzt & Krankenhaus werden gematcht", "Koordination beginnt"],
    formTitle: "Anfrage erstellen",
    formDesc: "Senden Sie Ihre Informationen, und ClinMatch findet das passende Behandlungsnetzwerk.",
    success: "Ihre Anfrage wurde erfolgreich empfangen. Unser Team wird Sie kontaktieren.",
    placeholders: ["Vollständiger Name", "Land", "WhatsApp", "E-Mail", "Behandlung auswählen", "Beschreiben Sie kurz Ihre Anfrage"],
    submit: "Anfrage senden",
    sending: "Wird gesendet...",
    footer: "Premium-Plattform für Medizintourismus in der Türkei.",
  },
  fr: {
    nav: ["Traitements", "Cliniques", "Processus", "Demande"],
    badge: "Accès intelligent au réseau médical premium de Turquie",
    title: "Nous vous associons au bon médecin, hôpital et plan de traitement.",
    desc: "ClinMatch Health connecte les patients internationaux avec des hôpitaux fiables, des médecins spécialistes et des options de traitement personnalisées en Turquie.",
    primary: "Demande gratuite",
    secondary: "Comment ça marche",
    engine: "Moteur de matching IA",
    engineSteps: ["La demande est analysée", "La catégorie de traitement est définie", "Le médecin et l’hôpital sont associés", "L’offre et la coordination commencent"],
    score: "Score moyen de correspondance",
    stats: ["Spécialistes vérifiés", "Cliniques & hôpitaux partenaires", "Pays patients", "Coordination patient"],
    treatmentsTitle: "Domaines de traitement",
    treatmentsDesc: "Envoyez votre demande et ClinMatch vous associera à la bonne spécialité, clinique et feuille de route médicale.",
    cardText: "Médecin, hôpital, plan de traitement et coordination sont évalués dans un seul système.",
    networkTitle: "Réseau médical puissant en Turquie",
    networkDesc: "ClinMatch réunit les principaux réseaux hospitaliers et cliniques de Turquie via un système intelligent.",
    hospitalText: "Coordination adaptée aux patients internationaux.",
    processTitle: "Comment ça marche",
    process: ["Envoyez votre demande", "Votre demande est analysée", "Médecin & hôpital associés", "Coordination lancée"],
    formTitle: "Créer une demande",
    formDesc: "Envoyez vos informations et l’équipe ClinMatch vous associera au réseau médical le plus adapté.",
    success: "Votre demande a été reçue. Notre équipe vous contactera.",
    placeholders: ["Nom complet", "Pays", "WhatsApp", "E-mail", "Choisir un traitement", "Décrivez brièvement votre demande"],
    submit: "Envoyer la demande",
    sending: "Envoi...",
    footer: "Plateforme premium de tourisme médical basée en Turquie.",
  },
  es: {
    nav: ["Tratamientos", "Clínicas", "Proceso", "Solicitud"],
    badge: "Acceso inteligente a la red médica premium de Turquía",
    title: "Te conectamos con el médico, hospital y plan de tratamiento adecuados.",
    desc: "ClinMatch Health conecta pacientes internacionales con hospitales confiables, médicos especialistas y tratamientos personalizados en Turquía.",
    primary: "Solicitud gratuita",
    secondary: "Cómo funciona",
    engine: "Motor de matching IA",
    engineSteps: ["Se analiza la solicitud", "Se define la categoría", "Se asignan médico y hospital", "Comienza la coordinación"],
    score: "Puntuación media de coincidencia",
    stats: ["Especialistas verificados", "Clínicas y hospitales socios", "Países de pacientes", "Coordinación de pacientes"],
    treatmentsTitle: "Áreas de tratamiento",
    treatmentsDesc: "Envía tu solicitud y ClinMatch te asignará la especialidad, clínica y ruta de tratamiento adecuadas.",
    cardText: "Médico, hospital, plan de tratamiento y coordinación se evalúan en un solo sistema.",
    networkTitle: "Fuerte red sanitaria en Turquía",
    networkDesc: "ClinMatch reúne redes líderes de hospitales y clínicas en Turquía mediante un sistema inteligente.",
    hospitalText: "Coordinación adecuada para pacientes internacionales.",
    processTitle: "Cómo funciona",
    process: ["Envía tu solicitud", "Se analiza tu caso", "Médico y hospital asignados", "Comienza la coordinación"],
    formTitle: "Crear solicitud",
    formDesc: "Envía tu información y ClinMatch te conectará con la red médica más adecuada.",
    success: "Tu solicitud fue recibida. Nuestro equipo te contactará.",
    placeholders: ["Nombre completo", "País", "WhatsApp", "Correo electrónico", "Seleccionar tratamiento", "Describe brevemente tu solicitud"],
    submit: "Enviar solicitud",
    sending: "Enviando...",
    footer: "Plataforma premium de turismo médico basada en Turquía.",
  },
  ru: {
    nav: ["Лечение", "Клиники", "Процесс", "Заявка"],
    badge: "Умный доступ к премиальной медицинской сети Турции",
    title: "Мы подбираем подходящего врача, клинику и план лечения.",
    desc: "ClinMatch Health соединяет иностранных пациентов с надежными клиниками, профильными врачами и персонализированными вариантами лечения в Турции.",
    primary: "Бесплатная заявка",
    secondary: "Как это работает",
    engine: "AI Matching Engine",
    engineSteps: ["Заявка пациента анализируется", "Определяется категория лечения", "Подбираются врач и клиника", "Начинается предложение и координация"],
    score: "Средний балл совпадения",
    stats: ["Проверенные специалисты", "Партнерские клиники", "Страны пациентов", "Координация пациентов"],
    treatmentsTitle: "Направления лечения",
    treatmentsDesc: "Отправьте заявку, и ClinMatch подберет подходящую специализацию, клинику и план лечения.",
    cardText: "Врач, клиника, план лечения и координация оцениваются в одной системе.",
    networkTitle: "Сильная медицинская сеть Турции",
    networkDesc: "ClinMatch объединяет ведущие клиники и больницы Турции через интеллектуальную систему подбора.",
    hospitalText: "Координация для международных пациентов.",
    processTitle: "Как это работает",
    process: ["Отправьте заявку", "Заявка анализируется", "Врач и клиника подбираются", "Начинается координация"],
    formTitle: "Создать заявку",
    formDesc: "Отправьте данные, и команда ClinMatch подберет подходящую медицинскую сеть.",
    success: "Ваша заявка успешно получена. Наша команда свяжется с вами.",
    placeholders: ["Полное имя", "Страна", "WhatsApp", "Эл. почта", "Выберите лечение", "Кратко опишите запрос"],
    submit: "Отправить заявку",
    sending: "Отправка...",
    footer: "Премиальная платформа медицинского туризма в Турции.",
  },
  ar: {
    nav: ["العلاجات", "العيادات", "العملية", "التقديم"],
    badge: "وصول ذكي إلى شبكة الرعاية الصحية المميزة في تركيا",
    title: "نطابقك مع الطبيب والمستشفى وخطة العلاج المناسبة.",
    desc: "تربط ClinMatch Health المرضى الدوليين بالمستشفيات الموثوقة والأطباء المتخصصين وخيارات العلاج الشخصية في تركيا.",
    primary: "طلب مجاني",
    secondary: "كيف يعمل النظام",
    engine: "محرك المطابقة بالذكاء الاصطناعي",
    engineSteps: ["تحليل طلب المريض", "تحديد فئة العلاج", "مطابقة الطبيب والمستشفى", "بدء العرض والتنسيق"],
    score: "متوسط درجة المطابقة",
    stats: ["أطباء موثّقون", "عيادات ومستشفيات شريكة", "دول المرضى", "تنسيق المرضى"],
    treatmentsTitle: "مجالات العلاج",
    treatmentsDesc: "أرسل طلبك وسيتولى ClinMatch مطابقتك مع التخصص والمستشفى وخطة العلاج الأنسب.",
    cardText: "يتم تقييم الطبيب والمستشفى وخطة العلاج وتنسيق المريض ضمن نظام واحد.",
    networkTitle: "شبكة صحية قوية في تركيا",
    networkDesc: "يجمع ClinMatch شبكات المستشفيات والعيادات الرائدة في تركيا من خلال نظام مطابقة ذكي.",
    hospitalText: "تنسيق مناسب لتجربة المرضى الدوليين.",
    processTitle: "كيف يعمل النظام",
    process: ["أرسل طلبك", "يتم تحليل الطلب", "مطابقة الطبيب والمستشفى", "بدء التنسيق"],
    formTitle: "إنشاء طلب مبدئي",
    formDesc: "أرسل معلوماتك وسيقوم فريق ClinMatch بمطابقتك مع شبكة العلاج الأنسب.",
    success: "تم استلام طلبك بنجاح. سيتواصل معك فريقنا.",
    placeholders: ["الاسم الكامل", "الدولة", "واتساب", "البريد الإلكتروني", "اختر العلاج", "اشرح طلبك العلاجي باختصار"],
    submit: "إرسال الطلب",
    sending: "جارٍ الإرسال...",
    footer: "منصة تركية مميزة لمطابقة السياحة الطبية.",
  },
};

const partnerHospitals = ["Acıbadem", "Liv Hospital", "Esteworld", "Memorial", "Medical Park", "Florence Nightingale"];

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const t = translations[lang];
  const isRtl = lang === "ar";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const { error } = await supabase.from("applications").insert({
      full_name: form.get("full_name"),
      country: form.get("country"),
      whatsapp: form.get("whatsapp"),
      email: form.get("email"),
      treatment: form.get("treatment"),
      message: form.get("message"),
    });

    setLoading(false);
    if (!error) {
      setSuccess(true);
      event.currentTarget.reset();
    }
  }

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F8FCFF] text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-cyan-100 bg-white/85 px-8 py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Clin<span className="text-cyan-600">Match</span></h1>
            <p className="text-xs tracking-[0.35em] text-slate-400">HEALTH</p>
          </div>
          <div className="hidden gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a href="#treatments">{t.nav[0]}</a>
            <a href="#network">{t.nav[1]}</a>
            <a href="#process">{t.nav[2]}</a>
            <a href="#apply">{t.nav[3]}</a>
          </div>
          <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
            {languages.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
          </select>
        </div>
      </nav>

      <section className="relative overflow-hidden px-8 py-24">
        <div className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-cyan-200/50 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-teal-200/50 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2 text-sm font-bold text-cyan-700">{t.badge}</div>
            <h2 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">{t.title}</h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">{t.desc}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#apply" className="rounded-full bg-cyan-600 px-8 py-4 font-bold text-white shadow-xl shadow-cyan-200 hover:bg-cyan-700">{t.primary}</a>
              <a href="#process" className="rounded-full border border-cyan-100 bg-white px-8 py-4 font-bold text-slate-700 shadow-sm">{t.secondary}</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-100 bg-white p-4 shadow-2xl shadow-cyan-100">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-cyan-500 via-sky-500 to-teal-500 p-8 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-50">{t.engine}</p>
              <div className="mt-8 space-y-4">
                {t.engineSteps.map((text, index) => (
                  <div key={text} className="flex items-center gap-4 rounded-2xl bg-white/18 p-5 backdrop-blur">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white font-black text-cyan-700">0{index + 1}</div>
                    <div className="font-semibold">{text}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-white/20 p-5 backdrop-blur">
                <p className="text-sm text-cyan-50">{t.score}</p>
                <p className="mt-2 text-5xl font-black">96%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-8 pb-20 md:grid-cols-4">
        {["200+", "50+", "20+", "24/7"].map((number, i) => (
          <div key={number} className="rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm">
            <h3 className="text-4xl font-black text-cyan-600">{number}</h3>
            <p className="mt-2 text-slate-500">{t.stats[i]}</p>
          </div>
        ))}
      </section>

      <section id="treatments" className="mx-auto max-w-7xl px-8 py-20">
        <h2 className="text-4xl font-black">{t.treatmentsTitle}</h2>
        <p className="mt-4 max-w-2xl text-slate-600">{t.treatmentsDesc}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {treatmentOptions.map((item) => (
            <div key={item.value} className="rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-100">
              <div className="mb-6 h-14 w-14 rounded-2xl bg-cyan-100" />
              <h3 className="text-2xl font-black">{item.labels[lang]}</h3>
              <p className="mt-4 text-slate-500">{t.cardText}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="network" className="mx-auto max-w-7xl px-8 py-20">
        <div className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-xl shadow-cyan-50 md:p-12">
          <h2 className="text-4xl font-black">{t.networkTitle}</h2>
          <p className="mt-4 max-w-3xl text-slate-600">{t.networkDesc}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {partnerHospitals.map((hospital) => (
              <div key={hospital} className="rounded-2xl border border-cyan-100 bg-[#F8FCFF] p-6">
                <h3 className="text-xl font-black">{hospital}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{t.hospitalText}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-8 py-20">
        <h2 className="text-4xl font-black">{t.processTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {t.process.map((title, i) => (
            <div key={title} className="rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm">
              <p className="font-bold text-cyan-600">0{i + 1}</p>
              <h3 className="mt-5 text-2xl font-black">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="apply" className="mx-auto max-w-5xl px-8 py-24">
        <div className="rounded-[2.5rem] bg-white p-8 text-slate-900 shadow-2xl shadow-cyan-100 md:p-12">
          <h2 className="text-4xl font-black">{t.formTitle}</h2>
          <p className="mt-3 text-slate-600">{t.formDesc}</p>

          {success && <div className="mt-6 rounded-2xl bg-teal-50 p-4 font-semibold text-teal-700">{t.success}</div>}

          <form onSubmit={handleSubmit} className="mt-10 grid gap-4 md:grid-cols-2">
            <input name="full_name" required className="rounded-2xl border border-slate-200 p-4" placeholder={t.placeholders[0]} />
            <input name="country" required className="rounded-2xl border border-slate-200 p-4" placeholder={t.placeholders[1]} />
            <input name="whatsapp" required className="rounded-2xl border border-slate-200 p-4" placeholder={t.placeholders[2]} />
            <input name="email" required className="rounded-2xl border border-slate-200 p-4" placeholder={t.placeholders[3]} />

            <select name="treatment" required className="rounded-2xl border border-slate-200 p-4 md:col-span-2">
              <option value="">{t.placeholders[4]}</option>
              {treatmentOptions.map((item) => (
                <option key={item.value} value={item.value}>{item.labels[lang]}</option>
              ))}
            </select>

            <textarea name="message" className="min-h-36 rounded-2xl border border-slate-200 p-4 md:col-span-2" placeholder={t.placeholders[5]} />

            <button type="submit" disabled={loading} className="rounded-full bg-cyan-600 px-8 py-4 font-bold text-white md:col-span-2 hover:bg-cyan-700">
              {loading ? t.sending : t.submit}
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-cyan-100 bg-white px-8 py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-3xl font-black">Clin<span className="text-cyan-600">Match</span> Health</h2>
            <p className="mt-3 text-slate-500">{t.footer}</p>
          </div>
          <a href="/admin" className="text-sm text-slate-400">Admin</a>
        </div>
      </footer>
    </main>
  );
}