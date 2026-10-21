import { useEffect, useRef, useState, useCallback } from 'react'
import ScrollFloat from './ScrollFloat'

/* ─── data ─────────────────────────────────────── */
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
      'An ongoing non-IoC compromise detection system for firewall, router, and host telemetry, developed for a national NTRO/NCIIPC cybersecurity hackathon.',
    detail:
      'SENTINEL-B identifies suspicious behaviour without depending on signatures or known indicators of compromise. It establishes behavioural baselines for individual entities and peer groups using Isolation Forest, ECOD, and sequence-based anomaly models. The system adds attack context through ATT&CK-aligned detectors for patterns such as beacon periodicity, DNS tunnelling signals, and credential-access lineage. Outputs are calibrated into statistically fused risk scores using extreme value theory-based p-values, keeping alerts useful and manageable for analysts.',
    highlights: [
      'Behavioural detection across host, network, and firewall/router telemetry',
      'ML anomaly modelling with Isolation Forest, ECOD & sequence models',
      'ATT&CK-aligned detection for beaconing, DNS tunnelling & credential access',
      'Risk scoring designed to reduce false-alert burden',
    ],
    tags: ['Python', 'Scikit-Learn', 'TensorFlow', 'Docker'],
    accent: 'violet',
    icon: '🛡',
    github: 'https://github.com/Vedant1108/Sentinel-B',
  },
  {
    number: '02',
    title: 'MedBlocks',
    status: '7-month team project',
    description:
      'A blockchain-enabled medical record management backend combining secure REST APIs, role-based access control, Ethereum, IPFS, and MariaDB.',
    detail:
      'MedBlocks is a secure backend for managing patient medical records in a healthcare setting. Built with FastAPI, it provides structured RESTful APIs to upload, retrieve, and manage records efficiently. The platform uses role-based access control for patients and healthcare professionals. IPFS handles decentralised file storage, while MariaDB stores structured metadata. Developed collaboratively as part of a multidisciplinary team working toward a secure, scalable healthcare platform.',
    highlights: [
      'RESTful APIs for patient medical-record workflows',
      'Role-Based Access Control for patients and healthcare professionals',
      'Decentralised document storage using IPFS',
      'Structured metadata management in MariaDB',
      'Blockchain-enabled approach using Ethereum',
    ],
    tags: ['FastAPI', 'MariaDB', 'Ethereum', 'IPFS'],
    accent: 'cyan',
    icon: '⛓',
    github: 'https://github.com/Vedant1108/Inheretance-backend',
  },
  {
    number: '03',
    title: 'CityPulse',
    status: '6-month independent project',
    description:
      'An independently designed relational database for a community issue-management platform supporting complaint registration, issue tracking, and reporting.',
    detail:
      'CityPulse is a normalized database system designed to organise and streamline civic issue reporting. It defines a structured, interconnected schema with strong normalization and referential integrity. SQL joins, views, triggers, stored procedures, aggregation queries, and indexing strategies automate common workflows while improving efficiency and data reliability.',
    highlights: [
      'Normalized relational database design with referential integrity',
      'Schema for complaint registration, tracking, and reporting',
      'SQL joins, views, triggers, stored procedures & aggregates',
      'ER diagrams and scalable database architecture',
      'Query optimization through indexing and schema design',
    ],
    tags: ['MariaDB', 'SQL', 'Database Design'],
    accent: 'lime',
    icon: '🏙',
    github: 'https://github.com/Vedant1108/CityPulse',
  },
]

const skillGroups = [
  { label: 'Languages', items: ['C++', 'Python', 'JavaScript', 'SQL'], color: 'cyan' },
  { label: 'Build with', items: ['FastAPI', 'TensorFlow', 'Scikit-Learn', 'OpenCV', 'Streamlit'], color: 'violet' },
  { label: 'Data & tools', items: ['MariaDB', 'MySQL', 'Git', 'Postman', 'Jupyter Notebook'], color: 'lime' },
  { label: 'Focus areas', items: ['AI', 'Machine Learning', 'Deep Learning', 'REST APIs', 'Blockchain'], color: 'pink' },
]

const entranceScores = [
  {
    label: 'State Engineering Entrance',
    score: '99.41',
    scale: 'Percentile',
    title: 'MHT CET',
    detail: 'State Common Entrance Test · Admission to VJTI Computer Engineering',
    period: 'Top 0.59% in Maharashtra',
    badge: 'State Merit',
    accent: 'amber',
    percent: 99.41,
  },
  {
    label: 'National Engineering Entrance',
    score: '97.98',
    scale: 'Percentile',
    title: 'JEE Main',
    detail: 'National Testing Agency (NTA) · Joint Entrance Examination',
    period: 'Top 2.02% All-India',
    badge: 'National Merit',
    accent: 'pink',
    percent: 98.98,
  },
]

const degreeScores = [
  {
    label: 'Undergraduate · B.Tech',
    score: '6.97',
    scale: '/ 10 CGPA',
    title: 'Current CGPA',
    detail: 'Veermata Jijabai Technological Institute (VJTI), Mumbai',
    period: '2024 — Present',
    badge: 'Ongoing',
    accent: 'cyan',
    percent: 69.7,
  },
  {
    label: 'Higher Secondary',
    score: '82.5%',
    scale: 'Board Exam',
    title: 'Class XII (12th)',
    detail: 'Higher Secondary Certificate (HSC) · Science Stream',
    period: 'Completed 2024',
    badge: 'Completed',
    accent: 'violet',
    percent: 82.5,
  },
  {
    label: 'Secondary School',
    score: '91.0%',
    scale: 'Board Exam',
    title: 'Class X (10th)',
    detail: 'Secondary School Certificate (SSC)',
    period: 'Completed 2022',
    badge: 'Completed',
    accent: 'lime',
    percent: 91.0,
  },
]

/* ─── icons ─────────────────────────────────────── */
function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    github: <><path d="M15 22v-3.9c.04-1 .34-1.75.8-2.1 2.65-.3 5.45-1.3 5.45-5.87 0-1.3-.46-2.36-1.22-3.2.12-.3.53-1.53-.12-3.18 0 0-1-.32-3.3 1.22A11.4 11.4 0 0 0 12 4.37c-1.04 0-2.1.14-3.1.42-2.3-1.56-3.3-1.22-3.3-1.22-.65 1.65-.24 2.88-.12 3.18A4.63 4.63 0 0 0 4.26 10c0 4.56 2.8 5.56 5.45 5.87.46.35.76 1.1.8 2.1V22" /><path d="M9 21.4c-3 .9-3.6-1.42-4.8-1.8" /></>,
    externalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><path d="M4 6V4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
    check: <><polyline points="20 6 9 17 4 12" /></>,
    fileText: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>,
    leetcode: (
      <path
        d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.818 5.861 5.861 0 0 0 3.023-.314 5.968 5.968 0 0 0 2.227-1.474l4.288-4.595a1.378 1.378 0 0 0 .113-1.898 1.378 1.378 0 0 0-1.898-.113l-4.288 4.595a3.216 3.216 0 0 1-1.201.794 3.109 3.109 0 0 1-1.603.166 3.193 3.193 0 0 1-2.596-2.057 3.09 3.09 0 0 1-.188-.548 3.037 3.037 0 0 1-.033-1.272 2.87 2.87 0 0 1 .653-1.135l3.854-4.126 5.406-5.788A1.374 1.374 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"
        fill="currentColor"
        stroke="none"
      />
    ),
  }
  return <svg {...common}>{paths[name]}</svg>
}

/* ─── Aurora background ──────────────────────────── */
function Aurora() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let t = 0
    let mouse = { x: 0.5, y: 0.3 }

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) / rect.width
      mouse.y = (e.clientY - rect.top) / rect.height
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)
      t += 0.003

      const blobs = [
        { cx: 0.25 + Math.sin(t * 0.7) * 0.12 + mouse.x * 0.08, cy: 0.3 + Math.cos(t * 0.5) * 0.1 + mouse.y * 0.06, r: 0.52, color: [129, 246, 229], a: 0.14 },
        { cx: 0.7 + Math.cos(t * 0.6) * 0.1 + mouse.x * 0.05, cy: 0.2 + Math.sin(t * 0.8) * 0.08 + mouse.y * 0.04, r: 0.42, color: [168, 163, 255], a: 0.11 },
        { cx: 0.5 + Math.sin(t * 0.4) * 0.15 + mouse.x * 0.06, cy: 0.55 + Math.cos(t * 0.9) * 0.1 + mouse.y * 0.03, r: 0.35, color: [217, 252, 129], a: 0.07 },
        { cx: 0.15 + Math.cos(t * 0.5) * 0.08, cy: 0.7 + Math.sin(t * 0.7) * 0.08, r: 0.28, color: [255, 140, 200], a: 0.06 },
      ]

      blobs.forEach(b => {
        const grad = ctx.createRadialGradient(b.cx * W, b.cy * H, 0, b.cx * W, b.cy * H, b.r * Math.max(W, H))
        grad.addColorStop(0, `rgba(${b.color.join(',')}, ${b.a})`)
        grad.addColorStop(0.5, `rgba(${b.color.join(',')}, ${b.a * 0.4})`)
        grad.addColorStop(1, `rgba(${b.color.join(',')}, 0)`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="aurora-canvas" aria-hidden="true" />
}

/* ─── Custom cursor ──────────────────────────────── */
function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    let raf
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(animate)
    }
    animate()

    const addHover = () => ringEl.classList.add('hovering')
    const removeHover = () => ringEl.classList.remove('hovering')
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

/* ─── Split text animation ───────────────────────── */
function SplitText({ text, className = '', delay = 0, stagger = 40, tag: Tag = 'span' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(node) }
    }, { threshold: 0.1 })
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="split-char"
          aria-hidden="true"
          style={{
            transitionDelay: visible ? `${delay + i * stagger}ms` : '0ms',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) rotateX(0deg)' : 'translateY(1.2em) rotateX(-90deg)',
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </Tag>
  )
}

/* ─── Shiny text ─────────────────────────────────── */
function ShinyText({ children, className = '' }) {
  return <span className={`shiny-text ${className}`}>{children}</span>
}

/* ─── Blur reveal ────────────────────────────────── */
function BlurReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(node) }
    }, { threshold: 0.08 })
    obs.observe(node)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`blur-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Tilt 3D card ───────────────────────────────── */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null)

  const onMove = useCallback((e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`
    const glare = el.querySelector('.tilt-glare')
    if (glare) {
      glare.style.opacity = '1'
      glare.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
    }
  }, [])

  const onLeave = useCallback(() => {
    const el = ref.current
    el.style.transform = ''
    const glare = el.querySelector('.tilt-glare')
    if (glare) glare.style.opacity = '0'
  }, [])

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="tilt-glare" aria-hidden="true" />
      {children}
    </div>
  )
}

/* ─── Magnetic link ──────────────────────────────── */
function MagneticLink({ children, className = '', ...props }) {
  const ref = useRef(null)
  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = '' }
  return <a ref={ref} className={`magnetic ${className}`} onMouseMove={onMove} onMouseLeave={reset} {...props}>{children}</a>
}

/* ─── Typewriter for subtitle ────────────────────── */
function Typewriter({ texts, speed = 60 }) {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) { const t = setTimeout(() => setPaused(false), 1800); return () => clearTimeout(t) }
    const current = texts[idx]
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2200)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIdx((idx + 1) % texts.length)
    }
  }, [displayed, deleting, idx, paused, texts, speed])

  return (
    <span className="typewriter" aria-live="polite">
      {displayed}<span className="caret" aria-hidden="true">|</span>
    </span>
  )
}

/* ─── Glowing grid (hero bg grid) ───────────────── */
function GlowingGrid() {
  const ref = useRef(null)
  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--px', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    ref.current.style.setProperty('--py', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }
  return <div ref={ref} className="glowing-grid" onPointerMove={onMove} aria-hidden="true"><span /></div>
}

/* ─── Header ─────────────────────────────────────── */
function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const links = ['About', 'Academics', 'Work', 'Skills', 'Contact']

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    const onResize = () => { if (window.innerWidth > 760) setOpen(false) }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Vedant Patil, home">
        <span className="brand-badge">VP</span>
        <span className="brand-name">Vedant.</span>
      </a>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
        <Icon name={open ? 'close' : 'menu'} />
      </button>
      <nav id="site-navigation" className={open ? 'is-open' : ''} aria-label="Main navigation">
        {links.map((link, i) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} className="nav-link">
            <small>0{i + 1}</small>{link}
          </a>
        ))}
        <a className="nav-cta" href={contact.email} onClick={() => setOpen(false)}>
          Let's talk <Icon name="arrow" size={15} />
        </a>
      </nav>
    </header>
  )
}

/* ─── Project card ───────────────────────────────── */
function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <BlurReveal delay={index * 100}>
      <TiltCard className={`project-card ${project.accent}`}>
        <div className="project-topline">
          <span className="project-num">{project.number}</span>
          <span className="status-dot">{project.status}</span>
        </div>
        <div className="project-main">
          <div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div id={`pd-${index}`} hidden={!expanded} className="project-extra">
              <p className="project-detail">{project.detail}</p>
              {project.highlights && (
                <ul className="project-highlights">
                  {project.highlights.map((h, i) => (
                    <li key={i}><span className="highlight-dot" aria-hidden="true">—</span>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button
            className="project-toggle"
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={`pd-${index}`}
          >
            <span>{expanded ? 'Less' : 'Details'}</span>
            <span className={`toggle-arrow ${expanded ? 'rotated' : ''}`}>
              <Icon name="arrow" size={16} />
            </span>
          </button>
        </div>
        <div className="project-footer">
          <div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>
          <div className="project-footer-right">
            <span className="project-type">Selected work</span>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={`project-github-btn project-github-btn--${project.accent}`}
                aria-label={`View ${project.title} on GitHub`}
              >
                <Icon name="github" size={15} />
                <span>View on GitHub</span>
                <Icon name="externalLink" size={13} />
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </BlurReveal>
  )
}

/* ─── Academic score card ────────────────────────── */
function AcademicCard({ item, index }) {
  return (
    <BlurReveal delay={index * 120}>
      <TiltCard className={`academic-score-card academic-score-card--${item.accent}`}>
        <div className="academic-card-top">
          <span className="card-label">{item.label}</span>
          <span className={`academic-badge academic-badge--${item.accent}`}>{item.badge}</span>
        </div>
        <div className="academic-card-score">
          <span className={`score-value score-value--${item.accent}`}>{item.score}</span>
          <span className="score-scale">{item.scale}</span>
        </div>
        <div className="academic-meter-track" aria-hidden="true">
          <div
            className={`academic-meter-fill academic-meter-fill--${item.accent}`}
            style={{ width: `${item.percent}%` }}
          />
        </div>
        <h3 className="academic-card-title">{item.title}</h3>
        <p className="academic-card-detail">{item.detail}</p>
        <span className="academic-card-period">{item.period}</span>
      </TiltCard>
    </BlurReveal>
  )
}

/* ─── Skill pill ─────────────────────────────────── */
function SkillPill({ item, color, index }) {
  return (
    <li
      className={`skill-pill skill-pill--${color}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {item}
    </li>
  )
}

/* ─── Contact panel ──────────────────────────────── */
function ContactPanel() {
  const [copied, setCopied] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      try {
        const ist = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date())
        setTime(ist)
      } catch {
        setTime('22:40')
      }
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('vedantpatil1108@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = contact.email
    }
  }

  return (
    <section id="contact" className="contact-section-wrapper">
      <div className="contact-grid-backdrop" aria-hidden="true" />
      <div className="contact-glow-orb" aria-hidden="true" />


      <div className="contact-inner-shell">
        <BlurReveal>
          <p className="contact-eyebrow">contact</p>
          <h2 className="contact-title">say hi.</h2>
          <p className="contact-lead">
            open to <span className="highlight-lead">internships</span> and interesting projects. email is the fastest way to reach me.
          </p>
        </BlurReveal>

        <BlurReveal delay={120}>
          <div className="contact-email-row">
            <span className="contact-mail-glyph" aria-hidden="true">
              <Icon name="mail" size={24} />
            </span>
            <a href={contact.email} className="contact-email-link">
              vedantpatil1108@gmail.com
            </a>
            <button
              type="button"
              className={`contact-copy-btn ${copied ? 'is-copied' : ''}`}
              onClick={copyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
            >
              <Icon name={copied ? 'check' : 'copy'} size={12} />
              <span>{copied ? 'copied' : 'copy'}</span>
            </button>
          </div>

          <div className="contact-social-row">
            <a href={contact.github} target="_blank" rel="noreferrer" className="contact-social-link">
              <Icon name="github" size={17} />
              <span>GitHub</span>
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="contact-social-link">
              <Icon name="linkedin" size={17} />
              <span>LinkedIn</span>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="contact-social-link">
              <Icon name="fileText" size={17} />
              <span>resume</span>
            </a>
          </div>
        </BlurReveal>

        {/* Bottom bar matching image */}
        <div className="contact-bottom-bar">
          <span className="contact-brand">VEDANT.</span>
          <span className="contact-meta-item">Mumbai &nbsp;·&nbsp; {time || '22:40'} IST</span>
          <div className="contact-center-meta">
            <a href="#top" className="contact-top-link">↑ top</a>
            <span className="contact-cursor-mode">cursor: target</span>
          </div>
          <span className="contact-copy-item">© {new Date().getFullYear()} Vedant Patil</span>
        </div>
      </div>
    </section>
  )
}

/* ─── App ────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <CustomCursor />
      <Header />

      <main id="content">
        {/* ── Hero ── */}
        <section id="top" className="hero">
          <Aurora />
          <GlowingGrid />
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="noise-overlay" aria-hidden="true" />

          <div className="hero-content">
            <BlurReveal className="hero-meta" delay={50}>
              <span className="pulse" />
              Mumbai, India
              <span className="meta-divider">/</span>
              Building for impact
            </BlurReveal>

            <BlurReveal delay={160}>
              <ShinyText className="hero-kicker">
                <Typewriter texts={['Computer Engineering student', 'AI & ML Enthusiast', 'Backend Systems Builder', 'Open to opportunities']} />
              </ShinyText>
            </BlurReveal>

            <div className="hero-name" aria-label="Vedant R. Patil">
              <SplitText text="VEDANT" tag="h1" className="hero-h1-line" delay={320} stagger={55} />
              <SplitText text="R. PATIL" tag="h1" className="hero-h1-line hero-h1-outline" delay={620} stagger={55} />
            </div>

            <BlurReveal className="hero-bottom" delay={900}>
              <p>Software / AI enthusiast focused on practical systems, intelligent detection, and thoughtfully engineered data.</p>
              <MagneticLink href="#work" className="scroll-link">
                Explore selected work <Icon name="arrow" />
              </MagneticLink>
            </BlurReveal>
          </div>

          <div className="hero-index" aria-hidden="true"><span>01</span><i /><span>06</span></div>
          <a className="scroll-cue" href="#about"><span>Scroll to explore</span><i /></a>
        </section>

        {/* ── About ── */}
        <section id="about" className="about-section section-shell">
          <BlurReveal><p className="eyebrow"><span>01</span> Profile</p></BlurReveal>
          <div className="about-grid">
            <BlurReveal delay={80}>
              <h2>I turn complex<br />systems into <em>clear paths.</em></h2>
            </BlurReveal>
            <BlurReveal delay={180} className="about-copy">
              <p>I’m Vedant R. Patil, a Computer Engineering student at Veermata Jijabai Technological Institute (VJTI), Mumbai, with a strong interest in software engineering, artificial intelligence, and data-driven systems.</p>
              <p>I enjoy building practical solutions for complex problems—from behavioural cybersecurity detection and blockchain-enabled healthcare records to scalable relational databases for civic platforms. I’m especially interested in creating secure, intelligent, and reliable technology that delivers real-world value.</p>
              <a className="text-link" href="#contact">Start a conversation <Icon name="arrow" size={16} /></a>
            </BlurReveal>
          </div>
        </section>

        {/* ── Academics ── */}
        <section id="academics" className="academics-section section-shell">
          <BlurReveal>
            <div className="section-heading">
              <div>
                <p className="eyebrow"><span>02</span> Academics</p>
                <ScrollFloat
                  effect="float"
                  splitBy="chars"
                  direction="up"
                  order="start"
                  fromColor="currentColor"
                  animationDuration={1}
                  ease="back.inOut(2)"
                  scrollStart="center bottom+=50%"
                  scrollEnd="bottom bottom-=40%"
                  stagger={0.03}
                  distance={120}
                  stretch={2.3}
                  smoothing={0}
                >
                  Academic Record
                </ScrollFloat>
              </div>
              <p className="heading-note">Performance across undergraduate engineering, higher secondary, and secondary education.</p>
            </div>
          </BlurReveal>

          <BlurReveal delay={120} className="education-card">
            <span className="education-mark">VJ</span>
            <div>
              <p className="card-label">Undergraduate Institution</p>
              <h3>B.Tech · Computer Engineering</h3>
              <p>Veermata Jijabai Technological Institute (VJTI), Mumbai</p>
            </div>
            <span className="date">2024 — 2028</span>
          </BlurReveal>

          <div className="academics-subgroup">
            <div className="academics-subheading">
              <span className="card-label">Competitive Entrance Examinations</span>
              <span className="subheading-tag">National &amp; State Level Merit</span>
            </div>
            <div className="academic-scores-grid academic-scores-grid--2col">
              {entranceScores.map((item, i) => (
                <AcademicCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>

          <div className="academics-subgroup">
            <div className="academics-subheading">
              <span className="card-label">Degree &amp; Board Qualifications</span>
              <span className="subheading-tag">School &amp; University Record</span>
            </div>
            <div className="academic-scores-grid academic-scores-grid--3col">
              {degreeScores.map((item, i) => (
                <AcademicCard key={item.title} item={item} index={i + 2} />
              ))}
            </div>
          </div>

          {/* ── Problem Solving & LeetCode ── */}
          <div className="academics-subgroup">
            <div className="academics-subheading">
              <span className="card-label">Problem Solving &amp; DSA</span>
              <span className="subheading-tag">Competitive Programming</span>
            </div>
            <BlurReveal delay={200}>
              <TiltCard className="leetcode-card">
                <div className="leetcode-card-left">
                  <div className="leetcode-icon-badge" aria-hidden="true">
                    <Icon name="leetcode" size={26} />
                  </div>
                  <div>
                    <span className="card-label">Algorithms &amp; Data Structures Practice</span>
                    <h3 className="leetcode-title">LeetCode Profile</h3>
                    <p className="leetcode-handle">
                      <span>VedantPatil11</span> &nbsp;·&nbsp; Active problem solving in C++ &amp; Python
                    </p>
                  </div>
                </div>
                <a
                  href="https://leetcode.com/u/VedantPatil11/"
                  target="_blank"
                  rel="noreferrer"
                  className="leetcode-link-btn"
                  aria-label="View Vedant Patil's LeetCode Profile on LeetCode"
                >
                  <span>View LeetCode Profile</span>
                  <Icon name="externalLink" size={14} />
                </a>
              </TiltCard>
            </BlurReveal>
          </div>
        </section>

        {/* ── Work ── */}
        <section id="work" className="work-section section-shell">
          <BlurReveal>
            <div className="section-heading">
              <p className="eyebrow"><span>03</span> Selected work</p>
              <p className="heading-note">Systems that pair rigor with real-world utility.</p>
            </div>
          </BlurReveal>
          <div className="project-list">
            {projects.map((project, i) => <ProjectCard key={project.title} project={project} index={i} />)}
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="skills-section section-shell">
          <BlurReveal>
            <p className="eyebrow"><span>04</span> Toolkit</p>
            <ScrollFloat
              effect="float"
              splitBy="chars"
              direction="up"
              order="start"
              fromColor="currentColor"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              distance={120}
              stretch={2.3}
              smoothing={0}
            >
              Comfortable across the stack.
            </ScrollFloat>
          </BlurReveal>
          <div className="skills-grid">
            {skillGroups.map((group, gi) => (
              <BlurReveal key={group.label} delay={gi * 80} className={`skill-group skill-group--${group.color}`}>
                <p className="skill-label">{group.label}</p>
                <ul className="skill-list">
                  {group.items.map((item, ii) => <SkillPill key={item} item={item} color={group.color} index={ii} />)}
                </ul>
              </BlurReveal>
            ))}
          </div>
          <BlurReveal delay={140} className="coursework">
            <p className="card-label">Relevant coursework</p>
            {['Data Structures & Algorithms', 'Database Management Systems', 'Object-Oriented Programming', 'Operating Systems', 'Computer Networks', 'Software Engineering'].map(c => (
              <span key={c}>{c}</span>
            ))}
          </BlurReveal>
        </section>

        {/* ── Certification ── */}
        <section className="certification-section section-shell">
          <BlurReveal><p className="eyebrow"><span>05</span> Certification</p></BlurReveal>
          <BlurReveal delay={100}>
            <TiltCard className="certificate">
              <div className="certificate-glyph" aria-hidden="true">✦</div>
              <div>
                <p className="card-label">AICTE × Lenovo</p>
                <h3>LEAP NextGen Scholar</h3>
                <p>Generative AI & Agentic Systems Engineering</p>
              </div>
              <span className="verified">Certification</span>
            </TiltCard>
          </BlurReveal>
        </section>

        <ContactPanel />
      </main>
    </>
  )
}
