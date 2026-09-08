import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Check,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';

const SLOGAN = 'Konco Apik Supoyo Papan Panggonan Dadi Resik';

function useTypewriter(text: string, speed = 80, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'waiting'>('typing');
  const [i, setI] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (i <= text.length) {
        timeout = setTimeout(() => {
          setDisplayed(text.slice(0, i));
          setI(i + 1);
        }, speed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1600);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else if (phase === 'deleting') {
      if (i > 0) {
        timeout = setTimeout(() => {
          setDisplayed(text.slice(0, i - 1));
          setI(i - 1);
        }, 35);
      } else {
        timeout = setTimeout(() => setPhase('waiting'), 500);
      }
    } else {
      timeout = setTimeout(() => {
        setPhase('typing');
        setI(0);
      }, startDelay);
    }

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay, phase, i]);

  return displayed;
}


type ServiceItem = { img: string; title: string; text: string; icon?: typeof Check };
type ServiceCategory = { img: string; title: string; items: ServiceItem[]; icon?: typeof Check };

const serviceCategories: ServiceCategory[] = [
  {
    img: '/kebersihanicon.png',
    title: 'Kebersihan Rumah & Hunian',
    items: [
      { img: '/dailyicon.png', title: 'Daily Cleaning (Sekali Datang)', text: '*Solusi praktis kebersihan harian tanpa terikat kontrak.* Layanan bersih-bersih standar yang cepat dan efisien (menyapu, mengepel, lap debu, merapikan kasur, dan sikat kamar mandi). Cocok untuk Anda yang sibuk dan ingin rumah atau apartemen langsung rapi dalam sekejap.' },
      { img: '/deepcleaningicon.png', title: 'Deep Cleaning / Borongan', text: '*Pembersihan menyeluruh skala besar untuk hasil higienis maksimal.* Layanan pembersihan total secara mendetail ke sudut yang jarang tersentuh. Ideal untuk kerak kamar mandi menahun, pasca-renovasi, pindahan rumah, hingga persiapan acara besar.' },
      { img: '/cleaninglanggananicon.png', title: 'Cleaning Langganan (Subscription)', text: '*Rumah selalu bersih konsisten dengan harga jauh lebih hemat!* Solusi untuk Anda yang butuh jasa pembersihan rutin berkala (misal: seminggu 2x atau sebulan 4x). Nikmati jadwal prioritas, tim tetap yang tepercaya, dan paket harga lebih terjangkau.' },
      { img: '/kosicon.png', title: 'Paket Kos', text: '*Solusi praktis dan hemat khusus anak kos dan pemilik persewaan.* Layanan kilat untuk membersihkan kamar kos secara total. Cocok bagi penghuni baru yang ingin kamarnya steril, maupun penghuni lama yang akan pindah (checkout) agar serah terima kunci berjalan lancar.' },
    ],
  },
  {
    img: '/perawatanfurnituricon.png',
    title: 'Perawatan Furnitur & Estetik',
    items: [
      { img: '/laundrysofaicon.png', title: 'Laundry Sofa & Bed', text: '*Usir tungau, debu, dan noda membandel dari tempat tidur & sofa favorit.* Kami membersihkan sofa, kasur, bantal, hingga karpet dengan teknik cuci-sikat-vakum-pengeringan menggunakan cairan pembersih aman. Efektif membunuh bakteri dan tungau penyebab gatal atau alergi.' },
      { img: '/poleslantaiicon.png', title: 'Poles Lantai', text: '*Kembalikan kilau mewah dan keindahan lantai hunian Anda.* Layanan restorasi dan perawatan untuk berbagai jenis lantai, seperti marmer, granit, teraso, hingga keramik. Kami mengangkat kusam, menyamarkan goresan halus, dan memberikan proteksi agar lantai kembali berkilau alami.' },
      { img: '/repainticon.png', title: 'Repaint (Pengecatan Ulang)', text: '*Segarkan kembali estetika dinding rumah dengan warna baru.* Layanan pengecatan ulang untuk dinding interior maupun eksterior yang kusam, mengelupas, atau berjamur. Tim kami bekerja rapi, melindungi furnitur dari cipratan, dan memberikan hasil akhir halus serta tahan lama.' },
    ],
  },
  {
    img: '/assets/icons/jasaangkut2icon.png',
    icon: undefined,
    title: 'Packing Pindahan & Jasa Angkut',
    items: [
      { img: '/assets/icons/jasaangkut1icon.png', icon: undefined, title: 'Layanan Packing Pindahan dan Jasa Angkut', text: '*Layanan packing barang yang rapi, aman, dan sistematis.* Kami paham bahwa setiap barang Anda berharga. Oleh karena itu, tim profesional kami akan memastikan seluruh proses pengepakan dilakukan dengan standar terbaik agar barang Anda sampai di lokasi baru tanpa lecet, pecah, atau rusak. Jasa pindahan dengan armada Pickup atau bisa disesuaikan dengan kebutuhan, fleksibel. Pelanggan bisa meminta disediakan kardus/bubble wrap dari kami jika dibutuhkan.' },
    ],
  },
  {
    img: '/sanitasiicon.png',
    title: 'Sanitasi & Perawatan Fasilitas',
    items: [
      { img: '/cuciacicon.png', title: 'Service & Cuci AC', text: '*Udara rumah lebih sejuk, bersih, dan hemat konsumsi listrik.* Perawatan AC berkala mulai dari pencucian filter, pembersihan evaporator, hingga pengecekan tekanan freon oleh teknisi ahli. AC yang bersih memastikan sirkulasi udara tetap sehat untuk keluarga.' },
      { img: '/tandonicon.png', title: 'Kuras Tandon & Ground Tank', text: '*Jaminan air bersih, higienis, dan bebas lumut untuk konsumsi keluarga.* Layanan pengurasan dan pembersihan total tangki air dari endapan lumpur, lumut, kuman, dan jentik nyamuk. Kami memastikan aliran air kembali jernih dan aman untuk kebutuhan sehari-hari.' },
      { img: '/foggingicon.png', title: 'Fogging (Disinfektan & Pembasmi Hama)', text: '*Sterilisasi total untuk udara dan ruangan yang sehat serta bebas kuman.* Layanan pengasapan menggunakan cairan disinfektan premium yang aman bagi manusia dan hewan peliharaan. Efektif membunuh 99.9% bakteri/virus serta membasmi serangga pengganggu di sudut ruangan.' },
    ],
  },
];

const allServiceTitles = serviceCategories.flatMap((c) => c.items.map((i) => i.title));

function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('*') && part.endsWith('*') ? (
          <strong key={i}>{part.slice(1, -1)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const areas = [
  { name: 'SOLO RAYA', sub: 'Kota Surakarta dan area di sekitarnya', color: 'blue', places: ['Kota Solo', 'Sukoharjo', 'Karanganyar', 'Boyolali', 'Klaten', 'Wonogiri', 'Sragen'] },
  { name: 'DIY, YOGYAKARTA', sub: 'Yogyakarta dan wilayah sekitarnya', color: 'mint', places: ['Kota Yogyakarta', 'Sleman', 'Bantul', 'Kulon Progo', 'Gunungkidul'] },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    el.querySelectorAll('[data-reveal]').forEach((child, i) => {
      (child as HTMLElement).style.transitionDelay = `${i * 0.06}s`;
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, []);
  return ref;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const servicesInnerRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', address: '', time: '', note: '' });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [winHeight, setWinHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0);
    };
    const onResize = () => setWinHeight(window.innerHeight);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const mascotTop = 80 + scrollProgress * (winHeight - 180);

  const sloganText = useTypewriter(SLOGAN);

  const selectedDay = form.date ? new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(new Date(`${form.date}T00:00:00`)) : '';
  const heroRef = useReveal<HTMLDivElement>();
  const servicesRef = useReveal<HTMLDivElement>();
  const aboutRef = useReveal<HTMLDivElement>();
  const areaRef = useReveal<HTMLDivElement>();
  const bookingRef = useReveal<HTMLDivElement>();
  const socialRef = useReveal<HTMLDivElement>();

  const updateForm = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submitBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Halo Rencang Resik,
Saya ingin memesan layanan ${form.service || 'Cleaning Service'}.
Nama: ${form.name || '-'}
No. WhatsApp: ${form.phone || '-'}
Tanggal: ${form.date || '-'}
Hari: ${selectedDay || '-'}
Waktu: ${form.time || '-'}
Alamat: ${form.address || '-'}
Catatan: ${form.note || '-'}
Terima kasih.`;
    window.open(`https://wa.me/6282245489977?text=${encodeURIComponent(message)}`, '_blank');
    setSent(true);
  };

  return (
    <div className="site-shell">
      <div className="floating-mascot" style={{ top: `${mascotTop}px` }} aria-hidden="true"><img src="/Maskot_rencang_resik.png" alt="Maskot Rencang Resik" /></div>
      <header className="navbar">
        <a href="#beranda"><img className="navbar-logo" src="/Logo_.png" alt="Rencang Resik" /></a>
        <button className="mobile-menu" aria-label="Buka menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#beranda" onClick={() => setMenuOpen(false)}>Beranda</a><a href="#layanan" onClick={() => setMenuOpen(false)}>Layanan</a><a href="#tentang" onClick={() => setMenuOpen(false)}>Tentang Rencang Resik</a><a href="#area" onClick={() => setMenuOpen(false)}>Area Layanan</a><a href="#booking" onClick={() => setMenuOpen(false)}>Booking</a><a href="#kontak" onClick={() => setMenuOpen(false)}>Kontak</a>
        </nav>
        <a className="nav-cta" href="#booking"><MessageCircle size={14} /> Konsultasi Gratis</a>
      </header>

      <main>
        <section className="hero" id="beranda" ref={heroRef}>
          <div className="hero-copy"><p className="eyebrow">JASA KEBERSIHAN &amp; PERAWATAN</p><img className="hero-title-image" src="/polos_remove_bg.webp" alt="Rencang Resik" /><p className="hero-lead"><span className="lead-main">Jasa Cleaning &amp; Home Service</span><span className="lead-area">Area Solo Raya &amp; Yogyakarta</span></p><div className="hero-slogan"><p className="hero-text">{sloganText}<span className="type-cursor" /></p></div><div className="hero-actions"><a className="button primary" href="#booking">Booking Sekarang <ArrowRight size={17} /></a><a className="button ghost" href="#layanan">Lihat Layanan</a></div><div className="hero-proof"><span><Check size={13} /> Aman &amp; Terpercaya</span><span><Check size={13} /> Tim Profesional</span><span><Check size={13} /> Harga Bersahabat</span></div></div>
        </section>

        <section className="section services-section" id="layanan" ref={servicesRef} ><div className="services-heading-wrap" data-reveal><p className="eyebrow dark">LAYANAN KAMI</p><h2 className="services-title">Layanan Terbaik dari Rencang Resik</h2><p className="services-desc"><BoldText text="*Rumah Bersih, Sehat, dan Nyaman Tanpa Ribet!* Silakan pilih jenis layanan yang sesuai dengan kebutuhan hunian Anda saat ini. Tim profesional kami siap meluncur dengan peralatan lengkap." /></p></div><div className="services-reveal-btn-wrap" data-reveal><button className={`services-reveal-btn${servicesVisible ? ' active' : ''}`} onClick={() => { const next = !servicesVisible; setServicesVisible(next); if (next) setTimeout(() => servicesInnerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); }} aria-expanded={servicesVisible} aria-controls="services-list"><span className="services-reveal-btn-text">{servicesVisible ? 'Sembunyikan Layanan' : 'Yuk Lihat Layanan Kami'}</span><ChevronDown size={20} className="services-reveal-btn-icon" /></button></div><div id="services-list" ref={servicesInnerRef} className="services-list-wrapper"><AnimatePresence initial={false}>{servicesVisible && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="services-list-inner">{serviceCategories.map((cat, catIdx) => <motion.div className="service-category" key={cat.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: catIdx * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}><div className="category-header"><span className="category-icon">{cat.icon ? <cat.icon size={32} /> : <img src={cat.img} alt={cat.title} />}</span><h3>{cat.title}</h3></div><div className="service-grid">{cat.items.map((item, itemIdx) => <motion.article className="service-card" key={item.title} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: catIdx * 0.15 + itemIdx * 0.12 + 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}><div className="icon-box">{item.icon ? <item.icon size={38} /> : <img src={item.img} alt={item.title} />}</div><h4>{item.title}</h4><p><BoldText text={item.text} /></p></motion.article>)}</div></motion.div>)}</motion.div>}</AnimatePresence></div></section>

        <section className="section about-section" id="tentang" ref={aboutRef}><div className="about-image-wrap" data-reveal><img className="about-image" src="/Tentang_Kami.webp" alt="Tentang Rencang Resik" /></div></section>

<section className="section area-section" id="area" ref={areaRef}><div className="section-heading"  data-reveal><p className="eyebrow dark">JANGKAUAN KAMI</p><h2>Area Layanan Kami</h2><p>Komitmen kami adalah menghadirkan hunian yang bersih, sehat, dan nyaman di mana pun Anda berada. <strong>Rencang Resik</strong> melayani berbagai wilayah strategis untuk memastikan Anda mendapatkan pelayanan cleaning service terbaik secara cepat dan tepat waktu. Periksa apakah daerah rumah Anda masuk ke dalam jangkauan layanan kami pada daftar di bawah ini. Cukup pesan lewat WhatsApp, tim kami yang akan datang membawa seluruh peralatan lengkap!</p></div><div className="area-grid">{areas.map((area) => <article className={`area-card ${area.color}`} key={area.name} data-reveal><div className="area-head"><MapPin size={18} /><div><h3>{area.name}</h3><p>{area.sub}</p></div><span className="available">Tersedia</span></div><div className="place-list">{area.places.map((place) => <span key={place}><Check size={12} /> {place}</span>)}</div></article>)}</div><div className="area-note" data-reveal><span className="note-icon"><MapPin size={16} /></span><div><strong>Tidak menemukan area Anda?</strong><p>Hubungi kami untuk mengecek ketersediaan layanan di lokasi Anda.</p></div><a className="dark-button" href="#kontak">Cek Area Anda <ArrowRight size={14} /></a></div></section>

        <section className="booking-section" id="booking" ref={bookingRef}><div className="section-heading" data-reveal><p className="eyebrow dark">PESAN LAYANAN KAMI</p><h2>Booking Layanan</h2><p>Isi Form Sesuai Kebutuhan Anda, dan Setelah Itu Klik Kirim Form Via WhatsApp</p></div><form className="booking-form" onSubmit={submitBooking} data-reveal><div className="form-row"><label>Nama Lengkap *<input required value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="Nama Anda" /></label><label>Nomor WhatsApp *<input required value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} placeholder="08xxxxxxxxxx" /></label></div><div className="form-row"><label>Pilih Layanan *<select required value={form.service} onChange={(event) => updateForm('service', event.target.value)}><option value="">Pilih layanan</option>{allServiceTitles.map((title) => <option key={title}>{title}</option>)}</select></label><label>Tanggal Layanan *<input required type="date" value={form.date} onChange={(event) => updateForm('date', event.target.value)} /></label></div><fieldset><legend>Pilih Jenis Layanan</legend><div className="radio-grid">{allServiceTitles.map((item) => <label key={item}><span className="radio-custom" /><input type="radio" name="kind" defaultChecked={item === 'Daily Cleaning (Sekali Datang)'} /> {item}</label>)}</div></fieldset><label>Lokasi / Alamat Lengkap *<input required value={form.address} onChange={(event) => updateForm('address', event.target.value)} placeholder="Alamat lengkap lokasi layanan" /></label><div className="form-row"><label>Hari Layanan *<input value={selectedDay} readOnly placeholder="Pilih tanggal terlebih dahulu" /></label><label>Waktu yang Diinginkan <input type="time" value={form.time} onChange={(event) => updateForm('time', event.target.value)} /></label></div><label>Detail Kebutuhan / Catatan Khusus<textarea value={form.note} onChange={(event) => updateForm('note', event.target.value)} placeholder="Ceritakan kebutuhan Anda"></textarea></label><div className="booking-summary"><div><strong>Preview Pesan WhatsApp</strong><span>Pesan Anda akan dikirim ke tim Rencang Resik</span></div><div className="summary-preview">Halo Rencang Resik,<br />Saya ingin memesan layanan <b>{form.service || 'Cleaning Service'}</b>.<br />Nama: {form.name || 'Nama Anda'}<br />No. WhatsApp: {form.phone || '-'}<br />Tanggal: {form.date || '-'}<br />Hari: {selectedDay || '-'}<br />Waktu: {form.time || '-'}<br />Alamat: {form.address || '-'}<br />Catatan: {form.note || '-'}<br />Terima kasih.</div></div><button className="submit-button" type="submit"><MessageCircle size={17} /> {sent ? 'Klik - Kirim Form Via WhatsApp' : 'Klik - Kirim Form Via WhatsApp'}</button>{sent && <p className="success-message"><Check size={15} /> Terima kasih, permintaan booking Anda sudah tercatat. Tim kami akan segera menghubungi Anda.</p>}</form></section>

        <section className="section social-section" ref={socialRef}><div className="section-heading"  data-reveal><p className="eyebrow dark social-eyebrow-orange">TETAP TERHUBUNG</p><h2 className="social-heading-orange">Ikuti Rencang Resik</h2><p>Ikuti Rencang Resik untuk mendapatkan info layanan, promo menarik, penawaran spesial, dan update terbaru dari kami</p></div><div className="social-grid"><Social type="instagram" title="Instagram" handle="@rencangresik" href="https://www.instagram.com/rencangresik?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" /><Social type="tiktok" title="TikTok" handle="@rencangresiksolo" href="https://www.tiktok.com/@rencangresiksolo" /></div></section>
      </main>

      <footer id="kontak"><div className="footer-contact"><div><p className="eyebrow">HUBUNGI KAMI</p><h2>Hubungi Rencang Resik</h2><p>Punya pertanyaan seputar layanan kami? Jadwal, durasi, harga, dan konsultasi kebutuhan layanan khusus? Hubungi kami langsung melalui WhatsApp.</p></div><div className="whatsapp-card"><div className="wa-head"><img src="/pngwing.com_(5)_(1).png" alt="WhatsApp" /><span>CS Rencang Resik</span></div><strong>0822 4548 9977</strong><a href="https://wa.me/6282245489977">Chat WhatsApp Sekarang <ArrowRight size={13} /></a></div></div><div className="footer-bottom"><div><a className="footer-brand" href="#beranda"><img className="footer-logo" src="/Logo_.png" alt="Rencang Resik" /></a><p>Konco Apik Supoyo Papan Panggonan Dadi Resik</p><small>© 2026 Rencang Resik. All rights reserved.</small></div><div><h4>Tautan Cepat</h4><a href="#layanan">Layanan</a><a href="#tentang">Tentang Kami</a><a href="#area">Area Layanan</a><a href="#booking">Booking</a></div><div><h4>Kontak &amp; Layanan</h4><span><MapPin size={13} /> Solo Raya &amp; Yogyakarta</span><span><Mail size={13} /> halo@rencangresik.com</span><a className="footer-wa" href="https://wa.me/6282245489977"><Phone size={13} /> Chat WhatsApp</a></div></div></footer>

    </div>
  );
}

function Social({ type, title, handle, href }: { type: 'instagram' | 'tiktok'; title: string; handle: string; href: string }) { return <article className="social-card"><div className={`social-icon ${type}`}>{type === 'instagram' ? <img src="/assets/icons/—Pngtree—instagram_icon_vector_8704817_(1).png" alt="Instagram" /> : <img src="/assets/icons/Tiktokicon.webp" alt="TikTok" />}</div><h3>{title}</h3><p className="social-handle">{handle}</p><a href={href} target="_blank" rel="noreferrer">Ikuti Kami di {title} <ArrowRight size={13} /></a></article>; }

export default App;
