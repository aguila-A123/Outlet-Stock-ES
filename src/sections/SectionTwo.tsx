import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
  image: string;
};

function getCategoryDelay(idx: number): number {
  return idx * 0.09;
}

function getVisualConfig(title: string): VisualConfig {
  switch (title) {
    case 'Ropa Casual':
      return {
        image: 'https://iili.io/nTUZAbt.jpg',
      };
    case 'Ropa Deporte':
      return {
        image: 'https://iili.io/nTgQ2Lu.jpg',
      };
    case 'Calzado Casual':
      return {
        image: 'https://iili.io/nTgbdyQ.jpg',
      };
    case 'Menaje Cocina':
      return {
        image: 'https://iili.io/nTrPU8B.md.jpg',
      };
    case 'Menaje Hogar':
      return {
        image: 'https://iili.io/nTrQygf.jpg',
      };
    case 'Electrodomésticos':
      return {
        image: 'https://iili.io/nT42r12.jpg',
      };
    default:
      return {
        image: 'https://iili.io/nT4KtXs.jpg',
      };
  }
}

function runDevChecks() {
  console.assert(getCategoryDelay(0) === 0, 'Delay for first card should be 0');
  console.assert(getCategoryDelay(1) === 0.09, 'Delay for second card should be 0.09');
  console.assert(getCategoryDelay(3) === 0.27, 'Delay for fourth card should be 0.27');
  console.assert(categoriesData.items.length === 7, 'Expected 7 category cards');
  console.assert(categoriesData.items[2].title === 'Calzado Casual', 'Third card should be Calzado Casual');
  console.assert(getVisualConfig('Ropa Casual').image.includes('nTUZAbt'), 'Ropa Casual should use its requested image');
  console.assert(getVisualConfig('Electrodomésticos').image.includes('nT42r12'), 'Electrodomésticos should use its requested image');
  console.assert(getVisualConfig('Calzado Casual').image.includes('nTgbdyQ'), 'Calzado Casual should use its requested image');
  console.assert(getVisualConfig('Otro').image.includes('nT4KtXs'), 'Fallback should use the Higiene Personal image');
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
  const { image } = getVisualConfig(title);

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 overflow-hidden"
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '48%', borderTopRightRadius: 30, borderBottomRightRadius: 30 }}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-y-0 right-0"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />
      <div
        className="absolute inset-0"
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.82) 18%, rgba(255,255,255,0.28) 52%, rgba(255,255,255,0) 78%)' }}
      />
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
        className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur"
        style={{ borderColor: 'rgba(22, 86, 160, 0.15)' }}
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
