(() => {
  const countries = [
    ['https://iili.io/nfVaoSn.md.jpg', 'España'],
    ['https://iili.io/nfV0oS1.md.jpg', 'Francia'],
    ['./italia.svg', 'Italia'],
    ['https://iili.io/nfVGclV.md.jpg', 'Portugal'],
  ];

  const icons = {
    palets: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v6"/><path d="M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z"/><path d="M3.054 9.013h17.893"/></svg>',
    camiones: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>',
  };

  const formats = [
    [icons.palets, 'Compramos por palets'],
    [icons.camiones, 'Camiones completos'],
  ];

  const make = (tag, className, content) => {
    const element = document.createElement(tag);
    element.className = className;
    if (content) element.textContent = content;
    return element;
  };

  function createOverview() {
    const overview = make('div', 'outlet-stock-overview');
    overview.dataset.enhanced = 'true';

    const countryGrid = make('div', 'outlet-country-grid');
    countries.forEach(([src, name]) => {
      const item = make('div', 'outlet-country');
      const image = make('img', 'outlet-country-flag');
      image.src = src;
      image.alt = 'Bandera de ' + name;
      item.append(image, make('span', 'outlet-country-name', name));
      countryGrid.append(item);
    });
    overview.append(countryGrid);

    const formatGrid = make('div', 'outlet-format-grid');
    formats.forEach(([icon, label]) => {
      const item = make('div', 'outlet-format');
      const iconWrapper = make('span', 'outlet-format-icon');
      iconWrapper.innerHTML = icon;
      item.append(iconWrapper, make('span', 'outlet-format-label', label));
      formatGrid.append(item);
    });
    overview.append(formatGrid);
    overview.append(
      make('p', 'outlet-overview-footer', 'Compramos por palets · Camiones completos'),
      make('p', 'outlet-overview-footer outlet-overview-footer-secondary', 'Grandes cantidades · Mejores precios'),
    );
    return overview;
  }

  function enhanceHero() {
    const hero = document.querySelector('#inicio');
    if (!hero) return;

    const title = hero.querySelector('h1 span');
    const isOutlet = title?.textContent?.trim() === 'Outlet Stock';
    hero.classList.toggle('outlet-featured', isOutlet);

    const content = hero.querySelector('h1')?.parentElement;
    if (content) {
      content.classList.toggle('outlet-slide-copy', isOutlet);
      const paragraphs = content.querySelectorAll(':scope > p');
      paragraphs.forEach((paragraph, paragraphIndex) => {
        paragraph.classList.toggle('outlet-featured-description', Boolean(isOutlet && paragraphIndex === 1));
      });

      const eyebrow = content.querySelector(':scope > div:first-child');
      eyebrow?.classList.toggle('outlet-featured-eyebrow', isOutlet);

      const button = content.querySelector('a[href="#contacto"]')?.parentElement;
      button?.classList.toggle('outlet-featured-cta', isOutlet);
    }

    const wrapper = hero.querySelector(':scope > div.relative.mx-auto');
    let existing = hero.querySelector('.outlet-stock-overview');
    if (isOutlet && !existing && content) {
      content.append(createOverview());
      existing = hero.querySelector('.outlet-stock-overview');
    }

    hero.classList.toggle('outlet-featured-enhanced', Boolean(isOutlet && existing?.dataset.enhanced === 'true'));
    if (!isOutlet && existing?.dataset.enhanced === 'true') existing.remove();
  }

  new MutationObserver(enhanceHero).observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  enhanceHero();
})();
