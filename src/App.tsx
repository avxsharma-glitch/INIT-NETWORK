import { type ReactNode, useEffect, useRef, useState } from 'react';
import { AppStoreProvider } from '@/store/AppStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, ExternalLink, Menu, MoveUpRight, Plus, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { initData, externalLinks, type Exploration, type NetworkNode } from '@/data/init';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
gsap.registerPlugin(ScrollTrigger);

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const words = ['Build', 'Ship', 'Connect'];
  const [word, setWord] = useState(words[0]);

  useEffect(() => {
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - started) / 1100) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
      else window.setTimeout(() => setDone(true), 260);
    };
    frame = requestAnimationFrame(tick);
    const interval = window.setInterval(() => setWord((current) => words[(words.indexOf(current) + 1) % words.length]), 370);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className={`loading-screen ${done ? 'is-done' : ''}`} aria-label="Loading INIT Network">
      <div className="loading-screen__brand">INIT NETWORK / 001</div>
      <div className="loading-screen__word serif-italic">{word}</div>
      <div className="loading-screen__count">{String(progress).padStart(3, '0')}</div>
      <div className="loading-screen__bar"><div className="loading-screen__progress" style={{ transform: `scaleX(${progress / 100})` }} /></div>
    </div>
  );
}

function LogoMark() {
  return <span className="brand-lockup" aria-label="INIT"><span className="brand-mark">I</span><span className="brand-name">INIT</span></span>;
}

function InteractionLayer() {
  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    const cursor = document.querySelector<HTMLElement>('[data-cursor]');
    const cursorLabel = cursor?.querySelector<HTMLElement>('[data-cursor-label]');
    if (!cursor || !cursorLabel) return;

    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
    const onPointerMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const hoverTargets = Array.from(document.querySelectorAll<HTMLElement>('a, button, .build-card, .explore-tile, .network-node'));
    const glassTargets = Array.from(document.querySelectorAll<HTMLElement>('.glass-hover'));
    const onEnter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      cursorLabel.textContent = target.dataset.cursorLabel ?? (target.tagName === 'A' ? 'OPEN' : 'VIEW');
      cursor.classList.add('is-active');
      gsap.to(cursor, { scale: 1.45, duration: 0.28, ease: 'power3.out' });
    };
    const onLeave = () => {
      cursor.classList.remove('is-active');
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power3.out' });
    };
    const onGlassMove = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const pointer = event as PointerEvent;
      target.style.setProperty('--mx', `${pointer.clientX - rect.left}px`);
      target.style.setProperty('--my', `${pointer.clientY - rect.top}px`);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    hoverTargets.forEach((target) => {
      target.addEventListener('pointerenter', onEnter);
      target.addEventListener('pointerleave', onLeave);
    });
    glassTargets.forEach((target) => target.addEventListener('pointermove', onGlassMove, { passive: true }));

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      hoverTargets.forEach((target) => {
        target.removeEventListener('pointerenter', onEnter);
        target.removeEventListener('pointerleave', onLeave);
      });
      glassTargets.forEach((target) => target.removeEventListener('pointermove', onGlassMove));
      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <div className="cursor-fx" data-cursor aria-hidden="true">
      <span className="cursor-fx__ring" />
      <span className="cursor-fx__dot" />
      <span className="cursor-fx__label" data-cursor-label>MOVE</span>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Network', href: '#network' },
    { label: 'Builds', href: '#builds' },
    { label: 'Programs', href: '#programs' },
    { label: 'Team', href: '#team' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="nav-shell">
      <nav className={`nav-bar ${scrolled ? 'is-scrolled' : ''}`} aria-label="Primary navigation">
        <a className="magnetic" data-cursor-label="HOME" href="#home" aria-label="INIT Network home"><LogoMark /></a>
        <div className="nav-links">
          {navItems.map((item) => <a key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}</a>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a className="nav-join magnetic" data-cursor-label="JOIN" href={externalLinks.join} target="_blank" rel="noreferrer" data-testid="link-nav-join">Join INIT <MoveUpRight size={13} /></a>
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && <div className="mobile-menu">
          {navItems.map((item) => <a className="nav-menu-link" key={item.href} href={item.href} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase()}`}>{item.label}</a>)}
        </div>}
      </nav>
    </header>
  );
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => setRoleIndex((index) => (index + 1) % initData.roles.length), 2000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="container-wide hero-content">
        <div className="hero-eyebrow">THE BUILDERS NETWORK</div>
        <h1 id="hero-heading">Everyone wants to <span className="serif-italic">build something.</span><br />Few actually do.</h1>
        <p className="hero-description">For the ones who decide to start.</p>
        <div className="hero-role" aria-live="polite">For <strong key={initData.roles[roleIndex]}>{initData.roles[roleIndex]}.</strong></div>
        <div className="hero-actions">
          <a className="button-primary" href={externalLinks.join} target="_blank" rel="noreferrer" data-testid="link-hero-join">Join INIT <ArrowRight size={15} /></a>
          <a className="button-secondary" href="#network" data-testid="link-hero-explore">Find your people</a>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true">Scroll to enter</div>
      <div className="hero-bottom">
        <div className="container-wide status-strip" aria-label="INIT Network status">
          <div className="status-item"><span className="status-dot" /> INIT NETWORK / ONLINE</div>
          {initData.status.map((item) => <div className="status-item" key={item}>{item}</div>)}
          <div className="status-item">BUILDING <Check size={11} /></div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const signals = ['STUDENT-LED', 'CAMPUS CHAPTERS', 'OPEN SOURCE', 'INDUSTRY MENTORS', 'BUILD IN PUBLIC'];
  return (
    <section className="trust-strip" aria-label="INIT ecosystem signals">
      <div className="container-wide trust-strip__inner">
        <span className="trust-strip__lead">THE ECOSYSTEM</span>
        {signals.map((signal) => <span key={signal} className="trust-strip__item"><span className="status-dot" />{signal}</span>)}
      </div>
    </section>
  );
}

function Manifesto() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="section manifesto" aria-labelledby="manifesto-heading">
      <div ref={ref} className={`manifesto-copy reveal ${visible ? 'is-visible' : ''}`} id="manifesto-heading">
        <span>You have the idea.</span><br /> The ambition.<br /><em className="serif-italic">But building alone is hard.</em>
      </div>
    </section>
  );
}

function WhatIsInit() {
  return (
    <section className="section what-init" aria-labelledby="what-init-heading">
      <div className="container-wide">
        <div className="section-intro">
          <div><div className="section-label">03 / THE BELIEF</div><h2 className="section-title" id="what-init-heading">Start without<br /><em>permission.</em></h2></div>
          <p className="section-intro-copy">We believe you shouldn&apos;t wait for permission to start.</p>
        </div>
        <div className="what-init__grid">
          <div className="what-init__statement">The first move is yours. The next one is easier when someone is <em className="serif-italic">building beside you.</em></div>
          <div className="what-init__signals">
            {['Learn by doing', 'Find your people', 'Make the next thing'].map((signal, index) => (
              <div className="what-init__signal glass-hover" key={signal}><span>0{index + 1}</span><strong>{signal}</strong><p>{['Start with what you know.', 'Find the people who make you sharper.', 'Let the work create the next question.'][index]}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Network() {
  const [active, setActive] = useState<NetworkNode>(initData.networkNodes[0]);
  const lines = [
    [0, 6], [0, 1], [0, 5], [1, 2], [1, 6], [2, 3], [2, 7], [3, 4], [3, 7], [4, 5], [4, 7], [5, 6], [6, 7],
  ];
  return (
    <section className="section" id="network" aria-labelledby="network-heading">
      <div className="container-wide">
        <div className="section-intro">
          <div><div className="section-label">04 / INIT</div><h2 className="section-title" id="network-heading">INIT — a network<br /><em>for people who build.</em></h2></div>
          <p className="section-intro-copy">Find your people. Learn together. Build together.</p>
        </div>
        <div className="network-layout">
          <div className="network-copy">
            <h3>A network for people who build.</h3>
            <p>Not a feed. Not a club. A living system for people who turn ideas into something real.</p>
            <div className="network-active" aria-live="polite">
              <div className="network-active__label">Selected / {active.label}</div>
              <p>{active.detail}</p>
            </div>
          </div>
          <div className="network-canvas" role="img" aria-label="Interactive map of INIT builder disciplines">
            <svg className="network-lines" viewBox="0 0 100 100" aria-hidden="true">
              {lines.map(([from, to]) => {
                const source = initData.networkNodes[from];
                const target = initData.networkNodes[to];
                const isActive = source.id === active.id || target.id === active.id;
                return <line key={`${from}-${to}`} className={isActive ? 'is-active' : ''} x1={parseFloat(source.x)} y1={parseFloat(source.y)} x2={parseFloat(target.x)} y2={parseFloat(target.y)} />;
              })}
            </svg>
            <div className="network-core">INIT</div>
            {initData.networkNodes.map((node) => <button key={node.id} className={`network-node ${active.id === node.id ? 'is-active' : ''}`} style={{ left: node.x, top: node.y }} onClick={() => setActive(node)} aria-label={`Explore ${node.label}`} data-testid={`button-network-${node.id}`}><span>{node.label}</span></button>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapters() {
  return (
    <section className="section chapters-section" id="chapters" aria-labelledby="chapters-heading">
      <div className="container-wide">
        <div className="section-intro">
          <div><div className="section-label">08 / CHAPTERS</div><h2 className="section-title" id="chapters-heading">From one builder<br /><em>to a network.</em></h2></div>
          <p className="section-intro-copy">One builder becomes a team. One team becomes a campus. One campus becomes a network.</p>
        </div>
        <div className="chapters-grid">
          {initData.chapters.map((chapter, index) => <article className="chapter-card glass-hover" key={chapter.code}>
            <div className="chapter-card__top"><span>0{index + 1}</span><span>{chapter.code}</span></div>
            <h3>{chapter.city}</h3>
            <p>{chapter.detail}</p>
            <a className="chapter-card__link magnetic" href={externalLinks.chapter} target="_blank" rel="noreferrer" data-cursor-label="CHAPTER">Explore <ArrowRight size={13} /></a>
          </article>)}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="section team-section" id="team" aria-labelledby="team-heading">
      <div className="container-wide">
        <div className="team-section__heading">
          <div><div className="section-label">06 / THE TEAM</div><h2 className="section-title" id="team-heading">Meet the builders<br /><em>behind INIT.</em></h2></div>
          <p className="section-intro-copy">The people turning a shared instinct into a living network.</p>
        </div>
        <div className="team-grid">
          {initData.team.map((member, index) => <article className="team-card glass-hover" key={member.role}>
            <div className="team-card__portrait"><span>0{index + 1}</span><div className="team-card__signal" /></div>
            <div className="team-card__role">{member.role}</div>
            <h3>{member.name}</h3>
            <p>{member.detail}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}

function Builds() {
  return (
    <section className="section" id="builds" aria-labelledby="builds-heading">
      <div className="container-wide">
        <div className="section-intro">
          <div><div className="section-label">07 / BUILDS</div><h2 className="section-title" id="builds-heading">Ideas become projects.<br /><em>Projects become products.</em></h2></div>
          <p className="section-intro-copy">The work gets better when it leaves the notebook and meets the world.</p>
        </div>
        <div className="builds-grid">
          {initData.projects.map((project, index) => <article className="build-card glass-hover" data-cursor-label="OPEN" key={project.title} data-testid={`card-project-${index}`}>
            <div className={`build-visual ${project.visual}`} aria-hidden="true" />
            <div className="build-card__content">
              <div className="build-card__meta"><span>{project.contributors}</span><span className="build-card__status">{project.status}</span></div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="build-card__tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            </div>
          </article>)}
        </div>
        <Terminal />
      </div>
    </section>
  );
}

function Terminal() {
  const [started, setStarted] = useState(false);
  const output = ['initializing network...', 'loading builders...', 'connecting campuses...', 'creating opportunities...', 'ready.'];
  return (
    <div className="terminal-wrap">
      <div className="terminal-intro">
        <div className="section-label">A SMALL BRAND INTERACTION</div>
        <h3>Start something that wasn&apos;t there before.</h3>
        <p>There is no perfect time to begin. There is only the first command.</p>
      </div>
      <div className="terminal" aria-label="INIT terminal interaction">
        <div className="terminal__top"><span /><span /><span /></div>
        <div className="terminal__prompt">$ init start</div>
        <div className="terminal__line">&nbsp;</div>
        {started ? output.map((line, index) => <div className="terminal__line" key={line} style={{ opacity: index < 4 ? 0.72 : 1 }}><strong>{line}</strong></div>) : <div className="terminal__line">waiting for input<span className="terminal__cursor" /></div>}
        {started && <div className="terminal__prompt" style={{ marginTop: 12 }}>&gt; START BUILDING</div>}
        {!started && <button className="terminal__action" onClick={() => setStarted(true)} data-testid="button-terminal-start">Run init start <ArrowRight size={12} /></button>}
      </div>
    </div>
  );
}

function Programs() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section" id="programs" aria-labelledby="programs-heading">
      <div className="container-wide">
        <div className="section-intro">
          <div><div className="section-label">09 / OPPORTUNITIES</div><h2 className="section-title" id="programs-heading">Build. Lead.<br /><em>Contribute.</em></h2></div>
          <p className="section-intro-copy">Build. Lead. Contribute. Start a chapter.</p>
        </div>
        <div className="program-grid">
          {initData.programs.map((program, index) => <article className={`program-card glass-hover ${open === index ? 'is-open' : ''}`} key={program.number}>
            <div className="program-number">{program.number}</div>
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <button className="program-expand" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} data-testid={`button-program-${index}`}><span>{open === index ? 'Close' : 'Explore'}</span>{open === index ? <X size={13} /> : <Plus size={13} />}</button>
            {open === index && <div className="program-detail">{program.detail}</div>}
          </article>)}
        </div>
      </div>
    </section>
  );
}

function Community() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="section community" aria-labelledby="community-heading">
      <div className="container-wide">
        <div className="community-layout">
          <div className="community-statement">
            <div className="section-label">08 / COMMUNITY</div>
            <h2 className="section-title" id="community-heading">One builder<br /><em>becomes a team.</em></h2>
            <p>One team becomes a campus. One campus becomes a network. The next point starts with someone deciding to show up.</p>
          </div>
          <div ref={ref} className={`collage reveal ${visible ? 'is-visible' : ''}`} aria-label="Abstract community collage">
            {['Late night lab', 'Field notes', 'Open questions', 'Demo day', 'Ship log', 'New signal'].map((label) => <div className="collage-tile" key={label}><span className="collage-label">{label}</span></div>)}
          </div>
        </div>
        <div className="stats-row" aria-label="INIT Network metrics">
          {initData.stats.map((stat) => <div className="stat" key={stat.label}><div className="stat-value" data-testid={`stat-${stat.label.toLowerCase()}`}>{stat.value}</div><div className="stat-label">{stat.label}</div></div>)}
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section className="section events-section" id="events" aria-labelledby="events-heading">
      <div className="container-wide">
        <div className="section-intro">
          <div><div className="section-label">09 / OPPORTUNITIES</div><h2 className="section-title" id="events-heading">There is always<br /><em>a way in.</em></h2></div>
          <p className="section-intro-copy">Show up, take a turn, and make the next thing easier for someone else.</p>
        </div>
        <div className="events-list">
          {initData.events.map((event, index) => <article className="event-row glass-hover" key={event.title}>
            <span className="event-row__index">0{index + 1}</span>
            <span className="event-row__date">{event.date}</span>
            <div><h3>{event.title}</h3><p>{event.detail}</p></div>
            <span className="event-row__type">{event.type}</span>
            <ArrowRight size={16} className="event-row__arrow" />
          </article>)}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="partners-section" id="partners" aria-labelledby="partners-heading">
      <div className="container-wide">
        <div className="partners-section__label"><span className="section-label">09 / OPPORTUNITIES</span><h2 id="partners-heading">Build with<br /><em>good company.</em></h2></div>
        <div className="partners-list" aria-label="INIT ecosystem partners">
          {initData.partners.map((partner, index) => <span className="partner-pill glass-hover" key={partner}><span>0{index + 1}</span>{partner}</span>)}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section className="section impact-section" id="impact" aria-labelledby="impact-heading">
      <div className="container-wide">
        <div className="section-intro">
          <div><div className="section-label">09 / OPPORTUNITIES</div><h2 className="section-title" id="impact-heading">The signal<br /><em>keeps growing.</em></h2></div>
          <p className="section-intro-copy">Every number starts with a builder who decided to contribute.</p>
        </div>
        <div className="stats-row impact-stats" aria-label="INIT Network impact metrics">
          {initData.stats.map((stat) => <div className="stat glass-hover" key={stat.label}><div className="stat-value" data-testid={`impact-stat-${stat.label.toLowerCase()}`}>{stat.value}</div><div className="stat-label">{stat.label}</div></div>)}
        </div>
      </div>
    </section>
  );
}

function JoinTeam() {
  return (
    <section className="section positions-section" id="positions" aria-labelledby="positions-heading">
      <div className="container-wide">
        <div className="section-intro">
          <div><div className="section-label">09 / OPPORTUNITIES</div><h2 className="section-title" id="positions-heading">Start a chapter.<br /><em>Lead the room.</em></h2></div>
          <p className="section-intro-copy">Build. Lead. Contribute. Start a chapter.</p>
        </div>
        <div className="positions-list">
          {initData.positions.map((position, index) => <a className="position-row glass-hover" href={externalLinks.join} target="_blank" rel="noreferrer" key={position.title} data-cursor-label="APPLY">
            <span className="position-row__number">0{index + 1}</span>
            <div><h3>{position.title}</h3><p>{position.detail}</p></div>
            <span className="position-row__type">{position.type}</span>
            <ArrowRight size={16} />
          </a>)}
        </div>
      </div>
    </section>
  );
}

function WhyInit() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="section" aria-labelledby="why-heading">
      <div className="container-wide">
        <div className="section-label">05 / THE DIFFERENCE</div>
        <h2 className="section-title" id="why-heading">The work gets<br /><em>better together.</em></h2>
        <div ref={ref} className={`why-grid reveal ${visible ? 'is-visible' : ''}`}>
          {initData.why.map((item, index) => <article className="why-item" key={item.title}><div className="why-item__index">0{index + 1}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function Explorations({ onOpen }: { onOpen: (item: Exploration, index: number) => void }) {
  return (
    <section className="section explorations" id="explorations" aria-labelledby="explore-heading">
      <div className="container-wide explore-sticky">
        <h2 className="explore-heading" id="explore-heading">This is where<br />ideas get <em className="serif-italic">weird.</em></h2>
        <div className="explore-tiles">
          {initData.explorations.map((item, index) => <button className="explore-tile glass-hover" data-cursor-label="ZOOM" key={item.title} onClick={() => onOpen(item, index)} aria-label={`Open exploration: ${item.title}`} data-testid={`button-exploration-${index}`}><span className="explore-tile__index">0{index + 1}</span></button>)}
        </div>
      </div>
    </section>
  );
}

function Lightbox({ item, index, onClose }: { item: Exploration; index: number; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="lightbox__inner">
      <div className="lightbox__visual" style={{ filter: `hue-rotate(${index * 24}deg)` }} />
      <button className="lightbox__close" onClick={onClose} aria-label="Close exploration" data-testid="button-lightbox-close"><X size={17} /></button>
      <div className="lightbox__caption"><div><h3>{item.title}</h3><p>{item.description}</p></div><span className="mono" style={{ fontSize: 10, color: 'rgba(219,234,248,.6)' }}>EXPERIMENT / 0{index + 1}</span></div>
    </div>
  </div>;
}

function Join() {
  return (
    <section className="section join-section" aria-labelledby="join-heading">
      <div className="container-wide">
        <div className="section-label">10 / FINAL CTA</div>
        <h2 id="join-heading">What will<br /><em>you build?</em></h2>
        <p>INIT isn&apos;t something you join. It&apos;s something you build.</p>
        <div className="join-actions">
          <a className="button-primary" href={externalLinks.join} target="_blank" rel="noreferrer" data-testid="link-join-primary">Join INIT <ArrowRight size={15} /></a>
          <a className="button-secondary" href={externalLinks.chapter} target="_blank" rel="noreferrer" data-testid="link-join-chapter">Start a chapter <ExternalLink size={13} /></a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [{ label: 'Network', href: '#network' }, { label: 'Builds', href: '#builds' }, { label: 'Programs', href: '#programs' }, { label: 'Team', href: '#team' }, { label: 'Chapters', href: externalLinks.chapter }, { label: 'Join', href: externalLinks.join }];
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-top">
          <div className="footer-brand-wrap"><div className="footer-brand">INIT</div><p className="footer-tagline">A network for people who build.</p></div>
          <div><div className="footer-heading">Navigate</div><div className="footer-links">{footerLinks.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined} data-testid={`link-footer-${link.label.toLowerCase()}`}>{link.label} {link.href.startsWith('http') && <ExternalLink size={10} />}</a>)}</div></div>
          <div><div className="footer-heading">Find the signal</div><div className="footer-status"><span className="online-dot" /> NETWORK ONLINE</div><div className="footer-links" style={{ marginTop: 21 }}>{initData.socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" data-testid={`link-social-${social.label.toLowerCase()}`}>{social.label} <ExternalLink size={10} /></a>)}</div></div>
        </div>
        <div className="footer-bottom"><span>© 2026 INIT Network</span><span>Built by builders.</span><span>init() / 001</span></div>
      </div>
    </footer>
  );
}

function Home() {
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!shell || prefersReducedMotion) return;

    const cleanupFns: Array<() => void> = [];
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.hero-eyebrow', { opacity: 0, y: 18, filter: 'blur(8px)', duration: 0.8 })
        .from('.hero h1', { opacity: 0, y: 52, duration: 1.05 }, '-=0.46')
        .from(['.hero-description', '.hero-role', '.hero-actions'], { opacity: 0, y: 22, stagger: 0.08, duration: 0.65 }, '-=0.5')
        .from('.status-strip', { opacity: 0, y: 18, duration: 0.7 }, '-=0.25');

      gsap.to('.hero-orbit', {
        rotation: 12,
        scale: 1.04,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.utils.toArray<HTMLElement>('.section-intro, .terminal-wrap, .why-item, .join-section .container-wide').forEach((element) => {
        gsap.fromTo(element,
          { opacity: 0, y: 34, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 84%', once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('.magnetic').forEach((element) => {
        const xTo = gsap.quickTo(element, 'x', { duration: 0.35, ease: 'power3.out' });
        const yTo = gsap.quickTo(element, 'y', { duration: 0.35, ease: 'power3.out' });
        const onMove = (event: Event) => {
          const pointer = event as PointerEvent;
          const rect = element.getBoundingClientRect();
          xTo((pointer.clientX - rect.left - rect.width / 2) * 0.16);
          yTo((pointer.clientY - rect.top - rect.height / 2) * 0.16);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        element.addEventListener('pointermove', onMove, { passive: true });
        element.addEventListener('pointerleave', onLeave);
        cleanupFns.push(() => {
          element.removeEventListener('pointermove', onMove);
          element.removeEventListener('pointerleave', onLeave);
        });
      });
    }, shell);

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <div ref={shellRef} className="site-shell noise">
      <InteractionLayer />
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <WhatIsInit />
        <Network />
        <TrustStrip />
        <Team />
        <Builds />
        <Chapters />
        <Community />
        <Programs />
        <Events />
        <Partners />
        <Impact />
        <JoinTeam />
        <div className="marquee-wrap" aria-label="Build, ship, learn, connect, lead"><div className="marquee">{Array.from({ length: 2 }, (_, group) => <span key={group}>BUILD <b>•</b> SHIP <b>•</b> LEARN <b>•</b> CONNECT <b>•</b> LEAD <b>•</b>&nbsp;</span>)}</div></div>
        <Join />
      </main>
      <Footer />
    </div>
  );
}

import { DashboardShell } from "@/pages/dashboard/shell";
import { DashboardOverview } from "@/pages/dashboard/overview";
import { DiscoverPage } from "@/pages/dashboard/discover";
import { BuildersPage, BuilderDetailPage } from "@/pages/dashboard/builders";
import { ProjectsPage, ProjectDetailPage } from "@/pages/dashboard/projects";
import { TeamsPage, TeamDetailPage } from "@/pages/dashboard/teams";
import { ShowcasePage } from "@/pages/dashboard/showcase";
import { ProfilePage } from "@/pages/dashboard/profile";

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/app" nested>
          <DashboardShell>
            <Switch>
              <Route path="/" component={DashboardOverview} />
              <Route path="/discover" component={DiscoverPage} />
              <Route path="/builders/:id" component={BuilderDetailPage} />
              <Route path="/builders" component={BuildersPage} />
              <Route path="/projects/:id" component={ProjectDetailPage} />
              <Route path="/projects" component={ProjectsPage} />
              <Route path="/teams/:id" component={TeamDetailPage} />
              <Route path="/teams" component={TeamsPage} />
              <Route path="/showcase" component={ShowcasePage} />
              <Route path="/profile" component={ProfilePage} />
              <Route>
                <div className="flex h-[50vh] items-center justify-center text-[#878787] font-mono text-sm">
                  PAGE NOT FOUND
                </div>
              </Route>
            </Switch>
          </DashboardShell>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}


function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStoreProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AppStoreProvider>
    </QueryClientProvider>
  );
}

export default App;