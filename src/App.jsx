import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Mail, Menu, X, ChevronDown,
  Play, Pause, Copy, Check, Mic2, Music2, Activity, ArrowUpRight,
  Plus, Sparkles, Film, Video,
} from 'lucide-react';

// lucide-react dropped brand icons — inline SVG replacements
const Instagram = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

/* ================================================================
   FADING ECHOES — Live Band Portfolio & Booking Site
   ----------------------------------------------------------------
   Stack:  React 18+  ·  Tailwind CSS  ·  Framer Motion  ·  Lucide

   EVERYTHING EDITABLE LIVES IN ONE PLACE: the BAND_DATA object below.
   - Member photos ......... set a member's `imagePath`
   - Setlist tracks ........ BAND_DATA.tracks
   - YouTube embeds ........ set a video's `videoId`
   - Reel embeds ........... set a reel's `reelUrl`
   - Live video clips ...... set a clip's `src`
   - Contact / social links  BAND_DATA.socials
   Nothing else in the file needs to change to update content.
   ================================================================ */

// ---------------------------------------------------------------
// BAND LOGO — the official profile picture, embedded as a data URI
// so this file works the moment you drop it into a project. For a
// production build, swap this for a normal asset import instead:
//   import bandLogo from './assets/fading-echoes-logo.jpg';
// ---------------------------------------------------------------
const BAND_LOGO = "/logo.png";
// ---------------------------------------------------------------
// BAND_DATA — the single config object. Edit this, not the JSX below.
// ---------------------------------------------------------------
const BAND_DATA = {
  socials: {
    email: 'alexdanielthegreat12345@gmail.com',
    instagramHandle: '@fading_echoes69',
    instagramUrl: 'https://instagram.com/fading_echoes69',
    youtubeUrl: 'https://www.youtube.com/@ProjectFadingEchoes',
  },

  members: [
    { name: 'Alex', role: 'Vocalist', icon: 'mic', handle: '@alexdaniel_64', instagramUrl: 'https://instagram.com/alexdaniel_64', imagePath: '/alex.jpg' },
    { name: 'Naman', role: 'Vocalist', icon: 'mic', handle: '@shandilya_naman_', instagramUrl: 'https://instagram.com/shandilya_naman_', imagePath: '/naman.jpg' },
    { name: 'Priyanshu', role: 'Lead Guitarist', icon: 'guitar', handle: '@pieee.py', instagramUrl: 'https://instagram.com/pieee.py', imagePath: '/priyanshu.jpg' },
    { name: 'Suryansh', role: 'Electric Guitarist', icon: 'guitar', handle: '@not.suryansht', instagramUrl: 'https://instagram.com/not.suryansht', imagePath: '/suryansh.jpg' },
    { name: 'Devansh', role: 'Guitarist', icon: 'guitar', handle: '@devansh_yadav22', instagramUrl: 'https://instagram.com/devansh_yadav22', imagePath: '/devansh.jpg' },
    { name: 'Krish', role: 'Drummer', icon: 'drum', handle: '@just4krish', instagramUrl: 'https://instagram.com/just4krish', imagePath: '/krish.jpg' },
  ],
  // TODO: point `imagePath` at a real photo (e.g. './photos/alex.jpg')
  // to replace a member's generated initial-avatar.

  tracks: [
    {
      number: '01',
      title: 'Tere Liye',
      type: 'Epic Mashup',
      description:
        'A cinematic mashup built around "Tere Liye", layered with driving rock guitars and a full live-band arrangement.',
      duration: '4:32',
    },
    {
      number: '02',
      title: 'Echoes Rising',
      type: 'Original Verse',
      description:
        'An original verse woven straight into our live set — unreleased, unfiltered, entirely ours.',
      duration: '3:15',
    },
    // TODO: copy the shape above to add more tracks.
  ],

  youtubeItems: [
    { title: 'Tere Liye — Live Mashup', tag: 'Live Performance', videoId: null },
    { title: 'Bollywood Cover Session', tag: 'Studio Session', videoId: null },
    { title: 'Full Show Highlights', tag: 'Event Recap', videoId: null },
  ],
  // TODO: set `videoId` to the 11-char YouTube ID to embed a real video.

  reelItems: [
    { caption: 'Backstage, right before doors open', reelUrl: null },
    { caption: 'The crowd on this mashup drop', reelUrl: null },
    { caption: 'Original verse — first listen', reelUrl: null },
  ],
  // TODO: set `reelUrl` to the full instagram.com/reel/... link to embed it.

  videoClips: [
    { title: 'Tere Liye — Full Live Set', src: null, poster: null, duration: '4:32' },
    { title: 'Backstage Energy', src: null, poster: null, duration: '1:45' },
    { title: 'Crowd Goes Wild — Rock Medley', src: null, poster: null, duration: '3:10' },
  ],
  // TODO: set `src` to a video file path (e.g. '/videos/live-set.mp4') to enable playback.

  eventTypes: ['Weddings', 'College Fests', 'Corporate Events', 'Private Parties'],
};

// ---------------------------------------------------------------
// GLOBAL STYLE — fonts, keyframes, hover classes (kept out of Tailwind
// so nothing here depends on a JIT build step)
// ---------------------------------------------------------------

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    .fe-root { font-family: 'Inter', system-ui, sans-serif; background: #08090c; }
    .fe-display { font-family: 'Bebas Neue', 'Inter', sans-serif; }
    .fe-mono { font-family: 'JetBrains Mono', monospace; }

    .fe-metal {
      background: linear-gradient(100deg, #6b7280 0%, #e4e7ec 20%, #f8fafc 32%, #c8cdd6 45%, #6b7280 60%, #e4e7ec 80%, #9ca3af 100%);
      background-size: 250% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: fe-metal-shine 7s linear infinite;
    }
    @keyframes fe-metal-shine {
      0% { background-position: 0% center; }
      100% { background-position: -250% center; }
    }

    @keyframes fe-float-up {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      12% { opacity: .85; }
      88% { opacity: .3; }
      100% { transform: translateY(-115vh) scale(.35); opacity: 0; }
    }

    @keyframes fe-pulse-glow {
      0%, 100% { box-shadow: 0 0 18px 0 rgba(34,211,238,.55), 0 0 40px 0 rgba(34,211,238,.2); }
      50% { box-shadow: 0 0 32px 6px rgba(34,211,238,.75), 0 0 70px 10px rgba(34,211,238,.3); }
    }

    @keyframes fe-flicker {
      0%, 91%, 100% { opacity: 0; }
      92% { opacity: .9; }
      93% { opacity: .1; }
      94.5% { opacity: 1; }
      96% { opacity: 0; }
    }

    @keyframes fe-echo-ping {
      0% { transform: scale(.55); opacity: .55; }
      100% { transform: scale(2.6); opacity: 0; }
    }

    .fe-card {
      transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease, border-color .35s ease;
    }
    .fe-card:hover {
      transform: translateY(-8px);
      border-color: #22d3ee;
      box-shadow: 0 24px 48px -18px rgba(0,0,0,.7), 0 0 0 1px rgba(34,211,238,.35), 0 0 34px rgba(34,211,238,.22);
    }
    .fe-card:hover .fe-avatar-inner { transform: scale(1.06); }

    /* energy-dust hover burst on member cards */
    .fe-dust-dot {
      position: absolute;
      width: 4px; height: 4px;
      border-radius: 9999px;
      background: #67e8f9;
      opacity: 0;
      transform: translate(0,0) scale(.3);
      box-shadow: 0 0 6px 2px rgba(103,232,249,.85);
      transition: transform .6s cubic-bezier(.2,.8,.2,1), opacity .6s ease;
      pointer-events: none;
      z-index: 5;
    }
    .fe-card:hover .fe-dust-dot {
      opacity: 1;
      transform: translate(var(--dx), var(--dy)) scale(1);
    }

    .fe-member-img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform .5s ease;
    }
    .fe-card:hover .fe-member-img { transform: scale(1.06); }

    .fe-iframe-container { position: relative; width: 100%; }
    .fe-iframe-container iframe {
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%;
      border: none; border-radius: 0;
    }

    .fe-video-card video { width: 100%; height: 100%; object-fit: cover; border-radius: 0; }
    .fe-video-card { position: relative; cursor: pointer; }
    .fe-video-overlay {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(0,0,0,0.35);
      transition: opacity .3s ease;
    }
    .fe-video-card:hover .fe-video-overlay { opacity: .7; }
    .fe-video-card.is-playing .fe-video-overlay { opacity: 0; }
    .fe-video-card.is-playing:hover .fe-video-overlay { opacity: 1; }

    .fe-clip-scroll {
      display: flex; gap: 1.5rem;
      overflow-x: auto; scroll-snap-type: x mandatory;
      -ms-overflow-style: none; scrollbar-width: none;
    }
    .fe-clip-scroll::-webkit-scrollbar { display: none; }
    .fe-clip-scroll > * { scroll-snap-align: start; flex-shrink: 0; }
    @media (min-width: 768px) {
      .fe-clip-scroll { display: grid; grid-template-columns: repeat(3, 1fr); overflow: visible; }
      .fe-clip-scroll > * { flex-shrink: unset; }
    }

    /* setlist audio visualizer */
    .fe-eq-bar {
      width: 3px; height: 100%;
      background: linear-gradient(to top, #0891b2, #67e8f9);
      border-radius: 2px;
      transform-origin: bottom;
      animation: fe-eq-bounce .9s ease-in-out infinite;
      animation-play-state: paused;
    }
    @keyframes fe-eq-bounce {
      0%, 100% { transform: scaleY(.22); }
      25% { transform: scaleY(1); }
      50% { transform: scaleY(.4); }
      75% { transform: scaleY(.8); }
    }

    /* media card glitch-on-hover */
    .fe-media-card { transition: transform .4s ease, box-shadow .4s ease; }
    .fe-media-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px -16px rgba(0,0,0,.7), 0 0 24px rgba(34,211,238,.18);
    }
    .fe-media-card:hover .fe-play-icon { transform: scale(1.15); }
    .fe-media-card:hover .fe-media-zoom { transform: scale(1.08); }
    .fe-media-zoom { transition: transform .5s ease; }
    @keyframes fe-glitch {
      0% { transform: translate(0,0); filter: none; }
      20% { transform: translate(-3px,1px); filter: hue-rotate(20deg); }
      40% { transform: translate(3px,-1px); filter: hue-rotate(-15deg); }
      60% { transform: translate(-2px,2px); filter: none; }
      80% { transform: translate(2px,-2px); filter: hue-rotate(10deg); }
      100% { transform: translate(0,0); filter: none; }
    }
    .fe-media-card:hover .fe-glitch-layer { animation: fe-glitch .4s steps(2, jump-end) 1; }
    .fe-glitch-shard {
      position: absolute; inset: 0;
      opacity: 0;
      mix-blend-mode: screen;
      background: linear-gradient(90deg, rgba(34,211,238,.35), transparent 40%, rgba(244,63,94,.22) 70%);
      transition: opacity .15s ease;
      pointer-events: none;
    }
    .fe-media-card:hover .fe-glitch-shard { opacity: 1; }

    /* full-viewport lightning flash */
    .fe-flash {
      position: fixed; inset: 0; z-index: 30;
      background: #cffafe;
      opacity: 0;
      pointer-events: none;
      transition: opacity 120ms ease-out;
    }
    .fe-flash.is-active { opacity: .06; }

    .fe-glow-btn { animation: fe-pulse-glow 2.6s ease-in-out infinite; }

    .fe-underline { position: relative; }
    .fe-underline::after {
      content: '';
      position: absolute;
      left: 0; bottom: -4px;
      width: 100%; height: 1px;
      background: #22d3ee;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .3s ease;
    }
    .fe-underline:hover::after { transform: scaleX(1); }

    .fe-focus:focus-visible { outline: 2px solid #22d3ee; outline-offset: 3px; }

    @media (prefers-reduced-motion: reduce) {
      .fe-metal, .fe-particle, .fe-bolt, .fe-echo-ring, .fe-glow-btn, .fe-eq-bar, .fe-flash {
        animation: none !important;
      }
      .fe-card, .fe-media-card, .fe-dust-dot, .fe-glitch-layer { transition: none !important; }
      .fe-media-card:hover .fe-glitch-layer { animation: none !important; }
    }
  `}</style>
);

// ---------------------------------------------------------------
// SMALL SHARED PIECES
// ---------------------------------------------------------------

const Eyebrow = ({ children }) => (
  <div className="fe-mono flex items-center gap-3 text-cyan-400 text-xs sm:text-sm tracking-widest uppercase mb-4">
    <span className="h-px w-8 bg-cyan-400" />
    {children}
  </div>
);

const LogoBadge = ({ className = 'w-8 h-8' }) => (
  <img
    src={BAND_LOGO}
    alt="Fading Echoes"
    className={`${className} rounded-full object-cover shrink-0`}
    style={{ border: '1px solid rgba(34,211,238,0.5)' }}
  />
);

const RoleIcon = ({ icon, className }) => {
  const Map = { mic: Mic2, guitar: Music2, drum: Activity };
  const Cmp = Map[icon] || Music2;
  return <Cmp className={className} />;
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ---------------------------------------------------------------
// STORM BACKGROUND — full-screen animated sky, fixed behind every
// section. Particle count and pointer parallax scale down on small
// screens so it stays battery-friendly on mobile.
// ---------------------------------------------------------------

const BOLT_POSITIONS = [
  { top: '10%', left: '6%', width: 42, fill: '#22d3ee', dur: '9s', delay: '1.2s' },
  { top: '62%', left: '90%', width: 34, fill: '#67e8f9', dur: '11s', delay: '4s' },
  { top: '78%', left: '10%', width: 30, fill: '#22d3ee', dur: '13s', delay: '2.5s' },
  { top: '18%', left: '82%', width: 38, fill: '#67e8f9', dur: '10s', delay: '6s' },
];

const LightningFlash = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timeout;
    const scheduleFlash = () => {
      const wait = 8000 + Math.random() * 9000; // 8–17s between strikes
      timeout = setTimeout(() => {
        setActive(true);
        setTimeout(() => setActive(false), 140);
        scheduleFlash();
      }, wait);
    };
    scheduleFlash();
    return () => clearTimeout(timeout);
  }, []);

  return <div className={`fe-flash${active ? ' is-active' : ''}`} />;
};

const StormBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const boltLayerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return; // skip pointer parallax on small/touch screens
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = boltLayerRef.current;
        if (el) {
          const x = (e.clientX / window.innerWidth - 0.5) * 14;
          const y = (e.clientY / window.innerHeight - 0.5) * 14;
          el.style.transform = `translate(${x}px, ${y}px)`;
        }
        raf = null;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  const particles = useMemo(() => {
    const count = isMobile ? 7 : 20;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.round(Math.random() * 100),
      size: Math.round(Math.random() * 3 + 1),
      duration: Math.round(Math.random() * 8 + 10),
      delay: Math.round(Math.random() * 100) / 10,
    }));
  }, [isMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* stormy-sky mesh gradient — cheap, no particles needed for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 22% 12%, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0) 60%), radial-gradient(55% 45% at 82% 88%, rgba(59,130,246,0.09) 0%, rgba(59,130,246,0) 60%), linear-gradient(180deg, #0a0b0f 0%, #08090c 45%, #0a0c10 100%)',
        }}
      />

      {/* energy dust — count halved on mobile for battery */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="fe-particle absolute rounded-full"
            style={{
              left: `${p.left}%`,
              bottom: '-10%',
              width: p.size,
              height: p.size,
              background: '#67e8f9',
              boxShadow: '0 0 6px 1px rgba(103,232,249,0.75)',
              animation: `fe-float-up ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* reacting lightning — drifts gently toward the cursor */}
      <div ref={boltLayerRef} style={{ transition: 'transform .3s ease-out' }}>
        {BOLT_POSITIONS.map((b, i) => (
          <svg
            key={i}
            className="fe-bolt absolute opacity-0"
            style={{ top: b.top, left: b.left, width: b.width, animation: `fe-flicker ${b.dur} ease-in-out infinite`, animationDelay: b.delay }}
            viewBox="0 0 60 200"
          >
            <path d="M35 0 L10 95 L28 95 L15 200 L55 80 L34 80 Z" fill={b.fill} />
          </svg>
        ))}
      </div>

      <LightningFlash />
    </div>
  );
};

// ---------------------------------------------------------------
// NAV
// ---------------------------------------------------------------

const NAV_LINKS = [
  { label: 'Band', id: 'band' },
  { label: 'Setlist', id: 'setlist' },
  { label: 'Media', id: 'media' },
  { label: 'Contact', id: 'contact' },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(8,9,12,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(148,163,184,0.15)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <button onClick={() => go('home')} className="flex items-center gap-2.5 fe-focus rounded">
            <LogoBadge className="w-8 h-8" />
            <span className="fe-display text-xl tracking-wide text-zinc-100">FADING ECHOES</span>
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="fe-underline fe-focus fe-mono text-sm tracking-widest uppercase text-zinc-300 hover:text-cyan-400 transition-colors rounded"
              >
                {l.label}
              </button>
            ))}
            <motion.button
              onClick={() => go('contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="fe-focus px-5 py-2.5 rounded-full bg-cyan-400 text-black font-bold text-sm tracking-wide"
            >
              Book Us
            </motion.button>
          </nav>

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-zinc-100 fe-focus rounded" aria-label="Open menu">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden flex flex-col"
            style={{ background: 'rgba(6,7,10,0.98)' }}
          >
            <div className="flex justify-between items-center px-6 h-20">
              <div className="flex items-center gap-2.5">
                <LogoBadge className="w-8 h-8" />
                <span className="fe-display text-xl text-zinc-100">FADING ECHOES</span>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-zinc-100 fe-focus rounded" aria-label="Close menu">
                <X className="w-7 h-7" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => go(l.id)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="fe-display text-4xl text-zinc-100 hover:text-cyan-400 transition-colors fe-focus rounded"
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => go('contact')}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 px-8 py-3 rounded-full bg-cyan-400 text-black font-bold fe-focus"
              >
                Book Us Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ---------------------------------------------------------------
// HERO
// ---------------------------------------------------------------

const Hero = () => {
  const layerRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = layerRef.current;
    if (!el) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 20;
    const y = (e.clientY / innerHeight - 0.5) * 20;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ scrollMarginTop: '0px' }}
    >
      {/* echo rings behind the emblem */}
      <div ref={layerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transition: 'transform .3s ease-out' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="fe-echo-ring absolute rounded-full border"
            style={{ width: 220, height: 220, borderColor: 'rgba(34,211,238,0.35)', animation: 'fe-echo-ping 5s ease-out infinite', animationDelay: `${i * 1.6}s` }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
      >
        <div
          className="relative mb-7 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden fe-glow-btn"
          style={{ border: '2px solid rgba(34,211,238,0.6)' }}
        >
          <img src={BAND_LOGO} alt="Fading Echoes emblem" className="w-full h-full object-cover" />
        </div>

        <div className="fe-mono flex items-center gap-2 text-cyan-400 text-xs sm:text-sm tracking-[0.4em] uppercase mb-6">
          <Sparkles className="w-4 h-4" />
          Live &nbsp;·&nbsp; Original &nbsp;·&nbsp; Unforgettable
        </div>

        <h1 className="fe-display fe-metal text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-wide">
          FADING ECHOES
        </h1>

        <p
          className="fe-display text-2xl sm:text-3xl md:text-4xl tracking-wide text-cyan-300 mt-5"
          style={{ textShadow: '0 0 24px rgba(34,211,238,0.45)' }}
        >
          VERSATILE SOUND. UNFORGETTABLE ENERGY.
        </p>

        <p className="mt-4 text-zinc-300 text-base sm:text-lg font-medium tracking-wide">
          Bollywood <span className="text-cyan-400">•</span> English{' '}
          <span className="text-cyan-400">•</span> Western{' '}
          <span className="text-cyan-400">•</span> Rock{' '}
          <span className="text-cyan-400">•</span> Pop
        </p>

        <motion.button
          onClick={() => scrollToSection('contact')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fe-glow-btn fe-focus mt-10 inline-flex items-center gap-2 px-9 py-4 rounded-full bg-cyan-400 text-black font-bold text-base tracking-wide"
        >
          <Zap className="w-5 h-5" />
          Book Us Now
        </motion.button>
      </motion.div>

      <motion.button
        onClick={() => scrollToSection('band')}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-zinc-500 hover:text-cyan-400 transition-colors fe-focus rounded"
        aria-label="Scroll down"
      >
        <span className="fe-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
};

// ---------------------------------------------------------------
// BAND MEMBERS
// ---------------------------------------------------------------

const DUST_OFFSETS = [
  { top: '10%', left: '8%', dx: '-24px', dy: '-20px' },
  { top: '15%', left: '85%', dx: '26px', dy: '-18px' },
  { top: '50%', left: '2%', dx: '-30px', dy: '4px' },
  { top: '48%', left: '95%', dx: '30px', dy: '2px' },
  { top: '85%', left: '12%', dx: '-22px', dy: '22px' },
  { top: '88%', left: '82%', dx: '24px', dy: '24px' },
];

const MemberCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="fe-card relative rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
  >
    {DUST_OFFSETS.map((d, i) => (
      <span key={i} className="fe-dust-dot" style={{ top: d.top, left: d.left, '--dx': d.dx, '--dy': d.dy }} />
    ))}

    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '4 / 3', background: 'linear-gradient(160deg, #18181b 0%, #0c0d10 100%)' }}
    >
      {member.imagePath ? (
        <img src={member.imagePath} alt={`${member.name} — ${member.role}`} className="fe-member-img" loading="lazy" />
      ) : (
        <div className="fe-avatar-inner w-full h-full flex items-center justify-center" style={{ transition: 'transform .5s ease' }}>
          <RoleIcon icon={member.icon} className="absolute w-24 h-24 text-zinc-800" />
          <span className="fe-display fe-metal text-7xl relative z-10">{member.name.charAt(0)}</span>
        </div>
      )}
      <div
        className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center border border-cyan-400 z-20"
        style={{ background: 'rgba(8,9,12,0.8)' }}
      >
        <RoleIcon icon={member.icon} className="w-4 h-4 text-cyan-400" />
      </div>
    </div>

    <div className="p-5 relative z-10">
      <h3 className="fe-display text-2xl tracking-wide text-zinc-100">{member.name}</h3>
      <p className="fe-mono text-xs tracking-widest uppercase text-cyan-400 mt-1">{member.role}</p>
      <a
        href={member.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fe-focus mt-4 inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-200 transition-colors text-sm rounded"
      >
        <Instagram className="w-4 h-4" />
        {member.handle}
      </a>
    </div>
  </motion.div>
);

const Band = () => (
  <section id="band" className="relative py-24 md:py-32 px-6" style={{ scrollMarginTop: '80px' }}>
    <div className="max-w-7xl mx-auto">
      <Eyebrow>The Lineup</Eyebrow>
      <h2 className="fe-display text-4xl sm:text-5xl md:text-6xl text-zinc-100 tracking-wide mb-14 max-w-2xl">
        Six voices. <span className="fe-metal">One storm.</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BAND_DATA.members.map((m, i) => (
          <MemberCard key={m.name} member={m} index={i} />
        ))}
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------
// SETLIST
// ---------------------------------------------------------------

const AudioVisualizer = ({ active }) => (
  <div className="flex items-end gap-0.5 h-5 w-6 shrink-0" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <span
        key={i}
        className="fe-eq-bar"
        style={{ animationPlayState: active ? 'running' : 'paused', animationDelay: `${i * 0.11}s` }}
      />
    ))}
  </div>
);

const TrackItem = ({ track, isOpen, onToggle }) => (
  <div className="fe-card border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900">
    <button onClick={onToggle} className="fe-focus w-full flex items-center gap-4 sm:gap-6 p-5 sm:p-6 text-left">
      <span className="fe-mono text-cyan-400 text-sm sm:text-base w-7 shrink-0">{track.number}</span>
      <div className="flex-1 min-w-0">
        <h3 className="fe-display text-2xl sm:text-3xl tracking-wide text-zinc-100 truncate">{track.title}</h3>
        <span className="fe-mono text-[11px] sm:text-xs tracking-widest uppercase text-zinc-500">{track.type}</span>
      </div>
      <AudioVisualizer active={isOpen} />
      <span className="fe-mono hidden sm:block text-zinc-500 text-sm">{track.duration}</span>
      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
        <ChevronDown className="w-5 h-5 text-zinc-500" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="px-5 sm:px-6 pb-6 pl-16 sm:pl-16 text-zinc-400 text-sm sm:text-base max-w-2xl">
            {track.description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Setlist = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="setlist" className="relative py-24 md:py-32 px-6" style={{ scrollMarginTop: '80px' }}>
      <div className="max-w-4xl mx-auto">
        <Eyebrow>The Setlist</Eyebrow>
        <h2 className="fe-display text-4xl sm:text-5xl md:text-6xl text-zinc-100 tracking-wide mb-14 max-w-2xl">
          Mashups. Originals. <span className="fe-metal">No filler.</span>
        </h2>

        <div className="flex flex-col gap-4">
          {BAND_DATA.tracks.map((t, i) => (
            <TrackItem key={t.number} track={t} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
          ))}

          <div className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-xl border border-dashed border-zinc-700 text-zinc-600">
            <Plus className="w-5 h-5 shrink-0" />
            <span className="fe-mono text-xs sm:text-sm tracking-widest uppercase">Add your next track here</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------
// MEDIA GALLERY
// ---------------------------------------------------------------

const YouTubeCard = ({ item }) => (
  <div className="fe-media-card relative rounded-xl overflow-hidden border border-zinc-800 mb-6 break-inside-avoid">
    {item.videoId ? (
      <div className="fe-iframe-container" style={{ aspectRatio: '16 / 9' }}>
        <iframe
          src={`https://www.youtube.com/embed/${item.videoId}?rel=0&modestbranding=1`}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ) : (
      <div
        className="fe-media-zoom fe-glitch-layer relative flex items-center justify-center"
        style={{ aspectRatio: '16 / 9', background: 'linear-gradient(160deg, #1c1f26 0%, #0a0b0e 100%)' }}
      >
        <span className="fe-glitch-shard" />
        <div
          className="fe-play-icon w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.5)', transition: 'transform .35s ease' }}
        >
          <Play className="w-6 h-6 text-cyan-400 ml-0.5" fill="#22d3ee" />
        </div>
      </div>
    )}
    <div className="absolute top-0 left-0 right-0 p-3 flex items-start z-10 pointer-events-none">
      <span
        className="fe-mono flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-zinc-300 px-2.5 py-1 rounded-full"
        style={{ background: 'rgba(8,9,12,0.7)' }}
      >
        <Youtube className="w-3 h-3" /> {item.tag}
      </span>
    </div>
    <div className="absolute inset-x-0 bottom-0 p-4 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
      <p className="text-zinc-100 font-semibold text-sm">{item.title}</p>
    </div>
  </div>
);

const ReelCard = ({ item }) => (
  <div className="fe-media-card relative rounded-xl overflow-hidden border border-zinc-800 mb-6 break-inside-avoid">
    {item.reelUrl ? (
      <div className="fe-iframe-container" style={{ aspectRatio: '9 / 16' }}>
        <iframe src={`${item.reelUrl}embed`} title={item.caption} allowFullScreen scrolling="no" />
      </div>
    ) : (
      <div
        className="fe-media-zoom fe-glitch-layer relative flex items-center justify-center"
        style={{ aspectRatio: '9 / 16', background: 'linear-gradient(200deg, #1c1f26 0%, #0a0b0e 100%)' }}
      >
        <span className="fe-glitch-shard" />
        <div
          className="fe-play-icon w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.5)', transition: 'transform .35s ease' }}
        >
          <Instagram className="w-5 h-5 text-cyan-400" />
        </div>
      </div>
    )}
    <div className="absolute top-0 left-0 p-3 z-10 pointer-events-none">
      <span className="fe-mono text-[10px] tracking-widest uppercase text-zinc-300 px-2.5 py-1 rounded-full" style={{ background: 'rgba(8,9,12,0.7)' }}>
        Reel
      </span>
    </div>
    <div className="absolute inset-x-0 bottom-0 p-4 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
      <p className="text-zinc-100 font-medium text-xs">{item.caption}</p>
    </div>
  </div>
);

const VideoClipCard = ({ clip, index }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`fe-video-card fe-media-card rounded-xl overflow-hidden border border-zinc-800${playing ? ' is-playing' : ''}`}
      style={{ width: '100%', minWidth: 280 }}
      onClick={toggle}
    >
      <div className="relative" style={{ aspectRatio: '16 / 9' }}>
        {clip.src ? (
          <video
            ref={videoRef}
            src={clip.src}
            poster={clip.poster || undefined}
            preload="metadata"
            playsInline
            onEnded={() => setPlaying(false)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(160deg, #1c1f26 0%, #0a0b0e 100%)' }}>
            <Film className="w-12 h-12 text-zinc-800" />
          </div>
        )}

        <div className="fe-video-overlay">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.5)' }}>
            {playing ? <Pause className="w-6 h-6 text-cyan-400" /> : <Play className="w-6 h-6 text-cyan-400 ml-0.5" fill="#22d3ee" />}
          </div>
        </div>

        <span className="fe-mono absolute top-3 right-3 text-[10px] tracking-widest text-zinc-300 px-2.5 py-1 rounded-full z-10" style={{ background: 'rgba(8,9,12,0.7)' }}>
          {clip.duration}
        </span>
        <span className="fe-mono absolute top-3 left-3 flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-zinc-300 px-2.5 py-1 rounded-full z-10" style={{ background: 'rgba(8,9,12,0.7)' }}>
          <Video className="w-3 h-3" /> Clip
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
          <p className="text-zinc-100 font-semibold text-sm">{clip.title}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Media = () => (
  <section id="media" className="relative py-24 md:py-32 px-6" style={{ scrollMarginTop: '80px' }}>
    <div className="max-w-6xl mx-auto">
      <Eyebrow>On Stage, On Screen</Eyebrow>
      <h2 className="fe-display text-4xl sm:text-5xl md:text-6xl text-zinc-100 tracking-wide mb-14 max-w-2xl">
        Watch. Follow. <span className="fe-metal">Repeat.</span>
      </h2>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        <YouTubeCard item={BAND_DATA.youtubeItems[0]} />
        <ReelCard item={BAND_DATA.reelItems[0]} />
        <YouTubeCard item={BAND_DATA.youtubeItems[1]} />
        <ReelCard item={BAND_DATA.reelItems[1]} />
        <YouTubeCard item={BAND_DATA.youtubeItems[2]} />
        <ReelCard item={BAND_DATA.reelItems[2]} />
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <a
          href={BAND_DATA.socials.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fe-focus inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-200 hover:border-cyan-400 hover:text-cyan-400 transition-colors text-sm font-medium"
        >
          <Youtube className="w-4 h-4" /> Watch on YouTube
        </a>
        <a
          href={BAND_DATA.socials.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fe-focus inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-200 hover:border-cyan-400 hover:text-cyan-400 transition-colors text-sm font-medium"
        >
          <Instagram className="w-4 h-4" /> Follow on Instagram
        </a>
      </div>

      <div className="mt-20">
        <Eyebrow>Live Clips</Eyebrow>
        <h3 className="fe-display text-3xl sm:text-4xl text-zinc-100 tracking-wide mb-8">
          Straight from the <span className="fe-metal">stage.</span>
        </h3>
        <div className="fe-clip-scroll">
          {BAND_DATA.videoClips.map((clip, i) => (
            <VideoClipCard key={clip.title} clip={clip} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------
// CONTACT
// ---------------------------------------------------------------

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BAND_DATA.socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // clipboard not available — mailto link still works as fallback
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6" style={{ scrollMarginTop: '80px' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(50% 40% at 50% 0%, rgba(34,211,238,0.08) 0%, rgba(34,211,238,0) 70%)' }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Book The Storm</Eyebrow>
            <h2 className="fe-display text-4xl sm:text-5xl md:text-6xl text-zinc-100 tracking-wide leading-tight">
              Ready to <span className="fe-metal">electrify</span> your event?
            </h2>
            <p className="mt-6 text-zinc-400 text-base sm:text-lg max-w-lg">
              Book Fading Echoes for a live set that moves between Bollywood, rock, and everything in
              between — high energy, start to finish.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {BAND_DATA.eventTypes.map((t) => (
                <span key={t} className="fe-mono text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-zinc-700 text-zinc-400">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href={`mailto:${BAND_DATA.socials.email}`}
                className="fe-focus inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-cyan-400 text-black font-bold text-sm tracking-wide"
              >
                <Mail className="w-4 h-4" /> Email Us
              </a>
              <a
                href={BAND_DATA.socials.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fe-focus inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-zinc-700 text-zinc-100 hover:border-cyan-400 hover:text-cyan-400 transition-colors font-semibold text-sm tracking-wide"
              >
                <Instagram className="w-4 h-4" /> DM on Instagram
              </a>
            </div>

            <button onClick={handleCopy} className="fe-focus mt-5 inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm rounded">
              {copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Email copied' : BAND_DATA.socials.email}
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex rounded-2xl overflow-hidden border border-zinc-800"
            style={{ background: 'linear-gradient(160deg, #16181d 0%, #0a0b0e 100%)' }}
          >
            <div className="flex-1 p-8 sm:p-10">
              <div className="flex items-center gap-2.5 mb-6">
                <LogoBadge className="w-8 h-8" />
                <span className="fe-mono text-xs tracking-widest uppercase text-cyan-400">All Access</span>
              </div>
              <h3 className="fe-display fe-metal text-4xl sm:text-5xl tracking-wide mb-4">FADING ECHOES</h3>
              <p className="text-zinc-400 text-sm mb-6">Bollywood · English · Western · Rock · Pop</p>
              <div className="flex flex-wrap gap-2">
                {['LIVE', '6-PIECE BAND', 'MULTI-GENRE'].map((tag) => (
                  <span key={tag} className="fe-mono text-[10px] tracking-widest px-2.5 py-1 rounded border border-zinc-700 text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative w-20 sm:w-24 flex items-center justify-center shrink-0" style={{ borderLeft: '2px dashed rgba(148,163,184,0.25)' }}>
              <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full" style={{ background: '#08090c' }} />
              <span className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full" style={{ background: '#08090c' }} />
              <span className="fe-display fe-metal text-lg tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                BOOK THE STORM
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------

const Footer = () => (
  <footer className="relative border-t border-zinc-900 px-6 py-10">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2.5">
        <LogoBadge className="w-7 h-7" />
        <span className="fe-display text-lg tracking-wide text-zinc-300">FADING ECHOES</span>
      </div>
      <div className="flex items-center gap-6">
        <a href={`mailto:${BAND_DATA.socials.email}`} className="fe-focus text-zinc-500 hover:text-cyan-400 transition-colors rounded" aria-label="Email">
          <Mail className="w-5 h-5" />
        </a>
        <a href={BAND_DATA.socials.instagramUrl} target="_blank" rel="noopener noreferrer" className="fe-focus text-zinc-500 hover:text-cyan-400 transition-colors rounded" aria-label="Instagram">
          <Instagram className="w-5 h-5" />
        </a>
        <a href={BAND_DATA.socials.youtubeUrl} target="_blank" rel="noopener noreferrer" className="fe-focus text-zinc-500 hover:text-cyan-400 transition-colors rounded" aria-label="YouTube">
          <Youtube className="w-5 h-5" />
        </a>
      </div>
      <p className="fe-mono text-[11px] tracking-widest uppercase text-zinc-600">Live &amp; Loud</p>
    </div>
  </footer>
);

// ---------------------------------------------------------------
// APP
// ---------------------------------------------------------------

export default function FadingEchoesPortfolio() {
  return (
    <div className="fe-root min-h-screen text-zinc-100">
      <GlobalStyle />
      <StormBackground />

      {/* subtle film-grain overlay for cinematic depth */}
      <div
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          opacity: 0.035,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative" style={{ zIndex: 10 }}>
        <Nav />
        <main>
          <Hero />
          <Band />
          <Setlist />
          <Media />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
