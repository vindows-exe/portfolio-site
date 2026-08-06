import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_URL } from '@/config/constants';

export async function GET() {
  const posts: CollectionEntry<'blog'>[] = (await getCollection('blog'))
    .filter((p: CollectionEntry<'blog'>) => !p.data.draft)
    .sort((a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: 'Vincent Boetzel — Blog',
    description: 'Thoughts on backend engineering, infrastructure, and system design.',
    site: SITE_URL,
    items: posts.map((post: CollectionEntry<'blog'>) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
