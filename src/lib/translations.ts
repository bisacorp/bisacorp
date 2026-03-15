export type Language = "id" | "en";

export const translations = {
  id: {
    nav: {
      services: "Layanan",
      portfolio: "Portofolio",
      about: "Tentang Kami",
      contact: "Kontak",
      cta: "Mulai Sekarang",
    },
    hero: {
      title: "Tingkatkan",
      vision: "Visi",
      subtitle: "Anda dengan BISA Corp",
      badge: "Solusi Digital Generasi Berikutnya",
      description:
        "Kami spesialis dalam pengembangan web mutakhir, aplikasi seluler, model berbasis AI, dan desain khusus. Transformasikan bisnis Anda dengan teknologi yang stabil, profesional, dan inovatif.",
      btnServices: "Layanan Kami",
      btnPortfolio: "Lihat Portofolio",
    },
    services: {
      badge: "Apa yang Kami Lakukan",
      title: "Solusi Digital Komprehensif untuk Perusahaan Modern",
      description:
        "BISA Corp menyediakan rangkaian layanan terintegrasi yang dirancang untuk memajukan bisnis Anda di lanskap digital yang kompetitif.",
      web: {
        title: "Pengembangan Web",
        desc: "Aplikasi web yang kokoh, terukur, dan responsif yang dibangun dengan teknologi terbaru.",
        features: [
          "Kustom React/NextJS",
          "Platform E-commerce",
          "Integrasi CMS",
        ],
      },
      app: {
        title: "Pembuatan Aplikasi",
        desc: "Pengalaman seluler intuitif untuk iOS dan Android yang menarik dan mempertahankan pengguna.",
        features: [
          "Flutter Lintas Platform",
          "iOS/Android Native",
          "Optimasi UI/UX",
        ],
      },
      ai: {
        title: "Pengembangan Model AI",
        desc: "Otomatisasi cerdas dan wawasan berbasis data melalui model pembelajaran mesin khusus.",
        features: ["Analitik Prediktif", "Solusi NLP", "Fine-tuning LLM"],
      },
      design: {
        title: "Solusi Desain",
        desc: "Identitas merek dan desain digital yang beresonansi dengan target audiens Anda.",
        features: ["Strategi Merek", "Desain UI/UX", "Desain Grafis"],
      },
      hoverHint: "Arahkan kursor untuk fitur",
      keyFeatures: "Fitur Utama",
    },
    portfolio: {
      badge: "Pekerjaan Kami",
      title: "Menciptakan Keunggulan Digital di Berbagai Industri",
      filters: {
        all: "Semua Proyek",
        web: "Web",
        app: "Aplikasi",
        ai: "AI",
      },
      empty: "Tidak ada proyek ditemukan dalam kategori ini.",
      projects: [
        {
          title: "Platform Analitik Quantum",
          category: "AI & Data",
          desc: "Dasbor komprehensif untuk pemodelan data prediktif waktu nyata.",
        },
        {
          title: "Dasbor Logistik Global",
          category: "Pengembangan Web",
          desc: "Sistem pelacakan dan manajemen inventaris waktu nyata untuk pengiriman internasional.",
        },
        {
          title: "Aplikasi Kesehatan Pulse",
          category: "Aplikasi Seluler",
          desc: "Aplikasi pemantauan kesehatan terintegrasi perangkat yang dapat dikenakan.",
        },
        {
          title: "Identitas Merek Aura",
          category: "Desain",
          desc: "Rebranding visual lengkap untuk rumah mode berkelanjutan yang mewah.",
        },
      ],
    },
    aiExplainer: {
      badge: "Inovasi Berbasis AI",
      title: "Visualisasikan Masa Depan Anda dengan AI Explainer",
      description:
        "Tidak yakin bagaimana AI cocok dengan bisnis Anda? Masukkan jenis bisnis Anda, dan konsultan AI kami akan menghasilkan solusi khusus yang dirancang untuk Anda.",
      labelBusiness: "Apa jenis bisnis Anda?",
      placeholderBusiness: "misal: E-commerce, Real Estate, Manufaktur",
      labelProblem: "Tantangan spesifik? (Opsional)",
      placeholderProblem: "misal: Manajemen stok, retensi pelanggan",
      btnGenerate: "Hasilkan Solusi AI",
      btnLoading: "Memproses...",
      resultTitle: "Kasus Penggunaan AI Personal",
      btnRestart: "Mulai Lagi",
      emptyState:
        "Lengkapi formulir untuk melihat bagaimana BISA Corp dapat mentransformasi bisnis Anda dengan AI.",
    },
    contact: {
      badge: "Hubungi Kami",
      title: "Siap Membangun Sesuatu yang Luar Biasa?",
      description:
        "Apakah Anda memiliki proyek spesifik atau hanya ingin menjelajahi berbagai kemungkinan, tim kami siap membantu Anda menavigasi transformasi digital Anda.",
      emailTitle: "Email Kami",
      waTitle: "WhatsApp Kami",
      waSubtitle: "(Chat Instan)",
      officeTitle: "Kantor Pusat",
      form: {
        name: "Nama Lengkap",
        namePlaceholder: "Budi Santoso",
        email: "Alamat Email",
        emailPlaceholder: "budi@perusahaan.com",
        subject: "Subjek",
        subjectPlaceholder: "Pertanyaan Proyek",
        message: "Bagaimana kami bisa membantu?",
        messagePlaceholder: "Ceritakan tentang proyek atau tujuan Anda...",
        btnSend: "Kirim Pesan",
        btnSending: "Mengirim...",
        successTitle: "Pesan Terkirim!",
        successDesc:
          "Kami telah menerima pertanyaan Anda dan akan segera menghubungi Anda.",
      },
    },
    footer: {
      description:
        "BISA Corp Digital adalah mitra teknologi layanan lengkap yang membantu bisnis berkembang melalui perangkat lunak inovatif dan solusi desain ahli.",
      servicesTitle: "Layanan",
      companyTitle: "Perusahaan",
      copyright: "Seluruh hak cipta dilindungi.",
      privacy: "Kebijakan Privasi",
      terms: "Syarat Layanan",
      links: {
        about: "Tentang Kami",
        portfolio: "Portofolio Kami",
        careers: "Karir",
        contact: "Kontak",
      },
    },
    about: {
      hero: {
        title: "Mendorong Keunggulan",
        digital: "Digital",
        since: "Sejak 2026",
        desc: "BISA Corp didirikan atas prinsip bahwa teknologi kelas atas harus dapat diakses, stabil, dan berorientasi pada hasil. Kami adalah kolektif insinyur, desainer, dan spesialis AI yang berdedikasi untuk menciptakan produk yang mendefinisikan pasar.",
      },
      mission: {
        title: "Misi Kami",
        desc: "Misi kami adalah memberdayakan organisasi melalui solusi teknologi inovatif yang stabil dan terobosan. Kami percaya dalam membangun kemitraan, bukan hanya proyek.",
        items: [
          "Inovasi dengan Integritas",
          "Keunggulan Berpusat pada Pengguna",
          "Stabilitas Tanpa Kompromi",
          "Visi Global, Dampak Lokal",
        ],
      },
      team: {
        badge: "Kepemimpinan Kami",
        title: "Para Pemikir di Balik BISA Corp",
        members: [
          { name: "I Gusti Ngurah Agus Satria Wibawa", role: "Pendiri" },
          { name: "I Putu Arya Wisnu Wardhana", role: "Pendiri" },
          { name: "Kadek Pasek Divandra Kusuma", role: "Pendiri" },
          { name: "I Gusti Ngurah Bayu Wipradnyana", role: "Pendiri" },
        ],
      },
    },
  },
  en: {
    nav: {
      services: "Services",
      portfolio: "Portfolio",
      about: "About Us",
      contact: "Contact",
      cta: "Get Started",
    },
    hero: {
      title: "Elevate",
      vision: "Your Vision",
      subtitle: "with BISA Corp",
      badge: "Next Generation Digital Solutions",
      description:
        "We specialize in cutting-edge web development, mobile applications, AI-based models, and custom design. Transform your business with stable, professional, and innovative technology.",
      btnServices: "Our Services",
      btnPortfolio: "View Portfolio",
    },
    services: {
      badge: "What We Do",
      title: "Comprehensive Digital Solutions for Modern Enterprises",
      description:
        "BISA Corp provides an integrated suite of services designed to propel your business forward in the competitive digital landscape.",
      web: {
        title: "Web Development",
        desc: "Robust, scalable, and responsive web applications built with the latest technologies.",
        features: [
          "Custom React/NextJS",
          "E-commerce Platforms",
          "CMS Integration",
        ],
      },
      app: {
        title: "App Creation",
        desc: "Intuitive mobile experiences for iOS and Android that engage and retain users.",
        features: [
          "Cross-platform Flutter",
          "Native iOS/Android",
          "UI/UX Optimization",
        ],
      },
      ai: {
        title: "AI Model Development",
        desc: "Intelligent automation and data-driven insights through custom machine learning models.",
        features: ["Predictive Analytics", "NLP Solutions", "LLM Fine-tuning"],
      },
      design: {
        title: "Design Solutions",
        desc: "Brand identity and digital designs that resonate with your target audience.",
        features: ["Brand Strategy", "UI/UX Design", "Graphic Design"],
      },
      hoverHint: "Hover for features",
      keyFeatures: "Key Features",
    },
    portfolio: {
      badge: "Our Work",
      title: "Crafting Digital Excellence Across Industries",
      filters: {
        all: "All Projects",
        web: "Web",
        app: "App",
        ai: "AI",
      },
      empty: "No projects found in this category.",
      projects: [
        {
          title: "Quantum Analytics Platform",
          category: "AI & Data",
          desc: "Comprehensive dashboard for real-time predictive data modeling.",
        },
        {
          title: "Global Logistics Dashboard",
          category: "Web Development",
          desc: "Real-time inventory management and tracking system for international shipping.",
        },
        {
          title: "Pulse Health App",
          category: "Mobile App",
          desc: "Health monitoring app integrated with wearable devices.",
        },
        {
          title: "Aura Brand Identity",
          category: "Design",
          desc: "Full visual rebranding for a luxury sustainable fashion house.",
        },
      ],
    },
    aiExplainer: {
      badge: "AI-Powered Innovation",
      title: "Visualize Your Future with AI Explainer",
      description:
        "Not sure how AI fits into your business? Enter your business type, and our AI consultant will generate custom solutions designed for you.",
      labelBusiness: "What's your business type?",
      placeholderBusiness: "e.g., E-commerce, Real Estate, Manufacturing",
      labelProblem: "Specific challenges? (Optional)",
      placeholderProblem: "e.g., Inventory management, customer retention",
      btnGenerate: "Generate AI Solutions",
      btnLoading: "Processing...",
      resultTitle: "Personal AI Use Cases",
      btnRestart: "Start Over",
      emptyState:
        "Complete the form to see how BISA Corp can transform your business with AI.",
    },
    contact: {
      badge: "Contact Us",
      title: "Ready to Build Something Extraordinary?",
      description:
        "Whether you have a specific project in mind or just want to explore possibilities, our team is here to help you navigate your digital transformation.",
      emailTitle: "Email Us",
      waTitle: "WhatsApp Us",
      waSubtitle: "(Instant Chat)",
      officeTitle: "Headquarters",
      form: {
        name: "Full Name",
        namePlaceholder: "John Doe",
        email: "Email Address",
        emailPlaceholder: "john@company.com",
        subject: "Subject",
        subjectPlaceholder: "Project Inquiry",
        message: "How can we help?",
        messagePlaceholder: "Tell us about your project or goals...",
        btnSend: "Send Message",
        btnSending: "Sending...",
        successTitle: "Message Sent!",
        successDesc:
          "We've received your inquiry and will get back to you shortly.",
      },
    },
    footer: {
      description:
        "BISA Corp Digital is a full-service technology partner helping businesses grow through innovative software and expert design solutions.",
      servicesTitle: "Services",
      companyTitle: "Company",
      copyright: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      links: {
        about: "About Us",
        portfolio: "Our Portfolio",
        careers: "Careers",
        contact: "Contact",
      },
    },
    about: {
      hero: {
        title: "Driving Digital",
        digital: "Excellence",
        since: "Since 2026",
        desc: "BISA Corp was founded on the principle that high-end technology should be accessible, stable, and results-oriented. We are a collective of engineers, designers, and AI specialists dedicated to creating market-defining products.",
      },
      mission: {
        title: "Our Mission",
        desc: "Our mission is to empower organizations through innovative, stable, and breakthrough technology solutions. We believe in building partnerships, not just projects.",
        items: [
          "Innovation with Integrity",
          "User-Centric Excellence",
          "Uncompromised Stability",
          "Global Vision, Local Impact",
        ],
      },
      team: {
        badge: "Our Leadership",
        title: "The Minds Behind BISA Corp",
        members: [
          { name: "I Gusti Ngurah Agus Satria Wibawa", role: "Founder" },
          { name: "I Putu Arya Wisnu Wardhana", role: "Founder" },
          { name: "Kadek Pasek Divandra Kusuma", role: "Founder" },
          { name: "I Gusti Ngurah Bayu Wipradnyana", role: "Founder" },
        ],
      },
    },
  },
};
