import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, MessageCircleHeart } from 'lucide-react';

const testimonialsData = {
  badge: 'Testimonios',
  title: 'Lo que dicen nuestros clientes',
  text: 'La confianza de nuestros clientes es nuestro mejor respaldo. Estas opiniones reflejan la rapidez, cercanía y calidad con la que trabajamos en cada operación.',
  items: [
    {
      name: 'María González',
      role: 'Cliente particular',
      quote:
        'La atención fue rápida y muy cercana. Encontré productos en excelente estado y a muy buen precio. Sin duda repetiré.',
      accent: 'from-[#dff4ff] via-[#f5fbff] to-white',
    },
    {
      name: 'Carlos Herrera',
      role: 'Comprador habitual',
      quote:
        'Me sorprendió la variedad de mercancía y la claridad en todo el proceso. Se nota la experiencia y el trato profesional.',
      accent: 'from-[#efe5ff] via-[#faf7ff] to-white',
    },
    {
      name: 'Lucía Fernández',
      role: 'Cliente empresa',
      quote:
        'Trabajar con Outlet Stock nos permitió encontrar soluciones rápidas para nuestro negocio. Servicio ágil, serio y totalmente recomendable.',
      accent: 'from-[#ffe8d8] via-[#fff7f2] to-white',
    },
    {
      name: 'Javier Morales',
      role: 'Cliente frecuente',
      quote:
        'Siempre encuentro muy buena atención y productos a precios competitivos. El proceso es rápido y transmite mucha confianza.',
      accent: 'from-[#e4f7ec] via-[#f8fff9] to-white',
    },
    {
      name: 'Ana Ruiz',
      role: 'Compradora satisfecha',
      quote:
        'Me encantó la claridad con la que me ayudaron en todo momento. Servicio amable, variedad y una experiencia muy positiva.',
      accent: 'from-[#e7f0ff] via-[#f8fbff] to-white',
    },
  ],
};

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

type TestimonialItem = (typeof testimonialsData.items)[number];

function getTestimonialDelay(idx: number): number {
  return idx * 0.1;
}

function runDevChecks() {
  console.assert(testimonialsData.items.length === 5, 'Expected 5 testimonial cards');
  console.assert(getTestimonialDelay(0) === 0, 'First testimonial delay should be 0');
  console.assert(getTestimonialDelay(2) === 0.2, 'Third testimonial delay should be 0.2');
  console.assert(testimonialsData.items[0].name === 'María González', 'First testimonial name mismatch');
  console.assert(testimonialsData.items[1].role === 'Comprador habitual', 'Second testimonial role mismatch');
}

runDevChecks();

function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl xl:text-6xl">
      <span className="relative inline-block isolate" style={{ lineHeight: 1.06 }}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 text-white/60"
          style={{ transform: 'translate(0px, 3px)', filter: 'blur(8px)' }}
        >
          {title}
        </span>
        <span className="relative z-10 bg-[linear-gradient(90deg,#0D1561_0%,#1656A0_34%,#159FBC_70%,#C5146B_100%)] bg-clip-text text-transparent">
          {title}
        </span>
      </span>
    </h2>
  );
}

function RatingStars() {
  return (
    <div className="flex items-center gap-1.5 text-[#F58617]">
      <Star className="h-4 w-4 fill-current" />
      <Star className="h-4 w-4 fill-current" />
      <Star className="h-4 w-4 fill-current" />
      <Star className="h-4 w-4 fill-current" />
      <Star className="h-4 w-4 fill-current" />
    </div>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <motion.div
      key={item.name}
      initial={{ opacity: 0, y: 46, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -46, scale: 0.985 }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[30px] border border-white/70 bg-white/90 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur"
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-95`} />
      <div className="pointer-events-none absolute right-[-8%] top-[-10%] h-28 w-28 rounded-full bg-white/70 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="inline-flex rounded-[22px] bg-[#1656A0]/10 p-3 text-[#1656A0]">
            <Quote className="h-5 w-5" />
          </div>
          <RatingStars />
        </div>

        <p className="text-[16px] leading-8 text-slate-700">“{item.quote}”</p>

        <div className="mt-7 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0D1561] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(13,21,97,0.18)]">
            {item.name.charAt(0)}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-950">{item.name}</p>
            <p className="text-sm text-slate-500">{item.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RotatingTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.items.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const activeItem = testimonialsData.items[activeIndex];

  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 h-14 w-[88%] -translate-x-1/2 rounded-[26px] bg-white/45 blur-xl" />
      <div className="absolute left-1/2 top-4 h-14 w-[78%] -translate-x-1/2 rounded-[26px] bg-white/35 blur-lg" />

      <div className="relative min-h-[340px]">
        <AnimatePresence mode="wait">
          <TestimonialCard key={activeItem.name} item={activeItem} />
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SectionFour() {
  return (
    <main className="bg-[#F5F7FB] text-slate-900">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(197,20,107,0.16),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(197,20,107,0.18),transparent_40%),linear-gradient(135deg,rgba(13,21,97,0.05)_0%,rgba(21,159,188,0.06)_36%,rgba(245,134,23,0.07)_100%)]" />

        <div className="relative mx-auto max-w-[1600px] px-4 md:px-6 lg:px-10 xl:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:items-start">
            <FadeIn>
              <div className="max-w-2xl xl:max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.48, ease: 'easeOut' }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#C5146B]/35 bg-[#C5146B]/12 px-4 py-1.5 text-sm font-semibold text-[#C5146B] shadow-[0_0_22px_rgba(197,20,107,0.12)]"
                >
                  <MessageCircleHeart className="h-4 w-4" />
                  {testimonialsData.badge}
                </motion.div>

                <SectionTitle title={testimonialsData.title} />

                <p className="mt-6 max-w-2xl text-[1.04rem] font-medium italic leading-[2.02] tracking-[0.01em] text-[#5B6270] md:text-[1.12rem] xl:text-[1.18rem] [font-family:Georgia,'Times_New_Roman',serif] [text-shadow:0_1px_0_rgba(255,255,255,0.35)]">
                  {testimonialsData.text}
                </p>
              </div>
            </FadeIn>

            <div className="lg:pl-4 xl:pl-8 pt-6 lg:pt-10">
              <RotatingTestimonials />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
