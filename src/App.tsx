import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  X,
} from 'lucide-react';

const SLOGAN = 'Konco Apik Supoyo Papan Panggonan Dadi Resik';


const serviceCategories = [
  {
    img: '/kebersihanicon.png',
    title: 'Kebersihan Rumah & Hunian',
    items: [
      { img: '/dailyicon.png', title: 'Daily Cleaning (Sekali Datang)', text: 'Solusi praktis kebersihan harian tanpa terikat kontrak. Layanan bersih-bersih standar yang cepat dan efisien (menyapu, mengepel, lap debu, merapikan kasur, dan sikat kamar mandi). Cocok untuk Anda yang sibuk dan ingin rumah atau apartemen langsung rapi dalam sekejap.' },
      { img: '/deepcleaningicon.png', title: 'Deep Cleaning / Borongan', text: 'Pembersihan menyeluruh skala besar untuk hasil higienis maksimal. Layanan pembersihan total secara mendetail ke sudut yang jarang tersentuh. Ideal untuk kerak kamar mandi menahun, pasca-renovasi, pindahan rumah, hingga persiapan acara besar.' },
      { img: '/cleaninglanggananicon.png', title: 'Cleaning Langganan (Subscription)', text: 'Rumah selalu bersih konsisten dengan harga jauh lebih hemat! Solusi untuk Anda yang butuh jasa pembersihan rutin berkala (misal: seminggu 2x atau sebulan 4x). Nikmati jadwal prioritas, tim tetap yang tepercaya, dan paket harga lebih terjangkau.' },
      { img: '/kosicon.png', title: 'Paket Kos (Pindahan / Serah Terima)', text: 'Solusi praktis dan hemat khusus anak kos dan pemilik persewaan. Layanan kilat untuk membersihkan kamar kos secara total. Cocok bagi penghuni baru yang ingin kamarnya steril, maupun penghuni lama yang akan pindah (checkout) agar serah terima kunci berjalan lancar.' },
    ],
  },
  {
    img: '/perawatanfurnituricon.png',
    title: 'Perawatan Furnitur & Estetik',
    items: [
      { img: '/laundrysofaicon.png', title: 'Laundry Sofa & Bed', text: 'Usir tungau, debu, dan noda membandel dari tempat tidur & sofa favorit. Kami membersihkan sofa, kasur, bantal, hingga karpet dengan teknik cuci-sikat-vakum-pengeringan menggunakan cairan pembersih aman. Efektif membunuh bakteri dan tungau penyebab gatal atau alergi.' },
      { img: '/poleslantaiicon.png', title: 'Poles Lantai', text: 'Kembalikan kilau mewah dan keindahan lantai hunian Anda. Layanan restorasi dan perawatan untuk berbagai jenis lantai — marmer, granit, teraso, hingga keramik. Kami mengangkat kusam, menyamarkan goresan halus, dan memberikan proteksi agar lantai kembali berkilau alami.' },
      { img: '/repainticon.png', title: 'Repaint (Pengecatan Ulang)', text: 'Segarkan kembali estetika dinding rumah dengan warna baru. Layanan pengecatan ulang untuk dinding interior maupun eksterior yang kusam, mengelupas, atau berjamur. Tim kami bekerja rapi, melindungi furnitur dari cipratan, dan memberikan hasil akhir halus serta tahan lama.' },
    ],
  },
  {
    img: '/sanitasiicon.png',
    title: 'Sanitasi & Perawatan Fasilitas',
    items: [
      { img: '/cuciacicon.png', title: 'Service & Cuci AC', text: 'Udara rumah lebih sejuk, bersih, dan hemat konsumsi listrik. Perawatan AC berkala mulai dari pencucian filter, pembersihan evaporator, hingga pengecekan tekanan freon oleh teknisi ahli. AC yang bersih memastikan sirkulasi udara tetap sehat untuk keluarga.' },
      { img: '/tandonicon.png', title: 'Kuras Tandon & Ground Tank', text: 'Jaminan air bersih, higienis, dan bebas lumut untuk konsumsi keluarga. Layanan pengurasan dan pembersihan total tangki air dari endapan lumpur, lumut, kuman, dan jentik nyamuk. Kami memastikan aliran air kembali jernih dan aman untuk kebutuhan sehari-hari.' },
      { img: '/foggingicon.png', title: 'Fogging (Disinfektan & Pembasmi Hama)', text: 'Sterilisasi total untuk udara dan ruangan yang sehat serta bebas kuman. Layanan pengasapan menggunakan cairan disinfektan premium yang aman bagi manusia dan hewan peliharaan. Efektif membunuh 99.9% bakteri/virus serta membasmi serangga pengganggu di sudut ruangan.' },
    ],
  },
];

const areas = [
  { name: 'SOLO RAYA', sub: 'Kota Surakarta dan area di sekitarnya', color: 'blue', places: ['Kota Solo', 'Sukoharjo', 'Karanganyar', 'Boyolali', 'Klaten', 'Wonogiri'] },
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
  const [form, setForm] = useState({ name: '', phone: '', date: '', note: '' });

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
Nama: ${form.name || 'Nama Anda'}
No. WhatsApp: ${form.phone || '-'}
Tanggal: ${form.date || '-'}
Catatan: ${form.note || '-'}
Terima kasih.`;
    window.open(`https://wa.me/6282245489977?text=${encodeURIComponent(message)}`, '_blank');
    setSent(true);
  };

  return (
    <div className="site-shell">
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
          <div className="hero-mascot-wrap"><img src="/Maskot_rencang_resik.png" alt="Maskot Rencang Resik" /></div>
          <div className="hero-copy"><p className="eyebrow">JASA KEBERSIHAN &amp; PERAWATAN</p><img className="hero-title-image" src="/polos_remove_bg.webp" alt="Rencang Resik" /><p className="hero-lead"><span className="lead-main">Jasa Cleaning &amp; Home Service</span><span className="lead-area">Area Solo Raya &amp; Yogyakarta</span></p><div className="hero-slogan"><p className="hero-text">{SLOGAN}</p></div><div className="hero-actions"><a className="button primary" href="#booking">Booking Sekarang <ArrowRight size={17} /></a><a className="button ghost" href="#layanan">Lihat Layanan</a></div><div className="hero-proof"><span><Check size={13} /> Aman &amp; Terpercaya</span><span><Check size={13} /> Tim Profesional</span><span><Check size={13} /> Harga Bersahabat</span></div></div>
        </section>

        <section className="section services-section" id="layanan" ref={servicesRef} data-num="01"><div className="section-heading" data-reveal><p className="eyebrow dark">LAYANAN KAMI</p><h2>Layanan Terbaik dari Rencang Resik</h2><p>Rumah Bersih, Sehat, dan Nyaman Tanpa Ribet! Silakan pilih jenis layanan yang sesuai dengan kebutuhan hunian Anda saat ini. Tim profesional kami siap meluncur dengan peralatan lengkap.</p></div>{serviceCategories.map((cat) => <div className="service-category" key={cat.title} data-reveal><div className="category-header"><span className="category-icon"><img src={cat.img} alt={cat.title} /></span><h3>{cat.title}</h3></div><div className="service-grid">{cat.items.map((item) => <article className="service-card" key={item.title} data-reveal><div className="icon-box"><img src={item.img} alt={item.title} /></div><h4>{item.title}</h4></article>)}</div></div>)}</section>

        <section className="section about-section" id="tentang" ref={aboutRef}><div className="about-copy" data-reveal><p className="eyebrow dark">MENGAPA KAMI</p><h2>Tentang Rencang Resik</h2><p>Rencang Resik hadir sebagai teman yang membantu menjaga kebersihan dan kenyamanan rumah, kantor, kost, serta ruang usaha Anda.</p><p>Kami percaya lingkungan yang bersih memberikan energi positif dan kualitas hidup yang lebih baik. Dengan tim berpengalaman dan proses kerja yang rapi, kami siap menjadi rencang andalan Anda.</p></div><div className="values">{[<Value key="v1" icon={Check} title="Praktis &amp; Anti Ribet" text="Pesan mudah, jadwal fleksibel, dan layanan langsung ke lokasi Anda." />, <Value key="v2" icon={Star} title="Terpercaya &amp; Profesional" text="Tim terlatih dengan standar kerja yang konsisten dan hasil maksimal." />, <Value key="v3" icon={MapPin} title="Area Layanan Luas" text="Hadir di Solo Raya dan Daerah Istimewa Yogyakarta." />].map((el, i) => <div key={i} data-reveal>{el}</div>)}</div></section>

<section className="section area-section" id="area" ref={areaRef}><div className="section-heading" data-num="03" data-reveal><p className="eyebrow dark">JANGKAUAN KAMI</p><h2>Area Layanan Kami</h2><p>Komitmen kami adalah menghadirkan hunian yang bersih, sehat, dan nyaman di mana pun Anda berada. <strong>Rencang Resik</strong> melayani berbagai wilayah strategis untuk memastikan Anda mendapatkan pelayanan cleaning service terbaik secara cepat dan tepat waktu. Periksa apakah daerah rumah Anda masuk ke dalam jangkauan layanan kami pada daftar di bawah ini. Cukup pesan lewat WhatsApp, tim kami yang akan datang membawa seluruh peralatan lengkap!</p></div><div className="area-grid">{areas.map((area) => <article className={`area-card ${area.color}`} key={area.name} data-reveal><div className="area-head"><MapPin size={18} /><div><h3>{area.name}</h3><p>{area.sub}</p></div><span className="available">Tersedia</span></div><div className="place-list">{area.places.map((place) => <span key={place}><Check size={12} /> {place}</span>)}</div></article>)}</div><div className="area-note" data-reveal><span className="note-icon"><MapPin size={16} /></span><div><strong>Tidak menemukan area Anda?</strong><p>Hubungi kami untuk mengecek ketersediaan layanan di lokasi Anda.</p></div><a className="dark-button" href="#kontak">Cek Area Anda <ArrowRight size={14} /></a></div></section>

        <section className="booking-section" id="booking" ref={bookingRef}><div className="section-heading" data-reveal><p className="eyebrow dark">PESAN LAYANAN KAMI</p><h2>Booking Layanan</h2><p>Isi kebutuhan Anda, dan kami akan menghubungi Anda melalui WhatsApp.</p></div><form className="booking-form" onSubmit={submitBooking} data-reveal><div className="form-row"><label>Nama Lengkap *<input required value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="Nama Anda" /></label><label>Nomor WhatsApp *<input required value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} placeholder="08xxxxxxxxxx" /></label></div><div className="form-row"><label>Tanggal Layanan *<input required type="date" value={form.date} onChange={(event) => updateForm('date', event.target.value)} /></label><label>Waktu yang Diinginkan <input type="time" /></label></div><label>Lokasi / Alamat Lengkap *<input required placeholder="Alamat lengkap lokasi layanan" /></label><div className="form-row"><label>Hari Layanan *<input value={selectedDay} readOnly placeholder="Pilih tanggal terlebih dahulu" /></label></div><label>Detail Kebutuhan / Catatan Khusus<textarea value={form.note} onChange={(event) => updateForm('note', event.target.value)} placeholder="Ceritakan kebutuhan Anda"></textarea></label><div className="booking-summary"><div><strong>Preview Pesan WhatsApp</strong><span>Pesan Anda akan dikirim ke tim Rencang Resik</span></div><div className="summary-preview">Halo Rencang Resik,<br />Saya ingin memesan layanan cleaning service.<br />Nama: {form.name || 'Nama Anda'}<br />Terima kasih.</div></div><button className="submit-button" type="submit"><MessageCircle size={17} /> {sent ? 'Pesan Siap Dikirim' : 'Booking via WhatsApp (Instan)'}</button>{sent && <p className="success-message"><Check size={15} /> Terima kasih, permintaan booking Anda sudah tercatat. Tim kami akan segera menghubungi Anda.</p>}</form></section>

        <section className="section social-section" ref={socialRef}><div className="section-heading" data-num="05" data-reveal><p className="eyebrow dark">TETAP TERHUBUNG</p><h2>Ikuti Rencang Resik</h2><p>Ikuti Rencang Resik untuk mendapatkan info layanan, promo menarik, penawaran spesial, dan update terbaru dari kami</p></div><div className="social-grid"><Social type="instagram" title="Instagram" href="https://www.instagram.com/rencangresik?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" /><Social type="threads" title="Threads" href="https://www.threads.com/@rencangresik" /><Social type="tiktok" title="TikTok" href="https://www.tiktok.com/@rencangresiksolo?is_from_webapp=1&sender_device=pc" /></div></section>
      </main>

      <footer id="kontak"><div className="footer-contact"><div><p className="eyebrow">HUBUNGI KAMI</p><h2>Hubungi Rencang Resik</h2><p>Punya pertanyaan seputar layanan kami? Jadwal, durasi, harga, dan konsultasi kebutuhan layanan khusus? Hubungi kami langsung melalui WhatsApp.</p></div><div className="whatsapp-card"><div className="wa-head"><img src="/pngwing.com_(5)_(1).png" alt="WhatsApp" /><span>CS Rencang Resik</span></div><strong>0822 4548 9977</strong><a href="https://wa.me/6282245489977">Chat WhatsApp Sekarang <ArrowRight size={13} /></a></div></div><div className="footer-bottom"><div><a className="footer-brand" href="#beranda"><img className="footer-logo" src="/Logo_.png" alt="Rencang Resik" /></a><p>Konco Apik Supoyo Papan Panggonan Dadi Resik</p><small>© 2026 Rencang Resik. All rights reserved.</small></div><div><h4>Tautan Cepat</h4><a href="#layanan">Layanan</a><a href="#tentang">Tentang Kami</a><a href="#area">Area Layanan</a><a href="#booking">Booking</a></div><div><h4>Kontak &amp; Layanan</h4><span><MapPin size={13} /> Solo Raya &amp; Yogyakarta</span><span><Mail size={13} /> halo@rencangresik.com</span><a className="footer-wa" href="https://wa.me/6282245489977"><Phone size={13} /> Chat WhatsApp</a></div></div></footer>

    </div>
  );
}

function SocialLogo({ type }: { type: 'instagram' | 'threads' | 'tiktok' }) {
  if (type === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (type === 'threads') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.8 11.1c-.2-3.8-2.4-6-5.9-6-3.4 0-5.8 2.1-5.8 5.3 0 3.5 2.7 5.7 6.2 5.7 2.8 0 4.8-1.4 5.5-3.7-1.1-1.1-2.6-1.6-4.4-1.6-1.8 0-2.9.7-2.9 1.8 0 .8.7 1.3 1.7 1.3 1.5 0 2.5-.9 2.5-2.5 0-3-1.6-4.7-4.1-4.7-2 0-3.4 1.3-3.4 3.2 0 2.1 1.6 3.5 4 3.5 3.4 0 5.8 2.1 5.8 4.8 0 2.7-2.2 4.3-5.4 4.3-4.4 0-7.4-2.8-7.4-7.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (type === 'tiktok') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4v10.2a3.6 3.6 0 1 1-3-3.5M14 4c.5 2.6 2.1 4.2 4.5 4.7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 7.8 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M8.8 8.5c.3 3.2 2.4 6 5.3 7.1 1.4.5 2.6.1 2.9-.9.2-.6-.2-1.1-.9-1.4l-1.5-.7c-.5-.2-.8-.1-1.1.3l-.5.6c-1.1-.5-2-1.4-2.5-2.5l.6-.5c.4-.3.5-.7.3-1.1l-.7-1.5c-.3-.7-.8-1.1-1.4-.9-.4.1-.6.6-.5 1.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Value({ icon: Icon, title, text }: { icon: typeof Check; title: string; text: string }) { return <div className="value-card"><div className="value-icon"><Icon size={18} /></div><div><h3>{title}</h3><p>{text}</p></div></div>; }
function Social({ type, title, href }: { type: 'instagram' | 'threads' | 'tiktok'; title: string; href: string }) { return <article className="social-card"><div className={`social-icon ${type}`}>{type === 'instagram' ? <img src="/assets/icons/—Pngtree—instagram_icon_vector_8704817_(1).png" alt="Instagram" /> : type === 'threads' ? <img src="/SL_Z_-071023-61200-06.png" alt="Threads" /> : <SocialLogo type={type} />}</div><h3>{title}</h3><a href={href} target="_blank" rel="noreferrer">Ikuti Kami di {title} <ArrowRight size={13} /></a></article>; }

export default App;
