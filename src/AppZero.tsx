import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import {
  Menu,
  X,
  Factory,
  Handshake,
  UserRound,
  Shield,
  Zap,
  Mail,
} from 'lucide-react';

type CardProps = HTMLAttributes<HTMLDivElement>;
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  size?: 'default' | 'lg';
};

type NavItem = {
  label: string;
  href: string;
};

type HeroSlide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  text: string;
  cta: string;
  backgroundImage?: string;
};

const logoUrl = 'https://iili.io/Cq9QdEg.png';

const siteConfig: {
  nav: NavItem[];
  heroSlides: HeroSlide[];
} = {
  nav: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Sobre Nosotros', href: '#sobre-nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Contacto', href: '#contacto' },
  ],
  heroSlides: [
    {
      eyebrow: 'Más de 25 años de experiencia',
      title: 'Outlet Stock',
      subtitle: 'Subastas Escudero',
      text: 'Ofrecemos soluciones rápidas y seguras en la adquisición y venta de mercancías: electrodomésticos, hogar, moda, calzado, deporte, higiene personal y mucho más.',
      cta: 'Contactar ahora',
      backgroundImage: 'https://iili.io/CqVXcTG.png',
    },
    {
      eyebrow: 'Más de 25 años de experiencia',
      title: 'Menaje de Hogar',
      subtitle: 'Stocks, lotes y oportunidades',
      text: 'Compramos colchones, edredones, mantas, sábanas y artículos para el hogar con procesos claros y ágiles.',
      cta: 'Contactar ahora',
      backgroundImage: 'https://iili.io/CqViH11.png',
    },
    {
      eyebrow: 'Más de 25 años de experiencia',
      title: 'Ropa Casual',
      subtitle: 'Señora & Caballero',
      text: 'Si buscas eficiencia, compromiso y experiencia, estás en el lugar correcto para comprar o vender stock.',
      cta: 'Contactar ahora',
      backgroundImage: 'https://iili.io/CqVDhTg.png',
    },
    {
      eyebrow: 'Más de 25 años de experiencia',
      title: 'Calzado',
      subtitle: 'Estilo para cada ocasión',
      text: 'Disponemos de lotes de calzado para señora, caballero y niño, con variedad de estilos y grandes oportunidades.',
      cta: 'Contactar ahora',
      backgroundImage: 'https://iili.io/ndYyPDl.jpg',
    },
    {
      eyebrow: 'Más de 25 años de experiencia',
      title: 'Menaje de Cocina',
      subtitle: 'Todo para tu cocina',
      text: 'Compramos y vendemos vajillas, baterías, utensilios y accesorios de cocina en lotes y stocks seleccionados.',
      cta: 'Contactar ahora',
      backgroundImage: 'https://iili.io/ndaJPDv.md.jpg',
    },
    {
      eyebrow: 'Más de 25 años de experiencia',
      title: 'Higiene Personal',
      subtitle: 'Cuidado para cada día',
      text: 'Productos de higiene y cuidado personal con variedad, calidad y oportunidades para particulares y empresas.',
      cta: 'Contactar ahora',
      backgroundImage: 'https://iili.io/nda2dkg.md.jpg',
    },
    {
      eyebrow: 'Más de 25 años de experiencia',
      title: 'Herramientas Eléctricas y Manuales',
      subtitle: 'Soluciones para cada proyecto',
      text: 'Herramientas eléctricas y manuales para profesionales y particulares, disponibles en lotes y stocks variados.',
      cta: 'Contactar ahora',
      backgroundImage: 'https://iili.io/nda3FS9.jpg',
    },
    {
      eyebrow: 'Más de 25 años de experiencia',
      title: 'Electrodomésticos',
      subtitle: 'Tecnología para el hogar',
      text: 'Electrodomésticos para facilitar el día a día, con opciones prácticas y oportunidades a precios competitivos.',
      cta: 'Contactar ahora',
      backgroundImage: 'https://iili.io/nda36Ou.webp',
    },
    {
      eyebrow: 'Más de 25 años de experiencia',
      title: 'Muebles',
      subtitle: 'Funcionalidad y estilo',
      text: 'Muebles para distintos espacios del hogar y el negocio, disponibles en lotes, stocks y oportunidades únicas.',
      cta: 'Contactar ahora',
      backgroundImage: 'https://iili.io/ndaFOkF.jpg',
    },
  ],
};

const heroGradient =
  'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_24%),linear-gradient(135deg,rgba(13,21,97,0.62)_0%,rgba(22,86,160,0.44)_28%,rgba(21,159,188,0.26)_55%,rgba(197,20,107,0.18)_100%)]';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function Card({ className = '', ...props }: CardProps) {
  return <div className={cn('rounded-2xl border bg-white', className)} {...props} />;
}

function Button({ className = '', size = 'default', asChild = false, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center transition focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
    size === 'lg' ? 'h-11 px-6 text-base' : 'h-10 px-4 text-sm',
    className,
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

function getNextSlideIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current + 1) % total;
}

function getSpainGreeting(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('es-ES', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'Europe/Madrid',
  });

  const hour = Number(formatter.format(date));

  if (hour >= 6 && hour < 14) return 'Buenos días';
  if (hour >= 14 && hour < 21) return 'Buenas tardes';
  return 'Buenas noches';
}

function getWhatsAppMessage() {
  const greeting = getSpainGreeting();
  return `Hola, ${greeting} 👋

Vengo desde la web de Outlet Stock y me gustaría recibir más información sobre sus productos y servicios.

🌐 https://outletstock.es`;
}

function LogoBadge() {
  return <img src={logoUrl} alt="Outlet Stock logo" className="h-16 w-auto object-contain md:h-20" />;
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center px-4 py-3 md:px-7 lg:px-10 xl:px-12">
        <a href="#inicio" className="flex items-center gap-3">
          <LogoBadge />
        </a>

        <nav className="hidden items-center gap-9 md:ml-auto md:mr-8 md:flex lg:gap-11 xl:gap-12">
          {siteConfig.nav.filter((item) => item.label !== 'Contacto').map((item) => (
            <a key={item.label} href={item.href} className="text-base font-medium text-slate-700 transition hover:text-slate-950">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:ml-7 lg:ml-8 md:block">
          <Button asChild className="rounded-2xl bg-[#1656A0] text-white hover:bg-[#0D1561]">
            <a href="#contacto">Contactar</a>
          </Button>
        </div>

        <button
          className="ml-auto rounded-xl border border-slate-200 p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4">
              {siteConfig.nav.filter((item) => item.label !== 'Contacto').map((item) => (
                <a key={item.label} href={item.href} className="text-base font-medium text-slate-700" onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-2 rounded-2xl bg-[#1656A0] text-white hover:bg-[#0D1561]">
                <a href="#contacto">Contactar</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  const slide = siteConfig.heroSlides[index];
  const dots = siteConfig.heroSlides.map((_, i) => i);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => getNextSlideIndex(prev, siteConfig.heroSlides.length));
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="relative scroll-mt-24 overflow-hidden bg-[#0D1561] text-white">
      <AnimatePresence mode="sync">
        {slide.backgroundImage && (
          <motion.div
            key={slide.backgroundImage}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0, scale: 1.015 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          />
        )}
      </AnimatePresence>

      <div className={`absolute inset-0 ${heroGradient}`} />
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0))] lg:block" />

      <div className="relative mx-auto grid max-w-[1500px] gap-10 px-4 py-20 md:px-7 lg:px-10 lg:py-28 xl:px-12">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                {slide.eyebrow}
              </div>
              <h1 className="text-4xl font-black tracking-[-0.04em] text-white drop-shadow-[0_10px_30px_rgba(2,6,23,0.28)] md:text-6xl xl:text-[72px]">
                <span className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(231,244,255,0.96)_48%,rgba(191,226,255,0.92)_100%)] bg-clip-text text-transparent">
                  {slide.title}
                </span>
              </h1>
              <p className="mt-3 text-[1.2rem] font-semibold uppercase tracking-[0.18em] text-sky-100/90 md:text-[1.35rem]">
                {slide.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">{slide.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-2xl bg-[#CCD71F] text-[#0D1561] hover:bg-[#b8c41b]">
                  <a href="#contacto">{slide.cta}</a>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-3">
            {dots.map((dot) => (
              <button
                key={dot}
                onClick={() => setIndex(dot)}
                className={`h-3 rounded-full transition-all ${index === dot ? 'w-10 bg-[#CCD71F]' : 'w-3 bg-white/35'}`}
                aria-label={`Slide ${dot + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IntroStrip() {
  const items = [
    { label: 'Fabricantes', icon: Factory },
    { label: 'Distribuidores', icon: Handshake },
    { label: 'Consumidores', icon: UserRound },
    { label: 'Confianza', icon: Shield },
    { label: 'Eficiencia', icon: Zap },
  ];

  return (
    <section className="border-b border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-center gap-3 px-4 py-6 md:grid md:grid-cols-5 md:gap-4 md:px-7 lg:px-10 xl:px-12">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.45 }}
              className="group relative overflow-hidden rounded-full md:w-full"
            >
              <motion.div
                animate={{ x: ['-190%', '230%'], opacity: [0, 0, 1, 0] }}
                transition={{ duration: 1.15, times: [0, 0.12, 0.45, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.85 }}
                className="pointer-events-none absolute -inset-y-6 left-0 z-20 w-28 rotate-[24deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.22)_18%,rgba(255,255,255,1)_50%,rgba(255,255,255,0.22)_82%,rgba(255,255,255,0)_100%)] blur-[0.5px]"
              />
              <motion.div
                animate={{ x: ['-190%', '230%'], opacity: [0, 0, 0.65, 0] }}
                transition={{ duration: 1.15, times: [0, 0.12, 0.45, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.85 }}
                className="pointer-events-none absolute -inset-y-8 left-0 z-10 w-36 rotate-[24deg] bg-white blur-2xl"
              />
              <div className="relative flex items-center justify-center gap-2.5 rounded-full border border-slate-300/80 bg-[linear-gradient(135deg,#e5e7eb_0%,#cbd5e1_38%,#94a3b8_100%)] px-5 py-2 text-sm font-semibold text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(148,163,184,0.35),0_8px_18px_rgba(15,23,42,0.10)] before:pointer-events-none before:absolute before:inset-x-3 before:top-0 before:h-1/2 before:rounded-full before:bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0.08))] before:content-[''] md:w-full md:px-4 lg:px-5">
                <Icon className="relative z-10 h-[18px] w-[18px] stroke-[2.4] text-slate-700" />
                <span className="relative z-10">{item.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FloatingSupport() {
  const [supportOpen, setSupportOpen] = useState(false);
  const [showSupportHint, setShowSupportHint] = useState(false);
  const whatsappHref = `https://wa.me/34628241616?text=${encodeURIComponent(getWhatsAppMessage())}`;

  useEffect(() => {
    if (supportOpen) {
      setShowSupportHint(false);
      return;
    }

    let cycleHideTimer: number | undefined;

    const showHint = (duration = 3800) => {
      setShowSupportHint(true);
      if (cycleHideTimer) window.clearTimeout(cycleHideTimer);
      cycleHideTimer = window.setTimeout(() => setShowSupportHint(false), duration);
    };

    const firstTimer = window.setTimeout(() => showHint(3800), 5000);
    const interval = window.setInterval(() => showHint(3800), 150000);

    return () => {
      window.clearTimeout(firstTimer)
      if (cycleHideTimer) window.clearTimeout(cycleHideTimer)
      window.clearInterval(interval)
    };
  }, [supportOpen]);

  return (
    <div className="fixed bottom-7 right-7 z-[60] flex items-end gap-3">
      <AnimatePresence>
        {!supportOpen && showSupportHint && (
          <motion.div
            key="support-hint"
            initial={{ opacity: 0, x: 16, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.94 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2 rounded-[18px] border border-[#d9e9ff]/80 bg-white px-4 py-2 text-sm font-semibold text-[#1656A0] shadow-[0_16px_35px_rgba(15,23,42,0.16)]"
          >
            <div className="relative">
              Necesitas Ayuda?
              <span className="pointer-events-none absolute -bottom-[18px] right-4 h-4 w-4 rotate-45 rounded-[3px] border-b border-r border-[#d9e9ff]/80 bg-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex flex-col items-end gap-3">
        <AnimatePresence>
          {supportOpen && (
            <div className="-translate-x-[1px] flex flex-col items-end gap-3">
              <motion.a
                key="mail-btn"
                href="mailto:info@outletstock.es"
                initial={{ opacity: 0, y: 18, scale: 0.72 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.75 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[linear-gradient(145deg,#6f8fb8_0%,#466892_45%,#2f4867_100%)] text-white shadow-[0_14px_30px_rgba(15,23,42,0.28)]"
                aria-label="Correo"
              >
                <Mail className="h-6 w-6" strokeWidth={2.2} />
              </motion.a>

              <motion.a
                key="wa-btn"
                href={whatsappHref}
                initial={{ opacity: 0, y: 18, scale: 0.72 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.75 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#dff7df]/30 bg-[linear-gradient(145deg,#45d46b_0%,#1fa34a_48%,#147a36_100%)] text-white shadow-[0_14px_30px_rgba(20,122,54,0.30)]"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-white" aria-hidden="true">
                  <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z" />
                </svg>
              </motion.a>
            </div>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-label={supportOpen ? 'Cerrar soporte' : 'Soporte'}
          onClick={() => {
            setShowSupportHint(false);
            setSupportOpen((prev) => !prev);
          }}
          className={cn(
            'relative inline-flex h-16 w-16 items-center justify-center rounded-full transition duration-300 hover:scale-[1.04] hover:brightness-110',
            supportOpen
              ? 'border border-[#ffd4d4]/35 bg-[linear-gradient(145deg,#ef9c9c_0%,#c95d5d_20%,#9f3030_48%,#7a1f1f_72%,#d78a8a_100%)] shadow-[inset_0_2px_6px_rgba(255,255,255,0.28),inset_0_-4px_8px_rgba(66,10,10,0.30),0_18px_40px_rgba(120,18,18,0.36)]'
              : 'border border-[#dbe9ff]/35 bg-[linear-gradient(145deg,#9fc3ea_0%,#5b89c3_20%,#2f5f9a_48%,#1f4779_72%,#7ea8d7_100%)] shadow-[inset_0_2px_6px_rgba(255,255,255,0.35),inset_0_-4px_8px_rgba(10,34,66,0.28),0_18px_40px_rgba(18,64,120,0.38)]',
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {supportOpen ? (
              <motion.div
                key="close"
                initial={{ scale: 0.3, rotate: -120, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.4, rotate: 120, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <X className="h-8 w-8 text-[#e3e3e3]" strokeWidth={2.4} />
              </motion.div>
            ) : (
              <motion.div
                key="support"
                initial={{ scale: 0.3, rotate: -120, opacity: 0 }}
                animate={showSupportHint ? { scale: 1, rotate: [0, 8, -6, 5, -3, 0], opacity: 1 } : { scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.2, rotate: 140, opacity: 0 }}
                transition={showSupportHint ? { duration: 0.8, ease: 'easeInOut' } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" className="h-8 w-8">
                  <path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440ZM331.5-411.5Q320-423 320-440t11.5-28.5Q343-480 360-480t28.5 11.5Q400-457 400-440t-11.5 28.5Q377-400 360-400t-28.5-11.5Zm240 0Q560-423 560-440t11.5-28.5Q583-480 600-480t28.5 11.5Q640-457 640-440t-11.5 28.5Q617-400 600-400t-28.5-11.5ZM241-462q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

export function AppZero() {
  return (
    <main className="bg-white text-slate-900">
      <Hero />
      <IntroStrip />
      <FloatingSupport />
    </main>
  );
}
