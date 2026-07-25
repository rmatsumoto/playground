import { type SanityDocument, PortableText } from "next-sanity";
import { client } from "@/sanity/client";
const PAGE_QUERY = `*[
  _type == "page"
  && defined('homepage')
]`;
const options = { next: { revalidate: 30 } };
export default async function IndexPage() {
  const pageData = await client.fetch<SanityDocument[]>(PAGE_QUERY, {}, options);
  const {title, body, subTitle} = pageData[0];
  return (
    <main className="container mx-auto min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-5">{title}</h1>
      <h3 className="mb-10">{subTitle}</h3>
      {Array.isArray(body) && <PortableText value={body} />}
    </main>
  );
}