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
  ArrowUpLeft,
  Quote,
  Stars,
  BadgeCheck,
  Timer,
  Gem,
  Play,
  ArrowLeft,
  Menu,
  X,
  Star,
  ChevronLeft,
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
  { id: "about", label: "من نحن" },
  { id: "services", label: "خدماتنا" },
  { id: "before-after", label: "سابقة الأعمال" },
  { id: "process", label: "خطوات العمل" },
  { id: "contact", label: "تواصل" },
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
    <div className="min-h-screen bg-background selection:bg-accent/20">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX, transformOrigin: "right" }}
        className="fixed top-0 inset-x-0 h-[2.5px] bg-gradient-to-l from-accent via-accent to-amber-300 z-[60] origin-right"
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
              <span className="hidden sm:flex flex-col leading-none text-right">
                <span className="text-[13px] md:text-[14px] font-extrab800 font-bold tracking-tight text-foreground">المهندس أحمد جوده</span>
                <span className="text-[10.5px] font-bold tracking-[0.12em] text-accent">LUXURY FINISHING</span>
              </span>
              <span className="sm:hidden text-[13px] font-extrabold text-foreground">أحمد جوده</span>
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
                <MessageCircle className="w-4 h-4" /> واتساب
              </a>
              <button onClick={scrollToContact} className="hidden sm:inline-flex btn-gold px-5 md:px-6 py-[10px] md:py-2.5 text-[13px]">
                اطلب معاينة
                <ArrowUpLeft className="w-3.5 h-3.5 -scale-x-100" />
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
                    className="text-right px-4 py-3.5 rounded-2xl text-sm font-semibold hover:bg-muted transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
                <div className="grid grid-cols-2 gap-2 p-2">
                  <a href="https://wa.me/201001234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#0a3320] text-white text-sm font-bold">
                    <MessageCircle className="w-4 h-4" /> واتساب
                  </a>
                  <button onClick={scrollToContact} className="btn-gold py-3 text-sm font-bold">اطلب معاينة</button>
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
          <div className="absolute inset-0 bg-gradient-to-l from-[#0b1c33]/90 via-[#0f2747]/78 to-[#0b1c33]/55 md:from-[#0b1c33]/88 md:via-[#0f2747]/68 md:to-[#0f2747]/28" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060f1f]/40 via-transparent to-transparent" />
          {/* mesh dots */}
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(hsl(44 70% 50%) 1.1px, transparent 1.1px)", backgroundSize: "22px 22px" }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="absolute top-24 left-6 md:left-10 w-64 h-64 bg-accent/20 rounded-full blur-[70px] pointer-events-none hidden md:block" />
        <motion.div style={{ opacity: heroOpacity }} className="absolute -bottom-12 -right-12 w-[420px] h-[420px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative container mx-auto px-4 md:px-6 pt-[84px] md:pt-8 pb-8 md:pb-10">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-8 md:gap-8 items-center">
            {/* text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } }}
              className="text-right"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="inline-flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-full glass-dark text-white/90 text-xs font-bold tracking-wide mb-4 md:mb-5"
              >
                <span className="w-7 h-7 grid place-items-center rounded-full bg-accent text-accent-foreground">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="hidden sm:inline">تشطيبات فاخرة — تسليم على الوقت — ضمان مكتوب</span>
                <span className="sm:hidden">تسليم على الوقت • ضمان 12 شهر</span>
                <span className="hidden sm:inline-flex w-8 h-8 rounded-full bg-white/10 grid place-items-center">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </span>
              </motion.div>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1] } } }}
                className="display-heading text-[34px] sm:text-[42px] md:text-[54px] lg:text-[60px] text-white leading-[0.95]"
              >
                حوّل شقتك
                <br />
                <span className="font-light italic tracking-tight" style={{ fontFamily: "Cormorant Garamond, Cairo, serif" }}>
                  لتحفة فنية
                </span>
                <br />
                <span className="text-gradient-gold inline-block pb-1">تسكنها بفخر</span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="mt-4 md:mt-5 text-[15px] md:text-[17px] leading-7 md:leading-8 text-white/80 font-medium max-w-[560px] text-balance"
              >
                نحن لا نشطّب حوائط فقط — نصنع مساحات تنبض بالذوق. إشراف هندسي كامل، خامات أصلية، وعقد واضح يحمي حقك حتى التسليم.
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <button onClick={scrollToContact} className="btn-gold px-7 md:px-8 py-3.5 md:py-4 text-[14px] md:text-[15px]">
                  <span className="w-8 h-8 rounded-full bg-[hsl(215_66%_10%/0.95)] text-white grid place-items-center">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </span>
                  احجز معاينة مجانية
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollToProjects}
                  className="inline-flex items-center gap-2.5 px-6 md:px-7 py-3.5 md:py-4 rounded-full bg-white text-foreground text-[14px] font-bold border border-white/60 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <span className="w-8 h-8 rounded-full bg-accent/15 border border-accent/20 grid place-items-center">
                    <Eye className="w-4 h-4 text-accent" />
                  </span>
                  شوف قبل / بعد
                </button>
              </motion.div>

              {/* proof */}
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } } }}
                className="mt-7 md:mt-8 flex flex-wrap items-center gap-4 md:gap-6"
              >
                <div className="flex items-center gap-3 glass-dark rounded-full pl-5 pr-2 py-1.5">
                  <div className="flex -space-x-2 space-x-reverse">
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
                  <div className="text-right">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-[11px] font-bold text-white/85">ثقة 150+ أسرة • 4.9/5</p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-6 text-white/90">
                  <span className="flex items-center gap-2 text-xs font-bold">
                    <span className="w-7 h-7 rounded-full bg-white/10 grid place-items-center">
                      <BadgeCheck className="w-3.5 h-3.5" />
                    </span>
                    عقود موثقة
                  </span>
                  <span className="flex items-center gap-2 text-xs font-bold">
                    <span className="w-7 h-7 rounded-full bg-white/10 grid place-items-center">
                      <Timer className="w-3.5 h-3.5" />
                    </span>
                    خلال 48 ساعة المعاينة
                  </span>
                </div>
              </motion.div>

              {/* trust pills under */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                className="mt-5 hidden md:flex flex-wrap gap-2"
              >
                <TrustBadge icon={Award} text="150+ مشروع ناجح" variant="gold" />
                <TrustBadge icon={BadgeCheck} text="التزام زمني بعقد" variant="glass" />
                <TrustBadge icon={Shield} text="ضمان 12 شهر مكتوب" variant="glass" />
              </motion.div>
            </motion.div>

            {/* visual */}
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="relative lg:pl-2"
            >
              <div className="relative rounded-[2rem] md:rounded-[2.2rem] overflow-hidden border border-white/15 shadow-[0_20px_60px_hsl(215_66%_10%/0.35)] bg-white p-2 md:p-2.5">
                <div className="relative rounded-[1.6rem] overflow-hidden aspect-[4/3.4] md:aspect-[4/3.55] bg-stone-100">
                  <img src={livingBeforeAfter} alt="قبل وبعد" className="absolute inset-0 w-full h-full object-cover" />
                  {/* top labels */}
                  <div className="absolute top-3 md:top-4 inset-x-3 md:inset-x-4 flex justify-between">
                    <span className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-extrabold shadow-md">بعد ✨ فاخر</span>
                    <span className="px-3 py-1.5 rounded-full glass-dark text-white text-xs font-bold">قبل • خام</span>
                  </div>
                  {/* bottom glass info */}
                  <div className="absolute bottom-3 inset-x-3 md:bottom-4 md:inset-x-4 glass-strong rounded-2xl p-3 md:p-4 flex items-center justify-between gap-3">
                    <div className="text-right">
                      <p className="text-xs font-bold tracking-[0.12em] text-accent">LIVING ROOM • 180M²</p>
                      <p className="text-sm md:text-[15px] font-extrabold text-foreground leading-tight">صالة معيشة — من خام إلى سوبر لوكس</p>
                      <p className="text-xs font-medium text-muted-foreground">باركيه طبيعي • جبس LED مخفي • دهانات مقاومة</p>
                    </div>
                    <span className="hidden sm:grid w-10 h-10 rounded-full bg-foreground text-background place-items-center shrink-0">
                      <ArrowUpLeft className="w-4 h-4 -scale-x-100" />
                    </span>
                  </div>
                </div>

                {/* floating card — price */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-2 md:-left-4 top-[14%] glass-strong rounded-2xl px-3.5 py-3 flex items-center gap-3 shadow-xl hidden sm:flex"
                >
                  <span className="w-10 h-10 rounded-full gradient-navy grid place-items-center text-white">
                    <Gem className="w-5 h-5" />
                  </span>
                  <div className="text-right">
                    <p className="text-[11px] font-bold tracking-wide text-muted-foreground">ابتداءً من</p>
                    <p className="text-sm font-extrabold text-foreground">850 جنيه / المتر</p>
                    <p className="text-[11px] font-semibold text-emerald-600">شامل الخامات والإشراف</p>
                  </div>
                </motion.div>

                {/* floating card — warranty */}
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  className="absolute -right-2 md:-right-3 bottom-[18%] glass-strong rounded-2xl px-3.5 py-3 flex items-center gap-3 shadow-xl hidden md:flex"
                >
                  <span className="w-10 h-10 rounded-full bg-emerald-600 text-white grid place-items-center">
                    <Shield className="w-5 h-5" />
                  </span>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-foreground">ضمان 12 شهر مكتوب</p>
                    <p className="text-[11px] font-medium text-muted-foreground">صيانة مجانية • عقد واضح</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </motion.div>
              </div>

              {/* under stats */}
              <div className="mt-3 md:mt-4 grid grid-cols-3 gap-2 md:gap-3">
                {[
                  { v: 15, s: "+", l: "سنة خبرة" },
                  { v: 150, s: "+", l: "مشروع منجز" },
                  { v: 98, s: "%", l: "رضا العملاء" },
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
                  "تشطيبات فاخرة",
                  "تسليم على الوقت",
                  "ضمان مكتوب",
                  "خامات أصلية",
                  "إشراف هندسي",
                  "عقد واضح",
                  "متابعة يومية",
                  "جودة 5 نجوم",
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
                  "تشطيبات فاخرة",
                  "تسليم على الوقت",
                  "ضمان مكتوب",
                  "خامات أصلية",
                  "إشراف هندسي",
                  "عقد واضح",
                  "متابعة يومية",
                  "جودة 5 نجوم",
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
              { icon: Eye, title: "معاينة مجانية خلال 48 ساعة", desc: "زيارة ميدانية + مقايسة دقيقة بدون التزام" },
              { icon: Shield, title: "ضمان حتى 12 شهر", desc: "عقد مكتوب يغطي كل البنود والتشطيبات" },
              { icon: CreditCard, title: "دفع مرن حسب الإنجاز", desc: "مقدم بسيط + دفعات مرتبطة بجدول زمني" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3.5">
                <span className="w-10 h-10 rounded-full bg-accent text-accent-foreground grid place-items-center shrink-0">
                  <f.icon className="w-5 h-5" />
                </span>
                <div className="text-right">
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
          <div className="max-w-[1120px] mx-auto grid lg:grid-cols-[1.06fr_0.94fr] gap-10 md:gap-12 items-center">
            {/* image */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="order-1 lg:order-2 relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-3 md:-inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/20 via-transparent to-primary/10 blur-xl" />
                <div className="relative w-[300px] h-[380px] md:w-[360px] md:h-[460px] rounded-[2rem] overflow-hidden border-[6px] border-white shadow-[0_18px_40px_hsl(215_66%_14%/0.18)] bg-white">
                  <img src={ahmedGoudaPhoto} alt="المهندس أحمد جوده" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/18 via-transparent to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <div className="glass-strong rounded-2xl px-4 py-3 flex items-center justify-between">
                      <div className="text-right">
                        <p className="text-sm font-extrabold text-foreground">المهندس أحمد جوده</p>
                        <p className="text-xs font-semibold text-accent">مؤسس ومدير المشاريع • إشراف مباشر</p>
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
                  className="absolute -top-4 -left-2 md:-left-6 glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
                >
                  <span className="w-10 h-10 rounded-full bg-emerald-600 text-white grid place-items-center">
                    <Award className="w-5 h-5" />
                  </span>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-foreground leading-none">تقييم 4.9/5</p>
                    <p className="text-[11px] font-medium text-muted-foreground">من 150+ عميل</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute -bottom-3 -right-2 md:-right-6 glass-strong rounded-2xl p-3 text-center shadow-xl hidden sm:block"
                >
                  <p className="text-[11px] font-bold tracking-wide text-muted-foreground">مناطق الخدمة</p>
                  <p className="text-xs font-extrabold text-foreground">التجمع • زايد • المعادي • مدينة نصر</p>
                </motion.div>
              </div>
            </motion.div>

            {/* text */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="order-2 lg:order-1 text-right"
            >
              <div className="section-eyebrow mb-3">من نحن — القصة والالتزام</div>
              <h2 className="display-heading text-[30px] md:text-[40px] text-foreground leading-tight">
                خبرة 15 عامًا
                <br />
                <span className="text-gradient-gold">نحوّل الفراغ لبيت تحبه</span>
              </h2>
              <div className="mt-5 space-y-4 text-[14px] md:text-[15px] leading-7 md:leading-8 text-muted-foreground font-medium">
                <p>
                  مهندس مدني تخصص تشطيبات فاخرة، بدأ الرحلة في كبرى شركات المقاولات ثم أسس شركته الخاصة ليقدّم
                  <span className="text-foreground font-bold"> جودة مضمونة، التزام زمني، وعقود شفافة</span> بلا مفاجآت.
                </p>
                <p>
                  أشرف شخصيًا على <span className="text-foreground font-bold">150+ مشروع</span> في القاهرة الجديدة، التجمع الخامس، الشيخ زايد والمعادي — كل مشروع شهادة على التفاصيل، النظافة، والمتابعة اليومية.
                </p>
                <p className="hidden md:block">
                  نختار الخامات الأصلية، نضبط كل ميول وسباكة وكهرباء طبقًا للكود، ونسلمك مفتاحًا لبيت جاهز للسكن بإضاءة مدروسة وتشطيب سوبر لوكس يدوم.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  { k: "سنة خبرة", v: 15, s: "+" },
                  { k: "مشروع منجز", v: 150, s: "+" },
                  { k: "شهر ضمان", v: 12, s: "" },
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
                  احجز معاينة الآن
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button onClick={() => scrollTo("before-after")} className="btn-ghost-gold px-6 py-3 text-sm">
                  استعرض الأعمال
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
              خدماتنا المتكاملة
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-3 display-heading text-[28px] md:text-[40px] text-foreground"
            >
              كل ما تحتاجه… <span className="text-gradient-gold">على المفتاح</span>
            </motion.h2>
            <p className="mt-3 text-sm md:text-[15px] leading-7 text-muted-foreground font-medium">
              إدارة واحدة، جودة واحدة، جدول زمني واحد — من التصميم حتى التسليم بمفتاح بيتك.
            </p>
          </div>

          <div className="mt-10 max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            <ServiceCard index={0} icon={Wrench} title="تشطيبات كاملة على المفتاح" description="تنفيذ شامل من الألف للياء بإدارة موحدة — راحة بالك أولويتنا." />
            <ServiceCard index={1} icon={Zap} title="سباكة وكهرباء طبقًا للكود" description="لوحات MCB معتمدة، مواسير PPR، وتمديدات مخفية آمنة 100%." />
            <ServiceCard index={2} icon={Palette} title="جبس ودهانات ديكورية" description="أسقف معلقة، كرانيش، وفينيل قابل للغسل بلمسة فندقية." />
            <ServiceCard index={3} icon={Layers} title="أرضيات فاخرة" description="بورسلين، باركيه، وخشب هندسي بتركيب احترافي وضبط ميول." />
            <ServiceCard index={4} icon={UtensilsCrossed} title="مطابخ ووحدات تخزين" description="ألوميتال وMDF بتصميم يخصص لمساحتك وتخزين ذكي." />
            <ServiceCard index={5} icon={Hammer} title="نجارة وحدادة" description="أبواب مصفحة، شبابيك ألوميوم، وحديد بتشطيب يدوم لسنين." />
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── premium */}
      <section id="before-after" className="py-16 md:py-24 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
          <div className="absolute -top-24 -right-24 w-[560px] h-[560px] bg-accent/10 rounded-full blur-[90px]" />
          <div className="absolute -bottom-32 -left-32 w-[520px] h-[520px] bg-white/5 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-accent text-xs font-bold tracking-wide">
              <Stars className="w-3.5 h-3.5" /> سابقة أعمال حقيقية — قبل وبعد
            </div>
            <h2 className="mt-4 display-heading text-[28px] md:text-[44px] text-white leading-tight">شوف الفرق بنفسك</h2>
            <p className="mt-3 text-sm md:text-[15px] leading-7 text-white/65 font-medium">
              مشاريع مصورة <span className="text-white font-bold">قبل / بعد</span> — اسحب الشريط لتقارن الجودة والتفاصيل بنفسك.
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
              <ImageComparisonSlider beforeImage={beforeKitchen} afterImage={afterKitchen} beforeAlt="مطبخ قبل" afterAlt="مطبخ بعد" />
              <div className="px-2 md:px-3 py-4 text-right">
                <h3 className="text-white font-extrabold text-[15px]">المطبخ — من هيكل خرساني لمطبخ عملي فاخر</h3>
                <p className="text-white/60 text-xs font-medium mt-1 leading-6">وحدات علوية وسفلية، رخام، وإضاءة مهام — تنفيذ 21 يوم</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="rounded-[1.6rem] p-2 bg-white/5 border border-white/10 backdrop-blur"
            >
              <ImageComparisonSlider beforeImage={beforeLiving} afterImage={afterLiving} beforeAlt="صالة قبل" afterAlt="صالة بعد" />
              <div className="px-2 md:px-3 py-4 text-right">
                <h3 className="text-white font-extrabold text-[15px]">الصالة — تحويل كامل بإضاءة مخفية</h3>
                <p className="text-white/60 text-xs font-medium mt-1 leading-6">جبس LED، باركيه، ودهانات هادئة — تسليم مفتاح</p>
              </div>
            </motion.div>
          </div>

          {/* cards grid */}
          <div className="mt-8 max-w-[1060px] mx-auto grid md:grid-cols-2 gap-6 md:gap-7">
            {[
              {
                img: bedroomBeforeAfter,
                title: "غرفة النوم — هدوء سوبر لوكس",
                desc: "من غرفة غير مكتملة إلى ملاذ هادئ بلمسات خشب طبيعي",
                bullets: ["دهانات صديقة للبيئة", "أرضيات خشب طبيعي", "كهرباء مخفية"],
              },
              {
                img: diningBeforeAfter,
                title: "السفرة — كلاسيكية راقية",
                desc: "من خرسانة خام إلى سفرة بثريا كريستال وورق حائط",
                bullets: ["أرضيات فاخرة", "ورق حائط ديكوري", "إضاءة كريستال"],
              },
              {
                img: hallwayBeforeAfter,
                title: "المدخل والطرقة — ترحيب فاخر",
                desc: "تحويل مدخل بأسلاك مكشوفة إلى مدخل يبهر ضيوفك",
                bullets: ["أبواب ماسيف", "باركيه", "إضاءة مخفية"],
              },
              {
                img: bathroomBeforeAfter,
                title: "الحمام — فندقي بامتياز",
                desc: "من حمام غير مكتمل إلى حمام رخامي بكابينة زجاجية",
                bullets: ["رخام أبيض", "كابينة شاور", "سباكة مخفية"],
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
                  <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white text-foreground text-xs font-extrabold shadow">قبل / بعد</span>
                  <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full glass-dark text-white text-xs font-bold hidden sm:inline-flex">
                    {p.bullets[0]} • {p.bullets[1]}
                  </span>
                </div>
                <div className="p-5 md:p-6 text-right">
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
              احجز معاينتك المجانية <ArrowLeft className="w-4 h-4" />
            </button>
            <a href="https://wa.me/201001234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-foreground font-bold text-sm border border-white/60 hover:bg-stone-50 transition-colors">
              <MessageCircle className="w-4 h-4" /> تحدث معنا واتساب
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 mesh-gold opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-eyebrow justify-center">آراء عملائنا</div>
            <h2 className="mt-3 display-heading text-[28px] md:text-[40px] text-foreground">عملاء يتحدثون عن <span className="text-gradient-gold">الالتزام</span></h2>
            <p className="mt-3 text-sm md:text-[15px] text-muted-foreground font-medium">شهادات موثقة من مشاريع حقيقية — نفس الجودة التي ستحصل عليها.</p>
          </div>

          <div className="mt-10 max-w-[1160px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            <TestimonialCard
              quote="تعاملت مع المهندس أحمد في شقتي بالتجمع. ملتزم بالمواعيد وكان بيبعتلي صور يومية. النتيجة فاقت توقعاتي."
              name="م. خالد عبدالرحمن"
              location="التجمع الخامس"
              projectType="شقة 180م"
            />
            <TestimonialCard
              quote="من أحسن القرارات — شغل نظيف وخامات ممتازة. صادق ومفيش مفاجآت في الميزانية، والضمان أداني ثقة."
              name="د. نورهان السيد"
              location="الشيخ زايد"
              projectType="فيلا 350م"
            />
            <TestimonialCard
              quote="سلّم المحل قبل الموعد بأسبوع! العمال محترمين والموقع نظيف طول التنفيذ. أنصح به بقوة."
              name="أ. محمود فاروق"
              location="مدينة نصر"
              projectType="محل تجاري"
            />
            <TestimonialCard
              quote="ساعدني أختار التصميم لميزانيتي بدون ضغط. التواصل سهل والنتيجة أحلى مما تخيلت."
              name="أ. أحمد حسن"
              location="المعادي"
              projectType="شقة 150م"
            />
            <TestimonialCard
              quote="جربت مقاولين كتير وتجارب سيئة، لكن المهندس أحمد فرق — التزام وكلمة وجودة وسعر عادل."
              name="م. سارة عبدالله"
              location="القاهرة الجديدة"
              projectType="حمام ومطبخ"
            />
            <TestimonialCard
              quote="أنا بالخارج وكنت قلقان، لكن تقارير فيديو أسبوعية وطمأنني وسلّم الشقة كما اتفقنا تمامًا."
              name="أ. ياسر المصري"
              location="التجمع الخامس"
              projectType="شقة 200م عن بُعد"
            />
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-16 md:py-24 bg-muted/25 border-y border-border/50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-eyebrow justify-center">رحلتك معنا</div>
            <h2 className="mt-3 display-heading text-[28px] md:text-[40px] text-foreground">4 خطوات لبيت جاهز</h2>
            <p className="mt-3 text-sm text-muted-foreground font-medium">عملية واضحة — تتابع كل خطوة بصور وفيديو.</p>
          </div>

          <div className="mt-12 max-w-[760px] mx-auto relative">
            {/* vertical line */}
            <div className="absolute right-[28px] md:right-[29px] top-6 bottom-6 w-px bg-border hidden md:block" />
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
              className="absolute right-[28px] md:right-[29px] top-6 bottom-6 w-px bg-accent origin-top hidden md:block"
              style={{ transformOrigin: "top" }}
            />

            <div className="space-y-7 md:space-y-9">
              <ProcessStep index={0} number={1} icon={Eye} title="معاينة مجانية + مقايسة دقيقة" description="زيارة خلال 24–48 ساعة، رفع مقاسات، وتقدير تكلفة ومدة بشفافية كاملة." />
              <ProcessStep index={1} number={2} icon={FileText} title="تصميم وتعاقد شفاف" description="اختيار الخامات والتصميمات، عقد مفصل يضمن حقك والضمانات." />
              <ProcessStep index={2} number={3} icon={Hammer} title="تنفيذ بجدول زمني ومتابعة" description="بداية منظمة، تقارير أسبوعية بالصور والفيديو، وتواصل يومي معك." />
              <ProcessStep index={3} number={4} icon={PackageCheck} title="تسليم مفتاح + ضمان مكتوب" description="تسليم نظيف جاهز للسكن مع ضمان مكتوب وصيانة مجانية." />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 rounded-[1.4rem] bg-foreground text-white p-[1px] overflow-hidden"
            >
              <div className="rounded-[1.35rem] bg-gradient-to-br from-foreground to-[#0f2747] p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-right">
                  <span className="w-11 h-11 rounded-full bg-accent text-accent-foreground grid place-items-center">
                    <Clock className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">متوسط مدة التسليم</p>
                    <p className="text-xs text-white/70 font-medium">شقة 150م — 35 إلى 45 يوم عمل بجدول ملزم</p>
                  </div>
                </div>
                <button onClick={scrollToContact} className="btn-gold px-6 py-3 text-sm shrink-0 w-full md:w-auto">
                  احسب مدتك وتكلفتك
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-12 md:py-20 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute -top-32 -left-32 w-[560px] h-[560px] bg-white/5 rounded-full blur-[90px]" />
        <div className="absolute -bottom-40 -right-40 w-[640px] h-[640px] bg-accent/10 rounded-full blur-[90px]" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-[1120px] mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-right lg:sticky lg:top-28"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-accent text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> جاهز نبدأ؟
              </div>
              <h2 className="mt-4 display-heading text-[30px] md:text-[42px] text-white leading-tight">
                احجز معاينتك
                <br />
                <span className="text-white/90">المجانية الآن</span>
              </h2>
              <p className="mt-3 text-sm md:text-[15px] leading-7 text-white/70 font-medium max-w-[520px]">
                زيارة مجانية بدون أي التزام — نرفع المقاسات، نناقش ذوقك وميزانيتك، ونسلّمك مقايسة واضحة خلال 24 ساعة.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  { icon: Phone, label: "اتصل بنا", value: "01001234567", href: "tel:+201001234567" },
                  { icon: MessageCircle, label: "واتساب مباشر", value: "01001234567", href: "https://wa.me/201001234567" },
                  { icon: Mail, label: "البريد", value: "info@ahmedgouda-finishing.com", href: "mailto:info@ahmedgouda-finishing.com" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 hover:bg-white/10 transition-colors"
                  >
                    <span className="w-10 h-10 rounded-full bg-accent text-accent-foreground grid place-items-center group-hover:scale-105 transition-transform">
                      <c.icon className="w-5 h-5" />
                    </span>
                    <span className="text-right">
                      <span className="block text-[11px] font-bold tracking-wide text-white/60">{c.label}</span>
                      <span className="block text-sm font-extrabold text-white" dir="ltr">
                        {c.value}
                      </span>
                    </span>
                    <ArrowUpLeft className="mr-auto w-4 h-4 text-white/40 group-hover:text-white transition-colors -scale-x-100 hidden sm:block" />
                  </a>
                ))}

                <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5">
                  <span className="w-10 h-10 rounded-full bg-white/10 border border-white/10 grid place-items-center text-white">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <span className="text-right">
                    <span className="block text-[11px] font-bold tracking-wide text-white/60">مناطق الخدمة</span>
                    <span className="block text-sm font-extrabold text-white leading-6">القاهرة الجديدة • التجمع • الشيخ زايد • المعادي • مدينة نصر</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-white/60 text-xs font-bold">
                  <Clock className="w-4 h-4 text-accent" /> السبت – الخميس: ٩ ص – ٦ م • رد خلال ساعتين
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="relative"
            >
              <div className="absolute -inset-2 md:-inset-3 rounded-[1.8rem] bg-accent/10 blur-2xl" />
              <div className="relative bg-white rounded-[1.6rem] md:rounded-[1.8rem] p-5 md:p-7 shadow-[0_20px_60px_hsl(0_0%_0%/0.28)] border border-white/50">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-right">
                    <h3 className="text-[17px] font-extrabold text-foreground">احجز معاينة مجانية</h3>
                    <p className="text-xs font-medium text-muted-foreground mt-1">نرد عليك خلال ساعتين عمل • بدون إزعاج</p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" /> متاح اليوم
                  </span>
                </div>
                <ContactForm />
                <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-bold text-muted-foreground">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" /> بياناتك محمية • نستخدمها فقط لتحديد موعد المعاينة
                </div>
              </div>

              {/* mini trust under form */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { v: "150+", l: "مشروع" },
                  { v: "4.9★", l: "تقييم" },
                  { v: "48س", l: "رد سريع" },
                ].map((x) => (
                  <div key={x.l} className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur text-center py-3">
                    <p className="text-sm font-black text-white">{x.v}</p>
                    <p className="text-[11px] font-bold text-white/70">{x.l}</p>
                  </div>
                ))}
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
              <span className="text-right">
                <span className="block text-sm font-extrabold text-white">المهندس أحمد جوده</span>
                <span className="block text-xs font-bold tracking-[0.12em] text-accent">LUXURY FINISHING • EST 2010</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: "01001234567", href: "tel:+201001234567" },
                { label: "واتساب", href: "https://wa.me/201001234567" },
                { label: "info@ahmedgouda-finishing.com", href: "mailto:info@ahmedgouda-finishing.com" },
              ].map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-medium text-white/45">
            <p>© 2024 شركة المهندس أحمد جوده للتشطيبات الفاخرة. جميع الحقوق محفوظة.</p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" /> صنع بعناية — جودة تفوق التوقعات
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
        className="fixed bottom-5 left-5 z-50 w-[56px] h-[56px] md:w-[60px] md:h-[60px] rounded-full bg-[#1a9e61] text-white grid place-items-center shadow-[0_12px_30px_hsl(140_70%_30%/0.35)] border-2 border-white hover:scale-105 transition-transform animate-pulse-gold"
        aria-label="whatsapp"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      </motion.a>
    </div>
  );
}
