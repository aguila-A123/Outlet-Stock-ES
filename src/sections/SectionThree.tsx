import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Star, ShieldCheck } from 'lucide-react';

const benefitsData = {
  badge: 'Servicios',
  title: 'Presentación corporativa con el mismo enfoque de confianza y eficiencia',
  text: 'Ofrecemos soluciones rápidas y seguras en la adquisición y venta de mercancías: electrodomésticos, hogar, moda, calzado, deporte, higiene personal y mucho más.',
  items: [
    {
      icon: Sparkles,
      title: 'Servicios de calidad',
      text: 'Atendemos cada solicitud con rapidez, precisión y compromiso para garantizar satisfacción total.',
      accent: 'from-[#d8f3ff] via-[#effbff] to-white',
      glow: 'shadow-[0_0_28px_rgba(21,159,188,0.16)]',
      iconBg: 'bg-[#159FBC]/12',
      iconColor: 'text-[#1656A0]',
    },
    {
      icon: Users,
      title: 'Equipo experimentado',
      text: 'Profesionales con amplia trayectoria gestionan mercancías eficientemente, ofreciendo soluciones fiables siempre.',
      accent: 'from-[#e8e4ff] via-[#f7f5ff] to-white',
      glow: 'shadow-[0_0_28px_rgba(107,78,138,0.16)]',
      iconBg: 'bg-[#6B4E8A]/12',
      iconColor: 'text-[#6B4E8A]',
    },
    {
      icon: Star,
      title: 'Precios asequibles',
      text: 'Ofrecemos artículos económicos sin sacrificar calidad, ayudando a maximizar tu presupuesto disponible.',
      accent: 'from-[#ffe7d2] via-[#fff7f1] to-white',
      glow: 'shadow-[0_0_28px_rgba(245,134,23,0.16)]',
      iconBg: 'bg-[#F58617]/12',
      iconColor: 'text-[#C5146B]',
    },
    {
      icon: ShieldCheck,
      title: 'Producto de calidad',
      text: 'Seleccionamos mercancía en excelentes condiciones, asegurando durabilidad, funcionalidad y confianza para clientes.',
      accent: 'from-[#dff7e7] via-[#f7fff9] to-white',
      glow: 'shadow-[0_0_28px_rgba(34,197,94,0.16)]',
      iconBg: 'bg-[#22c55e]/12',
      iconColor: 'text-[#15803d]',
    },
  ],
};

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

function getBenefitDelay(idx: number): number {
  return idx * 0.08;
}

function runDevChecks() {
  console.assert(benefitsData.items.length === 4, 'Expected 4 benefit cards');
  console.assert(getBenefitDelay(0) === 0, 'First benefit delay should be 0');
  console.assert(getBenefitDelay(2) === 0.16, 'Third benefit delay should be 0.16');
  console.assert(benefitsData.items[0].title === 'Servicios de calidad', 'First benefit title mismatch');
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

function BenefitCard({
  item,
  idx,
}: {
  item: (typeof benefitsData.items)[number];
  idx: number;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.68, delay: getBenefitDelay(idx), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur ${item.glow}`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-95`} />
      <div className="pointer-events-none absolute right-[-8%] top-[-10%] h-28 w-28 rounded-full bg-white/70 blur-2xl" />

      <div className="relative z-10">
        <div className={`mb-5 inline-flex rounded-[22px] p-3 ${item.iconBg} ${item.iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
        <p className="mt-3 text-[15px] leading-7 text-slate-600">{item.text}</p>
      </div>
    </motion.div>
  );
}

export function SectionThree() {
  return (
    <main className="bg-[#F5F7FB] text-slate-900">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(13,21,97,0.08),transparent_28%),radial-gradient(circle_at_100%_100%,rgba(21,159,188,0.12),transparent_32%),linear-gradient(135deg,rgba(13,21,97,0.05)_0%,rgba(21,159,188,0.06)_36%,rgba(245,134,23,0.08)_100%)]" />

        <div className="relative mx-auto max-w-[1600px] px-4 md:px-6 lg:px-10 xl:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 xl:items-start">
            <FadeIn>
              <div className="max-w-2xl xl:max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.48, ease: 'easeOut' }}
                  className="inline-flex items-center rounded-full bg-[#1656A0]/12 px-4 py-1.5 text-sm font-semibold text-[#1656A0] ring-1 ring-[#1656A0]/28 shadow-[0_0_22px_rgba(22,86,160,0.14)]"
                >
                  {benefitsData.badge}
                </motion.div>

                <SectionTitle title={benefitsData.title} />

                <p className="mt-6 max-w-2xl text-[1.04rem] font-medium italic leading-[2.02] tracking-[0.01em] text-[#5B6270] md:text-[1.12rem] xl:text-[1.18rem] [font-family:Georgia,'Times_New_Roman',serif] [text-shadow:0_1px_0_rgba(255,255,255,0.35)]">
                  {benefitsData.text}
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-5 md:grid-cols-2">
              {benefitsData.items.map((item, idx) => (
                <BenefitCard key={item.title} item={item} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
