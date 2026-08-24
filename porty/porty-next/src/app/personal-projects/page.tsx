import React from "react";
import Link from "next/link";

const psPath = "/personal-projects";

const projects = [
  {
    name: "Pets Gallery",
    description: "A gallery of my pets, and an excuse to play with image layouts.",
    href: `${psPath}#`,
  },
  {
    name: "Boots Reviews",
    description:
      "Reviews of my personal collection of leather boots — mostly PNW makers and Red Wings.",
    href: `${psPath}/boots-reviews`,
  },
];

const PersonalProjects = () => {
  return (
    <section className="mx-auto w-full max-w-[72rem] px-6 pt-20 pb-16 md:px-10 md:pt-32 md:pb-24">
      <header>
        <h1>Personal Projects</h1>
        <h3>These are my ongoing persnal projects, which have doubles as fun conding experiment and hobby</h3>
      </header>

      <ul className="mt-16 grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {projects.map(({ name, description, href }, i) => (
          <li key={name} className="bg-background transition-colors hover:bg-surface">
            <Link href={href} className="flex h-full flex-col gap-3 p-8">
              <span className="font-mono text-[0.68rem] tracking-[0.18em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl leading-[1.1] tracking-tight">{name}</h3>
              <p className="text-sm leading-relaxed text-foreground/65">{description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
};

export default PersonalProjects