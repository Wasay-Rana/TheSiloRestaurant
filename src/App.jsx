import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowUpRight, Phone, MapPin, Menu as MenuIcon, X, Clock } from 'lucide-react'
import { BRAND, NAV, MENU, MOMENTS, SHOTS } from './data'

const Instagram = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
  </svg>
)
const Facebook = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
  </svg>
)

const ease = [0.22, 1, 0.36, 1]
const YEAR = new Date().getFullYear()

/* ---------- helpers ---------- */
function useOpenNow() {
  const [s, setS] = useState(null)
  useEffect(() => {
    const calc = () => {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi', weekday: 'short', hour: 'numeric', hour12: false,
      }).formatToParts(new Date())
      const day = parts.find(p => p.type === 'weekday').value
      const h = Number(parts.find(p => p.type === 'hour').value) % 24
      const open = h >= 12 // 12 PM until midnight
      const lateOpen = (day === 'Sat' || day === 'Sun') && h < 1 // Fri/Sat nights run to 1 AM
      setS(open || lateOpen)
    }
    calc()
    const id = setInterval(calc, 60000)
    return () => clearInterval(id)
  }, [])
  return s
}

function Reveal({ children, delay = 0, y = 40, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- loader ---------- */
function Loader({ done }) {
  return (
    <motion.div className="loader" initial={{ y: 0 }} animate={done ? { y: '-100%' } : {}}
      transition={{ duration: 1.1, ease, delay: 0.2 }}>
      <div className="loader-word">
        {'THE SILO'.split('').map((c, i) => (
          <motion.span key={i} initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: done ? 0 : 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease }}>
            {c === ' ' ? ' ' : c}
          </motion.span>
        ))}
      </div>
      <motion.div className="loader-bar" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }} />
    </motion.div>
  )
}

/* ---------- liquid glass header ---------- */
function Header({ active }) {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const on = () => setCompact(window.scrollY > 60)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <motion.header className="hdr-wrap" initial={{ y: -120, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease, delay: 1.6 }}>
      <div className={`pill ${compact ? 'compact' : ''}`}>
        <span className="pill-shine" />
        <a href="#top" className="pill-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <i className="dot" />THE SILO
        </a>
        <nav className="pill-nav">
          {NAV.map(n => (
            <button key={n.id} onClick={() => go(n.id)} className={active === n.id ? 'on' : ''}>
              {active === n.id && <motion.span layoutId="navpill" className="navpill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
        <button className="pill-cta" onClick={() => go('reserve')}>Book a Table <ArrowUpRight size={15} /></button>
        <button className="pill-burger" aria-label="Menu" onClick={() => setOpen(o => !o)}>
          {open ? <X size={18} /> : <MenuIcon size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="sheet" initial={{ opacity: 0, y: -14, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: .97 }} transition={{ duration: .4, ease }}>
            {NAV.map(n => <button key={n.id} onClick={() => go(n.id)}>{n.label}</button>)}
            <a href={BRAND.tel}>Call {BRAND.phone}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ---------- hero ---------- */
function Hero({ ready }) {
  const open = useOpenNow()
  const { scrollYProgress } = useScroll()
  const yTitle = useTransform(scrollYProgress, [0, .25], [0, 160])
  const fade = useTransform(scrollYProgress, [0, .2], [1, 0])
  return (
    <section id="top" className="hero">
      <div className="mesh m1" /><div className="mesh m2" /><div className="mesh m3" />

      {/* dome / arch artwork */}
      <div className="dome-art" aria-hidden="true">
        <div className="arch a1" /><div className="arch a2" /><div className="arch a3" />
        <div className="sun" />
      </div>

      <motion.div className="hero-inner" style={{ y: yTitle, opacity: fade }}>
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease, delay: .3 }}>
          Japanese &amp; Fusion · Rooftop · Clifton, Karachi
        </motion.p>
        <h1 className="hero-title" aria-label="Silo">
          {'SILO'.split('').map((c, i) => (
            <motion.span key={i} initial={{ y: '110%' }} animate={ready ? { y: 0 } : {}}
              transition={{ duration: 1.3, ease, delay: .4 + i * .09 }}>{c}</motion.span>
          ))}
        </h1>
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.1, ease, delay: 1 }}>
          Where culinary artistry <em>meets the skyline.</em>
        </motion.p>
        <motion.div className="hero-cta" initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.1, ease, delay: 1.2 }}>
          <a className="btn primary" href="#reserve">Reserve Experience <ArrowUpRight size={16} /></a>
          <a className="btn glassy" href="#menu">Explore Menu</a>
        </motion.div>
      </motion.div>

      <motion.div className="hero-foot" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.8, duration: 1 }}>
        <span className="badge"><i className={`pulse ${open ? 'live' : ''}`} />{open === null ? 'Hours' : open ? 'Open now' : 'Opens at 12 PM'}</span>
        <span className="foot-mid">E-Street, Block 4, Clifton</span>
        <span className="scroll-cue">Scroll <i /></span>
      </motion.div>
    </section>
  )
}

/* ---------- marquee ---------- */
function Marquee() {
  const items = ['Sushi', 'Sashimi', 'Takikomi Gohan', 'Tori Goma', 'Dim Sum', 'Ossobuco', 'Crème Brûlée', 'Craft Mocktails', 'Specialty Coffee']
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {row.map((t, i) => <span key={i}>{t}<b>✦</b></span>)}
      </div>
    </div>
  )
}

/* ---------- experience: scroll-lit statement ---------- */
function Word({ w, range, p }) {
  const o = useTransform(p, range, [.15, 1])
  return <motion.span style={{ opacity: o }}>{w} </motion.span>
}
function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.35'] })
  const text = 'Behind a quiet façade on E-Street, The Silo opens into a world of glowing curves, Japanese craft and a rooftop that holds the whole of Clifton at its feet. Come hungry. Stay for the skyline.'
  const words = text.split(' ')
  return (
    <section id="experience" className="sec experience">
      <Reveal className="identity">
        <div className="oval"><img src="/images/silo-logo.jpg" alt="Sílo — Continental & Japanese Cuisine" /></div>
        <div className="id-r">
          <div className="id-copy">
            <p className="eyebrow">Our Identity</p>
            <h3>Sun, vine &amp; <em>candlelight</em></h3>
            <p>Our oval mark — a golden sun rising over a growing vine — sets the tone: warm, rooted and a little theatrical. Continental &amp; Japanese cuisine, served late.</p>
          </div>
          <figure className="wide"><img src="/images/silo-steak.jpg" alt="Grilled steak from the Silo kitchen" loading="lazy" /><figcaption>From the Silo kitchen</figcaption></figure>
        </div>
      </Reveal>
      <p className="eyebrow center">The Experience</p>
      <p ref={ref} className="statement">
        {words.map((w, i) => <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}
      </p>
      <div className="trio">
        {[
          ['01', 'Architecture', 'Soft curves and ambient, minimalist light that turn dinner into an evening.'],
          ['02', 'The Kitchen', 'High-end Japanese specialties meet elevated continental plates.'],
          ['03', 'The Rooftop', 'Panoramic views, craft mocktails and specialty coffee under the stars.'],
        ].map(([n, t, d], i) => (
          <Reveal key={n} delay={i * .12}>
            <Spot className="card">
              <span className="num">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Spot>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* glass card with cursor spotlight */
function Spot({ children, className = '', ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return <div className={`spot ${className}`} onMouseMove={onMove} {...rest}>{children}</div>
}

/* ---------- menu ---------- */
function MenuSection() {
  const cats = Object.keys(MENU)
  const [cat, setCat] = useState(cats[0])
  const [idx, setIdx] = useState(0)
  const items = MENU[cat]
  const cur = items[Math.min(idx, items.length - 1)]
  return (
    <section id="menu" className="sec menu">
      <Reveal><p className="eyebrow center">The Gastronomy</p>
        <h2 className="h2 center">A menu that <em>glows</em></h2></Reveal>
      <div className="tabs">
        {cats.map(c => (
          <button key={c} className={c === cat ? 'on' : ''} onClick={() => { setCat(c); setIdx(0) }}>
            {c === cat && <motion.span layoutId="tab" className="tabbg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            <span>{c}</span>
          </button>
        ))}
      </div>
      <div className="menu-grid">
        <ul className="dishes">
          <AnimatePresence mode="popLayout">
            {items.map((it, i) => (
              <motion.li key={cat + it.name} layout initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: .6, ease, delay: i * .06 }}
                className={i === idx ? 'on' : ''} onMouseEnter={() => setIdx(i)} onClick={() => setIdx(i)}>
                <span className="dn">{String(i + 1).padStart(2, '0')}</span>
                <span className="dt">{it.name}</span>
                <span className="dp">{it.price.startsWith('PKR') ? it.price : '—'}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <div className="preview">
          <AnimatePresence mode="wait">
            <motion.div key={cur.name} className="pv-card" initial={{ opacity: 0, scale: .96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: .98 }} transition={{ duration: .5, ease }}>
              <div className="pv-art" style={{ '--a': cur.g[0], '--b': cur.g[1], '--c': cur.g[2] }}>
                <div className="plate"><div className="plate-in" /></div>
                <span className="pv-tag">Photo coming soon</span>
              </div>
              <div className="pv-body">
                <h3>{cur.name}</h3>
                <p>{cur.desc}</p>
                <span className="pv-price">{cur.price}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="fine center">Prices in PKR. Menu may change — call or DM for today’s full list.</p>
    </section>
  )
}

/* ---------- rooftop horizontal scroll ---------- */
function Rooftop() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const railRef = useRef(null)
  const [dist, setDist] = useState(600)
  useEffect(() => {
    const m = () => setDist(Math.max(0, (railRef.current?.scrollWidth || 0) - window.innerWidth + 40))
    m(); window.addEventListener('resize', m)
    return () => window.removeEventListener('resize', m)
  }, [])
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist])
  return (
    <section id="rooftop" ref={ref} className="rooftop">
      <div className="sticky">
        <div className="rt-head">
          <p className="eyebrow">Rooftop &amp; Dome</p>
          <h2 className="h2">Dine above <em>the city</em></h2>
        </div>
        <motion.div className="rail" ref={railRef} style={{ x }}>
          {SHOTS.map((s) => {
            const Tag = s.url ? 'a' : 'div'
            return (
              <Tag key={s.cap} className="shot" {...(s.url ? { href: s.url, target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <img src={s.img} alt={s.cap} loading="lazy" draggable="false" style={{ objectPosition: s.pos }} />
                <div className="shot-glow" />
                {s.url && <span className="igplay"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg></span>}
                <div className="shot-cap"><small>{s.sub}</small><h3>{s.cap}</h3></div>
              </Tag>
            )
          })}
          <div className="shot cta-shot">
            <h3>Reserve a <em>dome</em></h3>
            <p>Glass, candlelight and the Clifton night — for two, or a small circle.</p>
            <a className="btn primary" href="#reserve">Book now <ArrowUpRight size={16} /></a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- instagram banner ---------- */
function Insta() {
  return (
    <section className="sec insta">
      <Reveal>
        <a className="igband" href={BRAND.instagram} target="_blank" rel="noopener noreferrer">
          <div className="igband-bg"><img src="/images/silo-facade.jpg" alt="" /><img src="/images/silo-rooftop.jpg" alt="" /></div>
          <div className="igband-in">
            <Instagram size={34} />
            <h2 className="h2">Follow the <em>glow</em></h2>
            <p>Dome nights, rooftop views, Ramadan &amp; Valentine's, hi-tea and more — all on Instagram.</p>
            <span className="btn primary">{BRAND.handle} <ArrowUpRight size={16} /></span>
          </div>
        </a>
      </Reveal>
    </section>
  )
}

/* ---------- moments ---------- */
function Moments({ onPick }) {
  return (
    <section className="sec moments">
      <Reveal><p className="eyebrow center">Occasions</p><h2 className="h2 center">Every night, <em>an occasion</em></h2></Reveal>
      <div className="mgrid">
        {MOMENTS.map((m, i) => (
          <Reveal key={m.t} delay={(i % 3) * .1}>
            <Spot className="mcard" role="button" tabIndex={0} onClick={() => onPick(m)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPick(m)}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{m.t}</h3>
              <p>{m.d}</p>
              <span className="go">Reserve this <ArrowUpRight size={16} /></span>
            </Spot>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- reservations ---------- */
function Reserve({ pick }) {
  const [f, setF] = useState({
    name: '', date: '', time: '20:00', guests: '2',
    type: pick?.type ?? 'Table', occasion: pick?.t ?? 'Just dinner',
  })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const msg = encodeURIComponent(
    `Hi The Silo! I'd like to reserve a ${f.type.toLowerCase()} for ${f.guests} guest(s)` +
    `${f.date ? ' on ' + f.date : ''} at ${f.time}.` +
    `${f.occasion !== 'Just dinner' ? ' Occasion: ' + f.occasion + '.' : ''} Name: ${f.name || '—'}.`)
  const submit = (e) => { e.preventDefault(); window.open(`https://wa.me/${BRAND.whatsapp}?text=${msg}`, '_blank') }
  return (
    <section id="reserve" className="sec reserve">
      <div className="reserve-l">
        <Reveal>
          <p className="eyebrow">Reservations</p>
          <h2 className="h2">Save your <em>seat</em></h2>
          <p className="lead">Domes and rooftop tables fill quickly — especially Fridays and Saturdays. Send your request and we’ll confirm.</p>
          <ul className="info">
            <li><MapPin size={18} /><span>{BRAND.address}</span></li>
            <li><Phone size={18} /><a href={BRAND.tel}>{BRAND.phone}</a></li>
            <li><Clock size={18} /><span>Sun–Thu 12 PM – 12 AM<br />Fri–Sat 12 PM – 1 AM</span></li>
          </ul>
          <a className="btn glassy" href={BRAND.maps} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={16} /></a>
        </Reveal>
      </div>
      <Reveal delay={.15} className="reserve-r">
        <form className="form" onSubmit={submit}>
          <span className="pill-shine" />
          <div className="seg">
            {['Table', 'Rooftop', 'Dome'].map(t => (
              <button type="button" key={t} className={f.type === t ? 'on' : ''} onClick={() => setF({ ...f, type: t })}>{t}</button>
            ))}
          </div>
          <label>Name<input required value={f.name} onChange={set('name')} placeholder="Your name" /></label>
          <div className="row">
            <label>Date<input required type="date" value={f.date} onChange={set('date')} /></label>
            <label>Time<input type="time" value={f.time} onChange={set('time')} /></label>
          </div>
          <div className="row">
            <label>Guests
              <select value={f.guests} onChange={set('guests')}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label>Occasion
              <select value={f.occasion} onChange={set('occasion')}>
                <option>Just dinner</option>
                {MOMENTS.map(m => <option key={m.t}>{m.t}</option>)}
              </select>
            </label>
          </div>
          <button className="btn primary full" type="submit">Request via WhatsApp <ArrowUpRight size={16} /></button>
          <a className="alt" href={BRAND.tel}>or call {BRAND.phone}</a>
        </form>
      </Reveal>
    </section>
  )
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="foot-glow" />
      <div className="foot-top">
        <div>
          <p className="eyebrow">Follow the glow</p>
          <div className="socials">
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} /> {BRAND.handle}</a>
            <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={18} /> TheSilo.pk</a>
          </div>
        </div>
        <div className="foot-info">
          <p>{BRAND.address}</p>
          <a href={BRAND.tel}>{BRAND.phone}</a>
          <p>Sun–Thu 12–12 · Fri–Sat 12–1</p>
        </div>
      </div>
      <div className="giant">SILO</div>
      <p className="copy">© {YEAR} The Silo · Clifton, Karachi</p>
    </footer>
  )
}

/* ---------- app ---------- */
export default function App() {
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState('')
  const [pick, setPick] = useState(null)
  const pickOccasion = (m) => {
    setPick({ ...m, n: Date.now() })
    document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1700)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    NAV.forEach(n => { const el = document.getElementById(n.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Loader done={ready} />
      <Header active={active} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Experience />
        <MenuSection />
        <Rooftop />
        <Insta />
        <Moments onPick={pickOccasion} />
        <Reserve key={pick?.n ?? 0} pick={pick} />
      </main>
      <Footer />
    </>
  )
}
