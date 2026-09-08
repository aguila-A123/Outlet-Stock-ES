import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const contactData = {
  badge: 'Contacto',
  title: 'Datos de presentación',
  text: 'Ponemos a tu disposición nuestros datos de contacto para consultas, presupuestos y atención personalizada. Estamos listos para ayudarte con rapidez, cercanía y total confianza.',
  featured: {
    mapUrl:
      'https://www.google.com/maps?q=Paseo%20del%20Ni%C3%B1o%2029%2C%20NAVE%209%2C%20Torrelavega%2C%20Cantabria%2039300&output=embed',
    mapLabel: 'Ubicación en mapa',
    mapLocation: 'Torrelavega, Cantabria',
  },
  info: [
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+34 600 123 456',
      detail: 'Atención directa y rápida.',
      accent: 'from-[#dff4ff] via-[#f5fbff] to-white',
      iconBg: 'bg-[#159FBC]/12',
      iconColor: 'text-[#1656A0]',
    },
    {
      icon: Mail,
      label: 'Correo electrónico',
      value: 'info@outletstock.com',
      detail: 'Respuesta profesional y cercana.',
      accent: 'from-[#efe5ff] via-[#faf7ff] to-white',
      iconBg: 'bg-[#6B4E8A]/12',
      iconColor: 'text-[#6B4E8A]',
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Paseo del Niño 29, NAVE 9\nTorrelavega, Cantabria 39300',
      detail: 'Punto de atención y presentación comercial.',
      accent: 'from-[#ffe8d8] via-[#fff7f2] to-white',
      iconBg: 'bg-[#F58617]/12',
      iconColor: 'text-[#C5146B]',
    },
    {
      icon: Clock,
      label: 'Horario',
      value: 'Lun - Vie · 09:00 a 18:00',
      detail: 'Disponibles para ayudarte.',
      accent: 'from-[#e4f7ec] via-[#f8fff9] to-white',
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

type ContactItem = (typeof contactData.info)[number];

function getContactDelay(idx: number): number {
  return idx * 0.08;
}

function runDevChecks() {
  console.assert(contactData.info.length === 4, 'Expected 4 contact cards');
  console.assert(getContactDelay(0) === 0, 'First contact delay should be 0');
  console.assert(getContactDelay(2) === 0.16, 'Third contact delay should be 0.16');
  console.assert(contactData.info[0].label === 'Teléfono', 'First contact label mismatch');
  console.assert(contactData.featured.mapLabel === 'Ubicación en mapa', 'Featured map label mismatch');
  console.assert(
    contactData.info[2].value.includes('Torrelavega, Cantabria 39300'),
    'Location should include the updated address',
  );
  console.assert(contactData.featured.mapUrl.includes('google.com/maps'), 'Map URL should be set');
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

function ContactRow({ item, idx }: { item: ContactItem; idx: number }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.58, delay: getContactDelay(idx), ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[26px] border border-white/70 bg-white/88 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.07)] backdrop-blur"
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${item.accent} opacity-95`} />
      <div className="relative z-10 flex items-start gap-4">
        <div className={`inline-flex shrink-0 rounded-[20px] p-3 ${item.iconBg} ${item.iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
          <h3 className="mt-1 whitespace-pre-line break-words text-lg font-semibold tracking-tight text-slate-950">
            {item.value}
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-9 overflow-hidden rounded-[34px] border border-[#1656A0]/18 bg-[linear-gradient(135deg,rgba(13,21,97,0.96)_0%,rgba(22,86,160,0.94)_58%,rgba(21,159,188,0.90)_100%)] shadow-[0_24px_60px_rgba(13,21,97,0.22)]"
    >
      <div className="flex items-center justify-between border-b border-white/12 px-5 py-3">
        <p className="text-sm font-semibold tracking-[0.04em] text-white">
          {contactData.featured.mapLabel}
        </p>
        <span className="text-xs font-medium text-slate-200/75">{contactData.featured.mapLocation}</span>
      </div>

      <div className="relative h-[360px] w-full overflow-hidden bg-slate-100/10">
        <iframe
          title="Mapa de ubicación Outlet Stock"
          src={contactData.featured.mapUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>
    </motion.div>
  );
}

export function SectionFive() {
  return (
    <main className="bg-[#F5F7FB] text-slate-900">
      <section id="contacto" className="relative scroll-mt-24 overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(13,21,97,0.08),transparent_28%),radial-gradient(circle_at_100%_100%,rgba(21,159,188,0.10),transparent_32%),linear-gradient(135deg,rgba(13,21,97,0.05)_0%,rgba(21,159,188,0.06)_36%,rgba(245,134,23,0.07)_100%)]" />

        <div className="relative mx-auto max-w-[1600px] px-4 md:px-6 lg:px-10 xl:px-14">
          <div className="grid gap-10 xl:grid-cols-[0.92fr_1.08fr] xl:gap-12">
            <FadeIn>
              <div className="max-w-2xl xl:max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.48, ease: 'easeOut' }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1656A0]/12 px-4 py-1.5 text-sm font-semibold text-[#1656A0] ring-1 ring-[#1656A0]/24 shadow-[0_0_22px_rgba(22,86,160,0.12)]"
                >
                  <Send className="h-4 w-4" />
                  {contactData.badge}
                </motion.div>

                <SectionTitle title={contactData.title} />

                <p className="mt-6 max-w-2xl text-[1.04rem] font-medium italic leading-[2.02] tracking-[0.01em] text-[#5B6270] md:text-[1.12rem] xl:text-[1.18rem] [font-family:Georgia,'Times_New_Roman',serif] [text-shadow:0_1px_0_rgba(255,255,255,0.35)]">
                  {contactData.text}
                </p>

                <FeaturedMap />
              </div>
            </FadeIn>

            <div className="grid gap-4 lg:gap-5 xl:pt-10">
              {contactData.info.map((item, idx) => (
                <ContactRow key={item.label} item={item} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
