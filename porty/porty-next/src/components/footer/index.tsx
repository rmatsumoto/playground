import React from 'react';
import Link from 'next/link';

// Placeholders — swap for real destinations.
const elsewhere = [
  { href: 'https://www.linkedin.com/in/rmatsz/', label: 'LinkedIn' },
  { href: 'https://github.com/rmatsumoto', label: 'GitHub' },
  { href: 'mailto:yodamatsumoto@gmail.com', label: 'Email' },
];

const tickerItems = [
  'Site Reliability',
  'Core Web Vitals',
  'SEO Infrastructure',
  'Analytics Instrumentation',
  'Next.js',
  'Headless CMS',
  'Deployment Tooling',
];

const TickerRun = ({ hidden = false }: { hidden?: boolean }) => (
  <ul
    aria-hidden={hidden || undefined}
    className="flex shrink-0 items-center gap-8 pr-8 font-mono text-[0.68rem] uppercase tracking-[0.18em]"
  >
    {tickerItems.map((item) => (
      <li key={item} className="flex shrink-0 items-center gap-8">
        {item}
        <span className="opacity-50">&#x2197;</span>
      </li>
    ))}
  </ul>
);

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="overflow-hidden border-b border-rule bg-foreground py-3 text-background">
        <div className="flex w-max animate-marquee">
          <TickerRun />
          <TickerRun hidden />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[72rem] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50">
              &#x2198; Get in touch
            </p>
            <p className="mt-5 max-w-xl font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Do you want to have a chat?
            </p>
            <a
              href="mailto:yodamatsumoto@gmail.com"
              className="mt-6 inline-block border-b border-accent pb-1 font-mono text-sm tracking-wide text-accent transition-opacity hover:opacity-70"
            >
              yodamatsumoto@gmail.com
            </a>
          </div>

          <div className="md:col-span-3 md:col-start-9">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50">
              Elsewhere
            </p>
            <ul className="mt-5 space-y-2">
              {elsewhere.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-base transition-colors hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50">
              Based in
            </p>
            <p className="mt-3 text-base">
              Greater Vancouver, Canada
              <span className="block text-foreground/60">English &amp; 日本語</span>
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-rule pt-6 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Ryota Matsumoto</p>
          <Link href="/" className="transition-colors hover:text-accent">
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
