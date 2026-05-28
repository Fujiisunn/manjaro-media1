import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().optional().default('マンジャロ'),
    draft: z.boolean().optional().default(false),
    thumb: z.string().optional(),
    thumbHeadline: z.string().optional(),
    thumbAccent: z.string().optional(),
  }),
});

export const collections = { articles };
