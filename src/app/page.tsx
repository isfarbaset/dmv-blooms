'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  ExternalLink,
  Share2,
  Menu,
  X,
} from 'lucide-react';
import ZoomParallax from '@/components/ui/zoom-parallax';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import {
  BLOOMS,
  LOCATIONS,
  MONTHS,
  getBloomStatus,
  getStatusLabel,
  getStatusColor,
  getLocationStatus,
} from '@/lib/data';
import type { Bloom, BloomStatus } from '@/lib/data';

/* ============================================================
   SHARED ANIMATION WRAPPER
   ============================================================ */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   PETAL CONFIG (deterministic to avoid hydration mismatch)
   ============================================================ */
const PETAL_CONFIG = [
  { left: '8%', w: 10, dur: '11s', del: '0s' },
  { left: '15%', w: 14, dur: '16s', del: '3s' },
  { left: '25%', w: 8, dur: '9s', del: '1s' },
  { left: '35%', w: 12, dur: '13s', del: '5s' },
  { left: '42%', w: 10, dur: '18s', del: '8s' },
  { left: '55%', w: 9, dur: '12s', del: '2s' },
  { left: '63%', w: 14, dur: '15s', del: '6s' },
  { left: '72%', w: 7, dur: '10s', del: '4s' },
  { left: '80%', w: 11, dur: '14s', del: '7s' },
  { left: '88%', w: 13, dur: '17s', del: '1s' },
  { left: '95%', w: 8, dur: '11s', del: '9s' },
  { left: '50%', w: 10, dur: '19s', del: '3s' },
];

/* ============================================================
   NAVIGATION
   ============================================================ */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#in-season', label: 'In Season' },
    { href: '#weekend', label: 'This Weekend' },
    { href: '#guide', label: 'Guide' },
    { href: '#destinations', label: 'Destinations' },
    { href: '#calendar', label: 'Calendar' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between transition-all duration-500 border-b ${
        scrolled
          ? 'bg-background/92 backdrop-blur-xl border-foreground/10'
          : 'bg-transparent border-transparent'
      }`}
      style={{ padding: '0 clamp(1.5rem, 4vw, 3rem)' }}
    >
      <a
        href="#top"
        className={`serif text-xl font-normal tracking-wide transition-colors duration-400 ${
          scrolled ? 'text-foreground' : 'text-white'
        }`}
      >
        DMV Blooms
      </a>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`text-[0.78rem] font-normal tracking-[0.06em] uppercase transition-colors relative group ${
              scrolled
                ? 'text-foreground/60 hover:text-foreground'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-300" />
          </a>
        ))}
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden relative z-[60]"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu
            className={`w-5 h-5 ${scrolled ? 'text-foreground' : 'text-white'}`}
          />
        )}
      </button>

      {/* Mobile overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-foreground/95 flex flex-col items-center justify-center gap-8 z-[55]"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white text-sm tracking-[0.1em] uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

/* ============================================================
   HERO (scroll-to-expand)
   ============================================================ */
function HeroContent() {
  const activeBlooms = BLOOMS.filter((b) => {
    const s = getBloomStatus(b);
    return s === 'peak' || s === 'blooming' || s === 'ending';
  });

  const cherryBlossom = BLOOMS[0];

  return (
    <div className="max-w-5xl mx-auto text-foreground">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-wide uppercase border border-sage/30 text-sage bg-sage-light/50">
            <MapPin className="w-3.5 h-3.5" />
            {getStatusLabel(getBloomStatus(cherryBlossom))}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-foreground/50 tracking-wide uppercase">
            {cherryBlossom.season}
          </span>
        </div>
        <h2 className="serif text-4xl md:text-5xl font-light tracking-tight mb-6">
          A Seasonal Guide to the DMV
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-foreground/70 serif italic font-light max-w-3xl">
          From the iconic cherry blossoms of the Tidal Basin to hidden bluebell
          forests in Virginia, the DC metropolitan area is home to an
          extraordinary diversity of seasonal flowers. This guide tracks{' '}
          <strong className="text-foreground font-normal">
            {activeBlooms.length > 0
              ? `${activeBlooms.length} flower${activeBlooms.length !== 1 ? 's' : ''} currently in bloom`
              : '12 flower species'}
          </strong>{' '}
          across 20 locations — updated for each season so you never miss a
          peak.
        </p>
      </div>

      {/* Quick stats */}
      <div className="border-t border-foreground/10 pt-10">
        <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/40 mb-8">
          What&apos;s Blooming Now
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeBlooms.length > 0 ? (
            activeBlooms.slice(0, 6).map((bloom) => {
              const status = getBloomStatus(bloom);
              return (
                <div
                  key={bloom.name}
                  className="group p-6 border border-foreground/10 hover:border-sage/40 transition-colors duration-300 bg-background/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="serif text-xl font-normal">
                      {bloom.name}
                    </h4>
                    <span
                      className={`text-[0.62rem] tracking-wide uppercase px-2 py-0.5 ${getStatusColor(status)}`}
                    >
                      {getStatusLabel(status)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {bloom.description}
                  </p>
                  <div className="mt-3 text-xs text-foreground/40">
                    {bloom.season}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="serif italic text-foreground/50 text-lg col-span-3">
              No flowers are actively blooming right now. Scroll down to explore
              the full calendar and plan your visit.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MARQUEE
   ============================================================ */
function MarqueeSection() {
  const names = BLOOMS.map((b) => b.name);
  const doubled = [...names, ...names];

  return (
    <div className="py-5 border-t border-b border-foreground/10 overflow-hidden bg-background">
      <div className="flex w-max animate-marquee">
        {doubled.map((name, i) => (
          <span
            key={i}
            className="serif text-lg font-light text-foreground/50 whitespace-nowrap px-8 flex items-center gap-8"
          >
            {name}
            <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   ABOUT / INTRO SECTION
   ============================================================ */
function AboutSection() {
  const activeBlooms = BLOOMS.filter((b) => {
    const s = getBloomStatus(b);
    return s === 'peak' || s === 'blooming' || s === 'ending';
  });

  return (
    <section
      className="max-w-[1400px] mx-auto"
      id="about"
      style={{ padding: 'clamp(80px,12vw,160px) clamp(1.5rem,4vw,3rem)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Text */}
        <div>
          <Reveal>
            <span className="text-[0.68rem] font-medium tracking-[0.2em] uppercase text-sage block mb-4">
              About the Guide
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="serif font-light tracking-tight mb-6"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                lineHeight: '1.1',
              }}
            >
              Where to find the{' '}
              <em className="italic text-accent">most beautiful</em> blooms in
              the DMV
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[0.95rem] text-foreground/60 leading-[1.8] mb-5">
              From the iconic cherry blossoms of the Tidal Basin to hidden
              bluebell forests in Virginia, the DC metropolitan area is home to
              an extraordinary diversity of seasonal flowers.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[0.95rem] text-foreground/60 leading-[1.8] mb-10">
              This guide tracks what&apos;s blooming right now, where to find
              it, and when to visit — updated for each season so you never miss
              a peak.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex gap-12 pt-8 border-t border-foreground/10">
              <div>
                <div className="serif text-4xl font-light text-sage leading-none mb-1">
                  12
                </div>
                <div className="text-[0.72rem] tracking-[0.08em] uppercase text-foreground/40">
                  Flower Species
                </div>
              </div>
              <div>
                <div className="serif text-4xl font-light text-sage leading-none mb-1">
                  20
                </div>
                <div className="text-[0.72rem] tracking-[0.08em] uppercase text-foreground/40">
                  Locations
                </div>
              </div>
              <div>
                <div className="serif text-4xl font-light text-sage leading-none mb-1">
                  {activeBlooms.length || '—'}
                </div>
                <div className="text-[0.72rem] tracking-[0.08em] uppercase text-foreground/40">
                  In Bloom Now
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Image */}
        <Reveal>
          <div className="relative overflow-hidden aspect-[3/4]">
            <Image
              src="https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80&auto=format&fit=crop"
              alt="Colorful tulips in bloom"
              fill
              className="object-cover hover:scale-105 transition-transform duration-[8s]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   IN SEASON — GALLERY CARDS
   ============================================================ */
function InSeasonGallery() {
  const sorted = useMemo(() => {
    const order: Record<BloomStatus, number> = {
      peak: 0,
      blooming: 1,
      ending: 2,
      upcoming: 3,
      waiting: 4,
    };
    return [...BLOOMS]
      .map((b) => ({ ...b, status: getBloomStatus(b) }))
      .sort((a, b) => order[a.status] - order[b.status]);
  }, []);

  const monthName = new Date().toLocaleString('default', { month: 'long' });

  return (
    <section
      id="in-season"
      style={{ padding: 'clamp(80px,12vw,160px) 0' }}
      className="overflow-hidden"
    >
      <div
        className="max-w-[1400px] mx-auto pb-12"
        style={{ padding: '0 clamp(1.5rem,4vw,3rem) 3rem' }}
      >
        <Reveal>
          <span className="text-[0.68rem] font-medium tracking-[0.2em] uppercase text-sage block mb-4">
            In Season
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="serif font-light tracking-tight mb-2"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: '1.05',
            }}
          >
            What&apos;s blooming <em className="italic text-accent">now</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p
            className="serif italic font-light text-foreground/60 max-w-[540px] leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
          >
            Everything flowering across the DMV this {monthName}, sorted by
            what&apos;s peaking first.
          </p>
        </Reveal>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{
          padding: '0 clamp(1.5rem,4vw,3rem)',
          scrollbarWidth: 'none',
        }}
      >
        {sorted.map((bloom, i) => (
          <motion.a
            href="#guide"
            key={bloom.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="flex-shrink-0 snap-start relative overflow-hidden bg-foreground group"
            style={{ width: 'clamp(300px, 30vw, 420px)' }}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={bloom.image}
                alt={bloom.name}
                fill
                className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.08] transition-all duration-700"
                sizes="(max-width: 768px) 80vw, 30vw"
              />

              {/* Status badge */}
              <div
                className={`absolute top-5 right-5 px-3.5 py-1.5 text-[0.65rem] font-medium tracking-[0.08em] uppercase backdrop-blur-md border border-white/15 ${getStatusColor(bloom.status)}`}
              >
                {getStatusLabel(bloom.status)}
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-7 bg-gradient-to-t from-[rgba(26,24,21,0.85)] to-transparent">
                <div className="serif text-[1.6rem] font-normal text-white mb-1">
                  {bloom.name}
                </div>
                <div className="text-[0.75rem] tracking-[0.08em] uppercase text-white/60">
                  {bloom.season}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   PARALLAX QUOTE DIVIDER
   ============================================================ */
function ParallaxQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[400px] overflow-hidden flex items-center justify-center"
    >
      <motion.div style={{ y }} className="absolute inset-[-80px]">
        <Image
          src="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80&auto=format&fit=crop"
          alt="Cherry blossoms over water"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-foreground/50" />
      <div className="relative z-[2] text-center max-w-[700px] px-8">
        <Reveal>
          <h2
            className="serif font-light italic text-white leading-[1.2] mb-3"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            &ldquo;The earth laughs in flowers.&rdquo;
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="serif font-light text-white/70 text-lg">
            — Ralph Waldo Emerson
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   WEEKEND EDIT
   ============================================================ */
function WeekendEdit() {
  const picks = useMemo(() => {
    const order: Record<BloomStatus, number> = {
      peak: 0,
      blooming: 1,
      ending: 2,
      upcoming: 3,
      waiting: 4,
    };

    const active = BLOOMS.map((b) => ({
      bloom: b,
      status: getBloomStatus(b),
    }))
      .filter(
        ({ status }) =>
          status === 'peak' || status === 'blooming' || status === 'ending'
      )
      .sort((a, b) => order[a.status] - order[b.status]);

    const result: {
      bloom: Bloom;
      status: BloomStatus;
      location: (typeof LOCATIONS)[0];
    }[] = [];
    const used = new Set<string>();

    active.forEach(({ bloom, status }) => {
      const loc = LOCATIONS.find(
        (l) => l.flowers.includes(bloom.name) && !used.has(l.name)
      );
      if (loc) {
        used.add(loc.name);
        result.push({ bloom, status, location: loc });
      }
    });

    return result;
  }, []);

  const now = new Date();
  const dow = now.getDay();
  const isWeekend = dow === 0 || dow === 6;

  const statusTagColor = (s: BloomStatus) => {
    if (s === 'peak') return 'bg-sage/70';
    if (s === 'blooming') return 'bg-gold/60';
    return 'bg-rose/60';
  };

  return (
    <section
      id="weekend"
      className="max-w-[1400px] mx-auto"
      style={{ padding: 'clamp(80px,12vw,160px) clamp(1.5rem,4vw,3rem)' }}
    >
      <Reveal>
        <span className="text-[0.68rem] font-medium tracking-[0.2em] uppercase text-sage block mb-4">
          The Weekend Edit
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className="serif font-light tracking-tight mb-2"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            lineHeight: '1.05',
          }}
        >
          Where to go{' '}
          <em className="italic text-accent">
            {isWeekend ? 'this weekend' : 'next'}
          </em>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p
          className="serif italic font-light text-foreground/60 max-w-[540px] leading-relaxed mb-16"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
        >
          Our curated picks for the best bloom-chasing this weekend, based on
          what&apos;s peaking right now.
        </p>
      </Reveal>

      {picks.length === 0 ? (
        <p className="serif italic text-foreground/50 text-lg">
          No flowers are actively blooming this weekend. Check the calendar for
          upcoming blooms.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
          {/* Featured card */}
          {picks[0] && (
            <Reveal>
              <div className="relative overflow-hidden bg-foreground group h-full min-h-[400px]">
                <Image
                  src={picks[0].location.image}
                  alt={picks[0].location.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,24,21,0.8)] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div
                    className={`inline-block px-3.5 py-1.5 text-[0.65rem] font-medium tracking-[0.08em] uppercase text-white border border-white/20 backdrop-blur-sm mb-4 ${statusTagColor(picks[0].status)}`}
                  >
                    {getStatusLabel(picks[0].status)}
                  </div>
                  <div
                    className="serif font-normal text-white mb-1"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                  >
                    {picks[0].bloom.name} at {picks[0].location.name}
                  </div>
                  <div className="text-[0.82rem] text-white/65 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 opacity-60" />
                    {picks[0].location.name}, {picks[0].location.region}
                  </div>
                  <p className="text-[0.85rem] text-white/55 mt-2 leading-relaxed line-clamp-2">
                    {picks[0].location.description}
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          {/* Side cards */}
          <div className="flex flex-col gap-6">
            {picks.slice(1, 4).map((pick, i) => (
              <Reveal key={pick.location.name} delay={0.1 * (i + 1)}>
                <div className="relative overflow-hidden bg-foreground group min-h-[200px] lg:flex-1">
                  <Image
                    src={pick.location.image}
                    alt={pick.location.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,24,21,0.8)] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className={`inline-block px-3 py-1 text-[0.65rem] font-medium tracking-[0.08em] uppercase text-white border border-white/20 backdrop-blur-sm mb-3 ${statusTagColor(pick.status)}`}
                    >
                      {getStatusLabel(pick.status)}
                    </div>
                    <div className="serif text-xl font-normal text-white mb-1">
                      {pick.bloom.name}
                    </div>
                    <div className="text-[0.82rem] text-white/65 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 opacity-60" />
                      {pick.location.name}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   BLOOM GUIDE — EDITORIAL BLOCKS
   ============================================================ */
function BloomGuide() {
  const sorted = useMemo(() => {
    const order: Record<BloomStatus, number> = {
      peak: 0,
      blooming: 1,
      ending: 2,
      upcoming: 3,
      waiting: 4,
    };
    return [...BLOOMS]
      .map((b) => ({ ...b, status: getBloomStatus(b) }))
      .sort((a, b) => order[a.status] - order[b.status]);
  }, []);

  return (
    <section
      id="guide"
      className="max-w-[1400px] mx-auto"
      style={{ padding: 'clamp(80px,12vw,160px) clamp(1.5rem,4vw,3rem)' }}
    >
      <Reveal>
        <span className="text-[0.68rem] font-medium tracking-[0.2em] uppercase text-sage block mb-4">
          The Guide
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className="serif font-light tracking-tight mb-2"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            lineHeight: '1.05',
          }}
        >
          A field guide to{' '}
          <em className="italic text-accent">every bloom</em>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p
          className="serif italic font-light text-foreground/60 max-w-[540px] leading-relaxed mb-16"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
        >
          Twelve species, from the first magnolias of March to the last
          sunflowers of September.
        </p>
      </Reveal>

      {/* Guide blocks */}
      <div>
        {sorted.map((bloom, i) => (
          <div
            key={bloom.name}
            className="grid grid-cols-1 md:grid-cols-2 items-center border-b border-foreground/10 last:border-b-0"
            style={{
              gap: 'clamp(2rem, 5vw, 5rem)',
              padding: 'clamp(40px, 8vw, 100px) 0',
            }}
          >
            {/* Text */}
            <div
              className={`${i % 2 !== 0 ? 'md:order-2' : ''}`}
              style={{ padding: 'clamp(0px, 2vw, 2rem) 0' }}
            >
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
              >
                <div className="text-[0.75rem] tracking-[0.1em] uppercase text-gold mb-6">
                  {getStatusLabel(bloom.status)} · {bloom.season}
                </div>
                <h3
                  className="serif font-light tracking-tight mb-1"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    lineHeight: '1.1',
                  }}
                >
                  {bloom.name}
                </h3>
                <p className="serif text-[1.1rem] font-light text-foreground/60 leading-[1.7] mb-8">
                  {bloom.longDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {bloom.locations.map((loc) => (
                    <span
                      key={loc}
                      className="px-4 py-1.5 text-[0.75rem] font-normal border border-foreground/15 text-foreground/60 hover:border-sage hover:text-sage hover:bg-sage-light transition-all duration-300 cursor-default"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const text = `${bloom.name} — ${getStatusLabel(bloom.status).toLowerCase()} in the DMV right now.\n\nBest spots: ${bloom.locations.slice(0, 3).join(', ')}\nPeak: ${bloom.season}\n\nExplore more: isfarbaset.github.io/dmv-blooms`;
                    if (navigator.share) {
                      navigator
                        .share({
                          title: `${bloom.name} — DMV Blooms`,
                          text,
                        })
                        .catch(() => {});
                    } else {
                      navigator.clipboard.writeText(text);
                    }
                  }}
                  className="inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.06em] uppercase text-foreground/40 hover:text-sage transition-colors pt-6 border-t border-foreground/10"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </button>
              </motion.div>
            </div>

            {/* Image */}
            <div className={`${i % 2 !== 0 ? 'md:order-1' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden aspect-[4/5]"
              >
                <Image
                  src={bloom.image}
                  alt={bloom.name}
                  fill
                  className="object-cover hover:scale-[1.04] transition-transform duration-[1.2s]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   DESTINATIONS GRID
   ============================================================ */
function Destinations() {
  return (
    <section
      id="destinations"
      className="max-w-[1400px] mx-auto"
      style={{ padding: 'clamp(80px,12vw,160px) clamp(1.5rem,4vw,3rem)' }}
    >
      <Reveal>
        <span className="text-[0.68rem] font-medium tracking-[0.2em] uppercase text-sage block mb-4">
          Destinations
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className="serif font-light tracking-tight mb-2"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            lineHeight: '1.05',
          }}
        >
          Where to <em className="italic text-accent">go</em>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p
          className="serif italic font-light text-foreground/60 max-w-[540px] leading-relaxed mb-16"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
        >
          Twenty of our favorite bloom spots across DC, Maryland and Virginia.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LOCATIONS.map((loc, i) => {
          const status = getLocationStatus(loc);
          return (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="relative overflow-hidden bg-foreground aspect-[4/3] group cursor-default"
            >
              <Image
                src={loc.image}
                alt={loc.name}
                fill
                className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.06] transition-all duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,24,21,0.85)] via-transparent to-transparent pointer-events-none" />

              {/* Region badge */}
              <div className="absolute top-4 left-4 px-3 py-1 text-[0.62rem] font-medium tracking-[0.08em] uppercase text-white bg-foreground/50 backdrop-blur-sm">
                {loc.region}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="serif text-xl font-normal text-white mb-0.5">
                  {loc.name}
                </div>
                <div className="text-[0.75rem] text-white/60">
                  {loc.flowers.join(' · ')}
                </div>
              </div>

              {/* Hover description */}
              <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                <div className="serif text-xl font-normal text-white mb-2">
                  {loc.name}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-3 max-w-[260px]">
                  {loc.description}
                </p>
                <div className="text-[0.72rem] text-sage font-medium tracking-wide uppercase">
                  {loc.flowers.join(' · ')}
                </div>
                <div
                  className={`mt-3 px-3 py-1 text-[0.62rem] font-medium tracking-[0.06em] uppercase ${getStatusColor(status)}`}
                >
                  {getStatusLabel(status)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   BLOOM CALENDAR
   ============================================================ */
function BloomCalendar() {
  const currentMonth = new Date().getMonth();

  return (
    <section
      id="calendar"
      className="max-w-[1400px] mx-auto"
      style={{ padding: 'clamp(80px,12vw,160px) clamp(1.5rem,4vw,3rem)' }}
    >
      <Reveal>
        <span className="text-[0.68rem] font-medium tracking-[0.2em] uppercase text-sage block mb-4">
          Seasonality
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className="serif font-light tracking-tight mb-2"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            lineHeight: '1.05',
          }}
        >
          The bloom <em className="italic text-accent">calendar</em>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p
          className="serif italic font-light text-foreground/60 max-w-[540px] leading-relaxed mb-16"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
        >
          A year of DMV flowers at a glance. Plan ahead — or see what&apos;s
          next.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="bg-white border border-foreground/10 p-6 md:p-10 overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr>
                <th className="text-left" />
                {MONTHS.map((m, i) => (
                  <th
                    key={m}
                    className={`text-[0.65rem] font-medium tracking-[0.1em] uppercase text-center pb-3 border-b ${
                      i === currentMonth
                        ? 'text-sage border-sage'
                        : 'text-foreground/35 border-foreground/10'
                    }`}
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BLOOMS.map((bloom) => (
                <tr key={bloom.name}>
                  <td className="serif font-normal text-[0.9rem] text-left pr-4 py-1.5 whitespace-nowrap min-w-[140px]">
                    {bloom.name}
                  </td>
                  {Array.from({ length: 12 }).map((_, m) => {
                    const isPeak = bloom.peak.includes(m);
                    const isBloom = bloom.months.includes(m);
                    return (
                      <td key={m} className="py-1.5 px-0.5 text-center">
                        {isPeak ? (
                          <div
                            className="cal-bar h-6 flex items-center justify-center text-[0.62rem] font-medium bg-sage text-white cursor-default"
                            title={`${bloom.name} — Peak bloom`}
                          />
                        ) : isBloom ? (
                          <div
                            className="cal-bar h-6 flex items-center justify-center text-[0.62rem] font-medium bg-sage-light text-sage cursor-default"
                            title={`${bloom.name} — Bloom`}
                          />
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Legend */}
          <div className="flex gap-8 mt-6">
            <div className="flex items-center gap-2 text-[0.75rem] text-foreground/60">
              <div className="w-6 h-2.5 bg-sage" />
              Peak bloom
            </div>
            <div className="flex items-center gap-2 text-[0.75rem] text-foreground/60">
              <div className="w-6 h-2.5 bg-sage-light" />
              Early / late bloom
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer
      className="border-t border-foreground/10"
      style={{
        padding:
          'clamp(60px,8vw,120px) clamp(1.5rem,4vw,3rem) clamp(30px,4vw,60px)',
      }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-end">
        <div>
          <div
            className="serif font-light tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            DMV <em className="italic text-accent">Blooms</em>
          </div>
          <p className="serif italic font-light text-foreground/60 text-[0.95rem] mb-8">
            Made for the DMV flower-chasing community.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { href: '#in-season', label: 'In Season' },
              { href: '#guide', label: 'Guide' },
              { href: '#destinations', label: 'Destinations' },
              { href: '#calendar', label: 'Calendar' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.75rem] tracking-[0.06em] uppercase text-foreground/40 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="md:text-right">
          <p className="text-[0.75rem] text-foreground/40 mb-2">
            &copy; {new Date().getFullYear()} Isfar Baset. All rights reserved.
          </p>
          <p className="text-[0.7rem] text-foreground/40 max-w-[300px] leading-relaxed md:ml-auto">
            Bloom times are approximate and vary by weather.{' '}
            <a
              href="https://github.com/isfarbaset/dmv-blooms"
              className="text-sage underline underline-offset-2 inline-flex items-center gap-1"
            >
              Contribute on GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Home() {
  const zoomImages = [
    { src: BLOOMS[0].image, alt: BLOOMS[0].name },
    { src: BLOOMS[2].image, alt: BLOOMS[2].name },
    { src: BLOOMS[5].image, alt: BLOOMS[5].name },
    { src: BLOOMS[1].image, alt: BLOOMS[1].name },
    { src: BLOOMS[3].image, alt: BLOOMS[3].name },
    { src: BLOOMS[11].image, alt: BLOOMS[11].name },
    { src: BLOOMS[8].image, alt: BLOOMS[8].name },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Scroll-to-expand Hero */}
      <div id="top">
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1280&q=80&auto=format&fit=crop"
          bgImageSrc="https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1920&q=80&auto=format&fit=crop"
          title="DMV Blooms"
          date="A Seasonal Flower Guide"
          scrollToExpand="Scroll to explore"
          textBlend
        >
          <HeroContent />
        </ScrollExpandMedia>
      </div>

      <MarqueeSection />
      <AboutSection />

      {/* Zoom Parallax Showcase */}
      <section className="relative">
        <div
          className="max-w-[1400px] mx-auto text-center"
          style={{
            padding: 'clamp(60px,8vw,120px) clamp(1.5rem,4vw,3rem) 0',
          }}
        >
          <Reveal>
            <span className="text-[0.68rem] font-medium tracking-[0.2em] uppercase text-sage block mb-4">
              The Collection
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="serif font-light tracking-tight mb-2"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                lineHeight: '1.05',
              }}
            >
              Twelve <em className="italic text-accent">seasons</em> of color
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p
              className="serif italic font-light text-foreground/60 max-w-[540px] mx-auto leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
            >
              Scroll to explore the blooms of the DMV through the year.
            </p>
          </Reveal>
        </div>
        <ZoomParallax images={zoomImages} />
      </section>

      <InSeasonGallery />
      <ParallaxQuote />
      <WeekendEdit />
      <BloomGuide />
      <Destinations />
      <BloomCalendar />
      <Footer />
    </div>
  );
}