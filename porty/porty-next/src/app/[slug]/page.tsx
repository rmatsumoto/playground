import { PortableText, type SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/client";

const POST_QUERY = `*[_type == "page" && slug.current == $slug][0]`;
const options = { next: { revalidate: 30 } };

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument | null>(
    POST_QUERY,
    await params,
    options,
  );
  if (!post) notFound();

  return (
    <article>
      {/* Masthead */}
      <header className="mx-auto w-full max-w-[72rem] px-6 pt-16 pb-12 md:px-10 md:pt-24 md:pb-16">
        <Link
          href="/"
          className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50 transition-colors hover:text-accent"
        >
          &#x2196; Index
        </Link>
        <h1 className="mt-10 max-w-[18ch] font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.02em]">
          {post.title}
        </h1>
        {post.subTitle && (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70 md:text-xl">
            {post.subTitle}
          </p>
        )}
      </header>

      {/* Body — meta rail on the left, prose on the right */}
      <div className="border-t border-rule">
        <div className="mx-auto grid w-full max-w-[72rem] gap-10 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-28">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50">
                &#x2198; Last updated
              </p>
              {post.lastUpdated && (
                <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em]">
                  {formatDate(post.lastUpdated)}
                </p>
              )}
            </div>
          </aside>

          <div className="prose prose-lg max-w-none prose-p:text-foreground/75 prose-headings:font-display prose-headings:tracking-tight prose-headings:text-foreground prose-strong:text-foreground prose-a:text-accent prose-blockquote:border-accent prose-blockquote:font-display prose-blockquote:not-italic prose-img:rounded-none md:col-span-8 md:col-start-5">
            {Array.isArray(post.body) && <PortableText value={post.body} />}
          </div>
        </div>
      </div>

      {/* Foot nav */}
      <div className="border-t border-rule">
        <div className="mx-auto w-full max-w-[72rem] px-6 py-16 md:px-10">
          <Link
            href="/"
            className="group inline-flex items-baseline gap-4 font-display text-4xl tracking-tight transition-colors hover:text-accent md:text-5xl"
          >
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50 transition-colors group-hover:text-accent">
              &#x2196;
            </span>
            Back to the index
          </Link>
        </div>
      </div>
    </article>
  );
}
