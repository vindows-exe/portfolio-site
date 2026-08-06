import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    problem: z.string(),
    solution: z.string(),
    stack: z.array(z.string()),
    kpis: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        trend: z.enum(['up', 'down', 'neutral']).optional(),
      }),
    ),
    repoUrl: z.string().url(),
    requirementsUrl: z.string().optional(),
    architectureUrl: z.string().optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { blog, projects };
