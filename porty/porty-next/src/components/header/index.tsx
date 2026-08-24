import React from 'react';
import Link from 'next/link';

const links = [
  { href: '/about', label: 'About' },
  { href: '/personal-projects', label: 'Personal Projects' },
  { href: '/', label: 'Contact' },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-[72rem] flex-col items-start gap-2 px-6 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-4 md:px-10">
        <Link
          href="/"
          className="whitespace-nowrap font-display text-2xl leading-none tracking-tight transition-colors hover:text-accent"
        >
          Ryota Matsumoto
        </Link>
        <div className="flex items-center gap-5 md:gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="group whitespace-nowrap font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-colors hover:text-accent"
            >
              {label}
              <span className="block h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
