import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Building2, Lock, ShieldCheck, PieChart, Users, FileText,
  Menu, X, LogIn, ChevronRight, Eye, EyeOff, CheckCircle,
  AlertCircle, Download, Printer, Activity, CreditCard,
  ArrowRightLeft, Settings, Database, History, Search, Info, Globe,
  Plus, Trash2, Edit, CheckSquare, XCircle, FilePlus, Clock, UserCheck, Briefcase, Save, Truck, Scale, RefreshCcw, Loader2, DollarSign, HelpCircle, AlertTriangle, RotateCcw, Wallet, TrendingUp, TrendingDown
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  Legend, ResponsiveContainer, PieChart as RePie, Pie, Cell, LineChart, Line
} from 'recharts';

/**
 * LİKYA PAY - GLOBAL FINANCIAL OPTIMIZATION PLATFORM
 * VERSION: 1.1.0 (CASH REPORT ADDED)
 * - Added "Daily Cash Report" to Accounting Module
 * - Integrated Opening Balance and Net Cash calculations
 * - Enhanced visuals with new icons
 */

// --- YARDIMCI FONKSİYONLAR ---

const numberToTurkishWords = (amount) => {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount) + " (Türk Lirası)";
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
};

const getCurrentDate = (lang) => {
  return new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// --- DİL VE İÇERİK YÖNETİMİ ---

const TRANSLATIONS = {
  tr: {
    nav: {
      how: "Nasıl Çalışır?",
      vision: "Vizyon & Hedefler",
      legal: "Yasal Çerçeve",
      login: "Giriş Yap / Kayıt Ol",
      panel: "Panel"
    },
    hero: {
      badge: "Yeni Nesil Finansal Optimizasyon",
      titleStart: "Ticari Borçlarınızı",
      titleHighlight: "Nakit Kullanmadan",
      titleEnd: "Kapatın",
      desc: "Bilançolarınızı rahatlatın. Zincirleme borçları Likya Pay'in akıllı algoritmalarıyla mahsuplaştırın. Banka değil, çözüm ortağıyız.",
      applyBtn: "Hemen Başvurun",
      discoverBtn: "Sistemi Keşfet",
      cycleUser: "Sizin Şirketiniz\n(Borçlu)",
      cycleSupplier: "Tedarikçi A",
      cycleCustomer: "Müşteri B",
      offset: "MAHSUPLAŞMA"
    },
    features: {
      title: "Finansal Özgürlük Teknolojisi",
      subtitle: "Likya Pay, geleneksel faktoring veya krediden farklıdır. Öz kaynağınızı korur.",
      f1_title: "Çok Taraflı Mahsuplaşma",
      f1_desc: "Likya Pay, tedarik zincirindeki kapalı devre borç döngülerini tespit eder ve nakit gerektirmeden borçları siler.",
      f2_title: "Yasal Güvence & Temlik",
      f2_desc: "Tüm işlemler 6098 sayılı Türk Borçlar Kanunu çerçevesinde temlik ve takas sözleşmeleri ile kayıt altına alınır.",
      f3_title: "Denetlenebilir Finans",
      f3_desc: "Sistem, bağımsız denetime uygun, şeffaf ve izlenebilir bir dijital muhasebe altyapısı sunar.",
      moreInfo: "Detaylı Bilgi: Bu özellik sayesinde şirketler arası nakit akışı bozulmadan bilanço temizliği sağlanır."
    },
    footer: {
      disclaimer: "Likya Pay, 6493 sayılı kanun kapsamında bir ödeme kuruluşu veya banka değildir. Faaliyetlerimiz 6098 sayılı Türk Borçlar Kanunu'nun 183. ve devamı maddelerindeki 'Alacağın Devri' ve 'Takas' hükümlerine dayanmaktadır.",
      corporate: "Kurumsal",
      legal: "Yasal",
      rights: "Tüm hakları saklıdır."
    },
    auth: {
      backHome: "Ana Sayfa",
      slogan: "Güvenli Finansal Optimizasyon Platformu",
      loginTab: "GİRİŞ YAP",
      registerTab: "KAYIT OL",
      companyName: "Firma Ünvanı",
      taxId: "Vergi No",
      authName: "Yetkili Ad Soyad",
      phone: "Telefon",
      email: "E-Posta / Kullanıcı Adı",
      password: "Şifre",
      loginBtn: "GÜVENLİ GİRİŞ",
      registerBtn: "HESAP OLUŞTUR",
      agreement: "Kullanıcı Sözleşmesi",
      welcome: "Tekrar Hoşgeldiniz",
      security: ["256-bit SSL Şifreleme", "KVKK Uyumlu Veri Saklama", "Resmi Temlik Altyapısı"]
    },
    admin: {
      dashboard: "Yönetim Paneli",
      users: "Kullanıcı Yönetimi",
      cycles: "Döngü İşlemleri",
      archive: "Dijital Arşiv (5 Yıl)",
      accounting: "Muhasebe & Finans",
      logout: "Güvenli Çıkış",
      welcome: "Hoşgeldiniz, Sn. Yönetici",
      cards: {
        totalComp: "Toplam Firma",
        totalDebt: "Toplam Borç Havuzu",
        totalCredit: "Toplam Alacak Havuzu",
        revenue: "Toplam Komisyon Geliri",
        activeCycles: "Aktif Döngüler",
        createdCycles: "Tamamlanan Döngüler",
        pendingCycles: "Bekleyen Döngüler"
      },
      userTable: {
        header: "Kullanıcı Listesi",
        tabCustomers: "Müşteriler (Döngü)",
        tabSuppliers: "Tedarikçiler (Gider)",
        tabEmployees: "Çalışanlar (İK)",
        simplifiedMode: "Basitleştirilmiş Kayıt Modu",
        simplifiedDesc: "Aktif olduğunda sadece Ad Soyad/Şifre istenir. Evraklar sonra yüklenir.",
        colComp: "Firma",
        colAuth: "Yetkili / İsim",
        colDept: "Departman",
        colJob: "Ünvan",
        colSector: "Hizmet / Sektör",
        colStatus: "Durum",
        colAction: "İşlem",
        addUser: "Yeni Kayıt",
        active: "Aktif",
        passive: "Pasif",
        editTitle: "Kullanıcı Bilgilerini Düzenle",
        addTitle: "Yeni Kullanıcı Ekle",
        save: "Değişiklikleri Kaydet",
        cancel: "İptal"
      },
      cyclePage: {
        title: "Döngü Yönetimi ve Mahsuplaşma",
        createBtn: "Maksimum Zincir Tara / Oluştur",
        scanning: "Maksimum Katılım Taranıyor...",
        manualClose: "Manuel Kapat",
        statusWait: "Ödeme Bekliyor",
        statusDone: "Tamamlandı",
        commission: "Hizmet Bedeli",
        contractModalTitle: "RESMİ MAHSUPLAŞMA VE TEMLİK PROTOKOLÜ",
        stepPay: "Hizmet Bedeli",
        stepContract: "Sözleşme Onayı",
        tooltipClose: "Kapatmak için tüm firmaların ödeme ve onayları tamamlanmalıdır."
      },
      accPage: {
        title: "Gelir / Gider Yönetimi",
        income: "Gelirler",
        expense: "Giderler",
        net: "Net Kar",
        addRecord: "Kayıt Ekle",
        cashReport: "Günlük Kasa Raporu",
        devreden: "Devreden Bakiye",
        gunlukGiris: "Günlük Giriş",
        gunlukCikis: "Günlük Çıkış",
        netKasa: "Net Kasa Mevcudu"
      },
      archivePage: {
        title: "Yasal Arşiv (Salt Okunur)",
        desc: "Bu alanda geçmişe dönük tamamlanmış tüm döngülerin kayıtları tutulur. Gerektiğinde revizyon işlemi başlatılabilir.",
        search: "Belge Ara (Protokol No, Firma...)",
        reviseBtn: "Döngüyü Geri Al / Revize Et",
        empty: "Arşivde henüz kayıt bulunmamaktadır."
      }
    },
    user: {
      overview: "Genel Bakış",
      addDebtCredit: "Borç/Alacak Ekle",
      archive: "Arşiv",
      settings: "Ayarlar",
      logout: "Güvenli Çıkış",
      cards: {
        debt: "Toplam Borç Bildirimi",
        credit: "Toplam Alacak Bildirimi",
        potential: "Potansiyel Mahsuplaşma",
        add: "Ekle"
      },
      table: {
        title: "Son İşlemler / Bekleyen Onaylar",
        col1: "Taraf Şirket",
        col2: "Type",
        col3: "Amount",
        col4: "Document",
        col5: "Status",
        debt: "Borç",
        credit: "Alacak",
        pending: "Onay Bekliyor",
        processed: "Sisteme İşlendi"
      }
    },
    modals: {
      close: "Kapat",
      nasilCalisir: {
        title: "Likya Pay Nasıl Çalışır?",
        text: `Likya Pay is a revolutionary financial technology that enables businesses to pay their debts without straining their cash flow. Our system works in 4 basic steps:

1. Data Entry: You record the companies you owe and are owed by into the system along with their invoices.
2. Cycle Detection: Our AI-supported algorithm detects closed-loop debt cycles in the supply chain.
3. Official Reconciliation: A digital reconciliation offer is presented to all companies in the detected cycle.
4. Set-off and Assignment: With the approval of the parties, transactions are completed under the Turkish Code of Obligations No. 6098.`
      },
      vizyon: {
        title: "Vizyon, Misyon ve Hedefler",
        text: `LİKYA PAY VİZYON
• Kobi ekosisteminde güvenli, şeffaf ve otomatik borç/alacak süreçlerini yöneten lider platform olmak.
• Türkiye ve uluslararası pazarda kapalı devre finansal mahsuplaşma sistemleri konusunda referans şirket olmak.
• Blok zincir teknolojisi ile ticari işlemleri hızlı, güvenli ve izlenebilir hale getirmek.

LİKYA PAY MİSYON
• Kobi ve şirketler arasında borç ve alacak işlemlerini dijitalleştirerek kolaylaştırmak ve OPTİMİZASYON SAĞLAMAK.
• Tüm taraflar için güvenli ve denetlenebilir bir ortam sağlamak.
• Aktivasyon ücreti tek kalem ile sistemin sürdürülebilirliğini ve yalnızca gerekli maliyetleri karşılamak.
• Kobi zincirlerindeki ödeme, devretme ve mahsuplaşma işlemlerini otomatikleştirerek finansal verimliliği artırmak.

LİKYA PAY HEDEFLERİ

Kısa Vadeli Hedefler (6-12 ay):
• Pilot uygulamayı 50-100 Kobi ile başlatmak.
• Sistemin borç devri ve zincir mekanizmasını tam çalışır hale getirmek.
• MASAK, BDDK ve TCK/TTK uyumunu sağlamak.

Orta Vadeli Hedefler (1-3 yıl):
• Türkiye genelinde 1000+ Kobi ağı oluşturmak.
• Sistem performansını büyütmek ve blok zincir node sayısını arttırmak.
• Yatırım turu ile mali yapıyı güçlendirmek ve gelir modelini optimize etmek.

Uzun Vadeli Hedefler (3-5 yıl):
• Uluslararası pazarlara açılmak ve çoklu ülke zincirleri oluşturmak.
• Kapalı devre finansal mahsuplaşma platformu olarak lider konuma gelmek.
• Kobi ekosisteminde güven ve finansal verimlilik için standart belirleyen platform olmak.`
      },
      yasal: {
        title: "Yasal Çerçeve ve Güvenlik",
        text: `Likya Pay operates in full compliance with the laws of the Republic of Turkey. Our platform is not a bank or payment institution. Transactions are based on Articles 183 and 139 (Assignment and Set-off) of the Turkish Code of Obligations No. 6098.`
      },
      kesfet: {
        title: "Discover Likya Pay System",
        text: `When you become a member, you can monitor your total debt/credit status and review offsetting suggestions via the advanced Dashboard screen. Registration is completely free.`
      }
    }
  },
  en: {
    nav: { how: "How it Works?", vision: "Vision & Goals", legal: "Legal Framework", login: "Login / Register", panel: "Panel" },
    hero: { badge: "Next Gen Financial Optimization", titleStart: "Settle Commercial Debts", titleHighlight: "Without Cash", titleEnd: "", desc: "Relieve your balance sheets. Offset chain debts with Likya Pay's smart algorithms.", applyBtn: "Apply Now", discoverBtn: "Discover System", cycleUser: "Your Company\n(Debtor)", cycleSupplier: "Supplier A", cycleCustomer: "Customer B", offset: "OFFSETTING" },
    admin: {
        dashboard: "Admin Dashboard",
        users: "User Management",
        cycles: "Cycle Operations",
        archive: "Digital Archive (5 Years)",
        accounting: "Accounting & Finance",
        logout: "Secure Logout",
        welcome: "Welcome, Admin",
        cards: { totalComp: "Total Companies", totalDebt: "Total Debt Pool", totalCredit: "Total Credit Pool", revenue: "Total Commission Revenue", activeCycles: "Active Cycles", createdCycles: "Completed Cycles", pendingCycles: "Pending Cycles" },
        userTable: { header: "User List", tabCustomers: "Customers (Cycle)", tabSuppliers: "Suppliers (Expense)", tabEmployees: "Employees (HR)", simplifiedMode: "Simplified Registration Mode", simplifiedDesc: "When active, only Name/Password is required. Documents uploaded later.", colComp: "Company", colAuth: "Auth. Person / Name", colDept: "Department", colJob: "Title", colSector: "Sector/Service", colStatus: "Status", colAction: "Action", addUser: "Add New Record", active: "Active", passive: "Passive", editTitle: "Edit User Information", save: "Save Changes", cancel: "Cancel" },
        cyclePage: { title: "Cycle Management", createBtn: "Scan (Max Chain)", scanning: "Scanning Max Chain...", manualClose: "Manual Close", statusWait: "Waiting Payment", statusDone: "Completed", commission: "Service Fee", contractModalTitle: "OFFICIAL NETTING AND ASSIGNMENT PROTOCOL", stepPay: "Service Fee", stepContract: "Contract Approval", tooltipClose: "All payments and approvals must be completed." },
        accPage: { title: "Income / Expense Management", income: "Income", expense: "Expenses", net: "Net Profit", addRecord: "Add Record", cashReport: "Daily Cash Report", devreden: "Opening Balance", gunlukGiris: "Daily Inflow", gunlukCikis: "Daily Outflow", netKasa: "Net Cash Balance" },
        archivePage: { title: "Legal Archive (Read Only)", desc: "Completed cycles are stored here. Revisions can be initiated if needed.", search: "Search Document (Contract No, Company...)", reviseBtn: "Rollback / Revise Cycle", empty: "No records in archive yet." }
    },
    user: { overview: "Overview", addDebtCredit: "Add Debt/Credit", archive: "Archive", settings: "Settings", logout: "Secure Logout", cards: { debt: "Total Debt Notification", credit: "Total Credit Notification", potential: "Potential Offsetting", add: "Add" }, table: { title: "Recent Transactions / Pending Approvals", col1: "Counterparty", col2: "Type", col3: "Amount", col4: "Document", col5: "Status", debt: "Debt", credit: "Credit", pending: "Pending", processed: "Processed" } },
    modals: { close: "Close", nasilCalisir: { title: "How it Works", text: "..." }, vizyon: { title: "Vision", text: "..." }, yasal: { title: "Legal", text: "..." }, kesfet: { title: "Discover", text: "..." } }
  }
};

// --- SABİTLER VE MOCK VERİLER ---

const COLORS = ['#0e1c36', '#10b981', '#f59e0b', '#ef4444'];

const MOCK_USERS_INIT = [
  { id: 1, name: 'Admin User', email: 'admin@likyapay.com', role: 'admin', type: 'employee', company: 'Likya Pay HQ', department: 'Yönetim', jobTitle: 'Sistem Yöneticisi', status: 'Aktif', taxId: '9999999999', address: 'Maslak Mah. Büyükdere Cad. No:1 Sarıyer/İstanbul' },
  { id: 2, name: 'Ahmet Yılmaz', email: 'ahmet@demiroglu.com', role: 'user', type: 'customer', company: 'Demiroğlu İnşaat A.Ş.', totalDebt: 1500000, totalCredit: 1200000, status: 'Aktif', taxId: '1234567890', address: 'Ostim OSB 12. Cad. No:5 Ankara' },
  { id: 3, name: 'Ayşe Kaya', email: 'ayse@lojistik.com', role: 'user', type: 'customer', company: 'Hız Lojistik Ltd.', totalDebt: 500000, totalCredit: 800000, status: 'Aktif', taxId: '2345678901', address: 'İkitelli OSB Metal İş. Sit. No:12 İstanbul' },
  { id: 4, name: 'Mehmet Demir', email: 'mehmet@tedarik.com', role: 'user', type: 'customer', company: 'Mega Tedarik A.Ş.', totalDebt: 800000, totalCredit: 200000, status: 'Pasif', taxId: '3456789012', address: 'Nilüfer OSB 5. Sok. No:3 Bursa' },
  { id: 5, name: 'Zeynep Çelik', email: 'zeynep@likyapay.com', role: 'admin', type: 'employee', company: 'Likya Pay HQ', department: 'Finans', jobTitle: 'Finans Uzmanı', status: 'Aktif' },
  { id: 6, name: 'Can Vural', email: 'can@likyapay.com', role: 'admin', type: 'employee', company: 'Likya Pay HQ', department: 'Operasyon', jobTitle: 'Operasyon Sorumlusu', status: 'İzinli' },
  { id: 7, name: 'Sistem Destek', email: 'info@cloudprovider.com', role: 'user', type: 'supplier', company: 'AWS Cloud Services', department: 'Teknoloji', jobTitle: 'Hizmet Sağlayıcı', status: 'Aktif' },
  { id: 8, name: 'Ofis Yönetimi', email: 'yonetim@plaza.com', role: 'user', type: 'supplier', company: 'Plaza Yönetim A.Ş.', department: 'İdari', jobTitle: 'Kira/Aidat', status: 'Aktif' },
];

const MOCK_CYCLES_INIT = [
  {
    id: 'PAY-19122025-01',
    amount: 500000,
    status: 'Tamamlandı',
    date: '2023-12-19',
    commission: 30000,
    participants: [
      { name: 'Demiroğlu İnşaat A.Ş.', hasPaid: true, hasApproved: true },
      { name: 'Hız Lojistik Ltd.', hasPaid: true, hasApproved: true },
      { name: 'Mega Tedarik A.Ş.', hasPaid: true, hasApproved: true }
    ]
  },
  {
    id: 'PAY-19122025-02',
    amount: 250000,
    status: 'Bekliyor',
    date: '2023-12-19',
    commission: 15000,
    participants: [
      { name: 'Alpha Yapı', hasPaid: true, hasApproved: false },
      { name: 'Beta Beton', hasPaid: false, hasApproved: true },
      { name: 'Gamma Çimento', hasPaid: false, hasApproved: false }
    ]
  },
];

const MOCK_ACCOUNTING_INIT = [
  { id: 1, type: 'Gider', cat: 'Personel Giderleri', amount: 12000, desc: 'Ekim Maaş Ödemesi', date: '2023-10-01' },
  { id: 2, type: 'Gider', cat: 'Teknoloji/Sunucu', amount: 500, desc: 'AWS Hosting', date: '2023-10-05' },
];

// --- MUHASEBE KATEGORİLERİ ---
const ACCOUNTING_CATEGORIES = {
  'Gelir': [
    'Yurt İçi Satışlar',
    'Yurt Dışı Satışlar',
    'Hizmet Gelirleri',
    'Komisyon Gelirleri',
    'Cari Hesap Tahsilatları',
    'Faiz ve Kur Farkı Gelirleri',
    'Kira Gelirleri',
    'Diğer Olağandışı Gelirler'
  ],
  'Gider': [
    'Personel Giderleri (Maaş/SGK)',
    'Kira ve Aidat Giderleri',
    'Enerji (Elektrik/Su/Doğalgaz)',
    'Telekomünikasyon (Tel/İnternet)',
    'Vergi, Resim ve Harçlar',
    'Tedarikçi Ödemeleri (Hammadde)',
    'Nakliye ve Lojistik',
    'Pazarlama ve Reklam',
    'Bakım ve Onarım',
    'Yemek ve Yol Giderleri',
    'Kırtasiye ve Ofis Malzemeleri',
    'Mali Müşavirlik / Danışmanlık',
    'Finansman Giderleri (Banka)',
    'Diğer Giderler'
  ]
};

// --- GENEL MODAL KOMPONENTİ ---
const InfoModal = ({ isOpen, onClose, content, lang }) => {
  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 bg-white/10 hover:bg-black/10 text-gray-500 hover:text-red-500 p-2 rounded-full transition z-10"><X size={28} strokeWidth={2.5} /></button>
        <div className="bg-[#0e1c36] p-6 flex justify-between items-center text-white pr-16 shrink-0">
          <div className="flex items-center gap-3">
             <ShieldCheck className="text-emerald-400" size={28} />
             <h3 className="text-xl font-bold">{content.title}</h3>
          </div>
        </div>
        <div className="p-8 overflow-y-auto">
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg font-medium">{content.text}</p>
          </div>
          <div className="mt-8 flex justify-end">
            <button onClick={onClose} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg transition flex items-center gap-2 border border-gray-300"><X size={18} /> {TRANSLATIONS[lang].modals.close}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- YENİ MESAJ MODALI ---
const MessageModal = ({ isOpen, type, title, message, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 border-t-4 border-t-gray-800">
        <div className={`p-6 text-center`}>
          <div className="flex justify-center mb-4">
            {type === 'error' && <div className="bg-red-100 p-3 rounded-full"><AlertTriangle className="text-red-600" size={32}/></div>}
            {type === 'success' && <div className="bg-emerald-100 p-3 rounded-full"><CheckCircle className="text-emerald-600" size={32}/></div>}
            {type === 'confirm' && <div className="bg-blue-100 p-3 rounded-full"><HelpCircle className="text-blue-600" size={32}/></div>}
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-6">{message}</p>

          <div className="flex gap-3 justify-center">
            {type === 'confirm' ? (
              <>
                <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600 font-bold text-sm">İptal</button>
                <button onClick={onConfirm} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-bold text-sm">Onayla ve Kapat</button>
              </>
            ) : (
              <button onClick={onClose} className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 font-bold text-sm">Tamam</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SÖZLEŞME MODALI ---
const ContractModal = ({ isOpen, onClose, cycle, users }) => {
  if (!isOpen || !cycle) return null;
  const [activeTab, setActiveTab] = useState('netting');

  const involvedCompanies = cycle.participants.map(p => {
    return users.find(u => u.company === p.name) || { company: p.name, taxId: 'Bilinmiyor', address: 'Adres Kayıtlı Değil' };
  });

  const firstCompany = involvedCompanies[0];
  const lastCompany = involvedCompanies[involvedCompanies.length - 1];

  const assignmentPairs = [];
  for(let i = 0; i < involvedCompanies.length - 1; i++) {
    assignmentPairs.push({
      from: involvedCompanies[i],
      to: involvedCompanies[i+1],
      originalDebtor: lastCompany
    });
  }

  const handlePrint = (docId) => {
    console.log(`Döküman ${docId} yazıcıya gönderiliyor...`);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col">
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center shrink-0 rounded-t-lg">
          <div className="flex items-center gap-3">
            <Scale className="text-emerald-400" />
            <h3 className="font-bold tracking-wider">RESMİ İŞLEM MERKEZİ ({cycle.id})</h3>
          </div>
          <button onClick={onClose} className="hover:bg-gray-700 p-2 rounded-full transition"><X/></button>
        </div>

        <div className="flex bg-gray-100 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('netting')}
            className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 transition ${activeTab === 'netting' ? 'bg-white text-blue-900 border-t-4 border-blue-900' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <RefreshCcw size={18}/> MAHSUPLAŞMA PROTOKOLÜ (Başlangıç ve Bitiş)
          </button>
          <button
            onClick={() => setActiveTab('assignment')}
            className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 transition ${activeTab === 'assignment' ? 'bg-white text-emerald-700 border-t-4 border-emerald-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <FileText size={18}/> TEMLİK SÖZLEŞMELERİ (Ayrı Sayfalar)
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-gray-50 font-serif text-gray-800">
          <div className="max-w-4xl mx-auto min-h-full">
            {activeTab === 'netting' ? (
              <div className="bg-white p-12 shadow-lg border border-gray-200 mb-8">
                <div className="text-center mb-8 border-b-2 border-black pb-4">
                  <h2 className="text-xl font-bold text-black mb-2">BORÇ TASFİYE VE MAHSUPLAŞMA (TAKAS) PROTOKOLÜ</h2>
                  <p className="text-sm font-bold">Protokol No: {cycle.id}</p>
                  <p className="text-sm">Tarih: {getCurrentDate('tr')}</p>
                </div>
                <div className="mb-6">
                  <h4 className="font-bold underline mb-2">1. TARAFLAR</h4>
                  <div className="grid gap-4 bg-blue-50 p-4 rounded border border-blue-100">
                    <div>
                      <span className="font-bold text-blue-900">BAŞLANGIÇ FİRMASI (Borçlu):</span> <br/>
                      {firstCompany.company} <br/>
                      <span className="text-xs text-gray-500">VKN: {firstCompany.taxId} | {firstCompany.address}</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2">
                      <span className="font-bold text-blue-900">BİTİŞ FİRMASI (Alacaklı):</span> <br/>
                      {lastCompany.company} <br/>
                      <span className="text-xs text-gray-500">VKN: {lastCompany.taxId} | {lastCompany.address}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-bold underline mb-2">2. KONU</h4>
                  <p className="text-justify leading-relaxed">
                    İşbu protokolün konusu, Bitiş Firması'nın, tedarik zinciri içerisindeki alacak devirleri (temlik) neticesinde Başlangıç Firması'ndan alacaklı konuma gelmesi ve bu alacağın, Başlangıç Firması'na olan mevcut borcu ile
                    <span className="font-bold"> 6098 Sayılı Türk Borçlar Kanunu'nun 139. maddesi (Takas)</span> uyarınca karşılıklı olarak mahsup edilmesidir.
                  </p>
                </div>
                <div className="mb-6">
                  <h4 className="font-bold underline mb-2">3. MAHSUP TUTARI</h4>
                  <p className="bg-gray-100 p-3 text-center font-mono font-bold text-lg border">
                    {formatCurrency(cycle.amount)} <br/>
                    <span className="text-xs font-normal font-serif">({numberToTurkishWords(cycle.amount)})</span>
                  </p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-12">
                  <div className="text-center border-t border-black pt-2">
                    <p className="font-bold text-xs">{firstCompany.company}</p>
                    <p className="text-xs text-gray-500">Kaşe / İmza</p>
                  </div>
                  <div className="text-center border-t border-black pt-2">
                    <p className="font-bold text-xs">{lastCompany.company}</p>
                    <p className="text-xs text-gray-500">Kaşe / İmza</p>
                  </div>
                </div>
                <div className="mt-8 text-center no-print">
                   <button onClick={() => handlePrint('NET-' + cycle.id)} className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 flex items-center gap-2 mx-auto">
                     <Printer size={16}/> Bu Protokolü Yazdır
                   </button>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {assignmentPairs.map((pair, idx) => (
                  <div key={idx} className="bg-white p-12 shadow-lg border border-gray-200 relative">
                    <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold rounded-bl-lg">
                      Sözleşme #{idx+1}
                    </div>
                    <div className="text-center mb-8 border-b-2 border-black pb-4">
                      <h2 className="text-xl font-bold text-black mb-2">ALACAK DEVRİ (TEMLİK) SÖZLEŞMESİ</h2>
                      <p className="text-sm font-bold">Ref No: ASN-{cycle.id}-{idx+1}</p>
                      <p className="text-sm">Tarih: {getCurrentDate('tr')}</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-bold underline mb-2">1. HUKUKİ DAYANAK</h4>
                      <p className="text-justify leading-relaxed">
                        İşbu sözleşme, aşağıda bilgileri yer alan firmalar arasında, <span className="font-bold">6098 Sayılı Türk Borçlar Kanunu'nun 183. maddesi (Alacağın Devri)</span> hükümlerine istinaden akdedilmiştir.
                      </p>
                    </div>
                    <div className="space-y-6 mb-8">
                      <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                        <h5 className="font-bold text-emerald-700 border-b border-gray-300 pb-1 mb-2">TEMLİK EDEN (DEVREDEN):</h5>
                        <p className="font-bold">{pair.from.company}</p>
                        <p className="text-sm text-gray-600">VKN: {pair.from.taxId}</p>
                        <p className="text-sm text-gray-600">Adres: {pair.from.address}</p>
                      </div>
                      <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                        <h5 className="font-bold text-blue-700 border-b border-gray-300 pb-1 mb-2">TEMELLÜK ALAN (DEVRALAN):</h5>
                        <p className="font-bold">{pair.to.company}</p>
                        <p className="text-sm text-gray-600">VKN: {pair.to.taxId}</p>
                        <p className="text-sm text-gray-600">Adres: {pair.to.address}</p>
                      </div>
                      <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                        <h5 className="font-bold text-gray-700 border-b border-gray-300 pb-1 mb-2">BORÇLU OLAN ŞİRKET (ASIL BORÇLU):</h5>
                        <p className="font-bold">{pair.originalDebtor.company}</p>
                        <p className="text-sm text-gray-600">VKN: {pair.originalDebtor.taxId}</p>
                        <p className="text-sm text-gray-600">Adres: {pair.originalDebtor.address}</p>
                        <p className="text-xs text-red-500 mt-2 italic">* Temlik edilen alacak, işbu firmaya aittir.</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-bold underline mb-2">2. DEVİR KONUSU ALACAK TUTARI</h4>
                      <p className="bg-gray-100 p-3 text-center font-mono font-bold text-lg border">
                        {formatCurrency(cycle.amount)} <br/>
                        <span className="text-xs font-normal font-serif">({numberToTurkishWords(cycle.amount)})</span>
                      </p>
                    </div>
                    <div className="mt-8 text-center border-t border-gray-200 pt-4">
                       <button onClick={() => handlePrint(`ASN-${cycle.id}-${idx+1}`)} className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 flex items-center gap-2 mx-auto">
                         <Printer size={16}/> Bu Formu Yazdır
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-12 pt-4 border-t border-gray-200 text-center text-[10px] text-gray-400">
              Bu belge Likya Pay platformu üzerinde {getCurrentDate('tr')} tarihinde dijital olarak oluşturulmuştur.
              Islak imza veya E-İmza ile geçerlilik kazanır.
            </div>
          </div>
        </div>
        <div className="bg-white p-4 border-t flex justify-end gap-3 rounded-b-lg">
          <button onClick={onClose} className="px-6 py-2 border rounded text-gray-600 hover:bg-gray-100 font-bold">Kapat</button>
        </div>
      </div>
    </div>
  );
};

// --- DİL SEÇİCİ ---
const LanguageSwitcher = ({ lang, setLang, isMobile = false }) => (
  <button
    onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
    className={`flex items-center gap-2 font-bold transition rounded-full ${isMobile ? 'w-full py-2 text-gray-300 justify-start' : 'bg-white/10 hover:bg-white/20 px-3 py-1 text-white'}`}
  >
    <Globe size={18} className={isMobile ? 'text-emerald-400' : 'text-emerald-300'} />
    <span>{lang === 'tr' ? 'EN' : 'TR'}</span>
    <span className="text-xs opacity-70 font-normal">{lang === 'tr' ? '(Switch to English)' : '(Türkçe\'ye Geç)'}</span>
  </button>
);

// --- SAYFA BİLEŞENLERİ (Önce Tanımla) ---

// 1. ANA SAYFA (LANDING PAGE)
const LandingPage = ({ onLoginClick, lang, setLang }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const [modalOpen, setModalOpen] = useState(false);
  const [currentModalContent, setCurrentModalContent] = useState(null);

  const openInfoModal = (contentKey) => {
    setCurrentModalContent(t.modals[contentKey]);
    setModalOpen(true);
    setMobileMenuOpen(false);
  };

  const features = [
    { id: 1, title: t.features.f1_title, desc: t.features.f1_desc, icon: <ArrowRightLeft /> },
    { id: 2, title: t.features.f2_title, desc: t.features.f2_desc, icon: <FileText /> },
    { id: 3, title: t.features.f3_title, desc: t.features.f3_desc, icon: <PieChart /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <InfoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        content={currentModalContent}
        lang={lang}
      />

      <nav className="bg-[#0e1c36] text-white fixed w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold tracking-wide">LİKYA PAY</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => openInfoModal('nasilCalisir')} className="hover:text-emerald-400 transition font-medium text-sm">{t.nav.how}</button>
              <button onClick={() => openInfoModal('vizyon')} className="hover:text-emerald-400 transition font-medium text-sm">{t.nav.vision}</button>
              <button onClick={() => openInfoModal('yasal')} className="hover:text-emerald-400 transition font-medium text-sm">{t.nav.legal}</button>

              <div className="h-6 w-px bg-gray-600 mx-2"></div>

              <LanguageSwitcher lang={lang} setLang={setLang} />

              <button
                onClick={onLoginClick}
                className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-md font-bold transition flex items-center gap-2 text-sm shadow-md"
              >
                <LogIn size={16} /> {t.nav.login}
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a1529] px-4 pt-2 pb-4 space-y-2 border-t border-gray-700">
            <button onClick={() => openInfoModal('nasilCalisir')} className="block w-full text-left py-3 text-gray-300 hover:text-emerald-400 border-b border-gray-700">{t.nav.how}</button>
            <button onClick={() => openInfoModal('vizyon')} className="block w-full text-left py-3 text-gray-300 hover:text-emerald-400 border-b border-gray-700">{t.nav.vision}</button>
            <button onClick={() => openInfoModal('yasal')} className="block w-full text-left py-3 text-gray-300 hover:text-emerald-400 border-b border-gray-700">{t.nav.legal}</button>
            <div className="py-2">
              <LanguageSwitcher lang={lang} setLang={setLang} isMobile={true} />
            </div>
            <div className="pt-2">
               <button onClick={onLoginClick} className="w-full text-left py-3 text-emerald-400 font-bold bg-white/5 rounded px-4">{t.nav.login}</button>
            </div>
          </div>
        )}
      </nav>

      <header className="relative bg-[#0e1c36] text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           <Activity size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-semibold mb-2 border border-emerald-500/30">
              {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {t.hero.titleStart} <span className="text-emerald-400">{t.hero.titleHighlight}</span> {t.hero.titleEnd}
            </h1>
            <p className="text-gray-300 text-lg max-w-lg">
              {t.hero.desc}
            </p>
            <div className="flex gap-4 pt-4">
              <button onClick={onLoginClick} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg transform hover:-translate-y-1 transition duration-300">
                {t.hero.applyBtn}
              </button>
              <button
                onClick={() => openInfoModal('kesfet')}
                className="border border-gray-500 hover:border-white text-gray-300 hover:text-white px-8 py-3 rounded-lg font-medium transition flex items-center gap-2"
              >
                <Info size={18}/> {t.hero.discoverBtn}
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
              <h3 className="text-center text-emerald-400 font-bold mb-6">Akıllı Döngü Sistemi</h3>
              <div className="relative h-64 w-64 mx-auto">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center text-xs text-center border-2 border-emerald-500 shadow-emerald-500/50 shadow-lg whitespace-pre-line">{t.hero.cycleUser}</div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-xs text-center border border-gray-500">{t.hero.cycleSupplier}</div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-xs text-center border border-gray-500">{t.hero.cycleCustomer}</div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none animate-pulse">
                  <path d="M128 96 L190 190" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                  <path d="M170 210 L80 210" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                  <path d="M70 190 L128 96" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0e1c36] px-3 py-1 rounded text-xs font-bold text-emerald-400 border border-emerald-500">
                  {t.hero.offset}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="vizyon" className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">{t.features.title}</h2>
          <p className="text-gray-600 mt-4">{t.features.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition cursor-pointer group"
              onClick={() => setActiveFeature(feature.id)}
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#0e1c36] group-hover:text-emerald-400 transition">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              <div className={`mt-4 overflow-hidden transition-all duration-300 ${activeFeature === feature.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-xs text-emerald-600 font-semibold bg-emerald-50 p-3 rounded">
                  {t.features.moreInfo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#0e1c36] text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white text-lg font-bold mb-4">LİKYA PAY OPTİMİZASYON HİZ. LTD. ŞTİ.</h4>
            <p className="text-sm mb-4">{t.footer.disclaimer}</p>
            <div className="flex gap-4"><ShieldCheck size={20} /><Lock size={20} /></div>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">{t.footer.corporate}</h5>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => openInfoModal('vizyon')} className="hover:text-white text-left">{t.nav.vision}</button></li>
              <li><button onClick={() => openInfoModal('nasilCalisir')} className="hover:text-white text-left">{t.nav.how}</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">{t.footer.legal}</h5>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => openInfoModal('yasal')} className="hover:text-white text-left">{t.nav.legal}</button></li>
              <li><a href="#" className="hover:text-white">{t.auth.agreement}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs">
          &copy; 2024 Likya Pay. {t.footer.rights}
        </div>
      </footer>
    </div>
  );
};

// 2. GİRİŞ & KAYIT EKRANI
const AuthPage = ({ onLogin, onBack, lang }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', company: '', taxId: '', authName: '', phone: '' });
  const t = TRANSLATIONS[lang].auth;

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputUser = formData.email.trim();
    const inputPass = formData.password.trim();

    if (inputUser.toLocaleLowerCase('tr') === 'admin' && inputPass.toLocaleLowerCase('tr') === 'admin') {
      onLogin({ ...MOCK_USERS_INIT[0] });
    } else {
      onLogin({ ...MOCK_USERS_INIT[1], name: formData.authName || 'Demo User', company: formData.company || 'Demo A.Ş.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px] relative">
        <button onClick={onBack} className="absolute top-4 left-4 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition flex items-center gap-2 px-4 backdrop-blur-sm">
          <X size={20} /> <span className="text-sm font-bold">{t.backHome}</span>
        </button>
        <div className="md:w-1/2 bg-[#0e1c36] text-white p-10 flex flex-col justify-center relative">
          <div className="mb-6">
            <ShieldCheck size={48} className="text-emerald-400 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Likya Pay</h2>
            <p className="text-blue-200">{t.slogan}</p>
          </div>
          <div className="space-y-4 text-sm text-gray-300">
            {t.security.map((sec, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle size={16} className="text-emerald-500" /> <span>{sec}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 p-10 overflow-y-auto pt-16 md:pt-10">
          <div className="flex justify-end mb-6">
            <button className={`text-sm font-semibold mr-4 ${isLogin ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-400'}`} onClick={() => setIsLogin(true)}>{t.loginTab}</button>
            <button className={`text-sm font-semibold ${!isLogin ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-400'}`} onClick={() => setIsLogin(false)}>{t.registerTab}</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                 <div>
                   <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.companyName}</label>
                   <input type="text" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="..." onChange={e => setFormData({...formData, company: e.target.value})} required />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.taxId}</label>
                     <input type="text" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="..." onChange={e => setFormData({...formData, taxId: e.target.value})} required />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.phone}</label>
                     <input type="tel" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="..." onChange={e => setFormData({...formData, phone: e.target.value})} required />
                   </div>
                 </div>
              </>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.email}</label>
              <input type="text" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="..." onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="relative">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.password}</label>
              <input type={showPassword ? "text" : "password"} className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="******" onChange={e => setFormData({...formData, password: e.target.value})} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-gray-500">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
            <button type="submit" className="w-full bg-[#0e1c36] text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition flex items-center justify-center gap-2">
              {isLogin ? t.loginBtn : t.registerBtn} <ChevronRight size={18} />
            </button>
          </form>
          <p className="mt-6 text-xs text-gray-500 text-center">Likya Pay <a href="#" className="underline text-blue-900">{t.agreement}</a></p>
        </div>
      </div>
    </div>
  );
};

// 3. ADMIN PANEL
const AdminPanel = ({ user, onLogout, lang }) => {
  const t = TRANSLATIONS[lang].admin;
  const [view, setView] = useState('dashboard');
  const [simplifiedReg, setSimplifiedReg] = useState(false);

  // State Management
  const [users, setUsers] = useState(MOCK_USERS_INIT);
  const [cycles, setCycles] = useState(MOCK_CYCLES_INIT.filter(c => c.status !== 'Tamamlandı')); // Aktifler
  const [archivedCycles, setArchivedCycles] = useState(MOCK_CYCLES_INIT.filter(c => c.status === 'Tamamlandı')); // Arşivdekiler
  const [accountingRecords, setAccountingRecords] = useState(MOCK_ACCOUNTING_INIT);
  const [userTab, setUserTab] = useState('customer');
  const [editingUser, setEditingUser] = useState(null);
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [selectedCycleForContract, setSelectedCycleForContract] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
  const [newRecordType, setNewRecordType] = useState('Gelir'); // Yeni kayıt tipi state'i

  // Modal State
  const [messageModal, setMessageModal] = useState({ isOpen: false, type: 'error', title: '', message: '', onConfirm: null });

  // -- DİNAMİK HESAPLAMALAR --
  const totalDebtPool = users.reduce((acc, u) => acc + (u.totalDebt || 0), 0);
  const totalCreditPool = users.reduce((acc, u) => acc + (u.totalCredit || 0), 0);
  const totalCommissionRevenue = accountingRecords
    .filter(r => r.type === 'Gelir' && r.cat === 'Komisyon')
    .reduce((acc, r) => acc + r.amount, 0);
  const completedCyclesCount = archivedCycles.length;
  const pendingCyclesCount = cycles.length;

  // -- KASA RAPORU HESAPLAMALARI --
  const devredenBakiye = 125000; // Mock devreden
  const totalIncome = accountingRecords.filter(r => r.type === 'Gelir').reduce((acc, r) => acc + r.amount, 0);
  const totalExpense = accountingRecords.filter(r => r.type === 'Gider').reduce((acc, r) => acc + r.amount, 0);
  const currentCash = devredenBakiye + totalIncome - totalExpense;

  // -- FONKSİYONLAR --

  // Yeni Fonksiyon: Muhasebe Kaydı Ekleme
  const handleAddAccountingRecord = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRecord = {
      id: accountingRecords.length + 1,
      type: formData.get('type'),
      cat: formData.get('cat'),
      desc: formData.get('desc'),
      amount: parseFloat(formData.get('amount')),
      date: new Date().toISOString().split('T')[0]
    };

    setAccountingRecords([newRecord, ...accountingRecords]);
    setIsAddRecordModalOpen(false);
    setMessageModal({
      isOpen: true,
      type: 'success',
      title: 'Kayıt Başarılı',
      message: 'Finansal hareket başarıyla işlendi ve kasa raporuna yansıtıldı.',
      onConfirm: null
    });
  };

  const handleScanCycles = () => {
    setIsScanning(true);
    setTimeout(() => {
      const today = new Date();
      const dateStr = today.toLocaleDateString('tr-TR').replace(/\./g, '');
      const newId = `PAY-${dateStr}-${(cycles.length + archivedCycles.length + 1).toString().padStart(2, '0')}`;

      const newCycle = {
        id: newId,
        amount: Math.floor(Math.random() * 750000) + 250000,
        status: 'Bekliyor',
        date: today.toISOString().split('T')[0],
        commission: 0,
        participants: [
          { name: 'Anadolu Çimento A.Ş.', hasPaid: false, hasApproved: false },
          { name: 'Batı Beton Sanayi', hasPaid: false, hasApproved: false },
          { name: 'Ege Yapı Malzemeleri', hasPaid: false, hasApproved: false },
          { name: 'Marmara Lojistik', hasPaid: false, hasApproved: false },
          { name: 'Toros İnşaat Ltd.', hasPaid: false, hasApproved: false }
        ]
      };
      newCycle.commission = newCycle.amount * 0.03;

      setCycles([newCycle, ...cycles]);
      setIsScanning(false);
      setMessageModal({
        isOpen: true,
        type: 'success',
        title: 'Maksimum Verimlilik Taraması Tamamlandı',
        message: 'Algoritma, maksimum şirket katılımını (5 Firma) sağlayan en verimli döngüyü tespit etti ve listeye ekledi!',
        onConfirm: null
      });
    }, 2500);
  };

  const toggleParticipantStatus = (cycleId, pIndex, field) => {
    setCycles(cycles.map(cycle => {
      if (cycle.id === cycleId) {
        const updatedParticipants = [...cycle.participants];
        updatedParticipants[pIndex] = {
          ...updatedParticipants[pIndex],
          [field]: !updatedParticipants[pIndex][field]
        };
        return { ...cycle, participants: updatedParticipants };
      }
      return cycle;
    }));
  };

  const handleManualCloseCheck = (cycle) => {
    const allPaid = cycle.participants.every(p => p.hasPaid);
    const allApproved = cycle.participants.every(p => p.hasApproved);

    if (!allPaid || !allApproved) {
      setMessageModal({
        isOpen: true,
        type: 'error',
        title: 'İşlem Başarısız',
        message: 'HATA: Bu döngüyü kapatabilmek için tüm firmaların Hizmet Bedeli ödemesi alınmış ve Sözleşme Onayları tamamlanmış olmalıdır.',
        onConfirm: null
      });
      return;
    }

    setMessageModal({
      isOpen: true,
      type: 'confirm',
      title: 'Döngü Kapatma Onayı',
      message: 'Tüm şartlar sağlandı. Döngü kapatılarak ARŞİVE TAŞINACAK, bakiyeler düşülecek ve komisyon muhasebeye işlenecektir. Onaylıyor musunuz?',
      onConfirm: () => finalizeCycle(cycle)
    });
  };

  const finalizeCycle = (cycle) => {
    const completedCycle = { ...cycle, status: 'Tamamlandı' };
    setArchivedCycles([completedCycle, ...archivedCycles]);
    setCycles(cycles.filter(c => c.id !== cycle.id));

    const participantNames = cycle.participants.map(p => p.name);
    setUsers(prevUsers => prevUsers.map(u => {
      if (participantNames.includes(u.company)) {
        return {
          ...u,
          totalDebt: Math.max(0, u.totalDebt - cycle.amount),
          totalCredit: Math.max(0, u.totalCredit - cycle.amount)
        };
      }
      return u;
    }));

    const newIncomeRecord = {
      id: accountingRecords.length + 1,
      type: 'Gelir',
      cat: 'Komisyon',
      amount: cycle.commission,
      desc: `Döngü #${cycle.id} Hizmet Bedeli`,
      date: new Date().toISOString().split('T')[0]
    };
    setAccountingRecords([newIncomeRecord, ...accountingRecords]);

    setMessageModal({
      isOpen: true,
      type: 'success',
      title: 'İşlem Başarılı',
      message: 'Döngü başarıyla kapatıldı, arşive taşındı ve mali kayıtlar güncellendi.',
      onConfirm: null
    });
  };

  const handleReviseCheck = (cycle) => {
    setMessageModal({
      isOpen: true,
      type: 'confirm',
      title: 'Döngü Revizyonu',
      message: 'DİKKAT: Bu döngüyü arşivden çıkarıp aktif listeye geri alacaksınız. Düşülen borç/alacak bakiyeleri firmalara geri yüklenecek ve komisyon geliri iptal edilecektir. Onaylıyor musunuz?',
      onConfirm: () => reviseCycle(cycle)
    });
  };

  const reviseCycle = (cycle) => {
    const activeCycle = { ...cycle, status: 'Bekliyor' };
    setCycles([activeCycle, ...cycles]);
    setArchivedCycles(archivedCycles.filter(c => c.id !== cycle.id));

    const participantNames = cycle.participants.map(p => p.name);
    setUsers(prevUsers => prevUsers.map(u => {
      if (participantNames.includes(u.company)) {
        return {
          ...u,
          totalDebt: u.totalDebt + cycle.amount,
          totalCredit: u.totalCredit + cycle.amount
        };
      }
      return u;
    }));

    const refundRecord = {
      id: accountingRecords.length + 1,
      type: 'Gider',
      cat: 'İptal',
      amount: cycle.commission,
      desc: `Döngü #${cycle.id} İptali/Revizesi`,
      date: new Date().toISOString().split('T')[0]
    };
    setAccountingRecords([refundRecord, ...accountingRecords]);

    setMessageModal({
      isOpen: true,
      type: 'success',
      title: 'Döngü Geri Alındı',
      message: 'Döngü revize edilmek üzere aktif listeye taşındı ve tüm finansal işlemler geri alındı.',
      onConfirm: null
    });
  };

  const openContractModal = (cycle) => {
    setSelectedCycleForContract(cycle);
    setContractModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser({...user});
  };

  const handleAddUser = () => {
    setEditingUser({
      id: null,
      name: '',
      email: '',
      role: 'user',
      type: userTab,
      company: '',
      department: '',
      jobTitle: '',
      status: 'Aktif',
      totalDebt: 0,
      totalCredit: 0
    });
  };

  const handleSaveUser = () => {
    if (editingUser.id) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    } else {
      const newUser = {
        ...editingUser,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      };
      setUsers([...users, newUser]);
    }
    setEditingUser(null);
  };

  const renderContent = () => {
    switch(view) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t.cards.totalComp}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{users.length}</h3>
                  <span className="text-xs text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded">+12% bu ay</span>
                </div>
                <Users className="text-blue-900 bg-blue-50 p-2 rounded-lg" size={42} />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t.cards.totalDebt}</p>
                  <h3 className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(totalDebtPool)}</h3>
                </div>
                <ArrowRightLeft className="text-red-600 bg-red-50 p-2 rounded-lg" size={42} />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t.cards.totalCredit}</p>
                  <h3 className="text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(totalCreditPool)}</h3>
                </div>
                <PieChart className="text-emerald-600 bg-emerald-50 p-2 rounded-lg" size={42} />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t.cards.createdCycles}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{completedCyclesCount}</h3>
                  <span className="text-xs text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded">Genel Toplam</span>
                </div>
                <Activity className="text-purple-600 bg-purple-50 p-2 rounded-lg" size={42} />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t.cards.pendingCycles}</p>
                  <h3 className="text-2xl font-bold text-orange-500 mt-1">{pendingCyclesCount}</h3>
                  <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded">İşlem Gerekiyor</span>
                </div>
                <History className="text-orange-500 bg-orange-50 p-2 rounded-lg" size={42} />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t.cards.revenue}</p>
                  <h3 className="text-2xl font-bold text-blue-900 mt-1">{formatCurrency(totalCommissionRevenue)}</h3>
                </div>
                <CreditCard className="text-blue-900 bg-blue-50 p-2 rounded-lg" size={42} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2"><Activity size={18}/> Döngü İşlem Hacmi</h4>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={[
                    { name: 'Oca', vol: 4000 }, { name: 'Şub', vol: 3000 },
                    { name: 'Mar', vol: 2000 }, { name: 'Nis', vol: 2780 },
                    { name: 'May', vol: 1890 }, { name: 'Haz', vol: 2390 },
                    { name: 'Tem', vol: 3490 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius:'8px', border:'none', boxShadow:'0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                    <Bar dataKey="vol" fill="#0e1c36" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-700 mb-6">Gelir Dağılımı</h4>
                <ResponsiveContainer width="100%" height="85%">
                  <RePie data={[
                    { name: 'Döngü Komisyonu', value: 75 },
                    { name: 'Ek Hizmetler', value: 15 },
                    { name: 'Danışmanlık', value: 10 },
                  ]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                    {COLORS.map((color, index) => <Cell key={`cell-${index}`} fill={color} />)}
                    <Legend verticalAlign="bottom" height={36}/>
                    <RechartsTooltip />
                  </RePie>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b pb-4">
              <div>
                 <h3 className="text-xl font-bold text-gray-800">{t.userTable.header}</h3>
                 <p className="text-sm text-gray-500 mt-1">Kullanıcıları kategorilere göre yönetin.</p>
              </div>

              <div className="flex items-center gap-4">
                 {userTab === 'customer' && (
                   <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border transition-colors ${simplifiedReg ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="text-right">
                         <span className={`block text-xs font-bold ${simplifiedReg ? 'text-emerald-700' : 'text-gray-600'}`}>{t.userTable.simplifiedMode}</span>
                         <span className="text-[10px] text-gray-400 block max-w-[150px] leading-tight">{t.userTable.simplifiedDesc}</span>
                      </div>
                      <button
                        onClick={() => setSimplifiedReg(!simplifiedReg)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${simplifiedReg ? 'bg-emerald-500' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute left-0 inline-block w-6 h-6 bg-white rounded-full shadow transform ring-0 transition-transform duration-200 ease-in-out ${simplifiedReg ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                   </div>
                 )}

                 <button
                   onClick={handleAddUser}
                   className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-md transition"
                 >
                   <Plus size={18} /> {t.userTable.addUser}
                 </button>
              </div>
            </div>

            <div className="flex space-x-1 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setUserTab('customer')}
                className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${userTab === 'customer' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <UserCheck size={18} /> {t.userTable.tabCustomers}
              </button>
              <button
                onClick={() => setUserTab('supplier')}
                className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${userTab === 'supplier' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Truck size={18} /> {t.userTable.tabSuppliers}
              </button>
              <button
                onClick={() => setUserTab('employee')}
                className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${userTab === 'employee' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Briefcase size={18} /> {t.userTable.tabEmployees}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                  <tr>
                    {userTab === 'customer' ? (
                      <>
                        <th className="p-4 rounded-tl-lg">{t.userTable.colComp}</th>
                        <th className="p-4">{t.userTable.colAuth}</th>
                        <th className="p-4 text-center">Borç / Alacak (Döngü)</th>
                      </>
                    ) : userTab === 'supplier' ? (
                      <>
                        <th className="p-4 rounded-tl-lg">{t.userTable.colComp}</th>
                        <th className="p-4">{t.userTable.colAuth}</th>
                        <th className="p-4">{t.userTable.colSector}</th>
                      </>
                    ) : (
                      <>
                        <th className="p-4 rounded-tl-lg">{t.userTable.colAuth}</th>
                        <th className="p-4">{t.userTable.colComp}</th>
                        <th className="p-4">{t.userTable.colDept}</th>
                        <th className="p-4">{t.userTable.colJob}</th>
                      </>
                    )}
                    <th className="p-4">{t.userTable.colStatus}</th>
                    <th className="p-4 rounded-tr-lg text-right">{t.userTable.colAction}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.filter(u => u.type === userTab).length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-400 italic">Bu kategoride kayıt bulunamadı.</td>
                    </tr>
                  ) : (
                    users.filter(u => u.type === userTab).map(u => (
                      <tr key={u.id} className="hover:bg-blue-50/50 transition duration-150">
                        {userTab === 'customer' ? (
                          <>
                            <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
                               <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-gray-500 font-bold">{u.company.substring(0,1)}</div>
                               {u.company}
                            </td>
                            <td className="p-4 text-gray-600">{u.name}</td>
                            <td className="p-4 text-center">
                              <div className="inline-flex flex-col items-end">
                                <span className="text-red-500 font-mono text-xs font-bold">-{formatCurrency(u.totalDebt)}</span>
                                <span className="text-emerald-500 font-mono text-xs font-bold">+{formatCurrency(u.totalCredit)}</span>
                              </div>
                            </td>
                          </>
                        ) : userTab === 'supplier' ? (
                          <>
                            <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
                               <div className="w-8 h-8 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-bold"><Truck size={16}/></div>
                               {u.company}
                            </td>
                            <td className="p-4 text-gray-600">{u.name}</td>
                            <td className="p-4 text-gray-600">{u.jobTitle} / {u.department}</td>
                          </>
                        ) : (
                          <>
                            <td className="p-4 font-bold text-gray-800">{u.name}</td>
                            <td className="p-4 text-gray-600 text-xs">{u.company}</td>
                            <td className="p-4 text-gray-600">{u.department}</td>
                            <td className="p-4 text-gray-600">{u.jobTitle}</td>
                          </>
                        )}

                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${u.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => handleEditUser(u)} className="text-blue-600 hover:bg-blue-100 p-2 rounded transition" title="Düzenle"><Edit size={16}/></button>
                          <button className="text-red-500 hover:bg-red-100 p-2 rounded transition" title="Pasif Yap / Sil"><Trash2 size={16}/></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {editingUser && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
                  <div className="bg-[#0e1c36] p-4 text-white flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2">
                      <Edit size={18}/>
                      {editingUser.id ? t.userTable.editTitle : t.userTable.addTitle}
                    </h3>
                    <button onClick={() => setEditingUser(null)}><X size={20}/></button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Kullanıcı Tipi</label>
                      <select
                        value={editingUser.type}
                        onChange={(e) => setEditingUser({...editingUser, type: e.target.value})}
                        className="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-900 outline-none bg-blue-50/50"
                      >
                        <option value="customer">Müşteri (Firma)</option>
                        <option value="supplier">Tedarikçi</option>
                        <option value="employee">Çalışan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        {editingUser.type === 'customer' || editingUser.type === 'supplier' ? 'Yetkili Ad Soyad' : 'İsim Soyisim'}
                      </label>
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                        className="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-900 outline-none"
                      />
                    </div>

                    {(editingUser.type === 'customer' || editingUser.type === 'supplier') && (
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Firma Ünvanı</label>
                          <input
                            type="text"
                            value={editingUser.company}
                            onChange={(e) => setEditingUser({...editingUser, company: e.target.value})}
                            className="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-900 outline-none"
                          />
                        </div>
                    )}

                    {editingUser.type === 'employee' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Departman</label>
                          <input
                            type="text"
                            value={editingUser.department}
                            onChange={(e) => setEditingUser({...editingUser, department: e.target.value})}
                            className="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-900 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Ünvan</label>
                          <input
                            type="text"
                            value={editingUser.jobTitle}
                            onChange={(e) => setEditingUser({...editingUser, jobTitle: e.target.value})}
                            className="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-900 outline-none"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex gap-2 pt-4">
                      <button onClick={handleSaveUser} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-bold flex justify-center gap-2">
                        <Save size={18}/> {t.userTable.save}
                      </button>
                      <button onClick={() => setEditingUser(null)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 font-bold text-gray-600">
                        {t.userTable.cancel}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'cycles':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <MessageModal
              isOpen={messageModal.isOpen}
              type={messageModal.type}
              title={messageModal.title}
              message={messageModal.message}
              onConfirm={() => {
                if (messageModal.onConfirm) messageModal.onConfirm();
                setMessageModal({ ...messageModal, isOpen: false });
              }}
              onClose={() => setMessageModal({ ...messageModal, isOpen: false })}
            />

            <ContractModal
              isOpen={contractModalOpen}
              onClose={() => setContractModalOpen(false)}
              cycle={selectedCycleForContract}
              users={users}
            />

            <div className="bg-gradient-to-r from-blue-900 to-[#0e1c36] p-6 rounded-xl text-white shadow-lg flex justify-between items-center">
               <div>
                 <h3 className="text-xl font-bold flex items-center gap-2"><Activity className="text-emerald-400"/> {t.cyclePage.title}</h3>
                 <p className="text-blue-200 text-sm mt-1">Sistemdeki aktif ve potansiyel döngülerin yönetimi.</p>
               </div>

               <button
                 onClick={handleScanCycles}
                 disabled={isScanning}
                 className={`px-6 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2 transition transform hover:scale-105 ${isScanning ? 'bg-gray-500 cursor-wait' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
               >
                 {isScanning ? (
                   <><Loader2 size={20} className="animate-spin" /> {t.cyclePage.scanning}</>
                 ) : (
                   <><ArrowRightLeft size={20} /> {t.cyclePage.createBtn}</>
                 )}
               </button>
            </div>

            <div className="grid gap-4">
               {cycles.map(cycle => (
                 <div key={cycle.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition relative overflow-hidden">
                   <div className={`absolute left-0 top-0 bottom-0 w-1 ${cycle.status === 'Tamamlandı' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>

                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                     <div className="flex-1">
                       <div className="flex items-center gap-2 mb-3">
                         <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-mono font-bold">ID: #{cycle.id}</span>
                         <span className={`text-xs px-2 py-1 rounded font-bold flex items-center gap-1 ${cycle.status === 'Tamamlandı' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                           {cycle.status === 'Tamamlandı' ? <CheckCircle size={12}/> : <Activity size={12}/>}
                           {cycle.status === 'Tamamlandı' ? t.cyclePage.statusDone : t.cyclePage.statusWait}
                         </span>
                       </div>

                       <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Döngü Katılımcıları & Onay Durumu</p>
                          <div className="space-y-2">
                            {cycle.participants.map((p, pIndex) => (
                              <div key={pIndex} className="flex items-center justify-between text-sm bg-white p-2 rounded border border-gray-100">
                                <span className="font-bold text-gray-700 flex items-center gap-2">
                                  <div className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs">{pIndex + 1}</div>
                                  {p.name}
                                </span>
                                <div className="flex gap-4">
                                  <button
                                    disabled={cycle.status === 'Tamamlandı'}
                                    onClick={() => toggleParticipantStatus(cycle.id, pIndex, 'hasPaid')}
                                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition ${p.hasPaid ? 'bg-emerald-100 text-emerald-700 font-bold' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'} ${cycle.status === 'Tamamlandı' ? 'cursor-default' : ''}`}
                                    title="Hizmet Bedeli Ödemesi"
                                  >
                                    <DollarSign size={12} /> {t.cyclePage.stepPay}
                                    {p.hasPaid ? <CheckCircle size={12} className="ml-1"/> : <XCircle size={12} className="ml-1"/>}
                                  </button>

                                  <button
                                    disabled={cycle.status === 'Tamamlandı'}
                                    onClick={() => toggleParticipantStatus(cycle.id, pIndex, 'hasApproved')}
                                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition ${p.hasApproved ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'} ${cycle.status === 'Tamamlandı' ? 'cursor-default' : ''}`}
                                    title="Sözleşme Onayı"
                                  >
                                    <FileText size={12} /> {t.cyclePage.stepContract}
                                    {p.hasApproved ? <CheckCircle size={12} className="ml-1"/> : <XCircle size={12} className="ml-1"/>}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                       </div>
                     </div>

                     <div className="flex flex-col items-end gap-4 min-w-[200px]">
                        <div className="text-right">
                          <p className="text-xs text-gray-400 font-bold uppercase">İşlem Hacmi</p>
                          <p className="text-xl font-bold text-gray-800">{formatCurrency(cycle.amount)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 font-bold uppercase text-emerald-600">{t.cyclePage.commission}</p>
                          <p className="text-xl font-bold text-emerald-600">{formatCurrency(cycle.commission)}</p>
                        </div>

                        <div className="flex flex-col gap-2 w-full mt-2">
                            <button
                              onClick={() => openContractModal(cycle)}
                              className="text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-gray-600 w-full"
                            >
                              <FileText size={16}/> Sözleşmeleri İncele
                            </button>

                            {cycle.status !== 'Tamamlandı' && (
                              <button
                                onClick={() => handleManualCloseCheck(cycle)}
                                className={`text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow w-full font-bold transition
                                  ${cycle.participants.every(p => p.hasPaid && p.hasApproved)
                                    ? 'bg-blue-900 text-white hover:bg-blue-800'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                title={t.cyclePage.tooltipClose}
                              >
                                <CheckSquare size={16}/> {t.cyclePage.manualClose}
                              </button>
                            )}
                        </div>
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        );

      case 'accounting':
         return (
           <div className="space-y-6 animate-in fade-in duration-300">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{t.accPage.title}</h3>
                <button
                  onClick={() => setIsAddRecordModalOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow hover:bg-blue-700 transition"
                >
                  <Plus size={16}/> {t.accPage.addRecord}
                </button>
             </div>

             {/* GÜNLÜK KASA RAPORU (YENİ) */}
             <div className="bg-[#0e1c36] text-white p-6 rounded-xl shadow-lg mb-6 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 text-white/5">
                  <Wallet size={150} />
                </div>

                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Wallet className="text-emerald-400" size={20}/> {t.accPage.cashReport}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                  {/* Devreden */}
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-gray-400 text-xs font-bold uppercase mb-1">{t.accPage.devreden}</p>
                    <p className="text-2xl font-mono tracking-tight">{formatCurrency(devredenBakiye)}</p>
                  </div>

                  {/* Giriş */}
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-emerald-400 text-xs font-bold uppercase mb-1 flex items-center gap-1">
                      <TrendingUp size={14} /> {t.accPage.gunlukGiris}
                    </p>
                    <p className="text-2xl font-mono tracking-tight text-white">+{formatCurrency(totalIncome)}</p>
                  </div>

                  {/* Çıkış */}
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-red-400 text-xs font-bold uppercase mb-1 flex items-center gap-1">
                      <TrendingDown size={14} /> {t.accPage.gunlukCikis}
                    </p>
                    <p className="text-2xl font-mono tracking-tight text-white">-{formatCurrency(totalExpense)}</p>
                  </div>

                  {/* Net Kasa */}
                  <div className="bg-emerald-500 text-[#0e1c36] p-4 rounded-lg shadow-lg transform scale-105 border border-emerald-400">
                    <p className="text-[#0e1c36]/70 text-xs font-bold uppercase mb-1">{t.accPage.netKasa}</p>
                    <p className="text-3xl font-bold font-mono tracking-tight">{formatCurrency(currentCash)}</p>
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-3 gap-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl">
                   <p className="text-emerald-700 text-sm font-bold uppercase">{t.accPage.income}</p>
                   <h3 className="text-2xl font-bold text-emerald-600 mt-2">
                     {formatCurrency(totalIncome)}
                   </h3>
                </div>
                <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
                   <p className="text-red-700 text-sm font-bold uppercase">{t.accPage.expense}</p>
                   <h3 className="text-2xl font-bold text-red-600 mt-2">
                     {formatCurrency(totalExpense)}
                   </h3>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
                   <p className="text-blue-700 text-sm font-bold uppercase">{t.accPage.net}</p>
                   <h3 className="text-2xl font-bold text-blue-900 mt-2">
                     {formatCurrency(totalIncome - totalExpense)}
                   </h3>
                </div>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-600 uppercase font-bold text-xs">
                    <tr>
                      <th className="p-4">Tarih</th>
                      <th className="p-4">Tür</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Açıklama</th>
                      <th className="p-4 text-right">Tutar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {accountingRecords.map(acc => (
                      <tr key={acc.id} className="hover:bg-gray-50">
                        <td className="p-4 text-gray-500 font-mono">{acc.date}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${acc.type === 'Gelir' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {acc.type}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-gray-700">{acc.cat}</td>
                        <td className="p-4 text-gray-600">{acc.desc}</td>
                        <td className={`p-4 text-right font-bold font-mono ${acc.type === 'Gelir' ? 'text-emerald-600' : 'text-red-600'}`}>
                          {acc.type === 'Gelir' ? '+' : '-'}{formatCurrency(acc.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           </div>
         );

      case 'archive':
         return (
           <div className="bg-white p-8 rounded-xl border border-gray-200 text-center animate-in fade-in duration-300">

             <MessageModal
                isOpen={messageModal.isOpen}
                type={messageModal.type}
                title={messageModal.title}
                message={messageModal.message}
                onConfirm={() => {
                  if (messageModal.onConfirm) messageModal.onConfirm();
                  setMessageModal({ ...messageModal, isOpen: false });
                }}
                onClose={() => setMessageModal({ ...messageModal, isOpen: false })}
              />

             <Database size={64} className="mx-auto text-blue-100 mb-6" />
             <h3 className="text-2xl font-bold text-gray-800">{t.archivePage.title}</h3>
             <p className="text-gray-500 max-w-lg mx-auto mt-2 mb-8">
               {t.archivePage.desc}
             </p>

             <div className="max-w-xl mx-auto flex gap-2">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                 <input
                   type="text"
                   placeholder={t.archivePage.search}
                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
               </div>
               <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700">Ara</button>
             </div>

             <div className="mt-12 grid gap-6 text-left">
                {archivedCycles.length === 0 ? (
                  <p className="text-center text-gray-400 italic">{t.archivePage.empty}</p>
                ) : (
                  archivedCycles.map(cycle => (
                    <div key={cycle.id} className="border p-6 rounded-lg hover:bg-gray-50 flex items-center justify-between gap-4">
                       <div className="flex items-center gap-4">
                         <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                            <CheckCircle size={24}/>
                         </div>
                         <div>
                           <p className="font-bold text-gray-800 text-lg">Döngü #{cycle.id}</p>
                           <p className="text-sm text-gray-500">Tamamlanma Tarihi: {cycle.date}</p>
                           <div className="text-xs text-gray-400 mt-1">Hacim: {formatCurrency(cycle.amount)} | Komisyon: {formatCurrency(cycle.commission)}</div>
                         </div>
                       </div>

                       <button
                         onClick={() => handleReviseCheck(cycle)}
                         className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition"
                       >
                         <RotateCcw size={16}/> {t.archivePage.reviseBtn}
                       </button>
                    </div>
                  ))
                )}
             </div>
           </div>
         );
      default:
        return <div>Yükleniyor...</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">

      {/* Kayıt Ekleme Modalı */}
      {isAddRecordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="bg-[#0e1c36] p-4 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><CreditCard size={18}/> Yeni Kayıt Ekle</h3>
              <button onClick={() => setIsAddRecordModalOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddAccountingRecord} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">İşlem Türü</label>
                <select
                  name="type"
                  value={newRecordType}
                  onChange={(e) => setNewRecordType(e.target.value)}
                  className="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-900 outline-none bg-gray-50"
                >
                  <option value="Gelir">Gelir (+)</option>
                  <option value="Gider">Gider (-)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Kategori (Standart Hesap Planı)</label>
                <select name="cat" className="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-900 outline-none bg-white">
                  {ACCOUNTING_CATEGORIES[newRecordType].map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Açıklama</label>
                <input name="desc" required placeholder="İşlem detayı..." className="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-900 outline-none"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tutar (TL)</label>
                <input name="amount" type="number" step="0.01" required placeholder="0.00" className="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-900 outline-none"/>
              </div>
              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-bold flex justify-center gap-2">
                  <Save size={18}/> Kaydet
                </button>
                <button type="button" onClick={() => setIsAddRecordModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 font-bold text-gray-600">
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="w-72 bg-[#0e1c36] text-gray-300 flex flex-col shrink-0 transition-all duration-300">
        <div className="p-6 text-white font-bold text-2xl flex items-center gap-3 tracking-wide border-b border-gray-700/50">
          <ShieldCheck className="text-emerald-400" size={32} /> LKP ADMIN
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                Y
             </div>
             <div>
               <p className="text-white font-bold text-sm">Yönetici Hesabı</p>
               <p className="text-xs text-emerald-400">Online</p>
             </div>
          </div>

          <nav className="space-y-2">
            <button onClick={() => setView('dashboard')} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${view === 'dashboard' ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-white/5'}`}>
              <PieChart size={20} /> {t.dashboard}
            </button>
            <button onClick={() => setView('users')} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${view === 'users' ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-white/5'}`}>
              <Users size={20} /> {t.users}
            </button>
            <button onClick={() => setView('cycles')} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${view === 'cycles' ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-white/5'}`}>
              <Activity size={20} /> {t.cycles}
            </button>
            <button onClick={() => setView('accounting')} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${view === 'accounting' ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-white/5'}`}>
              <CreditCard size={20} /> {t.accounting}
            </button>
            <button onClick={() => setView('archive')} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${view === 'archive' ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-white/5'}`}>
              <Database size={20} /> {t.archive}
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-700/50">
          <button onClick={onLogout} className="flex items-center gap-3 text-red-400 hover:text-white hover:bg-red-500/20 p-3 rounded-xl transition w-full">
            <LogIn className="rotate-180" size={20} /> {t.logout}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-8 z-10">
          <h2 className="text-2xl font-bold text-gray-800">{t[view] || view.toUpperCase()}</h2>
          <div className="flex items-center gap-6">
             <div className="text-right hidden md:block">
               <p className="text-sm font-bold text-gray-800">{getCurrentDate(lang)}</p>
               <p className="text-xs text-gray-500">Sistem Saati: {new Date().toLocaleTimeString()}</p>
             </div>
             <div className="h-10 w-px bg-gray-200"></div>
             <button className="p-2 hover:bg-gray-100 rounded-full relative">
               <AlertCircle size={24} className="text-gray-600"/>
               <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8 relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// 5. ANA APP (PARENT COMPONENT)
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState(false);
  const [lang, setLang] = useState('tr');

  const handleLogin = (user) => {
    setCurrentUser(user);
    setAuthView(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthView(false);
  };

  if (currentUser) {
    if (currentUser.role === 'admin') {
      return <AdminPanel user={currentUser} onLogout={handleLogout} lang={lang} />;
    }
    return <UserPanel user={currentUser} onLogout={handleLogout} lang={lang} />;
  }

  if (authView) {
    return <AuthPage onLogin={handleLogin} onBack={() => setAuthView(false)} lang={lang} />;
  }

  return <LandingPage onLoginClick={() => setAuthView(true)} lang={lang} setLang={setLang} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
