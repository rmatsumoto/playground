import React from "react";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

const PETS_QUERY = `*[_type == "dogGallery"]{
  _id,
  title,
  petType,
  "images": image[defined(image.asset)]{
    _key,
    image,
    date,
    comment,
    "dimensions": image.asset->metadata.dimensions{width, height},
    "lqip": image.asset->metadata.lqip
  }
}`;

const options = { next: { revalidate: 30 } };

/** Mirrors the petTypes list in the Sanity schema. */
const PET_NAMES: Record<string, string> = {
  celly: "Celly",
  nanko: "Nanko",
};

type GalleryImage = {
  _key: string;
  image: SanityImageSource;
  date?: string;
  comment?: string;
  dimensions?: { width: number; height: number } | null;
  lqip?: string | null;
};

type DogGalleryDoc = {
  _id: string;
  title?: string;
  petType?: string;
  images?: GalleryImage[] | null;
};

const IMAGE_WIDTH = 800;

const PetsGallery = async () => {
  const galleries = await client.fetch<DogGalleryDoc[]>(PETS_QUERY, {}, options);

  // flatten every image across all dog gallery documents, newest first
  const images = galleries
    .flatMap(({ _id, title, petType, images }) =>
      (images ?? []).map((img) => ({ ...img, docId: _id, title, petType })),
    )
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return (
    <section className="mx-auto w-full max-w-[72rem] px-6 pt-20 pb-16 md:px-10 md:pt-10 md:pb-24">
      <header>
        {/* @TODO add breadcrumbs */}
        <h1>Pets Gallery</h1>
        <h3>A gallery of my pets, and an excuse to play with image layouts.</h3>
      </header>

      {images.length === 0 ? (
        <p className="mt-16 text-sm text-foreground/65">No photos yet.</p>
      ) : (
        <ul className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map(({ _key, docId, image, date, comment, dimensions, lqip, title, petType }) => {
            const width = dimensions?.width ?? IMAGE_WIDTH;
            const height = dimensions?.height ?? IMAGE_WIDTH;
            const name = petType ? (PET_NAMES[petType] ?? petType) : title;

            return (
              <li
                key={`${docId}-${_key}`}
                className="mb-4 break-inside-avoid border border-rule bg-background"
              >
                <figure>
                  <Image
                    src={urlFor(image).width(IMAGE_WIDTH).auto("format").url()}
                    alt={comment || name || "Pet photo"}
                    width={IMAGE_WIDTH}
                    height={Math.round((height / width) * IMAGE_WIDTH)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    placeholder={lqip ? "blur" : "empty"}
                    blurDataURL={lqip ?? undefined}
                    className="h-auto w-full"
                  />
                  {(name || date || comment) && (
                    <figcaption className="flex flex-col gap-2 p-4">
                      {(name || date) && (
                        <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent">
                          {[name, date].filter(Boolean).join(" — ")}
                        </span>
                      )}
                      {comment && (
                        <p className="text-sm leading-relaxed text-foreground/65">{comment}</p>
                      )}
                    </figcaption>
                  )}
                </figure>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default PetsGallery;
