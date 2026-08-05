import { type SanityDocument, PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";

const PAGE_QUERY = `*[_type == "page" && slug.current == "homepage"][0]`;
const options = { next: { revalidate: 30 } };

type PracticeItem = { title?: string; description?: string };
type TrajectoryItem = { company?: string; role?: string };

export default async function IndexPage() {
  const page = await client.fetch<SanityDocument | null>(PAGE_QUERY, {}, options);
  if (!page) notFound();
  const { title, body, subTitle } = page;

  const eyebrow: string = page.eyebrow;
  const practiceIntro: string = page.practiceIntro;
  const practice: PracticeItem[] = page.practice
  const trajectory: TrajectoryItem[] = page.trajectory;

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto w-full max-w-[72rem] px-6 pt-20 pb-16 md:px-10 md:pt-32 md:pb-24">
        {eyebrow && (
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50">
            &#x2198; {eyebrow}
          </p>
        )}
        <h1 className="mt-8 max-w-[16ch] font-display text-[clamp(2.75rem,8.5vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
          {title}
        </h1>
        {subTitle && (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70 md:text-xl">
            {subTitle}
          </p>
        )}
      </section>

      {/* Intro — label column, prose column */}
      {Array.isArray(body) && body.length > 0 && (
        <section className="border-t border-rule">
          <div className="mx-auto grid w-full max-w-[72rem] gap-10 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50 md:col-span-3">
              &#x2198; Introduction
            </p>
            <div className="prose prose-lg max-w-none prose-p:text-foreground/75 prose-headings:font-display prose-headings:tracking-tight prose-headings:text-foreground prose-strong:text-foreground prose-a:text-accent md:col-span-8 md:col-start-5">
              <PortableText value={body} />
            </div>
          </div>
        </section>
      )}

      {/* Practice */}
      {practice.length > 0 && (
        <section className="border-t border-rule">
          <div className="mx-auto w-full max-w-[72rem] px-6 py-16 md:px-10 md:py-24">
            <div className="grid gap-10 md:grid-cols-12">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50 md:col-span-3">
                &#x2198; Practice
              </p>
              {practiceIntro && (
                <h2 className="font-display text-3xl leading-[1.1] tracking-tight md:col-span-8 md:col-start-5 md:text-4xl">
                  {practiceIntro}
                </h2>
              )}
            </div>

            <ul className="mt-16 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
              {practice.map(({ title: name, description }, i) => (
                <li
                  key={`${name}-${i}`}
                  className="bg-background p-8 transition-colors hover:bg-surface"
                >
                  <span className="font-mono text-[0.68rem] tracking-[0.18em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-2xl tracking-tight">
                    {name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                    {description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Trajectory */}
      {trajectory.length > 0 && (
        <section className="border-t border-rule">
          <div className="mx-auto w-full max-w-[72rem] px-6 py-16 md:px-10 md:py-24">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50">
              &#x2198; Trajectory
            </p>
            <ul className="mt-10">
              {trajectory.map(({ company, role }, i) => (
                <li
                  key={`${company}-${i}`}
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-6 transition-colors first:border-t hover:text-accent"
                >
                  <span className="font-display text-3xl tracking-tight md:text-4xl">
                    {company}
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50 transition-colors group-hover:text-accent">
                    {role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
