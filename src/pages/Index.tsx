import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import {
  Phone,
  MessageCircle,
  Mail,
  Clock,
  CheckCircle2,
  Shield,
  Award,
  Wrench,
  Zap,
  Palette,
  Layers,
  UtensilsCrossed,
  Eye,
  FileText,
  Hammer,
  PackageCheck,
  CreditCard,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Stars,
  BadgeCheck,
  Timer,
  Gem,
  Play,
  ArrowRight,
  Menu,
  X,
  Star,
  ChevronRight,
} from "lucide-react";

import TrustBadge from "@/components/TrustBadge";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import ProcessStep from "@/components/ProcessStep";
import ContactForm from "@/components/ContactForm";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";

// images
import bathroomBeforeAfter from "@/assets/bathroom-before-after.png";
import bedroomBeforeAfter from "@/assets/bedroom-before-after.png";
import diningBeforeAfter from "@/assets/dining-before-after.png";
import hallwayBeforeAfter from "@/assets/hallway-before-after.png";
import livingBeforeAfter from "@/assets/living-before-after.png";
import ahmedGoudaPhoto from "@/assets/ahmed-gouda.png";
import logo from "@/assets/logo.png";
import afterKitchen from "@/assets/after-kitchen.jpg";
import beforeKitchen from "@/assets/before-kitchen.jpg";
import afterLiving from "@/assets/after-living-room.jpg";
import beforeLiving from "@/assets/before-living-room.jpg";
import heroBg from "@/assets/hero-bg.jpg";

/* ── helpers ── */
function AnimatedCounter({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const dur = 1300;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            start = Math.floor(eased * value);
            setDisplay(start);
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

const navLinks = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "before-after", label: "Portfolio" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export default function Index() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.06]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.55,
    });
    // @ts-ignore
    window.lenis = lenis;
    let raf: number;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 18);
      if (y > lastY.current && y > 320) setHiddenHeader(true);
      else setHiddenHeader(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    // @ts-ignore
    if (window.lenis) window.lenis.scrollTo(el, { offset: -88, duration: 1.2 });
    else el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToContact = () => scrollTo("contact");
  const scrollToProjects = () => scrollTo("before-after");

  return (
    <div className="min-h-screen bg-background selection:bg-accent/20" dir="ltr">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-accent via-accent to-amber-300 z-[60] origin-left"
      />

      {/* ── NAV ── floating pill */}
      <motion.header
        initial={{ y: -22, opacity: 0 }}
        animate={{ y: hiddenHeader ? -86 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 inset-x-0 z-50 pointer-events-none"
      >
        <div className="mx-auto max-w-[1160px] px-3 md:px-4 pt-3 md:pt-4">
          <div
            className={`pointer-events-auto flex items-center justify-between gap-3 px-3 md:px-4 py-[9px] md:py-2.5 rounded-full border transition-all duration-500 ${
              scrolled
                ? "bg-[hsl(0_0%_100%/0.78)] backdrop-blur-[20px] border-white/60 shadow-[0_6px_22px_hsl(215_66%_14%/0.10),0_1px_0_hsl(0_0%_100%/0.6)_inset]"
                : "bg-white/70 backdrop-blur-xl border-white/30 shadow-sm"
            }`}
          >
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-3">
              <span className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden bg-white border border-border/60 shadow-sm grid place-items-center p-1">
                <img src={logo} alt="logo" className="w-full h-full object-contain" />
              </span>
              <span className="hidden sm:flex flex-col leading-none text-left">
                <span className="text-[13px] md:text-[14px] font-extrabold tracking-tight text-foreground">Eng. Ahmed Gouda</span>
                <span className="text-[10.5px] font-bold tracking-[0.12em] text-accent">LUXURY FINISHING</span>
              </span>
              <span className="sm:hidden text-[13px] font-extrabold text-foreground">Ahmed Gouda</span>
            </a>

            <nav className="hidden lg:flex items-center gap-1 bg-muted/60 rounded-full p-1 border border-border/40">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-muted-foreground hover:text-foreground hover:bg-white transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/201001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0a3320] text-white text-[13px] font-semibold hover:bg-[#0e4a2e] transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button onClick={scrollToContact} className="hidden sm:inline-flex btn-gold px-5 md:px-6 py-[10px] md:py-2.5 text-[13px]">
                Book Visit
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="lg:hidden w-9 h-9 grid place-items-center rounded-full bg-foreground text-background"
                aria-label="menu"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="pointer-events-auto mx-3 mt-2 bg-white rounded-3xl border border-border/60 shadow-xl overflow-hidden lg:hidden"
            >
              <div className="p-2 flex flex-col">
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="text-left px-4 py-3.5 rounded-2xl text-sm font-semibold hover:bg-muted transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
                <div className="grid grid-cols-2 gap-2 p-2">
                  <a href="https://wa.me/201001234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#0a3320] text-white text-sm font-bold">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                  <button onClick={scrollToContact} className="btn-gold py-3 text-sm font-bold">Book Visit</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#fdfbf7]">
        {/* bg */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover scale-[1.02]" />
          <img src={livingBeforeAfter} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-luminosity hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c33]/90 via-[#0f2747]/78 to-[#0b1c33]/55 md:from-[#0b1c33]/88 md:via-[#0f2747]/68 md:to-[#0f2747]/28" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060f1f]/40 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(hsl(44 70% 50%) 1.1px, transparent 1.1px)", backgroundSize: "22px 22px" }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="absolute top-24 right-6 md:right-10 w-64 h-64 bg-accent/20 rounded-full blur-[70px] pointer-events-none hidden md:block" />
        <motion.div style={{ opacity: heroOpacity }} className="absolute -bottom-12 -left-12 w-[420px] h-[420px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative container mx-auto px-4 md:px-6 pt-[84px] md:pt-8 pb-8 md:pb-10">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-8 md:gap-8 items-center">
            {/* text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } }}
              className="text-left"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="inline-flex items-center gap-2.5 pr-3 pl-2 py-1.5 rounded-full glass-dark text-white/90 text-xs font-bold tracking-wide mb-4 md:mb-5"
              >
                <span className="w-7 h-7 grid place-items-center rounded-full bg-accent text-accent-foreground">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="hidden sm:inline">Luxury Finishing — On-Time Delivery — Written Warranty</span>
                <span className="sm:hidden">On-Time • 12-Month Warranty</span>
                <span className="hidden sm:inline-flex w-8 h-8 rounded-full bg-white/10 grid place-items-center">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </motion.div>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1] } } }}
                className="display-heading text-[34px] sm:text-[42px] md:text-[54px] lg:text-[60px] text-white leading-[0.95]"
              >
                Transform Your
                <br />
                <span className="font-light italic tracking-tight" style={{ fontFamily: "Cormorant Garamond, Inter, serif" }}>
                  Space Into Art
                </span>
                <br />
                <span className="text-gradient-gold inline-block pb-1">You'll Love to Live In</span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="mt-4 md:mt-5 text-[15px] md:text-[17px] leading-7 md:leading-8 text-white/80 font-medium max-w-[560px] text-balance"
              >
                We don't just finish walls — we craft spaces that breathe elegance. Full engineering supervision, authentic materials, and a transparent contract that protects you until handover.
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <button onClick={scrollToContact} className="btn-gold px-7 md:px-8 py-3.5 md:py-4 text-[14px] md:text-[15px]">
                  <span className="w-8 h-8 rounded-full bg-[hsl(215_66%_10%/0.95)] text-white grid place-items-center">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </span>
                  Book Free Site Visit
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollToProjects}
                  className="inline-flex items-center gap-2.5 px-6 md:px-7 py-3.5 md:py-4 rounded-full bg-white text-foreground text-[14px] font-bold border border-white/60 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <span className="w-8 h-8 rounded-full bg-accent/15 border border-accent/20 grid place-items-center">
                    <Eye className="w-4 h-4 text-accent" />
                  </span>
                  View Before / After
                </button>
              </motion.div>

              {/* proof */}
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } } }}
                className="mt-7 md:mt-8 flex flex-wrap items-center gap-4 md:gap-6"
              >
                <div className="flex items-center gap-3 glass-dark rounded-full pr-5 pl-2 py-1.5">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/100?img=${12 + i * 7}`}
                        alt=""
                        className="w-8 h-8 rounded-full border-2 border-white/20 object-cover"
                      />
                    ))}
                    <span className="w-8 h-8 rounded-full bg-accent text-accent-foreground grid place-items-center text-[10px] font-extrabold border-2 border-white/20">+150</span>
                  </div>
                  <div className="text-left">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-[11px] font-bold text-white/85">Trusted by 150+ families • 4.9/5</p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-6 text-white/90">
                  <span className="flex items-center gap-2 text-xs font-bold">
                    <span className="w-7 h-7 rounded-full bg-white/10 grid place-items-center">
                      <BadgeCheck className="w-3.5 h-3.5" />
                    </span>
                    Certified contracts
                  </span>
                  <span className="flex items-center gap-2 text-xs font-bold">
                    <span className="w-7 h-7 rounded-full bg-white/10 grid place-items-center">
                      <Timer className="w-3.5 h-3.5" />
                    </span>
                    Visit within 48 hours
                  </span>
                </div>
              </motion.div>

              {/* trust pills under */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                className="mt-5 hidden md:flex flex-wrap gap-2"
              >
                <TrustBadge icon={Award} text="150+ Projects Delivered" variant="gold" />
                <TrustBadge icon={BadgeCheck} text="On-Time, Contracted" variant="glass" />
                <TrustBadge icon={Shield} text="12-Month Warranty" variant="glass" />
              </motion.div>
            </motion.div>

            {/* visual */}
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="relative lg:pr-2"
            >
              <div className="relative rounded-[2rem] md:rounded-[2.2rem] overflow-hidden border border-white/15 shadow-[0_20px_60px_hsl(215_66%_10%/0.35)] bg-white p-2 md:p-2.5">
                <div className="relative rounded-[1.6rem] overflow-hidden aspect-[4/3.4] md:aspect-[4/3.55] bg-stone-100">
                  <img src={livingBeforeAfter} alt="before and after" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute top-3 md:top-4 inset-x-3 md:inset-x-4 flex justify-between">
                    <span className="px-3 py-1.5 rounded-full glass-dark text-white text-xs font-bold">Before • Raw</span>
                    <span className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-extrabold shadow-md">After ✨ Luxury</span>
                  </div>
                  <div className="absolute bottom-3 inset-x-3 md:bottom-4 md:inset-x-4 glass-strong rounded-2xl p-3 md:p-4 flex items-center justify-between gap-3">
                    <div className="text-left">
                      <p className="text-xs font-bold tracking-[0.12em] text-accent">LIVING ROOM • 180 M²</p>
                      <p className="text-sm md:text-[15px] font-extrabold text-foreground leading-tight">Living Room — From Raw to Super Luxe</p>
                      <p className="text-xs font-medium text-muted-foreground">Natural parquet • Hidden LED gypsum • Durable paint</p>
                    </div>
                    <span className="hidden sm:grid w-10 h-10 rounded-full bg-foreground text-background place-items-center shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* floating card — price */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-2 md:-right-4 top-[14%] glass-strong rounded-2xl px-3.5 py-3 flex items-center gap-3 shadow-xl hidden sm:flex"
                >
                  <span className="w-10 h-10 rounded-full gradient-navy grid place-items-center text-white">
                    <Gem className="w-5 h-5" />
                  </span>
                  <div className="text-left">
                    <p className="text-[11px] font-bold tracking-wide text-muted-foreground">Starting from</p>
                    <p className="text-sm font-extrabold text-foreground">850 EGP / m²</p>
                    <p className="text-[11px] font-semibold text-emerald-600">Materials & supervision included</p>
                  </div>
                </motion.div>

                {/* floating card — warranty */}
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  className="absolute -left-2 md:-left-3 bottom-[18%] glass-strong rounded-2xl px-3.5 py-3 flex items-center gap-3 shadow-xl hidden md:flex"
                >
                  <span className="w-10 h-10 rounded-full bg-emerald-600 text-white grid place-items-center">
                    <Shield className="w-5 h-5" />
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-foreground">12-Month Written Warranty</p>
                    <p className="text-[11px] font-medium text-muted-foreground">Free maintenance • Clear contract</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </motion.div>
              </div>

              {/* under stats */}
              <div className="mt-3 md:mt-4 grid grid-cols-3 gap-2 md:gap-3">
                {[
                  { v: 15, s: "+", l: "Years Experience" },
                  { v: 150, s: "+", l: "Projects Done" },
                  { v: 98, s: "%", l: "Client Satisfaction" },
                ].map((s) => (
                  <div key={s.l} className="glass-strong rounded-2xl p-3 md:p-4 text-center">
                    <p className="text-lg md:text-xl font-black text-foreground leading-none">
                      <AnimatedCounter value={s.v} suffix={s.s} />
                    </p>
                    <p className="text-[11px] font-bold text-muted-foreground mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="relative bg-foreground text-white overflow-hidden border-y border-white/10">
        <div className="marquee py-3.5" style={{ ["--gap" as any]: "2.5rem" }}>
          <div className="marquee__track items-center">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex items-center gap-10 shrink-0">
                {[
                  "Luxury Finishing",
                  "On-Time Delivery",
                  "Written Warranty",
                  "Authentic Materials",
                  "Engineering Supervision",
                  "Transparent Contract",
                  "Daily Updates",
                  "5-Star Quality",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-10">
                    <span className="text-[13px] font-bold tracking-[0.14em] whitespace-nowrap">{t}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div aria-hidden className="marquee__track items-center">
            {[...Array(2)].map((_, dup) => (
              <div key={`d2-${dup}`} className="flex items-center gap-10 shrink-0">
                {[
                  "Luxury Finishing",
                  "On-Time Delivery",
                  "Written Warranty",
                  "Authentic Materials",
                  "Engineering Supervision",
                  "Transparent Contract",
                  "Daily Updates",
                  "5-Star Quality",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-10">
                    <span className="text-[13px] font-bold tracking-[0.14em] whitespace-nowrap">{t}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* trust strip */}
      <section className="py-6 md:py-7 bg-card border-b border-border/60">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
            {[
              { icon: Eye, title: "Free visit within 48 hours", desc: "On-site survey + accurate estimate, no commitment" },
              { icon: Shield, title: "Up to 12-month warranty", desc: "Written contract covering every detail" },
              { icon: CreditCard, title: "Flexible progress payments", desc: "Small deposit + milestones tied to schedule" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3.5">
                <span className="w-10 h-10 rounded-full bg-accent text-accent-foreground grid place-items-center shrink-0">
                  <f.icon className="w-5 h-5" />
                </span>
                <div className="text-left">
                  <p className="text-[13px] font-extrabold text-foreground leading-none">{f.title}</p>
                  <p className="text-xs font-medium text-muted-foreground mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 mesh-gold opacity-40 pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-accent/5 rounded-full blur-[70px] pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-[1120px] mx-auto grid lg:grid-cols-[0.94fr_1.06fr] gap-10 md:gap-12 items-center">
            {/* image */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-3 md:-inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/20 via-transparent to-primary/10 blur-xl" />
                <div className="relative w-[300px] h-[380px] md:w-[360px] md:h-[460px] rounded-[2rem] overflow-hidden border-[6px] border-white shadow-[0_18px_40px_hsl(215_66%_14%/0.18)] bg-white">
                  <img src={ahmedGoudaPhoto} alt="Eng. Ahmed Gouda" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/18 via-transparent to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <div className="glass-strong rounded-2xl px-4 py-3 flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm font-extrabold text-foreground">Eng. Ahmed Gouda</p>
                        <p className="text-xs font-semibold text-accent">Founder & Project Director • Direct supervision</p>
                      </div>
                      <span className="w-9 h-9 rounded-full bg-accent text-accent-foreground grid place-items-center">
                        <BadgeCheck className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 0.6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-2 md:-right-6 glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
                >
                  <span className="w-10 h-10 rounded-full bg-emerald-600 text-white grid place-items-center">
                    <Award className="w-5 h-5" />
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-foreground leading-none">Rated 4.9/5</p>
                    <p className="text-[11px] font-medium text-muted-foreground">From 150+ clients</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute -bottom-3 -left-2 md:-left-6 glass-strong rounded-2xl p-3 text-center shadow-xl hidden sm:block"
                >
                  <p className="text-[11px] font-bold tracking-wide text-muted-foreground">Service Areas</p>
                  <p className="text-xs font-extrabold text-foreground">New Cairo • Zayed • Maadi • Nasr City</p>
                </motion.div>
              </div>
            </motion.div>

            {/* text */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="text-left"
            >
              <div className="section-eyebrow mb-3">About — Story & Commitment</div>
              <h2 className="display-heading text-[30px] md:text-[40px] text-foreground leading-tight">
                15 Years of Experience
                <br />
                <span className="text-gradient-gold">Turning Spaces Into Homes You Love</span>
              </h2>
              <div className="mt-5 space-y-4 text-[14px] md:text-[15px] leading-7 md:leading-8 text-muted-foreground font-medium">
                <p>
                  A civil engineer specializing in luxury finishing. He started his career in top contracting firms, then founded his own company to deliver
                  <span className="text-foreground font-bold"> guaranteed quality, on-time delivery, and transparent contracts</span> with no surprises.
                </p>
                <p>
                  Personally supervised <span className="text-foreground font-bold">150+ projects</span> in New Cairo, Fifth Settlement, Sheikh Zayed & Maadi — each one a testament to detail, cleanliness, and daily follow-up.
                </p>
                <p className="hidden md:block">
                  We select authentic materials, perfect every slope, plumbing and electrical to code, and hand you a turnkey home with considered lighting and a super-luxe finish that lasts.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  { k: "Years Experience", v: 15, s: "+" },
                  { k: "Projects Done", v: 150, s: "+" },
                  { k: "Months Warranty", v: 12, s: "" },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl bg-card border border-border/70 p-4 text-center shadow-sm">
                    <p className="text-2xl font-black text-accent">
                      <AnimatedCounter value={s.v} suffix={s.s} />
                    </p>
                    <p className="text-xs font-bold text-muted-foreground">{s.k}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={scrollToContact} className="btn-gold px-6 py-3 text-sm">
                  Book Your Visit
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => scrollTo("before-after")} className="btn-ghost-gold px-6 py-3 text-sm">
                  View Portfolio
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── bento */}
      <section id="services" className="py-16 md:py-20 bg-muted/25 border-y border-border/50 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-eyebrow justify-center"
            >
              Our Integrated Services
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-3 display-heading text-[28px] md:text-[40px] text-foreground"
            >
              Everything You Need… <span className="text-gradient-gold">Turnkey</span>
            </motion.h2>
            <p className="mt-3 text-sm md:text-[15px] leading-7 text-muted-foreground font-medium">
              One management, one quality, one timeline — from design to handing you the key.
            </p>
          </div>

          <div className="mt-10 max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            <ServiceCard index={0} icon={Wrench} title="Turnkey Full Finishing" description="Complete execution from A to Z under one management — your peace of mind comes first." />
            <ServiceCard index={1} icon={Zap} title="Plumbing & Electrical to Code" description="Certified MCB panels, PPR pipes, and fully concealed safe installations." />
            <ServiceCard index={2} icon={Palette} title="Gypsum & Decorative Paints" description="Suspended ceilings, cornices, and washable vinyl with a hotel-like touch." />
            <ServiceCard index={3} icon={Layers} title="Premium Flooring" description="Porcelain, parquet & engineered wood installed professionally with perfect leveling." />
            <ServiceCard index={4} icon={UtensilsCrossed} title="Kitchens & Storage" description="Aluminum & MDF tailored to your space with smart storage." />
            <ServiceCard index={5} icon={Hammer} title="Carpentry & Metalwork" description="Armored doors, aluminum windows & ironwork finishes that last for years." />
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── premium */}
      <section id="before-after" className="py-16 md:py-24 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
          <div className="absolute -top-24 -left-24 w-[560px] h-[560px] bg-accent/10 rounded-full blur-[90px]" />
          <div className="absolute -bottom-32 -right-32 w-[520px] h-[520px] bg-white/5 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-accent text-xs font-bold tracking-wide">
              <Stars className="w-3.5 h-3.5" /> Real Portfolio — Before & After
            </div>
            <h2 className="mt-4 display-heading text-[28px] md:text-[44px] text-white leading-tight">See the Difference Yourself</h2>
            <p className="mt-3 text-sm md:text-[15px] leading-7 text-white/65 font-medium">
              Documented <span className="text-white font-bold">before / after</span> projects — drag the slider to compare quality and detail.
            </p>
          </div>

          {/* interactive sliders */}
          <div className="mt-10 max-w-[1060px] mx-auto grid lg:grid-cols-2 gap-6 md:gap-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[1.6rem] p-2 bg-white/5 border border-white/10 backdrop-blur"
            >
              <ImageComparisonSlider beforeImage={beforeKitchen} afterImage={afterKitchen} beforeAlt="kitchen before" afterAlt="kitchen after" />
              <div className="px-2 md:px-3 py-4 text-left">
                <h3 className="text-white font-extrabold text-[15px]">Kitchen — From Concrete Shell to Functional Luxury</h3>
                <p className="text-white/60 text-xs font-medium mt-1 leading-6">Upper & lower units, marble & task lighting — Delivered in 21 days</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="rounded-[1.6rem] p-2 bg-white/5 border border-white/10 backdrop-blur"
            >
              <ImageComparisonSlider beforeImage={beforeLiving} afterImage={afterLiving} beforeAlt="living before" afterAlt="living after" />
              <div className="px-2 md:px-3 py-4 text-left">
                <h3 className="text-white font-extrabold text-[15px]">Living Room — Full Transformation with Hidden Lighting</h3>
                <p className="text-white/60 text-xs font-medium mt-1 leading-6">LED gypsum, parquet & calm paints — Turnkey delivery</p>
              </div>
            </motion.div>
          </div>

          {/* cards grid */}
          <div className="mt-8 max-w-[1060px] mx-auto grid md:grid-cols-2 gap-6 md:gap-7">
            {[
              {
                img: bedroomBeforeAfter,
                title: "Bedroom — Super-Luxe Serenity",
                desc: "From unfinished to a calm retreat with natural wood touches",
                bullets: ["Eco-friendly paints", "Natural wood flooring", "Concealed electrical"],
              },
              {
                img: diningBeforeAfter,
                title: "Dining Room — Classic Elegance",
                desc: "From raw concrete to a crystal-chandelier dining room",
                bullets: ["Premium flooring", "Decorative wallpaper", "Crystal lighting"],
              },
              {
                img: hallwayBeforeAfter,
                title: "Hallway & Entrance — Grand Welcome",
                desc: "Transforming an exposed-wiring entrance into a guest-impressing entry",
                bullets: ["Solid wood doors", "Parquet", "Hidden lighting"],
              },
              {
                img: bathroomBeforeAfter,
                title: "Bathroom — Hotel Grade",
                desc: "From incomplete to a marble bathroom with glass cabin",
                bullets: ["White marble", "Glass shower cabin", "Concealed plumbing"],
              },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative rounded-[1.5rem] overflow-hidden bg-white border border-white/10 shadow-[0_14px_40px_hsl(0_0%_0%/0.18)]"
              >
                <div className="relative aspect-[4/2.9] overflow-hidden bg-stone-100">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1.2s] ease-[0.23,1,0.32,1]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent opacity-60" />
                  <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white text-foreground text-xs font-extrabold shadow">Before / After</span>
                  <span className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full glass-dark text-white text-xs font-bold hidden sm:inline-flex">
                    {p.bullets[0]} • {p.bullets[1]}
                  </span>
                </div>
                <div className="p-5 md:p-6 text-left">
                  <h3 className="text-[15px] font-extrabold text-foreground">{p.title}</h3>
                  <p className="text-[13px] leading-6 text-muted-foreground font-medium mt-1">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.bullets.map((b) => (
                      <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-bold text-foreground border border-border">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> {b}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={scrollToContact} className="btn-gold px-8 py-4 text-sm font-extrabold">
              Book Your Free Visit <ArrowRight className="w-4 h-4" />
            </button>
            <a href="https://wa.me/201001234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-foreground font-bold text-sm border border-white/60 hover:bg-stone-50 transition-colors">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 mesh-gold opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-eyebrow justify-center">Client Voices</div>
            <h2 className="mt-3 display-heading text-[28px] md:text-[40px] text-foreground">Clients Talk About <span className="text-gradient-gold">Commitment</span></h2>
            <p className="mt-3 text-sm md:text-[15px] text-muted-foreground font-medium">Verified testimonials from real projects — the same quality you'll receive.</p>
          </div>

          <div className="mt-10 max-w-[1160px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            <TestimonialCard
              quote="I worked with Eng. Ahmed on my Fifth Settlement apartment. He was punctual and sent daily photos. The result exceeded my expectations."
              name="Khaled Abdelrahman, Eng."
              location="Fifth Settlement"
              projectType="180 m² Apartment"
            />
            <TestimonialCard
              quote="One of the best decisions I've made — clean work and excellent materials. Honest with no budget surprises, and the written warranty gave me confidence."
              name="Dr. Nourhan El-Sayed"
              location="Sheikh Zayed"
              projectType="350 m² Villa"
            />
            <TestimonialCard
              quote="He delivered my shop a week early! The workers were respectful and the site stayed clean throughout. Highly recommended."
              name="Mahmoud Farouk"
              location="Nasr City"
              projectType="Retail Store"
            />
            <TestimonialCard
              quote="He helped me choose the right design for my budget without pressure. Communication was easy and the result is even better than I imagined."
              name="Ahmed Hassan"
              location="Maadi"
              projectType="150 m² Apartment"
            />
            <TestimonialCard
              quote="I've tried many contractors with bad experiences, but Eng. Ahmed was different — commitment, quality, and fair pricing."
              name="Sara Abdullah, Eng."
              location="New Cairo"
              projectType="Bathroom & Kitchen"
            />
            <TestimonialCard
              quote="I live abroad and was worried, but weekly video reports reassured me and he delivered exactly as agreed."
              name="Yasser El-Masry"
              location="Fifth Settlement"
              projectType="200 m² — Remote Client"
            />
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-16 md:py-24 bg-muted/25 border-y border-border/50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-eyebrow justify-center">Your Journey With Us</div>
            <h2 className="mt-3 display-heading text-[28px] md:text-[40px] text-foreground">4 Steps to a Ready Home</h2>
            <p className="mt-3 text-sm text-muted-foreground font-medium">A clear process — you follow every step with photos & video.</p>
          </div>

          <div className="mt-12 max-w-[760px] mx-auto relative">
            <div className="absolute left-[28px] md:left-[29px] top-6 bottom-6 w-px bg-border hidden md:block" />
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
              className="absolute left-[28px] md:left-[29px] top-6 bottom-6 w-px bg-accent origin-top hidden md:block"
              style={{ transformOrigin: "top" }}
            />

            <div className="space-y-7 md:space-y-9">
              <ProcessStep index={0} number={1} icon={Eye} title="Free Visit + Accurate Estimate" description="Visit within 24–48h, take measurements, and provide a transparent cost & timeline estimate." />
              <ProcessStep index={1} number={2} icon={FileText} title="Design & Transparent Contract" description="Select materials & designs, sign a detailed contract that protects your rights and warranties." />
              <ProcessStep index={2} number={3} icon={Hammer} title="Execution on Schedule & Follow-up" description="Organized start, weekly photo/video reports, and daily communication with you." />
              <ProcessStep index={3} number={4} icon={PackageCheck} title="Turnkey Handover + Written Warranty" description="Clean handover ready to live in, with written warranty and free maintenance." />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 rounded-[1.4rem] bg-foreground text-white p-[1px] overflow-hidden"
            >
              <div className="rounded-[1.35rem] bg-gradient-to-br from-foreground to-[#0f2747] p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <span className="w-11 h-11 rounded-full bg-accent text-accent-foreground grid place-items-center">
                    <Clock className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">Average Delivery Time</p>
                    <p className="text-xs text-white/70 font-medium">150 m² apartment — 35 to 45 working days on a binding schedule</p>
                  </div>
                </div>
                <button onClick={scrollToContact} className="btn-gold px-6 py-3 text-sm shrink-0 w-full md:w-auto">
                  Calculate Your Time & Cost
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-12 md:py-20 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] bg-white/5 rounded-full blur-[90px]" />
        <div className="absolute -bottom-40 -left-40 w-[640px] h-[640px] bg-accent/10 rounded-full blur-[90px]" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-[1120px] mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left lg:sticky lg:top-28 order-2 lg:order-1"
            >
              <div className="relative bg-white rounded-[1.6rem] md:rounded-[1.8rem] p-5 md:p-7 shadow-[0_20px_60px_hsl(0_0%_0%/0.28)] border border-white/50">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-left">
                    <h3 className="text-[17px] font-extrabold text-foreground">Book Free Site Visit</h3>
                    <p className="text-xs font-medium text-muted-foreground mt-1">We reply within 2 working hours • No spam</p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" /> Available today
                  </span>
                </div>
                <ContactForm />
                <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-bold text-muted-foreground">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" /> Your data is protected • Used only to schedule the visit
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { v: "150+", l: "Projects" },
                  { v: "4.9★", l: "Rating" },
                  { v: "48h", l: "Quick Reply" },
                ].map((x) => (
                  <div key={x.l} className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur text-center py-3">
                    <p className="text-sm font-black text-white">{x.v}</p>
                    <p className="text-[11px] font-bold text-white/70">{x.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-left order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-accent text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Ready to start?
              </div>
              <h2 className="mt-4 display-heading text-[30px] md:text-[42px] text-white leading-tight">
                Book Your Free
                <br />
                <span className="text-white/90">Site Visit Now</span>
              </h2>
              <p className="mt-3 text-sm md:text-[15px] leading-7 text-white/70 font-medium max-w-[520px]">
                Free visit with zero commitment — we take measurements, discuss your taste & budget, and deliver a clear estimate within 24 hours.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  { icon: Phone, label: "Call Us", value: "01001234567", href: "tel:+201001234567" },
                  { icon: MessageCircle, label: "WhatsApp", value: "01001234567", href: "https://wa.me/201001234567" },
                  { icon: Mail, label: "Email", value: "info@ahmedgouda-finishing.com", href: "mailto:info@ahmedgouda-finishing.com" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 hover:bg-white/10 transition-colors text-left"
                  >
                    <span className="w-10 h-10 rounded-full bg-accent text-accent-foreground grid place-items-center group-hover:scale-105 transition-transform">
                      <c.icon className="w-5 h-5" />
                    </span>
                    <span className="text-left">
                      <span className="block text-[11px] font-bold tracking-wide text-white/60">{c.label}</span>
                      <span className="block text-sm font-extrabold text-white">{c.value}</span>
                    </span>
                    <ArrowUpRight className="ml-auto w-4 h-4 text-white/40 group-hover:text-white transition-colors hidden sm:block" />
                  </a>
                ))}

                <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 text-left">
                  <span className="w-10 h-10 rounded-full bg-white/10 border border-white/10 grid place-items-center text-white">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <span className="text-left">
                    <span className="block text-[11px] font-bold tracking-wide text-white/60">Service Areas</span>
                    <span className="block text-sm font-extrabold text-white leading-6">New Cairo • Fifth Settlement • Sheikh Zayed • Maadi • Nasr City</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-white/60 text-xs font-bold">
                  <Clock className="w-4 h-4 text-accent" /> Sat – Thu: 9 AM – 6 PM • Reply within 2 hours
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── luxury */}
      <footer className="bg-[#06101f] text-white/80 border-t border-white/10">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full overflow-hidden bg-white grid place-items-center p-1 border border-white/20">
                <img src={logo} alt="logo" className="w-full h-full object-contain" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-extrabold text-white">Eng. Ahmed Gouda</span>
                <span className="block text-xs font-bold tracking-[0.12em] text-accent">LUXURY FINISHING • EST 2010</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: "01001234567", href: "tel:+201001234567" },
                { label: "WhatsApp", href: "https://wa.me/201001234567" },
                { label: "info@ahmedgouda-finishing.com", href: "mailto:info@ahmedgouda-finishing.com" },
              ].map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-medium text-white/45">
            <p>© 2024 Eng. Ahmed Gouda Luxury Finishing. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Crafted with care — Quality beyond expectation
            </p>
          </div>
        </div>
      </footer>

      {/* fixed whatsapp */}
      <motion.a
        href="https://wa.me/201001234567"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        className="fixed bottom-5 right-5 z-50 w-[56px] h-[56px] md:w-[60px] md:h-[60px] rounded-full bg-[#1a9e61] text-white grid place-items-center shadow-[0_12px_30px_hsl(140_70%_30%/0.35)] border-2 border-white hover:scale-105 transition-transform animate-pulse-gold"
        aria-label="whatsapp"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      </motion.a>
    </div>
  );
}
