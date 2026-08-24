import React from 'react';
import { PortableText, type PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";

const BOOTS_QUERY = `*[_type == "bootsGallery" && slug.current == $slug][0]{
  title,
  "maker": Maker,
  "model": Model,
  "last": Last,
  "leather": Leather,
  "sole": Sole,
  "url": URL,
  "scores": scores[]{_key, score, type, description}
}`;

const options = { next: { revalidate: 30 } };

const SCORE_TYPE_TITLES: Record<string, string> = {
  build_quality: "Build Quality",
  leather: "Leather",
  comfort: "Comfort",
  break_in: "Break In",
  value: "Value",
  aethetic: "Aethetic",
};

type BootsScore = {
  _key: string;
  score?: number;
  type?: string;
  description?: PortableTextBlock[] | null;
};

type BootsReviewDoc = {
  title?: string;
  maker?: string;
  model?: string;
  last?: string;
  leather?: string;
  sole?: string;
  url?: string;
  scores?: BootsScore[] | null;
};

const BootsReviewPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const boot = await client.fetch<BootsReviewDoc | null>(
    BOOTS_QUERY,
    await params,
    options,
  );
  if (!boot) notFound();

  const { title, maker, model, last, leather, sole, url } = boot;
  const scores = Array.isArray(boot.scores) ? boot.scores : [];
  const total = scores.reduce((sum, { score }) => sum + (score ?? 0), 0);

  return (
    <section className="mx-auto w-full max-w-[72rem] px-6 pt-20 pb-16 md:px-10 md:pt-32 md:pb-24">
      <header>
        {/* @TODO add breadcrumbs */}
        <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.02em]">
          {title}
        </h1>
        <p className="mt-8 font-display text-3xl tracking-tight text-foreground/70">
          {maker}
        </p>
        <p className="font-display text-3xl tracking-tight text-foreground/70">
          {model}
        </p>

        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-mono text-[0.68rem] uppercase tracking-[0.18em]">
          {[
            ["Last", last],
            ["Leather", leather],
            ["Sole", sole],
          ]
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label}>
                <dt className="text-foreground/50">{label}</dt>
                <dd className="mt-2">{value}</dd>
              </div>
            ))}
        </dl>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent"
          >
            Product page &#x2197;
          </a>
        )}
      </header>

      {/* body content */}
      <div className="mt-16 border-t border-rule pt-16">
        {/* breakdown of score and details */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            Score breakdown
          </h2>
          {scores.length > 0 && (
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent">
              Total score - {total}
            </p>
          )}
        </div>

        {scores.length > 0 ? (
          <ul className="mt-10">
            {/* Repeat each scores items here */}
            {scores.map(({ _key, score, type, description }) => (
              <li
                key={_key}
                className="flex flex-col gap-3 border-b border-rule py-8 first:border-t"
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50">
                  {type ? SCORE_TYPE_TITLES[type] ?? type : "Untyped"}
                </p>
                <p className="font-display text-2xl tracking-tight">
                  Score: {score ?? "—"}
                </p>
                {Array.isArray(description) && (
                  <div className="prose max-w-none prose-p:text-foreground/75 prose-a:text-accent">
                    <PortableText value={description} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-foreground/65">
            No scores recorded for these boots yet.
          </p>
        )}
      </div>
    </section>
  );
}

export default BootsReviewPage;
