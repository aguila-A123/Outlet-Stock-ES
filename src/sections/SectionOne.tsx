import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Star } from 'lucide-react';

const aboutData = {
  title: 'Acerca de Outlet Stock',
  heading: 'Empresa de compra-venta de mercancías.',
  text: 'Somos una empresa familiar con más de 25 años de experiencia en la compra-venta de mercancías. Con cuatro delegaciones estratégicas en Cantabria, ofrecemos un servicio ágil, cercano y de alta calidad a empresas y particulares.',
  mission:
    'Ofrecer a nuestros clientes productos de calidad al mejor precio, dando una segunda vida a stocks, excedentes y artículos descatalogados.',
  mission2:
    'Trabajamos con rapidez, transparencia y un trato cercano para que cada operación sea sencilla, segura y beneficiosa tanto para empresas como para particulares.',
  vision:
    'Convertirnos en la empresa de referencia en Cantabria y el norte de España en la gestión de mercancías y oportunidades comerciales, impulsando un modelo sostenible, eficiente y accesible.',
  vision2:
    'Permite reducir el desperdicio y maximizar el valor de cada producto.',
  bullets: ['Experiencia y trayectoria', 'Valores familiares y confianza', 'Atención personalizada'],
};

type TypewriterTextProps = {
  text: string;
  className?: string;
  speed?: number;
};

function TypewriterText({ text, className = '', speed = 55 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isInView, setIsInView] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setDisplayedText('');
      setShowCursor(false);
      setIsFinished(false);
      return;
    }

    setDisplayedText('');
    setShowCursor(true);
    setIsFinished(false);

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
        setIsFinished(true);
        window.setTimeout(() => {
          setShowCursor(false);
        }, 1800);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [isInView, text, speed]);

  return (
    <motion.span
      initial={{ opacity: 0.4 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.6 }}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      className={className}
    >
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.55,
            repeat: isFinished ? 2 : Infinity,
            ease: 'easeInOut',
          }}
          className="ml-1 inline-block text-[#1656A0]"
        >
          |
        </motion.span>
      )}
    </motion.span>
  );
}

type ShimmerHeadingProps = {
  text: string;
  className?: string;
};

function ShimmerHeading({ text, className = '' }: ShimmerHeadingProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.span
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      animate={isActive ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 18, filter: 'blur(6px)' }}
      viewport={{ once: false, amount: 0.6 }}
      onViewportEnter={() => setIsActive(true)}
      onViewportLeave={() => setIsActive(false)}
      transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
      className={`relative inline-block overflow-hidden ${className}`}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        aria-hidden="true"
        initial={{ x: '-160%', opacity: 0 }}
        animate={
          isActive
            ? { x: '220%', opacity: [0, 0.25, 0.9, 0.2, 0] }
            : { x: '-160%', opacity: 0 }
        }
        transition={{ duration: 1.35, delay: 0.95, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-y-[-20%] left-0 z-20 w-[34%] skew-x-[-22deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.18)_18%,rgba(255,255,255,0.95)_52%,rgba(255,255,255,0.18)_82%,rgba(255,255,255,0)_100%)] blur-[1px]"
      />
      <motion.span
        aria-hidden="true"
        initial={{ x: '-170%', opacity: 0 }}
        animate={
          isActive
            ? { x: '230%', opacity: [0, 0, 0.65, 0] }
            : { x: '-170%', opacity: 0 }
        }
        transition={{ duration: 1.35, delay: 0.95, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-y-[-45%] left-0 z-10 w-[40%] skew-x-[-22deg] bg-white/80 blur-xl"
      />
    </motion.span>
  );
}

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      viewport={{ once: false, amount: 0.2 }}
      onViewportEnter={() => setIsActive(true)}
      onViewportLeave={() => setIsActive(false)}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BulletCard({ item, idx }: { item: string; idx: number }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="overflow-hidden rounded-[24px]">
      <motion.div
        initial={{ opacity: 0, x: 180 }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 180 }}
        viewport={{ once: false, amount: 0.25 }}
        onViewportEnter={() => setIsActive(true)}
        onViewportLeave={() => setIsActive(false)}
        transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-4 rounded-[24px] border border-[#cfe4f5] bg-[linear-gradient(135deg,rgba(227,240,250,0.92),rgba(241,247,252,0.96))] p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)] backdrop-blur"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={
            isActive
              ? {
                  opacity: 1,
                  scale: [1, 1.06, 1, 1.04, 1],
                  filter: [
                    'drop-shadow(0 0 4px rgba(56,189,248,0.10))',
                    'drop-shadow(0 0 12px rgba(56,189,248,0.38))',
                    'drop-shadow(0 0 4px rgba(56,189,248,0.10))',
                    'drop-shadow(0 0 10px rgba(56,189,248,0.28))',
                    'drop-shadow(0 0 4px rgba(56,189,248,0.10))',
                  ],
                }
              : {
                  opacity: 0,
                  scale: 0.92,
                  filter: 'drop-shadow(0 0 0px rgba(56,189,248,0))',
                }
          }
          transition={{
            opacity: { duration: 0.35, delay: idx * 0.12 + 0.16 },
            scale: { duration: 2.2, ease: 'easeInOut', delay: idx * 0.12 + 0.16 },
            filter: { duration: 2.2, ease: 'easeInOut', delay: idx * 0.12 + 0.16 },
          }}
          className="inline-flex shrink-0 text-[#1656A0]"
        >
          <Sparkles className="h-6 w-6" />
        </motion.div>
        <p className="text-sm font-semibold leading-6 text-slate-800 md:text-base">{item}</p>
      </motion.div>
    </div>
  );
}

function MissionCard() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="overflow-hidden rounded-[32px]">
      <motion.div
        initial={{ opacity: 0, x: -220 }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -220 }}
        viewport={{ once: false, amount: 0.25 }}
        onViewportEnter={() => setIsActive(true)}
        onViewportLeave={() => setIsActive(false)}
        transition={{ duration: 1.05, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="h-full overflow-hidden rounded-[32px] border-0 bg-[linear-gradient(135deg,#0D1561_0%,#1656A0_55%,#159FBC_100%)] text-white shadow-[0_24px_60px_rgba(13,21,97,0.28)]"
      >
        <div className="p-8 md:p-9">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 stroke-[2.4] text-[#CCD71F]" />
            <h3 className="text-2xl font-semibold tracking-tight">Misión</h3>
          </div>
          <p className="mt-4 text-base leading-8 text-slate-100">{aboutData.mission}</p>
          <div className="mt-5 h-px w-full bg-white/15" />
          <p className="mt-5 text-base leading-8 text-slate-200">{aboutData.mission2}</p>
        </div>
      </motion.div>
    </div>
  );
}

function VisionCard() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="overflow-hidden rounded-[32px]">
      <motion.div
        initial={{ opacity: 0, x: 220 }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 220 }}
        viewport={{ once: false, amount: 0.25 }}
        onViewportEnter={() => setIsActive(true)}
        onViewportLeave={() => setIsActive(false)}
        transition={{ duration: 1.05, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="h-full overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/95 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur"
      >
        <div className="p-8 md:p-9">
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 stroke-[2.4] text-[#C5146B]" />
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Visión</h3>
          </div>
          <p className="mt-4 text-base leading-8 text-slate-600">{aboutData.vision}</p>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-5 text-base leading-8 text-slate-600">{aboutData.vision2}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function SectionOne() {
  return (
    <main className="bg-[#F5F7FB] text-slate-900">
      <section id="sobre-nosotros" className="relative scroll-mt-24 overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(21,159,188,0.24),transparent_38%),radial-gradient(circle_at_100%_100%,rgba(197,20,107,0.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.66),rgba(245,247,251,0.97))]" />

        <div className="relative mx-auto max-w-[1600px] px-4 md:px-6 lg:px-10 xl:px-14">
          <FadeIn>
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
              <div className="max-w-2xl xl:max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#159FBC]/20 bg-[#159FBC]/10 px-4 py-1.5 text-sm font-semibold text-[#1656A0] shadow-sm">
                  <Sparkles className="h-5 w-5" />
                  Sobre nosotros
                </div>

                <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl xl:text-6xl">
                  <TypewriterText
                    text={aboutData.title}
                    speed={60}
                    className="bg-[linear-gradient(90deg,#0D1561_0%,#1656A0_42%,#159FBC_100%)] bg-clip-text text-transparent"
                  />
                </h2>

                <p className="mt-5 max-w-xl text-xl font-medium leading-8 text-slate-800 md:text-2xl xl:max-w-3xl">
                  <ShimmerHeading text={aboutData.heading} />
                </p>

                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg xl:max-w-4xl xl:text-[20px]">
                  {aboutData.text}
                </p>
              </div>

              <div className="grid gap-4 pt-5 sm:grid-cols-1 lg:grid-cols-1 lg:pt-10 xl:pt-2">
                {aboutData.bullets.map((item, idx) => (
                  <BulletCard key={item} item={item} idx={idx} />
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-5 overflow-hidden lg:grid-cols-2 lg:items-stretch lg:gap-8 xl:gap-10">
            <MissionCard />
            <VisionCard />
          </div>
        </div>
      </section>
    </main>
  );
}
