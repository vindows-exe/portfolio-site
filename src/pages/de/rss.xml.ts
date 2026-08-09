import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_URL } from '@/config/constants';

export async function GET() {
  const posts: CollectionEntry<'blog'>[] = (await getCollection('blog', ({ id }: { id: string }) => id.startsWith('de/')))
    .filter((p: CollectionEntry<'blog'>) => !p.data.draft)
    .sort((a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: 'Vincent Boetzel — Blog',
    description: 'Gedanken zu Backend-Engineering, Infrastruktur und Systemdesign.',
    site: SITE_URL,
    items: posts.map((post: CollectionEntry<'blog'>) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/de/blog/${post.slug.replace('de/', '')}/`,
    })),
    customData: '<language>de-de</language>',
  });
}
