"use client";

import { useState } from "react";
import Image from "next/image";
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
    trustChips: ["Premium Hasta Deneyimi", "Çok Dilli Destek", "Güvenli Başvuru Süreci"],
    features: [
      "Çok dilli hasta iletişimi",
      "Tedavi talebine göre akıllı ön eşleştirme",
      "Başvuru, değerlendirme ve koordinasyon takibi",
      "Türkiye merkezli sağlık turizmi deneyimi",
    ],
    whyTurkeyLabel: "NEDEN TÜRKİYE?",
    whyTurkeyTitle: "Türkiye sağlık turizminde dünyanın lider destinasyonlarından biridir.",
    whyTurkeyDesc: "Uluslararası akreditasyona sahip hastaneler, deneyimli doktorlar, modern teknoloji ve hızlı tedavi süreçleri sayesinde Türkiye her yıl milyonlarca hastaya ev sahipliği yapmaktadır.",
    whyTurkeyItems: [
      "Dünya standartlarında hastaneler",
      "Uzman doktor ağı",
      "Hızlı randevu süreçleri",
      "Uygun maliyet avantajı",
      "Premium hasta deneyimi",
    ],
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
    trustChips: ["Premium Patient Experience", "Multilingual Support", "Secure Application Process"],
    features: [
      "Multilingual patient communication",
      "Smart pre-matching based on treatment request",
      "Application, evaluation and coordination tracking",
      "Turkey-based medical tourism experience",
    ],
    whyTurkeyLabel: "WHY TURKEY?",
    whyTurkeyTitle: "Turkey is one of the world’s leading destinations for medical tourism.",
    whyTurkeyDesc: "With internationally accredited hospitals, experienced doctors, modern technology and fast treatment processes, Turkey welcomes millions of patients every year.",
    whyTurkeyItems: [
      "World-class hospitals",
      "Experienced specialist network",
      "Fast appointment processes",
      "Cost advantage",
      "Premium patient experience",
    ],
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
    whyClinmatchLabel: "WHY CLINMATCH",
whyClinmatchTitle: "Premium sağlık yolculuğu için tek noktadan koordinasyon.",
whyClinmatchDesc:
  "ClinMatch Health, uluslararası hastaların Türkiye'deki tedavi sürecini daha anlaşılır, güvenli ve organize hale getirmek için tasarlanmış bağımsız bir medikal turizm koordinasyon platformudur.",

whyClinmatchCards: [
  "Çok dilli hasta iletişimi",
  "Tedavi talebine göre akıllı ön eşleştirme",
  "Başvuru, değerlendirme ve koordinasyon takibi",
  "Türkiye merkezli sağlık turizmi deneyimi",
],
    footer: "Turkey-based premium medical tourism matching platform.",
  },

  de: {
    nav: ["Behandlungen", "Kliniken", "Ablauf", "Anfrage"],
    badge: "Intelligenter Zugang zum Premium-Gesundheitsnetzwerk der Türkei",
    title: "Wir verbinden Sie mit dem richtigen Arzt, Krankenhaus und Behandlungsplan.",
    desc: "ClinMatch Health verbindet internationale Patienten mit vertrauenswürdigen Krankenhäusern, Fachärzten und personalisierten Behandlungsoptionen in der Türkei.",
    primary: "Kostenlose Anfrage starten",
    secondary: "So funktioniert es",
    trustChips: ["Premium-Patientenerlebnis", "Mehrsprachige Unterstützung", "Sicherer Antragsprozess"],
    features: [
      "Mehrsprachige Patientenkommunikation",
      "Intelligente Vorauswahl nach Behandlungsanfrage",
      "Antrags-, Bewertungs- und Koordinationsverfolgung",
      "Medizintourismus-Erlebnis mit Sitz in der Türkei",
    ],
    whyTurkeyLabel: "WARUM TÜRKEI?",
    whyTurkeyTitle: "Die Türkei ist eines der führenden Reiseziele für Medizintourismus weltweit.",
    whyTurkeyDesc: "Mit international akkreditierten Krankenhäusern, erfahrenen Ärzten, moderner Technologie und schnellen Behandlungsprozessen empfängt die Türkei jedes Jahr Millionen von Patienten.",
    whyTurkeyItems: [
      "Krankenhäuser auf Weltklasse-Niveau",
      "Erfahrenes Spezialistennetzwerk",
      "Schnelle Terminprozesse",
      "Kostenvorteil",
      "Premium-Patientenerlebnis",
    ],
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
    whyClinmatchLabel: "WHY CLINMATCH",
whyClinmatchTitle: "One coordination point for your premium healthcare journey.",
whyClinmatchDesc:
  "ClinMatch Health is an independent medical tourism coordination platform designed to make treatment journeys in Turkey safer, clearer and more organized for international patients.",

whyClinmatchCards: [
  "Multilingual patient communication",
  "Smart treatment pre-matching",
  "Application and coordination tracking",
  "Turkey-based healthcare expertise",
],
    footer: "Premium-Plattform für Medizintourismus in der Türkei.",
  },

  fr: {
    nav: ["Traitements", "Cliniques", "Processus", "Demande"],
    badge: "Accès intelligent au réseau médical premium de Turquie",
    title: "Nous vous associons au bon médecin, hôpital et plan de traitement.",
    desc: "ClinMatch Health connecte les patients internationaux avec des hôpitaux fiables, des médecins spécialistes et des options de traitement personnalisées en Turquie.",
    primary: "Demande gratuite",
    secondary: "Comment ça marche",
    trustChips: ["Expérience patient premium", "Support multilingue", "Processus sécurisé"],
    features: [
      "Communication patient multilingue",
      "Pré-correspondance intelligente selon la demande",
      "Suivi de la demande, de l’évaluation et de la coordination",
      "Expérience de tourisme médical basée en Turquie",
    ],
    whyTurkeyLabel: "POURQUOI LA TURQUIE ?",
    whyTurkeyTitle: "La Turquie est l’une des principales destinations mondiales du tourisme médical.",
    whyTurkeyDesc: "Grâce à ses hôpitaux accrédités internationalement, ses médecins expérimentés, sa technologie moderne et ses processus rapides, la Turquie accueille chaque année des millions de patients.",
    whyTurkeyItems: [
      "Hôpitaux de classe mondiale",
      "Réseau de spécialistes expérimentés",
      "Processus de rendez-vous rapides",
      "Avantage économique",
      "Expérience patient premium",
    ],
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
    whyClinmatchLabel: "WHY CLINMATCH",
whyClinmatchTitle: "One coordination point for your premium healthcare journey.",
whyClinmatchDesc:
  "ClinMatch Health is an independent medical tourism coordination platform designed to make treatment journeys in Turkey safer, clearer and more organized for international patients.",

whyClinmatchCards: [
  "Multilingual patient communication",
  "Smart treatment pre-matching",
  "Application and coordination tracking",
  "Turkey-based healthcare expertise",
],
    footer: "Plateforme premium de tourisme médical basée en Turquie.",
  },

  es: {
    nav: ["Tratamientos", "Clínicas", "Proceso", "Solicitud"],
    badge: "Acceso inteligente a la red médica premium de Turquía",
    title: "Te conectamos con el médico, hospital y plan de tratamiento adecuados.",
    desc: "ClinMatch Health conecta pacientes internacionales con hospitales confiables, médicos especialistas y tratamientos personalizados en Turquía.",
    primary: "Solicitud gratuita",
    secondary: "Cómo funciona",
    trustChips: ["Experiencia premium del paciente", "Soporte multilingüe", "Proceso seguro"],
    features: [
      "Comunicación multilingüe con pacientes",
      "Preasignación inteligente según la solicitud de tratamiento",
      "Seguimiento de solicitud, evaluación y coordinación",
      "Experiencia de turismo médico basada en Turquía",
    ],
    whyTurkeyLabel: "¿POR QUÉ TURQUÍA?",
    whyTurkeyTitle: "Turquía es uno de los principales destinos de turismo médico del mundo.",
    whyTurkeyDesc: "Con hospitales acreditados internacionalmente, médicos experimentados, tecnología moderna y procesos rápidos, Turquía recibe a millones de pacientes cada año.",
    whyTurkeyItems: [
      "Hospitales de nivel mundial",
      "Red de especialistas experimentados",
      "Procesos de cita rápidos",
      "Ventaja de costes",
      "Experiencia premium del paciente",
    ],
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
    whyClinmatchLabel: "WHY CLINMATCH",
whyClinmatchTitle: "One coordination point for your premium healthcare journey.",
whyClinmatchDesc:
  "ClinMatch Health is an independent medical tourism coordination platform designed to make treatment journeys in Turkey safer, clearer and more organized for international patients.",

whyClinmatchCards: [
  "Multilingual patient communication",
  "Smart treatment pre-matching",
  "Application and coordination tracking",
  "Turkey-based healthcare expertise",
],
    footer: "Plataforma premium de turismo médico basada en Turquía.",
  },

  ru: {
    nav: ["Лечение", "Клиники", "Процесс", "Заявка"],
    badge: "Умный доступ к премиальной медицинской сети Турции",
    title: "Мы подбираем подходящего врача, клинику и план лечения.",
    desc: "ClinMatch Health соединяет иностранных пациентов с надежными клиниками, профильными врачами и персонализированными вариантами лечения в Турции.",
    primary: "Бесплатная заявка",
    secondary: "Как это работает",
    trustChips: ["Премиальный опыт пациента", "Многоязычная поддержка", "Безопасный процесс заявки"],
    features: [
      "Многоязычная коммуникация с пациентами",
      "Умный предварительный подбор по запросу лечения",
      "Отслеживание заявки, оценки и координации",
      "Опыт медицинского туризма в Турции",
    ],
    whyTurkeyLabel: "ПОЧЕМУ ТУРЦИЯ?",
    whyTurkeyTitle: "Турция является одним из ведущих направлений медицинского туризма в мире.",
    whyTurkeyDesc: "Благодаря международно аккредитованным больницам, опытным врачам, современным технологиям и быстрым процессам лечения Турция ежегодно принимает миллионы пациентов.",
    whyTurkeyItems: [
      "Больницы мирового уровня",
      "Сеть опытных специалистов",
      "Быстрые процессы записи",
      "Преимущество стоимости",
      "Премиальный опыт пациента",
    ],
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
    whyClinmatchLabel: "WHY CLINMATCH",
whyClinmatchTitle: "One coordination point for your premium healthcare journey.",
whyClinmatchDesc:
  "ClinMatch Health is an independent medical tourism coordination platform designed to make treatment journeys in Turkey safer, clearer and more organized for international patients.",

whyClinmatchCards: [
  "Multilingual patient communication",
  "Smart treatment pre-matching",
  "Application and coordination tracking",
  "Turkey-based healthcare expertise",
],
    footer: "Премиальная платформа медицинского туризма в Турции.",
  },

  ar: {
    nav: ["العلاجات", "العيادات", "العملية", "التقديم"],
    badge: "وصول ذكي إلى شبكة الرعاية الصحية المميزة في تركيا",
    title: "نطابقك مع الطبيب والمستشفى وخطة العلاج المناسبة.",
    desc: "تربط ClinMatch Health المرضى الدوليين بالمستشفيات الموثوقة والأطباء المتخصصين وخيارات العلاج الشخصية في تركيا.",
    primary: "طلب مجاني",
    secondary: "كيف يعمل النظام",
    trustChips: ["تجربة مريض مميزة", "دعم متعدد اللغات", "عملية تقديم آمنة"],
    features: [
      "تواصل متعدد اللغات مع المرضى",
      "مطابقة أولية ذكية حسب طلب العلاج",
      "متابعة الطلب والتقييم والتنسيق",
      "تجربة سياحة علاجية مقرها تركيا",
    ],
    whyTurkeyLabel: "لماذا تركيا؟",
    whyTurkeyTitle: "تعد تركيا واحدة من أبرز وجهات السياحة العلاجية في العالم.",
    whyTurkeyDesc: "بفضل المستشفيات المعتمدة دولياً، والأطباء ذوي الخبرة، والتكنولوجيا الحديثة، وسرعة إجراءات العلاج، تستقبل تركيا ملايين المرضى كل عام.",
    whyTurkeyItems: [
      "مستشفيات بمستوى عالمي",
      "شبكة من الأطباء المتخصصين",
      "إجراءات مواعيد سريعة",
      "ميزة من حيث التكلفة",
      "تجربة مريض مميزة",
    ],
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
    whyClinmatchLabel: "WHY CLINMATCH",
whyClinmatchTitle: "One coordination point for your premium healthcare journey.",
whyClinmatchDesc:
  "ClinMatch Health is an independent medical tourism coordination platform designed to make treatment journeys in Turkey safer, clearer and more organized for international patients.",

whyClinmatchCards: [
  "Multilingual patient communication",
  "Smart treatment pre-matching",
  "Application and coordination tracking",
  "Turkey-based healthcare expertise",
],
    footer: "منصة تركية مميزة لمطابقة السياحة الطبية.",
  },
};
const serviceNetwork = [
  "Estetik Cerrahi Merkezleri",
  "Diş Sağlığı Klinikleri",
  "Saç Ekimi Merkezleri",
  "Obezite Cerrahisi Birimleri",
  "Göz Tedavi Merkezleri",
  "Tüp Bebek Merkezleri",
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showCookie, setShowCookie] = useState(true);
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
    {showCookie && (
  <div
  style={{
    position: "fixed",
    left: 0,
    right: 0,
    bottom: "24px",
    zIndex: 9999,
  }}
  className="flex justify-center px-4"
>
    <div className="w-full max-w-3xl rounded-[2rem] border border-cyan-100 bg-white p-5 shadow-2xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h3 className="text-lg font-black text-slate-900">
            Çerez Tercihleri
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            ClinMatch Health, site deneyimini geliştirmek ve başvuruların
            güvenli şekilde işlenmesini sağlamak amacıyla çerezlerden
            yararlanmaktadır.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            onClick={() => setShowCookie(false)}
            className="rounded-full bg-cyan-600 px-5 py-3 text-sm font-bold text-white"
          >
            Kabul Et
          </button>

          <button
            onClick={() => setShowCookie(false)}
            className="rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600"
          >
            Sadece Gerekli
          </button>

          <a
            href="/privacy"
            className="rounded-full px-4 py-3 text-sm font-bold text-cyan-700"
          >
            Detaylar
          </a>
        </div>
      </div>
    </div>
  </div>
)}
      <a
  href="https://wa.me/905073586382"
  target="_blank"
  className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 px-6 py-4 font-bold text-white shadow-2xl transition hover:scale-105"
>
  WhatsApp Danışmanlık
</a>
      <nav className="relative z-50 border-b border-cyan-100 bg-white px-8 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
         <div>
  <Image
   src="/images/hero-3.jpg"
    alt="ClinMatch Health"
    width={320}
    height={90}
    priority
    className="h-auto w-[260px]"
  />
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

      <section
  className="relative overflow-hidden px-8 py-24"
  style={{
    backgroundImage:
      "linear-gradient(90deg, rgba(248,252,255,0.98) 0%, rgba(248,252,255,0.90) 38%, rgba(248,252,255,0.35) 68%, rgba(248,252,255,0.10) 100%), url('/images/hero-1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center right",
  }}
>
        <div className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-cyan-200/50 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-teal-200/50 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2 text-sm font-bold text-cyan-700">{t.badge}</div>
            <h2 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">{t.title}</h2>
            

<div className="mt-8 flex flex-wrap gap-3">
  {t.trustChips.map((item) => (
    <span
      key={item}
      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
    >
      ✓ {item}
    </span>
  ))}
</div>

<p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
  {t.desc}
</p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#apply" className="rounded-full bg-cyan-600 px-8 py-4 font-bold text-white shadow-xl shadow-cyan-200 hover:bg-cyan-700">{t.primary}</a>
              <a href="#process" className="rounded-full border border-cyan-100 bg-white px-8 py-4 font-bold text-slate-700 shadow-sm">{t.secondary}</a>
            </div>
          </div>

     
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-8 py-24">
  <div className="grid items-center gap-12 md:grid-cols-2">

    <div>
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-600">
  {t.whyTurkeyLabel}
</p>

<h2 className="mt-4 text-5xl font-black leading-tight text-slate-900">
  {t.whyTurkeyTitle}
</h2>

<p className="mt-6 text-lg leading-8 text-slate-600">
  {t.whyTurkeyDesc}
</p>

<div className="mt-8 space-y-3 text-slate-700">
  {t.whyTurkeyItems.map((item) => (
    <div key={item}>✓ {item}</div>
  ))}
</div>
    </div>

    <div>
      <Image
        src="/images/hero-2.png"
        alt="Medical Tourism Turkey"
        width={1200}
        height={800}
        className="rounded-lg shadow-[0_25px_80px_rgba(0,0,0,0.15)]"
      />
    </div>

  </div>
</section>
      <section className="px-8 pb-10">
  <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
    {[
      "Çok Dilli Destek",
      "Ücretsiz Ön Değerlendirme",
      "7/24 Hasta Danışmanlığı",
      "Türkiye Merkezli Hizmet",
    ].map((item) => (
      <div
        key={item}
        className="rounded-2xl border border-cyan-100 bg-white p-5 text-center font-semibold shadow-sm"
      >
        ✓ {item}
      </div>
    ))}
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
<section className="mx-auto max-w-7xl px-8 py-20">
  <div className="rounded-[2.5rem] border border-cyan-100 bg-white p-8 shadow-xl shadow-cyan-50 md:p-12">
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-600">
          Why ClinMatch
        </p>

        <h2 className="mt-4 text-4xl font-black leading-tight">
          {t.networkTitle}
        </h2>

        <p className="mt-5 leading-8 text-slate-600">
          {t.networkDesc}
        </p>
      </div>

      <div className="grid gap-4">
  {t.features.map((item: string) => (
          <div
            key={item}
            className="rounded-2xl border border-cyan-100 bg-[#F8FCFF] p-5 font-semibold text-slate-700"
          >
            ✓ {item}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
<section className="mx-auto max-w-7xl px-8 py-20">
  <div className="rounded-[2.5rem] border border-cyan-100 bg-white p-8 shadow-xl shadow-cyan-50 md:p-12">
    <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-600">
      Neden ClinMatch?
    </p>

    <h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight">
      Sağlık turizmi sürecini daha şeffaf, daha düzenli ve daha güvenilir hale getiriyoruz.
    </h2>

    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {[
        [
          "Bağımsız Koordinasyon",
          "ClinMatch Health bir hastane değildir; kullanıcıları uygun sağlık hizmeti seçenekleriyle buluşturan bağımsız bir koordinasyon platformudur.",
        ],
        [
          "Güvenli Ön Başvuru",
          "Başvurular tek sistemde toplanır, tedavi ihtiyacına göre değerlendirilir ve süreç daha yönetilebilir hale gelir.",
        ],
        [
          "Premium Hasta Deneyimi",
          "Çok dilli iletişim, dijital başvuru akışı ve organize süreç yapısıyla uluslararası hastalara daha net bir deneyim sunar.",
        ],
      ].map(([title, text]) => (
        <div
          key={title}
          className="rounded-3xl border border-cyan-100 bg-[#F8FCFF] p-7"
        >
          <h3 className="text-xl font-black">{title}</h3>
          <p className="mt-4 leading-7 text-slate-600">{text}</p>
        </div>
      ))}
    </div>
  </div>
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
            {serviceNetwork.map((item) => (
  <div key={item} className="rounded-2xl border border-cyan-100 bg-[#F8FCFF] p-6">
    <h3 className="text-xl font-black">{item}</h3>
    <p className="mt-3 text-sm leading-6 text-slate-500">{t.hospitalText}</p>
  </div>
))}
          </div>
        </div>
      </section>
<section className="bg-white px-8 py-24">
  <div className="mx-auto max-w-7xl">
    <h2 className="text-center text-4xl font-black">
      Tedavi Süreci Nasıl İşliyor?
    </h2>

    <div className="mt-16 grid gap-6 md:grid-cols-5">
      {[
        "Başvuru Yap",
        "Dosyanı İnceleyelim",
        "Tedavi Planı Oluşturalım",
        "Seyahatini Organize Edelim",
        "Tedavini Tamamla",
      ].map((item, index) => (
        <div
          key={item}
          className="rounded-3xl border border-cyan-100 bg-sky-50 p-6 text-center"
        >
          <div className="mb-4 text-4xl font-black text-cyan-600">
            {index + 1}
          </div>

          <h3 className="font-bold">{item}</h3>
        </div>
      ))}
    </div>
  </div>
</section>
<section className="mx-auto max-w-7xl px-8 py-20">
  <div className="grid gap-6 md:grid-cols-3">
   {[
  {
    title: lang === "tr" ? "Hastalar İçin" : "For Patients",
    desc:
      lang === "tr"
        ? "Tedavi arayan kullanıcılar başvuru formu üzerinden ihtiyaçlarını paylaşır ve süreç boyunca bilgilendirilir."
        : "Patients can share their treatment needs through the application form and stay informed throughout the process.",
  },
  {
    title: lang === "tr" ? "Klinikler İçin" : "For Clinics",
    desc:
      lang === "tr"
        ? "Sağlık kuruluşları için nitelikli hasta taleplerinin daha düzenli değerlendirilmesini sağlayan dijital bir ön başvuru yapısı sunar."
        : "Healthcare providers receive a structured digital pre-application flow for qualified patient requests.",
  },
  {
    title: lang === "tr" ? "Koordinatörler İçin" : "For Coordinators",
    desc:
      lang === "tr"
        ? "Başvurular, tedavi kategorisi ve hasta ihtiyacına göre daha yönetilebilir bir koordinasyon akışına dönüştürülür."
        : "Applications are turned into a more manageable coordination flow based on treatment category and patient needs.",
  },
].map((card) => (
      <div
        key={card.title}
        className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-sm"
      >
        <h3 className="text-2xl font-black">{card.title}</h3>
        <p className="mt-4 leading-7 text-slate-600">{card.desc}</p>
      </div>
    ))}
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
           <p className="mt-3 text-slate-500">
  © 2026 ClinMatch Health. Tüm hakları saklıdır.
</p>
<p className="mt-3 text-sm text-slate-500">
  Medical Tourism • Hair Transplant • Dental Treatments • Plastic Surgery • IVF • Bariatric Surgery
</p>
<p className="mt-3 max-w-3xl text-xs leading-6 text-slate-400">
  ClinMatch Health is an independent medical tourism coordination platform
  connecting international patients with treatment opportunities in Turkey.
</p>

<p className="mt-2 text-sm text-slate-500">
  Istanbul, Türkiye • info@clinmatchealth.com
</p>
            <div className="mt-6 space-y-3">
  <p className="max-w-3xl text-xs leading-6 text-slate-400">
    ClinMatch Health bir hastane, klinik veya sağlık hizmeti sağlayıcısı
    değildir. Platform, kullanıcıları tedavi seçenekleri hakkında
    bilgilendirmek ve başvurularını uygun sağlık kuruluşlarına yönlendirmek
    amacıyla çalışan bağımsız bir hasta eşleştirme ve koordinasyon
    platformudur.
  </p>

  <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
    <a href="/privacy">Gizlilik Politikası</a>
    <a href="/kvkk">KVKK Aydınlatma Metni</a>
    <a href="/terms">Kullanım Şartları</a>
  </div>
</div>
          </div>
          
        </div>
      </footer>
    </main>
  );
}