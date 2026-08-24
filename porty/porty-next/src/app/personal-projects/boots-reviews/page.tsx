import React from "react";
import Link from "next/link";
import { client } from "@/sanity/client";

const BOOTS_QUERY = `*[_type == "bootsGallery" && defined(slug.current)]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  "maker": Maker,
  "model": Model,
  "last": Last,
  "scores": scores[]{score, type}
}`;

const options = { next: { revalidate: 30 } };

type BootsScore = { score?: number; type?: string };

type BootsReviewItem = {
  _id: string;
  title?: string;
  slug: string;
  maker?: string;
  model?: string;
  last?: string;
  scores?: BootsScore[] | null;
};

const totalScore = (scores?: BootsScore[] | null) =>
  Array.isArray(scores)
    ? scores.reduce((sum, { score }) => sum + (score ?? 0), 0)
    : 0;

const BootsReview = async () => {
  const boots = await client.fetch<BootsReviewItem[]>(BOOTS_QUERY, {}, options);

  return (
    <section className="mx-auto w-full max-w-[72rem] px-6 pt-20 pb-16 md:px-10 md:pt-32 md:pb-24">
      <header>
        {/* @TODO add breadcrumbs */}
        <h1>Boots Review</h1>
        <h3>
          Review of personal collection of leather boots. Mostly PNW (Pacific North West) boots and
          Red Wings, but there are some others as well!
        </h3>
      </header>

      <div id="boots_list">
        <ul className="mt-16 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {boots.map(({ _id, title, slug, maker, model, last, scores }) => (
            <li key={_id} className="bg-background transition-colors hover:bg-surface">
              <Link
                href={`/personal-projects/boots-reviews/${slug}`}
                className="flex h-full flex-col gap-3 p-8"
              >
                <span className="font-mono text-[0.68rem] tracking-[0.18em] text-accent">
                  Total score - {totalScore(scores)}
                </span>
                <h3 className="font-display text-2xl leading-[1.1] tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed text-foreground/65">
                  {`${maker} - ${model}`}
                </p>
                {last && (
                  <p className="mt-auto font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50">
                    {`Last: ${last}`}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BootsReview;
