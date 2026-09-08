import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shirt, Dumbbell, ChefHat, Home, WashingMachine, Sparkles } from 'lucide-react';

const categoriesData = {
  badge: 'Servicios',
  title: 'Categorías destacadas',
  text: 'Explora nuestras categorías destacadas y encuentra productos seleccionados para tu día a día: moda, calzado, hogar, cocina, electrodomésticos e higiene personal. Variedad, calidad y oportunidades en un solo lugar.',
  items: [
    { title: 'Ropa Casual', description: 'Moda para señora y caballero.', tag: 'Moda' },
    { title: 'Ropa Deporte', description: 'Prendas técnicas para actividades deportivas.', tag: 'Deporte' },
    { title: 'Calzado Casual', description: 'Calzado cómodo para diario.', tag: 'Calzado' },
    { title: 'Menaje Cocina', description: 'Todo para cocinar con calidad.', tag: 'Hogar' },
    { title: 'Menaje Hogar', description: 'Artículos esenciales para tu hogar.', tag: 'Casa' },
    { title: 'Electrodomésticos', description: 'Grandes y pequeños electrodomésticos.', tag: 'Electro' },
    { title: 'Higiene Personal', description: 'Cuidado personal y belleza.', tag: 'Beauty' },
  ],
};

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

type CategoryItem = {
  title: string;
  description: string;
  tag: string;
};

type VisualConfig = {
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  accent: string;
  secondary: string;
};

function ShoeIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m15 10.42 4.8-5.07" />
      <path d="M19 18h3" />
      <path d="M9.5 22 21.414 9.415A2 2 0 0 0 21.2 6.4l-5.61-4.208A1 1 0 0 0 14 3v2a2 2 0 0 1-1.394 1.906L8.677 8.053A1 1 0 0 0 8 9c-.155 6.393-2.082 9-4 9a2 2 0 0 0 0 4h14" />
    </svg>
  );
}

function getCategoryDelay(idx: number): number {
  return idx * 0.09;
}

function getVisualConfig(title: string): VisualConfig {
  switch (title) {
    case 'Ropa Casual':
      return {
        icon: Shirt,
        gradient: 'from-[#cfe7ff] via-[#f6fbff] to-transparent',
        accent: 'bg-[#8bbcf5]',
        secondary: 'bg-[#dbeafe]',
      };
    case 'Ropa Deporte':
      return {
        icon: Dumbbell,
        gradient: 'from-[#d7f8ef] via-[#f4fffb] to-transparent',
        accent: 'bg-[#61d2b0]',
        secondary: 'bg-[#d6faef]',
      };
    case 'Calzado Casual':
      return {
        icon: ShoeIcon,
        gradient: 'from-[#efe2ff] via-[#fbf7ff] to-transparent',
        accent: 'bg-[#b798ea]',
        secondary: 'bg-[#efe4ff]',
      };
    case 'Menaje Cocina':
      return {
        icon: ChefHat,
        gradient: 'from-[#ffe6cf] via-[#fff8f2] to-transparent',
        accent: 'bg-[#f6ab62]',
        secondary: 'bg-[#ffe8d3]',
      };
    case 'Menaje Hogar':
      return {
        icon: Home,
        gradient: 'from-[#dff2ff] via-[#f6fbff] to-transparent',
        accent: 'bg-[#84bfe4]',
        secondary: 'bg-[#dff2ff]',
      };
    case 'Electrodomésticos':
      return {
        icon: WashingMachine,
        gradient: 'from-[#dbe7ff] via-[#f7faff] to-transparent',
        accent: 'bg-[#7e9ee8]',
        secondary: 'bg-[#dde8ff]',
      };
    default:
      return {
        icon: Sparkles,
        gradient: 'from-[#ffe0ef] via-[#fff6fb] to-transparent',
        accent: 'bg-[#ee8cb9]',
        secondary: 'bg-[#ffe3f0]',
      };
  }
}

function runDevChecks() {
  console.assert(getCategoryDelay(0) === 0, 'Delay for first card should be 0');
  console.assert(getCategoryDelay(1) === 0.09, 'Delay for second card should be 0.09');
  console.assert(getCategoryDelay(3) === 0.27, 'Delay for fourth card should be 0.27');
  console.assert(categoriesData.items.length === 7, 'Expected 7 category cards');
  console.assert(categoriesData.items[2].title === 'Calzado Casual', 'Third card should be Calzado Casual');
  console.assert(getVisualConfig('Ropa Casual').icon === Shirt, 'Ropa Casual should use Shirt icon');
  console.assert(getVisualConfig('Electrodomésticos').icon === WashingMachine, 'Electrodomésticos should use WashingMachine icon');
  console.assert(getVisualConfig('Calzado Casual').icon === ShoeIcon, 'Calzado Casual should use ShoeIcon');
  console.assert(getVisualConfig('Otro').icon === Sparkles, 'Fallback icon should be Sparkles');
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

function CategoryVisual({ title }: { title: string }) {
  const { icon: Icon, gradient, accent, secondary } = getVisualConfig(title);

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] overflow-hidden">
      <div className={`absolute inset-y-0 right-0 w-full bg-gradient-to-l ${gradient}`} />
      <div className="absolute inset-y-0 left-0 w-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.98),rgba(255,255,255,0.86),rgba(255,255,255,0.22),rgba(255,255,255,0))]" />

      <div className="absolute right-[-12%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/70 blur-2xl" />
      <div className={`absolute right-6 top-8 h-16 w-16 rounded-[22px] ${secondary} opacity-95 shadow-[0_16px_30px_rgba(255,255,255,0.45)]`} />
      <div className={`absolute right-16 top-24 h-24 w-24 rounded-[28px] ${accent} opacity-80`} />
      <div className={`absolute bottom-6 right-10 h-14 w-14 rounded-2xl ${secondary} opacity-95`} />

      <div className="absolute inset-y-0 right-5 flex items-center justify-center">
        <div className="rounded-[28px] bg-white/72 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur-sm ring-1 ring-white/60">
          <Icon className="h-10 w-10 text-slate-700" />
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ item, idx }: { item: CategoryItem; idx: number }) {
  return (
    <div className="overflow-hidden rounded-[30px]">
      <motion.div
        initial={{ opacity: 0, y: 72, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.72, delay: getCategoryDelay(idx), ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.34))]" />
        <CategoryVisual title={item.title} />
        <motion.div
          aria-hidden="true"
          animate={{ x: ['-180%', '220%'], opacity: [0, 0, 0.9, 0] }}
          transition={{
            duration: 1.35,
            times: [0, 0.14, 0.48, 1],
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 2.2 + idx * 0.08,
          }}
          className="pointer-events-none absolute -inset-y-10 left-0 z-20 w-24 rotate-[22deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.28)_18%,rgba(255,255,255,0.98)_50%,rgba(255,255,255,0.28)_82%,rgba(255,255,255,0)_100%)] blur-[1px]"
        />

        <div className="relative z-10 flex h-full w-[64%] flex-col p-6 pr-4">
          <div className="mb-5 flex items-center justify-between gap-4">
            <span className="inline-flex items-center rounded-full bg-[#1656A0] px-4 py-1.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(22,86,160,0.18)]">
              {item.tag}
            </span>
          </div>

          <h3 className="text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
          <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">{item.description}</p>
        </div>
      </motion.div>
    </div>
  );
}

function CategoriesTitle({ title }: { title: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      setShowCursor(false);
      return;
    }

    setDisplayedText('');
    setShowCursor(true);

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayedText(title.slice(0, index));

      if (index >= title.length) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setShowCursor(false);
        }, 1200);
      }
    }, 52);

    return () => window.clearInterval(timer);
  }, [isActive, title]);

  return (
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      viewport={{ once: false, amount: 0.55 }}
      onViewportEnter={() => setIsActive(true)}
      onViewportLeave={() => setIsActive(false)}
      transition={{ duration: 0.45 }}
      className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl xl:text-6xl"
    >
      <span className="relative inline-block isolate" style={{ lineHeight: 1.08 }}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 text-white/55"
          style={{
            transform: 'translate(0px, 3px)',
            filter: 'blur(8px)',
          }}
        >
          {displayedText || title}
        </span>

        <span className="relative z-10 bg-[linear-gradient(90deg,#0D1561_0%,#1656A0_34%,#159FBC_68%,#C5146B_100%)] bg-clip-text text-transparent">
          {displayedText}
          {showCursor && <span className="ml-1 text-[#1656A0]">|</span>}
        </span>
      </span>
    </motion.h2>
  );
}

export function SectionTwo() {
  return (
    <main className="bg-[#F5F7FB] text-slate-900 transition-colors duration-300">
      <section id="servicios" className="relative scroll-mt-24 overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(13,21,97,0.08),transparent_28%),radial-gradient(circle_at_100%_100%,rgba(245,134,23,0.14),transparent_30%),linear-gradient(135deg,rgba(13,21,97,0.05)_0%,rgba(21,159,188,0.06)_34%,rgba(204,215,31,0.08)_66%,rgba(245,134,23,0.10)_100%)]" />

        <div className="relative mx-auto max-w-[1600px] px-4 md:px-6 lg:px-10 xl:px-14">
          <FadeIn className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.48, ease: 'easeOut' }}
              className="inline-flex items-center rounded-full bg-[#F58617]/10 px-4 py-1.5 text-sm font-semibold text-[#C5146B] ring-1 ring-[#F58617]/15 shadow-[0_0_28px_rgba(197,20,107,0.30)]"
            >
              {categoriesData.badge}
            </motion.div>

            <CategoriesTitle title={categoriesData.title} />

            <p className="mt-6 max-w-3xl text-[1.05rem] font-medium italic leading-[2.05] tracking-[0.01em] text-[#6B4E8A] md:text-[1.16rem] xl:text-[1.22rem] [font-family:Georgia,'Times_New_Roman',serif] [text-shadow:0_1px_0_rgba(255,255,255,0.35)]">
              {categoriesData.text}
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categoriesData.items.map((item, idx) => (
              <CategoryCard key={item.title} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
