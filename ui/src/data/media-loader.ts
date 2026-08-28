import { getCollection, type CollectionEntry } from "astro:content";

export type MediaPost = CollectionEntry<"media">;

export async function listMedia(): Promise<MediaPost[]> {
  const posts = await getCollection("media");
  return posts.slice().sort((a, b) => {
    const aTime = a.data.date?.getTime() ?? 0;
    const bTime = b.data.date?.getTime() ?? 0;
    if (aTime !== bTime) return bTime - aTime;
    return a.data.title.localeCompare(b.data.title, "fi");
  });
}
