import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerData = {
  brand: {
    name: 'Outlet Stock',
    subtitle: 'Subastas Escudero',
    description:
      'Somos una empresa familiar con más de 25 años de experiencia en la compra-venta de mercancías.',
  },
  links: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Sobre Nosotros', href: '#sobre-nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Contacto', href: '#contacto' },
  ],
  legal: [
    { label: 'Términos y condiciones', href: '/terminos-y-condiciones/' },
    { label: 'Política de privacidad', href: '/politica-de-privacidad/' },
  ],
  contact: {
    intro: 'Ponte en contacto con nosotros:',
    addressLine1: 'Paseo del Niño 29, NAVE 9',
    addressLine2: 'Torrelavega, Cantabria 39300',
    email: 'info@outletstock.es',
    phone: '628 241 616',
  },
  copyright: '© Copyright 2026 por outletstock.es',
};

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

function runDevChecks() {
  console.assert(footerData.links.length === 4, 'Expected 4 nav links');
  console.assert(footerData.legal.length === 2, 'Expected 2 legal links');
  console.assert(footerData.contact.phone === '628 241 616', 'Phone mismatch');
  console.assert(footerData.brand.name === 'Outlet Stock', 'Brand mismatch');
  console.assert(footerData.contact.addressLine2.includes('39300'), 'Postal code missing');
  console.assert(footerData.contact.email.includes('@'), 'Email should look valid');
}

runDevChecks();

function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FooterLogo() {
  return (
    <img
      src="https://iili.io/CqMRRsf.png"
      alt="Logo Outlet Stock"
      className="h-24 w-auto object-contain"
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[26px] font-black tracking-tight text-white md:text-[30px] xl:text-[34px]">
        {title}
      </h3>
      <div className="mt-7 text-white/92">{children}</div>
    </div>
  );
}

export function SectionSix() {
  return (
    <main className="bg-[#F5F7FB]">
      <footer className="overflow-hidden bg-[linear-gradient(180deg,#20283b_0%,#1d2434_100%)] text-white">
        <div className="mx-auto max-w-[1700px] px-6 pb-0 pt-10 md:px-10 lg:px-14 xl:px-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.05fr_0.72fr_0.82fr_0.95fr] lg:gap-12 xl:gap-16">
            <FadeIn>
              <div className="max-w-[520px] lg:max-w-[500px]">
                <FooterLogo />
                <h3 className="mt-12 text-[26px] font-black tracking-tight text-white md:text-[30px] xl:text-[34px] lg:mt-16">
                  Sobre Nosotros
                </h3>
                <p className="mt-6 max-w-[420px] text-[16px] leading-[1.5] text-white/96 md:max-w-[430px] md:text-[18px] xl:max-w-[440px] xl:text-[20px]">
                  {footerData.brand.description}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.05} className="lg:pt-40">
              <FooterColumn title="Links">
                <nav className="space-y-3 text-[16px] md:text-[18px] xl:text-[20px]">
                  {footerData.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block transition duration-200 hover:text-[#9ec5ff]"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </FooterColumn>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:pt-40">
              <FooterColumn title="Legal">
                <div className="space-y-4 text-[15px] leading-[1.45] md:text-[16px] xl:text-[18px]">
                  {footerData.legal.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block transition duration-200 hover:text-[#9ec5ff]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </FooterColumn>
            </FadeIn>

            <FadeIn delay={0.15} className="lg:pt-40">
              <FooterColumn title="Contáctanos">
                <p className="text-[16px] leading-[1.45] md:text-[18px] xl:text-[20px]">
                  {footerData.contact.intro}
                </p>

                <div className="mt-8 space-y-7 text-[16px] leading-[1.45] md:text-[17px] xl:text-[20px]">
                  <div>
                    <p>{footerData.contact.addressLine1}</p>
                    <p>{footerData.contact.addressLine2}</p>
                  </div>
                </div>
              </FooterColumn>
            </FadeIn>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1700px] px-6 md:px-10 lg:px-14 xl:px-20">
          <div className="grid gap-4 text-[18px] text-white/92 md:text-[19px] lg:grid-cols-3 lg:items-center xl:text-[20px]">
            <div className="flex items-center gap-3 whitespace-nowrap lg:justify-self-start">
              <Mail className="h-5 w-5 shrink-0 text-[#ff7a00]" />
              <p>Email: {footerData.contact.email}</p>
            </div>
            <div className="flex items-center gap-3 whitespace-nowrap lg:justify-self-center">
              <Phone className="h-5 w-5 shrink-0 text-[#ff7a00]" />
              <p>Móvil: {footerData.contact.phone}</p>
            </div>
            <div className="flex items-center gap-3 whitespace-nowrap lg:justify-self-end">
              <MapPin className="h-5 w-5 shrink-0 text-[#ff7a00]" />
              <p>Torrelavega, Cantabria</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 bg-[#1a122f] px-6 py-5 md:px-10 lg:px-14 xl:px-20">
          <div className="mx-auto grid max-w-[1700px] items-center gap-4 text-center text-[18px] text-white/78 md:grid-cols-3 md:text-[19px]">
            <p className="md:justify-self-start">{footerData.copyright}</p>

            <a
              href={footerData.legal[0].href}
              className="inline-flex items-center justify-center text-center transition duration-200 hover:text-white"
            >
              – {footerData.legal[0].label} –
            </a>

            <a
              href={footerData.legal[1].href}
              className="inline-flex items-center justify-center text-center transition duration-200 hover:text-white md:justify-self-end"
            >
              – {footerData.legal[1].label} –
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
