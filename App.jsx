import { useEffect, useRef, useState } from 'react'

const contact = {
  github: 'https://github.com/Vedant1108',
  linkedin: 'https://www.linkedin.com/in/vedant-patil-078544326',
  email: 'mailto:vedantpatil1108@gmail.com',
}

const projects = [
  {
    number: '01',
    title: 'SENTINEL-B',
    status: 'Ongoing · Hackathon build',
    description:
      'A non-IoC compromise detection system for firewall, router, and host telemetry, being built for a national NTRO/NCIIPC cybersecurity hackathon.',
    detail:
      'The ML detection core uses per-entity and peer-group baselines, ATT&CK-aligned invariant detectors, and statistically fused risk scores to keep alerts manageable for analysts.',
    tags: ['Python', 'Scikit-Learn', 'TensorFlow', 'Docker'],
    accent: 'violet',
  },
  {
    number: '02',
    title: 'MedBlocks',
    status: '7-month team project',
    description:
      'A blockchain-enabled medical record management backend designed for secure, scalable healthcare applications.',
    detail:
      'It provides RESTful record-management APIs, role-based access for patients and healthcare professionals, IPFS file storage, and structured MariaDB metadata.',
    tags: ['FastAPI', 'MariaDB', 'Ethereum', 'IPFS'],
    accent: 'cyan',
  },
  {
    number: '03',
    title: 'CityPulse',
    status: '6-month independent project',
    description:
      'A normalized relational database for a community issue-management platform supporting complaint registration, tracking, and reporting.',
    detail:
      'The architecture uses a connected entity model, ER diagrams, SQL joins, views, triggers, stored procedures, aggregates, and indexing strategies.',
    tags: ['MariaDB', 'SQL', 'Database Design'],
    accent: 'lime',
  },
]

const skillGroups = [
  { label: 'Languages', items: ['C++', 'Python', 'JavaScript', 'SQL'] },
  { label: 'Build with', items: ['FastAPI', 'TensorFlow', 'Scikit-Learn', 'OpenCV', 'Streamlit'] },
  { label: 'Data & tools', items: ['MariaDB', 'MySQL', 'Git', 'Postman', 'Jupyter Notebook'] },
  { label: 'Focus areas', items: ['AI', 'Machine Learning', 'Deep Learning', 'REST APIs', 'Blockchain'] },
]

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    github: <><path d="M15 22v-3.9c.04-1 .34-1.75.8-2.1 2.65-.3 5.45-1.3 5.45-5.87 0-1.3-.46-2.36-1.22-3.2.12-.3.53-1.53-.12-3.18 0 0-1-.32-3.3 1.22A11.4 11.4 0 0 0 12 4.37c-1.04 0-2.1.14-3.1.42-2.3-1.56-3.3-1.22-3.3-1.22-.65 1.65-.24 2.88-.12 3.18A4.63 4.63 0 0 0 4.26 10c0 4.56 2.8 5.56 5.45 5.87.46.35.76 1.1.8 2.1V22" /><path d="M9 21.4c-3 .9-3.6-1.42-4.8-1.8" /></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><path d="M4 6V4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible')
        observer.unobserve(node)
      }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>{children}</div>
}

function MagneticLink({ children, className = '', ...props }) {
  const ref = useRef(null)
  const onMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const node = ref.current
    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12
    const y = (event.clientY - rect.top - rect.height / 2) * 0.12
    node.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = '' }
  return <a ref={ref} className={`magnetic ${className}`} onMouseMove={onMove} onMouseLeave={reset} {...props}>{children}</a>
}

function GlowingGrid() {
  const ref = useRef(null)
  const onMove = (event) => {
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    ref.current.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }
  return <div ref={ref} className="glowing-grid" onPointerMove={onMove} aria-hidden="true"><span /></div>
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = ['About', 'Work', 'Skills', 'Contact']
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 760) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="Vedant Patil, home"><span>V</span>RP.</a>
    <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}><Icon name={open ? 'close' : 'menu'} /></button>
    <nav id="site-navigation" className={open ? 'is-open' : ''} aria-label="Main navigation">
      {links.map((link, index) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}><small>0{index + 1}</small>{link}</a>)}
      <a className="nav-cta" href={contact.email} onClick={() => setOpen(false)}>Let's talk <Icon name="arrow" size={15} /></a>
    </nav>
  </header>
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  return <article className={`project-card ${project.accent}`}>
    <div className="project-topline"><span>{project.number}</span><span className="status-dot">{project.status}</span></div>
    <div className="project-main">
      <div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div id={`project-detail-${index}`} hidden={!expanded}>
          <p className="project-detail">{project.detail}</p>
        </div>
      </div>
      <button className="project-toggle" type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={`project-detail-${index}`}>
        <span>{expanded ? 'Less' : 'Details'}</span><Icon name="arrow" size={16} />
      </button>
    </div>
    <div className="project-footer"><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="project-type">Selected project</span></div>
  </article>
}

function ContactPanel() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('vedantpatil1108@gmail.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch { window.location.href = contact.email }
  }
  return <section id="contact" className="contact-section section-shell">
    <Reveal>
      <p className="eyebrow"><span>05</span> Contact</p>
      <h2>Have a challenge<br /><em>worth solving?</em></h2>
    </Reveal>
    <Reveal delay={110} className="contact-actions">
      <MagneticLink href={contact.email} className="contact-email">vedantpatil1108@gmail.com <Icon name="arrow" /></MagneticLink>
      <button className="copy-button" type="button" onClick={copyEmail} aria-live="polite"><Icon name="copy" />{copied ? 'Copied email' : 'Copy email'}</button>
      <div className="social-row">
        <a href={contact.github} target="_blank" rel="noreferrer" aria-label="Vedant Patil on GitHub"><Icon name="github" /></a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="Vedant Patil on LinkedIn"><Icon name="linkedin" /></a>
        <a href={contact.email} aria-label="Email Vedant Patil"><Icon name="mail" /></a>
      </div>
    </Reveal>
  </section>
}

export default function App() {
  return <>
    <a className="skip-link" href="#content">Skip to content</a>
    <Header />
    <main id="content">
      <section id="top" className="hero">
        <GlowingGrid />
        <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-content">
          <Reveal className="hero-meta" delay={50}><span className="pulse" /> Mumbai, India <span className="meta-divider">/</span> Building for impact</Reveal>
          <Reveal delay={130}><p className="hero-kicker">Computer Engineering student</p><h1>VEDANT<br /><span>R. PATIL</span></h1></Reveal>
          <Reveal className="hero-bottom" delay={240}>
            <p>Software / AI enthusiast focused on practical systems, intelligent detection, and thoughtfully engineered data.</p>
            <MagneticLink href="#work" className="scroll-link">Explore selected work <Icon name="arrow" /></MagneticLink>
          </Reveal>
        </div>
        <div className="hero-index" aria-hidden="true"><span>01</span><i /><span>05</span></div>
        <a className="scroll-cue" href="#about"><span>Scroll to explore</span><i /></a>
      </section>

      <section id="about" className="about-section section-shell">
        <Reveal><p className="eyebrow"><span>01</span> Profile</p></Reveal>
        <div className="about-grid">
          <Reveal delay={70}><h2>I turn complex<br />systems into <em>clear paths.</em></h2></Reveal>
          <Reveal delay={170} className="about-copy"><p>I'm Vedant, a Computer Engineering student at Veermata Jijabai Technological Institute (VJTI), Mumbai. I work across artificial intelligence, backend systems, and data architecture.</p><p>My projects range from secure healthcare records to behavioral cybersecurity detection and structured civic data.</p><a className="text-link" href="#contact">Start a conversation <Icon name="arrow" size={16} /></a></Reveal>
        </div>
        <Reveal delay={120} className="education-card"><span className="education-mark">VJ</span><div><p className="card-label">Education</p><h3>B.Tech · Computer Engineering</h3><p>Veermata Jijabai Technological Institute, Mumbai</p></div><span className="date">2024 — 2028</span></Reveal>
      </section>

      <section id="work" className="work-section section-shell">
        <Reveal><div className="section-heading"><p className="eyebrow"><span>02</span> Selected work</p><p className="heading-note">Systems that pair rigor with real-world utility.</p></div></Reveal>
        <div className="project-list">{projects.map((project, index) => <Reveal key={project.title} delay={index * 85}><ProjectCard project={project} index={index} /></Reveal>)}</div>
      </section>

      <section id="skills" className="skills-section section-shell">
        <Reveal><p className="eyebrow"><span>03</span> Toolkit</p><h2>Comfortable across<br /><em>the stack.</em></h2></Reveal>
        <div className="skills-grid">{skillGroups.map((group, index) => <Reveal key={group.label} delay={index * 70} className="skill-group"><p>{group.label}</p><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></Reveal>)}</div>
        <Reveal delay={130} className="coursework"><p className="card-label">Relevant coursework</p><span>Data Structures & Algorithms</span><span>Database Management Systems</span><span>Object-Oriented Programming</span><span>Operating Systems</span><span>Computer Networks</span><span>Software Engineering</span></Reveal>
      </section>

      <section className="certification-section section-shell">
        <Reveal><p className="eyebrow"><span>04</span> Certification</p></Reveal>
        <Reveal delay={100} className="certificate"><div className="certificate-glyph" aria-hidden="true">✦</div><div><p className="card-label">AICTE × Lenovo</p><h3>LEAP NextGen Scholar</h3><p>Generative AI & Agentic Systems Engineering</p></div><span className="verified">Certification</span></Reveal>
      </section>

      <ContactPanel />
    </main>
    <footer><span>© {new Date().getFullYear()} Vedant R. Patil</span><span>Designed for clarity, built for the web.</span></footer>
  </>
}
